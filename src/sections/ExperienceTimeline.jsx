import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function ExperienceTimeline() {
  return (
    <Element name="experience">
      <section className="section">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl mb-6 glow"
        >
          Professional Experience
        </motion.h2>
        <div className="space-y-6">
          {content.experience.map((job, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} 
              transition={{ duration: 0.4, delay: i * 0.1 }} 
              className="card hover:border-primary/40"
            >
              <div className="flex items-center justify-between mb-3">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                  className="font-semibold text-lg glow-purple"
                >
                  {job.role} — <span className="text-primary">{job.company}</span>
                </motion.h3>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
                >
                  {job.period}
                </motion.span>
              </div>
              <motion.ul 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="list-disc list-inside text-slate-300 space-y-1"
              >
                {job.highlights.map((h, j) => (
                  <motion.li 
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.4 + j * 0.1 }}
                    className="hover:text-primary transition-colors"
                  >
                    {h}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </section>
    </Element>
  )
}
