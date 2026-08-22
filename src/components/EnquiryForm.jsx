import { useEffect, useState } from 'react'

// Shared enquiry form. variant:
//   home    -> Compact navy-card form (Name, Phone, Interest select, Request a Call Back)
//   acca    -> Navy-card ACCA form    (Name, Phone, Qualification, Request ACCA Info Pack)
//   contact -> Light labelled form    (Name, Phone, Email, Programme select, Message, Submit)
const NAVY_INPUT =
  'w-full bg-paper/10 border border-paper/20 rounded-lg px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:border-gold'
const LIGHT_INPUT =
  'w-full bg-ivory border border-ink/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy'
const LABEL = 'text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2 block'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`[EnquiryForm:${variant}]`, JSON.stringify(form, null, 2))
    setSubmitted(true)
  }

  useEffect(() => {
    if (!submitted) return
    const t = setTimeout(() => setSubmitted(false), 4000)
    return () => clearTimeout(t)
  }, [submitted])

  if (submitted) {
    return (
      <div className="w-full rounded-lg border border-gold/60 bg-paper/10 px-4 py-4 text-sm text-paper font-semibold">
        <i className="fa-solid fa-circle-check text-gold mr-2"></i>
        Thank you — we've received your enquiry and will call you within 24 hours.
      </div>
    )
  }

  if (variant === 'contact') {
    return (
      <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
        <div className="sm:col-span-1">
          <label className={LABEL}>Full Name</label>
          <input type="text" name="name" value={form.name} onChange={update} placeholder="Your full name" className={LIGHT_INPUT} />
        </div>
        <div className="sm:col-span-1">
          <label className={LABEL}>Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={update} placeholder="+91 XXXXX XXXXX" className={LIGHT_INPUT} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" className={LIGHT_INPUT} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Interested Programme</label>
          <select name="programme" value={form.programme} onChange={update} className={`${LIGHT_INPUT} text-ink/80`}>
            <option>ACCA</option>
            <option>11th Commerce</option>
            <option>12th Commerce</option>
            <option>B.Com</option>
            <option>BBA</option>
            <option>M.Com</option>
            <option>MBA</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Message</label>
          <textarea
            rows="4"
            name="message"
            value={form.message}
            onChange={update}
            placeholder="Tell us a bit about your goals..."
            className={`${LIGHT_INPUT} resize-none`}
          ></textarea>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="w-full sm:w-auto bg-navy text-paper font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-ink transition">Submit Enquiry</button>
        </div>
      </form>
    )
  }

  if (variant === 'acca') {
    return (
      <form className="relative bg-paper/5 border border-paper/15 rounded-2xl p-6 space-y-3" onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={update} placeholder="Full name" className={NAVY_INPUT} />
        <input type="tel" name="phone" value={form.phone} onChange={update} placeholder="Phone number" className={NAVY_INPUT} />
        <input type="text" name="qualification" value={form.qualification} onChange={update} placeholder="Current qualification" className={NAVY_INPUT} />
        <button type="submit" className="w-full bg-gold text-navy font-semibold text-sm rounded-lg py-3 hover:bg-paper transition">Request ACCA Info Pack</button>
      </form>
    )
  }

  // default: home
  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input type="text" name="name" value={form.name} onChange={update} placeholder="Full name" className={NAVY_INPUT} />
      <input type="tel" name="phone" value={form.phone} onChange={update} placeholder="Phone number" className={NAVY_INPUT} />
      <select name="programme" value={form.programme} onChange={update} className={`${NAVY_INPUT} text-paper/80`}>
        <option className="text-ink">Interested in ACCA</option>
        <option className="text-ink">Interested in 11th/12th Commerce</option>
        <option className="text-ink">Interested in B.Com / BBA</option>
        <option className="text-ink">Interested in M.Com / MBA</option>
      </select>
      <button type="submit" className="w-full bg-gold text-navy font-semibold text-sm rounded-lg py-3 hover:bg-gold/90 transition">Request a Call Back</button>
    </form>
  )
}