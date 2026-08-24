import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow.jsx'
import { setPageMeta } from '../utils/seo.js'

// ---------------------------------------------------------------------------
// RESOURCE HUB — purely factual/educational content about the ACCA
// qualification itself. Every fact is either already published on our own
// pages (180+ countries, 3 levels, 13 papers) or publicly verifiable via
// ACCA's official materials. NO student outcomes, NO invented statistics,
// NO salary figures.
// ---------------------------------------------------------------------------
const ARTICLES = [
  {
    id: 'what-is-acca',
    icon: 'fa-solid fa-earth-americas',
    readTime: '4 min read',
    title: 'What is ACCA?',
    blocks: [
      { type: 'p', text: 'ACCA stands for the Association of Chartered Certified Accountants — a global professional body for accountants headquartered in the United Kingdom. The qualification prepares students for careers in accounting, audit, taxation and financial management, and is recognised in more than 180 countries.' },
      { type: 'p', text: 'The programme is structured in three progressive levels — Applied Knowledge, Applied Skills and Strategic Professional — covering thirteen papers in total, together with an Ethics & Professional Skills module and a practical experience requirement.' },
      { type: 'list', items: [
        'Global mobility: one qualification recognised in 180+ countries',
        'Accessible entry: students can begin after Class 12 with English and Mathematics/Statistics',
        'Progressive structure: concepts build level by level, paper by paper',
        'Exam flexibility: multiple exam sessions are held across the year',
      ] },
      { type: 'p', text: 'Because the syllabus begins from fundamentals, it pairs naturally alongside a commerce degree — which is exactly how the Kizen pathway is designed.' },
    ],
  },
  {
    id: 'acca-vs-ca',
    icon: 'fa-solid fa-scale-balanced',
    readTime: '5 min read',
    title: 'ACCA vs CA — Which is Right for You?',
    blocks: [
      { type: 'p', text: 'Both are respected accounting qualifications — but they are built for different ambitions. Here is an honest, side-by-side look.' },
      { type: 'table',
        head: ['', 'ACCA', 'CA (India — ICAI)'],
        rows: [
          ['Awarding body', 'Association of Chartered Certified Accountants (UK-based, global)', 'Institute of Chartered Accountants of India'],
          ['Recognition', 'Recognised in 180+ countries', 'Statutory recognition within India'],
          ['Structure', 'Thirteen papers across three levels, plus the Ethics & Professional Skills module', 'Foundation, Intermediate and Final levels with a practical training (articleship) period'],
          ['Exam scheduling', 'Multiple exam sessions across the year', 'Examination cycles as scheduled by ICAI'],
          ['Natural fit', 'Students aiming at international careers or global firms', 'Students committed to practice within India\u2019s regulatory framework'],
        ],
      },
      { type: 'p', text: 'There is no universally "better" option — only the right fit for where you want to work. Students targeting global mobility often lean towards ACCA; those certain about Indian practice often choose CA. Many universities let you pursue a B.Com alongside either.' },
      { type: 'p', text: 'If you are unsure, speak to a counsellor — the honest answer depends on your goals, timeline and current stage of study.' },
    ],
  },
  {
    id: 'acca-exam-structure',
    icon: 'fa-solid fa-layer-group',
    readTime: '5 min read',
    title: 'ACCA Exam Structure Explained',
    blocks: [
      { type: 'p', text: 'The ACCA qualification consists of thirteen exams organised across three levels, each building on the last. Here is the complete map.' },
      { type: 'list', items: [
        'Level 01 — Applied Knowledge: Business & Technology, Management Accounting, Financial Accounting (3 papers)',
        'Level 02 — Applied Skills: Corporate & Business Law, Performance Management, Taxation, Audit & Assurance, Financial Reporting, Financial Management (6 papers)',
        'Level 03 — Strategic Professional: Strategic Business Leader and Strategic Business Reporting (essentials), plus two optional papers chosen from AFM, APM, ATX and AAA',
        'Alongside the exams, the Ethics & Professional Skills module completes the qualification\u2019s requirements',
      ] },
      { type: 'p', text: 'All papers are assessed by computer-based exams, and each is scored out of 100 with 50 as the pass mark — the same standard worldwide, wherever you sit the exam.' },
      { type: 'p', text: 'The sequencing is deliberate: foundational knowledge first, applied technique second, and strategic judgement last — mirroring how real finance responsibilities grow over a career.' },
    ],
  },
  {
    id: 'career-paths-after-acca',
    icon: 'fa-solid fa-briefcase',
    readTime: '4 min read',
    title: 'Career Paths After ACCA',
    blocks: [
      { type: 'p', text: 'Because the syllabus spans accounting, audit, tax, law and financial management, the ACCA qualification opens doors across a wide range of finance functions rather than a single track.' },
      { type: 'list', items: [
        'Audit & assurance',
        'Taxation advisory',
        'Financial reporting & compliance',
        'Financial management and analysis',
        'Corporate finance & advisory',
        'Consulting',
      ] },
      { type: 'p', text: 'Qualified members work across Big Four networks, multinational corporations, banks and financial institutions, and home-grown enterprises — in India and abroad.' },
      { type: 'p', text: 'You do not need to fix your destination today: the early papers are common to every path, and specialisation happens naturally at the Strategic Professional level.' },
    ],
  },
]

export default function Resources() {
  useEffect(() => {
    setPageMeta({
      title: 'ACCA Resource Hub — Free Guides | Kizen Education Chandigarh',
      description: 'Free factual guides to the ACCA qualification: what ACCA is, ACCA vs CA, the complete exam structure, and career paths — from Kizen Education, Sector 34-A, Chandigarh.',
    })
  }, [])

  return (
    <>
      {/* ============ HERO + TABLE OF CONTENTS ============ */}
      <section id="resources-hero" className="bg-paper pt-12 pb-10 lg:pt-16 lg:pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%, #FFFDF9 0%, #FAF7EE 50%, #F5EFE0 100%)' }}
        />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <Eyebrow>Resource Hub</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.08] tracking-tight max-w-3xl">
            Understand the ACCA qualification — clearly.
          </h1>
          <p className="text-ink/60 text-base leading-relaxed mt-5 max-w-2xl">
            Straightforward, factual guides for students and parents making an informed choice. No sales pitch — just how the qualification actually works.
          </p>
          <nav aria-label="Guide contents" className="flex flex-wrap gap-2.5 mt-7">
            {ARTICLES.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className="inline-flex items-center gap-2 bg-paper border border-ink/10 hover:border-navy/40 rounded-full px-4 py-2 text-xs font-semibold text-ink/80 transition"
              >
                <i className={`${a.icon} text-gold`}></i> {a.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ============ ARTICLES ============ */}
      {ARTICLES.map((a, i) => (
        <article
          key={a.id}
          id={a.id}
          className={`${i % 2 ? 'bg-ivory' : 'bg-paper'} py-14 lg:py-20 scroll-mt-36 ${i > 0 ? 'border-t border-ink/10' : ''}`}
        >
          <div className="max-w-[820px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <i className={a.icon}></i>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                Guide {String(i + 1).padStart(2, '0')} · {a.readTime}
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight mb-6">{a.title}</h2>
            {a.blocks.map((b, bi) => {
              if (b.type === 'p') {
                return <p key={bi} className="text-ink/70 text-[15px] leading-relaxed mb-4">{b.text}</p>
              }
              if (b.type === 'list') {
                return (
                  <ul key={bi} className="space-y-3 mb-5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] text-ink/70">
                        <i className="fa-solid fa-circle-check text-gold mt-1 text-sm"></i>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              if (b.type === 'table') {
                return (
                  <div key={bi} className="overflow-x-auto rounded-xl border border-ink/10 mb-6 shadow-sm">
                    <table className="w-full text-sm min-w-[560px]">
                      <thead>
                        <tr className="bg-navy text-paper text-left">
                          {b.head.map((h) => (
                            <th key={h || 'col'} className="px-4 py-3 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((r, ri) => (
                          <tr key={ri} className={ri % 2 ? 'bg-ivory' : 'bg-paper'}>
                            {r.map((c, ci) => (
                              <td key={ci} className={`border-t border-ink/10 px-4 py-3 align-top ${ci === 0 ? 'font-semibold text-ink whitespace-nowrap' : 'text-ink/70'}`}>{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              return null
            })}
          </div>
        </article>
      ))}

      {/* ============ CTA BAND ============ */}
      <section className="bg-navy text-paper py-14 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-medium">Still deciding your next step?</h2>
            <p className="text-paper/70 text-sm mt-2 max-w-md">Our counsellors map the right starting point for your background — free of charge.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/courses" className="inline-flex items-center justify-center gap-2 border border-paper/25 text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:border-paper transition">
              Explore Programmes
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-paper transition">
              Book Free Counselling
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}