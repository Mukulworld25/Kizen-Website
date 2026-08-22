import { useEffect } from 'react'
import Eyebrow from '../components/Eyebrow.jsx'

const STATS = [
  { value: '95%+', label: 'Pass rate maintained across every programme we teach', accent: false },
  { value: '4.9 <i class="fa-solid fa-star text-gold text-2xl"></i>', label: 'Average rating from 34 verified Google Reviews', accent: false, isIcon: true },
  { value: '6', label: 'Programmes taught under one roof, one continuous pathway', accent: false },
  { value: '180+', label: 'Countries where our ACCA graduates\' qualification is recognised', accent: true },
]

const VALUES_DATA = [
  { num: '01', title: 'Continuity over convenience', body: 'We\'d rather build a 7-year relationship with a family than optimise for a single semester\'s enrolment.' },
  { num: '02', title: 'Global standard, local access', body: 'A qualification recognised in 180+ countries shouldn\'t require leaving Chandigarh to prepare for.' },
  { num: '03', title: 'Small batches, real mentorship', body: 'Every stage keeps class sizes small enough for faculty to know each student by name and progress.' },
]

/* TODO: Faculty section removed — awaiting real faculty names, photos, and credentials */
/* TODO: Replace with real verified review text before going live */

export default function About() {
  useEffect(() => {
    document.title = 'About — Kizen Education'
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="about-hero" className="bg-paper py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Eyebrow>About Kizen</Eyebrow>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-serif text-4xl lg:text-5xl font-medium leading-[1.08] tracking-tight">We built the only institute that doesn't say goodbye at graduation.</h1>
            <p className="lg:col-span-4 text-ink/60 text-[15px] leading-relaxed">Kizen Education started in Sector 34-A with a simple observation: commerce students kept changing institutes at every stage. We decided to fix that.</p>
          </div>
        </div>
      </section>

      {/* ============ STORY — ivory ============ */}
      <section id="story" className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Our Story</div>
            <h2 className="font-serif text-3xl font-medium leading-tight mb-6">One address, one philosophy, seven years of a student's education.</h2>
            <p className="text-ink/60 text-[15px] leading-relaxed mb-4">Kizen was founded on the belief that switching institutes between school, college and professional qualification breaks continuity — and students pay the price in re-learning fundamentals every time.</p>
            <p className="text-ink/60 text-[15px] leading-relaxed">Today, from SCO 193-195, Sector 34-A, we run all six stages of the commerce pathway — 11th and 12th Commerce, B.Com, BBA, M.Com, MBA, and ACCA — with faculty who move with the student, not away from them.</p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {STATS.map((s) =>
              s.accent ? (
                <div key={s.value} className="bg-navy text-paper rounded-2xl p-8">
                  <div className="font-serif text-4xl font-bold text-gold mb-2" dangerouslySetInnerHTML={{ __html: s.value }}></div>
                  <div className="text-sm text-paper/70">{s.label}</div>
                </div>
              ) : (
                <div key={s.value} className="bg-paper rounded-2xl p-8 border border-ink/10">
                  <div className="font-serif text-4xl font-bold text-rust mb-2" dangerouslySetInnerHTML={{ __html: s.value }}></div>
                  <div className="text-sm text-ink/60">{s.label}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ MISSION/VALUES — paper ============ */}
      <section id="values" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-center mb-16 max-w-2xl mx-auto">Three principles that shape every classroom decision</h2>
          <div className="grid md:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-2xl overflow-hidden">
            {VALUES_DATA.map((v) => (
              <div key={v.num} className="bg-paper p-10">
                <span className="font-serif text-3xl font-bold text-ink/20">{v.num}</span>
                <div className="font-serif text-xl font-semibold mt-4 mb-3">{v.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: Faculty section — awaiting real names, photos, and credentials */}
      {/* TODO: Remove this placeholder and replace with real content */}

      {/* ============ VISIT CTA — paper ============ */}
      <section id="enquiry" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Visit the Campus</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-6">See the classrooms where the pathway happens.</h2>
            <div className="space-y-4 text-sm text-ink/70">
              <div className="flex gap-3"><i className="fa-solid fa-location-dot text-gold mt-1"></i> SCO 193-195, Sector 34-A, Chandigarh</div>
              <div className="flex gap-3"><i className="fa-solid fa-phone text-gold mt-1"></i> +91 76969 63377</div>
              <div className="flex gap-3"><i className="fa-solid fa-clock text-gold mt-1"></i> Mon–Sat, 9:00 AM – 7:00 PM</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-ink/10 h-72 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.7415999999997!2d76.77894!3d30.72266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be6e6e6e6%3A0x123456789abcdef!2sSCO+193-195%2C+Sector+34-A%2C+Chandigarh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kizen Education Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}