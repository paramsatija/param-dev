'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import GlowingBorder from '@/components/effects/GlowingBorder'

const demoSteps = [
  {
    title: "Lead Discovery",
    description: "Watch Zoe identify and qualify prospects",
    animation: "discover"
  },
  {
    title: "Personalization",
    description: "See how Zoe crafts personalized messages",
    animation: "personalize"
  },
  {
    title: "Multi-channel Outreach",
    description: "Experience seamless channel orchestration",
    animation: "outreach"
  }
]

export default function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="relative">
      <GlowingBorder className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {demoSteps.map((step, index) => (
              <motion.button
                key={step.title}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50'
                    : 'hover:bg-white/5'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Animation Display */}
          <div className="relative h-[400px] bg-space-black/50 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Placeholder for actual animations */}
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-white/80">
                    {demoSteps[activeStep].animation} animation
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </GlowingBorder>
    </div>
  )
} 