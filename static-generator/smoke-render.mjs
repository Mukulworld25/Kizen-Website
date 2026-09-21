// Render smoke test against the LOCAL static build.
// Confirms the pages are not just valid HTML but actually STYLE correctly:
// checks computed CSS values, the sticky header, and that the only missing
// resource is /script.js (which arrives in Phase 2).
//
//   node static-generator/smoke-render.mjs [baseUrl]
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.argv[2] || 'http://localhost:8099'

const PAGES = ['/', '/acca/', '/courses/', '/about/', '/institutions/schools/', '/404.html']

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

console.log('='.repeat(78))
console.log('RENDER SMOKE TEST   ' + BASE)
console.log('='.repeat(78))

let failures = 0
for (const p of PAGES) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const errs = []
  const failed = []
  page.on('pageerror', (e) => errs.push('JS: ' + e.message.slice(0, 90)))
  page.on('requestfailed', (r) => failed.push(r.url().replace(BASE, '')))
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(r.url().replace(BASE, '') + ' [' + r.status() + ']')
  })

  await page.goto(BASE + p, { waitUntil: 'networkidle2', timeout: 30000 })

  const info = await page.evaluate(() => {
    const cs = (sel, prop) => {
      const el = document.querySelector(sel)
      return el ? getComputedStyle(el)[prop] : 'NO-EL'
    }
    return {
      bodyBg: cs('body', 'backgroundColor'),
      bodyFont: cs('body', 'fontFamily').slice(0, 40),
      headerPos: cs('header', 'position'),
      headerZ: cs('header', 'zIndex'),
      htmlBg: cs('html', 'backgroundColor'),
      h1Color: cs('h1', 'color'),
      h1Font: cs('h1', 'fontFamily').slice(0, 40),
      sections: document.querySelectorAll('section').length,
      links: document.querySelectorAll('a').length,
      imgs: document.querySelectorAll('img').length,
      cssSheets: document.styleSheets.length,
      stickyBar: !!document.querySelector('.lg\\:hidden.fixed.bottom-0'),
      partials: !!document.getElementById('kizen-partials'),
    }
  })

  // Expect the ivory page background (#fbf9f4) and the serif h1 family
  const bgOk = info.bodyBg === 'rgb(251, 249, 244)'
  const fontOk = /Fraunces|serif/i.test(info.h1Font)
  const stickyOk = info.headerPos === 'sticky'
  const ok = bgOk && fontOk && stickyOk && info.cssSheets > 0

  if (!ok) failures++
  console.log('\n' + p)
  console.log('  body bg      : ' + info.bodyBg + (bgOk ? '  ok' : '  !! expected rgb(251, 249, 244)'))
  console.log('  h1 font      : ' + info.h1Font + (fontOk ? '  ok' : '  !! expected serif'))
  console.log('  header       : position=' + info.headerPos + ' z=' + info.headerZ + (stickyOk ? '  ok' : '  !!'))
  console.log('  h1 colour    : ' + info.h1Color)
  console.log('  sheets=' + info.cssSheets + '  sections=' + info.sections + '  links=' + info.links + '  imgs=' + info.imgs)
  console.log('  sticky bar=' + info.stickyBar + '  partials injected=' + info.partials)
  if (errs.length) console.log('  JS errors    : ' + errs.join(' | '))
  if (failed.length) {
    const uniq = [...new Set(failed)]
    console.log('  failed reqs  : ' + uniq.join(', '))
  }
  await page.close()
}

await browser.close()
console.log('\n' + '='.repeat(78))
console.log(failures ? 'SMOKE: ' + failures + ' page(s) FAILED styling checks' : 'SMOKE: all pages render with correct styling')
console.log('(any /script.js 404 is expected until Phase 2 writes it)')
console.log('='.repeat(78))