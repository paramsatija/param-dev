'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GlowingText from '@/components/effects/GlowingText'
import HoverCard from '@/components/effects/HoverCard'

export function DemoSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your demo email logic here
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
            Experience An Email From Zoe
          </GlowingText>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Curious about our AI-powered email personalization? Enter your email below and experience how Zoe engages with prospects.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <HoverCard>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-space-black/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  placeholder="Enter your work email"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk text-lg text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get an email from Zoe'}
              </motion.button>
            </form>
          </HoverCard>
        </div>
      </div>
    </section>
  )
} 