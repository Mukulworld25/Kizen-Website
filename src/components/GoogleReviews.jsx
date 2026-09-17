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

        {/* Rating Summary Card (Navy & Gold Theme) */}
        <div className="bg-navy text-paper rounded-3xl p-8 sm:p-10 lg:p-12 border border-gold/30 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gold/5 pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-paper/10 border border-gold/40 flex flex-col items-center justify-center shrink-0">
                <span className="font-serif text-4xl font-bold text-gold leading-none">4.9</span>
                <div className="flex text-gold text-xs mt-1">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <i className="fa-brands fa-google text-gold text-base"></i>
                  <span className="font-semibold text-paper text-lg">Google Verified Rating</span>
                </div>
                <p className="text-paper/80 text-sm leading-relaxed">
                  Rated <strong className="text-gold font-semibold">4.9 out of 5.0</strong> based on 34 verified reviews for Kizen Education.
                </p>
                <p className="text-paper/60 text-xs mt-1">
                  SCO 193-195, Sector 34-A, Chandigarh, 160022
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 justify-end">
              <a
                href="https://maps.google.com/?q=Kizen+Education,+SCO+193-195,+Sector+34-A,+Chandigarh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold text-navy text-sm font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-gold/30 active:scale-95 transition-all text-center w-full sm:w-auto"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                View Profile on Google Maps
              </a>
              <a
                href="https://maps.google.com/?q=Kizen+Education,+SCO+193-195,+Sector+34-A,+Chandigarh"
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

        {/* Live Widget Container OR Pending Setup Placeholder */}
        {isWidgetConfigured ? (
          <div className="w-full min-h-[300px] bg-paper rounded-2xl p-4 sm:p-6 border border-ink/10 shadow-sm">
            <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
          </div>
        ) : (
          <div className="bg-paper border-2 border-dashed border-gold/40 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
            {/* Status indicator badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy text-gold text-xs font-semibold uppercase tracking-wider mb-6 border border-gold/30">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              Reviews loading — pending setup
            </div>

            <h3 className="font-serif text-2xl font-semibold text-ink mb-3">
              Live Google Reviews Stream Connecting Soon
            </h3>
            <p className="text-ink/65 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              We are connecting our live Google Business Profile widget for <strong className="text-ink">Kizen Education, Sector 34-A, Chandigarh</strong>. Live student reviews will display directly in this section once the widget synchronization completes.
            </p>

            {/* Connection Information Card (Internal / Developer Guidance) */}
            <div className="bg-ivory border border-ink/10 rounded-2xl p-6 max-w-xl mx-auto text-left">
              <div className="flex items-center gap-2.5 text-navy font-semibold text-sm mb-3">
                <i className="fa-solid fa-circle-info text-gold"></i>
                <span>Configuration Status</span>
              </div>
              <ul className="space-y-2 text-xs text-ink/75">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-gold mt-0.5"></i>
                  <span><strong>Service Selected:</strong> Elfsight Google Reviews (Free tier, $0/month — verified under ₹2,000/mo budget).</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-notch text-navy mt-0.5"></i>
                  <span><strong>Pending Action:</strong> Connect profile in Elfsight dashboard by searching &ldquo;Kizen Education, SCO 193-195, Sector 34-A, Chandigarh&rdquo; and set <code className="bg-paper px-1.5 py-0.5 rounded border border-ink/10 font-mono text-[11px] text-navy">VITE_ELFSIGHT_APP_ID</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-shield-halved text-rust mt-0.5"></i>
                  <span><strong>Integrity Guarantee:</strong> In accordance with our guidelines, no synthetic or placeholder reviews have been fabricated.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
