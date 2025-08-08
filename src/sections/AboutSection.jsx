import React from 'react'
import { Element } from 'react-scroll'
import content from '../data/siteContent.json'

export default function AboutSection() {
  return (
    <Element name="about">
      <section className="section">
        <div className="card">
          <h2 className="font-display text-2xl mb-3">About Me</h2>
          <p className="text-slate-300">{content.about.summary}</p>
          <p className="mt-2 text-slate-400">Based in {content.about.location}</p>
        </div>
      </section>
    </Element>
  )
}
