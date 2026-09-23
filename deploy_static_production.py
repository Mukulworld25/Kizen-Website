"""
PRODUCTION STATIC SITE DEPLOYMENT SCRIPT
==============================================================================
Deploys `static-site/` to Hostinger (domains/kizeneducation.com/public_html).

Features:
  1. Default: High-reliability Atomic HTTPS Self-Deploy pattern.
     - Uploads a micro-deployer (1 KB) via FTP.
     - Transfers files via authenticated TLS 1.3 HTTPS POST.
     - Server writes files directly to NVMe in milliseconds (zero ProFTPD hangs).
     - Deployer automatically self-destructs (unlinks) upon execution.
  2. Fallback: Sequenced FTP upload (`--ftp`) with .in.* auto-clean and EPSV fix.
  3. Selective flags: `--html-only` to deploy only HTML pages.
==============================================================================
"""

import os
import sys
import ftplib
import socket
import re
import time
import json
import base64
import secrets
import urllib.request
import urllib.parse
import urllib.error

FTP_HOST = os.environ.get('FTP_HOST', '217.21.87.65')
FTP_PORT = int(os.environ.get('FTP_PORT', 21))
FTP_USER = os.environ.get('FTP_USER', 'u415724291')
FTP_PASS = os.environ.get('FTP_PASS', 'KizenAdmin@2026##')
REMOTE_BASE = '/domains/kizeneducation.com/public_html'
LOCAL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static-site'))
LIVE_BASE_URL = 'https://kizeneducation.com'


class RobustFTP(ftplib.FTP):
    """FTP client that handles Hostinger's 229 EPSV response to PASV."""
    def makepasv(self):
        if self.af == socket.AF_INET:
            try:
                resp = self.sendcmd('EPSV')
                m = re.search(r'\(\|\|\|(\d+)\|\)', resp)
                if m:
                    return self.sock.getpeername()[0], int(m.group(1))
            except Exception:
                pass
        return super().makepasv()


def clean_remote_temp_files(ftp):
    """Scans and deletes any orphan .in.* files left by interrupted ProFTPD transfers."""
    subdirs = [
        '', 'about', 'acca', 'ai-programmes', 'contact', 'corporate-training',
        'courses', 'fintech', 'ifrs', 'institutions/colleges',
        'institutions/institutes', 'institutions/schools', 'resources', 'wall-of-fame'
    ]
    cleaned = 0
    for s in subdirs:
        target = f"{REMOTE_BASE}/{s}" if s else REMOTE_BASE
        try:
            ftp.cwd(target)
            items = []
            ftp.retrlines('LIST -a', items.append)
            for it in items:
                if '.in.' in it:
                    fname = it.split()[-1]
                    try:
                        ftp.delete(fname)
                        cleaned += 1
                    except Exception:
                        pass
        except Exception:
            pass
    if cleaned > 0:
        print(f"Cleaned {cleaned} orphan temporary hidden files (.in.*) from server.")


def gather_files(html_only=False):
    """Collects files from static-site directory."""
    all_files = []
    for root, dirs, files in os.walk(LOCAL_DIR):
        rel_dir = os.path.relpath(root, LOCAL_DIR)
        if rel_dir == '.':
            rel_dir = ''
        for f in files:
            if html_only and not f.endswith('.html'):
                continue
            local_path = os.path.join(root, f)
            rel_path = os.path.join(rel_dir, f) if rel_dir else f
            all_files.append((local_path, rel_path.replace('\\', '/')))
    return sorted(all_files, key=lambda x: x[1])


def deploy_atomic_https(all_files):
    """
    Standard deployment method:
    Uploads a short-lived, token-authenticated PHP worker via FTP,
    posts base64 file payloads over HTTPS, and self-destructs the worker.
    """
    print("\n" + "=" * 78)
    print("MODE: ATOMIC HTTPS SELF-DEPLOY (Recommended / Standard)")
    print("=" * 78)

    token = secrets.token_hex(24)
    worker_filename = f".deployer_{secrets.token_hex(6)}.php"

    worker_php = f"""<?php
$AUTH_TOKEN = '{token}';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['token']) || $_POST['token'] !== $AUTH_TOKEN) {{
    http_response_code(403);
    echo "Forbidden\\n";
    exit;
}}

$raw = $_POST['payload'] ?? '';
$data = json_decode($raw, true);
if (!is_array($data)) {{
    http_response_code(400);
    echo "Invalid JSON\\n";
    exit;
}}

$results = [];
$baseDir = __DIR__;
foreach ($data as $relPath => $b64) {{
    $clean = str_replace(['..', '\\\\'], ['', '/'], $relPath);
    $clean = ltrim($clean, '/');
    $full = $baseDir . '/' . $clean;
    $d = dirname($full);
    if (!is_dir($d)) {{
        mkdir($d, 0755, true);
    }}
    $content = base64_decode($b64);
    $w = file_put_contents($full, $content);
    $results[$clean] = ($w !== false && $w === strlen($content));
}}

// Self-destruct immediately upon execution
@unlink(__FILE__);

header('Content-Type: application/json');
echo json_encode(['status' => 'OK', 'count' => count($results), 'results' => $results]);
"""

    print(f"1. Connecting to FTP to upload temporary worker ({worker_filename})...")
    ftp = RobustFTP()
    ftp.connect(FTP_HOST, FTP_PORT, timeout=20)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(REMOTE_BASE)

    clean_remote_temp_files(ftp)

    ftp.cwd(REMOTE_BASE)
    import io
    ftp.storbinary(f'STOR {worker_filename}', io.BytesIO(worker_php.encode('utf-8')))
    print(f"   Worker {worker_filename} staged successfully.")
    ftp.quit()

    try:
        print(f"\n2. Packaging and uploading {len(all_files)} files over HTTPS...")
        # Chunk payload into batches of 30 files if large
        batch_size = 40
        total_success = 0
        total_bytes = 0

        for i in range(0, len(all_files), batch_size):
            batch = all_files[i:i + batch_size]
            payload = {}
            batch_bytes = 0
            for local_path, rel_path in batch:
                content = open(local_path, 'rb').read()
                payload[rel_path] = base64.b64encode(content).decode('ascii')
                batch_bytes += len(content)

            total_bytes += batch_bytes
            print(f"   Transmitting batch {i // batch_size + 1} ({len(batch)} files, {batch_bytes:,} bytes)... ", end='', flush=True)

            post_data = urllib.parse.urlencode({
                'token': token,
                'payload': json.dumps(payload)
            }).encode('utf-8')

            req = urllib.request.Request(
                f"{LIVE_BASE_URL}/{worker_filename}",
                data=post_data,
                headers={'User-Agent': 'Kizen-Deployer/1.0'}
            )

            with urllib.request.urlopen(req, timeout=60) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('status') == 'OK':
                    success_count = sum(1 for v in res.get('results', {}).values() if v is True)
                    total_success += success_count
                    print(f"OK ({success_count}/{len(batch)} written)")
                else:
                    print(f"FAILED: {res}")
                    return False

        print(f"\n3. Deployment completed: {total_success} / {len(all_files)} files written ({total_bytes:,} bytes).")
        return total_success == len(all_files)

    finally:
        # Cleanup safety check: ensure worker file is gone
        try:
            req_check = urllib.request.Request(f"{LIVE_BASE_URL}/{worker_filename}")
            urllib.request.urlopen(req_check, timeout=5)
            # If 200, it didn't unlink itself, so delete via FTP
            f_clean = RobustFTP()
            f_clean.connect(FTP_HOST, FTP_PORT, timeout=10)
            f_clean.login(FTP_USER, FTP_PASS)
            f_clean.cwd(REMOTE_BASE)
            f_clean.delete(worker_filename)
            f_clean.quit()
        except urllib.error.HTTPError:
            # HTTP 404 confirmed self-deleted!
            pass
        except Exception:
            pass


def main():
    print("=" * 78)
    print("KIZEN EDUCATION - PRODUCTION STATIC SITE DEPLOYMENT")
    print(f"Source : {LOCAL_DIR}")
    print(f"Target : {LIVE_BASE_URL} ({REMOTE_BASE})")
    print("=" * 78)

    if not os.path.exists(LOCAL_DIR):
        print(f"ERROR: Local directory does not exist: {LOCAL_DIR}")
        sys.exit(1)

    html_only = '--html-only' in sys.argv
    force_ftp = '--ftp' in sys.argv

    all_files = gather_files(html_only=html_only)
    print(f"Total files prepared for deployment: {len(all_files)} (html_only={html_only})")

    t0 = time.time()
    success = False

    if not force_ftp:
        try:
            success = deploy_atomic_https(all_files)
        except Exception as e:
            print(f"\nHTTPS Deployer encountered error: {e}")
            print("Falling back to FTP mode...")
            force_ftp = True

    if force_ftp and not success:
        print("\n" + "=" * 78)
        print("MODE: FALLBACK SEQUENCED FTP UPLOAD")
        print("=" * 78)
        # Fallback FTP upload implementation
        ftp = RobustFTP()
        ftp.connect(FTP_HOST, FTP_PORT, timeout=60)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.cwd(REMOTE_BASE)
        clean_remote_temp_files(ftp)

        succ = 0
        for idx, (local_path, rel_path) in enumerate(all_files, 1):
            parts = rel_path.split('/')
            fname = parts[-1]
            subdirs = parts[:-1]
            ftp.cwd(REMOTE_BASE)
            for d in subdirs:
                try:
                    ftp.mkd(d)
                except Exception:
                    pass
                ftp.cwd(d)
            file_size = os.path.getsize(local_path)
            print(f"[{idx:2d}/{len(all_files)}] Uploading {rel_path:40s} ({file_size:7,d} B)... ", end='', flush=True)
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {fname}', f, blocksize=16384)
            print("OK")
            succ += 1
        ftp.quit()
        success = (succ == len(all_files))

    elapsed = time.time() - t0
    print("\n" + "=" * 78)
    if success:
        print(f"DEPLOYMENT 100% SUCCESSFUL in {elapsed:.1f}s")
        print("=" * 78)
        sys.exit(0)
    else:
        print(f"DEPLOYMENT FAILED after {elapsed:.1f}s")
        print("=" * 78)
        sys.exit(1)


if __name__ == '__main__':
    main()
