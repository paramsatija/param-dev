'use client'

import { motion } from 'framer-motion'
import GlowingText from '@/components/effects/GlowingText'
import HoverCard from '@/components/effects/HoverCard'
import GlowingBorder from '@/components/effects/GlowingBorder'
import ComparisonTable from '@/components/features/ComparisonTable'

const features = [
  {
    title: "Intelligent Lead Research",
    description: "AI-powered lead discovery and enrichment",
    details: [
      "Automated prospect identification",
      "Deep data enrichment",
      "Smart qualification",
      "Real-time validation"
    ],
    metrics: {
      accuracy: "95%",
      speed: "90% faster",
      coverage: "200+ data points"
    },
    icon: "🎯"
  },
  {
    title: "Hyper-Personalized Outreach",
    description: "Context-aware messaging that converts",
    details: [
      "Dynamic personalization",
      "Industry-specific insights",
      "Pain point targeting",
      "Tone matching"
    ],
    metrics: {
      engagement: "3x higher",
      responses: "40% increase",
      relevance: "100% targeted"
    }
  },
  // ... (more features)
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              Everything You Need For Outbound Success
            </GlowingText>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Zoe combines advanced AI with proven sales strategies to supercharge your outbound efforts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingBorder>
                  <div className="p-8">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/80 mb-6">{feature.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      {feature.details.map((detail) => (
                        <div key={detail} className="flex items-center space-x-2">
                          <span className="text-neon-blue">→</span>
                          <span className="text-white/80">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(feature.metrics).map(([key, value]) => (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
                        >
                          <div className="text-white/60 text-sm capitalize">{key}</div>
                          <div className="text-white font-mono">{value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlowingBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              Why Choose Zoe?
            </GlowingText>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See how Zoe compares to traditional outbound tools
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>
    </main>
  )
} 