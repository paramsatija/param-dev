'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HoverCard from '@/components/effects/HoverCard'

// Feature card interface
interface FeatureCard {
  title: string
  description: string
  icon: string
  gradient: string
}

const features: FeatureCard[] = [
  {
    title: 'Smart Lead Generation',
    description: 'AI-powered lead sourcing and qualification that never sleeps.',
    icon: '🎯',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    title: 'Automated Outreach',
    description: 'Personalized communication at scale with human-like touch.',
    icon: '✉️',
    gradient: 'from-purple-400 to-pink-500'
  },
  // Add more features...
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Supercharge Your Sales
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <HoverCard key={feature.title} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-space-black/80 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-grotesk font-bold mb-4">{feature.title}</h3>
                <p className="text-soft-white/80 font-inter">{feature.description}</p>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  )
} 