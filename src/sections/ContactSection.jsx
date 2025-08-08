import React from 'react'
import { Element } from 'react-scroll'
import content from '../data/siteContent.json'

export default function ContactSection() {
  const { email, linkedin, github } = content.socials
  const linkCls = "px-5 py-3 rounded-lg border border-white/20 hover:border-primary/60 transition"
  return (
    <Element name="contact">
      <section className="section text-center">
        <h2 className="font-display text-2xl mb-6">Get in Touch</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a className={linkCls} href={email}>Email</a>
          <a className={linkCls} href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className={linkCls} href={github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </Element>
  )
}
