import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { setPageMeta } from '../utils/seo.js'

const WHY_KIZEN_AI = [
  'Hands-on Lab Access with Real-World Datasets',
  'Project-First Curriculum Built by Practising AI Engineers',
  'Clear Bridge from Theory to Industry-Ready Tools',
  'Placement Support into High-Growth AI-Finance Roles',
]

const AI_PATHWAYS = [
  {
    title: 'AI Job Ready Programme',
    desc: 'Intensive 16-week track into machine learning for trading, fraud detection, credit scoring and robo-advisory — for graduates and working professionals.',
    icon: 'fa-solid fa-rocket',
    brochure: '/brochures/ai-jobready-brochure.pdf',
    label: 'Full Programme',
    labelColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    title: 'AI Capstone Project',
    desc: 'A project-first track — pick a real finance problem, build and deploy an end-to-end model, and present to industry mentors for certification.',
    icon: 'fa-solid fa-chess-piece',
    brochure: '/brochures/ai-capstone-brochure.pdf',
    label: 'Capstone',
    labelColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'AI for School Learning',
    desc: 'Early computational thinking and applied AI for Class 11 & 12 commerce students and early B.Com learners.',
    icon: 'fa-solid fa-school',
    brochure: '/brochures/ai-school-brochure.pdf',
    label: 'School',
    labelColor: 'bg-violet-100 text-violet-700',
  },
]

const WHAT_IS_AI = `Artificial Intelligence in Finance refers to the application of machine learning, deep learning, natural language processing, and data science to financial services — automating risk models, powering algorithmic trading, detecting fraud, personalising wealth advice, and transforming traditional banking workflows. This practical programme is designed to take students from foundational statistics and programming to advanced deployment of AI systems that real fintechs, banks, and hedge funds use daily.`

const WHO_CAN_JOIN_AI = [
  'Commerce, Finance, Economics, and Computer Science graduates/postgraduates planning a career in AI-driven finance',
  'Finance and analytics professionals looking to upskill in machine learning, Python, and model deployment',
  'Programmers and data analysts transitioning into quantitative finance roles',
  'MBA/postgraduates with a background in finance, economics, or engineering',
]

const MODULES_AI = [
  {
    num: '01',
    title: 'Foundations — Python, Statistics & Finance',
    topics: [
      'Python for finance (NumPy, Pandas, Matplotlib)',
      'Statistical inference & hypothesis testing',
      'Financial time-series analysis & forecasting',
      'Intro to ML libraries (scikit-learn, XGBoost)',
      'Data cleaning & feature engineering for financial datasets',
    ],
  },

  {
    num: '02',
    title: 'Machine Learning for Finance',
    topics: [
      'Supervised learning — credit scoring & loan default prediction',
      'Unsupervised learning — customer segmentation & anomaly detection',
      'Reinforcement learning — algorithmic trading & portfolio optimisation',
      'NLP for financial sentiment & earnings call analysis',
      'Time-series forecasting — ARIMA, LSTM, Prophet',
    ],
  },
  {
    num: '03',
    title: 'Deep Learning & Advanced Applications',
    topics: [
      'Neural networks & deep learning fundamentals (TensorFlow/Keras)',
      'Deep learning for fraud detection & AML',
      'Transformer models for financial text & news sentiment',
      'Computer vision in banking — document processing & KYC',
      'Model explainability & interpretability (SHAP, LIME)',
    ],
  },
  {
    num: '04',
    title: 'Deployment & Capstone Project',
    topics: [
      'Model deployment & MLOps (Flask, Docker, FastAPI)',
      'Risk management & model governance',
      'Regulatory compliance & ethical AI in finance',
      'Capstone: end-to-end AI solution for a real finance problem',
      'Portfolio & presentation to industry mentors',
    ],
  },
]

const CAREER_OUTCOMES_AI = [
  'AI/Machine Learning Engineer - FinTech',
  'Quantitative Analyst & Data Scientist',
  'Financial Risk & Fraud Analytics Specialist',
]

const LEARNING_OUTCOMES_AI = [
  'Build and deploy machine learning models for credit scoring, fraud detection, and algorithmic trading using real financial datasets',
  'Apply deep learning techniques (LSTM, transformers) for time-series forecasting and financial text analysis',
  'Implement MLOps pipelines with proper model validation, explainability, and regulatory compliance',
  'Deliver an industry-grade capstone project solving a real finance problem, reviewed by practising AI engineers',
]

const FEATURES_AI = [
  { icon: 'fa-solid fa-laptop-code', title: 'Hands-on Python labs', body: '100+ hours of guided coding - not just theory. Build real models from day one.' },
  { icon: 'fa-solid fa-users-rectangle', title: 'Small batch sizes', body: 'Focused cohorts so every student gets personalised feedback on complex algorithms.' },
  { icon: 'fa-solid fa-chess-knight', title: 'Industry projects', body: 'Work on live datasets from fintechs, banks, and hedge funds - real problems, real impact.' },
  { icon: 'fa-solid fa-briefcase', title: 'Career mentorship', body: 'Guidance from practising AI engineers and quant researchers for placement and portfolio building.' },
]

const ELIGIBILITY_AI = [
  'Graduates/postgraduates in Commerce, Finance, Computer Science, Economics, Mathematics, or Engineering',
  'Finance professionals seeking to add AI/ML skills to their toolkit',
  'Programmers and data analysts transitioning into quantitative finance',
  'MBA or postgraduates with a background in finance, economics, or engineering',
]

export default function AiProgrammes() {
  useEffect(() => {
    setPageMeta({
      title: 'AI in Finance Programme in Chandigarh | Kizen Education - Machine Learning & Deep Learning',
      description: 'AI in Finance programme at Kizen Education, Chandigarh. 4-module course covering Python, ML for finance, deep learning, fraud detection, algorithmic trading, NLP & model deployment. Hands-on labs, capstone project, career mentorship from AI engineers.',
    })
  }, [])

  return (
    <>
      {/* HERO */}
      <section id="ai-hero" className="bg-navy text-paper py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <Link to="/courses" className="hover:text-paper">Courses</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">AI in Finance</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Future Skill · AI in Finance</div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-6">
                Master <span className="text-gold">AI in Finance</span> — From Python to Production Models
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed max-w-2xl mb-10">
                Build machine learning and deep learning models for algorithmic trading, fraud detection, credit scoring, and robo-advisory. 4-module programme with hands-on Python labs, real finance datasets, and an industry capstone.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="/brochures/ai-jobready-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gold/90 transition shadow-sm">
                  <i className="fa-solid fa-file-arrow-down"></i> Download Brochure
                </a>
                <a href="#enquiry" className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:border-gold hover:text-gold transition">
                  <i className="fa-solid fa-phone text-gold"></i> Request a Call Back
                </a>
              </div>
              <div className="flex flex-wrap gap-8 text-sm text-paper/60">
                <div className="flex items-center gap-2"><i className="fa-solid fa-calendar-days text-gold"></i> 4 Modules · 16 Weeks</div>
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

      {/* WHY KIZEN OFFERS AI */}
      <section id="why-kizen-ai" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why Kizen offers AI in Finance</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Preparing the next generation of finance technologists</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_KIZEN_AI.map((item, idx) => (
              <div key={idx} className="bg-ivory border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <span className="font-serif text-3xl font-bold text-ink/20">0{idx + 1}</span>
                <p className="text-sm text-ink/70 leading-relaxed mt-4">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS AI */}
      <section id="what-is-ai" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">What is AI in Finance?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">One technology, multiple financial futures</h2>
            </div>
          </div>
          <div className="prose prose-ink max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
            <p>{WHAT_IS_AI}</p>
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section id="who-can-join-ai" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Who can join AI in Finance?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Built for the finance-tech generation</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
            {WHO_CAN_JOIN_AI.map((item, idx) => (
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

      {/* COURSE STRUCTURE */}
      <section id="ai-course-structure" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">04</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Course Structure</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">4 modules. 16 weeks. From Python to Production.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES_AI.map((mod) => (
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

      {/* FEATURES */}
      <section id="ai-features" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">05</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why learn AI at Kizen?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Practical learning, real outcomes</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_AI.map((f) => (
              <div key={f.title} className="bg-paper border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4"><i className={`${f.icon} text-xl text-gold`}></i></div>
                <div className="font-serif text-lg font-semibold mb-2">{f.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
            </section>

      {/* AI PATHWAY CHOICE */}
      <section id="ai-pathways" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Choose your pathway</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-4">One AI programme, three ways in</h2>
            <p className="text-ink/60 text-lg">Job-ready, capstone-first, or school-level — pick the variant that matches where you are today. Each pathway has its own detailed brochure.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {AI_PATHWAYS.map((p) => (
              <div key={p.title} className="border border-ink/12 rounded-2xl p-8 bg-paper shadow-sm hover:border-gold/40 hover:shadow-md transition-all text-center flex flex-col">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4"><i className={`${p.icon} text-2xl text-gold`}></i></div>
                <span className={`text-xs font-bold uppercase tracking-[0.15em] mb-3 px-3 py-1 rounded-full ${p.labelColor}`}>{p.label}</span>
                <div className="font-serif text-xl font-semibold mb-3 flex-1">{p.title}</div>
                <p className="text-sm text-ink/60 leading-relaxed mb-6 flex-1">{p.desc}</p>
                <a href={p.brochure} download className="mt-auto inline-flex items-center justify-center gap-2 bg-navy text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-ink transition">
                  <i className="fa-solid fa-file-arrow-down"></i> Download {p.label} Brochure
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="ai-eligibility" className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">06</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Eligibility</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Who is this programme for?</h2>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-ink/70 max-w-2xl">
            {ELIGIBILITY_AI.map((item) => (
              <li key={item} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-0.5"></i> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAREER OUTCOMES */}
      <section id="ai-career-outcomes" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/5"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">07</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Career Outcomes</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Roles our AI graduates step into</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {CAREER_OUTCOMES_AI.map((role, idx) => (
              <div key={idx} className="bg-paper/5 border border-paper/15 rounded-2xl p-6 text-center hover:border-gold/40 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4"><i className="fa-solid fa-briefcase text-2xl text-gold"></i></div>
                <div className="font-serif text-lg font-semibold text-paper">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING OUTCOMES */}
      <section id="ai-learning-outcomes" className="bg-ivory py-20 lg:py-28 border-t border-ink/10 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">08</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Learning Outcomes</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">What you'll be able to do after this programme</h2>
            </div>
          </div>
          <ul className="space-y-4 text-base text-ink/70 max-w-3xl">
            {LEARNING_OUTCOMES_AI.map((outcome, idx) => (
              <li key={idx} className="flex gap-3"><i className="fa-solid fa-circle-check text-gold mt-1"></i> {outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* BROCHURE DOWNLOAD CTA */}
      <section id="ai-brochure-cta" className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <div className="font-serif text-3xl lg:text-4xl font-medium text-ink mb-4">Want the complete syllabus & fee structure?</div>
          <p className="text-ink/60 text-base lg:text-lg mb-8 max-w-2xl mx-auto">Download the full AI in Finance brochure with module-wise breakdown, project details, faculty profiles, and batch calendar.</p>
          <a href="/brochures/ai-capstone-brochure.pdf" download className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm px-8 py-4 rounded-full hover:bg-gold/90 transition shadow-sm">
            <i className="fa-solid fa-file-arrow-down"></i> Download AI in Finance Brochure (PDF)
          </a>
        </div>
      </section>

      {/* ENQUIRY CTA */}
      <section id="enquiry" className="bg-paper py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-navy rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-gold/5"></div>
            <div className="relative">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Start Your AI Journey</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper leading-tight mb-4">Master AI in Financial Services</h2>
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