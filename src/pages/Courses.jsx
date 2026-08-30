import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { setPageMeta } from '../utils/seo.js'

const SCHOOL = [
  { icon: 'fa-solid fa-book', desc: 'Foundational Accountancy, Economics and Business Studies — built to make Class 12 and beyond effortless.', tag: 'Class 11', title: '11th Commerce' },
  { icon: 'fa-solid fa-graduation-cap', desc: 'Board-exam mastery with early exposure to problem-solving styles used in ACCA and CA-level papers.', tag: 'Class 12', title: '12th Commerce' },
]

const UNDERGRAD = [
  { icon: 'fa-solid fa-building-columns', desc: 'University curriculum support with applied accounting and finance practice for real exam readiness.', tag: 'Bachelor\'s', title: 'B.Com' },
  { icon: 'fa-solid fa-briefcase', desc: 'Management fundamentals through case-based learning, paired with mentorship from working professionals.', tag: 'Bachelor\'s', title: 'BBA' },
]

const POSTGRAD = [
  { icon: 'fa-solid fa-chart-line', desc: 'Advanced commerce specialisation for students aiming at academia, research or corporate finance roles.', tag: 'Master\'s', title: 'M.Com' },
  { icon: 'fa-solid fa-people-group', desc: 'Leadership and strategy training for students moving toward management or entrepreneurial careers.', tag: 'Master\'s', title: 'MBA' },
]

// Flat list powering the level filter tabs — same six programmes, no new data.
const COURSES_FLAT = [
  ...SCHOOL.map((c) => ({ ...c, category: 'school' })),
  ...UNDERGRAD.map((c) => ({ ...c, category: 'undergrad' })),
  ...POSTGRAD.map((c) => ({ ...c, category: 'postgrad' })),
]

const SPECIALISATIONS = [
  {
    num: '05',
    icon: 'fa-solid fa-brain',
    title: 'FinTech Programme',
    desc: 'AI, digital payments, robo-advisory and blockchain — the technologies reshaping global finance.',
    to: '/fintech',
    eyebrow: 'Future Skill',
    colour: 'navy',
    text: 'paper',
  },
  {
    num: '06',
    icon: 'fa-solid fa-file-invoice',
    title: 'IFRS Certification',
    desc: 'Master International Financial Reporting Standards used across 140+ countries — from IASB framework to group accounts.',
    to: '/ifrs',
    eyebrow: 'Global Finance',
    colour: 'navy',
    text: 'paper',
  },
  {
    num: '07',
    icon: 'fa-solid fa-microchip',
    title: 'AI in Finance',
    desc: 'Machine learning, deep learning and NLP for algorithmic trading, fraud detection, credit scoring and robo-advisory.',
    to: '/ai-programmes',
    eyebrow: 'Emerging',
    colour: 'navy',
    text: 'paper',
  },
]

const TABS = [
  { key: 'all', label: 'All', icon: 'fa-solid fa-border-all' },
  { key: 'school', label: 'School Level', num: '01', headline: 'Where the pathway begins', icon: 'fa-solid fa-book' },
  { key: 'undergrad', label: 'Undergraduate', num: '02', headline: 'Building the professional base', icon: 'fa-solid fa-building-columns' },
  { key: 'postgrad', label: 'Postgraduate', num: '03', headline: 'Specialising before the global step', icon: 'fa-solid fa-chart-line' },
  { key: 'global', label: 'Global (ACCA)', num: '04', headline: 'Where the pathway ends — and opens up', icon: 'fa-solid fa-earth-americas' },
]

// Shared ACCA highlight section — rendered both in the "All" view and when the
// "Global (ACCA)" tab is active. Static JSX, no hooks needed at module level.
const GLOBAL_SECTION = (
  <section id="global" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
    <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/5"></div>
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-serif text-5xl text-paper/10 font-bold">04</span>
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Global · The Destination</div>
          <h2 className="font-serif text-2xl lg:text-3xl font-medium">Where the pathway ends — and opens up</h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 border border-paper/15 rounded-2xl p-8 lg:p-10 bg-paper/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center"><i className="fa-solid fa-earth-americas text-2xl text-navy"></i></div>
            <div>
              <div className="font-serif text-2xl font-semibold">ACCA</div>
              <div className="text-xs text-gold font-semibold uppercase tracking-wide">Globally Recognised in 180+ Countries</div>
            </div>
          </div>
          <p className="text-sm text-paper/70 leading-relaxed mb-6">The natural next step for Kizen students coming from B.Com, BBA, M.Com or MBA — and open to any 12th-pass student ready to aim global from day one.</p>
          <Link to="/acca" className="inline-flex items-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3 rounded-full hover:bg-paper transition">Explore ACCA Programme <i className="fa-solid fa-arrow-right text-xs"></i></Link>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-center">
          <div className="border border-paper/15 rounded-xl py-6">
            <div className="font-serif text-3xl font-bold text-gold">95%+</div>
            <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Pass Rate</div>
          </div>
          <div className="border border-paper/15 rounded-xl py-6">
            <div className="font-serif text-3xl font-bold text-gold">13</div>
            <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Papers</div>
          </div>
          <div className="border border-paper/15 rounded-xl py-6">
            <div className="font-serif text-3xl font-bold text-gold">4.9<span className="text-lg">/5</span></div>
            <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Google Rating</div>
          </div>
          <div className="border border-paper/15 rounded-xl py-6">
            <div className="font-serif text-3xl font-bold text-gold">180+</div>
            <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Countries</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default function Courses() {
  const [filter, setFilter] = useState('all')
  const activeTab = TABS.find((t) => t.key === filter)

  useEffect(() => {
    setPageMeta({
      title: 'Courses — Commerce & ACCA Programmes | Kizen Education Chandigarh',
      description: "Explore Kizen's six programmes — 11th & 12th Commerce, B.Com, BBA, M.Com, MBA and ACCA — taught as one continuous pathway at our Sector 34-A, Chandigarh campus.",
    })
  }, [])

  return (
    <>
      {/* ============ HERO — headline + inline EnquiryForm (visible on load) ============ */}
      <section id="courses-hero" className="bg-paper pt-12 pb-14 lg:pt-16 lg:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 60% at 50% 0%, #FFFDF9 0%, #FAF7EE 50%, #F5EFE0 100%)',
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-7">
              <Eyebrow>All Programmes</Eyebrow>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.08] tracking-tight">Six programmes.<br />One continuous pathway.</h1>
              <p className="text-ink/60 text-base leading-relaxed mt-5 max-w-2xl">Every course at Kizen is a step on the same ladder — from a student's first commerce class to a globally recognised professional qualification. Choose your entry point below.</p>
            </div>

            {/* Right — Course Enquiry Form (inline, visible on load) */}
            <div className="lg:col-span-5">
              <EnquiryForm variant="courses" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEVEL FILTER TABS (client-side, no new data) ============ */}
      <section id="level-filter" aria-label="Filter programmes by level" className="sticky top-20 z-30 bg-ivory/95 backdrop-blur border-b border-ink/10 py-4">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div role="tablist" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={filter === t.key}
                onClick={() => setFilter(t.key)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-[13px] font-semibold border transition ${
                  filter === t.key
                    ? 'bg-navy text-paper border-gold/50 shadow-sm'
                    : 'bg-paper text-ink/70 border-ink/10 hover:border-navy/40 hover:text-ink'
                }`}
              >
                <i className={`${t.icon} ${filter === t.key ? 'text-gold' : 'text-ink/40'}`}></i> {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PATHWAY STRIP ============ */}
      <section id="pathway-strip" className="bg-ivory py-10 border-y border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-ink/10 text-sm font-medium">11th Commerce</div>
            <i className="fa-solid fa-arrow-right text-ink/25 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-ink/10 text-sm font-medium">12th Commerce</div>
            <i className="fa-solid fa-arrow-right text-ink/25 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-ink/10 text-sm font-medium">B.Com / BBA</div>
            <i className="fa-solid fa-arrow-right text-ink/25 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-ink/10 text-sm font-medium">M.Com / MBA</div>
            <i className="fa-solid fa-arrow-right text-ink/25 text-xs"></i>
            <Link to="/acca" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-paper text-sm font-semibold border-2 border-gold/40 hover:bg-ink transition"><i className="fa-solid fa-earth-americas text-gold"></i> ACCA</Link>
          </div>
        </div>
      </section>

      {/* ===== ALL PROGRAMMES VIEW (tab: All) ===== */}
      {filter === 'all' && (
      <>
      {/* ============ SCHOOL LEVEL — paper ============ */}
      <section id="school" className="bg-paper py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">School Level</div>
              <h2 className="font-serif text-2xl lg:text-3xl font-medium">Where the pathway begins</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SCHOOL.map((c) => (
              <div key={c.title} className="border border-ink/12 rounded-2xl p-8 hover:border-navy/40 transition">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-ink/10 flex items-center justify-center"><i className={`${c.icon} text-lg text-ink/70`}></i></div>
                  <span className="text-xs font-bold text-ink/40 uppercase tracking-wider">{c.tag}</span>
                </div>
                <div className="font-serif text-2xl font-semibold mb-3">{c.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{c.desc}</p>
                <a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-0.5 hover:gap-3 transition-all">Enquire for batch details <i className="fa-solid fa-arrow-right text-xs"></i></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UNDERGRADUATE — ivory ============ */}
      <section id="undergrad" className="bg-ivory py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Undergraduate</div>
              <h2 className="font-serif text-2xl lg:text-3xl font-medium">Building the professional base</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {UNDERGRAD.map((c) => (
              <div key={c.title} className="bg-paper border border-ink/10 rounded-2xl p-8 hover:border-navy/40 transition">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-ink/10 flex items-center justify-center"><i className={`${c.icon} text-lg text-ink/70`}></i></div>
                  <span className="text-xs font-bold text-ink/40 uppercase tracking-wider">{c.tag}</span>
                </div>
                <div className="font-serif text-2xl font-semibold mb-3">{c.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{c.desc}</p>
                <a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-0.5 hover:gap-3 transition-all">Enquire for batch details <i className="fa-solid fa-arrow-right text-xs"></i></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POSTGRADUATE — paper ============ */}
      <section id="postgrad" className="bg-paper py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Postgraduate</div>
              <h2 className="font-serif text-2xl lg:text-3xl font-medium">Specialising before the global step</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {POSTGRAD.map((c) => (
              <div key={c.title} className="border border-ink/12 rounded-2xl p-8 hover:border-navy/40 transition">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-ink/10 flex items-center justify-center"><i className={`${c.icon} text-lg text-ink/70`}></i></div>
                  <span className="text-xs font-bold text-ink/40 uppercase tracking-wider">{c.tag}</span>
                </div>
                <div className="font-serif text-2xl font-semibold mb-3">{c.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{c.desc}</p>
                <a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-0.5 hover:gap-3 transition-all">Enquire for batch details <i className="fa-solid fa-arrow-right text-xs"></i></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {GLOBAL_SECTION}
      </>
      )}

      {/* ===== FILTERED VIEW (specific level tabs — same six programmes, just filtered) ===== */}
      {filter !== 'all' && (
        <section id="filtered-courses" className="bg-paper py-16 lg:py-24 min-h-[420px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-10">
              <span className="font-serif text-5xl text-ink/15 font-bold">{activeTab.num}</span>
              <div>
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">{activeTab.label}</div>
                <h2 className="font-serif text-2xl lg:text-3xl font-medium">{activeTab.headline}</h2>
              </div>
            </div>

            {filter === 'global' ? (
              GLOBAL_SECTION
            ) : (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {COURSES_FLAT.filter((c) => c.category === filter).map((c) => (
                  <div key={c.title} className="border border-ink/12 rounded-2xl p-8 hover:border-navy/40 transition bg-paper">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-ivory border border-ink/10 flex items-center justify-center"><i className={`${c.icon} text-lg text-ink/70`}></i></div>
                      <span className="text-xs font-bold text-ink/40 uppercase tracking-wider">{c.tag}</span>
                    </div>
                    <div className="font-serif text-2xl font-semibold mb-3">{c.title}</div>
                    <p className="text-sm text-ink/60 leading-relaxed mb-6">{c.desc}</p>
                    <a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-0.5 hover:gap-3 transition-all">Enquire for batch details <i className="fa-solid fa-arrow-right text-xs"></i></a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ SPECIALISATIONS (FinTech / IFRS / AI) ============ */}
      <section id="specialisations" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">05</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Specialisations</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Future-focused programmes in finance technology</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIALISATIONS.map((s) => (
              <div key={s.title} className="border border-ink/12 rounded-2xl p-8 bg-ivory hover:border-gold/40 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center"><i className={`${s.icon} text-2xl text-gold`}></i></div>
                  <div className="font-serif text-3xl font-bold text-ink/20">0{s.num.slice(-1)}</div>
                </div>
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">{s.eyebrow}</div>
                <div className="font-serif text-2xl font-semibold mb-3 text-ink">{s.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{s.desc}</p>
                <Link to={s.to} className="inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold transition">
                  Explore programme <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENQUIRY CTA — paper ============ */}
      <section id="counselling" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-ivory rounded-3xl border border-ink/10 p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-medium text-ink mb-2">Start Your Path to a Globally Recognised Qualification</h2>
              <p className="text-ink/60 text-sm">Talk to a counsellor — we'll map the exact pathway for your goals.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="tel:+917696963377" className="inline-flex items-center justify-center gap-2 border border-ink/20 text-ink font-semibold text-sm px-6 py-3.5 rounded-full hover:border-ink transition"><i className="fa-solid fa-phone text-gold"></i> +91 76969 63377</a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-navy text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-ink transition">Talk to a Counsellor</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}