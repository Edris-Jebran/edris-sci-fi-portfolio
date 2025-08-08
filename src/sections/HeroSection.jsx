import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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

// Interactive holographic sphere with mouse tracking and rotation
function HoloSphere() {
  const meshRef = useRef()
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [hovered, setHovered] = React.useState(false)

  // Handle mouse movement
  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animate sphere rotation and effects
  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
      
      // Mouse-responsive rotation (more pronounced)
      meshRef.current.rotation.x += mousePosition.y * 0.2
      meshRef.current.rotation.y += mousePosition.x * 0.2
      
      // Pulse effect when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <mesh 
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#00FFFF" : "#00F0FF"}
        roughness={0.2}
        metalness={0.9}
        emissive={hovered ? "#00FFFF" : "#00F0FF"}
        emissiveIntensity={hovered ? 0.6 : 0.2}
        wireframe
      />
    </mesh>
  )
}

// Interactive grid horizon that responds to mouse
function GridHorizon() {
  const meshRef = useRef()
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      // Subtle grid movement based on mouse
      meshRef.current.rotation.x = -Math.PI / 2.2 + mousePosition.y * 0.1
      meshRef.current.rotation.z = mousePosition.x * 0.05
    }
  })

  return (
    <mesh ref={meshRef} rotation={[ -Math.PI / 2.2, 0, 0 ]} position={[0, -0.9, -1]}>
      <planeGeometry args={[8, 6, 32, 32]} />
      <meshBasicMaterial color="#0A1E2E" wireframe />
    </mesh>
  )
}

// Floating particles around the sphere
function Particles() {
  const particlesRef = useRef()
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      const time = Math.random() * 100
      const factor = Math.random() * 20 + 10
      const speed = Math.random() * 0.01
      const x = Math.random() * 2 - 1
      const y = Math.random() * 2 - 1
      const z = Math.random() * 2 - 1
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        particle.time += particle.speed
        const mesh = particlesRef.current.children[i]
        if (mesh) {
          mesh.position.x = Math.sin(particle.time) * particle.factor * particle.x
          mesh.position.y = Math.cos(particle.time) * particle.factor * particle.y
          mesh.position.z = Math.sin(particle.time) * particle.factor * particle.z
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
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
          <Canvas camera={{ position: [0, 0, 2.2] }} className="absolute inset-0 pointer-events-auto -z-10">
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 3]} intensity={0.8} />
            <HoloSphere />
            <GridHorizon />
            <Particles />
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
