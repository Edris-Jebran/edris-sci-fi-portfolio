import { useEffect, useRef, useState } from 'react'

export default function useParallax(strength = 15) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const rafIdRef = useRef(0)
  const lastEventRef = useRef(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const onMove = (e) => {
      lastEventRef.current = e
      if (rafIdRef.current) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = 0
        const { innerWidth: w, innerHeight: h } = window
        const event = lastEventRef.current
        const x = ((event.clientX - w / 2) / w) * strength
        const y = ((event.clientY - h / 2) / h) * strength
        setOffset({ x, y })
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [strength])

  return offset
}
