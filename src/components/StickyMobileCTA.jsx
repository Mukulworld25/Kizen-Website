import { useLocation } from 'react-router-dom'

// Shared sticky bottom bar for mobile — Call + WhatsApp + Book a Seat below lg.
// WhatsApp uses the real institute number with a short prefilled intro message.
const WHATSAPP_NUMBER = '917696963377'

export default function StickyMobileCTA() {
  const { pathname } = useLocation()
  const ctaHref = pathname === '/contact' ? '#form' : '#enquiry'
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Kizen Education! I want to know more about your courses.')}`

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-navy border-t border-paper/10 px-3 py-2.5 flex items-center gap-2">
      <a
        href="tel:+917696963377"
        className="flex-1 inline-flex items-center justify-center gap-1.5 border border-paper/25 text-paper text-[13px] font-semibold py-3 rounded-full hover:border-paper transition"
      >
        <i className="fa-solid fa-phone text-gold"></i> Call
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kizen Education on WhatsApp"
        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-[13px] font-semibold py-3 rounded-full hover:brightness-105 transition"
      >
        <i className="fa-brands fa-whatsapp text-base"></i> WhatsApp
      </a>
      <a
        href={ctaHref}
        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gold text-navy text-[13px] font-semibold py-3 rounded-full hover:bg-paper transition"
      >
        Book a Seat
      </a>
    </div>
  )
}