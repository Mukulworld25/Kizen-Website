import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'

const PAPERS = [
  { level: 'Level 01', title: 'Applied Knowledge', accent: false, items: ['Business & Technology', 'Management Accounting', 'Financial Accounting'] },
  { level: 'Level 02', title: 'Applied Skills', accent: false, items: ['Corporate & Business Law', 'Performance Management', 'Taxation', 'Audit & Assurance', 'Financial Reporting', 'Financial Management'] },
  { level: 'Level 03', title: 'Strategic Professional', accent: true, items: ['Strategic Business Leader', 'Strategic Business Reporting', 'Choose 2 of 4 Options: AFM, APM, ATX, AAA', 'Ethics & Professional Skills module'] },
]

const FEATURES = [
  { icon: 'fa-solid fa-user-tie', title: 'ACCA-qualified faculty', body: 'Mentors who have cleared ACCA themselves and teach exam technique, not just theory.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batch sizes', body: 'Focused cohorts so every student\'s paper-wise progress is tracked individually.' },
  { icon: 'fa-solid fa-file-circle-check', title: 'Mock exams every cycle', body: 'Timed practice mapped to actual ACCA exam sessions, with detailed feedback.' },
  { icon: 'fa-solid fa-route', title: 'Seamless pathway entry', body: 'Students from Kizen\'s B.Com, BBA, M.Com or MBA batches join with a head start.' },
]

const ELIGIBILITY = [
  '12th pass in any stream (Commerce preferred) with English & Mathematics/Statistics',
  'Graduates from B.Com, BBA, M.Com or MBA — direct entry with exemptions possible',
  'Working professionals seeking a globally valid accounting credential',
]

const INCLUDED = [
  'Complete study material aligned to ACCA syllabus',
  'Weekly doubt-clearing & mentorship sessions',
  'Full-length mock exams before every sitting',
  'Career guidance for global placement opportunities',
]

/* TODO: Replace [ACCA_FEE_PLACEHOLDER] below with actual fee/price when available */
const FEE_NOTE = '[ACCA_FEE_PLACEHOLDER] — Fee structure varies by batch and payment plan. Contact the institute for current pricing.'

export default function Acca() {
  useEffect(() => {
    document.title = 'ACCA Course — Kizen Education'
  }, [])

  return (
    <>
      {/* ============ WHERE ACCA SITS ON THE PATHWAY — paper ============ */}
      <section id="pathway-context" className="bg-paper py-16 lg:py-20 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-6 text-center">Where ACCA Fits</div>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory border border-ink/10 text-sm text-ink/50">11th Commerce</div>
            <i className="fa-solid fa-arrow-right text-ink/20 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory border border-ink/10 text-sm text-ink/50">12th Commerce</div>
            <i className="fa-solid fa-arrow-right text-ink/20 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory border border-ink/10 text-sm text-ink/50">B.Com / BBA</div>
            <i className="fa-solid fa-arrow-right text-ink/20 text-xs"></i>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory border border-ink/10 text-sm text-ink/50">M.Com / MBA</div>
            <i className="fa-solid fa-arrow-right text-ink/20 text-xs"></i>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-paper text-sm font-semibold border-2 border-gold/40"><i className="fa-solid fa-earth-americas text-gold"></i> ACCA</div>
          </div>
        </div>
      </section>

      {/* ============ PAPER STRUCTURE — ivory ============ */}
      <section id="papers" className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-14">
            <div className="lg:col-span-4">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Programme Structure</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight">Three levels. Thirteen papers. One outcome.</h2>
            </div>
            <p className="lg:col-span-8 text-ink/60 text-[15px] leading-relaxed self-end">ACCA is structured in three progressive levels. Kizen takes students through each with dedicated faculty, mock exam cycles, and doubt-clearing sessions mapped to the official exam calendar.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PAPERS.map((p) =>
              p.accent ? (
                <div key={p.level} className="bg-navy text-paper rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-gold/10"></div>
                  <span className="num-tag font-serif text-sm text-gold/70 relative">{p.level}</span>
                  <div className="font-serif text-xl font-semibold mt-2 mb-4 relative">{p.title}</div>
                  <ul className="space-y-2.5 text-sm text-paper/70 relative">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-2"><i className="fa-solid fa-check text-gold mt-1 text-xs"></i> {item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={p.level} className="bg-paper rounded-2xl p-8 border border-ink/10">
                  <span className="num-tag font-serif text-sm text-ink/30">{p.level}</span>
                  <div className="font-serif text-xl font-semibold mt-2 mb-4">{p.title}</div>
                  <ul className="space-y-2.5 text-sm text-ink/60">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-2"><i className="fa-solid fa-check text-gold mt-1 text-xs"></i> {item}</li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ WHY KIZEN FOR ACCA — paper ============ */}
      <section id="why-acca-kizen" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Why Kizen for ACCA</div>
            <h2 className="font-serif text-3xl font-medium leading-tight mb-5">Built by the same institute that taught you commerce fundamentals.</h2>
            <p className="text-ink/60 text-[15px] leading-relaxed">No transition shock, no re-learning basics. Just a continuation of the same academic relationship.</p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div className="flex gap-4" key={f.title}>
                <div className="w-11 h-11 rounded-full bg-ivory border border-ink/10 flex items-center justify-center shrink-0"><i className={`${f.icon} text-gold`}></i></div>
                <div>
                  <div className="font-serif text-lg font-semibold mb-1.5">{f.title}</div>
                  <p className="text-sm text-ink/60 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEE / ELIGIBILITY — ivory ============ */}
      <section id="details" className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10">
          <div className="bg-paper rounded-2xl p-8 lg:p-10 border border-ink/10">
            <div className="font-serif text-2xl font-semibold mb-6">Eligibility</div>
            <ul className="space-y-4 text-sm text-ink/70">
              {ELIGIBILITY.map((item) => (
                <li key={item} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-0.5"></i> {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-navy text-paper rounded-2xl p-8 lg:p-10">
            <div className="font-serif text-2xl font-semibold mb-6">Fee & What's Included</div>
            <ul className="space-y-4 text-sm text-paper/80">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-0.5"></i> {item}</li>
              ))}
            </ul>
            {/* TODO: Replace [ACCA_FEE_PLACEHOLDER] with actual fee data */}
            <p className="mt-6 pt-6 border-t border-paper/15 text-xs text-paper/60">{FEE_NOTE}</p>
          </div>
        </div>
      </section>

      {/* ============ ENQUIRY CTA — paper ============ */}
      <section id="enquiry" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-navy rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-gold/5"></div>
            <div className="relative">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Start Your ACCA Journey</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper leading-tight mb-4">Talk to an ACCA counsellor this week.</h2>
              <p className="text-paper/70 text-[15px] leading-relaxed max-w-md">Get a syllabus breakdown, batch timings, and a fee structure customised to your background.</p>
              <div className="flex items-center gap-2 mt-6 text-paper/80 text-sm">
                <i className="fa-solid fa-location-dot text-gold"></i> SCO 193-195, Sector 34-A, Chandigarh
              </div>
            </div>
            <EnquiryForm variant="acca" />
          </div>
        </div>
      </section>
    </>
  )
}
{/* ============ HERO ============ */}
      <section id="acca-hero" className="bg-navy text-paper py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <Link to="/courses" className="hover:text-paper">Courses</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">ACCA</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Step 05 of the Kizen Pathway · Global</div>
              <h1 className="font-serif text-4xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
                ACCA. The qualification<br />that ends in <span className="italic text-gold">any country.</span>
              </h1>
              <p className="text-paper/70 text-[15px] lg:text-base leading-relaxed max-w-xl">Association of Chartered Certified Accountants — recognised in 180+ countries. At Kizen, it's the natural next step after B.Com, BBA, M.Com or MBA, taught by faculty who've built the entire commerce pathway around it.</p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-4 text-center border-t lg:border-t-0 lg:border-l border-paper/15 pt-8 lg:pt-0 lg:pl-10">
              <div>
                <div className="font-serif text-3xl font-bold text-gold">95%+</div>
                <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Pass Rate</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-gold">13</div>
                <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Papers</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-gold">180+</div>
                <div className="text-[11px] text-paper/60 mt-1 uppercase tracking-wide">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>