import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../utils/seo.js'
import EnquiryForm from '../components/EnquiryForm.jsx'
import Eyebrow from '../components/Eyebrow.jsx'

const PROGRAMME_SNAPSHOT = [
  { icon: 'fa-solid fa-users', title: 'Target Audience', desc: 'Working professionals, team leads, managers & cross-functional corporate teams from any domain.' },
  { icon: 'fa-solid fa-laptop-code', title: 'Prerequisites', desc: 'Basic computer & spreadsheet knowledge. Zero coding required — built for practical workplace application.' },
  { icon: 'fa-solid fa-chalkboard-user', title: 'Delivery Modes', desc: 'Offline at Sector 34-A Chandigarh campus, Live Interactive Online, or In-House at your corporate office.' },
  { icon: 'fa-solid fa-arrows-split-up-and-left', title: 'Training Approach', desc: 'Demonstration → Guided Practice → Direct Workplace Application with real departmental data.' },
  { icon: 'fa-solid fa-rocket', title: 'Final Output', desc: 'Capstone Showcase: an automated workplace workflow delivering measured hours saved and operational ROI.' },
  { icon: 'fa-solid fa-award', title: 'Certification', desc: 'AI for Corporate World Certificate recognising practical hands-on execution and capstone completion.' },
]

const BATCH_MODELS = [
  {
    icon: 'fa-solid fa-user-tie',
    title: 'Individual Professionals',
    badge: 'Open Cohort',
    desc: 'Evening and weekend batches for executives looking to future-proof their skills, automate manual routines, and stand out in their industry.',
  },
  {
    icon: 'fa-solid fa-people-group',
    title: 'Departmental Teams',
    badge: 'Custom Workflows',
    desc: 'Cohorts tailored specifically for Finance, HR, Marketing, Operations, or Sales teams solving everyday bottlenecks with shared prompt systems.',
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Executive Weekend Track',
    badge: '2 Days / Week',
    desc: 'Intensive 2-hour Saturday and Sunday sessions designed specifically around full-time corporate working schedules without workday disruption.',
  },
  {
    icon: 'fa-solid fa-building-circle-check',
    title: 'Corporate In-House Batches',
    badge: 'Enterprise On-Site',
    desc: 'Custom on-premise training conducted at your office, aligned to internal compliance guidelines, enterprise tools, and data privacy policies.',
  },
]

const DESIGN_PRINCIPLES = [
  { num: '01', title: 'Understand AI', desc: 'Grasp LLM logic, capabilities and corporate boundaries without technical jargon.' },
  { num: '02', title: 'Master AI Tools', desc: 'Command industry-standard engines: ChatGPT, Claude, Gemini, Copilot & Perplexity.' },
  { num: '03', title: 'Automate Daily Work', desc: 'Eliminate repetitive email, data entry and document assembly tasks with no-code triggers.' },
  { num: '04', title: 'Analyse with AI', desc: 'Turn messy spreadsheets and operational records into executive summaries and trend charts.' },
  { num: '05', title: 'Communicate with AI', desc: 'Draft polished board memos, client proposals and high-impact presentation decks in minutes.' },
  { num: '06', title: 'Make Better Decisions', desc: 'Simulate business scenarios, stress-test objections and conduct automated competitor intel.' },
  { num: '07', title: 'Apply AI to Your Role', desc: 'Build proprietary Custom GPTs and Gems with your department\'s exact templates and guidelines.' },
  { num: '08', title: 'Build a Real Work Capstone', desc: 'Deliver an automated workplace project that measurably saves hours every single week.' },
]

const WEEKS_CURRICULUM = [
  {
    week: '01',
    title: 'AI Fundamentals + Daily AI Tools',
    topics: [
      'What is AI & GenAI; real-world corporate use cases & landscape',
      'Corporate data privacy, governance, security & IP protection',
      'Hands-on with ChatGPT, Gemini, Copilot, Claude, Perplexity & Notion AI',
      'Structured Prompting Framework: Context, Persona, Constraints & Format',
      'Real-time competitive and industry intelligence using Perplexity AI',
    ],
    deliverable: 'Personal AI Opportunity Audit + Prompt Library with 15+ custom templates',
    icon: 'fa-solid fa-wand-magic-sparkles',
  },
  {
    week: '02',
    title: 'Daily Work Automation',
    topics: [
      'Email, document and administrative workflow automation',
      'AI in Excel & Google Sheets: formula generation, regex & Python in Excel',
      'No-code workflow automation with Zapier and Make.com',
      'Generate formulas, lookup scripts and automated data validation rules',
      'Build a 3-step pipeline: incoming emails → structured tracking sheets → alerts',
    ],
    deliverable: 'Automated Lead / Task Pipeline via Zapier / Make',
    icon: 'fa-solid fa-gears',
  },
  {
    week: '03',
    title: 'Data Analysis + Executive Communication',
    topics: [
      'Advanced Data Analysis (Code Interpreter) for rapid business insights',
      'Automated trend detection, variance commentary & executive summaries',
      'Audio meeting transcription & action items using Otter.ai / Fireflies.ai',
      'AI presentation workflows with Gamma App, Tome & Canva AI',
      'Sentiment analysis and topic categorisation on client feedback datasets',
    ],
    deliverable: '1-Page AI Executive Data Report + Executive Communications Suite (pitch deck, action summary, memo)',
    icon: 'fa-solid fa-chart-pie',
  },
  {
    week: '04',
    title: 'Decision Making + Domain AI',
    topics: [
      'Market research, competitive intelligence & SWOT scenario modelling',
      'Automated web research agents for vendor and market benchmarking',
      'Simulate customer objections, negotiations and risk scenarios via custom personas',
      'Build role-specific Custom GPTs / Gems with specialized internal knowledge files',
      'Department-specific applications: Finance, HR, Operations, Sales, Marketing',
    ],
    deliverable: 'Strategic Market Analysis Deck + Custom Domain Assistant',
    icon: 'fa-solid fa-brain',
  },
  {
    week: '05',
    title: 'Real Work Capstone',
    topics: [
      'End-to-end workplace task automation & personal workflow integration',
      'Integrate custom prompts, spreadsheets and automated webhooks into one system',
      'Peer review, workflow stress-testing and iterative refinement',
      'Quantify and present concrete time savings & operational ROI',
      'Live execution and demonstration of working automated project',
    ],
    deliverable: 'Final Capstone Showcase — live execution of an automated workplace project',
    icon: 'fa-solid fa-trophy',
  },
]

const TOOLING_ECOSYSTEM = [
  { category: 'LLM Engines', tools: 'ChatGPT, Claude, Gemini, Copilot', application: 'Drafting, writing, spreadsheet code, reasoning & strategy', level: 'Beginner → Intermediate' },
  { category: 'Web Research', tools: 'Perplexity AI, Consensus', application: 'Real-time industry intelligence, verified sources & citations', level: 'Beginner' },
  { category: 'Workflow Automation', tools: 'Zapier, Make.com', application: 'Multi-app triggers: Email → Sheets → CRM → Slack alerts', level: 'Intermediate' },
  { category: 'Data & Spreadsheets', tools: 'Advanced Data Analysis, Rows, Formula Bot', application: 'Data cleaning, automated charting, formula generation & forecasting', level: 'Beginner → Intermediate' },
  { category: 'Visuals & Decks', tools: 'Canva AI, Gamma.app, DALL-E 3', application: 'Executive slide decks, infographics & visual assets', level: 'Beginner' },
  { category: 'Meeting Assistants', tools: 'Otter.ai, Fireflies.ai', application: 'Live transcription, key decision extraction & action items', level: 'Beginner' },
]

const ROLE_APPLICATIONS = [
  {
    role: 'Finance & Accounts',
    icon: 'fa-solid fa-calculator',
    desc: 'Financial statement commentary, variance analysis, automated invoice extraction, budget sensitivity prompts, and MIS summary generation.',
  },
  {
    role: 'HR & Talent Acquisition',
    icon: 'fa-solid fa-user-group',
    desc: 'Drafting job descriptions, interview rubric design, automated onboarding FAQ bots, policy search assistants, and candidate email pipelines.',
  },
  {
    role: 'Sales & Business Development',
    icon: 'fa-solid fa-chart-line',
    desc: 'Lead scoring rubrics, client objection handling simulators, hyper-personalized outreach sequences, and proposal & RFP response drafting.',
  },
  {
    role: 'Marketing & Communications',
    icon: 'fa-solid fa-bullhorn',
    desc: 'Campaign brainstorming, SEO content drafting, multi-platform ad variations, audience persona modeling, and monthly editorial calendars.',
  },
  {
    role: 'Operations & Procurement',
    icon: 'fa-solid fa-dolly',
    desc: 'SOP generation, vendor evaluation scorecards, contract clause comparison, automated status memos, and operational bottleneck tracking.',
  },
]

const PATHWAYS = [
  {
    path: 'Pathway 01',
    title: 'AI for Work (Corporate Track)',
    tagline: 'Practical AI for Working Professionals & Teams',
    duration: '5 Weeks · 20 Hours (10 Sessions)',
    audience: 'Working Professionals across any functional domain',
    focus: 'Workplace productivity, email & sheet automation, executive reports, custom assistants & time-saving capstone.',
    deliverables: 'Personal Prompt Library, Zapier Pipeline, Executive Data Deck, Custom GPT, Capstone Showcase.',
    brochure: './brochures/ai-corporate-brochure.pdf',
    brochureLabel: 'Corporate Brochure (PDF)',
    accent: true,
  },
  {
    path: 'Pathway 02',
    title: 'AI Career Track (Job Ready)',
    tagline: 'Technical Career Track for Students & Career Starters',
    duration: '8 Weeks · Optional 12-Week Format',
    audience: 'Graduates, job seekers & developers pursuing AI careers',
    focus: 'Machine Learning, Deep Learning, NLP & Transformers, RAG & LLMs, fine-tuning, deployment & MLOps.',
    deliverables: 'Multi-project GitHub portfolio, production AI deployment, resume & technical mock interview preparation.',
    brochure: './brochures/ai-jobready-brochure.pdf',
    brochureLabel: 'Job Ready Brochure (PDF)',
    accent: false,
  },
]

const OUTCOMES = [
  { num: '01', title: 'Faster Task Execution', desc: 'Save an estimated 4 to 8 hours each week by delegating routine drafting, formatting, and data compilation to AI.' },
  { num: '02', title: 'Reusable Workflow Library', desc: 'Leave with a personal repository of verified prompt templates, automations, and formulas tailored to daily duties.' },
  { num: '03', title: 'Cross-Tool Fluency', desc: 'Gain confidence using modern LLMs, spreadsheet assistants, presentation generators, and automation pipelines.' },
  { num: '04', title: 'Role-Specific Custom Assistant', desc: 'Deploy a dedicated Custom GPT / Gem pre-configured with department guidelines, tone, and reference documentation.' },
  { num: '05', title: 'Demonstrable Workplace ROI', desc: 'Deliver an end-to-end capstone showing verifiable efficiency gains ready to present to team leadership.' },
]

export default function CorporateTraining() {
  useEffect(() => {
    setPageMeta({
      title: 'AI for Corporate Training Chandigarh | Kizen Education — Practical AI for Teams & Professionals',
      description: 'Practical 5-week AI corporate training programme at Kizen Education Sector 34-A Chandigarh. Upskill teams in ChatGPT, Claude, Zapier automation, AI data analysis and custom GPTs.',
      keywords: 'Corporate AI Training Chandigarh, AI for Work Programme, AI Upskilling for Working Professionals, Workplace Automation Training, Corporate Training Sector 34, Custom GPT Training Chandigarh',
      canonicalUrl: 'https://kizeneducation.com/corporate-training',
      og: {
        title: 'AI for Corporate Training in Chandigarh | Kizen Education',
        description: 'Upskill your team in AI productivity, no-code automation, executive communication, and role-specific custom assistants in Sector 34-A Chandigarh.',
        url: 'https://kizeneducation.com/corporate-training',
        image: 'https://kizeneducation.com/images/success-duo.webp',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI for Corporate Training | Kizen Education Chandigarh',
        description: 'Hands-on workplace AI training for working professionals and corporate teams.',
        image: 'https://kizeneducation.com/images/success-duo.webp',
      },
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Course',
            'name': 'AI for Corporate World Certificate Programme',
            'description': 'A hands-on, 5-week practical AI programme for working professionals and corporate teams covering AI productivity, work automation, data analysis, decision making, and role-specific custom assistants with a real-work capstone.',
            'provider': {
              '@type': 'EducationalOrganization',
              'name': 'Kizen Education',
              'url': 'https://kizeneducation.com',
            },
            'hasCourseInstance': {
              '@type': 'CourseInstance',
              'courseMode': ['in-person', 'blended', 'online'],
              'location': 'SCO 193-195, Sector 34-A, Chandigarh',
            },
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://kizeneducation.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'AI Programmes', 'item': 'https://kizeneducation.com/ai-programmes' },
              { '@type': 'ListItem', 'position': 3, 'name': 'Corporate Training', 'item': 'https://kizeneducation.com/corporate-training' },
            ],
          },
        ],
      },
    })
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="corp-hero" className="bg-navy text-paper py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/5 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-3 text-xs font-semibold text-paper/50 mb-8">
            <Link to="/" className="hover:text-paper">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <Link to="/ai-programmes" className="hover:text-paper">AI</Link>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-gold">Corporate Training</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">
                Corporate Training · For Working Professionals &amp; Teams
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4 text-paper">
                AI for the Corporate World.
              </h1>
              <p className="text-gold font-serif text-xl sm:text-2xl font-normal italic mb-6">
                &ldquo;Your team already uses AI. Train them to use it well.&rdquo;
              </p>
              <p className="text-paper/75 text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
                A practical, hands-on programme that teaches professionals to apply AI to everyday work —
                productivity, automation, data analysis, communication, strategy, and role-specific custom assistants.
                Workplace adoption, not model building.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="./brochures/ai-corporate-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold text-navy font-bold text-sm px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all"
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                  Download Corporate Brochure
                </a>
                <a
                  href="tel:+917696963377"
                  className="inline-flex items-center justify-center gap-2 border border-gold/40 text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-gold/10 hover:border-gold transition-all"
                >
                  <i className="fa-solid fa-phone text-gold"></i>
                  Book a Corporate Batch
                </a>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-paper/15 text-xs text-paper/70">
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-clock text-gold text-base"></i>
                  <div><strong className="block text-paper">5 Weeks</strong>20 Hours Total</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-calendar-days text-gold text-base"></i>
                  <div><strong className="block text-paper">10 Sessions</strong>2 hrs · 2 days/wk</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-user-check text-gold text-base"></i>
                  <div><strong className="block text-paper">Zero Coding</strong>All Domains Welcome</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-award text-gold text-base"></i>
                  <div><strong className="block text-paper">Certification</strong>Capstone with ROI</div>
                </div>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-4">
              <div className="bg-paper/10 border border-paper/20 rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-xl sticky top-24">
                <div className="font-serif text-xl lg:text-2xl font-semibold text-paper mb-2">Train Your Team</div>
                <p className="text-paper/70 text-xs sm:text-sm mb-6 leading-relaxed">
                  Request custom batch timings, enterprise pricing, and curriculum alignment for your team.
                </p>
                <EnquiryForm variant="courses" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01: PROGRAMME SNAPSHOT & BATCH MODELS ============ */}
      <section id="snapshot" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">01</span>
            <div>
              <Eyebrow className="mb-1">Programme Snapshot</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
                Engineered for rapid workplace implementation
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PROGRAMME_SNAPSHOT.map((item) => (
              <div key={item.title} className="bg-ivory border border-ink/10 rounded-2xl p-7 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center text-xl mb-4 shadow-sm">
                  <i className={item.icon}></i>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Batch Delivery Models */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-gold text-xs font-bold uppercase tracking-wider mb-2">Cohort Options</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink">Flexible Delivery Formats</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BATCH_MODELS.map((b) => (
              <div key={b.title} className="bg-paper border border-ink/10 rounded-2xl p-6 hover:shadow-md hover:border-navy/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/15 text-navy flex items-center justify-center text-lg">
                      <i className={b.icon}></i>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-navy text-gold uppercase tracking-wider">
                      {b.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ink mb-2">{b.title}</h4>
                  <p className="text-xs text-ink/65 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 02: 8 DESIGN PRINCIPLES ============ */}
      <section id="principles" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">02</span>
            <div>
              <Eyebrow className="mb-1">Design Principles</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
                From concept comprehension to real workplace capstone
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_PRINCIPLES.map((p) => (
              <div key={p.num} className="bg-paper border border-ink/10 rounded-2xl p-6 hover:border-gold/40 transition-all">
                <span className="font-serif text-3xl font-bold text-rust">{p.num}</span>
                <h4 className="font-serif text-lg font-bold text-ink mt-3 mb-2">{p.title}</h4>
                <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03: WEEK-BY-WEEK CURRICULUM ============ */}
      <section id="curriculum" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden border-b border-ink/10">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-paper/10 font-bold">03</span>
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Week-by-Week Syllabus</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper">
                Five weeks, each ending with a concrete workplace deliverable
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {WEEKS_CURRICULUM.map((w) => (
              <div
                key={w.week}
                className="bg-paper/5 border border-paper/15 rounded-3xl p-6 sm:p-8 hover:border-gold/40 transition-all"
              >
                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center text-2xl shrink-0">
                      <i className={w.icon}></i>
                    </div>
                    <div>
                      <div className="text-gold text-xs font-bold uppercase tracking-widest">Week {w.week}</div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-paper mt-1">{w.title}</h3>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="text-xs uppercase tracking-wider text-paper/50 font-semibold mb-3">Core Learning Modules</div>
                    <ul className="space-y-2 text-sm text-paper/75">
                      {w.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <i className="fa-solid fa-circle-check text-gold text-xs mt-1 shrink-0"></i>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 bg-paper/10 border border-gold/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <i className="fa-solid fa-box-archive"></i>
                        Weekly Deliverable
                      </div>
                      <p className="text-xs sm:text-sm text-paper font-medium leading-snug">
                        {w.deliverable}
                      </p>
                    </div>
                    <div className="text-[11px] text-paper/50 mt-4 flex items-center gap-1">
                      <i className="fa-solid fa-arrow-right text-gold text-[10px]"></i> Ready to apply at work
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04: CORE TOOLING ECOSYSTEM ============ */}
      <section id="tools" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">04</span>
            <div>
              <Eyebrow className="mb-1">Core Tooling Ecosystem</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
                The modern AI toolkit your team learns to orchestrate
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-ivory rounded-2xl overflow-hidden border border-ink/10">
              <thead>
                <tr className="bg-navy text-paper text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Category</th>
                  <th className="py-4 px-6 font-bold">Primary Tools</th>
                  <th className="py-4 px-6 font-bold">Workplace Application</th>
                  <th className="py-4 px-6 font-bold">Proficiency Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-xs sm:text-sm text-ink/80">
                {TOOLING_ECOSYSTEM.map((row) => (
                  <tr key={row.category} className="hover:bg-paper/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-ink whitespace-nowrap">
                      <i className="fa-solid fa-cube text-gold text-xs mr-2"></i>
                      {row.category}
                    </td>
                    <td className="py-4 px-6 font-medium text-navy">{row.tools}</td>
                    <td className="py-4 px-6 text-ink/70 leading-relaxed">{row.application}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-block bg-paper border border-ink/10 text-ink/75 px-3 py-1 rounded-full text-xs font-medium">
                        {row.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 05: ROLE-SPECIFIC CUSTOM ASSISTANTS ============ */}
      <section id="role-apps" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">05</span>
            <div>
              <Eyebrow className="mb-1">Functional Customization</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
                Week 4 builds a Custom Domain Assistant for each team member
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLE_APPLICATIONS.map((r) => (
              <div key={r.role} className="bg-paper border border-ink/10 rounded-2xl p-7 hover:border-gold/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-navy flex items-center justify-center text-xl mb-4">
                  <i className={r.icon}></i>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink mb-2">{r.role}</h3>
                <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">{r.desc}</p>
              </div>
            ))}
            <div className="bg-navy text-paper border border-gold/30 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-paper/10 text-gold flex items-center justify-center text-xl mb-4">
                  <i className="fa-solid fa-code-branch"></i>
                </div>
                <h3 className="font-serif text-lg font-bold text-paper mb-2">Your Organisation</h3>
                <p className="text-xs sm:text-sm text-paper/75 leading-relaxed">
                  Have unique operational requirements? We configure custom models and reference knowledge bases tailored directly to your internal workflows.
                </p>
              </div>
              <a href="tel:+917696963377" className="mt-6 inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider hover:underline">
                Discuss custom scope <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 06: TWO PATHWAYS (CORPORATE VS CAREER) ============ */}
      <section id="pathways" className="bg-navy text-paper py-20 lg:py-28 relative overflow-hidden border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-2">Choose Your AI Path</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-paper">
              Two specialised pathways designed for different career stages
            </h2>
            <p className="text-paper/70 text-sm sm:text-base mt-3">
              Whether you are an enterprise team seeking immediate workplace productivity or an aspiring engineer building production models.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {PATHWAYS.map((p) => (
              <div
                key={p.title}
                className={`rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between ${
                  p.accent
                    ? 'bg-paper text-ink border-gold/50 shadow-2xl'
                    : 'bg-paper/5 text-paper border-paper/15 hover:border-gold/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">{p.path}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${p.accent ? 'bg-navy text-gold' : 'bg-paper/10 text-paper/80'}`}>
                      {p.duration}
                    </span>
                  </div>
                  <h3 className={`font-serif text-2xl sm:text-3xl font-bold mb-1 ${p.accent ? 'text-ink' : 'text-paper'}`}>
                    {p.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium mb-6 ${p.accent ? 'text-rust' : 'text-gold'}`}>
                    {p.tagline}
                  </p>

                  <div className="space-y-4 mb-8 text-xs sm:text-sm">
                    <div>
                      <strong className={`block text-xs uppercase tracking-wider mb-1 ${p.accent ? 'text-ink/50' : 'text-paper/40'}`}>
                        Target Audience
                      </strong>
                      <p className={p.accent ? 'text-ink/75' : 'text-paper/75'}>{p.audience}</p>
                    </div>
                    <div>
                      <strong className={`block text-xs uppercase tracking-wider mb-1 ${p.accent ? 'text-ink/50' : 'text-paper/40'}`}>
                        Core Focus
                      </strong>
                      <p className={p.accent ? 'text-ink/75' : 'text-paper/75'}>{p.focus}</p>
                    </div>
                    <div>
                      <strong className={`block text-xs uppercase tracking-wider mb-1 ${p.accent ? 'text-ink/50' : 'text-paper/40'}`}>
                        Key Deliverables
                      </strong>
                      <p className={p.accent ? 'text-ink/75' : 'text-paper/75'}>{p.deliverables}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={p.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all ${
                      p.accent
                        ? 'bg-navy text-paper hover:bg-ink shadow-md'
                        : 'bg-gold text-navy hover:bg-amber-400 shadow-md'
                    }`}
                  >
                    <i className="fa-solid fa-download"></i>
                    {p.brochureLabel}
                  </a>
                  <a
                    href="tel:+917696963377"
                    className={`text-xs font-semibold hover:underline ${p.accent ? 'text-navy' : 'text-paper/70 hover:text-paper'}`}
                  >
                    Speak with Coordinator →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 07: EXPECTED OUTCOMES ============ */}
      <section id="outcomes" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-serif text-5xl text-ink/15 font-bold">07</span>
            <div>
              <Eyebrow className="mb-1">Measurable Returns</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
                Expected programme outcomes for your team
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTCOMES.map((o) => (
              <div key={o.num} className="bg-ivory border border-ink/10 rounded-2xl p-7 hover:border-gold/40 transition-all">
                <span className="font-serif text-3xl font-bold text-gold">{o.num}</span>
                <h3 className="font-serif text-lg font-bold text-ink mt-3 mb-2">{o.title}</h3>
                <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">{o.desc}</p>
              </div>
            ))}

            {/* Assessment Framework Card */}
            <div className="bg-navy text-paper border border-gold/30 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="text-gold text-xs font-bold uppercase tracking-wider mb-2">Certification Rigour</div>
                <h3 className="font-serif text-xl font-bold mb-3">Assessment Framework</h3>
                <ul className="space-y-2 text-xs text-paper/75">
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-gold"></i> Live Session Attendance &amp; Engagement</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-gold"></i> Weekly Module Milestone Deliverables</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-gold"></i> Working End-to-End Automated Capstone</li>
                  <li className="flex items-center gap-2"><i className="fa-solid fa-check text-gold"></i> Live Demonstration of Time-Saving ROI</li>
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-paper/15 text-[11px] text-paper/50">
                Certificates recognize demonstrable hands-on competence.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BROCHURE DOWNLOAD & CALL TO ACTION ============ */}
      <section id="downloads" className="bg-ivory py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Brochure Card 1 */}
            <div className="bg-paper border border-ink/10 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gold/15 text-navy flex items-center justify-center text-2xl mb-6">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Corporate Training</div>
                <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                  AI for Corporate World Brochure
                </h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-6">
                  Full 5-week curriculum, week-by-week deliverable roadmap, tooling matrix, and batch delivery options — ready to share with your leadership or L&amp;D department.
                </p>
              </div>
              <a
                href="./brochures/ai-corporate-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-navy text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-ink transition shadow-sm w-fit"
              >
                <i className="fa-solid fa-download text-gold"></i>
                Download Corporate Brochure (PDF)
              </a>
            </div>

            {/* Brochure Card 2 */}
            <div className="bg-paper border border-ink/10 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center text-2xl mb-6 shadow-sm">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">Dual-Pathway Programme</div>
                <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                  AI Job Ready Programme Brochure
                </h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-6">
                  Comprehensive overview comparing the AI Career Track (ML, GenAI, MLOps) and AI for Work (Productivity, Automation) with career guidance and project details.
                </p>
              </div>
              <a
                href="./brochures/ai-jobready-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-paper border border-ink/20 text-ink font-semibold text-sm px-6 py-3.5 rounded-full hover:border-gold hover:text-navy transition shadow-sm w-fit"
              >
                <i className="fa-solid fa-download text-gold"></i>
                Download Job Ready Brochure (PDF)
              </a>
            </div>
          </div>

          {/* Book a Corporate Batch Banner */}
          <div className="bg-navy text-paper rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold/5 pointer-events-none"></div>
            <div className="max-w-3xl relative">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Book a Corporate Batch</div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4 text-paper">
                Train your team. Automate manual routines. Measure impact.
              </h2>
              <p className="text-paper/75 text-base lg:text-lg leading-relaxed mb-8">
                Speak directly with Shivam Sharma and our academic faculty to coordinate cohort schedules, assess your team&apos;s current workflows, and schedule a customized training batch.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="tel:+917696963377"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-gold via-amber-400 to-gold text-navy font-bold text-base px-8 py-4 rounded-full hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all"
                >
                  <i className="fa-solid fa-phone text-lg"></i>
                  Call +91 76969 63377
                </a>
                <a
                  href="mailto:kizeneducationofficial@gmail.com"
                  className="inline-flex items-center gap-2.5 bg-paper/10 border border-paper/20 hover:border-gold/50 text-paper text-sm font-semibold px-6 py-4 rounded-full hover:bg-paper/15 transition-all"
                >
                  <i className="fa-solid fa-envelope text-gold"></i>
                  kizeneducationofficial@gmail.com
                </a>
              </div>
              <p className="text-xs text-paper/50 mt-6">
                SCO 193-195, Sector 34-A, Chandigarh, 160022 · Monday – Saturday, 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
