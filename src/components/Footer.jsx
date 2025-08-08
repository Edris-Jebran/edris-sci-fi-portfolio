import React from 'react'

export default function Footer() {
  return (
    <footer className="section pt-10">
      <div className="text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Edris Jebran • All rights reserved.
      </div>
    </footer>
  )
}
