import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { setPageMeta } from '../utils/seo.js'

const WHY_KIZEN = [
  'Globally Recognised Career Path in Next-Gen Financial Technology',
  'Industry-Relevant, Job-Ready Curriculum Covering AI, Payments & Digital Banking',
  'Clear Long-Term Career Direction Across Banking, Lending',
  'Expert Mentoring for Faster Success and Hands-on Domain Mastery',
]

const WHAT_IS_FINTECH = `FinTech (Financial Technology) is the integration of innovative technology into financial services to improve, automate, and transform traditional banking, payments, lending, and investment processes. Used across global financial institutions, startups, and tech giants, it drives seamless transactions, risk analytics, and decentralized finance. This intensive course is designed to take students from foundational concepts to advanced practical applications —equipping you to navigate and lead real-world digital transformations across neo-banks, payment gateways, and AI-driven financial services.`

const WHO_CAN_JOIN = [
  'Commerce, Finance, and Computer Science graduates/postgraduates planning a career in modern finance',
  'Finance professionals looking to upskill in AI, Digital Banking, and Payment Systems',
  'Freshers seeking to build a high-growth career in global FinTech ecosystems',
]

const MODULES = [
  {
    num: '01',
    title: 'Foundations & Digital Payments',
    topics: [
      'FinTech ecosystem & regulatory landscape',
      'Digital payments infrastructure (UPI, cards, wallets)',
      'Payment gateways, APIs & BaaS models',
      'Open banking & PSD2 frameworks',
      'Cryptocurrency, stablecoins & CBDCs',
    ],
  },
  {
    num: '02',
    title: 'Digital Banking & AI',
    topics: [
      'Neo-banks & challenger banks business models',
      'AI/ML in credit underwriting & fraud detection',
      'Conversational AI & robo-advisory',
      'Customer analytics & personalization engines',
      'Cloud banking & API-first architecture',
    ],
  },
  {
    num: '03',
    title: 'Lending & InsurTech',
    topics: [
      'Alternative credit scoring & data sources',
      'Digital lending platforms & BNPL models',
      'InsurTech: parametric insurance, embedded insurance',
      'AI-driven claims automation & risk pricing',
      'RegTech for compliance & monitoring',
    ],
  },
  {
    num: '04',
    title: 'Risk Analytics',
    topics: [
      'Financial risk modeling (market, credit, operational)',
      'AI/ML for anomaly detection & stress testing',
      'Portfolio analytics & algorithmic trading basics',
      'ESG & Green FinTech frameworks',
      'Capstone project: end-to-end FinTech solution',
    ],
  },
]

const CAREER_OUTCOMES = [
  'FinTech Product Manager / Analyst',
  'Digital Payments & Transformation Specialist',
  'Financial Risk & AI Analytics Manager',
]

const LEARNING_OUTCOMES = [
  'To be able to understand, explain and apply core financial technology concepts across digital ecosystems',
  'Evaluate and deploy payment gateways, open banking APIs, and BaaS models in real-world scenarios',
  'Analyze alternative credit risk and implement AI-driven automation in lending and insurance',
  'Formulate strategies for emerging trends including Green FinTech, ESG investing, and embedded finance',
]

const FEATURES = [
  { icon: 'fa-solid fa-user-tie', title: 'Industry-expert faculty', body: 'Practitioners from FinTech, banking & AI domains teaching real-world applications.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batch sizes', body: 'Focused cohorts so every student gets personalised feedback on projects.' },
  { icon: 'fa-solid fa-file-circle-check', title: 'Hands-on projects every module', body: 'Build payment flows, credit models, risk dashboards — not just theory.' },
  { icon: 'fa-solid fa-route', title: 'Career support included', body: 'Portfolio reviews, mock interviews & placement assistance for FinTech roles.' },
]

const ELIGIBILITY = [
  'Graduates/postgraduates in Commerce, Finance, Computer Science, Engineering, or related fields',
  'Working professionals in banking, finance, or tech seeking FinTech transition',
  'Final-year students with basic finance/quantitative aptitude',
]

export default function Fintech() {
  useEffect(() => {
    setPageMeta({
      title: 'FinTech Course in Chandigarh | Kizen Education — AI, Payments, Digital Banking',
      description: 'FinTech certification at Kizen Education, Chandigarh. 4-module course covering Digital Payments, AI in Banking, Lending/InsurTech, Risk Analytics. Industry projects, expert mentors, career support. Download brochure.',
    })
  }, [])

  return (
    <>
{/* ============ HERO ============ */}
      <section id="fintech-hero" className="bg-navy text-paper py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <Link to="/courses" className="hover:text-paper">Courses</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">FinTech</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Specialisation · FinTech</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                Build the Future of Finance with <span className="text-gold">FinTech</span>
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
                Master Digital Payments, AI-driven Banking, Lending Tech & Risk Analytics — a job-ready curriculum designed for the next generation of financial technology professionals.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="/brochures/fintech-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gold/90 transition shadow-sm">
                  <i className="fa-solid fa-file-arrow-down"></i> Download Brochure
                </a>
                <a href="#enquiry" className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:border-gold hover:text-gold transition">
                  <i className="fa-solid fa-phone text-gold"></i> Request a Call Back
                </a>
              </div>
              <div className="flex flex-wrap gap-8 text-sm text-paper/60">
                <div className="flex items-center gap-2"><i className="fa-solid fa-calendar-days text-gold"></i> 4 Modules · 12 Weeks</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-users text-gold"></i> Small Batches</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-award text-gold"></i> Certificate on Completion</div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-paper/10 border border-paper/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm sticky top-24">
                <div className="font-serif text-xl lg:text-2xl font-semibold text-paper mb-2">Enquire Now</div>
                <p className="text-paper/60 text-sm mb-6">Get batch timings, fee structure & syllabus breakdown.</p>
                <EnquiryForm variant="courses" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY KIZEN OFFERS FINTECH ============ */}
      <section id="why-kizen" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why Kizen offers FinTech</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">A curriculum built for where finance is going</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_KIZEN.map((item, idx) => (
              <div key={idx} className="bg-ivory border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <span className="font-serif text-3xl font-bold text-ink/20">0{idx + 1}</span>
                <p className="text-sm text-ink/70 leading-relaxed mt-4">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT IS FINTECH ============ */}
      <section id="what-is-fintech" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">What is FinTech?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Technology transforming every layer of financial services</h2>
            </div>
          </div>
          <div className="prose prose-ink max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
            <p>{WHAT_IS_FINTECH}</p>
          </div>
        </div>
      </section>

      {/* ============ WHO CAN JOIN ============ */}
      <section id="who-can-join" className="bg-paper py-20 lg:py-28">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Who can join FinTech at Kizen?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Designed for aspiring FinTech professionals</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {WHO_CAN_JOIN.map((item, idx) => (
              <div key={idx} className="border border-ink/12 rounded-2xl p-6 bg-ivory">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><i className="fa-solid fa-user-check text-gold"></i></div>
                  <span className="font-semibold text-ink">Profile {idx + 1}</span>
                </div>
                <p className="text-sm text-ink/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COURSE STRUCTURE ============ */}
      <section id="course-structure" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">04</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Course Structure</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">4 modules. 12 weeks. Industry-ready.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((mod) => (
              <div key={mod.num} className="bg-paper/5 border border-paper/15 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-serif text-4xl font-bold text-gold/30">{mod.num}</span>
                  <div className="font-serif text-xl font-semibold">{mod.title}</div>
                </div>
                <ul className="space-y-3 text-sm text-paper/70">
                  {mod.topics.map((topic, i) => (
                    <li key={i} className="flex gap-2"><i className="fa-solid fa-circle-check text-gold text-xs mt-1"></i> {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BATCH SCHEDULES & LEARNING MODES ============ */}
      <section id="fintech-schedules" className="bg-paper py-16 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-2">Flexible Timings</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
              Cohort Timings for Students &amp; Banking Professionals
            </h2>
            <p className="text-ink/65 text-sm sm:text-base mt-2">
              Accelerate your financial technology credentials with schedules designed around working hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-ivory border border-ink/10 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Executive Weekend Track</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Weekend Masterclasses</h3>
              <p className="text-sm text-ink/65 leading-relaxed">
                Saturday &amp; Sunday practical case studies in neo-banking, digital lending risk, and API integrations for finance professionals.
              </p>
            </div>

            <div className="bg-ivory border border-ink/10 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Undergraduate Track</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Weekday Evening Hybrid</h3>
              <p className="text-sm text-ink/65 leading-relaxed">
                Designed for B.Com &amp; BBA college students seeking future-ready digital payments and fintech product management skills.
              </p>
            </div>

            <div className="bg-ivory border border-ink/10 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Live Projects</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Mentored Capstone</h3>
              <p className="text-sm text-ink/65 leading-relaxed">
                Build end-to-end payment gateway architectures and credit scoring workflows with 1-on-1 industry mentor guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">05</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why learn FinTech at Kizen?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Practical learning, real outcomes</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-paper border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4"><i className={`${f.icon} text-xl text-gold`}></i></div>
                <div className="font-serif text-lg font-semibold mb-2">{f.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ELIGIBILITY ============ */}
      <section id="eligibility" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">06</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Eligibility</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Who is this programme for?</h2>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-ink/70 max-w-2xl">
            {ELIGIBILITY.map((item) => (
              <li key={item} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-0.5"></i> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CAREER OUTCOMES ============ */}
      <section id="career-outcomes" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">07</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Career Outcomes</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Roles our FinTech graduates step into</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {CAREER_OUTCOMES.map((role, idx) => (
              <div key={idx} className="bg-paper/5 border border-paper/15 rounded-2xl p-6 text-center hover:border-gold/40 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4"><i className="fa-solid fa-briefcase text-2xl text-gold"></i></div>
                <div className="font-serif text-lg font-semibold text-paper">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ============ LEARNING OUTCOMES ============ */}
      <section id="learning-outcomes" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">08</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Learning Outcomes</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">What you'll be able to do after this programme</h2>
            </div>
          </div>
          <ul className="space-y-4 text-base text-ink/70 max-w-3xl">
            {LEARNING_OUTCOMES.map((outcome, idx) => (
              <li key={idx} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-1"></i> {outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ BROCHURE DOWNLOAD CTA ============ */}
      <section id="brochure-cta" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <div className="font-serif text-3xl lg:text-4xl font-medium text-ink mb-4">Want the complete syllabus & fee structure?</div>
          <p className="text-ink/60 text-base lg:text-lg mb-8 max-w-2xl mx-auto">Download the full FinTech brochure with module-wise breakdown, project details, faculty profiles, and batch calendar.</p>
          <a href="/brochures/fintech-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-8 py-4 rounded-full hover:bg-gold/90 transition shadow-sm">
            <i className="fa-solid fa-file-arrow-down"></i> Download FinTech Brochure (PDF)
          </a>
        </div>
      </section>

      {/* ============ ENQUIRY CTA ============ */}
      <section id="enquiry" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-navy rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-gold/5"></div>
            <div className="relative">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Start Your FinTech Journey</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper leading-tight mb-4">Build a Career at the Intersection of Finance & Technology</h2>
              <p className="text-paper/70 text-[15px] leading-relaxed max-w-md">Get a syllabus breakdown, batch timings, and a fee structure customised to your background.</p>
              <div className="flex items-center gap-2 mt-6 text-paper/80 text-sm">
                <i className="fa-solid fa-location-dot text-gold"></i> SCO 193-195, Sector 34-A, Chandigarh
              </div>
            </div>
            <EnquiryForm variant="courses" />
          </div>
        </div>
      </section>
    </>
  )
}