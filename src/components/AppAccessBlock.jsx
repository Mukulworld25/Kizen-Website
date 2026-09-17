// ---------------------------------------------------------------------------
// Shared "App Access" block — rendered on the About page (full variant) and
// in the Footer (compact variant) so the copy and badges stay in sync.
//
// TODO(client): REAL APP COPY NEEDED — no existing Kizen app description was
// found anywhere in the codebase or provided content, so the sentence below
// is the agreed generic placeholder. Replace with client-approved copy.
//
// iOS app store link status unconfirmed, using DISABLED PLACEHOLDER until
// confirmed. The badge is shown greyed-out and non-clickable (no URL wired).
// ---------------------------------------------------------------------------

// Live, real domain URL — but the APP-SPECIFIC listing URL is unconfirmed.
// TODO(client): replace with the real Kizen app listing URL, e.g.
// https://play.google.com/store/apps/details?id=<package.name>
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps'

export default function AppAccessBlock({ compact = false }) {
  if (compact) {
    return (
      <div className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex items-start gap-3 max-w-sm">
            <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-mobile-screen-button text-gold"></i>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">About the App</div>
              <p className="text-sm text-paper/60 leading-relaxed">
                Kizen mobile app — access your courses, schedule, and resources on the go.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:ml-auto">
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="inline-flex bg-paper rounded-md px-2 py-1.5 hover:opacity-85 transition"
            >
              <img src="./store-badges/google-play-badge.png" alt="Get it on Google Play" className="h-10 w-auto" loading="lazy" />
            </a>
            <span
              title="iOS app — App Store link pending confirmation"
              aria-disabled="true"
              className="inline-flex opacity-50 grayscale cursor-not-allowed select-none bg-paper rounded-md px-2 py-1.5"
            >
              <img src="./store-badges/app-store-badge.svg" alt="Download on the App Store (coming soon)" className="h-9 w-auto" loading="lazy" />
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full variant (About page)
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">App Access</div>
        <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight text-paper mb-5">
          The Kizen mobile app, in every student's pocket.
        </h2>
        <p className="text-paper/70 text-base lg:text-lg leading-relaxed mb-8">
          Access your courses, schedule, and resources on the go.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="inline-flex bg-paper rounded-md px-2.5 py-2 hover:opacity-85 transition"
          >
            <img src="./store-badges/google-play-badge.png" alt="Get it on Google Play" className="h-12 w-auto" loading="lazy" />
          </a>
          <span
            title="iOS app — App Store link pending confirmation"
            aria-disabled="true"
            className="inline-flex opacity-50 grayscale cursor-not-allowed select-none bg-paper rounded-md px-2.5 py-2"
          >
            <img src="./store-badges/app-store-badge.svg" alt="Download on the App Store (coming soon)" className="h-11 w-auto" loading="lazy" />
          </span>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-64 h-[420px] rounded-[2.5rem] border-4 border-paper/20 bg-gradient-to-b from-paper/10 to-transparent flex items-center justify-center shadow-2xl">
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/15 flex items-center justify-center mb-4">
              <i className="fa-solid fa-mobile-screen-button text-2xl text-gold"></i>
            </div>
            <div className="font-serif text-lg text-paper font-semibold">Kizen App</div>
            <p className="text-xs text-paper/50 mt-2 leading-relaxed">Courses · Schedule · Resources</p>
          </div>
        </div>
      </div>
    </div>
  )
}
