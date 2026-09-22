const puppeteer = require('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'https://kizeneducation.com/';

const DEVICES = [
  {
    category: 'Mobile',
    name: 'iPhone 15 / 14 Pro',
    viewport: { width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    category: 'Mobile',
    name: 'iPhone SE / Compact (375px)',
    viewport: { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    category: 'Tablet',
    name: 'iPad (10th Gen 820px)',
    viewport: { width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    category: 'Tablet',
    name: 'iPad Pro 11" (Landscape)',
    viewport: { width: 1194, height: 834, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    category: 'Laptop',
    name: 'MacBook Air / Laptop 13"',
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36'
  },
  {
    category: 'Desktop',
    name: 'FHD Monitor (1920x1080)',
    viewport: { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36'
  }
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const results = [];

  for (const dev of DEVICES) {
    const page = await browser.newPage();
    await page.setViewport(dev.viewport);
    await page.setUserAgent(dev.ua);

    // Track LCP
    await page.evaluateOnNewDocument(() => {
      window.__lcp = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1];
        if (last) window.__lcp = last.renderTime || last.loadTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });

    // 1st navigation (Cold)
    await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 600));

    const cold = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paints = performance.getEntriesByType('paint');
      let fcp = 0;
      for (const p of paints) {
        if (p.name === 'first-contentful-paint') fcp = p.startTime;
      }
      return {
        ttfb: Math.round(nav.responseStart - nav.requestStart || 0),
        fcp: Math.round(fcp),
        lcp: Math.round(window.__lcp || fcp || 0),
        domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime || 0),
        load: Math.round(nav.loadEventEnd - nav.startTime || 0)
      };
    });

    // 2nd navigation (Warm / Cached)
    await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 400));

    const warm = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paints = performance.getEntriesByType('paint');
      let fcp = 0;
      for (const p of paints) {
        if (p.name === 'first-contentful-paint') fcp = p.startTime;
      }
      return {
        ttfb: Math.round(nav.responseStart - nav.requestStart || 0),
        fcp: Math.round(fcp),
        lcp: Math.round(window.__lcp || fcp || 0),
        domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime || 0),
        load: Math.round(nav.loadEventEnd - nav.startTime || 0)
      };
    });

    await page.close();

    results.push({
      category: dev.category,
      name: dev.name,
      viewport: `${dev.viewport.width}x${dev.viewport.height}`,
      cold,
      warm
    });

    console.log(`[${dev.category}] ${dev.name.padEnd(28)} Cold FCP: ${cold.fcp}ms, Warm FCP: ${warm.fcp}ms | Cold Load: ${cold.load}ms, Warm Load: ${warm.load}ms`);
  }

  await browser.close();

  console.log('\n' + JSON.stringify(results, null, 2));
}

run().catch(console.error);
