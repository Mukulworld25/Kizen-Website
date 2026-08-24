import { useEffect } from 'react'
import Eyebrow from '../components/Eyebrow.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { setPageMeta } from '../utils/seo.js'

const FAQ = [
  { q: 'Can my child start ACCA directly after 12th?', a: 'Yes — 12th pass with English and Mathematics/Statistics is sufficient to begin, though many students choose to complete B.Com or BBA first.' },
  { q: 'Do you offer weekend batches?', a: 'Yes, weekend and evening batches are available for working professionals across all postgraduate and ACCA programmes.' },
  { q: 'Is there a fee for the counselling session?', a: 'No, initial counselling and pathway planning is completely free.' },
]

export default function Contact() {
  useEffect(() => {
    setPageMeta({
      title: 'Contact Kizen Education — Sector 34-A, Chandigarh',
      description: 'Visit Kizen Education at SCO 193-195, Sector 34-A, Chandigarh. Call +91 76969 63377 or send an enquiry — our academic counsellors respond within 24 hours.',
    })
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="contact-hero" className="bg-paper py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1 className="font-serif text-4xl lg:text-5xl font-medium leading-[1.08] tracking-tight max-w-3xl">Let's map out the next step on your pathway.</h1>
        </div>
      </section>

      {/* ============ CONTACT DETAILS + FORM — ivory ============ */}
      <section id="form" className="bg-ivory py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-paper rounded-2xl border border-ink/10 p-8">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-5"><i className="fa-solid fa-location-dot text-gold"></i></div>
              <div className="font-serif text-lg font-semibold mb-2">Visit the Campus</div>
              <p className="text-sm text-ink/60 leading-relaxed">SCO 193-195, Sector 34-A, Chandigarh, 160034</p>
            </div>
            <div className="bg-paper rounded-2xl border border-ink/10 p-8">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-5"><i className="fa-solid fa-phone text-gold"></i></div>
              <div className="font-serif text-lg font-semibold mb-2">Call or WhatsApp</div>
              <a href="tel:+917696963377" className="text-sm text-ink/70 hover:text-rust">+91 76969 63377</a>
            </div>
            <div className="bg-paper rounded-2xl border border-ink/10 p-8">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-5"><i className="fa-solid fa-clock text-gold"></i></div>
              <div className="font-serif text-lg font-semibold mb-2">Counselling Hours</div>
              <p className="text-sm text-ink/60 leading-relaxed">Monday – Saturday, 9:00 AM – 7:00 PM</p>
            </div>
            <div className="bg-navy text-paper rounded-2xl p-8">
              <div className="flex text-gold text-sm mb-3"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i></div>
              <div className="font-serif text-lg font-semibold mb-1">4.9 / 5 rating</div>
              <p className="text-sm text-paper/70">From 34 verified Google Reviews</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-paper rounded-2xl border border-ink/10 p-8 lg:p-10">
              <div className="font-serif text-2xl font-semibold mb-1">Send an Enquiry</div>
              <div className="text-sm text-ink/50 mb-8">We typically respond within 24 hours.</div>
              <EnquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP — paper ============ */}
      <section id="map" className="bg-paper py-16 lg:py-20 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Find Us</div>
              <h2 className="font-serif text-3xl font-medium">SCO 193-195, Sector 34-A, Chandigarh</h2>
            </div>
            <a
              href="https://maps.google.com/?q=SCO+193-195,+Sector+34-A,+Chandigarh,+160034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-1 w-fit"
            >
              Get Directions <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-ink/10 h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.7415999999997!2d76.77894!3d30.72266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be6e6e6e6%3A0x123456789abcdef!2sSCO+193-195%2C+Sector+34-A%2C+Chandigarh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kizen Education Location - SCO 193-195 Sector 34-A Chandigarh"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ============ FAQ — ivory ============ */}
      <section id="faq" className="bg-ivory py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Common Questions</div>
            <h2 className="font-serif text-3xl font-medium leading-tight">Before you call, a few quick answers</h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-paper rounded-xl border border-ink/10 p-6">
                <div className="font-semibold flex items-center justify-between">{item.q} <i className="fa-solid fa-plus text-ink/40"></i></div>
                <p className="text-sm text-ink/60 mt-3 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}