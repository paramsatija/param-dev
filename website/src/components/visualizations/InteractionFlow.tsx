'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface Interaction {
  id: string
  type: 'email' | 'linkedin' | 'meeting' | 'call'
  status: 'analyzing' | 'processing' | 'responding'
  context: {
    intent: string
    sentiment: string
    priority: string
    nextAction: string
  }
  metrics: {
    responseTime: string
    accuracy: string
    engagement: string
  }
}

const mockInteractions: Interaction[] = [
  {
    id: '1',
    type: 'email',
    status: 'analyzing',
    context: {
      intent: 'Product Inquiry',
      sentiment: 'Positive',
      priority: 'High',
      nextAction: 'Detailed Response'
    },
    metrics: {
      responseTime: '< 30s',
      accuracy: '98.5%',
      engagement: 'High'
    }
  },
  {
    id: '2',
    type: 'linkedin',
    status: 'processing',
    context: {
      intent: 'Partnership',
      sentiment: 'Neutral',
      priority: 'Medium',
      nextAction: 'Schedule Call'
    },
    metrics: {
      responseTime: '< 45s',
      accuracy: '96.8%',
      engagement: 'Medium'
    }
  },
  {
    id: '3',
    type: 'meeting',
    status: 'responding',
    context: {
      intent: 'Demo Request',
      sentiment: 'Positive',
      priority: 'High',
      nextAction: 'Calendar Link'
    },
    metrics: {
      responseTime: '< 15s',
      accuracy: '99.2%',
      engagement: 'Very High'
    }
  }
]

const statusColors = {
  analyzing: 'from-neon-blue/20 to-neon-blue/10',
  processing: 'from-neon-purple/20 to-neon-purple/10',
  responding: 'from-green-400/20 to-green-400/10'
}

export default function InteractionFlow() {
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions)
  const [selectedInteraction, setSelectedInteraction] = useState<string>(mockInteractions[0].id)

  useEffect(() => {
    const interval = setInterval(() => {
      setInteractions(prev => prev.map(interaction => ({
        ...interaction,
        status: interaction.status === 'analyzing' ? 'processing' :
                interaction.status === 'processing' ? 'responding' : 'analyzing'
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interaction List */}
          <div className="space-y-4">
            {interactions.map((interaction) => (
              <motion.div
                key={interaction.id}
                onClick={() => setSelectedInteraction(interaction.id)}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <HoverCard className={`p-4 ${
                  selectedInteraction === interaction.id ? 'border-neon-blue' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${
                        interaction.type === 'email' ? 'text-neon-blue' :
                        interaction.type === 'linkedin' ? 'text-neon-purple' :
                        'text-green-400'
                      }`}>
                        {interaction.type === 'email' ? '📧' :
                         interaction.type === 'linkedin' ? '🔗' :
                         interaction.type === 'meeting' ? '📅' : '📞'}
                      </div>
                      <div>
                        <div className="font-bold text-white">{interaction.context.intent}</div>
                        <div className="text-sm text-white/60">{interaction.type}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${statusColors[interaction.status]}`}>
                      {interaction.status}
                    </div>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>

          {/* Interaction Details */}
          {interactions.map((interaction) => (
            interaction.id === selectedInteraction && (
              <motion.div
                key={interaction.id}
                className="lg:col-span-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HoverCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Interaction Analysis</h3>
                  
                  {/* Context */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(interaction.context).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-4"
                      >
                        <div className="text-white/60 text-sm capitalize mb-1">{key}</div>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <h4 className="text-lg font-bold text-white mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(interaction.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-4"
                      >
                        <div className="text-white/60 text-sm capitalize mb-1">{key}</div>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </HoverCard>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  )
} 