'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface TrainingMetric {
  epoch: number
  accuracy: number
  loss: number
  learningRate: number
}

interface ModelComponent {
  name: string
  description: string
  metrics: {
    parameters: string
    trainingData: string
    updateFrequency: string
    performance: string
  }
  improvements: string[]
}

const modelComponents: ModelComponent[] = [
  {
    name: 'Intent Recognition',
    description: 'Advanced NLP model for understanding prospect intent',
    metrics: {
      parameters: '175B',
      trainingData: '500M samples',
      updateFrequency: '12 hours',
      performance: '98.5% accuracy'
    },
    improvements: [
      'Context-aware intent detection',
      'Multi-language support',
      'Industry-specific understanding',
      'Sentiment analysis integration'
    ]
  },
  {
    name: 'Response Generation',
    description: 'Dynamic content generation with personalization',
    metrics: {
      parameters: '125B',
      trainingData: '300M samples',
      updateFrequency: '24 hours',
      performance: '96.8% relevance'
    },
    improvements: [
      'Tone matching enhancement',
      'Brand voice adaptation',
      'Cultural context awareness',
      'Dynamic content optimization'
    ]
  },
  {
    name: 'Decision Engine',
    description: 'Real-time decision making and optimization',
    metrics: {
      parameters: '85B',
      trainingData: '200M decisions',
      updateFrequency: '6 hours',
      performance: '94.2% success rate'
    },
    improvements: [
      'Multi-factor analysis',
      'Real-time adaptation',
      'Risk assessment',
      'Performance optimization'
    ]
  }
]

export default function ModelTraining() {
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetric[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('Intent Recognition')

  useEffect(() => {
    // Simulate real-time training metrics
    const interval = setInterval(() => {
      setTrainingMetrics(prev => {
        const newMetric: TrainingMetric = {
          epoch: (prev[prev.length - 1]?.epoch || 0) + 1,
          accuracy: Math.min(0.99, (prev[prev.length - 1]?.accuracy || 0.7) + Math.random() * 0.01),
          loss: Math.max(0.01, (prev[prev.length - 1]?.loss || 0.5) - Math.random() * 0.01),
          learningRate: 0.001 * Math.pow(0.95, Math.floor(prev.length / 10))
        }
        return [...prev.slice(-20), newMetric]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Model Selection */}
        <div className="flex justify-center space-x-4 mb-12">
          {modelComponents.map((model) => (
            <motion.button
              key={model.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedModel(model.name)}
              className={`px-6 py-3 rounded-full ${
                selectedModel === model.name
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                  : 'border border-neon-blue/50 text-white hover:bg-neon-blue/10'
              }`}
            >
              {model.name}
            </motion.button>
          ))}
        </div>

        {/* Training Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metrics Graph */}
          <HoverCard className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Training Progress</h3>
            <div className="h-64 relative">
              {trainingMetrics.map((metric, index) => (
                <motion.div
                  key={metric.epoch}
                  className="absolute bottom-0 bg-gradient-to-t from-neon-blue to-neon-purple"
                  style={{
                    left: `${(index / 20) * 100}%`,
                    height: `${metric.accuracy * 100}%`,
                    width: '4px',
                    opacity: 0.5 + (index / 40)
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${metric.accuracy * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              ))}
              <div className="absolute bottom-0 w-full h-px bg-white/20" />
              <div className="absolute left-0 h-full w-px bg-white/20" />
            </div>
          </HoverCard>

          {/* Model Details */}
          {modelComponents.map((model) => (
            model.name === selectedModel && (
              <motion.div
                key={model.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <HoverCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{model.name}</h3>
                  <p className="text-white/80 mb-6">{model.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(model.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
                      >
                        <div className="text-white/60 text-sm capitalize">{key}</div>
                        <div className="text-white font-mono">{value}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-lg font-bold text-white mb-4">Recent Improvements</h4>
                  <div className="space-y-2">
                    {model.improvements.map((improvement) => (
                      <div
                        key={improvement}
                        className="flex items-center space-x-2 text-white/80"
                      >
                        <span className="text-neon-blue">→</span>
                        <span>{improvement}</span>
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