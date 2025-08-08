import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function EducationTimeline() {
  return (
    <Element name="education">
      <section className="section">
        <h2 className="font-display text-2xl mb-6">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.education.map((ed, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="card">
              <h3 className="font-semibold">{ed.degree}</h3>
              <div className="text-slate-400 text-sm">{ed.school} <span>• {ed.period}</span></div>
              {ed.details && <ul className="mt-2 list-disc list-inside text-slate-300">
                {ed.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>}
            </motion.div>
          ))}
        </div>
      </section>
    </Element>
  )
}
