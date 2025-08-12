import React from 'react'
import { motion } from 'framer-motion'
import { Element } from 'react-scroll'
import content from '../data/siteContent.json'

export default function CertificationsSection() {
  return (
    <Element name="certifications">
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl mb-8 glow-green"
          >
            Professional Certifications
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border border-slate-700/30 rounded-lg hover:border-primary/40 transition-all duration-300"
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white font-bold text-lg">✓</span>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-slate-200 font-medium"
                >
                  {cert}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </Element>
  )
}
