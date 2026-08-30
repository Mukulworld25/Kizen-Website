import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

// Shared enquiry form. variant:
//   home     -> Compact navy-card form (Name, Phone, Interest select, Request a Call Back)
//   acca     -> Navy-card ACCA form    (Name, Phone, Qualification, Request ACCA Info Pack)
//   contact  -> Light labelled form    (Name, Phone, Email, Programme select, Message, Submit)
//   courses  -> Compact navy-card form (Name, Phone, Programme select, Request Course Info)
const NAVY_INPUT =
  'w-full bg-paper/10 border border-paper/20 rounded-lg px-4 py-2.5 text-sm text-paper placeholder:text-paper/50 focus:outline-none focus:border-gold'
const LIGHT_INPUT =
  'w-full bg-ivory border border-ink/15 rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-navy'
// High-contrast input for courses variant (light background)
const COURSES_INPUT =
  'w-full bg-white border border-ink/30 rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20'
const LABEL = 'text-xs font-semibold text-ink/60 uppercase tracking-wide mb-2 block'
// Label for navy-card forms (home, acca, courses)
const NAVY_LABEL = 'text-[11px] font-bold text-ink uppercase tracking-wider block mb-1.5'

// Real institute WhatsApp number (verified across the codebase)
const WHATSAPP_NUMBER = '917696963377'

export default function EnquiryForm({ variant = 'home' }) {
  const isContact = variant === 'contact'
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    qualification: '',
    email: '',
    programme: isContact ? 'ACCA' : variant === 'courses' ? '11th Commerce' : 'Interested in ACCA',
    message: '',
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Build the WhatsApp message for a given form state
  const buildWhatsAppMessage = (formData) => {
    const interest =
      variant === 'acca'
        ? 'the ACCA programme'
        : variant === 'courses'
          ? formData.programme
          : isContact
            ? `${formData.programme}`
            : formData.programme.replace(/^Interested in /, '')
    return `Hi Kizen Education! I'm ${formData.name || 'a prospective student'}. I'm interested in ${interest}.${formData.phone ? ` You can reach me at ${formData.phone}.` : ''}`
  }

  // Open WhatsApp with prefilled message
  const openWhatsAppEnquiry = (formData) => {
    const msg = buildWhatsAppMessage(formData)
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    console.log(`[EnquiryForm:${variant}] Submitted payload:`, form)

    const programmeInterest =
      variant === 'acca'
        ? `ACCA${form.qualification ? ` (${form.qualification})` : ''}`
        : form.programme || ''

    // Persist lead locally so submissions are never lost
    try {
      const existingLeads = JSON.parse(localStorage.getItem('kizen_enquiries') || '[]')
      existingLeads.push({
        ...form,
        programmeInterest,
        variant,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem('kizen_enquiries', JSON.stringify(existingLeads))
    } catch {
      // ignore storage errors
    }

    // Insert lead into Supabase CRM leads table
    if (supabase) {
      try {
        const { data, error } = await supabase.from('leads').insert([
          {
            name: form.name?.trim() || '',
            phone: form.phone?.trim() || '',
            email: form.email?.trim() || null,
            programme: programmeInterest,
            source: 'website',
          },
        ])
        if (error) {
          console.error('[EnquiryForm] Supabase insert error:', error)
        } else {
          console.log('[EnquiryForm] Successfully inserted lead into Supabase:', data)
        }
      } catch (err) {
        console.error('[EnquiryForm] Failed to submit lead to Supabase:', err)
      }
    } else {
      console.warn('[EnquiryForm] Supabase client not initialized (missing environment variables)')
    }

    setSubmitting(false)
    // Do NOT auto-open WhatsApp — show inline Thank You state with action buttons
    setSubmitted(true)
  }

  // Called when user clicks "Continue on WhatsApp" from Thank You state
  const handleContinueWhatsApp = () => {
    openWhatsAppEnquiry(form)
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
        programme: isContact ? 'ACCA' : variant === 'courses' ? '11th Commerce' : 'Interested in ACCA',
        message: '',
      })
    }, 5000)
    return () => clearTimeout(t)
  }, [submitted, isContact, variant])

  if (submitted) {
    return (
      <div
        className={`w-full rounded-xl border p-5 text-sm font-semibold transition-all ${
          isContact
            ? 'border-gold bg-ivory text-ink shadow-sm'
            : 'border-gold/60 bg-paper/10 text-paper'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-circle-check text-gold text-xl"></i>
          <div>
            <div className="font-serif text-base text-ink mb-0.5">Thank You</div>
            <div className={`text-xs ${isContact ? 'text-ink/70' : 'text-paper/80'} font-normal`}>
              Thank you for submitting your enquiry. Our team will be in touch with you shortly.
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleContinueWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition bg-gold text-navy hover:bg-gold/90"
          >
            <i className="fa-brands fa-whatsapp"></i> Continue on WhatsApp
          </button>
          <a
            href="tel:+917696963377"
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
              isContact
                ? 'border border-ink/20 text-ink hover:border-ink hover:bg-ivory'
                : 'border border-paper/20 text-paper hover:border-gold hover:bg-paper/10'
            }`}
          >
            <i className="fa-solid fa-phone"></i> Call Us
          </a>
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
            <option>FinTech Programme</option>
            <option>IFRS Certification</option>
            <option>AI in Finance</option>
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
          <select
            name="qualification"
            required
            value={form.qualification}
            onChange={update}
            className={`${NAVY_INPUT} text-paper`}
          >
            <option value="" className="text-ink">Select your qualification</option>
            <option className="text-ink">12th Commerce (Pursuing / Passed)</option>
            <option className="text-ink">12th Non-Medical / Arts</option>
            <option className="text-ink">B.Com / BBA (Student / Graduate)</option>
            <option className="text-ink">M.Com / MBA (Student / Graduate)</option>
            <option className="text-ink">Working Professional (Finance / Accounts)</option>
            <option className="text-ink">Other Graduate Degree</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-paper transition shadow-sm font-sans"
        >
          Request ACCA Info Pack &amp; Syllabus
        </button>
      </form>
    )
  }

  // courses variant - MUST come before default home return
  if (variant === 'courses') {
    return (
      <form className="relative bg-white border border-ink/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className={NAVY_LABEL}>Full Name *</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={update}
            placeholder="Your full name"
            className={COURSES_INPUT}
          />
        </div>
        <div>
          <label className={NAVY_LABEL}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={update}
            placeholder="+91 XXXXX XXXXX"
            className={COURSES_INPUT}
          />
        </div>
        <div>
          <label className={NAVY_LABEL}>Programme of Interest *</label>
          <select name="programme" value={form.programme} onChange={update} className={`${COURSES_INPUT} text-ink`}>
            <option className="text-ink">11th Commerce</option>
            <option className="text-ink">12th Commerce</option>
            <option className="text-ink">B.Com</option>
            <option className="text-ink">BBA</option>
            <option className="text-ink">M.Com</option>
            <option className="text-ink">MBA</option>
            <option className="text-ink">ACCA</option>
            <option className="text-ink">FinTech</option>
            <option className="text-ink">IFRS</option>
            <option className="text-ink">AI in Finance</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-gold/90 transition shadow-sm font-sans"
        >
          Request Course Info &amp; Counselling
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
          <option className="text-ink">Interested in ACCA (Global Finance)</option>
          <option className="text-ink">Interested in 11th/12th Commerce</option>
          <option className="text-ink">Interested in B.Com / BBA</option>
          <option className="text-ink">Interested in M.Com / MBA</option>
          <option className="text-ink">Interested in FinTech Programme</option>
          <option className="text-ink">Interested in AI in Finance</option>
          <option className="text-ink">Interested in IFRS Certification</option>
          <option className="text-ink">Executive / Working Professional Track</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-gold text-navy font-semibold text-sm rounded-xl py-3.5 hover:bg-gold/90 transition shadow-sm font-sans mt-2"
      >
        Talk to a Counsellor
      </button>
    </form>
  )
}