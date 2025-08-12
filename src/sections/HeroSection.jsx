import React, { Suspense, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Element } from 'react-scroll'
import { Canvas } from '@react-three/fiber'
import { Stars, Grid, OrbitControls } from '@react-three/drei'
import useParallax from '../hooks/useParallax'
import content from '../data/siteContent.json'

// Enhanced 3D Components
function HoloSphere() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#00F0FF"
        emissive="#00F0FF"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  )
}

function Starfield() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  )
}

export default function HeroSection() {
  const offset = useParallax(20)
  const prefersReduced = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  return (
    <Element name="hero">
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Enhanced particle field background */}
        <div className="particle-field"></div>
        
        {/* Enhanced starfield */}
        <Starfield />

        {/* 3D Scene */}
        {!prefersReduced && (
          <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 2.2] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 3]} intensity={0.8} />
              <HoloSphere />
              <Grid args={[10, 10]} cellSize={1} cellThickness={0.5} cellColor="#00F0FF" sectionSize={3} sectionThickness={1} sectionColor="#A020F0" fadeDistance={25} fadeStrength={1} followCamera={false} infiniteGrid={true} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ transform: `translateY(${offset}px)` }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-display text-5xl sm:text-7xl font-bold holographic mb-6"
            >
              {content.hero.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-slate-300 mb-8 float-gentle"
            >
              {content.hero.tagline}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-sci-fi pulse-glow"
              >
                {content.hero.cta}
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex space-x-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </Element>
  )
}
