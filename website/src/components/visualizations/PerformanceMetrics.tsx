'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface Metric {
  name: string
  value: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

const metrics: Metric[] = [
  {
    name: 'Response Time',
    value: 120,
    target: 150,
    unit: 'ms',
    trend: 'down'
  },
  {
    name: 'Accuracy',
    value: 98.5,
    target: 95,
    unit: '%',
    trend: 'up'
  },
  {
    name: 'Processing Load',
    value: 65,
    target: 80,
    unit: '%',
    trend: 'stable'
  },
  {
    name: 'Memory Usage',
    value: 75,
    target: 90,
    unit: '%',
    trend: 'stable'
  }
]

export default function PerformanceMetrics() {
  const [currentMetrics, setCurrentMetrics] = useState(metrics)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 2
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HoverCard className="h-full">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{metric.name}</h3>
                <div className="flex items-end justify-between mb-4">
                  <div className="text-3xl font-bold text-neon-blue">
                    {metric.value.toFixed(1)}{metric.unit}
                  </div>
                  <div className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-400' :
                    metric.trend === 'down' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {metric.trend === 'up' ? '↑' :
                     metric.trend === 'down' ? '↓' : '→'}
                  </div>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-sm text-white/60 mt-2">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 