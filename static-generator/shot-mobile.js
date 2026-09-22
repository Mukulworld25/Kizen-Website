import puppeteer from 'puppeteer-core';

const BASE = 'http://127.0.0.1:8899';
const OUT = 'static-generator/_shots/mobile';

async function shot(page, name) {
  const path = OUT + '/' + name + '.png';
  await page.screenshot({ path: path });
  console.log('  saved ' + path);
  await new Promise(r => setTimeout(r, 200));
}

async function goto(page, url) {
  const res = await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  console.log('  [' + res.status() + '] ' + url);
  await new Promise(r => setTimeout(r, 800));
}

async function openHamburger(page) {
  const btn = await page.$('button[aria-label="Open menu"]');
  if (!btn) { console.log('  (no hamburger found)'); return false; }
  await btn.click();
  await new Promise(r => setTimeout(r, 600));
  return true;
}

async function screenshotDrawer(page, tag) {
  const drawer = await page.$('[class*="z-40"][class*="fixed"]');
  if (!drawer) { console.log('  (no drawer element)'); return; }
  const box = await drawer.boundingBox();
  if (!box) return;
  await page.screenshot({
    path: OUT + '/drawer-' + tag + '.png',
    clip: { x: 0, y: 0, width: box.width, height: box.height },
  });
  console.log('  saved drawer-' + tag + '.png  (drawer box ' + box.width + 'x' + box.height + ')');
  await new Promise(r => setTimeout(r, 100));
}

async function screenshotStickyCta(page, tag) {
  const cta = await page.$('[class*="fixed"][class*="bottom"]');
  if (!cta) { console.log('  (no sticky CTA bar found)'); return; }
  const box = await cta.boundingBox();
  if (!box) return;
  await page.screenshot({
    path: OUT + '/sticky-cta-' + tag + '.png',
    clip: { x: 0, y: box.y - 6, width: box.width, height: box.height + 6 },
  });
  console.log('  saved sticky-cta-' + tag + '.png');
  await new Promise(r => setTimeout(r, 100));
}

async function toggleAccordion(page, idx) {
  idx = idx || 0;
  const btns = await page.$$('button[type="button"]');
  const acc = [];
  for (let i = 0; i < btns.length; i++) {
    const next = btns[i].nextElementSibling;
    if (next && next.classList && next.classList.contains('max-h-0')) acc.push(btns[i]);
  }
  if (!acc.length) { console.log('  (no accordion buttons found)'); return false; }
  const target = acc[Math.min(idx, acc.length - 1)];
  await target.click();
  await new Promise(r => setTimeout(r, 450));
  return true;
}

async function closeDrawer(page) {
  const btn = await page.$('button[aria-label="Close menu"]');
  if (btn) { await btn.click(); await new Promise(r => setTimeout(r, 300)); }
}

async function run() {
  const fs = await import('fs');
  fs.mkdirSync(OUT, { recursive: true });

  const chrome = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=375,812'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

  // HOME
  console.log('');
  console.log('=== HOME (index.html) ===');
  await goto(page, '/');
  await openHamburger(page);
  await screenshotDrawer(page, 'home');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 400));
  await screenshotStickyCta(page, 'home');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await closeDrawer(page);
  await shot(page, 'home-closed');

  // COURSES
  console.log('');
  console.log('=== COURSES ===');
  await goto(page, '/courses/');
  await openHamburger(page);
  await screenshotDrawer(page, 'courses');
  const expanded = await toggleAccordion(page, 0);
  if (expanded) await shot(page, 'courses-accordion-open');
  await closeDrawer(page);
  await shot(page, 'courses-closed');

  // ABOUT
  console.log('');
  console.log('=== ABOUT ===');
  await goto(page, '/about/');
  await openHamburger(page);
  await screenshotDrawer(page, 'about');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 400));
  await screenshotStickyCta(page, 'about');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await closeDrawer(page);
  await shot(page, 'about-closed');

  await browser.close();
  console.log('');
  console.log('Done. Screenshots in ' + OUT);
}

run().catch(e => { console.error(e); process.exit(1); });
