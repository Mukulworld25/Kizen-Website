// ---------------------------------------------------------------------------
// Per-page meta manager — gives every route a unique crawler-facing title,
// meta description, canonical link, Open Graph, Twitter cards, and structured JSON-LD schema.
// ---------------------------------------------------------------------------

function setOrCreateMeta(attrName, attrValue, content) {
  if (content === undefined || content === null) return
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  if (!url) return
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function setDynamicSchema(schema) {
  const SCRIPT_ID = 'dynamic-page-schema'
  let el = document.getElementById(SCRIPT_ID)
  if (schema) {
    if (!el) {
      el = document.createElement('script')
      el.id = SCRIPT_ID
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
  } else if (el) {
    el.remove()
  }
}

export function setPageMeta({
  title,
  description,
  keywords,
  canonicalUrl,
  og = {},
  twitter = {},
  schema = null,
}) {
  if (title) {
    document.title = title
  }

  if (description) {
    setOrCreateMeta('name', 'description', description)
  }

  if (keywords) {
    setOrCreateMeta('name', 'keywords', keywords)
  }

  // Canonical URL
  if (canonicalUrl) {
    setCanonical(canonicalUrl)
  }

  // Open Graph
  const finalOgTitle = og.title || title
  const finalOgDesc = og.description || description
  const finalOgUrl = og.url || canonicalUrl
  const finalOgImage = og.image || 'https://kizeneducation.com/images/success-duo.webp'
  const finalOgType = og.type || 'website'

  if (finalOgTitle) setOrCreateMeta('property', 'og:title', finalOgTitle)
  if (finalOgDesc) setOrCreateMeta('property', 'og:description', finalOgDesc)
  if (finalOgUrl) setOrCreateMeta('property', 'og:url', finalOgUrl)
  if (finalOgImage) setOrCreateMeta('property', 'og:image', finalOgImage)
  if (finalOgType) setOrCreateMeta('property', 'og:type', finalOgType)

  // Twitter Cards
  const finalTwCard = twitter.card || 'summary_large_image'
  const finalTwTitle = twitter.title || title
  const finalTwDesc = twitter.description || description
  const finalTwImage = twitter.image || finalOgImage

  if (finalTwCard) setOrCreateMeta('name', 'twitter:card', finalTwCard)
  if (finalTwTitle) setOrCreateMeta('name', 'twitter:title', finalTwTitle)
  if (finalTwDesc) setOrCreateMeta('name', 'twitter:description', finalTwDesc)
  if (finalTwImage) setOrCreateMeta('name', 'twitter:image', finalTwImage)

  // Dynamic Page Schema (JSON-LD)
  setDynamicSchema(schema)
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
  // FinTech / IFRS / AI in Finance pages
  if (pathname === '/fintech' || pathname === '/ifrs' || pathname === '/ai-programmes') {
    return 'Request Programme Info'
  }
  // Default: inclusive for all pathways (school, UG, PG, general)
  return 'Talk to a Counsellor'
}

export function getCtaShortText(pathname) {
  if (pathname === '/acca' || pathname.startsWith('/acca/')) {
    return 'ACCA Counselling'
  }
  if (pathname === '/fintech' || pathname === '/ifrs' || pathname === '/ai-programmes') {
    return 'Programme Info'
  }
  return 'Free Counselling'
}