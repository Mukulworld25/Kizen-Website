// BUILD GATES for the static conversion.
//
// Fails (exit 1) on any of:
//   1. a leftover Vite build reference (/assets/...)
//   2. a RELATIVE path (href/src/poster="something" or "./...") - these 404
//      under directory URLs and are the single biggest silent-breakage risk
//      of this conversion
//   3. an internal link that does not resolve to a generated page
//   4. an asset reference (image/video/pdf) with no file behind it
//   5. a page missing its required infrastructure
//      (title, canonical, styles.css, script.js, GTM, injected partials)
//
//   node static-generator/gates.mjs
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'static-site'
const ASSET_ROOTS = ['static-site', 'public']
const ASSET_EXT = /\.(pdf|webp|jpe?g|png|svg|mp4|webm|xml|txt|ico|css|js|mjs|json|woff2?)$/i
const EXTERNAL = /^(https?:|mailto:|tel:|data:|javascript:)/i

function walkHtml(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walkHtml(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

function assetExists(urlPath) {
  const rel = urlPath.replace(/^\//, '')
  return ASSET_ROOTS.some((root) => fs.existsSync(path.join(root, rel)))
}

function pageExists(urlPath) {
  const rel = urlPath.replace(/^\//, '').replace(/\/$/, '')
  if (!rel) return fs.existsSync(path.join(SITE, 'index.html'))
  return (
    fs.existsSync(path.join(SITE, rel, 'index.html')) ||
    fs.existsSync(path.join(SITE, rel + '.html'))
  )
}

const problems = []
const notes = []
const seenInternal = new Set()
const seenAssets = new Set()

function fail(file, kind, detail) {
  problems.push({ file, kind, detail })
}

const files = walkHtml(SITE)
console.log('='.repeat(78))
console.log('STATIC BUILD GATES    (' + files.length + ' pages)')
console.log('='.repeat(78))

for (const file of files) {
  const rel = file.replace(/\\/g, '/').replace(/^static-site\//, '')
  const html = fs.readFileSync(file, 'utf8')

  // ---- 5. required infrastructure ----
  if (!/<title>[^<]/.test(html)) fail(rel, 'MISSING', '<title>')
  if (!/rel="canonical"/.test(html)) fail(rel, 'MISSING', 'canonical link')
  if (!/href="\/styles\.css"/.test(html)) fail(rel, 'MISSING', '/styles.css link')
  if (!/<script src="\/script\.js" defer>/.test(html)) fail(rel, 'MISSING', '/script.js tag')
  if (!/googletagmanager/.test(html)) fail(rel, 'MISSING', 'GTM')
  if (!/id="kizen-partials"/.test(html)) fail(rel, 'MISSING', 'injected partials')

  // ---- 1. no Vite leftovers ----
  if (/\/assets\//.test(html)) fail(rel, 'VITE_REF', '/assets/ reference remains')

  // ---- 2. relative paths (the big one) ----
  const relAttr = html.match(/\b(href|src|poster|action|data-src)="(?!https?:|mailto:|tel:|data:|javascript:|#|\/)([^"]*)"/gi)
  if (relAttr) {
    for (const m of relAttr.slice(0, 5)) fail(rel, 'RELATIVE_PATH', m.slice(0, 90))
  }

  // ---- 3 & 4. resolve every link ----
  for (const m of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const url = m[1]
    if (!url || url.startsWith('#')) continue
    if (EXTERNAL.test(url)) continue
    if (!url.startsWith('/')) {
      fail(rel, 'RELATIVE_PATH', url.slice(0, 90))
      continue
    }
    if (ASSET_EXT.test(url.split('?')[0].split('#')[0])) {
      seenAssets.add(url)
      if (!assetExists(url)) fail(rel, 'BROKEN_ASSET', url)
    } else {
      const clean = url.split('#')[0].split('?')[0]
      if (clean === '/') continue
      seenInternal.add(clean)
      if (!pageExists(clean)) fail(rel, 'BROKEN_LINK', url)
    }
  }
}

// ---- report ----
console.log('\ninternal page links checked : ' + seenInternal.size)
for (const u of [...seenInternal].sort()) console.log('   ' + u)
console.log('\nasset links checked         : ' + seenAssets.size)

if (problems.length) {
  console.log('\n' + '!'.repeat(78))
  console.log('GATE FAILURES: ' + problems.length)
  console.log('!'.repeat(78))
  for (const p of problems) console.log('  [' + p.kind + '] ' + p.file + '  ' + p.detail)
  console.log('='.repeat(78))
  process.exit(1)
} else {
  console.log('\n' + '-'.repeat(78))
  console.log('ALL GATES PASSED')
  console.log('  no vite leftovers, no relative paths, no broken links or assets,')
  console.log('  every page carries title + canonical + css + js + GTM + partials')
  console.log('='.repeat(78))
}
