'use client'

import { motion } from 'framer-motion'
import ParallaxSection from '@/components/effects/ParallaxSection'
import GlowingText from '@/components/effects/GlowingText'
import HoverCard from '@/components/effects/HoverCard'
import ZoeModel from '@/components/3d/ZoeModel'
import { BenefitCard } from '@/components/cards/BenefitCard'
import { DemoSection } from '@/components/sections/DemoSection'
import InteractiveDemo from '@/components/sections/InteractiveDemo'
import { useRouter } from 'next/navigation'

interface Benefit {
  title: string
  description: string
  icon: string
  metrics: Record<string, string>
}

const benefits: Benefit[] = [
  {
    title: "Lead Discovery & Research",
    description: "Zoe automatically finds and qualifies your ideal prospects",
    icon: "🎯",
    metrics: {
      time: "90% faster",
      accuracy: "95% match rate"
    }
  },
  {
    title: "Hyper-Personalized Outreach",
    description: "Every message is tailored to each prospect's specific context",
    icon: "✉️",
    metrics: {
      engagement: "3x higher",
      responses: "40% increase"
    }
  },
  {
    title: "Multi-Channel Orchestration",
    description: "Seamless engagement across email, LinkedIn, and more",
    icon: "🔄",
    metrics: {
      channels: "5+ integrated",
      reach: "200% wider"
    }
  }
]

export default function HomePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001'
    window.location.href = frontendUrl
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection>
        <section className="h-screen relative flex items-center">
          <div className="absolute inset-0 bg-space-black/50 backdrop-blur-sm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <GlowingText className="text-5xl md:text-7xl font-grotesk font-bold mb-6">
                  Book More Calls & Close More Deals At Half The Effort
                </GlowingText>
                <p className="text-xl text-white/80 mb-8">
                  Equip your team with the world's first digital SDR Copilot to help automate your entire outbound workflow and get more time to focus on higher ROI tasks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = 'http://localhost:3001/login'}
                    className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk text-lg text-white"
                  >
                    Try Zoe Free
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-neon-blue/50 rounded-full font-grotesk text-lg hover:bg-neon-blue/10 text-white"
                  >
                    Watch Demo
                  </motion.button>
                </div>
              </motion.div>
              <div className="hidden lg:block h-[600px]">
                {/* <ZoeModel /> */}
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              Meet Zoe, Your AI Sales Copilot
            </GlowingText>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Imagine running all your outbound processes— from start to finish— on autopilot using the power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              See Zoe in Action
            </GlowingText>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience how Zoe transforms your outbound sales process
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Demo Section */}
      <DemoSection />

      {/* Continue with more sections... */}
    </main>
  )
} 