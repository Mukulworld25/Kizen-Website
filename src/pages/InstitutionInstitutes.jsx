import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../utils/seo.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

const PATHWAYS = [
  {
    title: 'AI Job Ready Program',
    tag: 'For Institutes & Career Centres',
    desc: 'Build AI Skills. Apply AI. Become Career-Ready. Two practical pathways — AI Career Track for students, graduates and career starters, and AI for Work for working professionals.',
    points: ['Machine Learning, Deep Learning, Generative AI, LLMs, automation & deployment', 'Portfolio projects, GitHub documentation, resume & mock interviews', '8–12 week Career Track (8-week core + optional 12-week format) · 5-week / 20-hour AI for Work'],
    pdf: './brochures/ai-jobready-brochure.pdf',
    pdfLabel: 'AI Job Ready Brochure (PDF)',
  },
  {
    title: 'AI for Corporate',
    tag: 'For Corporate & Workforce Training',
    desc: 'Practical AI upskilling for working professionals — apply AI to productivity, automation, analysis and decision-making in real workplace workflows.',
    points: ['AI productivity tools, work automation & AI data analysis', 'Communication, strategy & domain-specific custom assistants', 'Real-work capstone with measurable time-saving outcomes'],
    pdf: './brochures/ai-corporate-brochure.pdf',
    pdfLabel: 'AI for Corporate Brochure (PDF)',
  },
]

const MODULES = [
  { num: '01', title: 'AI Foundations & Tools', topics: ['AI & GenAI Fundamentals', 'AI Tools & Prompting', 'Data & AI Workflows', 'Privacy & Responsible Use', 'Practical AI Applications'] },
  { num: '02', title: 'AI Career Track', topics: ['Machine Learning & Data', 'Deep Learning & Computer Vision', 'NLP & Transformers', 'RAG & LLMs', 'Fine-Tuning, Deployment & MLOps'] },
  { num: '03', title: 'AI for Work', topics: ['AI Productivity', 'Work Automation', 'AI Data Analysis', 'Communication & Strategy', 'Domain AI & Custom Assistants'] },
  { num: '04', title: 'Projects & Career', topics: ['Portfolio Projects', 'Real Work Capstone', 'GitHub & Documentation', 'Resume & LinkedIn', 'Mock Interviews & Career Guidance'] },
]

const CAREER_OUTCOMES = [
  'AI / Machine Learning Engineer',
  'Data Scientist / AI Analyst',
  'Generative AI / LLM Engineer',
  'AI-Powered Professional / Automation Specialist',
]

export default function InstitutionInstitutes() {
  useEffect(() => {
    setPageMeta({
      title: 'AI Training for Institutes | Kizen Education — AI Job Ready & Corporate AI Programmes',
      description: 'Kizen Education partners with institutes and corporates to deliver the AI Job Ready Program and AI for Corporate training: GenAI, ML, automation, deployment and career preparation with real capstone projects.',
      keywords: 'AI Training Institute Chandigarh, Corporate AI Training, AI Job Ready Program, AI for Work, Institute Partnership Kizen Education',
      canonicalUrl: 'https://kizeneducation.com/institutions/institutes',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Course',
            'name': 'AI Job Ready Program',
            'description': 'Two practical pathways — AI Career Track (8–12 weeks) and AI for Work (5 weeks) — across Machine Learning, Deep Learning, Generative AI, LLMs, automation and deployment with portfolio projects and career preparation.',
            'provider': { '@type': 'EducationalOrganization', 'name': 'Kizen Education', 'url': 'https://kizeneducation.com' },
            'hasCourseInstance': {
              '@type': 'CourseInstance',
              'courseMode': ['in-person', 'blended'],
              'location': 'SCO 193-195, Sector 34-A, Chandigarh',
            },
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://kizeneducation.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Institutions', 'item': 'https://kizeneducation.com/institutions/institutes' },
              { '@type': 'ListItem', 'position': 3, 'name': 'Institutes', 'item': 'https://kizeneducation.com/institutions/institutes' },
            ],
          },
        ],
      },
    })
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-navy text-paper py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">Institutions</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">Institutes</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Institutions · Institutes</div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">
                AI Job Ready &amp; AI for Corporate
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                Build AI Skills. Apply AI. Become Career-Ready. Kizen partners with institutes and corporates to run
                practical AI programmes — from foundations to deployed projects, workplace automation and career
                preparation.
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-paper/70">
                <div className="flex items-center gap-2"><i className="fa-solid fa-route text-gold"></i> AI Career Track &amp; AI for Work</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-clock text-gold"></i> 8–12 Week &amp; 5-Week Formats</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-briefcase text-gold"></i> Real Work Capstone</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-award text-gold"></i> Certification</div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-paper/10 border border-paper/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                <div className="font-serif text-xl lg:text-2xl font-semibold text-paper mb-2">Run AI At Your Institute</div>
                <p className="text-paper/60 text-sm mb-6">Get the full programme structure &amp; partnership details.</p>
                <EnquiryForm variant="courses" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CHOOSE YOUR PATH ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Choose Your AI Path</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Two programmes, one practical approach</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {PATHWAYS.map((p) => (
              <div key={p.title} className="bg-ivory border border-ink/10 rounded-2xl p-8 hover:border-gold/40 transition-all flex flex-col">
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-2">{p.tag}</div>
                <h3 className="font-serif text-2xl font-bold text-ink mb-3">{p.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-3 text-sm text-ink/70 mb-8">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex gap-2"><i className="fa-solid fa-circle-check text-gold text-xs mt-1"></i> {pt}</li>
                  ))}
                </ul>
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2.5 self-start bg-navy text-paper font-semibold text-sm px-6 py-3 rounded-full hover:bg-ink transition shadow-sm"
                >
                  <i className="fa-solid fa-download text-gold"></i> {p.pdfLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COURSE STRUCTURE ============ */}
      <section className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Course Structure</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Learn → Build → Apply → Deploy → Get Career-Ready</h2>
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

      {/* ============ OUTCOMES + PROGRAMME VALUE ============ */}
      <section className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Career Outcomes</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-6">Where these programmes lead</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {CAREER_OUTCOMES.map((item, i) => (
                <div key={i} className="flex gap-2.5 text-ink/75 text-sm leading-relaxed">
                  <i className="fa-solid fa-briefcase text-gold mt-0.5"></i> {item}
                </div>
              ))}
            </div>
            <div className="border-t border-ink/10 pt-6">
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-3">Programme Value</div>
              <p className="text-sm text-ink/65 leading-relaxed">
                Live instruction · Guided labs · Mentorship · Projects · Career preparation. AI Career Track: multi-project
                GitHub portfolio + production AI capstone. AI for Work: reusable AI workflows + real-work capstone with
                practical time-saving outcomes. Certificates recognise successful programme completion.
              </p>
            </div>
          </div>
          <div className="bg-ivory border border-ink/10 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-file-pdf"></i>
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">Institute Partnership Brochures</h3>
            <p className="text-sm text-ink/65 leading-relaxed mb-6">
              Download the full AI Job Ready and AI for Corporate programme structures, module breakdowns and outcomes.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="./brochures/ai-jobready-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start bg-navy text-paper font-semibold text-sm px-6 py-3 rounded-full hover:bg-ink transition shadow-sm"
              >
                <i className="fa-solid fa-download text-gold"></i> AI Job Ready Brochure (PDF)
              </a>
              <a
                href="./brochures/ai-corporate-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start border border-navy text-navy font-semibold text-sm px-6 py-3 rounded-full hover:bg-gold/15 transition"
              >
                <i className="fa-solid fa-download text-gold"></i> AI for Corporate Brochure (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



