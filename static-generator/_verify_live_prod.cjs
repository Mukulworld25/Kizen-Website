const puppeteer = require('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'https://kizeneducation.com/';

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  console.log('=== LIVE PRODUCTION BROWSER TEST (375x812) ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=375,812']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      // Filter out standard 3rd-party tracking noise if any
      if (!txt.includes('favicon') && !txt.includes('fbevents') && !txt.includes('google-analytics')) {
        errors.push(txt);
      }
    }
  });

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(1000);

  console.log('  Page Title:', await page.title());

  // Check Sticky CTA
  const cta = await page.evaluate(() => {
    const bar = document.querySelector('.fixed.bottom-0');
    if (!bar) return { found: false };
    const callBtn = bar.querySelector('a[href^="tel:"]');
    const waBtn = bar.querySelector('a[href*="wa.me"]');
    const callRect = callBtn ? callBtn.getBoundingClientRect() : null;
    const waRect = waBtn ? waBtn.getBoundingClientRect() : null;
    return {
      found: true,
      callHref: callBtn ? callBtn.getAttribute('href') : null,
      callW: callRect ? callRect.width : 0,
      callH: callRect ? callRect.height : 0,
      waHref: waBtn ? waBtn.getAttribute('href') : null,
      waW: waRect ? waRect.width : 0,
      waH: waRect ? waRect.height : 0,
    };
  });

  console.log('  Sticky CTA Check:', JSON.stringify(cta));
  if (cta.found && cta.callHref && cta.callH >= 44 && cta.waH >= 44) {
    console.log('  PASS: Sticky CTA verified live with >= 44px touch targets');
  } else {
    console.log('  FAIL: Sticky CTA check failed');
  }

  // Check Favicon link in DOM
  const favIconHref = await page.evaluate(() => {
    const link = document.querySelector('link[rel="icon"]');
    return link ? link.getAttribute('href') : null;
  });
  console.log('  Favicon in DOM:', favIconHref);
  if (favIconHref === '/favicon.ico') {
    console.log('  PASS: Favicon linked correctly in live DOM');
  }

  // Check Mobile Drawer toggle
  const drawer = await page.evaluate(async () => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (!btn) return { btnFound: false };
    btn.click();
    return { btnFound: true, clicked: true };
  });
  await wait(500);

  const drawerState = await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close menu"]');
    const drawerEl = document.querySelector('.fixed.inset-0.top-0');
    const isVisible = drawerEl && !drawerEl.classList.contains('opacity-0');
    return {
      closeBtnFound: !!closeBtn,
      isVisible: !!isVisible
    };
  });
  console.log('  Drawer toggle check:', JSON.stringify(drawerState));
  if (drawerState.closeBtnFound && drawerState.isVisible) {
    console.log('  PASS: Mobile Drawer successfully opens on live production');
  } else {
    console.log('  FAIL: Mobile Drawer did not open');
  }

  console.log('  Console Errors:', errors.length ? errors.join('; ') : '0 errors');
  await browser.close();

  const success = cta.found && (cta.callH >= 44) && (favIconHref === '/favicon.ico') && drawerState.isVisible && (errors.length === 0);
  console.log(success ? '\nLIVE PRODUCTION AUDIT: ALL TESTS PASSED ✅' : '\nLIVE PRODUCTION AUDIT: FAIL ❌');
  process.exit(success ? 0 : 1);
}

run().catch(e => {
  console.error('Fatal live probe error:', e);
  process.exit(1);
});
