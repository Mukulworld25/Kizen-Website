// Screenshot the Thank You state of the static form, so it can be inspected
// visually rather than trusted. Also captures the modal "book" panel.
//
//   node static-generator/shot-thankyou.mjs [baseUrl]
import fs from 'node:fs'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.argv[2] || 'http://localhost:8099'
const OUT = 'static-generator/_shots'
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

async function shot(name, clip) {
  const p = OUT + '/' + name + '.png'
  await page.screenshot(clip ? { path: p, clip } : { path: p })
  console.log('  saved ' + p)
}

function boxOf(sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: Math.max(0, r.x - 12), y: Math.max(0, r.y - 12), width: Math.min(r.width + 24, 1440), height: r.height + 24 }
  }, sel)
}

/* ---- 1. inline Home form -> Thank You ---------------------------------- */
console.log('=== inline home form ===')
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise((r) => setTimeout(r, 1200))

const formBox = await boxOf('form:not([data-kizen-panel] form)')
if (formBox) await shot('01-form-before', formBox)

await page.evaluate(() => {
  const form = Array.from(document.querySelectorAll('form'))
    .find((f) => f.querySelector('input[name="name"]') && !f.closest('[data-kizen-panel]'))
  const set = (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })) }
  set(form.querySelector('input[name="name"]'), 'Visual Check')
  set(form.querySelector('input[name="phone"]'), '+91 90000 33333')
  form.querySelector('button[type="submit"]').click()
})

await page.waitForFunction(() => !!document.querySelector('[data-kizen-thankyou]'), { timeout: 9000 })
await new Promise((r) => setTimeout(r, 600))
const tyBox = await boxOf('[data-kizen-thankyou]')
if (tyBox) await shot('02-thankyou-navy', tyBox)

/* ---- 2. modal "Book a Seat" panel -------------------------------------- */
console.log('=== modal book panel ===')
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise((r) => setTimeout(r, 1000))
await page.evaluate(() => {
  const a = document.querySelector('a[href="#enquiry"]')
  if (a) a.click()
})
await new Promise((r) => setTimeout(r, 1200))
await shot('03-modal-book')

/* ---- 3. FAB quick actions open ----------------------------------------- */
console.log('=== FAB open ===')
await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Close panel"]')
  if (btn) btn.click()
})
await new Promise((r) => setTimeout(r, 800))
await page.evaluate(() => {
  const fab = document.querySelector('button[aria-label="Open quick actions"]')
  if (fab) fab.click()
})
await new Promise((r) => setTimeout(r, 1000))
const fabBox = await boxOf('button[aria-label="Close quick actions"]')
if (fabBox) {
  await shot('04-fab-open', {
    x: Math.max(0, fabBox.x - 200), y: fabBox.y - 240,
    width: Math.min(420, 1440 - Math.max(0, fabBox.x - 200)), height: fabBox.height + 260,
  })
}

/* ---- 4. contact variant Thank You (light card) ------------------------- */
console.log('=== contact light-card form ===')
await page.goto(BASE + '/contact/', { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise((r) => setTimeout(r, 1200))
const cFormBox = await boxOf('form:not([data-kizen-panel] form)')
if (cFormBox) await shot('05-contact-form-before', cFormBox)
await page.evaluate(() => {
  const form = Array.from(document.querySelectorAll('form'))
    .find((f) => f.querySelector('input[name="name"]') && !f.closest('[data-kizen-panel]'))
  const set = (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })) }
  set(form.querySelector('input[name="name"]'), 'Visual Check Contact')
  set(form.querySelector('input[name="phone"]'), '+91 90000 44444')
  const em = form.querySelector('input[name="email"]')
  if (em) set(em, 'visual@example.com')
  form.querySelector('button[type="submit"]').click()
})
await page.waitForFunction(() => !!document.querySelector('[data-kizen-thankyou]'), { timeout: 9000 })
await new Promise((r) => setTimeout(r, 600))
const ctyBox = await boxOf('[data-kizen-thankyou]')
if (ctyBox) await shot('06-thankyou-light', ctyBox)

await browser.close()
console.log('\ndone -> ' + OUT)
