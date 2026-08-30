import { useEffect } from 'react'
import Eyebrow from '../components/Eyebrow.jsx'
import { setPageMeta } from '../utils/seo.js'

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

// Pathway stages referenced across the site
const PATHWAY_STAGES = [
  { num: '01', stage: 'Class 11', title: 'Foundation', icon: 'fa-solid fa-book', desc: 'Accounts, Economics & Business Studies — board-ready fundamentals.' },
  { num: '02', stage: 'Class 12', title: 'Board Mastery', icon: 'fa-solid fa-graduation-cap', desc: 'Exam-focused mastery with early ACCA/CA problem-solving exposure.' },
  { num: '03', stage: 'B.Com / BBA', title: 'Undergraduate', icon: 'fa-solid fa-building-columns', desc: 'University curriculum paired with applied accounting & finance practice.' },
  { num: '04', stage: 'M.Com / MBA', title: 'Postgraduate', icon: 'fa-solid fa-chart-line', desc: 'Advanced specialisation for leadership and corporate finance roles.' },
  { num: '05', stage: 'ACCA', title: 'Global Exit', icon: 'fa-solid fa-earth-americas', desc: 'Globally recognised professional qualification — 13 papers, 180+ countries.', accent: true },
]

const HOW_WE_TEACH = [
  { icon: 'fa-solid fa-lightbulb', title: 'Concept-driven, not rote', body: 'Every topic is taught from first principles so students can solve unfamiliar problems, not just memorise patterns.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batches by design', body: 'Capped class sizes mean faculty track individual paper-wise progress and intervene early when a student struggles.' },
  { icon: 'fa-solid fa-route', title: 'Seamless stage transitions', body: 'Faculty who teach Class 11 also teach ACCA — the same academic relationship continues, eliminating re-learning gaps.' },
  { icon: 'fa-solid fa-file-circle-check', title: 'Mock exams every cycle', body: 'Timed, full-length practice mapped to actual board/university/ACCA exam sessions with detailed feedback.' },
]

/* Faculty directory — verbatim role/credentials & headshots added below. */
const FACULTY = [
  { name: 'Aadya Sharma' },
  { name: 'Megha Dadwal' },
  { name: 'Shaifali' },
  { name: 'Shivangi' },
]

const AVATAR_COLORS = [
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-teal-700',
]

const initials = (name) => name.split(/\s+/).map((n) => n[0]).join('').toUpperCase()


/* TODO: Replace with real verified review text before going live */

export default function About() {
  useEffect(() => {
    setPageMeta({
      title: 'About Kizen Education — Chandigarh Commerce Institute',
      description: "How Kizen Education carries Chandigarh students from Class 11 commerce fundamentals to globally recognised ACCA qualifications — small batches, continuous mentorship, one campus.",
    })
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
            <p className="text-ink/60 text-[15px] leading-relaxed mb-4">The pattern was familiar: a student joins one centre for Class 11, another for B.Com, a third for ACCA. Each transition means new faculty, new methods, and months spent re-establishing trust. Kizen eliminated that fracture by building every stage under one roof — from the first commerce class to the final ACCA paper.</p>
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

      {/* ============ THE PATHWAY — paper ============ */}
      <section id="pathway" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">The Kizen Pathway</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight max-w-2xl mx-auto">Every stage builds on the last — no gaps, no repetition, no starting over.</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-6">
            {PATHWAY_STAGES.map((p) => (
              <div
                key={p.num}
                className={`relative rounded-2xl p-6 transition-all ${
                  p.accent
                    ? 'bg-navy text-paper border border-gold/30 shadow-xl'
                    : 'bg-ivory border border-ink/10 hover:border-gold/40'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-navy bg-gold">
                  {p.num}
                </div>
                <div className="pt-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 bg-white/10">
                    <i className={`${p.icon} text-2xl ${p.accent ? 'text-gold' : 'text-ink'}`}></i>
                  </div>
                  <div className="font-serif text-lg font-semibold mb-1">{p.stage}</div>
                  <div className="text-xs text-gold font-semibold uppercase tracking-wide mb-2">{p.title}</div>
                  <p className={`text-sm leading-relaxed ${p.accent ? 'text-paper/75' : 'text-ink/60'}`}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW WE TEACH — ivory ============ */}
      <section id="how-we-teach" className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">How We Teach</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight max-w-2xl mx-auto">Concept-driven, small batches, seamless transitions — every classroom decision follows these four principles.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_TEACH.map((h) => (
              <div key={h.title} className="bg-paper rounded-2xl p-6 border border-ink/10 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <i className={`${h.icon} text-xl text-gold`}></i>
                </div>
                <div className="font-serif text-lg font-semibold mb-2">{h.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

      {/* ============ FACULTY ============ */}
      <section id="faculty" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Meet the faculty</Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-4">The mentors who guide the pathway</h2>
            <p className="text-ink/60 text-lg">Taught by practitioners who hold ACCA, CA and international finance qualifications themselves, and who still teach the earliest stages year after year — so the same relationship follows each student forwards.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACULTY.map((f, i) => (
              <div key={f.name} className="bg-paper rounded-2xl p-6 border border-ink/10 text-center">
                {/* TODO: real headshot — swap avatar for <img src="/images/faculty/<slug>.jpg" alt={f.name} /> when photos are provided */}
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                  {initials(f.name)}
                </div>
                <div className="font-serif text-xl font-semibold mb-1">{f.name}</div>
                {/* TODO: role & credentials — e.g., "MAcc, ACCA (UK), Head of Finance Programmes" */}
                <div className="text-gold text-xs font-bold uppercase tracking-[0.15em] mb-3">Role & credentials pending</div>
                {/* TODO: verbatim bio text — paste provided copy here */}
                <p className="text-xs text-ink/40 italic">Bio text pending — replace with provided verbatim copy.</p>
              </div>
            ))}
          </div>
        </div>
      </section>


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