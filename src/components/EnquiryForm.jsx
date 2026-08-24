import { useEffect, useState } from 'react'

// Shared enquiry form. variant:
//   home    -> Compact navy-card form (Name, Phone, Interest select, Request a Call Back)
//   acca    -> Navy-card ACCA form    (Name, Phone, Qualification, Request ACCA Info Pack)
//   contact -> Light labelled form    (Name, Phone, Email, Programme select, Message, Submit)
const NAVY_INPUT =
  'w-full bg-paper/10 border border-paper/20 rounded-lg px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:border-gold'
const LIGHT_INPUT =
  'w-full bg-ivory border border-ink/15 rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy'
const LABEL = 'text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2 block'

// Real institute WhatsApp number (verified across the codebase)
const WHATSAPP_NUMBER = '917696963377'

export default function EnquiryForm({ variant = 'home' }) {
  const isContact = variant === 'contact'
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    qualification: '',
    email: '',
    programme: isContact ? 'ACCA' : 'Interested in ACCA',
    message: '',
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // WhatsApp-native enquiry: opens a chat with the real institute number and
  // prefills name + chosen programme so counsellors get instant context.
  // Called synchronously inside the submit handler so popup blockers don't eat it.
  const openWhatsAppEnquiry = () => {
    const interest =
      variant === 'acca'
        ? 'the ACCA programme'
        : isContact
          ? `${form.programme}`
          : form.programme.replace(/^Interested in /, '')
    const msg = `Hi Kizen Education! I'm ${form.name || 'a prospective student'}. I'm interested in ${interest}.${form.phone ? ` You can reach me at ${form.phone}.` : ''}`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`[EnquiryForm:${variant}] Submitted payload:`, form)
    openWhatsAppEnquiry()
    setSubmitted(true)
  }

  useEffect(() => {
    if (!submitted) return
    const t = setTimeout(() => {
      setSubmitted(false)
      setForm({
        name: '',
        phone: '',
        qualification: '',
        email: '',
        programme: isContact ? 'ACCA' : 'Interested in ACCA',
        message: '',
      })
    }, 5000)
    return () => clearTimeout(t)
  }, [submitted, isContact])

  if (submitted) {
    return (
      <div
        className={`w-full rounded-xl border p-5 text-sm font-semibold transition-all ${
          isContact
            ? 'border-gold bg-ivory text-ink shadow-sm'
            : 'border-gold/60 bg-paper/10 text-paper'
        }`}
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-circle-check text-gold text-xl"></i>
          <div>
            <div className="font-serif text-base text-ink mb-0.5">Enquiry Received Successfully</div>
            <div className={`text-xs ${isContact ? 'text-ink/70' : 'text-paper/80'} font-normal`}>
              Thank you, {form.name || 'there'}! Our senior academic counsellor will contact you within 24 hours.
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
        <div className="sm:col-span-1">
          <label className={LABEL}>Full Name *</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={update}
            placeholder="Your full name"
            className={LIGHT_INPUT}
          />
        </div>
        <div className="sm:col-span-1">
          <label className={LABEL}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={update}
            placeholder="+91 76969 63377"
            className={LIGHT_INPUT}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={update}
            placeholder="you@example.com"
            className={LIGHT_INPUT}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Interested Programme</label>
          <select name="programme" value={form.programme} onChange={update} className={`${LIGHT_INPUT} text-ink`}>
            <option>ACCA (Global Finance)</option>
            <option>11th Commerce</option>
            <option>12th Commerce</option>
            <option>B.Com</option>
            <option>BBA</option>
            <option>M.Com</option>
            <option>MBA</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Message (Optional)</label>
          <textarea
            rows="4"
            name="message"
            value={form.message}
            onChange={update}
            placeholder="Tell us a bit about your current academic background and career goals..."
            className={`${LIGHT_INPUT} resize-none`}
          ></textarea>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto bg-navy text-paper font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-ink transition shadow-sm"
          >
            Submit Enquiry
          </button>
        </div>
      </form>
    )
  }

  if (variant === 'acca') {
    return (
      <form className="relative bg-paper/5 border border-paper/15 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl" onSubmit={handleSubmit}>
        <div>
          <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1.5">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={update}
            placeholder="Your full name"
            className={NAVY_INPUT}
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1.5">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={update}
            placeholder="+91 XXXXX XXXXX"
            className={NAVY_INPUT}
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1.5">Current Qualification *</label>
          <input
            type="text"
            name="qualification"
            required
            value={form.qualification}
            onChange={update}
            placeholder="e.g. 12th Commerce / B.Com"
            className={NAVY_INPUT}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-paper transition shadow-sm font-sans"
        >
          Request ACCA Info Pack & Syllabus
        </button>
      </form>
    )
  }

  // default: home
  return (
    <form className="space-y-3.5" onSubmit={handleSubmit}>
      <div>
        <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">Full Name *</label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={update}
          placeholder="Student or Parent name"
          className={NAVY_INPUT}
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={update}
          placeholder="+91 XXXXX XXXXX"
          className={NAVY_INPUT}
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-1">Pathway Milestone</label>
        <select name="programme" value={form.programme} onChange={update} className={`${NAVY_INPUT} text-paper`}>
          <option className="text-ink">Interested in ACCA (Global)</option>
          <option className="text-ink">Interested in 11th/12th Commerce</option>
          <option className="text-ink">Interested in B.Com / BBA</option>
          <option className="text-ink">Interested in M.Com / MBA</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-gold/90 transition shadow-sm font-sans mt-2"
      >
        Talk to an ACCA Counsellor
      </button>
    </form>
  )
}