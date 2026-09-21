// END-TO-END LEAD CAPTURE TEST for the static site.
//
// The single most important thing to prove: a lead submitted through the new
// static HTML form actually lands in Supabase, verified by SELECTing the row
// back - the same standard every previous phase of this project used.
//
//   node static-generator/test-lead-capture.mjs [baseUrl]
//
// NOTE: this writes a REAL row to the production leads table. The marker name
// makes it easy to find and delete afterwards.
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.argv[2] || 'http://localhost:8099'

const SB_URL = 'https://qlcuqmtpvncxbrvijnzt.supabase.co'
const SB_KEY = 'sb_publishable_jmJzgy2ONFm-73ULQvupRg_lVe2N27L'
const ENDPOINT = SB_URL + '/rest/v1/leads'

const MARKER = 'ZZ-STATIC-CONVERSION-TEST'
const PHONE = '+91 90000 12345'

const H = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }

async function count() {
  const r = await fetch(ENDPOINT + '?select=id', {
    method: 'HEAD',
    headers: Object.assign({ Prefer: 'count=exact', Range: '0-0' }, H),
  })
  const cr = r.headers.get('content-range') || ''
  return { status: r.status, total: cr.split('/')[1] }
}

async function findByName(name) {
  const r = await fetch(
    ENDPOINT + '?select=*&name=eq.' + encodeURIComponent(name) + '&order=created_at.desc',
    { headers: H }
  )
  return { status: r.status, rows: r.status === 200 ? await r.json() : await r.text() }
}

function log(msg) { console.log(msg) }

const before = await count()
log('='.repeat(78))
log('END-TO-END LEAD CAPTURE TEST   ' + BASE)
log('='.repeat(78))
log('baseline rows in public.leads : ' + before.total + '   (HTTP ' + before.status + ')')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const reqs = []
page.on('request', (r) => {
  if (r.url().indexOf('supabase.co') !== -1) {
    reqs.push({ url: r.url(), method: r.method(), post: r.postData(), status: undefined })
  }
})
page.on('response', (r) => {
  if (r.url().indexOf('supabase.co') !== -1) {
    const hit = reqs.find((x) => x.url === r.url() && x.status === undefined)
    if (hit) hit.status = r.status()
  }
})
const consoleMsgs = []
page.on('console', (m) => consoleMsgs.push(m.type() + ': ' + m.text().slice(0, 200)))

log('\n--- loading ' + BASE + '/ (Home) ---')
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise((r) => setTimeout(r, 1500))

const formInfo = await page.evaluate(() => {
  const forms = Array.from(document.querySelectorAll('form'))
  const inline = forms.filter((f) => f.querySelector('input[name="name"]') && !f.closest('[data-kizen-panel]'))
  return { total: forms.length, inline: inline.length }
})
log('forms on page: ' + formInfo.total + '   inline enquiry forms: ' + formInfo.inline)

if (formInfo.inline < 1) {
  log('!! no inline enquiry form found - ABORT')
  await browser.close()
  process.exit(1)
}

const filled = await page.evaluate((marker, phone) => {
  const form = Array.from(document.querySelectorAll('form'))
    .find((f) => f.querySelector('input[name="name"]') && !f.closest('[data-kizen-panel]'))
  if (!form) return { ok: false }
  const set = (el, v) => {
    el.value = v
    el.dispatchEvent(new Event('input', { bubbles: true }))
    el.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const n = form.querySelector('input[name="name"]')
  const p = form.querySelector('input[name="phone"]')
  const s = form.querySelector('select[name="programme"]')
  if (!n || !p) return { ok: false }
  set(n, marker)
  set(p, phone)
  if (s && s.options[1]) set(s, s.options[1].value)
  return { ok: true, programme: s ? s.value : '(none)' }
}, MARKER, PHONE)
log('filled form: ' + JSON.stringify(filled))

const t0 = Date.now()
await page.evaluate(() => {
  const form = Array.from(document.querySelectorAll('form'))
    .find((f) => f.querySelector('input[name="name"]') && !f.closest('[data-kizen-panel]'))
  form.querySelector('button[type="submit"]').click()
})

let tyShown = false
try {
  await page.waitForFunction(() => !!document.querySelector('[data-kizen-thankyou]'), {
    timeout: 9000, polling: 150,
  })
  tyShown = true
} catch (e) { /* reported below */ }
const elapsed = Date.now() - t0

const tyText = await page.evaluate(() => {
  const el = document.querySelector('[data-kizen-thankyou]')
  return el ? el.innerText.replace(/\s+/g, ' ').trim().slice(0, 140) : ''
})

log('\nThank You screen shown : ' + tyShown + '   (after ' + elapsed + 'ms)')
log('Thank You text         : ' + (tyText || '(none)'))

log('\n--- supabase requests observed ---')
if (!reqs.length) log('  (none!)')
for (const r of reqs) {
  log('  ' + r.method + ' ' + r.url.replace(SB_URL, '') + '  -> HTTP ' + (r.status === undefined ? '?' : r.status))
  if (r.post) log('      body: ' + r.post)
}

const interesting = consoleMsgs.filter((m) => /Kizen/i.test(m))
if (interesting.length) {
  log('\n--- our own console output ---')
  interesting.forEach((m) => log('  ' + m))
}

await new Promise((r) => setTimeout(r, 1500))
await browser.close()

log('\n--- verifying in the database (SELECT read-back) ---')
const found = await findByName(MARKER)
log('query HTTP ' + found.status + ', rows returned: ' + (Array.isArray(found.rows) ? found.rows.length : found.rows))

const after = await count()
log('rows after submit      : ' + after.total + '   (was ' + before.total + ')')

let pass = true
const problems = []
if (!tyShown) { pass = false; problems.push('Thank You screen never appeared') }
if (!Array.isArray(found.rows) || found.rows.length === 0) {
  pass = false
  problems.push('lead NOT found in Supabase by SELECT')
}
if (before.total && after.total && Number(after.total) !== Number(before.total) + 1) {
  pass = false
  problems.push('row count did not increase by exactly 1 (' + before.total + ' -> ' + after.total + ')')
}

if (Array.isArray(found.rows) && found.rows[0]) {
  const row = found.rows[0]
  log('\n--- the row that landed ---')
  log('  id            : ' + row.id)
  log('  created_at    : ' + row.created_at)
  log('  name          : ' + row.name)
  log('  phone         : ' + row.phone)
  log('  programme     : ' + row.programme)
  log('  source        : ' + row.source)
  log('  qualification : ' + JSON.stringify(row.qualification))
  log('  message       : ' + JSON.stringify(row.message))
}

log('\n' + '='.repeat(78))
log(pass ? 'LEAD CAPTURE: PASS' : 'LEAD CAPTURE: FAIL')
problems.forEach((p) => log('  !! ' + p))
log('='.repeat(78))
process.exit(pass ? 0 : 1)

