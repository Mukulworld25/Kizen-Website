import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../utils/seo.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

const WHY_KIZEN = [
  'Build practical data science skills through real-world projects and guided mentorship.',
  'Combine data science, AI and deployment into an end-to-end learning experience.',
  'Gain industry exposure through project execution, documentation and presentation.',
  'Develop a portfolio and professional readiness through hands-on capstone work.',
]

const WHO_CAN_JOIN = [
  'Final-year students, pre-final-year students and recent graduates from BCA, B.Sc, B.Tech and MCA.',
  'Learners interested in Data Science, AI, analytics and real-world problem solving.',
  'Students with basic programming knowledge (Python preferred) who want project and industry exposure.',
]

const MODULES = [
  { num: '01', title: 'Data Foundations', topics: ['Business Problem Understanding', 'Python & SQL', 'Data Cleaning & Transformation', 'EDA & Visualization', 'Statistics & Hypothesis Testing'] },
  { num: '02', title: 'Machine Learning', topics: ['Regression & Classification', 'Linear, Logistic & Tree Models', 'Random Forest & XGBoost', 'Model Evaluation', 'Hyperparameter Tuning'] },
  { num: '03', title: 'AI & Big Data', topics: ['Deep Learning', 'CNN / RNN', 'NLP & Transformers', 'Generative AI for Data Tasks', 'Big Data Basics', 'Power BI / Tableau', 'Streamlit / APIs'] },
  { num: '04', title: 'Capstone & Deployment', topics: ['Industry Project Execution', 'Documentation & Presentation', 'Portfolio & Career Readiness'] },
]

const CAREER_OUTCOMES = [
  'Data Scientist / Data Analyst',
  'Machine Learning / AI Engineer',
  'Business / Data Intelligence Professional',
  'AI & Analytics Project Professional',
]

const LEARNING_OUTCOMES = [
  'Analyse, clean and visualise real-world datasets.',
  'Build and evaluate machine learning and AI models.',
  'Develop dashboards and deploy practical solutions.',
  'Create a portfolio-ready industry capstone with professional documentation.',
]

export default function InstitutionColleges() {
  useEffect(() => {
    setPageMeta({
      title: 'AI Capstone Internship for Colleges | Kizen Education — Data Science with AI Program',
      description: 'Kizen Education partners with colleges to deliver the Data Science with AI Capstone Program: industrial internship with Python, ML, deep learning, Generative AI, deployment and an industry-style capstone with live mentorship.',
      keywords: 'AI Capstone Internship Colleges, Data Science Program Chandigarh, Industrial Internship AI, College Industry Partnership, Kizen Education Colleges',
      canonicalUrl: 'https://kizeneducation.com/institutions/colleges',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Course',
            'name': 'Data Science with AI | Capstone Program',
            'description': 'Industrial internship + data science project experience combining Python, statistics, machine learning, deep learning, Generative AI, deployment and an industry-style capstone with live mentorship.',
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
              { '@type': 'ListItem', 'position': 2, 'name': 'Institutions', 'item': 'https://kizeneducation.com/institutions/colleges' },
              { '@type': 'ListItem', 'position': 3, 'name': 'Colleges', 'item': 'https://kizeneducation.com/institutions/colleges' },
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
            <span className="text-gold">Colleges</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Institutions · Colleges</div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">
                Data Science with AI | Capstone Program
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                Industrial Internship + Data Science Project Experience — a project-driven programme that takes college
                students from Python foundations to a deployed, portfolio-ready AI capstone with live mentorship.
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-paper/70">
                <div className="flex items-center gap-2"><i className="fa-solid fa-graduation-cap text-gold"></i> BCA · B.Sc · B.Tech · MCA</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-briefcase text-gold"></i> Industrial Internship</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-diagram-project text-gold"></i> End-to-End Capstone</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-award text-gold"></i> Industry Training Certificate</div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-paper/10 border border-paper/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                <div className="font-serif text-xl lg:text-2xl font-semibold text-paper mb-2">Partner With Kizen</div>
                <p className="text-paper/60 text-sm mb-6">Bring the AI capstone internship to your campus.</p>
                <EnquiryForm variant="courses" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY KIZEN ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why Kizen offers Data Science with AI Capstone</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Real projects, real mentorship, real readiness</h2>
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

      {/* ============ WHAT IS IT ============ */}
      <section className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">What is the Capstone Program?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">From data foundations to deployed AI</h2>
            </div>
          </div>
          <div className="prose prose-ink max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
            <p>
              A project-driven programme designed to help learners become job-ready data science professionals. It
              combines Python, data handling, statistics, machine learning, deep learning, Generative AI, deployment
              and a final industry-style capstone with live mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHO CAN JOIN ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Who can join?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Built for final-years, graduates &amp; campus cohorts</h2>
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
      <section className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">04</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Course Structure</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Four stages to a portfolio-ready capstone</h2>
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
            <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Career &amp; Learning Outcomes</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-6">Where the capstone takes students</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {CAREER_OUTCOMES.map((item, i) => (
                <div key={i} className="flex gap-2.5 text-ink/75 text-sm leading-relaxed">
                  <i className="fa-solid fa-briefcase text-gold mt-0.5"></i> {item}
                </div>
              ))}
            </div>
            <ul className="space-y-4 max-w-xl">
              {LEARNING_OUTCOMES.map((item, i) => (
                <li key={i} className="flex gap-3 text-ink/75 leading-relaxed">
                  <i className="fa-solid fa-circle-check text-gold mt-1"></i> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ivory border border-ink/10 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-file-pdf"></i>
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">AI Capstone Internship Brochure</h3>
            <p className="text-sm text-ink/65 leading-relaxed mb-6">
              Full programme structure, module breakdown and outcomes — ready to share with your placement or academic cell.
            </p>
            <a
              href="./brochures/ai-capstone-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-navy text-paper font-semibold text-sm px-6 py-3 rounded-full hover:bg-ink transition shadow-sm"
            >
              <i className="fa-solid fa-download text-gold"></i> View / Download Brochure (PDF)
            </a>
            <div className="mt-8 border-t border-ink/10 pt-6">
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-3">Programme Value</div>
              <p className="text-sm text-ink/65 leading-relaxed">
                Real Industry Projects · Live Mentorship · End-to-End Project Experience · GitHub Portfolio · Industry
                Training Certificate · Professional Network &amp; References · Career Support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



