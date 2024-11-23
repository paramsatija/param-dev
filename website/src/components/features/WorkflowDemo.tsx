'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import HoverCard from '@/components/effects/HoverCard'

const workflowSteps = [
  {
    id: 1,
    title: 'Lead Identification',
    description: 'AI scans multiple data sources to identify potential leads',
    icon: '🎯',
    details: [
      'Real-time data scanning',
      'Intent signal detection',
      'ICP matching',
      'Lead scoring'
    ]
  },
  {
    id: 2,
    title: 'Personalization',
    description: 'Dynamic content generation based on prospect data',
    icon: '✨',
    details: [
      'Context analysis',
      'Tone matching',
      'Dynamic variables',
      'A/B testing'
    ]
  },
  {
    id: 3,
    title: 'Multi-channel Outreach',
    description: 'Orchestrated communication across channels',
    icon: '📱',
    details: [
      'Channel selection',
      'Timing optimization',
      'Response tracking',
      'Follow-up automation'
    ]
  }
]

export default function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="py-12">
      {/* Step Navigation - Add better visibility */}
      <div className="flex justify-center space-x-4 mb-12">
        {workflowSteps.map((step) => (
          <motion.button
            key={step.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveStep(step.id)}
            className={`px-6 py-3 rounded-full border ${
              activeStep === step.id
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white border-transparent'
                : 'border-neon-blue/50 text-white hover:bg-neon-blue/10'
            }`}
          >
            <span className="mr-2">{step.icon}</span>
            {step.title}
          </motion.button>
        ))}
      </div>

      {/* Step Content - Add better visibility */}
      <div className="max-w-4xl mx-auto">
        {workflowSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeStep === step.id ? 1 : 0,
              y: activeStep === step.id ? 0 : 20,
              display: activeStep === step.id ? 'block' : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            <HoverCard className="bg-gradient-to-br from-space-black/80 to-space-black/95 backdrop-blur-sm border border-white/10">
              <div className="p-8">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/90 mb-6">{step.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {step.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center space-x-2 text-white/80"
                    >
                      <span className="text-neon-blue">→</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 