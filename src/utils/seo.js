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