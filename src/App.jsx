import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ExperienceTimeline from './sections/ExperienceTimeline'
import EducationTimeline from './sections/EducationTimeline'
import ProjectsSection from './sections/ProjectsSection'
import CertificationsSection from './sections/CertificationsSection'
import HobbiesGrid from './sections/HobbiesGrid'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <main id="main" role="main">
        <NavBar />
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <EducationTimeline />
        <ProjectsSection />
        <CertificationsSection />
        <HobbiesGrid />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
