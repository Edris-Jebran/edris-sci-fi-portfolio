import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import content from '../data/siteContent.json'
import useParallax from '../hooks/useParallax'

// Error boundary for Three.js components
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Three.js error caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return null // Fallback to just stars
    }
    return this.props.children
  }
}

function Starfield() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) return null
  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="absolute inset-0 -z-10">
      <Stars radius={100} depth={50} count={window.innerWidth < 640 ? 1200 : 3000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  )
}

// Simple holographic sphere with scanline material
function HoloSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.75, 64, 64]} />
      <meshStandardMaterial
        color="#00F0FF"
        roughness={0.2}
        metalness={0.9}
        emissive="#00F0FF"
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  )
}

// Background grid plane to add futuristic depth
function GridHorizon() {
  return (
    <mesh rotation={[ -Math.PI / 2.2, 0, 0 ]} position={[0, -0.9, -1]}>
      <planeGeometry args={[8, 6, 32, 32]} />
      <meshBasicMaterial color="#0A1E2E" wireframe />
    </mesh>
  )
}

export default function HeroSection() {
  const offset = useParallax(20)
  const prefersReduced = useMemo(() => {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      <Suspense fallback={null}>
        <Starfield />
      </Suspense>

      {/* r3f holographic scene */}
      {!prefersReduced && (
        <ThreeJSErrorBoundary>
          <Canvas camera={{ position: [0, 0, 2.2] }} className="absolute inset-0 pointer-events-none -z-10">
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 3]} intensity={0.8} />
            <HoloSphere />
            <GridHorizon />
          </Canvas>
        </ThreeJSErrorBoundary>
      )}

      {/* UI content */}
      <div className="section pt-24" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-6xl font-bold glow"
        >
          {content.hero.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 text-lg text-slate-300"
        >
          {content.hero.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.2 }} className="mt-10 flex gap-4">
          <a href="#experience" className="btn-sci-fi px-5 py-3 rounded-lg bg-primary/20 border border-primary/40 hover:shadow-neon transition">Explore</a>
          {/* <a href={content.cv.downloadUrl} className="btn-sci-fi px-5 py-3 rounded-lg border border-white/20 hover:border-primary/60 transition">Download CV</a> */}
        </motion.div>
      </div>
    </section>
  )
}
