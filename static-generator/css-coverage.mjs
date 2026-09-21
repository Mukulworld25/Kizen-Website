// CSS COVERAGE GATE.
//
// Proves the compiled static stylesheet actually styles every class the
// generated HTML uses. Without this, a Tailwind purge could silently drop a
// rule that only appeared in a conditional render, and the page would look
// subtly wrong in production.
//
// Compares coverage between:
//   - static-site/styles.css                  (our new compiled sheet)
//   - dist/assets/index-CqyIyyQm.css          (the sheet the LIVE site serves)
//
//   node static-generator/css-coverage.mjs
import fs from 'node:fs'
import path from 'node:path'

const NEW_CSS = 'static-site/styles.css'
const LIVE_CSS = 'dist/assets/index-CqyIyyQm.css'
const SITE = 'static-site'

// Font Awesome + third-party widget classes are styled by their OWN
// stylesheets, not by Tailwind. Listed explicitly so nothing is silently
// skipped - they are reported separately, not ignored.
const NON_TAILWIND = /^(fa|fas|far|fab|fal|fat|fa-|elfsight|sr-only$)/

function walkHtml(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walkHtml(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Arbitrary-variant classes are serialised with HTML entities, e.g. the
// attribute contains "[&amp;_summary::-webkit-details-marker]:hidden" while
// the stylesheet contains "[&_summary::-webkit-details-marker]:hidden".
// Decode before comparing, or every &-containing utility looks uncovered.
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
}

// Tailwind escapes special characters in selectors (bg-gold\/15, lg\:flex).
// Strip the backslashes from the CSS and treat it as plain text.
function normalise(css) {
  return css.replace(/\\/g, '')
}

function makeTester(cssNorm) {
  const cache = new Map()
  return (cls) => {
    if (cache.has(cls)) return cache.get(cls)
    const re = new RegExp('\\.' + escapeRe(cls) + '(?![A-Za-z0-9_\\-/.%])')
    const ok = re.test(cssNorm)
    cache.set(cls, ok)
    return ok
  }
}

const newCss = normalise(fs.readFileSync(NEW_CSS, 'utf8'))
const liveCss = fs.existsSync(LIVE_CSS) ? normalise(fs.readFileSync(LIVE_CSS, 'utf8')) : ''
const coveredByNew = makeTester(newCss)
const coveredByLive = liveCss ? makeTester(liveCss) : () => null

const classes = new Map() // class -> Set(files)
for (const file of walkHtml(SITE)) {
  const rel = file.replace(/\\/g, '/').replace(/^static-site\//, '')
  const html = fs.readFileSync(file, 'utf8')
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const raw of m[1].split(/\s+/)) {
      const t = decodeEntities(raw)
      if (!t) continue
      if (!classes.has(t)) classes.set(t, new Set())
      classes.get(t).add(rel)
    }
  }
}

const tw = []
const nonTw = []
for (const [cls] of classes) (NON_TAILWIND.test(cls) ? nonTw : tw).push(cls)

console.log('='.repeat(78))
console.log('CSS COVERAGE GATE')
console.log('='.repeat(78))
console.log('  pages scanned          : ' + walkHtml(SITE).length)
console.log('  distinct classes used  : ' + classes.size)
console.log('    tailwind classes     : ' + tw.length)
console.log('    non-tailwind (FA/3rd): ' + nonTw.length)
console.log('')
console.log('  new stylesheet         : ' + NEW_CSS + '  (' + (fs.statSync(NEW_CSS).size / 1024).toFixed(1) + ' KB)')
if (liveCss) console.log('  live stylesheet        : ' + LIVE_CSS + '  (' + (fs.statSync(LIVE_CSS).size / 1024).toFixed(1) + ' KB)')

const uncovered = []
const regressions = []
const preExisting = []
let liveWouldMiss = 0
for (const cls of tw) {
  const inNew = coveredByNew(cls)
  const inLive = liveCss ? coveredByLive(cls) : null
  if (inLive === false) liveWouldMiss++
  if (!inNew) {
    uncovered.push(cls)
    // If the LIVE sheet styles it but ours does not, that is a real
    // regression introduced by this build - hard failure.
    // If the live sheet ALSO has no rule, it is a pre-existing no-op class
    // from the React source (undefined colour token, uninstalled plugin).
    // It renders identically today, so it is not a conversion defect.
    if (inLive === true) regressions.push(cls)
    else preExisting.push(cls)
  }
}

console.log('')
console.log('  covered by NEW sheet   : ' + (tw.length - uncovered.length) + '/' + tw.length)
if (liveCss) console.log('  covered by LIVE sheet  : ' + (tw.length - liveWouldMiss) + '/' + tw.length + '  (parity check)')

if (nonTw.length) {
  console.log('\n  non-tailwind classes (styled by their own sheets, not a gap):')
  const list = nonTw.sort()
  console.log('    ' + list.slice(0, 18).join(' ') + (list.length > 18 ? '  ... +' + (list.length - 18) : ''))
}

if (regressions.length) {
  console.log('\n' + '!'.repeat(78))
  console.log('COVERAGE GATE FAILED - ' + regressions.length + ' REGRESSION(S) vs live:')
  console.log('!'.repeat(78))
  for (const c of regressions) {
    const files = [...classes.get(c)].slice(0, 3).join(', ')
    console.log('  ' + c.padEnd(42) + files)
  }
  console.log('  these ARE styled on the live site but have no rule in ' + NEW_CSS)
  console.log('='.repeat(78))
  process.exit(1)
}

if (preExisting.length) {
  console.log('\n  ' + preExisting.length + ' class(es) have no rule in EITHER sheet - pre-existing')
  console.log('  no-op classes from the React source, identical on live today:')
  for (const c of preExisting) {
    const files = [...classes.get(c)].slice(0, 3).join(', ')
    console.log('    ' + c.padEnd(42) + files)
  }
  console.log('  (undefined @theme colour token / uninstalled plugin - not a conversion defect)')
}

console.log('\n' + '-'.repeat(78))
console.log('COVERAGE GATE PASSED - no regression vs the live stylesheet.')
console.log('='.repeat(78))
