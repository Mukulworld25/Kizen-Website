import Eyebrow from './Eyebrow.jsx'

// Shared video testimonials grid — used on Home (/reviews) and ACCA page.
// Videos live in /public/videos/ and are real institute assets.
export const VIDEO_TESTIMONIALS = [
  { src: './videos/new-reel-kizen.mp4', label: 'Kizen Education Overview', poster: './images/campus-1.webp' },
  { src: './videos/testimonial-2.mp4', label: 'Student Testimonial 2', poster: './images/campus-2.webp' },
  { src: './videos/testimonial-3.mp4', label: 'Student Testimonial 3', poster: './images/campus-3.webp' },
]

export default function VideoTestimonials({ id = 'reviews', eyebrow = 'Trusted by Students & Parents', heading = 'Hear from the Kizen community.' }) {
  return (
    <section id={id} className="bg-paper py-20 lg:py-28 border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mt-2">{heading}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
              <div className="p-4">
                <p className="text-sm font-semibold text-ink/80">{v.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}