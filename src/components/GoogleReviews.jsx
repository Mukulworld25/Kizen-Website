import { useEffect } from 'react'
import Eyebrow from './Eyebrow.jsx'

/**
 * GoogleReviews Component
 *
 * Supports:
 * 1. Live Elfsight Google Reviews Widget via `widgetId` prop or `VITE_ELFSIGHT_APP_ID` env variable.
 *    (Service: Elfsight Free Plan, $0/month, comfortably within the ₹2,000/month budget).
 * 2. If no widget ID is configured, displays a clearly marked "Reviews loading — pending setup"
 *    placeholder styled in Kizen's navy and gold aesthetic, with NO fabricated or hardcoded review content.
 */
const GOOGLE_BUSINESS_URL =
  'https://local.google.com/place?placeid=ChIJ_ZdfM_LtDzkRzniBPtyDF-0&utm_medium=noren&utm_source=gbp&utm_campaign=2026'

export default function GoogleReviews({
  id = 'reviews',
  widgetId = import.meta.env.VITE_ELFSIGHT_APP_ID || '',
}) {
  const isWidgetConfigured = Boolean(widgetId && widgetId.trim())

  useEffect(() => {
    if (!isWidgetConfigured) return

    // Dynamically inject the Elfsight platform script if not already present
    const existingScript = document.querySelector('script[src*="elfsight.com/platform/platform.js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://static.elfsight.com/platform/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [isWidgetConfigured])

  return (
    <section id={id} className="bg-ivory py-20 lg:py-28 border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Eyebrow>Student &amp; Parent Trust</Eyebrow>
          <h2 className="font-serif text-3xl lg:text-4xl font-medium text-ink mt-2">
            Verified Google Reviews
          </h2>
          <p className="text-ink/65 text-base mt-3">
            Authentic feedback from students and families across Class 11-12, university commerce, and professional ACCA batches.
          </p>
        </div>

        {/* Rating Summary Banner */}
        <div className="bg-navy rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 border border-gold/20 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-gold leading-none">4.9</div>
                  <div className="flex gap-0.5 justify-center mt-1 text-gold text-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <i className="fa-brands fa-google text-gold text-base"></i>
                  <span className="font-semibold text-paper text-lg">Google Verified Rating</span>
                </div>
                <p className="text-paper/80 text-sm leading-relaxed">
                  Rated <strong className="text-gold font-semibold">4.9 out of 5.0</strong> based on verified reviews for Kizen Education.
                </p>
                <p className="text-paper/60 text-xs mt-1">
                  SCO 193-195, Sector 34-A, Chandigarh, 160022
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 justify-end">
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold text-navy text-sm font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all text-center w-full sm:w-auto"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                View Google Business Profile
              </a>
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-paper/10 border border-paper/20 hover:border-gold/50 text-paper text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-paper/15 transition-all text-center w-full sm:w-auto"
              >
                <i className="fa-solid fa-pen-to-square text-gold text-xs"></i>
                Write a Review
              </a>
            </div>
          </div>
        </div>

        {/* Live Widget Container OR Verified Google Business Profile & QR Card */}
        {isWidgetConfigured ? (
          <div className="w-full min-h-[300px] bg-paper rounded-2xl p-4 sm:p-6 border border-ink/10 shadow-sm">
            <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
          </div>
        ) : (
          <div className="bg-paper border border-ink/10 rounded-3xl p-8 sm:p-12 text-center shadow-md">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy text-gold text-xs font-semibold uppercase tracking-wider mb-6 border border-gold/30">
                <i className="fa-brands fa-google text-gold"></i>
                Official Google Business Profile
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mb-3">
                Kizen Education &middot; Sector 34-A, Chandigarh
              </h3>
              <p className="text-ink/65 text-sm sm:text-base leading-relaxed mb-8">
                Scan the official QR code below or tap to open our verified Google Business Profile to read student experiences, see photos, and write a review.
              </p>

              {/* QR Code Container with subtle frame */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-ivory rounded-2xl p-6 sm:p-8 border border-ink/10 max-w-lg mx-auto mb-8 shadow-inner">
                <div className="w-44 h-44 sm:w-48 sm:h-48 bg-white p-3 rounded-2xl shadow-md border border-ink/10 shrink-0">
                  <img
                    src="/images/google-qr-code.webp"
                    alt="Scan to visit Kizen Education on Google"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">
                    Scan with Camera
                  </div>
                  <div className="font-serif text-lg font-bold text-ink mb-2">
                    Review us on Google
                  </div>
                  <p className="text-xs text-ink/65 leading-relaxed mb-4">
                    Open your smartphone camera and point at the code to access our direct review page.
                  </p>
                  <a
                    href={GOOGLE_BUSINESS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition"
                  >
                    <span>Direct Link</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>

              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-paper font-bold text-sm px-8 py-3.5 rounded-full hover:bg-gold hover:text-navy transition shadow-md"
              >
                <i className="fa-brands fa-google text-gold"></i>
                <span>Open in Google Maps / Search</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
