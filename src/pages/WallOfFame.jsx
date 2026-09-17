import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../utils/seo.js'

// ---------------------------------------------------------------------------
// Wall of Fame — /wall-of-fame
// Gallery page for testimonials & success stories.
// Populated with real video testimonials & campus reels from Kizen Drive archive.
// Real student names and programmes left as [pending] where not specified in files.
// ---------------------------------------------------------------------------

export const WALL_OF_FAME_ENTRIES = [
  {
    id: 1,
    title: 'Mannat — Student Testimonial',
    tag: 'Student Story',
    quote: '"And I am really satisfied with the teaching and concept clarity at Kizen."',
    student: 'Mannat',
    programme: '[pending]',
    src: '/videos/testimonial-1.mp4',
    poster: '/images/poster-testimonial-1.webp',
    filename: 'Testimonial 1.mov',
  },
  {
    id: 2,
    title: 'Shivansh — Student Testimonial',
    tag: 'Student Story',
    quote: '"I recently joined ACCA at Kizen and my experience has been really good so far."',
    student: 'Shivansh',
    programme: 'ACCA',
    src: '/videos/testimonial-4.mp4',
    poster: '/images/poster-testimonial-4.webp',
    filename: 'Testimonial 4.mov',
  },
  {
    id: 3,
    title: 'Keshav — Student Testimonial',
    tag: 'Student Story',
    quote: '"Kizen Education se krrha hu — excellent classroom atmosphere and mentors."',
    student: 'Keshav',
    programme: '[pending]',
    src: '/videos/testimonial-5.mp4',
    poster: '/images/poster-testimonial-5.webp',
    filename: 'Testimonial 4(1).mov',
  },
  {
    id: 4,
    title: 'Ganga — Student Testimonial',
    tag: 'Student Story',
    quote: '"Structured study sessions and hands-on faculty support at the Sector 34-A centre."',
    student: 'Ganga',
    programme: '[pending]',
    src: '/videos/testimonial-new.mp4',
    poster: '/images/poster-testimonial-new.webp',
    filename: 'Testimonial new.mov',
  },
  {
    id: 5,
    title: 'Aditi — Student Testimonial',
    tag: 'Student Story',
    quote: '"Personalised attention and structured roadmap for commerce and finance subjects."',
    student: 'Aditi',
    programme: '[pending]',
    src: '/videos/testimonial-new-2.mp4',
    poster: '/images/poster-testimonial-new-2.webp',
    filename: 'Testimonial new 2.mov',
  },
  {
    id: 6,
    title: 'Saksham — Student Testimonial',
    tag: 'Student Story',
    quote: '"Pursuing ACCA here at Kizen and my learning experience has been very smooth."',
    student: 'Saksham',
    programme: 'ACCA',
    src: '/videos/testimonial-new-3.mp4',
    poster: '/images/poster-testimonial-new-3.webp',
    filename: 'Testimonial new 3.mov',
  },
  {
    id: 7,
    title: 'Student Review — Reception Walkthrough',
    tag: 'Student Story',
    quote: '"The structured teaching and supportive faculty make studying commerce and ACCA so rewarding."',
    student: 'Kizen Student',
    programme: 'Commerce / ACCA',
    src: '/videos/testimonial-6.mp4',
    poster: '/images/poster-testimonial-6.webp',
    filename: 'testimonial-6.mp4',
  },
  {
    id: 8,
    title: 'Harman — ACCA Pathway Testimonial',
    tag: 'Student Story',
    quote: '"Concept clarity is the highest priority here — mentors give personal attention across every paper."',
    student: 'Harman',
    programme: 'ACCA',
    src: '/videos/testimonial-7.mp4',
    poster: '/images/poster-testimonial-7.webp',
    filename: 'testimonial-7.mp4',
  },
]

export default function WallOfFame() {
  useEffect(() => {
    setPageMeta({
      title: 'Wall of Fame | Kizen Education — Student Success Stories & Achievements',
      description: 'The Kizen Education Wall of Fame: celebrating our students\' achievements, top scores, selections and success stories across the 7-year commerce-to-ACCA pathway in Chandigarh.',
      keywords: 'Kizen Education Wall of Fame, Student Success Stories Chandigarh, ACCA Achievements, Commerce Toppers Chandigarh',
      canonicalUrl: 'https://kizeneducation.com/wall-of-fame',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://kizeneducation.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Wall of Fame', 'item': 'https://kizeneducation.com/wall-of-fame' },
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
            <span className="text-gold">Wall of Fame</span>
          </div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">Celebrating Our Students</div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            The Kizen Wall of Fame
          </h1>
          <p className="text-paper/70 text-base lg:text-lg leading-relaxed max-w-2xl">
            Real student experiences, campus milestones, and voices from across the Kizen pathway —
            the stories behind the results.
          </p>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Status strip */}
          <div className="flex items-center gap-3 bg-ivory border border-ink/10 rounded-2xl p-5 mb-12 max-w-3xl">
            <i className="fa-solid fa-circle-check text-emerald-600 text-lg shrink-0"></i>
            <p className="text-sm text-ink/70 leading-relaxed">
              Showing <strong>{WALL_OF_FAME_ENTRIES.length} video testimonials</strong> exclusive to our Wall of Fame.
              Featured clips are also available on the{' '}
              <Link to="/#reviews" className="text-navy font-semibold hover:text-gold transition">homepage</Link>.
            </p>
          </div>

          {/* Cards grid: 9 items in responsive 3-col grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {WALL_OF_FAME_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="bg-ivory rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Media Container */}
                <div className="relative bg-ink/5 overflow-hidden">
                  <video
                    className="w-full aspect-[4/3] object-cover"
                    controls
                    preload="none"
                    poster={entry.poster}
                    playsInline
                  >
                    <source src={entry.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <span className="absolute top-3 left-3 pointer-events-none inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-paper bg-navy/85 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <i className="fa-solid fa-play text-[8px] text-gold"></i>
                    {entry.tag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-ink/90 mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-ink/70 leading-relaxed italic">
                      {entry.quote}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-ink/10 flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-0.5 text-ink/70">
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-user-graduate text-gold text-[11px]"></i>
                        <span>Student: <strong className="text-ink/85">{entry.student}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-ink/50 text-[11px] ml-4">
                        <span>Programme: <strong className="text-ink/70">{entry.programme}</strong></span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-ink/35 uppercase shrink-0">{entry.filename}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube student review callout strip */}
          <div className="mt-14 border border-ink/10 bg-ivory rounded-2xl p-6 lg:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FF0000]/10 flex items-center justify-center text-[#CC0000] shrink-0">
                <i className="fa-brands fa-youtube text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink/85">Looking for more student reviews?</p>
                <p className="text-xs text-ink/55">Watch our featured B.Com &amp; ACCA student review and faculty lectures on YouTube.</p>
              </div>
            </div>
            <a
              href="https://www.youtube.com/watch?v=pNjRwxI_3OE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-paper hover:bg-ink text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-sm shrink-0"
            >
              <i className="fa-brands fa-youtube text-red-500 text-sm"></i>
              Watch B.Com &amp; ACCA Review
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-paper/50"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ============ CAMPUS CULTURE & MOMENTS OF CELEBRATION ============ */}
      <section className="bg-ivory py-20 lg:py-24 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3">Life at Kizen</div>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink">
              Moments of Celebration &amp; Community
            </h2>
            <p className="text-ink/65 text-base mt-3">
              Beyond examinations and syllabus milestones — celebrating student achievements, national festivals, and academic breakthroughs together at our Sector 34-A campus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group bg-ivory rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                <img
                  src="/images/campus-community-celebration.webp"
                  alt="Kizen Education Independence Day Celebration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-navy/85 backdrop-blur-sm text-gold text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Campus Community
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-ink mb-1.5">Independence Day &amp; Student Gathering</h3>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Students and mentors gathered in the institute lobby with the tricolour, celebrating unity and national pride.
                </p>
              </div>
            </div>

            <div className="group bg-ivory rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                <img
                  src="/images/campus-student-celebration.webp"
                  alt="Kizen Students Milestone Celebration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-navy/85 backdrop-blur-sm text-gold text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Milestone Celebration
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-ink mb-1.5">Exam Success &amp; Cake Celebration</h3>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Recognizing batch achievements and paper completions with cake-cutting and peer appreciation.
                </p>
              </div>
            </div>

            <div className="group bg-ivory rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                <img
                  src="/images/campus-classroom-lecture.webp"
                  alt="Live Interactive Commerce Classroom at Kizen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-navy/85 backdrop-blur-sm text-gold text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Learning
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-ink mb-1.5">Interactive Classroom Sessions</h3>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Live problem-solving, digital projector concept breakdowns, and dedicated mentor interaction every week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-ivory py-16 lg:py-20 border-t border-ink/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3">Your Story Next</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mb-6">
            Want to see your name on this wall?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-navy text-paper text-sm font-semibold px-6 py-3 rounded-full hover:bg-ink transition shadow-sm"
            >
              <i className="fa-solid fa-phone text-gold text-xs"></i>
              Talk to a Counsellor
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 border border-navy text-navy text-sm font-semibold px-6 py-3 rounded-full hover:bg-gold/15 transition"
            >
              <i className="fa-solid fa-house text-xs"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

