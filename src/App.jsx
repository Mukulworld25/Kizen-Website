import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'

// Lazy-load secondary route components on demand while serving Home immediately
const Acca = lazy(() => import('./pages/Acca.jsx'))
const Courses = lazy(() => import('./pages/Courses.jsx'))
const Fintech = lazy(() => import('./pages/Fintech.jsx'))
const Ifrs = lazy(() => import('./pages/Ifrs.jsx'))
const AiProgrammes = lazy(() => import('./pages/AiProgrammes.jsx'))
const CorporateTraining = lazy(() => import('./pages/CorporateTraining.jsx'))
const InstitutionSchools = lazy(() => import('./pages/InstitutionSchools.jsx'))
const InstitutionColleges = lazy(() => import('./pages/InstitutionColleges.jsx'))
const InstitutionInstitutes = lazy(() => import('./pages/InstitutionInstitutes.jsx'))
const Resources = lazy(() => import('./pages/Resources.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const WallOfFame = lazy(() => import('./pages/WallOfFame.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        <span className="text-[11px] font-bold text-ink/45 uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  )
}

function FooterShell() {
  const { pathname } = useLocation()
  // The ACCA page's exported footer carries border-t border-paper/10
  return <Footer borderTop={pathname === '/acca'} />
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-sans text-ink antialiased">
        <Header />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/acca" element={<Acca />} />
              <Route path="/fintech" element={<Fintech />} />
              <Route path="/ifrs" element={<Ifrs />} />
              <Route path="/corporate-training" element={<CorporateTraining />} />
              <Route path="/institutions/schools" element={<InstitutionSchools />} />
              <Route path="/institutions/colleges" element={<InstitutionColleges />} />
              <Route path="/institutions/institutes" element={<InstitutionInstitutes />} />
              <Route path="/ai-programmes" element={<AiProgrammes />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wall-of-fame" element={<WallOfFame />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <FooterShell />
        <StickyMobileCTA />
        <FloatingActions />
      </div>
    </BrowserRouter>
  )
}