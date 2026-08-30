import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setPageMeta } from '../utils/seo.js'

export default function NotFound() {
  useEffect(() => {
    setPageMeta({
      title: 'Page Not Found — 404 | Kizen Education Chandigarh',
      description: 'The page you requested could not be found. Explore Kizen Education programmes or return to the homepage.',
    })
  }, [])

  return (
    <section className="bg-paper min-h-[70vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-xl text-center">
        <div className="font-serif text-7xl sm:text-8xl font-bold text-gold mb-4">404</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink mb-4">
          Page Not Found
        </h1>
        <p className="text-ink/65 text-sm sm:text-base leading-relaxed mb-8">
          The page you&apos;re looking for might have been moved or does not exist. Explore our 10 continuous commerce and ACCA programmes below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy text-paper font-semibold text-sm px-6 py-3 rounded-full hover:bg-ink transition shadow-md"
          >
            <i className="fa-solid fa-house text-xs"></i> Back to Homepage
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 border border-ink/20 text-ink font-semibold text-sm px-6 py-3 rounded-full hover:border-ink hover:bg-ivory transition"
          >
            Explore Programmes
          </Link>
          <Link
            to="/acca"
            className="inline-flex items-center gap-2 bg-gold text-navy font-semibold text-sm px-6 py-3 rounded-full hover:bg-gold/90 transition shadow-md"
          >
            ACCA Global
          </Link>
        </div>
      </div>
    </section>
  )
}
