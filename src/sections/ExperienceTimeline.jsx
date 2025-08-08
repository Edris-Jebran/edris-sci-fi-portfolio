import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function ExperienceTimeline() {
  return (
    <Element name="experience">
      <section className="section">
        <h2 className="font-display text-2xl mb-6">Experience</h2>
        <div className="space-y-6">
          {content.experience.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="card">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{job.role} — <span className="text-primary">{job.company}</span></h3>
                <span className="text-xs text-slate-400">{job.period}</span>
              </div>
              <ul className="list-disc list-inside text-slate-300">
                {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </Element>
  )
}
