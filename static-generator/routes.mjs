// Route manifest for the static build.
//
// URL STRATEGY (validated live in Phase 0.5):
//   Hostinger serves /acca/ -> /acca/index.html, and 301-redirects /acca to
//   /acca/. THE URL PATH ITSELF DOES NOT CHANGE - only the filename on disk
//   changes (route -> route/index.html). So canonicals, sitemap and all
//   internal links use the trailing-slash form, and visitors never take a
//   redirect hop. Only externally-indexed legacy URLs (/acca from Google)
//   take one standard 301.

export const SITE = 'http://localhost:4173' // local preview server (server.mjs)
export const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
export const DIST = 'dist'
export const OUT_ROOT = 'static-site' // deploy root, mirrors public/ layout

// path = live React route.  out = static file that must serve it.
export const ROUTES = [
  { path: '/', out: 'index.html', kind: 'home' },
  { path: '/courses', out: 'courses/index.html' },
  { path: '/acca', out: 'acca/index.html', kind: 'acca' },
  { path: '/fintech', out: 'fintech/index.html' },
  { path: '/ifrs', out: 'ifrs/index.html' },
  { path: '/institutions/schools', out: 'institutions/schools/index.html' },
  { path: '/institutions/colleges', out: 'institutions/colleges/index.html' },
  { path: '/institutions/institutes', out: 'institutions/institutes/index.html' },
  { path: '/corporate-training', out: 'corporate-training/index.html' },
  { path: '/about', out: 'about/index.html', kind: 'about' },
  { path: '/contact', out: 'contact/index.html' },
  { path: '/resources', out: 'resources/index.html' },
  { path: '/wall-of-fame', out: 'wall-of-fame/index.html' },
  { path: '/ai-programmes', out: 'ai-programmes/index.html' },
]

// The 404 page is NOT a routed URL - it is captured from the SPA's catch-all
// route and served by Apache's ErrorDocument directive.
export const NOT_FOUND = { path: '/__kizen_404__', out: '404.html', kind: 'notfound' }

// route path -> served URL (trailing-slash form)
export const LINK_MAP = {}
for (const r of ROUTES) {
  LINK_MAP[r.path] = r.path === '/' ? '/' : r.path + '/'
}

// Capture-time behaviour that must be driven in the browser, per page.
// Home is the only page with framer-motion (35 motion nodes, 7 whileInView)
// plus a 10-slide carousel and 3 count-up statistics.
export const STAT_EXPECT = ['180+', '13', '95%+']
export const HERO_SLIDE_COUNT = 10
