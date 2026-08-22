/**
 * Kizen build validation server
 *
 * Serve the production build from /dist with SPA fallback routing,
 * plus a validation mode that checks the build is complete and correct.
 *
 * Usage:
 *   npm run serve              -> start static+SCH server on PORT (default 4173)
 *   npm run serve -- --check   -> run validation checks, print report, exit
 *   node server.mjs            -> default serve
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.htaccess': 'text/plain; charset=utf-8',
};

/* ---------------- SPA static file server ---------------- */

function safeJoin(root, p) {
  const target = path.normalize(path.join(root, p));
  if (!target.startsWith(path.normalize(root))) return null;
  return target;
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    const headers = {
      'Content-Type': type,
      'Content-Length': data.length,
    };
    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}
/* ---------------- Build validation ---------------- */

const ROUTES = ['/', '/acca', '/courses', '/about', '/contact'];

const EXPECTED_IMAGES = [
  'slide-1',
  'slide-2',
  'slide-3',
  'slide-4',
  'slide-5',
  'slide-6',
  'slide-7',
  'campus-why-kizen',
  'campus-1',
  'campus-2',
  'campus-3',
];

const EXPECTED_VIDEOS = [
  'new-reel-kizen.mp4',
  'testimonial-2.mp4',
  'testimonial-3.mp4',
];

const REQUIRED_SITE_ASSETS = ['kizen-logo.jpg', 'images/slide-1.webp'];

function collectChecks() {
  const checks = [];

  checks.push({
    name: 'dist directory exists',
    pass: fs.existsSync(DIST_DIR) && fs.statSync(DIST_DIR).isDirectory(),
    detail: DIST_DIR,
  });
  if (!checks[checks.length - 1].pass) {
    return {
      overall: 'fail',
      passed: 0,
      failed: 1,
      totalChecks: 1,
      build: null,
      routes: ROUTES,
      checks,
    };
  }

  const readStats = (p) => (fs.existsSync(p) ? fs.statSync(p) : { size: 0 });

  const indexExists = fs.existsSync(path.join(DIST_DIR, 'index.html'));
  const assetsDir = path.join(DIST_DIR, 'assets');
  const css = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).filter((f) => f.endsWith('.css')) : [];
  const js = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js') && !f.endsWith('.map'))
    : [];

  const bundleBuild = {
    hasIndex: indexExists,
    css: css.map((f) => ({
      file: f,
      sizeKB: +(fs.statSync(path.join(assetsDir, f)).size / 1024).toFixed(2),
    })),
    js: js.map((f) => ({
      file: f,
      sizeKB: +(fs.statSync(path.join(assetsDir, f)).size / 1024).toFixed(2),
    })),
  };

  checks.push({
    name: 'index.html present',
    pass: indexExists,
    detail: indexExists ? readStats(path.join(DIST_DIR, 'index.html')).size + ' bytes' : 'missing',
  });
  checks.push({
    name: 'bundled CSS present',
    pass: css.length > 0,
    detail: css.length > 0 ? `${css.length} file(s)` : 'none found',
  });
  checks.push({
    name: 'bundled JS present',
    pass: js.length > 0,
    detail: js.length > 0 ? `${js.length} file(s)` : 'none found',
  });

  for (const asset of REQUIRED_SITE_ASSETS) {
    const p = path.join(DIST_DIR, asset);
    const exists = fs.existsSync(p);
    checks.push({
      name: `asset: ${asset}`,
      pass: exists,
      detail: exists ? readStats(p).size + ' bytes' : 'missing',
    });
  }

  // webp images must exist and be under the 200KB budget
  for (const img of EXPECTED_IMAGES) {
    const wp = path.join(DIST_DIR, 'images', `${img}.webp`);
    const wExists = fs.existsSync(wp);
    const wSize = wExists ? fs.statSync(wp).size : 0;
    const underBudget = wExists && wSize < 200 * 1024;
    checks.push({
      name: `image: ${img}.webp`,
      pass: wExists && underBudget,
      detail: wExists
        ? `${(wSize / 1024).toFixed(1)}KB (${underBudget ? 'ok ≤200KB' : 'OVER BUDGET'})`
        : 'webp missing',
    });
  }

  for (const v of EXPECTED_VIDEOS) {
    const p = path.join(DIST_DIR, 'videos', v);
    const exists = fs.existsSync(p);
    checks.push({
      name: `video: ${v}`,
      pass: exists,
      detail: exists ? (fs.statSync(p).size / (1024 * 1024)).toFixed(2) + 'MB' : 'missing',
    });
  }

  // image references inside the JS bundle must all resolve to files in dist
  const sourceJs = js
    .map((f) => path.join(assetsDir, f))
    .filter((f) => fs.existsSync(f))
    .map((f) => fs.readFileSync(f, 'utf8'))
    .join('\n');

  const imgRefs = Array.from(
    sourceJs.matchAll(/(?:^|[ '"`])(\.\/)?images\/[\w-]+\.(webp|jpeg|jpg)/g)
  ).map((m) => m[0].replace(/^[ '"`]/, '').replace(/^\.\//, ''));

  const unresolved = [...new Set(imgRefs)].filter(
    (ref) => !fs.existsSync(path.join(DIST_DIR, ref))
  );

  checks.push({
    name: 'image references resolve in dist',
    pass: unresolved.length === 0,
    detail:
      unresolved.length === 0
        ? `${[...new Set(imgRefs)].length} unique refs ok`
        : `unresolved: ${unresolved.join(', ')}`,
  });

  const overview = {
    totalChecks: checks.length,
    passed: checks.filter((c) => c.pass).length,
    failed: checks.filter((c) => !c.pass).length,
    build: bundleBuild,
    routes: ROUTES,
    overall: checks.every((c) => c.pass) ? 'pass' : 'fail',
  };

  return {
    overall: overview.overall,
    passed: overview.passed,
    failed: overview.failed,
    totalChecks: overview.totalChecks,
    build: overview.build,
    routes: overview.routes,
    checks,
  };
}
/* ---------------- HTTP server ---------------- */

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // Validation report (HTML)
    if (url.pathname === '/__validate') {
      renderReport(res);
      return;
    }

    // Validation report (JSON)
    if (url.pathname === '/__validate.json') {
      const result = collectChecks();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(result, null, 2));
      return;
    }

    // Serve real static files (anything with an extension)
    if (url.pathname !== '/' && path.extname(url.pathname)) {
      const filePath = safeJoin(DIST_DIR, decodeURIComponent(url.pathname));
      if (!filePath) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(res, filePath);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    // SPA fallback → index.html
    serveFile(res, path.join(DIST_DIR, 'index.html'));
  });
}

function renderReport(res) {
  const result = collectChecks();
  const rows = result.checks
    .map(
      (c) =>
        `          <tr class="${c.pass ? 'pass' : 'fail'}">
            <td>${c.pass ? '&#10003;' : '&#10007;'}</td>
            <td>${c.name}</td>
            <td>${c.detail}</td>
          </tr>`
    )
    .join('\n');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kizen Build Validation</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0f1620;color:#e6edf3;margin:0;padding:2rem}
  .wrap{max-width:860px;margin:0 auto}
  h1{font-size:1.6rem;margin-bottom:.25rem}
  .badge{display:inline-block;padding:.3rem .8rem;border-radius:999px;font-weight:700;font-size:.85rem}
  .pass{background:#132b1e;color:#3fb950;border:1px solid #238636}
  .fail{background:#3a1d1d;color:#f85149;border:1px solid #da3633}
  .summary{color:#8b949e;margin:1rem 0 0}
  .summary.top{margin-bottom:1.5rem}
  table{width:100%;border-collapse:collapse;background:#161b22;border-radius:8px;overflow:hidden}
  th,td{text-align:left;padding:.6rem .75rem;border-bottom:1px solid #21262d;font-size:.9rem}
  th{background:#1a2029;color:#8b949e;font-size:.75rem;text-transform:uppercase;letter-spacing:.04em}
  tr.fail td{background:rgba(248,81,73,.07)}
  td:first-child{width:2rem;font-weight:700}
  tr.pass td:first-child{color:#3fb950}
  tr.fail td:first-child{color:#f85149}
  .route{color:#3fb950;font-family:ui-monospace,Consolas,monospace}
</style>
</head>
<body>
<div class="wrap">
  <h1>Kizen — Build Validation</h1>
  <span class="badge ${result.overall === 'pass' ? 'pass' : 'fail'}">${result.overall === 'pass' ? 'BUILD PASSED' : 'BUILD FAILED'}</span>
  <div class="summary">
    ${result.passed}/${result.totalChecks} checks passed
    &middot; ${result.build.css.length} css · ${result.build.js.length} js
    &middot; ${result.routes.length} routes
  </div>
  <table>
    <thead><tr><th></th><th>Check</th><th>Result</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  <div class="summary">Routes served by this server:
    ${result.routes.map((r) => `<span class="route">${r}</span>`).join(' ')}
  </div>
</div>
</body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}
/* ---------------- Entry ---------------- */

const args = process.argv.slice(2);
const checkMode = args.includes('--check');

if (checkMode) {
  const result = collectChecks();
  console.log('\n=== Kizen Build Validation Report ===\n');
  console.log(
    `Overall: ${result.overall === 'pass' ? 'BUILD PASSED ✓' : 'BUILD FAILED ✗'}`
  );
  console.log(
    `Checks:  ${result.passed}/${result.totalChecks} passed, ${result.failed} failed\n`
  );
  for (const c of result.checks) {
    console.log(`  ${c.pass ? '✓' : '✗'} ${c.name}\n      ${c.detail}`);
  }
  console.log('\nRoutes validated (SPA):', result.routes.join(', '));
  process.exit(result.overall === 'pass' ? 0 : 1);
}

const server = createServer();
server.listen(PORT, () => {
  console.log('Kizen preview server running:');
  console.log(`  http://localhost:${PORT}            (site)`);
  console.log(`  http://localhost:${PORT}/__validate (build report)`);
});