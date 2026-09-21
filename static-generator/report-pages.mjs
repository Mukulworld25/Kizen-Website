// Page review report: one row per generated page showing what the static file
// actually carries. This is the evidence that the head capture preserved
// seo.js's per-page title, description, canonical and JSON-LD.
//
//   node static-generator/report-pages.mjs
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'static-site'

function walkHtml(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walkHtml(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const grab = (html, re) => {
  const m = html.match(re)
  return m ? m[1].replace(/\s+/g, ' ').trim() : ''
}

const files = walkHtml(SITE).sort()
const titles = new Set()
const rows = []

for (const file of files) {
  const rel = file.replace(/\\/g, '/').replace(/^static-site\//, '')
  const html = fs.readFileSync(file, 'utf8')
  const title = grab(html, /<title>([^<]*)<\/title>/)
  const canon = grab(html, /<link rel="canonical" href="([^"]*)"/)
  const desc = grab(html, /<meta name="description" content="([^"]*)"/)
  const h1 = grab(html, /<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, '')
  const jsonld = (html.match(/application\/ld\+json/g) || []).length
  const imgs = (html.match(/<img /g) || []).length
  const vids = (html.match(/<video /g) || []).length
  const links = (html.match(/<a /g) || []).length
  titles.add(title)
  rows.push({ rel, kb: fs.statSync(file).size / 1024, title, canon, desc, h1, jsonld, imgs, vids, links })
}

console.log('='.repeat(100))
console.log('STATIC PAGE REVIEW   (' + rows.length + ' pages)')
console.log('='.repeat(100))

for (const r of rows) {
  console.log('\n' + r.rel + '   (' + r.kb.toFixed(1) + ' KB)')
  console.log('  title     : ' + (r.title || '(MISSING)').slice(0, 92))
  console.log('  canonical : ' + (r.canon || '(MISSING)'))
  console.log('  h1        : ' + (r.h1 || '(none)').slice(0, 80))
  console.log('  desc      : ' + (r.desc || '(MISSING)').slice(0, 92))
  console.log('  jsonld=' + r.jsonld + '  img=' + r.imgs + '  video=' + r.vids + '  links=' + r.links)
}

console.log('\n' + '='.repeat(100))
console.log('  unique titles : ' + titles.size + '/' + rows.length)
const noCanon = rows.filter((r) => !r.canon)
const noTitle = rows.filter((r) => !r.title)
const noDesc = rows.filter((r) => !r.desc)
console.log('  missing title : ' + noTitle.length + '   missing canonical: ' + noCanon.length + '   missing desc: ' + noDesc.length)
if (titles.size !== rows.length) {
  const dup = rows.map((r) => r.title).filter((t, i, a) => a.indexOf(t) !== i)
  console.log('  DUPLICATE TITLES: ' + [...new Set(dup)].join(' | '))
}
console.log('='.repeat(100))