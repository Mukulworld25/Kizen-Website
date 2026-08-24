import { useState } from 'react'

// Real institute WhatsApp number (verified across the codebase)
const WHATSAPP_NUMBER = '917696963377'

// ---------------------------------------------------------------------------
// FEE GATE — lead capture before the fee brochure is shared.
// TODO [PENDING CLIENT ASSET]: when the real ACCA brochure PDF exists, drop it
// into kizen-react/public/brochures/acca-brochure.pdf and set BROCHURE_PDF_PATH
// below — the gate will then deliver the download automatically right after
// capture. Until then, submissions open a WhatsApp chat with a prefilled
// request instead. NO fee figure is ever displayed without client data.
// ---------------------------------------------------------------------------
const BROCHURE_PDF_PATH = null

const INPUT =
  'w-full bg-paper/10 border border-paper/20 rounded-lg px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:border-gold'
const LABEL = 'text-[11px] font-bold text-gold uppercase tracking-wider block mb-1.5'

export default function BrochureGate() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Called synchronously inside submit so popup blockers don't eat the tab.
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('[BrochureGate] Lead captured:', form)

    const msg = `Hi Kizen Education! I'm ${form.name}. Please share the ACCA fee structure and brochure.${form.email ? ` (Email: ${form.email})` : ''}`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )

    // Future path: once the real PDF is in /public/brochures/, this delivers it
    if (BROCHURE_PDF_PATH) {
      window.open(BROCHURE_PDF_PATH, '_blank', 'noopener,noreferrer')
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="mt-6 pt-6 border-t border-paper/15">
        <div className="bg-paper/10 border border-gold/50 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-gold text-xl"></i>
            <div>
              <div className="font-semibold text-sm text-paper">Request received</div>
              <div className="text-xs text-paper/70 mt-1">
                Thank you, {form.name}! Our counsellor will share the ACCA fee structure and brochure with you shortly.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 pt-6 border-t border-paper/15">
      {!open ? (
        <>
          <button
            onClick={() => setOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-paper transition shadow-sm"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Get the Fee Structure &amp; Brochure
          </button>
          <p className="text-paper/50 text-[11px] mt-3 text-center leading-relaxed">
            Fee structures are shared personally so we can suggest the right batch &amp; payment plan for your background.
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="bg-paper/5 border border-paper/15 rounded-xl p-5 space-y-3.5">
          <div className="font-serif text-lg font-semibold text-paper">Where should we send it?</div>
          <div>
            <label className={LABEL}>Full Name *</label>
            <input type="text" name="name" required value={form.name} onChange={update} placeholder="Student or Parent name" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Phone Number *</label>
            <input type="tel" name="phone" required value={form.phone} onChange={update} placeholder="+91 XXXXX XXXXX" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Email Address *</label>
            <input type="email" name="email" required value={form.email} onChange={update} placeholder="you@example.com" className={INPUT} />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm rounded-xl py-3 hover:bg-paper transition"
          >
            <i className="fa-brands fa-whatsapp text-base"></i> Send Me the Brochure
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-paper/50 text-xs hover:text-paper transition"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}