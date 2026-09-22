const puppeteer = require('puppeteer-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'https://kizeneducation.com/';

const DEVICES = [
  {
    name: 'Mobile (iPhone 14 / 15 Pro)',
    viewport: { width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'Mobile (Compact 375px)',
    viewport: { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'Tablet (iPad 10th Gen - Portrait)',
    viewport: { width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'Tablet (iPad Pro 11" - Landscape)',
    viewport: { width: 1194, height: 834, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'Laptop (Standard 1366x768)',
    viewport: { width: 1366, height: 768, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  },
  {
    name: 'Laptop / Desktop (FHD 1920x1080)',
    viewport: { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  }
];

async function measureDevice(browser, dev) {
  const page = await browser.newPage();
  await page.setViewport(dev.viewport);
  await page.setUserAgent(dev.userAgent);

  let reqCount = 0;
  let totalBytes = 0;
  page.on('response', (res) => {
    reqCount++;
    const headers = res.headers();
    const len = headers['content-length'];
    if (len) totalBytes += parseInt(len, 10);
  });

  // Enable LCP observation
  await page.evaluateOnNewDocument(() => {
    window.__lcp = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.__lcp = lastEntry.renderTime || lastEntry.loadTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  const startTime = Date.now();
  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
  const loadDuration = Date.now() - startTime;

  // Wait extra 500ms to allow LCP settlement
  await new Promise(r => setTimeout(r, 600));

  const metrics = await page.evaluate(() => {
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
      loadEvent: Math.round(nav.loadEventEnd - nav.startTime || 0)
    };
  });

  await page.close();
  return {
    device: dev.name,
    viewport: `${dev.viewport.width}x${dev.viewport.height}`,
    ttfb: metrics.ttfb,
    fcp: metrics.fcp,
    lcp: metrics.lcp,
    domReady: metrics.domReady,
    totalLoad: metrics.loadEvent || loadDuration,
    requests: reqCount,
    bytesKB: Math.round(totalBytes / 1024)
  };
}

async function run() {
  console.log('='.repeat(80));
  console.log('⚡ PRODUCTION LOADING SPEED BENCHMARK (https://kizeneducation.com)');
  console.log('Testing across Mobile, Tablet (iPad), and Laptop / Desktop devices');
  console.log('='.repeat(80));

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const results = [];
  for (const dev of DEVICES) {
    process.stdout.write(`Benchmarking ${dev.name.padEnd(35)} ... `);
    try {
      const res = await measureDevice(browser, dev);
      results.push(res);
      console.log(`FCP: ${res.fcp}ms | LCP: ${res.lcp}ms | Load: ${res.totalLoad}ms`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(80));
  console.log('📊 MULTI-DEVICE PERFORMANCE SUMMARY TABLE');
  console.log('='.repeat(80));
  console.log(
    'Device'.padEnd(34) +
    'Viewport'.padEnd(12) +
    'TTFB'.padEnd(9) +
    'FCP'.padEnd(9) +
    'LCP'.padEnd(9) +
    'DOMReady'.padEnd(11) +
    'FullLoad'
  );
  console.log('-'.repeat(80));
  for (const r of results) {
    console.log(
      r.device.padEnd(34) +
      r.viewport.padEnd(12) +
      `${r.ttfb}ms`.padEnd(9) +
      `${r.fcp}ms`.padEnd(9) +
      `${r.lcp}ms`.padEnd(9) +
      `${r.domReady}ms`.padEnd(11) +
      `${r.totalLoad}ms`
    );
  }
  console.log('='.repeat(80));
}

run().catch(console.error);
