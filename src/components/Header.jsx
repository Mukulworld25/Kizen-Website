import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getCtaText } from '../utils/seo.js'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'ACCA', to: '/acca' },
  { label: 'FinTech', to: '/fintech' },
  { label: 'IFRS', to: '/ifrs' },
  { label: 'AI', to: '/ai-programmes' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const ctaHref = pathname === '/contact' ? '#form' : '#enquiry'
  const ctaText = getCtaText(pathname)

  // Auto-close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navClass = ({ isActive }) =>
    isActive
      ? 'bg-navy text-paper font-semibold px-3 py-1.5 rounded-full shadow-sm text-xs xl:text-[13px] tracking-wide transition-all'
      : 'text-ink/75 hover:text-navy hover:bg-gold/15 px-2.5 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all duration-200'

  const close = () => setOpen(false)

  return (
    <header id="header" className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 pointer-events-none">
      <div className="relative z-50 max-w-[1440px] mx-auto bg-paper/85 backdrop-blur-xl border border-ink/10 rounded-full shadow-lg shadow-black/[0.04] hover:border-gold/30 hover:shadow-xl transition-all duration-300 px-4 sm:px-6 h-16 sm:h-[68px] flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src="./kizen-logo.jpg"
            alt="Kizen Education"
            className="h-9 sm:h-11 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px]">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          <a
            href="tel:+917696963377"
            className="hidden xl:flex items-center gap-2 text-xs xl:text-sm font-semibold text-ink/80 hover:text-navy bg-ivory/80 border border-ink/10 px-3.5 py-1.5 rounded-full transition-all"
          >
            <i className="fa-solid fa-phone text-gold text-xs"></i>
            <span>+91 76969 63377</span>
          </a>
          <a
            href={ctaHref}
            className="bg-gradient-to-r from-gold via-amber-400 to-gold text-navy text-xs xl:text-sm font-bold px-4.5 py-2 rounded-full hover:shadow-md hover:shadow-gold/30 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden w-11 h-11 rounded-full bg-ivory border border-ink/10 flex items-center justify-center text-ink hover:text-gold transition shadow-sm active:scale-95"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-base`}></i>
        </button>
      </div>

      {/* Mobile Glassmorphism Dropdown Drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 lg:hidden pointer-events-auto" onClick={close}></div>
          <div className="lg:hidden mt-2 relative z-50 max-w-[1440px] mx-auto bg-paper/95 backdrop-blur-2xl border border-ink/15 rounded-3xl p-5 shadow-2xl space-y-3 pointer-events-auto transition-all">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'block bg-navy text-paper font-semibold text-xs px-3.5 py-2.5 rounded-xl text-center shadow-sm'
                    : 'block bg-ivory/80 text-ink/80 hover:text-navy hover:bg-gold/15 text-xs font-medium px-3.5 py-2.5 rounded-xl text-center border border-ink/5 transition'
                }
                end={item.to === '/'}
                onClick={close}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-ink/10 space-y-2">
            <a
              href="tel:+917696963377"
              className="flex items-center justify-center gap-2 w-full bg-ivory border border-ink/10 text-ink/90 text-xs font-semibold py-2.5 rounded-xl"
              onClick={close}
            >
              <i className="fa-solid fa-phone text-gold"></i>
              <span>+91 76969 63377</span>
            </a>
            <a
              href={ctaHref}
              className="block w-full bg-gradient-to-r from-gold via-amber-400 to-gold text-navy text-center text-xs font-bold py-2.5 rounded-xl hover:shadow-md transition"
              onClick={close}
            >
              {ctaText}
            </a>
          </div>
        </div>
        </>
      )}
    </header>
  )
}