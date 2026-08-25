import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Eyebrow from '../components/Eyebrow.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import VideoTestimonials from '../components/VideoTestimonials.jsx'
import { setPageMeta, getCtaText } from '../utils/seo.js'

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

// Count-up animation hook supporting decimal and integer values
function useCountUp(end, duration = 2, isDecimal = false) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    isDecimal ? Number(latest.toFixed(1)) : Math.round(latest)
  )
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration,
        ease: "easeOut"
      })
      return controls.stop
    }
  }, [isInView, end, duration, count])

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v))
  }, [rounded])

  return { ref, displayValue }
}

const STEPS = [
  {
    num: '01',
    stage: 'School',
    icon: 'fa-solid fa-book',
    title: '11th Commerce',
    sub: 'Foundation year',
    detail: 'Accounts, Economics & Business Studies foundations built for board exams and beyond.',
    accent: false
  },
  {
    num: '02',
    stage: 'School',
    icon: 'fa-solid fa-graduation-cap',
    title: '12th Commerce',
    sub: 'Board + concepts',
    detail: 'Board-focused mastery with early exposure to professional CA/ACCA problem solving.',
    accent: false
  },
  {
    num: '03',
    stage: 'Undergraduate',
    icon: 'fa-solid fa-building-columns',
    title: 'B.Com / BBA',
    sub: 'Undergraduate',
    detail: 'University syllabus paired with practical applied accounting, finance, and corporate cases.',
    accent: false
  },
  {
    num: '04',
    stage: 'Postgraduate',
    icon: 'fa-solid fa-chart-line',
    title: 'M.Com / MBA',
    sub: 'Postgraduate',
    detail: 'Advanced commerce specialisation for students aiming at leadership and corporate finance.',
    accent: false
  },
  {
    num: '05',
    stage: 'Global Exit',
    icon: 'fa-solid fa-earth-americas',
    title: 'ACCA',
    sub: 'Globally Recognised',
    detail: 'The only globally valid professional finance qualification taught locally in the tricity.',
    accent: true
  },
]

const WHY_KIZEN = [
  { num: '01', title: 'Single continuous curriculum', body: 'From 11th-class fundamentals to ACCA papers, concepts are sequenced so nothing is re-taught or missed.' },
  { num: '02', title: 'Faculty who know your child', body: 'Small batches and long tenures mean mentors track progress over years, not months.' },
  { num: '03', title: '95%+ pass rate', body: 'Consistent outcomes across board exams, university programmes and ACCA papers alike.' },
  { num: '04', title: 'Global exit, local roots', body: 'A Sector 34-A address with an ACCA outcome — internationally valid, locally accountable.' },
]

const COURSE_CARDS = [
  { tag: 'School', title: '11th Commerce', body: 'Accounts, Economics & Business Studies foundations built for board and beyond.' },
  { tag: 'School', title: '12th Commerce', body: 'Board-focused mastery with early exposure to CA/ACCA-style problem solving.' },
  { tag: 'Undergraduate', title: 'B.Com', body: 'University curriculum support with applied finance and accounting practice.' },
  { tag: 'Undergraduate', title: 'BBA', body: 'Management fundamentals paired with case-based learning and mentorship.' },
  { tag: 'Postgraduate', title: 'M.Com / MBA', body: 'Advanced specialisation for students moving into corporate or academic careers.' },
  { tag: 'Global', title: 'ACCA', body: 'The only globally recognised professional qualification taught locally in the tricity.', accent: true },
]

// Stat item component with count-up animation and optional icon
function StatItem({ value, suffix = '', prefix = '', label, icon = null }) {
  const isDecimal = value % 1 !== 0
  const { ref, displayValue } = useCountUp(value, 2, isDecimal)

  const display = isDecimal
    ? `${prefix}${displayValue.toFixed(1)}${suffix}`
    : `${prefix}${displayValue}${suffix}`

  return (
    <div ref={ref}>
      <div className="font-serif text-3xl lg:text-4xl font-bold text-ink flex items-center gap-2">
        <span>{display}</span>
        {icon}
      </div>
      <div className="text-sm text-ink/60 mt-1">{label}</div>
    </div>
  )
}

const ACCA_PAPERS = ['Applied Knowledge', 'Applied Skills', 'Strategic Professional', 'Ethics & Practical Experience']

const VIDEO_TESTIMONIALS = [
  { src: './videos/new-reel-kizen.mp4', label: 'Kizen Education Overview' },
  { src: './videos/testimonial-2.mp4', label: 'Student Testimonial 2' },
  { src: './videos/testimonial-3.mp4', label: 'Student Testimonial 3' },
]


// Real Kizen campus photos — auto-cycling hero slideshow
const HERO_SLIDES = [
  './images/slide-1.webp',
  './images/slide-2.webp',
  './images/slide-3.webp',
  './images/slide-4.webp',
  './images/slide-5.webp',
  './images/slide-6.webp',
  './images/slide-7.webp',
]

// Full-bleed cinematic campus showcase with solid layered crossfades and trust capsules
// Full-bleed feeling campus showcase with solid layered crossfades in hero side column
function HeroShowcase() {
  const [index, setIndex] = useState(0)

  // Preload all slides on mount
  useEffect(() => {
    HERO_SLIDES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] rounded-3xl overflow-hidden border border-ink/10 shadow-xl bg-navy/10 flex flex-col justify-end">
      {/* Background slide images stack */}
      {HERO_SLIDES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={`Kizen Education Campus Slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 1 : 0,
          }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Atmospheric bottom vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10 pointer-events-none" />

      {/* Bottom Floating Badge & Caption */}
      <div className="relative z-20 p-6 sm:p-7 text-paper flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-gold text-[11px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span> Kizen Campus · Sector 34-A
          </span>
          <div className="font-serif text-lg sm:text-xl font-semibold text-paper drop-shadow-sm">
            State-of-the-Art Commerce Classrooms
          </div>
        </div>

        {/* Slide pagination dots */}
        <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shrink-0">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === index ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(null)
  const { pathname } = useLocation()
  const ctaText = getCtaText(pathname)

  useEffect(() => {
    setPageMeta({
      title: 'Kizen Education — Commerce Coaching & ACCA in Chandigarh',
      description: "Kizen Education, Sector 34-A Chandigarh — one continuous commerce pathway from Class 11 to ACCA under one roof. Small batches, 95%+ pass rate, 4.9-rated by students and parents. Call or WhatsApp to book free counselling.",
    })
  }, [])

  return (
    <>
      {/* ============ HERO SECTION — FULL-BLEED 1-SCREEN CINEMATIC HERO ============ */}
      <section id="hero" className="relative min-h-[calc(100svh-5rem)] lg:h-[calc(100vh-5rem)] lg:min-h-[580px] lg:max-h-[720px] bg-navy overflow-hidden flex items-center">
        {/* Full-bleed background image with subjects positioned on the right */}
        <img
          src="./images/success-duo.webp"
          alt="Two successful Kizen Commerce and ACCA students celebrating career milestones with offer letters"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-[82%_center] lg:object-right"
          loading="eager"
        />

        {/* Cinematic multi-layer gradient overlay — dark on left for text, clear on right for students */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1824] via-[#0c1824]/90 via-50% to-[#0c1824]/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1824] via-[#0c1824]/60 to-transparent lg:hidden pointer-events-none" />

        {/* Faint accounting ledger-line ambient texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 36px)',
          }}
        />

        {/* Subtle warm gold ambient aura behind headline */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-gold/[0.07] blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 relative z-10 w-full py-6 sm:py-8 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column — High-Impact Editorial & Conversion Engine (7 cols) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 flex flex-col justify-center text-left"
            >
              {/* Eyebrow badge with integrated Powered by Kizen */}
              <motion.div variants={fadeUpVariants}>
                <div className="inline-flex items-center gap-2 bg-gold/15 backdrop-blur-md border border-gold/30 rounded-full px-3.5 py-1 text-[11px] font-bold text-gold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span> Chandigarh&apos;s Premier Commerce &amp; ACCA Institute · Powered by Kizen
                </div>
              </motion.div>

              {/* Primary High-Converting Headline — balanced height */}
              <motion.h1
                variants={fadeUpVariants}
                className="font-serif font-medium text-2xl sm:text-4xl lg:text-[2.6rem] xl:text-[3rem] leading-[1.12] tracking-tight text-paper mt-3"
              >
                Launch Your Global Finance Career with <span className="italic text-gold font-normal">ACCA</span> &amp; Commerce Mastery.
              </motion.h1>

              {/* Value-Driven Sub-headline */}
              <motion.p
                variants={fadeUpVariants}
                className="text-paper/85 text-xs sm:text-sm lg:text-[15px] leading-relaxed mt-2.5 max-w-xl font-sans"
              >
                From Class 11th fundamentals to the globally recognised ACCA credential — get mentor-led coaching, 95%+ pass rates, and direct pathways to Big 4 &amp; MNC careers in Sector 34-A.
              </motion.p>

              {/* Dual CTA Actions */}
              <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3 mt-4 sm:mt-5">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2.5 bg-gold text-navy px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm hover:bg-paper hover:text-ink shadow-lg shadow-gold/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <span>Start Your Global Career — Talk to an ACCA Counsellor</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform shrink-0"></i>
                </a>
                <a
                  href="#pathway"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-3 sm:py-3.5 rounded-full border border-paper/30 bg-paper/10 backdrop-blur-md text-paper hover:bg-paper hover:text-navy hover:border-paper font-semibold text-xs sm:text-sm transition-all"
                >
                  <span>Explore 7-Year Pathway</span>
                  <i className="fa-solid fa-arrow-down text-xs"></i>
                </a>
              </motion.div>

              {/* Risk-reversal microcopy */}
              <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-paper/70 text-[11px] sm:text-xs mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-gold text-[10px]"></i> Free 1-on-1 Career Mapping
                </span>
                <span className="text-paper/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-gold text-[10px]"></i> Sector 34-A Campus
                </span>
                <span className="text-paper/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="fa-solid fa-bolt text-gold text-[10px]"></i> Fast 24-Hr Response
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column — Key Highlights & Rating Badges placed at the bottom-right down section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end mt-4 lg:mt-0"
            >
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 bg-navy/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-gold/30 shadow-2xl">
                <div className="flex items-center gap-2 pr-3 border-r border-paper/15">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <div>
                    <div className="font-serif text-xs font-bold text-paper">4.9 ★ Rating</div>
                    <div className="text-[10px] text-paper/70">500+ Students &amp; Parents</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pr-3 border-r border-paper/15">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </span>
                  <div>
                    <div className="font-serif text-xs font-bold text-paper">95%+ Pass Rate</div>
                    <div className="text-[10px] text-paper/70">Boards &amp; ACCA Papers</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-earth-americas"></i>
                  </span>
                  <div>
                    <div className="font-serif text-xs font-bold text-paper">180+ Countries</div>
                    <div className="text-[10px] text-paper/70">Globally Valid</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CAMPUS SLIDESHOW — moved below the conversion-critical hero ============ */}
      <section id="campus" className="bg-ivory py-16 lg:py-20 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Inside Kizen</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-ink mt-2">
                Walk our Sector 34-A campus.
              </h2>
            </div>
            <p className="text-ink/60 text-sm max-w-sm leading-relaxed">
              Modern commerce classrooms and a dedicated study environment in the heart of Chandigarh.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: THE 7-YEAR PATHWAY CONTINUUM ============ */}
      <section id="pathway" className="relative bg-ivory py-20 lg:py-28 border-y border-ink/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={fadeUpVariants}>
              <Eyebrow>The 7-Year Academic Pathway</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUpVariants} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-ink mt-2">
              Five stages. One address. Zero restarts.
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-ink/65 text-[15px] leading-relaxed mt-4">
              Most institutes teach just one isolated stage. Kizen sequences concepts continuously from Class 11 commerce fundamentals all the way to global ACCA papers, ensuring nothing is missed or re-taught.
            </motion.p>
          </motion.div>

          {/* Interactive Pathway Grid with connecting line */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-12 right-12 top-[68px] -z-0">
              <svg width="100%" height="2" className="overflow-visible">
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="#1B1A17"
                  strokeOpacity="0.15"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    s.accent
                      ? 'bg-navy text-paper border-2 border-gold/40 shadow-xl'
                      : 'bg-paper text-ink border border-ink/10 shadow-sm hover:shadow-md hover:border-navy/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-serif text-sm font-bold"
                        style={{ color: s.accent ? 'rgba(200,155,60,0.9)' : 'rgba(27,26,23,0.4)' }}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          s.accent ? 'bg-gold/20 text-gold' : 'bg-ink/5 text-ink/60'
                        }`}
                      >
                        {s.stage}
                      </span>
                    </div>

                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                        s.accent ? 'bg-gold text-navy shadow-md' : 'bg-ivory border border-ink/10 text-ink/80'
                      }`}
                    >
                      <i className={`${s.icon} text-xl`}></i>
                    </div>

                    <div className={`font-serif text-xl font-bold leading-snug ${s.accent ? 'text-paper' : 'text-ink'}`}>
                      {s.title}
                    </div>
                    <div className={`text-xs mt-1 font-medium ${s.accent ? 'text-gold' : 'text-ink/50'}`}>
                      {s.sub}
                    </div>

                    <p className={`text-xs leading-relaxed mt-4 ${s.accent ? 'text-paper/75' : 'text-ink/60'}`}>
                      {s.detail}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-semibold">
                    <span className={s.accent ? 'text-gold' : 'text-navy'}>Explore Stage</span>
                    <i className={`fa-solid fa-arrow-right text-[10px] ${s.accent ? 'text-gold' : 'text-navy'}`}></i>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY KIZEN — IVORY BAND ============ */}
      <section id="why-kizen" className="bg-paper py-20 lg:py-28 border-b border-ink/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-6 lg:px-12"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div variants={fadeUpVariants} className="lg:col-span-4">
              <Eyebrow>Why Families Choose Kizen</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight text-ink mt-2">
                Not a coaching centre.<br />A 7-year academic home.
              </h2>
              <p className="text-ink/60 text-[15px] leading-relaxed mt-5">
                Most institutes teach one stage. We built our faculty, mentorship and study material to carry a single student across five academic milestones without ever changing address.
              </p>
              {/* Real campus photo — desktop only below left text */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-ink/10 mt-8 hidden lg:block shadow-sm"
              >
                <img src="./images/campus-why-kizen.webp" alt="Kizen Education classrooms" className="w-full h-52 object-cover" />
              </motion.div>
            </motion.div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
                {WHY_KIZEN.map((c) => (
                  <motion.div
                    variants={fadeUpVariants}
                    whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-ivory p-8 cursor-pointer"
                    key={c.num}
                  >
                    <div className="font-serif text-3xl font-bold text-gold mb-2">{c.num}</div>
                    <div className="font-serif text-lg font-semibold mb-2 text-ink">{c.title}</div>
                    <p className="text-sm text-ink/60 leading-relaxed">{c.body}</p>
                  </motion.div>
                ))}
              </div>
              {/* Real campus photo — mobile/tablet below cards */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-ink/10 mt-6 lg:hidden shadow-sm"
              >
                <img src="./images/campus-why-kizen.webp" alt="Kizen Education classrooms" className="w-full h-48 object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ COURSES — PROGRAMMES GRID ============ */}
      <section id="courses" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-6 lg:px-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <motion.div variants={fadeUpVariants}>
              <Eyebrow>Academic Programmes</Eyebrow>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mt-2">Six programmes. One pathway.</h2>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-navy border-b-2 border-navy pb-1 hover:gap-3 transition-all">
                <span>View full courses page</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_CARDS.map((c) =>
              c.accent ? (
                <motion.div
                  variants={fadeUpVariants}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(24,51,78,0.3)" }}
                  transition={{ duration: 0.3 }}
                  key={c.title}
                  className="rounded-2xl p-8 bg-navy text-paper relative overflow-hidden cursor-pointer border-2 border-gold/40"
                >
                  <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gold/10"></div>
                  <div className="flex items-center justify-between mb-6 relative">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">{c.tag}</span>
                    <i className="fa-solid fa-arrow-up-right text-gold"></i>
                  </div>
                  <div className="font-serif text-2xl font-semibold mb-3 relative">{c.title}</div>
                  <p className="text-sm text-paper/75 leading-relaxed relative">{c.body}</p>
                </motion.div>
              ) : (
                <motion.div
                  variants={fadeUpVariants}
                  whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.3 }}
                  key={c.title}
                  className="border border-ink/10 rounded-2xl p-8 hover:border-navy/40 transition group cursor-pointer bg-paper shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-ink/40 uppercase tracking-wider">{c.tag}</span>
                    <i className="fa-solid fa-arrow-up-right text-ink/30 group-hover:text-navy transition"></i>
                  </div>
                  <div className="font-serif text-2xl font-semibold mb-3 text-ink">{c.title}</div>
                  <p className="text-sm text-ink/65 leading-relaxed">{c.body}</p>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </section>

      {/* ============ ACCA SPOTLIGHT — NAVY BAND ============ */}
      <section id="acca-spotlight" className="bg-navy text-paper py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUpVariants}>
              <Eyebrow>The Global Destination</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUpVariants} className="font-serif text-3xl lg:text-[2.6rem] font-medium leading-tight mb-6 mt-2">
              ACCA — the qualification that travels with you.
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-paper/70 text-[15px] leading-relaxed max-w-xl mb-8">
              The Association of Chartered Certified Accountants is recognised across 180+ countries. At Kizen, students walk in from Class 11 commerce and walk out with a qualification employers recognise from London to Dubai to Singapore.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-8 mb-8">
              <div>
                <StatItem value={180} suffix="+" label="Countries recognise ACCA" />
              </div>
              <div>
                <StatItem value={13} suffix="" label="Papers, structured pathway" />
              </div>
              <div>
                <StatItem value={95} suffix="%+" label="Kizen pass rate" />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <Link to="/acca" className="inline-flex items-center gap-2 bg-gold text-navy font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-paper transition">
                <span>Explore the ACCA Programme</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeUpVariants} className="lg:col-span-5">
            <div className="border border-paper/15 rounded-2xl p-8 bg-paper/5 shadow-xl">
              <div className="text-xs uppercase tracking-widest text-gold font-bold mb-6">ACCA Papers at Kizen</div>
              <ul className="space-y-4 text-sm">
                {ACCA_PAPERS.map((p, i) => (
                  <li key={p} className={`flex items-center justify-between ${i < ACCA_PAPERS.length - 1 ? 'border-b border-paper/10 pb-3' : ''}`}>
                    <span>{p}</span><i className="fa-solid fa-check text-gold"></i>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ VIDEO TESTIMONIALS ============ */}
      <VideoTestimonials id="reviews" />

      {/* ============ DEDICATED ENQUIRY & COUNSELLING SECTION ============ */}
      <section id="counselling" className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 text-paper shadow-2xl grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-gold"></span> Academic Counselling
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-paper">
                Plan your 7-year commerce pathway.
              </h2>
              <p className="text-paper/70 text-base leading-relaxed mt-6 max-w-lg">
                Whether you're entering Class 11 or planning your ACCA papers, schedule a direct 1-on-1 discussion with our senior faculty at Sector 34-A, Chandigarh.
              </p>

              <div className="mt-8 space-y-4 text-sm text-paper/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Personalised roadmap from 11th to ACCA</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Batch timing & fee structure walkthrough</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <span>Free campus visit & trial class invitation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-paper/10 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="font-serif text-2xl font-semibold mb-1 text-paper">Request a Call Back</div>
              <div className="text-paper/60 text-xs mb-6">Our academic counsellors will contact you within 24 hours.</div>
              <EnquiryForm variant="home" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA STRIP ============ */}
      <section id="cta" className="bg-paper py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
        >
          <motion.div variants={fadeUpVariants}>
            <h3 className="font-serif text-2xl lg:text-3xl font-medium text-ink">
              Wherever your child is on the pathway, we have the next step ready.
            </h3>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="tel:+917696963377"
              className="inline-flex items-center justify-center gap-2 border border-ink/20 text-ink font-semibold text-sm px-7 py-4 rounded-full hover:border-ink transition"
            >
              <i className="fa-solid fa-phone text-gold"></i> +91 76969 63377
            </a>
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 bg-navy text-paper font-semibold text-sm px-7 py-4 rounded-full hover:bg-ink transition shadow-sm"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}