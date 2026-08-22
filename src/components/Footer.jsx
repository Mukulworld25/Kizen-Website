import { Link } from 'react-router-dom'

export default function Footer({ borderTop = false }) {
  const cls = borderTop
    ? 'bg-navy text-paper pt-16 pb-8 border-t border-paper/10'
    : 'bg-navy text-paper pt-16 pb-8'

  return (
    <footer id="footer" className={cls}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="./kizen-logo.jpg" alt="Kizen Education" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-paper/60 leading-relaxed">From school commerce to a globally recognised qualification — one institute, one pathway.</p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Programmes</div>
            <ul className="space-y-2.5 text-sm text-paper/70">
              <li><Link to="/acca" className="hover:text-paper">ACCA</Link></li>
              <li><Link to="/courses" className="hover:text-paper">11th / 12th Commerce</Link></li>
              <li><Link to="/courses" className="hover:text-paper">B.Com</Link></li>
              <li><Link to="/courses" className="hover:text-paper">BBA</Link></li>
              <li><Link to="/courses" className="hover:text-paper">M.Com / MBA</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Institute</div>
            <ul className="space-y-2.5 text-sm text-paper/70">
              <li><Link to="/about" className="hover:text-paper">About Kizen</Link></li>
              <li><Link to="/courses" className="hover:text-paper">All Courses</Link></li>
              <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
              <li><a href="#reviews" className="hover:text-paper">Google Reviews</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Visit Us</div>
            <ul className="space-y-3 text-sm text-paper/70">
              <li className="flex gap-3"><i className="fa-solid fa-location-dot mt-1 text-gold"></i> SCO 193-195, Sector 34-A, Chandigarh</li>
              <li className="flex gap-3"><i className="fa-solid fa-phone mt-1 text-gold"></i> +91 76969 63377</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <div>© 2024 Kizen Education. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-paper"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-paper"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-paper"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}