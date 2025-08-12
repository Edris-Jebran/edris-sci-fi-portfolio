import React from 'react'
import { Link } from 'react-scroll'
import content from '../data/siteContent.json'

export default function NavBar() {
  return (
    <nav role="banner" aria-label="Primary" className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center pulse-glow">
              <span className="text-white font-bold text-sm">EJ</span>
            </div>
            <span className="text-white font-semibold glow">Edris Jebran</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="about" smooth={true} duration={500} className="nav-link cursor-pointer">About</Link>
            <Link to="experience" smooth={true} duration={500} className="nav-link cursor-pointer">Experience</Link>
            <Link to="projects" smooth={true} duration={500} className="nav-link cursor-pointer">Projects</Link>
            <Link to="hobbies" smooth={true} duration={500} className="nav-link cursor-pointer">Hobbies</Link>
            <Link to="contact" smooth={true} duration={500} className="nav-link cursor-pointer">Contact</Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-white hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
