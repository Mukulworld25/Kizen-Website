import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { setPageMeta } from '../utils/seo.js'

const WHY_KIZEN_IFRS = [
  'Globally Recognised Career Path',
  'Industry-Relevant, Job-Ready Curriculum',
  'Clear Long-Term Career Direction',
  'Expert Mentoring for Faster Success',
]
const WHAT_IS_IFRS = "IFRS (International Financial Reporting Standards) is a globally accepted set of accounting rules for preparing financial statements, used in 140+ countries to ensure consistency and transparency in reporting. It qualifies students for financial reporting, audit, and consolidation positions. This certification is designed to take students from foundational concepts to advanced application — equipping you to handle real-world financial reporting challenges faced by listed companies, MNCs, banks, and Big 4 audit engagements."

const WHO_CAN_JOIN_IFRS = [
  'Commerce and finance graduates/postgraduates planning a career in global finance',
  'Finance professionals preparing for overseas job opportunities',
  'Freshers looking to build a career in global finance',
  'MBA/postgraduates with a finance background',
]

const MODULES_IFRS = [
  {
    num: '01',
    title: 'International Sources of Authority',
    topics: [
      'Role of the IASB (International Accounting Standards Board)',
      'The Conceptual Framework',
      'Introduction to the ISSB (International Sustainability Standards Board)',
      'Ethical & professional principles in IFRS reporting',
    ],
  },
  {
    num: '02',
    title: 'Elements of Financial Statements',
    topics: [
      'Revenue Recognition -- IFRS 15',
      'Leases -- IFRS 16',
      'Property, Plant & Equipment -- IAS 16',
      'Intangible Assets -- IAS 38',
      'Impairment of Assets -- IAS 36',
      'Financial Instruments -- IFRS 9',
      'Provisions & Contingent Liabilities -- IAS 37',
      'Foreign Exchange -- IAS 21',
      'Employee Benefits, Taxation & more',
    ],
  },
  {
    num: '03',
    title: 'Presentation of Financial Statements and Additional Disclosures',
    topics: [
      'Presentation of Financial Statements -- IAS 1',
      'Earnings per Share -- IAS 33',
      'Segment Reporting -- IFRS 8',
      'Related Party Disclosures -- IAS 24',
      'Introduction to Sustainability Disclosures -- IFRS S1/S2',
    ],
  },
  {
    num: '04',
    title: 'Preparation of External Financial Reports for Combined Entities, Associates and Joint Arrangements',
    topics: [
      'Consolidated Financial Statements',
      'Business Combinations & Goodwill',
      'Associates & Joint Ventures',
      'Intra-group Adjustments & Elimination Entries',
      'Disposal of a Subsidiary',
    ],
  },
]

const CAREER_OUTCOMES_IFRS = [
  'Public Accountant',
  'Financial Consultant',
  'Financial Planning and Analysis Manager',
]

const LEARNING_OUTCOMES_IFRS = [
  'To be able to understand, explain and apply the IASB\'s conceptual framework for financial reporting',
  'Apply relevant financial reporting standards to key elements of financial reports',
  'Identify and apply disclosure requirements for companies in financial reports and notes',
  'Prepare group financial statements (excluding group cash-flow statements) including subsidiaries, associates and joint arrangements',
]

const FEATURES_IFRS = [
  { icon: 'fa-solid fa-user-tie', title: 'IFRS-qualified faculty', body: 'Mentors with Big 4 and MNC reporting experience teaching practical application.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batch sizes', body: 'Focused cohorts so every student gets personalised feedback on complex standards.' },
  { icon: 'fa-solid fa-file-circle-check', title: 'Case-based learning', body: 'Real company financial statements analysed -- not just textbook examples.' },
  { icon: 'fa-solid fa-route', title: 'Global career support', body: 'Guidance for Big 4, MNC and overseas roles -- CV, interviews, network.' },
]

const ELIGIBILITY_IFRS = [
  'Graduates/postgraduates in Commerce, Finance, Accounting, or related fields',
  'Working professionals in audit, accounting, or finance seeking IFRS expertise',
  'CA/ACCA students or affiliates wanting specialised IFRS certification',
  'Final-year students with strong accounting fundamentals',
]

export default function Ifrs() {
  useEffect(() => {
    setPageMeta({
      title: 'IFRS Certification in Chandigarh | Kizen Education -- Global Financial Reporting',
      description: 'IFRS certification at Kizen Education, Chandigarh. 4-module course covering IASB Framework, Financial Statement Elements, Presentation & Disclosures, Group Reporting. Big 4 faculty, case-based learning, career support. Download brochure.',
    })
  }, [])

  return (
    <>
{/* ============ HERO ============ */}
      <section id="ifrs-hero" className="bg-navy text-paper py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <Link to="/courses" className="hover:text-paper">Courses</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">IFRS</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Specialisation · IFRS</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                Master Global Financial Reporting with <span className="text-gold">IFRS</span>
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
                Gain expertise in International Financial Reporting Standards used across 140+ countries — from IASB framework to consolidated group accounts. The qualification that opens doors to Big 4, MNCs, and global finance roles.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="/brochures/ifrs-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gold/90 transition shadow-sm">
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

      {/* ============ WHY KIZEN OFFERS IFRS ============ */}
      <section id="why-kizen" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why Kizen offers IFRS</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">The global reporting standard — taught locally with depth</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_KIZEN_IFRS.map((item, idx) => (
              <div key={idx} className="bg-ivory border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <span className="font-serif text-3xl font-bold text-ink/20">0{idx + 1}</span>
                <p className="text-sm text-ink/70 leading-relaxed mt-4">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT IS IFRS ============ */}
      <section id="what-is-ifrs" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">What is IFRS?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">One language for global financial reporting</h2>
            </div>
          </div>
          <div className="prose prose-ink max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
            <p>{WHAT_IS_IFRS}</p>
          </div>
        </div>
      </section>

      {/* ============ WHO CAN JOIN ============ */}
      <section id="who-can-join" className="bg-paper py-20 lg:py-28">
<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Who can join IFRS at Kizen?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Built for global finance aspirants</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
            {WHO_CAN_JOIN_IFRS.map((item, idx) => (
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
            {MODULES_IFRS.map((mod) => (
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

      {/* ============ FEATURES ============ */}
      <section id="features" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">05</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why learn IFRS at Kizen?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Practical learning, real outcomes</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_IFRS.map((f) => (
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
            {ELIGIBILITY_IFRS.map((item) => (
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
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Roles our IFRS graduates step into</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {CAREER_OUTCOMES_IFRS.map((role, idx) => (
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
            {LEARNING_OUTCOMES_IFRS.map((outcome, idx) => (
              <li key={idx} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-1"></i> {outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ BROCHURE DOWNLOAD CTA ============ */}
      <section id="brochure-cta" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <div className="font-serif text-3xl lg:text-4xl font-medium text-ink mb-4">Want the complete syllabus & fee structure?</div>
          <p className="text-ink/60 text-base lg:text-lg mb-8 max-w-2xl mx-auto">Download the full IFRS brochure with module-wise breakdown, project details, faculty profiles, and batch calendar.</p>
          <a href="/brochures/ifrs-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-8 py-4 rounded-full hover:bg-gold/90 transition shadow-sm">
            <i className="fa-solid fa-file-arrow-down"></i> Download IFRS Brochure (PDF)
          </a>
        </div>
      </section>

      {/* ============ ENQUIRY CTA ============ */}
      <section id="enquiry" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-navy rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-gold/5"></div>
            <div className="relative">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Start Your IFRS Journey</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper leading-tight mb-4">Master Global Financial Reporting Standards</h2>
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
