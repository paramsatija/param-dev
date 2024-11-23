'use client'

import { motion } from 'framer-motion'
import HoverCard from '@/components/effects/HoverCard'

const aiFeatures = [
  {
    title: 'Advanced NLP Engine',
    description: 'Our proprietary NLP engine understands context, sentiment, and intent.',
    icon: '🧠',
    capabilities: [
      'Multi-language support',
      'Context awareness',
      'Sentiment analysis',
      'Intent recognition'
    ],
    metrics: {
      value: '95%',
      label: 'Accuracy in intent detection'
    }
  },
  {
    title: 'Smart Personalization',
    description: 'Dynamic content generation based on prospect data and behavior.',
    icon: '✨',
    capabilities: [
      'Dynamic templating',
      'Behavioral adaptation',
      'A/B testing',
      'Performance optimization'
    ],
    metrics: {
      value: '80%',
      label: 'Higher engagement rates'
    }
  },
  {
    title: 'Predictive Analytics',
    description: 'AI-powered forecasting and optimization for better results.',
    icon: '📊',
    capabilities: [
      'Revenue prediction',
      'Lead scoring',
      'Opportunity forecasting',
      'Risk assessment'
    ],
    metrics: {
      value: '90%',
      label: 'Prediction accuracy'
    }
  }
]

export default function AICapabilities() {
  return (
    <section className="py-20 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <HoverCard className="h-full">
                <div className="p-8">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 mb-6">{feature.description}</p>
                  <ul className="space-y-2 mb-6">
                    {feature.capabilities.map((capability) => (
                      <li key={capability} className="flex items-center space-x-2">
                        <span className="text-neon-blue">→</span>
                        <span className="text-white/80">{capability}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-neon-blue">
                      {feature.metrics.value}
                    </div>
                    <div className="text-white/60">{feature.metrics.label}</div>
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 