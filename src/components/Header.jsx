import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'ACCA', to: '/acca' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const ctaHref = pathname === '/contact' ? '#form' : '#enquiry'

  const navClass = ({ isActive }) =>
    isActive ? 'text-ink border-b-2 border-gold pb-1' : 'text-ink/70 hover:text-ink transition'

  const close = () => setOpen(false)

  return (
    <header id="header" className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto h-20 flex items-center justify-between pr-6 lg:pr-12 pl-0">
        <Link to="/" className="flex items-center h-full">
          <img src="./kizen-logo.jpg" alt="Kizen Education" className="h-16 lg:h-20 w-auto object-contain object-left" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a href="tel:+917696963377" className="flex items-center gap-2 text-sm font-semibold text-ink/80">
            <i className="fa-solid fa-phone text-gold"></i> +91 76969 63377
          </a>
          <a href={ctaHref} className="bg-navy text-paper text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-ink transition whitespace-nowrap">Talk to an ACCA Counsellor</a>
        </div>

        <button className="lg:hidden text-xl" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-paper border-t border-ink/10 px-6 py-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'block text-ink border-b-2 border-gold pb-1 w-fit font-medium'
                  : 'block text-ink/70 hover:text-ink font-medium'
              }
              end={item.to === '/'}
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <a
              href={ctaHref}
              className="block w-full bg-navy text-paper text-center text-sm font-semibold px-5 py-3 rounded-full hover:bg-ink transition"
              onClick={close}
            >
              Talk to an ACCA Counsellor
            </a>
          </div>
        </div>
      )}
    </header>
  )
}