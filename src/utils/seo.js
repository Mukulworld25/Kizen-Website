// ---------------------------------------------------------------------------
// Per-page meta manager — gives every route a unique crawler-facing title and
// meta description (Mukul: crawlers give low preference to generic AI-looking
// pages; unique, specific metas are a baseline trust signal).
// ---------------------------------------------------------------------------
export function setPageMeta({ title, description }) {
  if (title) document.title = title

  if (description) {
    let el = document.querySelector('meta[name="description"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', description)
  }
}

// ---------------------------------------------------------------------------
// Context-aware CTA copy — adapts to the current route so school students
// see "Talk to a Counsellor" while ACCA aspirants see "Talk to an ACCA Counsellor".
// ---------------------------------------------------------------------------
export function getCtaText(pathname) {
  // ACCA-specific pages
  if (pathname === '/acca' || pathname.startsWith('/acca/')) {
    return 'Talk to an ACCA Counsellor'
  }
  // Default: inclusive for all pathways (school, UG, PG, general)
  return 'Talk to a Counsellor'
}

export function getCtaShortText(pathname) {
  if (pathname === '/acca' || pathname.startsWith('/acca/')) {
    return 'ACCA Counselling'
  }
  return 'Free Counselling'
}