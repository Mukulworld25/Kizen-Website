"""
PRODUCTION STATIC SITE DEPLOYMENT SCRIPT
==============================================================================
Deploys `static-site/` to Hostinger (domains/kizeneducation.com/public_html)
using sequenced atomic cutover:
  1. Static media & assets (images, videos, brochures, store-badges)
  2. Styles, scripts, favicons, logos
  3. Nested directory pages (about, acca, courses, etc.)
  4. Server config (.htaccess, robots.txt, sitemap.xml, 404.html)
  5. Root index.html (LAST for zero-downtime cutover)
==============================================================================
"""

import os
import sys
import ftplib
import socket
import re
import time

FTP_HOST = '217.21.87.65'
FTP_PORT = 21
FTP_USER = 'u415724291'
FTP_PASS = 'KizenAdmin@2026##'
REMOTE_BASE = '/domains/kizeneducation.com/public_html'
LOCAL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static-site'))

class RobustFTP(ftplib.FTP):
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

def ensure_remote_dir(ftp, remote_dir_path):
    parts = [p for p in remote_dir_path.replace('\\', '/').split('/') if p]
    curr = REMOTE_BASE
    for part in parts:
        curr = f"{curr}/{part}"
        try:
            ftp.mkd(curr)
        except Exception:
            pass # exists

def get_file_priority(rel_path):
    rp = rel_path.replace('\\', '/').lower()
    if rp == 'index.html':
        return 5 # root index.html uploaded LAST
    if rp in ['.htaccess', 'robots.txt', 'sitemap.xml', '404.html']:
        return 4 # server config
    if rp.endswith('.html'):
        return 3 # subdirectory pages
    if rp.startswith(('styles.css', 'script.js', 'favicon', 'apple-touch-icon', 'kizen-logo')):
        return 2 # core css/js/favicons
    return 1 # static media / assets (images, videos, brochures, etc.)

def main():
    print('=' * 78)
    print('KIZEN EDUCATION - PRODUCTION STATIC SITE DEPLOYMENT')
    print(f'Source : {LOCAL_DIR}')
    print(f'Target : {FTP_HOST}:{FTP_PORT} -> {REMOTE_BASE}')
    print('=' * 78)

    if not os.path.exists(LOCAL_DIR):
        print(f'ERROR: Local directory does not exist: {LOCAL_DIR}')
        sys.exit(1)

    # Gather and categorize all local files
    all_files = []
    html_only = '--html-only' in sys.argv
    for root, dirs, files in os.walk(LOCAL_DIR):
        rel_dir = os.path.relpath(root, LOCAL_DIR)
        if rel_dir == '.':
            rel_dir = ''
        for f in files:
            if html_only and not f.endswith('.html'):
                continue
            local_path = os.path.join(root, f)
            rel_path = os.path.join(rel_dir, f) if rel_dir else f
            priority = get_file_priority(rel_path)
            all_files.append((priority, local_path, rel_path, rel_dir, f))

    # Sort files by priority ascending (1 -> 2 -> 3 -> 4 -> 5)
    all_files.sort(key=lambda x: (x[0], x[2]))

    print(f'Total files prepared for deployment: {len(all_files)}')
    for p in range(1, 6):
        count = sum(1 for item in all_files if item[0] == p)
        labels = {
            1: 'Group 1: Static assets & media',
            2: 'Group 2: Core CSS, JS & favicons',
            3: 'Group 3: Directory HTML pages',
            4: 'Group 4: Server config (.htaccess, sitemap, robots, 404)',
            5: 'Group 5: Root index.html (Atomic cutover)'
        }
        print(f'  {labels[p]:45s}: {count:3d} files')

    # Connect to FTP
    print(f'\nConnecting to FTP {FTP_HOST}:{FTP_PORT} as {FTP_USER}...')
    ftp = RobustFTP()
    ftp.encoding = 'utf-8'
    ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    print('FTP authentication successful.')

    # Navigate to REMOTE_BASE
    ftp.cwd(REMOTE_BASE)
    print(f'Active remote directory: {ftp.pwd()}')

    # Track upload progress
    total_bytes = 0
    success_count = 0
    fail_count = 0
    start_time = time.time()

    print(f'\nStarting sequenced upload of {len(all_files)} files...\n')

    for idx, (priority, local_path, rel_path, rel_dir, filename) in enumerate(all_files, 1):
        file_size = os.path.getsize(local_path)
        rel_path_unix = rel_path.replace('\\', '/')
        rel_dir_unix = rel_dir.replace('\\', '/')

        target_dir = f"{REMOTE_BASE}/{rel_dir_unix}" if rel_dir_unix else REMOTE_BASE
        if rel_dir_unix:
            ensure_remote_dir(ftp, rel_dir_unix)

        print(f'[{idx:2d}/{len(all_files)}] [{priority}] Uploading {rel_path_unix:42s} ({file_size:8,d} B)... ', end='', flush=True)

        try:
            ftp.cwd(target_dir)
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {filename}', f, blocksize=65536)
            print('OK')
            success_count += 1
            total_bytes += file_size
        except Exception as e:
            print(f'FAILED: {e}')
            fail_count += 1

    elapsed = time.time() - start_time
    ftp.quit()

    print('\n' + '=' * 78)
    print(f'DEPLOYMENT FINISHED in {elapsed:.1f}s')
    print(f'Transferred : {success_count} / {len(all_files)} files ({total_bytes:,} bytes)')
    print(f'Failures    : {fail_count}')
    print('=' * 78)

    if fail_count > 0:
        print('DEPLOYMENT HAD FAILURES - Review log before proceeding')
        sys.exit(1)
    else:
        print('DEPLOYMENT 100% SUCCESSFUL - Proceed to live URL verification')
        sys.exit(0)

if __name__ == '__main__':
    main()
