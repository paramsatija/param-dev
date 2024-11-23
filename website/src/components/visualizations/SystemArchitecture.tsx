'use client'

import { motion } from 'framer-motion'
import HoverCard from '@/components/effects/HoverCard'

const architectureComponents = {
  frontend: {
    name: 'Client Layer',
    components: ['Web Interface', 'Mobile SDK', 'API Gateway'],
    connections: ['middleware']
  },
  middleware: {
    name: 'Processing Layer',
    components: ['Request Handler', 'Authentication', 'Rate Limiter'],
    connections: ['ai', 'data']
  },
  ai: {
    name: 'AI Core',
    components: ['NLP Engine', 'ML Models', 'Decision Engine'],
    connections: ['data']
  },
  data: {
    name: 'Data Layer',
    components: ['Real-time DB', 'Analytics Store', 'Model Cache'],
    connections: []
  }
}

export default function SystemArchitecture() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(architectureComponents).map(([key, component], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <HoverCard className="relative">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {component.name}
                  </h3>
                  <div className="space-y-3">
                    {component.components.map((item) => (
                      <div
                        key={item}
                        className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
                      >
                        <div className="text-white/80">{item}</div>
                      </div>
                    ))}
                  </div>
                  {component.connections.map((connection) => (
                    <motion.div
                      key={connection}
                      className="absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                    />
                  ))}
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 