// VARIANT COVERAGE TEST for the static lead capture.
//
// The Home form proved the pipeline works. This proves EVERY variant does,
// including the two fields added in Phase 2 (qualification, message) and the
// two modal forms that are only reachable through the FAB / #enquiry links.
//
//   node static-generator/test-lead-variants.mjs [baseUrl]
//
// Writes real rows to the production leads table, prefixed ZZ-VAR- so they are
// trivial to find and delete.
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = process.argv[2] || 'http://localhost:8099'

const SB_URL = 'https://qlcuqmtpvncxbrvijnzt.supabase.co'
const SB_KEY = 'sb_publishable_jmJzgy2ONFm-73ULQvupRg_lVe2N27L'
const ENDPOINT = SB_URL + '/rest/v1/leads'
const H = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }

const PHONE = '+91 90000 22222'

// Optional 2nd arg: run only scenarios whose key contains this string, e.g.
//   node static-generator/test-lead-variants.mjs http://localhost:8099 modal
const ONLY = process.argv[3] || ''

async function findRow(name) {
  const r = await fetch(
    ENDPOINT + '?select=*&name=eq.' + encodeURIComponent(name) + '&order=created_at.desc&limit=1',
    { headers: H }
  )
  if (r.status !== 200) return null
  const rows = await r.json()
  return rows[0] || null
}

async function count() {
  const r = await fetch(ENDPOINT + '?select=id', {
    method: 'HEAD',
    headers: Object.assign({ Prefer: 'count=exact', Range: '0-0' }, H),
  })
  return (r.headers.get('content-range') || '').split('/')[1]
}

/* Each scenario: how to reach the form, what to fill, and what must be true of
   the row that lands in Supabase. */
const SCENARIOS = [
  {
    key: 'home-inline',
    label: 'Home inline form (navy card)',
    page: '/',
    open: null,
    formSel: 'form:not([data-kizen-panel] form)',
    fill: { programme: 1 },
    expect: { source: 'website', qualification: null, message: null, programmeHas: 'Interested in' },
  },
  {
    key: 'acca-inline',
    label: 'ACCA inline form (navy card) - qualification must be captured',
    page: '/acca/',
    open: null,
    formSel: 'form:not([data-kizen-panel] form)',
    fill: { qualification: 1 },
    expect: { source: 'website', qualificationNotEmpty: true, programmeHas: 'ACCA (' },
  },
  {
    key: 'contact-inline',
    label: 'Contact inline form (light card) - message + email must be captured',
    page: '/contact/',
    open: null,
    formSel: 'form:not([data-kizen-panel] form)',
    fill: { email: 'static-test@example.com', message: 'ZZ message body for the contact variant.', programme: 1 },
    expect: { source: 'website', messageNotEmpty: true, emailNotEmpty: true },
  },
  {
    key: 'courses-inline',
    label: 'Courses inline form',
    page: '/courses/',
    open: null,
    formSel: 'form:not([data-kizen-panel] form)',
    fill: {},
    expect: { source: 'website', programmeHas: '11th Commerce' },
  },
  {
    key: 'modal-book',
    label: 'Modal "Book a Seat" (opened via an #enquiry link)',
    page: '/',
    open: 'enquiry',
    formSel: '[data-kizen-panel="book"] form',
    fill: { programme: 1 },
    expect: { source: 'website', programmeHas: 'Interested in' },
  },
  {
    key: 'modal-callback',
    label: 'Modal "Request Callback" (FAB -> Request Callback)',
    page: '/',
    open: 'fab-callback',
    formSel: '[data-kizen-panel="callback"] form',
    fill: {},
    expect: { source: 'website_callback' },
  },
]

/* ------------------------------------------------------------------- run */

const before = await count()
console.log('='.repeat(80))
console.log('LEAD CAPTURE - VARIANT COVERAGE TEST   ' + BASE)
console.log('='.repeat(80))
console.log('baseline rows: ' + before + '\n')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const results = []

// Known third-party errors that are NOT conversion defects. Verified to occur
// on the LIVE React site as well, so they must not fail this test.
//   fbevents: Facebook Pixel injected by GTM (GTM-TMXHZBLM) races its own init
const KNOWN_EXTERNAL = /__fbeventsModules|fbevents\.js/

async function openForm(page, sc, row) {
  if (sc.open === 'enquiry') {
    const clicked = await page.evaluate(() => {
      const a = document.querySelector('a[href="#enquiry"]')
      if (!a) return false
      a.click()
      return true
    })
    if (!clicked) row.problems.push('#enquiry link not found')
    await new Promise((r) => setTimeout(r, 900))
  } else if (sc.open === 'fab-callback') {
    await page.evaluate(() => {
      const fab = document.querySelector('button[aria-label="Open quick actions"]')
      if (fab) fab.click()
    })
    await new Promise((r) => setTimeout(r, 800))
    const ok = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find((b) => b.getAttribute('aria-label') === 'Request Callback')
      if (!btn) return false
      btn.click()
      return true
    })
    if (!ok) row.problems.push('Request Callback chip not found')
    await new Promise((r) => setTimeout(r, 900))
  }
}

async function fillForm(page, sc, marker) {
  return page.evaluate((sel, name, phone, fill) => {
    const form = document.querySelector(sel)
    if (!form) return { ok: false, reason: 'form not found: ' + sel }
    const set = (el, v) => {
      el.value = v
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
    const n = form.querySelector('input[name="name"]')
    const p = form.querySelector('input[name="phone"]')
    if (!n || !p) return { ok: false, reason: 'name/phone inputs missing' }
    set(n, name)
    set(p, phone)
    if (fill.email) { const el = form.querySelector('input[name="email"]'); if (el) set(el, fill.email) }
    if (fill.message) { const el = form.querySelector('textarea[name="message"]'); if (el) set(el, fill.message) }
    if (fill.qualification != null) {
      const el = form.querySelector('select[name="qualification"]')
      if (el && el.options[fill.qualification]) set(el, el.options[fill.qualification].value)
    }
    if (fill.programme != null) {
      const el = form.querySelector('select[name="programme"]')
      if (el && el.options[fill.programme]) set(el, el.options[fill.programme].value)
    }
    return { ok: true }
  }, sc.formSel, marker, PHONE, sc.fill)
}

/* ------------------------------------------------------------------- loop */

const RUN = SCENARIOS.filter((s) => !ONLY || s.key.indexOf(ONLY) !== -1)
if (ONLY) console.log('filter: only scenarios matching "' + ONLY + '" -> ' + RUN.length + '\n')

for (const sc of RUN) {
  const marker = 'ZZ-VAR-' + sc.key
  const row = { key: sc.key, label: sc.label, problems: [], thankYou: null, tyText: '' }
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  const net = []
  page.on('response', (r) => {
    if (r.url().indexOf('supabase.co') !== -1) net.push(r.request().method() + ' ' + r.status())
  })
  page.on('pageerror', (e) => {
    if (KNOWN_EXTERNAL.test(e.message)) {
      row.external = (row.external || 0) + 1
      return
    }
    row.problems.push('JS error: ' + e.message.slice(0, 90))
  })

  try {
    await page.goto(BASE + sc.page, { waitUntil: 'networkidle2', timeout: 45000 })
    await new Promise((r) => setTimeout(r, 1200))
    await openForm(page, sc, row)

    const filled = await fillForm(page, sc, marker)
    if (!filled.ok) {
      row.problems.push(filled.reason)
    } else {
      await page.evaluate((sel) => {
        document.querySelector(sel).querySelector('button[type="submit"]').click()
      }, sc.formSel)

      try {
        await page.waitForFunction((sel) => {
          const form = document.querySelector(sel)
          if (!form) return false
          const sib = form.nextElementSibling
          return !!(sib && sib.hasAttribute('data-kizen-thankyou'))
        }, { timeout: 9000, polling: 150 }, sc.formSel)
        row.thankYou = true
      } catch (e) {
        row.thankYou = false
        row.problems.push('Thank You never appeared')
      }

      row.tyText = await page.evaluate((sel) => {
        const form = document.querySelector(sel)
        const sib = form && form.nextElementSibling
        return sib && sib.hasAttribute('data-kizen-thankyou')
          ? sib.innerText.replace(/\s+/g, ' ').trim().slice(0, 80) : ''
      }, sc.formSel)
    }
  } catch (e) {
    row.problems.push('exception: ' + e.message.slice(0, 110))
  }

  row.net = net.slice(0, 4)
  await page.close()
  row.db = await findRow(marker)
  if (!row.db) row.problems.push('NOT FOUND in Supabase by SELECT')

  const e = sc.expect
  if (row.db) {
    if (e.source && row.db.source !== e.source) {
      row.problems.push('source=' + row.db.source + ' expected ' + e.source)
    }
    if (e.programmeHas && String(row.db.programme || '').indexOf(e.programmeHas) === -1) {
      row.problems.push('programme="' + row.db.programme + '" missing "' + e.programmeHas + '"')
    }
    if (e.qualificationNotEmpty && !row.db.qualification) row.problems.push('qualification is EMPTY')
    if (e.messageNotEmpty && !row.db.message) row.problems.push('message is EMPTY')
    if (e.emailNotEmpty && !row.db.email) row.problems.push('email is EMPTY')
    if (e.qualification === null && row.db.qualification !== null) row.problems.push('qualification should be null')
    if (e.message === null && row.db.message !== null) row.problems.push('message should be null')
  }

  results.push(row)
  console.log((row.problems.length ? 'FAIL  ' : 'PASS  ') + sc.key.padEnd(16) + sc.label)
  console.log('        thankyou=' + row.thankYou + '  net=' + JSON.stringify(row.net))
  if (row.db) {
    console.log('        row: source=' + row.db.source + '  programme="' + row.db.programme + '"')
    console.log('             qualification=' + JSON.stringify(row.db.qualification) +
      '  message=' + JSON.stringify(row.db.message) + '  email=' + JSON.stringify(row.db.email))
  }
  row.problems.forEach((p) => console.log('        !! ' + p))
  console.log('')
}

await browser.close()

const after = await count()
console.log('-'.repeat(80))
console.log('rows before: ' + before + '   after: ' + after + '   (+' +
  (Number(after) - Number(before)) + ' for ' + RUN.length + ' scenarios)')

const failed = results.filter((r) => r.problems.length)
console.log('\n' + '='.repeat(80))
console.log(failed.length
  ? 'VARIANT TEST: FAIL (' + failed.length + '/' + results.length + ')'
  : 'VARIANT TEST: ALL ' + results.length + ' VARIANTS PASS')
failed.forEach((r) => console.log('  ' + r.key + ': ' + r.problems.join(' | ')))
console.log('='.repeat(80))
process.exit(failed.length ? 1 : 0)
