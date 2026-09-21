// Phase 1 prerender: render every live React route in headless Chrome and
// capture the SETTLED DOM as the source of truth for the static pages.
//
// Why capture-and-transform rather than hand-author: the shared Header/Footer
// are NOT identical across routes (the ACCA page alone carries a border-t
// footer variant, the header CTA copy changes per route via getCtaText, the
// active nav pill moves, contact points its CTA at #form instead of #enquiry).
// Capturing each route preserves all of that for free.
//
// The capture happens AFTER animations settle, so framer-motion inline styles
// (opacity/transform) are written at their FINAL values - which is what makes
// the static page visually identical to the live one.
//
//   node static-generator/prerender.mjs
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import puppeteer from 'puppeteer-core'
import {
  ROUTES, NOT_FOUND, SITE, CHROME, OUT_ROOT, STAT_EXPECT, HERO_SLIDE_COUNT,
} from './routes.mjs'
import { buildDocument } from './transform.mjs'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ------------------------------------------------------------------ server */
function startServer() {
  return new Promise((resolve, reject) => {
    const p = spawn(process.execPath, ['server.mjs'], {
      env: { ...process.env, PORT: '4173' },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let settled = false
    p.stdout.on('data', (d) => {
      if (!settled && String(d).includes('preview server running')) {
        settled = true
        resolve(p)
      }
    })
    p.stderr.on('data', (d) => {
      const s = String(d)
      if (s.trim()) console.log('[server:err]', s.trim().slice(0, 300))
    })
    p.on('exit', (c) => {
      if (!settled) {
        settled = true
        reject(new Error('server.mjs exited early with code ' + c))
      }
    })
    setTimeout(() => {
      if (!settled) {
        settled = true
        resolve(p)
      }
    }, 8000)
  })
}

/* ------------------------------------------------------- browser utilities */

/** Wait until Suspense has resolved and real route content is on screen. */
async function waitForHydration(page) {
  await page.waitForFunction(
    () => {
      const m = document.querySelector('main')
      if (!m) return false
      if (m.querySelector('.animate-spin')) return false // Suspense fallback
      return m.innerText.trim().length > 80
    },
    { timeout: 45000, polling: 200 }
  )
}

/**
 * Scroll the whole page so every whileInView animation fires, then return to
 * the top. Animations are `once: true`, so they run to completion even after
 * we scroll away - we just need to give them time before capturing.
 */
async function scrollSettle(page) {
  await page.evaluate(async () => {
    const step = 400
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 600))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 400))
  })
  await sleep(3000) // let framer-motion + count-up finish
}

/**
 * Home only: mount all 10 carousel slides (they lazy-mount on index change),
 * then set the carousel back to slide 1 so the captured active state matches
 * what a visitor sees on first load.
 */
async function driveCarousel(page) {
  // hovering pauses the 5.5s autoplay, making the capture deterministic
  await page.hover('#hero').catch(() => {})
  const nextSel = 'button[aria-label="Next campus photo"]'
  const hasNext = await page.$(nextSel)
  if (!hasNext) return console.log('   carousel: next button not found, skipping')
  for (let i = 0; i < HERO_SLIDE_COUNT - 1; i++) {
    await page.click(nextSel).catch(() => {})
    await sleep(180)
  }
  const firstDot = await page.$('button[aria-label="Go to slide 1"]')
  if (firstDot) await firstDot.click().catch(() => {})
  else await page.click('button[aria-label="Previous campus photo"]').catch(() => {})
  await sleep(1200)
  console.log('   carousel: drove through all slides, reset to slide 1')
}


/* ------------------------------------------------------------- capture */

/** Capture the fully-settled document: head (incl. seo.js meta) + body. */
async function capture(page) {
  return page.evaluate(() => ({
    head: document.head.innerHTML,
    body: document.body.innerHTML,
    htmlAttrs: Array.from(document.documentElement.attributes).map((a) => [a.name, a.value]),
    bodyAttrs: Array.from(document.body.attributes).map((a) => [a.name, a.value]),
    title: document.title,
    canonical: (document.querySelector('link[rel="canonical"]') || {}).href || '',
    mainLen: (document.querySelector('main') || { innerText: '' }).innerText.trim().length,
  }))
}

/**
 * The FAB quick-action chips and the two action panels are NOT in the DOM on
 * load (FloatingActions renders them conditionally). Drive the UI to open
 * them, capture that markup once, then inject it hidden into every page so
 * script.js can toggle it - identical markup, no re-authoring by eye.
 */
async function capturePartials(page) {
  const partials = { chips: '', book: '', callback: '' }

  // --- quick-action chips ---
  const fabOpen = await page.$('button[aria-label="Open quick actions"]')
  if (fabOpen) {
    await fabOpen.click().catch(() => {})
    await sleep(900)
    partials.chips = await page.evaluate(() => {
      const close = document.querySelector('button[aria-label="Close quick actions"]')
      if (!close || !close.parentElement) return ''
      const wrap = close.parentElement
      const out = []
      for (const child of Array.from(wrap.children)) {
        if (child !== close) out.push(child.outerHTML)
      }
      return out.join('\n')
    })
    // close again
    const fabClose = await page.$('button[aria-label="Close quick actions"]')
    if (fabClose) await fabClose.click().catch(() => {})
    await sleep(500)
  }

  // --- action panels: 'book' then 'callback' ---
  const grabPanel = () =>
    page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('div'))
      const root = all.find(
        (d) =>
          typeof d.className === 'string' &&
          d.className.includes('z-[70]') &&
          d.className.includes('fixed')
      )
      return root ? root.outerHTML : ''
    })

  for (const [label, key] of [
    ['Book a Seat', 'book'],
    ['Request Callback', 'callback'],
  ]) {
    // reopen the FAB, then click the chip
    const op = await page.$('button[aria-label="Open quick actions"]')
    if (op) await op.click().catch(() => {})
    await sleep(700)
    const clicked = await page.evaluate((lbl) => {
      const b = Array.from(document.querySelectorAll('button')).find(
        (x) => x.getAttribute('aria-label') === lbl
      )
      if (b) {
        b.click()
        return true
      }
      return false
    }, label)
    await sleep(1000)
    if (clicked) {
      partials[key] = await grabPanel()
      // close via the panel's own close button
      await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('div'))
        const root = all.find(
          (d) =>
            typeof d.className === 'string' &&
            d.className.includes('z-[70]') &&
            d.className.includes('fixed')
        )
        if (root) {
          const btn = root.querySelector('button[aria-label="Close panel"]')
          if (btn) btn.click()
        }
      })
      await sleep(700)
    }
  }
  return partials
}

/** Wrap the captured partials in hidden containers injected on every page. */
function partialsBlock(p) {
  if (!p || (!p.chips && !p.book && !p.callback)) return ''
  return (
    '<div id="kizen-partials" hidden aria-hidden="true">' +
    '<div id="kizen-fab-actions">' + (p.chips || '') + '</div>' +
    '<div id="kizen-panel-book">' + (p.book || '') + '</div>' +
    '<div id="kizen-panel-callback">' + (p.callback || '') + '</div>' +
    '</div>'
  )
}

/* ------------------------------------------------------------------- main */

async function main() {
  const t0 = Date.now()
  console.log('='.repeat(74))
  console.log('PHASE 1  PRERENDER  -  capturing live React routes as static HTML')
  console.log('='.repeat(74))

  const ONLY = process.argv.slice(2).find((a) => !a.startsWith('-')) || null
  if (ONLY) {
    console.log('SINGLE-ROUTE MODE: ' + ONLY + '  (existing output kept)\n')
  } else if (fs.existsSync(OUT_ROOT)) {
    fs.rmSync(OUT_ROOT, { recursive: true, force: true })
  }
  fs.mkdirSync(OUT_ROOT, { recursive: true })

  const server = await startServer()
  console.log('preview server ready at ' + SITE + '\n')

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const newPage = async () => {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
    return page
  }

  // ---- 1) capture the shared DOM partials once, on Home ----
  // The FAB chips and the two action panels are conditionally rendered, so they
  // are absent from a plain page load. Drive the UI, capture, inject everywhere.
  console.log('capturing shared partials (FAB chips + action panels)...')
  const pPage = await newPage()
  await pPage.goto(SITE + '/', { waitUntil: 'networkidle2', timeout: 60000 })
  await waitForHydration(pPage)
  const partials = await capturePartials(pPage)
  await pPage.close()
  for (const k of ['chips', 'book', 'callback']) {
    console.log('   ' + k.padEnd(9) + ': ' + (partials[k] ? 'OK (' + partials[k].length + ' chars)' : 'MISSING'))
  }
  const block = partialsBlock(partials)
  console.log('')

  const all = [...ROUTES, NOT_FOUND].filter((r) => !ONLY || r.path === ONLY || r.out === ONLY)
  const report = []

  for (let i = 0; i < all.length; i++) {
    const r = all[i]
    const page = await newPage()
    const errs = []
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)) })
    page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message.slice(0, 200)))

    process.stdout.write('[' + String(i + 1).padStart(2) + '/' + all.length + '] ' + r.path.padEnd(30))
    await page.goto(SITE + r.path, { waitUntil: 'networkidle2', timeout: 60000 })
    await waitForHydration(page)
    if (r.kind === 'home') await driveCarousel(page)
    await scrollSettle(page)
    const snap = await capture(page)
    await page.close()

    const doc = buildDocument({
      head: snap.head,
      body: snap.body,
      htmlAttrs: snap.htmlAttrs,
      bodyAttrs: snap.bodyAttrs,
      routePath: r.path === NOT_FOUND.path ? '/' : r.path,
      partials: block,
    })

    const outPath = path.join(OUT_ROOT, r.out)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, doc, 'utf8')

    // ---- assertions on the generated artifact ----
    const checks = []
    if (!snap.title) checks.push('NO TITLE')
    if (snap.mainLen < 80) checks.push('THIN MAIN(' + snap.mainLen + ')')
    if (!snap.canonical) checks.push('NO CANONICAL')
    if (/\/assets\//.test(doc)) checks.push('VITE ASSET REF LEFT')
    if (/\b(href|src|poster)="\.\.?\//.test(doc)) checks.push('RELATIVE PATH LEFT')
    if (r.kind === 'home') {
      for (const s of STAT_EXPECT) if (!doc.includes(s)) checks.push('MISSING STAT ' + s)
    }
    const kb = Buffer.byteLength(doc) / 1024
    console.log('OK ' + kb.toFixed(1).padStart(7) + ' KB   ' + (checks.length ? '!! ' + checks.join(' | ') : 'clean'))
    report.push({ out: r.out, kb, title: snap.title, canonical: snap.canonical, mainLen: snap.mainLen, errs, checks })
  }

  await browser.close()
  server.kill()

  // ---- summary ----
  const secs = ((Date.now() - t0) / 1000).toFixed(1)
  console.log('\n' + '='.repeat(74))
  console.log('SUMMARY  (' + secs + 's)')
  console.log('='.repeat(74))
  for (const x of report) {
    console.log('  ' + x.out.padEnd(38) + x.kb.toFixed(1).padStart(8) + ' KB   main=' + String(x.mainLen).padStart(5))
  }
  console.log('  ' + '-'.repeat(62))
  console.log('  ' + report.length + ' pages, ' + report.reduce((a, b) => a + b.kb, 0).toFixed(1) + ' KB total')

  const bad = report.filter((x) => x.checks.length || x.errs.length)
  console.log('\n  page-level issues: ' + (bad.length || 'none'))
  for (const x of bad) {
    console.log('    ' + x.out)
    for (const c of x.checks) console.log('      check  : ' + c)
    for (const e of x.errs.slice(0, 4)) console.log('      console: ' + e)
  }
  const titles = report.map((x) => x.title)
  const dupes = [...new Set(titles.filter((t, i) => titles.indexOf(t) !== i))]
  console.log('  unique titles: ' + new Set(titles).size + '/' + titles.length + (dupes.length ? '   DUPLICATES: ' + dupes.join(' / ') : ''))
  console.log('='.repeat(74))
}

main().catch((e) => {
  console.error('\nFATAL:', e)
  process.exit(1)
})


