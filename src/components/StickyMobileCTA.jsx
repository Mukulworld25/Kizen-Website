import { useLocation } from 'react-router-dom'

// Shared sticky bottom bar for mobile — shows Call + Book a Seat below lg.
export default function StickyMobileCTA() {
  const { pathname } = useLocation()
  const ctaHref = pathname === '/contact' ? '#form' : '#enquiry'

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-navy border-t border-paper/10 px-4 py-3 flex items-center justify-between gap-3">
      <a
        href="tel:+917696963377"
        className="flex-1 inline-flex items-center justify-center gap-2 border border-paper/25 text-paper text-sm font-semibold py-3 rounded-full hover:border-paper transition"
      >
        <i className="fa-solid fa-phone text-gold"></i> Call Now
      </a>
      <a
        href={ctaHref}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy text-sm font-semibold py-3 rounded-full hover:bg-paper transition"
      >
        Book a Seat
      </a>
    </div>
  )
}