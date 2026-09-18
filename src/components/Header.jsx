import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getCtaText } from '../utils/seo.js'

// ---------------------------------------------------------------------------
// NAVIGATION MODEL
// - Plain items render as simple links.
// - Items with `dropdown` render:
//     * Desktop: hover (and keyboard-focus) dropdown panel
//     * Mobile: tap-to-expand accordion inside the glass drawer
// - FinTech & IFRS now live under Courses > Commerce (routes unchanged).
// - Institutions is a new dropdown: Schools / Colleges / Institutes.
// - AI keeps its dropdown: AI in Finance + Corporate Training (Task 4 page).
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  {
    label: 'Courses',
    to: '/courses',
    dropdown: [
      {
        heading: 'Commerce',
        items: [
          { label: 'FinTech Programme', to: '/fintech', desc: 'AI, digital payments, robo-advisory & blockchain' },
          { label: 'IFRS Certification', to: '/ifrs', desc: 'Global financial reporting standards (DipIFR)' },
        ],
      },
    ],
  },
  { label: 'ACCA', to: '/acca' },
  {
    label: 'Institutions',
    to: '/institutions/schools',
    dropdown: [
      {
        heading: 'Partner With Kizen',
        items: [
          { label: 'Schools', to: '/institutions/schools', desc: 'School AI Learning for Classes 5-12' },
          { label: 'Colleges', to: '/institutions/colleges', desc: 'AI capstone internship & project experience' },
          { label: 'Institutes', to: '/institutions/institutes', desc: 'AI Job Ready & corporate training' },
        ],
      },
    ],
  },
  {
    label: 'AI',
    to: '/ai-programmes',
    dropdown: [
      {
        heading: 'AI Programmes',
        items: [
          { label: 'AI in Finance', to: '/ai-programmes', desc: 'ML, deep learning & NLP for finance careers' },
          { label: 'Corporate Training', to: '/corporate-training', desc: 'Practical AI upskilling for working professionals' },
        ],
      },
    ],
  },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState({})
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const ctaHref = pathname === '/contact' ? '#form' : '#enquiry'
  const ctaText = getCtaText(pathname)

  // Auto-close mobile menu (and any expanded accordion) on route change
  useEffect(() => {
    setOpen(false)
    setExpanded({})
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

  // Scroll-aware shadow: strengthen the pill shadow once the user scrolls,
  // so the sticky header stays visually separated from page content site-wide.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = ({ isActive }) =>
    isActive
      ? 'bg-navy text-paper font-semibold px-3 py-1.5 rounded-full shadow-sm text-xs xl:text-[13px] tracking-wide transition-all'
      : 'text-ink/75 hover:text-navy hover:bg-gold/15 px-2.5 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all duration-200'

  const close = () => setOpen(false)

  // A dropdown parent is highlighted when the current route is one of its children
  const isSectionActive = (item) =>
    pathname === item.to ||
    item.dropdown?.some((g) => g.items.some((s) => pathname === s.to || pathname.startsWith(s.to + '/')))

  const dropdownParentClass = (item) =>
    isSectionActive(item)
      ? 'bg-navy text-paper font-semibold px-3 py-1.5 rounded-full shadow-sm text-xs xl:text-[13px] tracking-wide transition-all inline-flex items-center gap-1.5'
      : 'text-ink/75 hover:text-navy hover:bg-gold/15 px-2.5 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all duration-200 inline-flex items-center gap-1.5'

  return (
    <header id="header" className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 pointer-events-none">
      <div className={`relative z-50 max-w-[1440px] mx-auto backdrop-blur-xl border rounded-full transition-all duration-300 px-4 sm:px-6 h-[68px] sm:h-[76px] lg:h-[78px] flex items-center justify-between pointer-events-auto ${
        scrolled
          ? 'bg-paper/95 border-ink/15 shadow-xl shadow-black/[0.10]'
          : 'bg-paper/85 border-ink/10 shadow-lg shadow-black/[0.04]'
      } ${scrolled ? 'hover:border-gold/30' : 'hover:border-gold/30 hover:shadow-xl'}`}>
        {/* Brand Logo — prominently sized wide wordmark */}
        <Link to="/" className="flex items-center group shrink-0" aria-label="Kizen Education Home">
          <div className="h-10 sm:h-[54px] lg:h-[58px] w-[150px] sm:w-[220px] lg:w-[250px] overflow-hidden rounded-xl bg-[#18334e] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <img
              src="/kizen-logo.jpg"
              alt="Kizen Education"
              className="h-[215%] w-auto max-w-none object-contain pointer-events-none select-none"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px]">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <NavLink to={item.to} className={() => dropdownParentClass(item)}>
                  {item.label}
                  <i className="fa-solid fa-chevron-down text-[9px] opacity-60 transition-transform duration-200 group-hover:rotate-180"></i>
                </NavLink>

                {/* Hover dropdown panel (also opens on keyboard focus) */}
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200">
                  <div className="w-64 bg-paper/95 backdrop-blur-xl border border-ink/10 rounded-2xl shadow-xl shadow-black/[0.08] p-2.5">
                    {item.dropdown.map((group) => (
                      <div key={group.heading}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold px-3 pt-2 pb-1">{group.heading}</div>
                        {group.items.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className="block px-3 py-2 rounded-xl text-ink/75 hover:text-navy hover:bg-gold/15 transition-all duration-150"
                          >
                            <span className="block text-xs font-semibold">{sub.label}</span>
                            <span className="block text-[11px] text-ink/45 leading-snug mt-0.5">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              ) : (
                <NavLink key={item.label} to={item.to} className={navClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              )
            )}
        </nav>

        {/* Right CTA Actions — primary CTA (top-right, desktop) */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href={ctaHref}
            className="cta-pulse bg-gradient-to-r from-gold via-amber-400 to-gold text-navy text-sm xl:text-[15px] font-bold px-6 py-2.5 xl:px-7 rounded-full hover:shadow-md hover:shadow-gold/30 active:scale-95 transition-all whitespace-nowrap"
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink hover:text-navy hover:border-gold hover:bg-gold/10 transition-all"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-base`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Glass Drawer */}
      <div
        className={`fixed inset-0 top-0 z-40 transition-all duration-300 pointer-events-auto ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close}></div>

        {/* Drawer */}
        <div
          className={`absolute top-2.5 right-2.5 left-2.5 sm:top-3 sm:right-6 sm:left-auto w-auto sm:w-96 max-h-[85vh] overflow-y-auto bg-paper/95 backdrop-blur-xl border border-ink/10 rounded-3xl shadow-2xl transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          <nav className="p-4 space-y-1.5 text-sm">
            {NAV_ITEMS.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="rounded-2xl bg-ivory/60 border border-ink/5 overflow-hidden">
                  {/* Tap-to-expand accordion */}
                  <button
                    type="button"
                    onClick={() => setExpanded({ ...expanded, [item.label]: !expanded[item.label] })}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-all ${
                      isSectionActive(item)
                        ? 'bg-navy text-paper font-semibold'
                        : 'text-ink/80 font-medium hover:bg-gold/15'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <i className={`fa-solid ${item.label === 'AI' ? 'fa-brain' : item.label === 'Institutions' ? 'fa-graduation-cap' : 'fa-book'} text-xs text-gold`}></i>
                      {item.label}
                    </span>
                    <i
                      className={`fa-solid fa-chevron-down text-[10px] opacity-70 transition-transform duration-300 ${
                        expanded[item.label] ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>

                  {/* Accordion body */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expanded[item.label] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    {item.dropdown.map((group) => (
                      <div key={group.heading} className="pb-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold px-4 pt-2 pb-1">
                          {group.heading}
                        </div>
                        {group.items.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={`block mx-2.5 px-3 py-2 rounded-xl transition-all ${
                              pathname === sub.to
                                ? 'bg-navy/10 text-navy font-semibold'
                                : 'text-ink/75 hover:text-navy hover:bg-gold/15'
                            }`}
                          >
                            <span className="block text-[13px] font-semibold">{sub.label}</span>
                            <span className="block text-[11px] text-ink/45 leading-snug mt-0.5">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-navy text-paper font-semibold'
                        : 'text-ink/80 font-medium hover:bg-gold/15'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}

            {/* Drawer CTA */}
            <div className="pt-3 px-1">
              <Link
                to="/contact"
                onClick={close}
                className="flex items-center justify-center gap-2.5 w-full bg-navy text-paper font-semibold text-sm px-5 py-3.5 rounded-full hover:bg-ink transition shadow-sm"
              >
                <i className="fa-solid fa-phone text-gold text-xs"></i>
                {ctaText}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

