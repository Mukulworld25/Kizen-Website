import os
import sys
import ftplib
import time

FTP_HOST = os.environ.get('FTP_HOST', '[FTP_HOST]')
FTP_USER = os.environ.get('FTP_USER', '[FTP_USERNAME]')
FTP_PASS = os.environ.get('FTP_PASS', '[FTP_PASSWORD]')
FTP_PORT = int(os.environ.get('FTP_PORT', '21'))

# Find dist directory
script_dir = os.path.dirname(os.path.abspath(__file__))
if os.path.exists(os.path.join(script_dir, 'dist')):
    LOCAL_DIST = os.path.join(script_dir, 'dist')
elif os.path.exists(os.path.join(script_dir, 'kizen-react', 'dist')):
    LOCAL_DIST = os.path.join(script_dir, 'kizen-react', 'dist')
else:
    LOCAL_DIST = r'd:\KIZEN website\kizen-react\dist'

REMOTE_ROOT = 'public_html'

def deploy():
    print(f"Connecting to FTP server {FTP_HOST}:{FTP_PORT} as {FTP_USER}...")
    ftp = None
    try:
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        print("FTP login successful.")
    except Exception as e:
        print(f"Standard FTP connection failed: {e}")
        try:
            print("Trying FTP_TLS...")
            ftp = ftplib.FTP_TLS()
            ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
            ftp.login(FTP_USER, FTP_PASS)
            ftp.prot_p()
            print("FTP_TLS login successful.")
        except Exception as e2:
            print(f"FTP_TLS also failed: {e2}")
            sys.exit(1)

    print("Current remote directory:", ftp.pwd())

    # Navigate to public_html
    try:
        ftp.cwd(REMOTE_ROOT)
        print(f"Changed to remote directory: {ftp.pwd()}")
    except Exception:
        print(f"Note: Could not cwd to {REMOTE_ROOT}, continuing in root {ftp.pwd()}")

    def ensure_remote_dir(remote_dir_path):
        parts = [p for p in remote_dir_path.replace('\\', '/').split('/') if p]
        curr = ''
        for part in parts:
            curr = f"{curr}/{part}" if curr else part
            try:
                ftp.mkd(curr)
            except Exception:
                pass

    files_to_upload = []
    index_html_item = None

    for root, dirs, files in os.walk(LOCAL_DIST):
        rel_dir = os.path.relpath(root, LOCAL_DIST)
        if rel_dir == '.':
            rel_dir = ''
        for f in files:
            local_path = os.path.join(root, f)
            rel_path = os.path.join(rel_dir, f) if rel_dir else f
            if f == 'index.html' and rel_dir == '':
                index_html_item = (local_path, rel_path, rel_dir, f)
            else:
                files_to_upload.append((local_path, rel_path, rel_dir, f))

    if index_html_item:
        files_to_upload.append(index_html_item)

    print(f"\nStarting upload of {len(files_to_upload)} files from {LOCAL_DIST}...\n")
    success_count = 0
    fail_count = 0
    total_bytes = 0
    start_time = time.time()

    for idx, (local_path, rel_path, rel_dir, filename) in enumerate(files_to_upload, 1):
        file_size = os.path.getsize(local_path)
        rel_path_unix = rel_path.replace('\\', '/')
        rel_dir_unix = rel_dir.replace('\\', '/')

        if rel_dir_unix:
            ensure_remote_dir(rel_dir_unix)

        print(f"[{idx:2d}/{len(files_to_upload)}] Uploading {rel_path_unix} ({file_size:,} B)... ", end='', flush=True)

        try:
            if rel_dir_unix:
                ftp.cwd(f"/{REMOTE_ROOT}/{rel_dir_unix}")

            with open(local_path, 'rb') as fp:
                ftp.storbinary(f'STOR {filename}', fp, blocksize=65536)

            try:
                ftp.cwd(f"/{REMOTE_ROOT}")
            except Exception:
                pass

            print("[OK]")
            success_count += 1
            total_bytes += file_size
        except Exception as err:
            print(f"[FAILED: {err}]")
            fail_count += 1

    elapsed = time.time() - start_time
    print("\n" + "="*60)
    print(f"Deployment Summary:")
    print(f"  Total Files Processed: {len(files_to_upload)}")
    print(f"  Uploaded Successfully: {success_count}")
    print(f"  Failed: {fail_count}")
    print(f"  Total Data Transferred: {total_bytes:,} bytes ({total_bytes / (1024*1024):.2f} MB)")
    print(f"  Time Elapsed: {elapsed:.1f} seconds")
    print("="*60 + "\n")

    ftp.quit()

if __name__ == '__main__':
    deploy()
