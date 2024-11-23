'use client'

import { motion } from 'framer-motion'
import HoverCard from '@/components/effects/HoverCard'

interface Metrics {
  speed?: string
  accuracy?: string
  engagement?: string
  personalization?: string
  response?: string
  efficiency?: string
  scheduling?: string
  showRate?: string
}

interface WorkflowStep {
  title: string
  description: string
  details: string[]
  metrics: Metrics
}

interface WorkflowVisualizationProps {
  steps: WorkflowStep[]
}

export default function WorkflowVisualization({ steps }: WorkflowVisualizationProps) {
  return (
    <div className="relative">
      {/* Space Theme Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%'
          }}
        />
      </div>

      {/* Connection Lines with Glowing Effect */}
      <div className="absolute top-0 left-1/2 h-full w-px">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-blue to-neon-purple opacity-50" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-neon-blue to-neon-purple"
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-24 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className="w-full max-w-lg">
              <HoverCard>
                <motion.div
                  className="p-6 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Glowing Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10"
                    animate={{
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/80 mb-4">{step.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(step.metrics).map(([key, value]) => (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-lg p-3 relative overflow-hidden"
                        >
                          {/* Metric Glow Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20"
                            animate={{
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                          <div className="relative z-10">
                            <div className="text-white/60 text-sm capitalize">{key}</div>
                            <div className="text-white font-mono">{value}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </HoverCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 