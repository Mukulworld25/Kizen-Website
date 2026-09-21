// Diagnostic: list EVERY relative reference (./ or ../) in src, including
// values inside data arrays (not just src=/href= attributes).
//
// Why this matters: the static conversion serves pages from directory URLs
// (/about/, /acca/). A relative path like './images/x.webp' resolves against
// the CURRENT DIRECTORY, so it becomes /about/images/x.webp -> 404. Every
// relative reference must become root-absolute.
//
//   node static-generator/scan-source-relative.mjs
import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src'
const RE = /(['"`])(\.{1,2}\/[^'"`\s]*)\1/g

let total = 0
const files = []

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(jsx|js)$/.test(e.name)) scan(p)
  }
}

function scan(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  const hits = []
  lines.forEach((line, i) => {
    if (line.includes('from ')) return // import specifier, not a URL
    RE.lastIndex = 0
    const found = line.match(RE)
    if (found) hits.push({ n: i + 1, found, line: line.trim() })
  })
  if (hits.length) {
    files.push({ file, hits })
    total += hits.length
  }
}

walk(ROOT)

console.log('=================================================================')
console.log('RELATIVE REFERENCES IN SOURCE (excluding import specifiers)')
console.log('=================================================================')
for (const { file, hits } of files) {
  console.log('\n' + file + '   (' + hits.length + ')')
  for (const h of hits) {
    console.log('  line ' + h.n + '  ' + h.found.join('  '))
    console.log('      ' + h.line.slice(0, 120))
  }
}
console.log('\n=================================================================')
console.log('TOTAL relative references: ' + total + ' across ' + files.length + ' files')
console.log('ALL of these must be rewritten to root-absolute (/...) in the')
console.log('static build, or they will 404 under directory URLs.')
console.log('=================================================================')
