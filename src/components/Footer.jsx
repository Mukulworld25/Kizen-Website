import { Link } from 'react-router-dom'

export default function Footer({ borderTop = false }) {
  const cls = borderTop
    ? 'bg-navy text-paper pt-16 pb-24 lg:pb-8 border-t border-paper/10'
    : 'bg-navy text-paper pt-16 pb-24 lg:pb-8'

  return (
    <footer id="footer" className={cls}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="./kizen-logo.jpg" alt="Kizen Education" className="h-10 w-auto rounded" />
            </Link>
            <p className="text-sm text-paper/60 leading-relaxed">
              From school commerce to a globally recognised qualification — one institute, one pathway in Sector 34-A, Chandigarh.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Programmes</div>
            <ul className="space-y-2.5 text-sm text-paper/70">
                          <li><Link to="/acca" className="hover:text-paper transition">ACCA (Global Finance)</Link></li>
            <li><Link to="/ifrs" className="hover:text-paper transition">IFRS Certification</Link></li>
            <li><Link to="/fintech" className="hover:text-paper transition">FinTech Programme</Link></li>
            <li><Link to="/ai-programmes" className="hover:text-paper transition">AI in Finance</Link></li>
              <li><Link to="/courses#school" className="hover:text-paper transition">11th & 12th Commerce</Link></li>
              <li><Link to="/courses#undergrad" className="hover:text-paper transition">B.Com</Link></li>
              <li><Link to="/courses#undergrad" className="hover:text-paper transition">BBA</Link></li>
              <li><Link to="/courses#postgrad" className="hover:text-paper transition">M.Com / MBA</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Institute</div>
            <ul className="space-y-2.5 text-sm text-paper/70">
              <li><Link to="/about" className="hover:text-paper transition">About Kizen</Link></li>
              <li><Link to="/courses" className="hover:text-paper transition">All Programmes</Link></li>
              <li><Link to="/contact" className="hover:text-paper transition">Contact & Visit</Link></li>
              <li><Link to="/#reviews" className="hover:text-paper transition">Student Reviews</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-bold mb-4">Visit Us</div>
            <ul className="space-y-3 text-sm text-paper/70">
              <li className="flex gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-gold"></i>
                <span>SCO 193-195, Sector 34-A, Chandigarh, 160034</span>
              </li>
              <li className="flex gap-3">
                <i className="fa-solid fa-phone mt-1 text-gold"></i>
                <a href="tel:+917696963377" className="hover:text-gold transition">+91 76969 63377</a>
              </li>
              <li className="flex gap-3">
                <i className="fa-solid fa-clock mt-1 text-gold"></i>
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <div>© {new Date().getFullYear()} Kizen Education. All rights reserved.</div>
          <div className="flex gap-5 text-base">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gold transition"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}