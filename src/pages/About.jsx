import { useEffect } from 'react'
import Eyebrow from '../components/Eyebrow.jsx'
import { setPageMeta } from '../utils/seo.js'

const STATS = [
  { value: '95%+', label: 'Pass rate maintained across every programme we teach', accent: false },
  { value: '4.9 <i class="fa-solid fa-star text-gold text-2xl"></i>', label: 'Average rating from 34 verified Google Reviews', accent: false, isIcon: true },
  { value: '10', label: 'Programmes & specialisations taught under one continuous pathway', accent: false },
  { value: '180+', label: 'Countries where our ACCA graduates\' qualification is recognised', accent: true },
]

const LEADERSHIP = [
  {
    name: 'Shivam Sharma',
    role: 'Founder & Director',
    credentials: 'B.A. Economics, Panjab University',
    bio: 'Shivam Sharma is the founder and director of Kizen Education, responsible for the institute’s vision, strategic direction, and long-term growth. His academic foundation in Economics shapes his approach toward sustainable institution building. Shivam oversees institutional strategy, infrastructure development, systems & processes, and student welfare, ensuring educators have the resources to teach with dedication and integrity in a safe, world-class learning space.',
    tags: ['Institutional Strategy', 'Systems & Processes', 'Student Welfare'],
    icon: 'fa-solid fa-compass',
  },
  {
    name: 'Simrat',
    role: 'Academic Coordinator & Senior Faculty',
    credentials: 'B.Com, M.Com (Panjab Univ.), 2x UGC-NET, Ph.D. Scholar (Finance)',
    bio: 'Simrat serves as the Academic Coordinator and Senior Faculty at Kizen Education. Holding a B.Com and M.Com from Panjab University, she has cleared UGC-NET in Commerce twice and is pursuing her Ph.D. in Finance. With extensive teaching experience across Class 11-12, B.Com, BBA, M.Com, MBA and ACCA, she oversees curriculum structuring, assessment design, faculty coordination, and individualized student mentoring.',
    tags: ['Academic Coordination', 'Curriculum Design', 'Ph.D. Finance Scholar'],
    icon: 'fa-solid fa-graduation-cap',
  },
]

const INFRASTRUCTURE_FEATURES = [
  { icon: 'fa-solid fa-desktop', title: 'ICT-Enabled Classrooms', desc: 'Modern air-conditioned classrooms equipped with digital boards, presentation tools, and multimedia learning tech.' },
  { icon: 'fa-solid fa-book-open-reader', title: 'Curated Study Materials', desc: 'Comprehensive conceptual notes, revision workbooks, and past paper question banks tailored for board and ACCA exams.' },
  { icon: 'fa-solid fa-comments', title: 'Dedicated Doubt Resolution', desc: 'Separate 1-on-1 doubt clearing sessions ensuring no student leaves the campus with unresolved concepts.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Safe & Disciplined Campus', desc: 'A secure, student-friendly academic environment in Sector 34-A designed for focused study and peer collaboration.' },
  { icon: 'fa-solid fa-users-viewfinder', title: 'Transparent Parent Updates', desc: 'Regular academic progress reports, attendance monitoring, and open-door parent-faculty communication.' },
  { icon: 'fa-solid fa-laptop-code', title: 'Hybrid Learning Flexibility', desc: 'Seamless offline classroom experience combined with recorded backup lectures and digital LMS resources.' },
]

const VALUES_DATA = [
  { num: '01', title: 'Continuity over convenience', body: 'We\'d rather build a 7-year relationship with a family than optimise for a single semester\'s enrolment.' },
  { num: '02', title: 'Global standard, local access', body: 'A qualification recognised in 180+ countries shouldn\'t require leaving Chandigarh to prepare for.' },
  { num: '03', title: 'Small batches, real mentorship', body: 'Every stage keeps class sizes small enough for faculty to know each student by name and progress.' },
]

const PATHWAY_STAGES = [
  { num: '01', stage: 'Class 11', title: 'Foundation', icon: 'fa-solid fa-book', desc: 'Accounts, Economics & Business Studies — board-ready fundamentals.' },
  { num: '02', stage: 'Class 12', title: 'Board Mastery', icon: 'fa-solid fa-graduation-cap', desc: 'Exam-focused mastery with early ACCA/CA problem-solving exposure.' },
  { num: '03', stage: 'B.Com / BBA', title: 'Undergraduate', icon: 'fa-solid fa-building-columns', desc: 'University curriculum paired with applied accounting & finance practice.' },
  { num: '04', stage: 'M.Com / MBA', title: 'Postgraduate', icon: 'fa-solid fa-chart-line', desc: 'Advanced specialisation for leadership and corporate finance roles.' },
  { num: '05', stage: 'ACCA & Tech', title: 'Global Exit', icon: 'fa-solid fa-earth-americas', desc: 'Globally recognised professional qualifications — 13 papers, 180+ countries.', accent: true },
]

const HOW_WE_TEACH = [
  { icon: 'fa-solid fa-lightbulb', title: 'Concept-driven, not rote', body: 'Every topic is taught from first principles so students can solve unfamiliar problems, not just memorise patterns.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batches by design', body: 'Capped class sizes mean faculty track individual paper-wise progress and intervene early when a student struggles.' },
  { icon: 'fa-solid fa-route', title: 'Seamless stage transitions', body: 'Faculty who teach Class 11 also teach ACCA — the same academic relationship continues, eliminating re-learning gaps.' },
  { icon: 'fa-solid fa-file-circle-check', title: 'Mock exams every cycle', body: 'Timed, full-length practice mapped to actual board/university/ACCA exam sessions with detailed feedback.' },
]

export default function About() {
  useEffect(() => {
    setPageMeta({
      title: 'About Kizen Education — Chandigarh Commerce Institute & Leadership',
      description: "Learn about Kizen Education's founding story, leadership team under Shivam Sharma and Simrat, and our continuous 7-year commerce and ACCA pathway in Sector 34-A, Chandigarh.",
    })
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="about-hero" className="bg-paper py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Eyebrow>About Kizen Education</Eyebrow>
          <div className="grid lg:grid-cols-12 gap-8 items-end mt-2">
            <h1 className="lg:col-span-8 font-serif text-4xl lg:text-5xl font-medium leading-[1.08] tracking-tight text-ink">
              We built the only institute that doesn&apos;t say goodbye at graduation.
            </h1>
            <p className="lg:col-span-4 text-ink/65 text-[15px] leading-relaxed">
              Kizen Education was created in Sector 34-A out of a deep passion for teaching and a simple observation: commerce students kept changing institutes at every stage. We built a permanent academic home to fix that.
            </p>
          </div>
        </div>
      </section>

      {/* ============ STORY — ivory ============ */}
      <section id="story" className="bg-ivory py-20 lg:py-28 border-y border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-6">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3">Our Founding Story</div>
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink mb-6">
              One address, one philosophy, seven years of a student&apos;s education.
            </h2>
            <p className="text-ink/70 text-[15px] leading-relaxed mb-4">
              Kizen Education was founded on the conviction that switching coaching centres between school, graduation and professional credentials fractures learning. Each transition meant new faculty, disjointed methods, and lost momentum.
            </p>
            <p className="text-ink/70 text-[15px] leading-relaxed mb-4">
              At Kizen, our core philosophy rejects rote memorisation. We focus on conceptual clarity, real-world finance applications, and ethical student care. The institute was built as a safe, inspiring learning space where quality education and dedicated mentorship come first.
            </p>
            <p className="text-ink/70 text-[15px] leading-relaxed">
              Today, from SCO 193-195 in Sector 34-A, Chandigarh, we deliver an uninterrupted curriculum spanning Class 11-12 Commerce, B.Com, BBA, M.Com, MBA, ACCA, and emerging Finance Technology certifications.
            </p>
          </div>
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">
            {STATS.map((s) =>
              s.accent ? (
                <div key={s.label} className="bg-navy text-paper rounded-2xl p-8 border border-gold/30 shadow-xl flex flex-col justify-between">
                  <div className="font-serif text-4xl font-bold text-gold mb-2" dangerouslySetInnerHTML={{ __html: s.value }}></div>
                  <div className="text-sm text-paper/80 leading-snug">{s.label}</div>
                </div>
              ) : (
                <div key={s.label} className="bg-paper rounded-2xl p-8 border border-ink/10 shadow-sm flex flex-col justify-between">
                  <div className="font-serif text-4xl font-bold text-rust mb-2" dangerouslySetInnerHTML={{ __html: s.value }}></div>
                  <div className="text-sm text-ink/65 leading-snug">{s.label}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ LEADERSHIP & VISION (Merged from Old Website) ============ */}
      <section id="leadership" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Leadership &amp; Vision</Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mt-2">
              The minds behind Kizen Education
            </h2>
            <p className="text-ink/65 text-base mt-3">
              Founded on strong ethics, academic rigor, and personal accountability to every student and parent.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="bg-ivory border border-ink/10 rounded-3xl p-8 sm:p-10 shadow-md hover:border-gold/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl shadow-md shrink-0">
                      <i className={leader.icon}></i>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-ink">{leader.name}</h3>
                      <div className="text-gold text-xs font-bold uppercase tracking-wider mt-0.5">{leader.role}</div>
                      <div className="text-ink/55 text-xs font-medium mt-1">{leader.credentials}</div>
                    </div>
                  </div>

                  <p className="text-ink/75 text-sm leading-relaxed mb-6">
                    {leader.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10">
                  {leader.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-paper border border-ink/10 text-ink/75 text-[11px] font-semibold px-3 py-1 rounded-full"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INFRASTRUCTURE & LEARNING ENVIRONMENT ============ */}
      <section id="infrastructure" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Campus &amp; Facilities</Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mt-2">
              Infrastructure built for deep focus &amp; mentorship
            </h2>
            <p className="text-ink/65 text-base mt-3">
              Modern classrooms with ICT tools, digital smart systems, and dedicated spaces for personal guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {INFRASTRUCTURE_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="bg-paper border border-ink/10 rounded-2xl p-7 hover:border-navy/40 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
                  <i className={feat.icon}></i>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink mb-2">{feat.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE PATHWAY — paper ============ */}
      <section id="pathway" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">The Kizen Pathway</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight max-w-2xl mx-auto text-ink">
              Every stage builds on the last — no gaps, no repetition, no starting over.
            </h2>
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-navy bg-gold">
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
      <section id="how-we-teach" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">How We Teach</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight max-w-2xl mx-auto text-ink">
              Concept-driven, small batches, seamless transitions — four principles that guide every class.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_TEACH.map((h) => (
              <div key={h.title} className="bg-paper rounded-2xl p-6 border border-ink/10 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <i className={`${h.icon} text-xl text-gold`}></i>
                </div>
                <div className="font-serif text-lg font-semibold mb-2 text-ink">{h.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section id="values" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-center mb-16 max-w-2xl mx-auto text-ink">
            Three principles that shape every classroom decision
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-2xl overflow-hidden shadow-sm">
            {VALUES_DATA.map((v) => (
              <div key={v.num} className="bg-paper p-10">
                <span className="font-serif text-3xl font-bold text-ink/20">{v.num}</span>
                <div className="font-serif text-xl font-semibold mt-4 mb-3 text-ink">{v.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISIT CTA — paper ============ */}
      <section id="enquiry" className="bg-ivory py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Visit the Campus</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-6 text-ink">
              See the classrooms where the pathway happens.
            </h2>
            <div className="space-y-4 text-sm text-ink/75">
              <div className="flex gap-3">
                <i className="fa-solid fa-location-dot text-gold mt-1"></i>
                <span>SCO 193-195, Sector 34-A, Chandigarh, 160022</span>
              </div>
              <div className="flex gap-3">
                <i className="fa-solid fa-phone text-gold mt-1"></i>
                <a href="tel:+917696963377" className="hover:text-navy font-semibold">+91 76969 63377</a>
              </div>
              <div className="flex gap-3">
                <i className="fa-solid fa-envelope text-gold mt-1"></i>
                <a href="mailto:kizeneducationofficial@gmail.com" className="hover:text-navy">kizeneducationofficial@gmail.com</a>
              </div>
              <div className="flex gap-3">
                <i className="fa-solid fa-clock text-gold mt-1"></i>
                <span>Mon–Sat, 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-ink/10 h-72 lg:h-auto shadow-md">
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