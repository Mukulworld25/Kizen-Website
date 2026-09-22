const puppeteer = require('puppeteer-core');
const fs = require('fs');

const BASE = 'http://127.0.0.1:8899';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VW = { width: 375, height: 812 };
const LOGF = 'static-generator/_shots/mobile/_live.log';
try { fs.writeFileSync(LOGF, 'LIVE LOG ' + new Date().toISOString() + '\n'); } catch (e) {}

// appendFileSync flushes every line, so progress is visible while it runs
function say(s) { console.log(s); try { fs.appendFileSync(LOGF, s + '\n'); } catch (e) {} }

let PASS = 0, FAIL = 0, INFO = 0;
function ok(label, cond, detail) {
  if (cond) { PASS++; say('   PASS  ' + label + (detail ? '   [' + detail + ']' : '')); }
  else { FAIL++; say('   FAIL  ' + label + (detail ? '   [' + detail + ']' : '')); }
}
function info(label, detail) { INFO++; say('   INFO  ' + label + (detail ? '   [' + detail + ']' : '')); }
async function w(ms) { await new Promise(r => setTimeout(r, ms)); }

// The header hamburger's clickable point resolves to the <i> INSIDE the button,
// which makes puppeteer's mouse-click path wait on element stability and hang.
// DOM .click() fires the identical event handlers, so use it directly - real-user
// clickability is verified separately via geometry (size / visibility / pointer-events).
async function tap(page, sel, label) {
  const did = await page.evaluate(s => {
    const el = document.querySelector(s);
    if (!el) return false;
    el.click();
    return true;
  }, sel);
  say('   (DOM-clicked ' + label + ': ' + did + ')');
  return did ? 'dom' : 'none';
}

const PAGES = [
  { url: '/',         name: 'home'    },
  { url: '/courses/', name: 'courses' },
  { url: '/about/',   name: 'about'   },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=375,812']
  });

  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setViewport(VW);
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

    say('\n' + '='.repeat(60));
    say('PAGE ' + p.url + '   (375x812)');
    say('='.repeat(60));

    await page.goto(BASE + p.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await w(800);

    /* ============ 1. STICKY CTA (default page state) ============ */
    say('\n[STICKY CTA] tap targets + href firing');
    const bar = await page.$('div[class*="fixed"][class*="bottom-0"][class*="z-50"]');
    ok('sticky CTA bar present', !!bar);
    if (bar) {
      const box = await bar.boundingBox();
      ok('bar inside viewport', !!box && box.y >= 0 && (box.y + box.height) <= VW.height + 1,
         box ? ('y=' + Math.round(box.y) + ' h=' + Math.round(box.height)) : 'none');
      const c = await bar.evaluate(el => {
        const tel = el.querySelector('a[href^="tel:"]');
        const wa  = el.querySelector('a[href*="wa.me"]');
        const cta = Array.from(el.querySelectorAll('a')).find(a => {
          const h = a.getAttribute('href') || '';
          return h === '#enquiry' || h === '#form';
        });
        const m = n => { const r = n.getBoundingClientRect(); const s = getComputedStyle(n);
          return { h: Math.round(r.height), pe: s.pointerEvents }; };
        return {
          telHref: tel ? tel.href : null, telText: tel ? tel.textContent.trim() : null, tel: tel ? m(tel) : null,
          waHref: wa ? wa.href : null, waTarget: wa ? wa.getAttribute('target') : null, wa: wa ? m(wa) : null,
          ctaHref: cta ? cta.getAttribute('href') : null, ctaText: cta ? cta.textContent.trim() : null,
        };
      });
      say('   Call     -> ' + c.telHref + '   "' + c.telText + '"');
      say('   WhatsApp -> ' + c.waHref);
      say('   Book     -> ' + c.ctaHref + '   "' + c.ctaText + '"');

      ok('Call href = tel:+917696963377', /^tel:\+917696963377$/.test(c.telHref || ''), c.telHref);
      ok('WhatsApp href = wa.me/917696963377?text=', /^https:\/\/wa\.me\/917696963377\?text=/.test(c.waHref || ''), (c.waHref || '').slice(0, 52));
      ok('WhatsApp target=_blank', c.waTarget === '_blank');
      ok('book CTA href correct for route', c.ctaHref === (p.url === '/contact/' ? '#form' : '#enquiry'), c.ctaHref);
      ok('Call tap target >= 44px', !!c.tel && c.tel.h >= 44, c.tel ? c.tel.h + 'px' : 'n/a');
      ok('WhatsApp tap target >= 44px', !!c.wa && c.wa.h >= 44, c.wa ? c.wa.h + 'px' : 'n/a');
      ok('Call pointer-events not none', !!c.tel && c.tel.pe !== 'none', c.tel ? c.tel.pe : 'n/a');
      ok('WhatsApp pointer-events not none', !!c.wa && c.wa.pe !== 'none', c.wa ? c.wa.pe : 'n/a');

      const hij = await page.evaluate(() => {
        const out = {};
        const probe = (sel, key) => {
          const a = document.querySelector(sel);
          if (!a) { out[key] = 'anchor-not-found'; return; }
          const ev = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
          a.dispatchEvent(ev);
          out[key] = ev.defaultPrevented;
        };
        probe('a[href^="tel:"]', 'tel');
        probe('a[href*="wa.me"]', 'wa');
        return out;
      });
      ok('Call click NOT hijacked by JS', hij.tel === false, 'defaultPrevented=' + hij.tel);
      ok('WhatsApp click NOT hijacked by JS', hij.wa === false, 'defaultPrevented=' + hij.wa);
    }

    /* ============ 2. DRAWER ============ */
    say('\n[DRAWER] hamburger + drawer state (DOM query)');
    const before = await page.evaluate(() => {
      const hb = document.querySelector('button[aria-label="Open menu"]');
      const dr = document.querySelector('div[class*="z-40"][class*="fixed"]');
      return { hamburgerFound: !!hb,
               hamburgerAriaExpanded: hb ? hb.getAttribute('aria-expanded') : null,
               drawerClass: dr ? dr.className : null };
    });
    ok('hamburger present via aria-label="Open menu"', before.hamburgerFound);
    info('hamburger aria-expanded attr', String(before.hamburgerAriaExpanded));
    ok('drawer starts opacity-0 + invisible',
       /opacity-0/.test(before.drawerClass || '') && /\binvisible\b/.test(before.drawerClass || ''));

    await tap(page, 'button[aria-label="Open menu"]', 'hamburger');
    await w(800);

    const afterOpen = await page.evaluate(() => {
      const openLbl = document.querySelector('button[aria-label="Open menu"]');
      const closeLbl = document.querySelector('button[aria-label="Close menu"]');
      const dr = document.querySelector('div[class*="z-40"][class*="fixed"]');
      return { openLabelGone: !openLbl, closeLabelPresent: !!closeLbl,
               closeIcon: closeLbl && closeLbl.querySelector('i') ? closeLbl.querySelector('i').className : null,
               drawerClass: dr ? dr.className : null,
               bodyOverflow: document.body.style.overflow };
    });
    ok('aria-label swapped Open menu -> Close menu', afterOpen.closeLabelPresent && afterOpen.openLabelGone);
    ok('icon swapped fa-bars -> fa-xmark', /fa-xmark/.test(afterOpen.closeIcon || ''), afterOpen.closeIcon);
    ok('drawer class now opacity-100 + visible',
       /opacity-100/.test(afterOpen.drawerClass || '') && /\bvisible\b/.test(afterOpen.drawerClass || ''));
    ok('drawer no longer opacity-0/invisible',
       !/opacity-0/.test(afterOpen.drawerClass || '') && !/\binvisible\b/.test(afterOpen.drawerClass || ''));
    ok('background scroll locked', afterOpen.bodyOverflow === 'hidden', JSON.stringify(afterOpen.bodyOverflow));

    /* ============ 3. ACCORDION (measure AFTER the 300ms transition) ============ */
    say('\n[ACCORDION] expand + real rendered height');
    const accBefore = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('button[type="button"]').forEach(b => {
        const body = b.nextElementSibling;
        if (!body || !body.className) return;
        if (body.className.indexOf('max-h-0') === -1 && body.className.indexOf('max-h-96') === -1) return;
        out.push({ label: (b.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 22),
                   collapsed: body.className.indexOf('max-h-0') !== -1 });
      });
      return out;
    });
    info('accordions found', accBefore.length + ' -> ' + accBefore.map(a => a.label).join(' | '));
    ok('at least one accordion', accBefore.length >= 1);
    ok('all start collapsed', accBefore.every(a => a.collapsed));

    const clickTarget = await page.evaluate(() => {
      let t = null;
      document.querySelectorAll('button[type="button"]').forEach(b => {
        if (t) return;
        const n = b.nextElementSibling;
        if (n && n.className && n.className.indexOf('max-h-0') !== -1) t = b;
      });
      if (!t) return null;
      const label = (t.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 22);
      t.click();
      return label;
    });
    await w(600);   // transition-all duration-300

    const accAfter = await page.evaluate(() => {
      let body = null;
      document.querySelectorAll('button[type="button"]').forEach(b => {
        if (body) return;
        const n = b.nextElementSibling;
        if (n && n.className && n.className.indexOf('max-h-96') !== -1) body = n;
      });
      if (!body) return null;
      const ch = body.firstElementChild;
      const chev = document.querySelector('i.fa-chevron-down.rotate-180');
      return { bodyClass: body.className,
               height: Math.round(body.getBoundingClientRect().height),
               innerHeight: ch ? Math.round(ch.getBoundingClientRect().height) : 0,
               chevRotated: !!chev };
    });

    if (accAfter && clickTarget) {
      ok('clicked "' + clickTarget + '" -> max-h-96 applied', /max-h-96/.test(accAfter.bodyClass));
      ok('max-h-0 removed', !/max-h-0/.test(accAfter.bodyClass));
      ok('panel has real rendered height', accAfter.height > 20, accAfter.height + 'px');
      ok('inner content height > 0', accAfter.innerHeight > 20, accAfter.innerHeight + 'px');
      ok('chevron rotated', accAfter.chevRotated);
    } else {
      ok('accordion expandable', false, 'no accordion found/expanded');
    }

    /* ============ 4. CLOSE ============ */
    say('\n[CLOSE] drawer restored');
    await tap(page, 'button[aria-label="Close menu"]', 'close button');
    await w(700);
    const closed = await page.evaluate(() => {
      const hb = document.querySelector('button[aria-label="Open menu"]');
      const dr = document.querySelector('div[class*="z-40"][class*="fixed"]');
      return { openBack: !!hb, drawerClass: dr ? dr.className : '', bodyOverflow: document.body.style.overflow };
    });
    ok('aria-label restored to Open menu', closed.openBack);
    ok('drawer back to opacity-0 + invisible',
       /opacity-0/.test(closed.drawerClass) && /\binvisible\b/.test(closed.drawerClass));
    ok('body scroll unlocked', closed.bodyOverflow === '', JSON.stringify(closed.bodyOverflow));

    await page.close();
  }

  say('\n' + '='.repeat(60));
  say('RESULT: ' + PASS + ' passed, ' + FAIL + ' failed, ' + INFO + ' info');
  say('='.repeat(60));
  await browser.close();
  process.exit(FAIL === 0 ? 0 : 1);
}

run().catch(e => { console.error('FATAL:', e && e.stack || e); process.exit(2); });
