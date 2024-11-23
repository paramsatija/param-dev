'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface PipelineStage {
  id: string
  name: string
  status: 'idle' | 'processing' | 'complete'
  metrics: {
    throughput: string
    latency: string
    accuracy: string
  }
  processes: string[]
}

const pipelineStages: PipelineStage[] = [
  {
    id: 'data-ingestion',
    name: 'Data Ingestion',
    status: 'processing',
    metrics: {
      throughput: '10K events/sec',
      latency: '< 10ms',
      accuracy: '99.9%'
    },
    processes: [
      'Real-time data streaming',
      'Multi-source integration',
      'Data validation',
      'Schema normalization'
    ]
  },
  {
    id: 'enrichment',
    name: 'Data Enrichment',
    status: 'processing',
    metrics: {
      throughput: '5K records/sec',
      latency: '< 50ms',
      accuracy: '98.5%'
    },
    processes: [
      'Company data enrichment',
      'Contact verification',
      'Intent signal analysis',
      'Market intelligence'
    ]
  },
  {
    id: 'analysis',
    name: 'Real-time Analysis',
    status: 'processing',
    metrics: {
      throughput: '2K analyses/sec',
      latency: '< 100ms',
      accuracy: '96.5%'
    },
    processes: [
      'Pattern recognition',
      'Anomaly detection',
      'Trend analysis',
      'Predictive modeling'
    ]
  }
]

export default function DataPipeline() {
  const [activeStages, setActiveStages] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStages(prev => {
        const next = [...prev]
        if (next.length === pipelineStages.length) {
          next.shift()
        }
        if (next.length < pipelineStages.length) {
          next.push(pipelineStages[next.length].id)
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          {pipelineStages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <HoverCard className="relative">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          activeStages.includes(stage.id)
                            ? 'bg-green-400'
                            : 'bg-white/20'
                        }`}
                        animate={{
                          scale: activeStages.includes(stage.id) ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-sm text-white/60">
                        {activeStages.includes(stage.id) ? 'Processing' : 'Idle'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Metrics */}
                    <div className="space-y-3">
                      {Object.entries(stage.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
                        >
                          <div className="text-white/60 text-sm capitalize">{key}</div>
                          <div className="text-white font-mono">{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Processes */}
                    <div className="space-y-2">
                      {stage.processes.map((process) => (
                        <div
                          key={process}
                          className="flex items-center space-x-2 text-white/80"
                        >
                          <motion.span
                            className="text-neon-blue"
                            animate={{
                              opacity: activeStages.includes(stage.id) ? [0.5, 1] : 0.5
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                          <span>{process}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connection line to next stage */}
                  {index < pipelineStages.length - 1 && (
                    <motion.div
                      className="absolute -bottom-4 left-1/2 w-0.5 h-8 bg-gradient-to-b from-neon-blue to-neon-purple"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                    />
                  )}
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 