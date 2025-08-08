import React from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'

export default function ContactSection() {
  const { email, linkedin, github } = content.socials
  const linkCls = "btn-sci-fi px-5 py-3 rounded-lg border border-white/20 hover:border-primary/60 transition pulse-glow"
  
  return (
    <Element name="contact">
      <section className="section text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl mb-6 glow"
        >
          Get in Touch
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={linkCls} 
            href={email}
          >
            Email
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={linkCls} 
            href={linkedin} 
            target="_blank" 
            rel="noreferrer"
          >
            LinkedIn
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={linkCls} 
            href={github} 
            target="_blank" 
            rel="noreferrer"
          >
            GitHub
          </motion.a>
        </motion.div>
      </section>
    </Element>
  )
}
