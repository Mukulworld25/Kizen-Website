import { Link } from 'react-router-dom'

// Shared video testimonials grid — used on Home (/reviews) and ACCA page.
// Videos live in /public/videos/ and are real institute assets.
//
// NOTE: The section heading/eyebrow above the cards was REMOVED at client
// request (default choice was "remove entirely"). The previous props were
// eyebrow="Trusted by Students & Parents" / "What Kizen Students Say" (ACCA)
// and heading="Hear from the Kizen community." / "Real students, real
// outcomes." (ACCA). To restore, re-add the header block — props are ignored
// by this component now but still accepted at call sites.
export const VIDEO_TESTIMONIALS = [
  { src: '/videos/testimonial-7.mp4', label: 'Harman — ACCA & Commerce Student Story', poster: '/images/poster-testimonial-7.webp' },
  { src: '/videos/testimonial-new-2.mp4', label: 'Aditi — Managing the ACCA Journey', poster: '/images/poster-testimonial-new-2.webp' },
  { src: '/videos/testimonial-1.mp4', label: 'Mannat — Classroom & Concept Clarity', poster: '/images/poster-testimonial-1.webp' },
  { src: '/videos/testimonial-6.mp4', label: 'Student Review — Campus Learning Experience', poster: '/images/poster-testimonial-6.webp' },
]

// Real social URLs — already in use in Footer.jsx (not placeholders)
const YOUTUBE_URL = 'https://youtube.com/@kizeneducation'
const INSTAGRAM_URL = 'https://www.instagram.com/kizeneducationofficial?stkn=aDhtbnZ0cGsxOTFr'

const SOCIAL_BUTTON_CLS =
  'w-11 h-11 rounded-full bg-ivory border border-ink/10 flex items-center justify-center text-ink/70 hover:text-navy hover:border-gold hover:bg-gold/10 transition-all'

export default function VideoTestimonials({ id = 'reviews' }) {
  return (
    <section id={id} className="bg-paper py-20 lg:py-28 border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Responsive 4-card grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
          {VIDEO_TESTIMONIALS.map((v) => (
            <div
              key={v.src}
              className="bg-ivory rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <video
                className="w-full aspect-video object-cover"
                controls
                preload="none"
                poster={v.poster}
                playsInline
              >
                <source src={v.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-6 lg:p-7">
                <p className="text-base lg:text-lg font-semibold text-ink/85">{v.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See-more strip: social links (real URLs) + Wall of Fame page */}
        <div className="mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <span className="text-sm text-ink/55">More student stories on</span>
          <div className="flex items-center gap-3">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kizen Education on YouTube"
              className={SOCIAL_BUTTON_CLS}
            >
              <i className="fa-brands fa-youtube text-lg"></i>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kizen Education on Instagram"
              className={SOCIAL_BUTTON_CLS}
            >
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
          </div>
          <Link
            to="/wall-of-fame"
            className="inline-flex items-center gap-2.5 bg-navy text-paper text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-ink transition shadow-sm"
          >
            <i className="fa-solid fa-award text-gold text-xs"></i>
            View our Wall of Fame
          </Link>
        </div>
      </div>
    </section>
  )
}
