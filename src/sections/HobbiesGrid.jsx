import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function HobbiesGrid() {
  return (
    <Element name="hobbies">
      <section className="section">
        <h2 className="font-display text-2xl mb-6">Hobbies</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {content.hobbies.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35, delay: i * 0.05 }}
              className="card hover:shadow-neon transition">
              <h3 className="font-semibold">{h.name}</h3>
              <p className="text-slate-300">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Element>
  )
}
