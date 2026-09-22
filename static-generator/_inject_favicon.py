import glob

FAVICON_TAGS = """    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
"""

files = glob.glob('static-site/**/*.html', recursive=True)
count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if 'rel="icon"' not in content:
        target = '<link rel="stylesheet" href="/styles.css" />'
        if target in content:
            new_content = content.replace(target, FAVICON_TAGS + '    ' + target)
            with open(f, 'w', encoding='utf-8') as out:
                out.write(new_content)
            print(f'Injected favicon into: {f}')
            count += 1
        else:
            print(f'Target not found in: {f}')
    else:
        print(f'Already has favicon: {f}')

print(f'\nTotal updated: {count} / {len(files)}')
