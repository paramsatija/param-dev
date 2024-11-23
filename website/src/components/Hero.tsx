'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ZoeModel from './3d/ZoeModel'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-space-black">
        <div className="stars" />
        <div className="constellations" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-grotesk text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Meet Your AI SDR Copilot
            </h1>
            <p className="mt-6 text-soft-white font-inter text-xl">
              Transform your B2B sales with Zoe, the intelligent assistant that handles lead generation, outreach, and scheduling.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk text-lg animate-glow"
            >
              Start Your AI Journey
            </motion.button>
          </motion.div>

          {/* 3D Model */}
          {mounted && (
            <div className="h-[600px] w-full">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <ZoeModel />
              </Canvas>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 