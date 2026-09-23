// Post-processing: turn a captured snapshot of the live React DOM into a
// self-contained static HTML page.
//
// Every change here is deterministic and minimal. Rusty rule: the captured DOM
// is the SOURCE OF TRUTH for content/markup - we only remove React/Vite
// plumbing, inject our own css/js, and fix paths for directory-URL hosting.

import { LINK_MAP } from './routes.mjs'

const ORIGIN = 'https://kizeneducation.com'

function splitHash(p) {
  const i = p.indexOf('#')
  return i === -1 ? [p, ''] : [p.slice(0, i), p.slice(i)]
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Rewrite internal route links to the form that this host actually serves,
 * so no visitor ever takes a redirect hop.
 *   href="/acca"           -> href="/acca/"
 *   href="/courses#school" -> href="/courses/#school"
 * Anything not an exact route match (assets, PDFs, external, mailto:, tel:,
 * #anchors) is left completely untouched.
 */
export function rewriteInternalLinks(html) {
  return html.replace(/href="(\/[^"]*)"/g, (full, val) => {
    const [pathPart, hash] = splitHash(val)
    const mapped = LINK_MAP[pathPart]
    if (!mapped) return full
    return 'href="' + mapped + hash + '"'
  })
}

/**
 * Root-absolutise every relative reference.
 * Under directory URLs (/about/, /institutions/schools/) a relative path
 * resolves against the CURRENT DIRECTORY and 404s:
 *   /about/  +  ./videos/new-reel-kizen.mp4  ->  /about/videos/...  = BROKEN
 * The React site got away with these because routes had no trailing slash.
 * Confirmed offenders include About (poster + video) and 4 pages' brochures.
 */
export function absolutizePaths(html) {
  let out = html.replace(
    /\b(href|src|poster|action|data-src)="(\.\.?\/[^"]*)"/g,
    (_m, attr, val) => attr + '="' + val.replace(/^(\.\.?\/)+/, '/') + '"'
  )
  // inline styles: url('./x') -> url('/x')
  out = out.replace(/url\((['"]?)\.\.?\//g, 'url($1/')
  return out
}

/**
 * Canonical tags must match the URL the server actually serves, otherwise
 * Google sees "canonical points at a redirecting URL". So append the trailing
 * slash to this route's own absolute URLs in canonical, og:url and JSON-LD.
 */
export function fixCanonicalUrls(html, routePath) {
  if (!routePath || routePath === '/') return html
  const re = new RegExp(
    escapeRe(ORIGIN + routePath) + '(?![A-Za-z0-9/_\\-.])',
    'g'
  )
  return html.replace(re, ORIGIN + routePath + '/')
}

/** Strip all Vite build plumbing and inject our single static stylesheet. */
export function processHead(head) {
  let out = head
  // React bundle + its preloads
  out = out.replace(/<script[^>]*\bsrc="\/assets\/[^"]*"[^>]*><\/script>/gi, '')
  out = out.replace(/<link[^>]*\bhref="\/assets\/[^"]*"[^>]*>/gi, '')
  // anything else still pointing into the (now absent) vite assets dir
  out = out.replace(/<link[^>]*rel="modulepreload"[^>]*>/gi, '')
  out = out.replace(/<link[^>]*rel="preload"[^>]*as="script"[^>]*>/gi, '')
  // Fix any local dev domain references captured from GTM / Pixel during prerender
  out = out.replace(/domain=localhost/g, 'domain=kizeneducation.com')
  // our stylesheet, placed at the end of head so it wins on equal specificity
  out += '\n<link rel="stylesheet" href="/styles.css" />'
  return out
}

/** Inject our scripts + the captured modal partials before </body>. */
export function processBody(body, { partials = '', scriptSrc = '/script.js' } = {}) {
  let out = body
  out = out.replace(/<script[^>]*\bsrc="\/assets\/[^"]*"[^>]*><\/script>/gi, '')
  const inject = '\n' + partials + '\n<script src="' + scriptSrc + '" defer></script>\n'
  if (out.includes('</body>')) out = out.replace('</body>', inject + '</body>')
  else out += inject
  return out
}

function attrs(list) {
  return list.map(([k, v]) => (v === '' ? k : k + '="' + v + '"')).join(' ')
}

/**
 * Assemble the final document.
 * head/body/htmlAttrs/bodyAttrs all come straight from the live page, so
 * per-page <title>, meta, OG, Twitter, JSON-LD, GTM, fonts and icons are
 * preserved exactly - now crawler-visible without JS execution.
 */
export function buildDocument({ head, body, htmlAttrs, bodyAttrs, routePath, partials }) {
  const h = processHead(fixCanonicalUrls(rewriteInternalLinks(absolutizePaths(head)), routePath))
  let b = processBody(absolutizePaths(rewriteInternalLinks(body)), { partials })
  b = fixCanonicalUrls(b, routePath)
  return (
    '<!DOCTYPE html>\n' +
    '<html ' + attrs(htmlAttrs) + '>\n' +
    '<head>\n' + h + '\n</head>\n' +
    '<body ' + attrs(bodyAttrs) + '>\n' + b + '\n</body>\n' +
    '</html>\n'
  )
}
