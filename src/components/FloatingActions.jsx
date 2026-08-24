import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnquiryForm from './EnquiryForm.jsx'

// Real institute contact details (verified across the codebase)
const WHATSAPP_NUMBER = '917696963377'

const PANEL_INPUT =
  'w-full bg-paper/10 border border-paper/20 rounded-lg px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:border-gold'
const PANEL_LABEL =
  'text-[11px] font-bold text-gold uppercase tracking-wider block mb-1.5'

// Lightweight callback request — name + phone only. Submits the same way as
// EnquiryForm: logged + handed to WhatsApp with a prefilled message.
function CallbackForm() {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="bg-paper/10 border border-gold/50 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-circle-check text-gold text-xl"></i>
          <div>
            <div className="font-semibold text-sm text-paper">Callback requested</div>
            <div className="text-xs text-paper/70 mt-1">
              Thanks, {form.name || 'there'}! We&rsquo;ll call you back shortly.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      className="space-y-3.5"
      onSubmit={(e) => {
        e.preventDefault()
        console.log('[FloatingActions] Callback requested:', form)
        const msg = `Hi Kizen Education! I'm ${form.name}. Please call me back at ${form.phone}.`
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
          '_blank',
          'noopener,noreferrer'
        )
        setSent(true)
      }}
    >
      <div>
        <label className={PANEL_LABEL}>Full Name *</label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Student or Parent name"
          className={PANEL_INPUT}
        />
      </div>
      <div>
        <label className={PANEL_LABEL}>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 XXXXX XXXXX"
          className={PANEL_INPUT}
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm rounded-xl py-3 hover:bg-paper transition"
      >
        <i className="fa-solid fa-phone-volume"></i> Request Call Back
      </button>
    </form>
  )
}

// Bottom-sheet (mobile) / centered modal (desktop) hosting the shared
// EnquiryForm or the lightweight CallbackForm.
function ActionPanel({ mode, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
    >
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-navy text-paper rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gold/25 max-h-[88vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-paper/80 transition"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {mode === 'book' ? (
          <>
            <div className="font-serif text-xl sm:text-2xl font-semibold mb-1 pr-8">Talk to an ACCA Counsellor</div>
            <div className="text-paper/60 text-xs mb-6">Our academic counsellors respond within 24 hours.</div>
            <EnquiryForm variant="home" />
          </>
        ) : (
          <>
            <div className="font-serif text-2xl font-semibold mb-1">Request a Call Back</div>
            <div className="text-paper/60 text-xs mb-6">Two details and we&rsquo;ll ring you — that&rsquo;s it.</div>
            <CallbackForm />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState(null) // 'book' | 'callback' | null

  // Every legacy "#enquiry" anchor across the site (header CTA, sticky mobile
  // bar, course cards, final CTA strips…) now opens the booking panel instead
  // of scrolling — the hero form cards were replaced by this floating control.
  useEffect(() => {
    const handler = (e) => {
      const el = e.target && e.target.closest ? e.target.closest('a[href="#enquiry"]') : null
      if (!el) return
      e.preventDefault()
      setPanel('book')
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  // Escape closes the panel + body scroll lock while it's open.
  useEffect(() => {
    if (!panel) return undefined
    const onKey = (ev) => ev.key === 'Escape' && setPanel(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [panel])

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Kizen Education! I want to know more about your courses.'
  )}`

  const actions = [
    { key: 'call', label: 'Call Now', icon: 'fa-solid fa-phone', href: 'tel:+917696963377', chip: 'bg-paper text-ink border border-ink/10' },
    { key: 'whatsapp', label: 'WhatsApp Us', icon: 'fa-brands fa-whatsapp', href: waHref, chip: 'bg-[#25D366] text-white' },
    { key: 'book', label: 'Book a Seat', icon: 'fa-solid fa-graduation-cap', onSelect: () => { setOpen(false); setPanel('book') }, chip: 'bg-navy text-paper' },
    { key: 'callback', label: 'Request Callback', icon: 'fa-solid fa-phone-volume', onSelect: () => { setOpen(false); setPanel('callback') }, chip: 'bg-gold text-navy' },
  ]

  return (
    <>
      {/* Persistent sitewide FAB — sits above the sticky mobile bar on phones */}
      <div className="fixed right-4 bottom-24 lg:right-6 lg:bottom-6 z-[60] flex flex-col items-end gap-3">
        <AnimatePresence>
          {open &&
            actions.map((a, i) => (
              <motion.div
                key={a.key}
                initial={{ opacity: 0, y: 18, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.85 }}
                transition={{ duration: 0.22, delay: open ? i * 0.05 : 0, ease: 'easeOut' }}
                className="flex items-center gap-2.5"
              >
                <span className={`px-3.5 py-2 rounded-full text-xs font-bold shadow-lg ${a.chip}`}>
                  {a.label}
                </span>
                {a.href ? (
                  <a
                    href={a.href}
                    {...(a.key === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={a.label}
                    className="w-11 h-11 rounded-full bg-paper text-navy shadow-lg border border-ink/10 flex items-center justify-center hover:bg-ivory transition"
                  >
                    <i className={`${a.icon} text-base`}></i>
                  </a>
                ) : (
                  <button
                    onClick={a.onSelect}
                    aria-label={a.label}
                    className="w-11 h-11 rounded-full bg-paper text-navy shadow-lg border border-ink/10 flex items-center justify-center hover:bg-ivory transition"
                  >
                    <i className={`${a.icon} text-base`}></i>
                  </button>
                )}
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close quick actions' : 'Open quick actions'}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-navy text-paper shadow-xl border-2 border-gold/50 flex items-center justify-center relative"
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-comment-dots'} text-xl transition-transform`}></i>
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gold animate-pulse" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {panel && <ActionPanel mode={panel} onClose={() => setPanel(null)} />}
      </AnimatePresence>
    </>
  )
}