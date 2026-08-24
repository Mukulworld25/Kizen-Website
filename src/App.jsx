import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import Home from './pages/Home.jsx'
import Acca from './pages/Acca.jsx'
import Courses from './pages/Courses.jsx'
import Resources from './pages/Resources.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function FooterShell() {
  const { pathname } = useLocation()
  // The ACCA page's exported footer carries border-t border-paper/10
  return <Footer borderTop={pathname === '/acca'} />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-ink antialiased">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acca" element={<Acca />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <FooterShell />
        <StickyMobileCTA />
        <FloatingActions />
      </div>
    </BrowserRouter>
  )
}