import React from 'react'
import { Link } from 'react-scroll'
import logo from '../assets/logo.svg'

export default function NavBar() {
  const linkCls = "cursor-pointer hover:text-primary transition-colors"
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/40 backdrop-blur border-b border-white/10" role="banner">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between" aria-label="Primary">
        <div className="flex items-center gap-3">
          <img src={logo} className="h-6 w-auto" alt="logo" />
          <span className="font-display tracking-widest text-sm">EDRIS JEBRAN</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link to="about" smooth offset={-60} className={linkCls}>About</Link>
          <Link to="experience" smooth offset={-60} className={linkCls}>Experience</Link>
          <Link to="education" smooth offset={-60} className={linkCls}>Education</Link>
          <Link to="hobbies" smooth offset={-60} className={linkCls}>Hobbies</Link>
          <Link to="contact" smooth offset={-60} className={linkCls}>Contact</Link>
        </div>
      </nav>
    </header>
  )
}
