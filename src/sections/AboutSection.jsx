import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function AboutSection() {
  return (
    <Element name="about">
      <section className="section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="card grid-bg"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-2xl mb-3 glow"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 mb-4"
          >
            {content.about.summary}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-400 float-animation mb-6"
          >
            Based in {content.about.location}
          </motion.p>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <h3 className="font-display text-lg mb-3 glow-purple">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {content.about.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="skill-tag"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="font-display text-lg mb-3 glow-green">Key Achievements</h3>
            <ul className="space-y-2">
              {content.achievements.map((achievement, index) => (
                <motion.li
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-slate-300 flex items-start gap-2"
                >
                  <span className="text-primary mt-1">▸</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>
    </Element>
  )
}
