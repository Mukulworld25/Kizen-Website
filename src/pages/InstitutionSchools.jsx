import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../utils/seo.js'
import EnquiryForm from '../components/EnquiryForm.jsx'

const WHY_KIZEN = [
  'Build AI awareness, computational thinking and practical digital skills from an early stage.',
  'Age-appropriate pathways for Classes 5–8 and Classes 9–12.',
  'Hands-on activities, coding, projects, testing and responsible technology use.',
  'Flexible 10-day and 30-day formats designed around visible student outcomes.',
]

const WHO_CAN_JOIN = [
  'Classes 5–8 students exploring AI, logic, creative computing and interactive projects.',
  'Classes 9–12 students progressing into Python, data, machine learning and guided AI applications.',
  'Schools seeking a structured, practical AI learning pathway with measurable project outcomes.',
]

const MODULES = [
  { num: '01', title: 'AI Foundations', topics: ['AI Around Us', 'Patterns & Algorithms', 'How Machines Learn', 'Data & Prediction', 'Responsible AI'] },
  { num: '02', title: 'Creative Computing', topics: ['Scratch & Interactive Projects', 'Logic & Conditions', 'Problem Solving', 'Image Classification'] },
  { num: '03', title: 'Applied AI', topics: ['Python Essentials*', 'Data with Pandas*', 'Charts & Insights*', 'Machine Learning*', 'NLP / Computer Vision*', 'Generative AI*'] },
  { num: '04', title: 'Project & Showcase', topics: ['Problem Selection', 'Prototype & Build', 'Test & Improve', 'Documentation & Presentation', 'Demo Day & Certification'] },
]

const LEARNING_OUTCOMES = [
  'Understand how AI uses data, patterns and instructions.',
  'Build age-appropriate AI projects with guidance.',
  'Test, explain and improve outputs while recognising limitations.',
  'Practise privacy, verification and responsible technology use.',
]

export default function InstitutionSchools() {
  useEffect(() => {
    setPageMeta({
      title: 'School AI Learning Programme in Chandigarh | Kizen Education — AI for Classes 5–12',
      description: 'Kizen Education partners with schools in Chandigarh to deliver the School AI Learning Programme: 10-Day AI Discovery and 30-Day Applied AI pathways for Classes 5–12 with hands-on projects, Demo Day and certification.',
      keywords: 'School AI Programme Chandigarh, AI Learning for Schools, AI Curriculum Classes 5-12, Kizen Education Schools, AI Education Chandigarh',
      canonicalUrl: 'https://kizeneducation.com/institutions/schools',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Course',
            'name': 'School AI Learning Programme',
            'description': '10-Day AI Discovery and 30-Day Applied AI learning pathways for school students (Classes 5–12), covering AI foundations, creative computing, applied AI and a capstone showcase.',
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
              { '@type': 'ListItem', 'position': 2, 'name': 'Institutions', 'item': 'https://kizeneducation.com/institutions/schools' },
              { '@type': 'ListItem', 'position': 3, 'name': 'Schools', 'item': 'https://kizeneducation.com/institutions/schools' },
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
            <span className="text-gold">Schools</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Institutions · Schools</div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">
                School AI Learning Programme
              </h1>
              <p className="text-paper/70 text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                10-Day AI Discovery&nbsp;&nbsp;|&nbsp;&nbsp;30-Day Applied AI Learning — a structured, practical AI
                pathway Kizen brings to your school, from first curiosity to a working capstone project.
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-paper/70">
                <div className="flex items-center gap-2"><i className="fa-solid fa-graduation-cap text-gold"></i> Classes 5–8 &amp; 9–12</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-calendar-days text-gold"></i> 10-Day &amp; 30-Day Formats</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-school text-gold"></i> Delivered On Campus</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-award text-gold"></i> Certificate &amp; Demo Day</div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-paper/10 border border-paper/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                <div className="font-serif text-xl lg:text-2xl font-semibold text-paper mb-2">Bring AI to Your School</div>
                <p className="text-paper/60 text-sm mb-6">Get the full programme structure, formats &amp; pricing.</p>
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
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">Why Kizen offers School AI Learning</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">AI skills, built from an early stage</h2>
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
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">What is School AI Learning?</div>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Two age-appropriate pathways, one clear outcome</h2>
            </div>
          </div>
          <div className="prose prose-ink max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
            <p>
              Kizen&rsquo;s School AI Learning Programme introduces students to artificial intelligence through guided
              activities, practical tools, coding and project development. The 10-day option builds curiosity and
              foundational skills through a guided mini-project, while the 30-day option provides deeper practice and a
              complete capstone project with testing, documentation and Demo Day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-paper border border-ink/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">10-Day AI Discovery</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Awareness · Activities · Guided Mini-Project · Presentation</h3>
              <p className="text-sm text-ink/65 leading-relaxed">A fast, engaging introduction to AI for younger students and beginners.</p>
            </div>
            <div className="bg-paper border border-ink/10 rounded-2xl p-8">
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">30-Day Applied AI</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">Foundations · Practice · Capstone · Testing · Demo Day</h3>
              <p className="text-sm text-ink/65 leading-relaxed">Deeper, project-first learning with a complete capstone and certification.</p>
            </div>
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
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">Designed for classrooms, clubs &amp; whole cohorts</h2>
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
              <h2 className="font-serif text-3xl lg:text-4xl font-medium">From AI foundations to Demo Day</h2>
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
          <p className="text-paper/50 text-xs mt-6">* Primarily emphasized in the Classes 9–12 applied pathway.</p>
        </div>
      </section>

      {/* ============ OUTCOMES + BROCHURE ============ */}
      <section className="bg-paper py-20 lg:py-28 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">Learning Outcomes</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium mb-8">What students walk away with</h2>
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
            <h3 className="font-serif text-2xl font-bold text-ink mb-2">School AI Learning Brochure</h3>
            <p className="text-sm text-ink/65 leading-relaxed mb-6">
              Full programme structure, pathways, formats and outcomes — ready to share with your school leadership team.
            </p>
            <a
              href="./brochures/ai-school-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-navy text-paper font-semibold text-sm px-6 py-3 rounded-full hover:bg-ink transition shadow-sm"
            >
              <i className="fa-solid fa-download text-gold"></i> View / Download Brochure (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  )
}



