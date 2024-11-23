'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface SecurityMetric {
  name: string
  status: 'secure' | 'monitoring' | 'alert'
  value: number
  threshold: number
  unit: string
}

const securityMetrics: SecurityMetric[] = [
  {
    name: 'Encryption Status',
    status: 'secure',
    value: 100,
    threshold: 100,
    unit: '%'
  },
  {
    name: 'Data Processing',
    status: 'secure',
    value: 45,
    threshold: 100,
    unit: 'ms'
  },
  {
    name: 'Access Control',
    status: 'monitoring',
    value: 98.5,
    threshold: 99.9,
    unit: '%'
  },
  {
    name: 'Threat Detection',
    status: 'secure',
    value: 0,
    threshold: 1,
    unit: 'threats'
  }
]

const complianceFrameworks = [
  {
    name: 'GDPR',
    status: 'Compliant',
    features: [
      'Data Processing Agreement',
      'Right to be Forgotten',
      'Data Portability',
      'Privacy by Design'
    ]
  },
  {
    name: 'SOC 2 Type II',
    status: 'Certified',
    features: [
      'Security Controls',
      'Availability Monitoring',
      'Process Integrity',
      'Data Confidentiality'
    ]
  },
  {
    name: 'HIPAA',
    status: 'Compliant',
    features: [
      'PHI Protection',
      'Access Controls',
      'Audit Trails',
      'Encryption Standards'
    ]
  }
]

export default function SecurityCompliance() {
  const [metrics, setMetrics] = useState(securityMetrics)

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.name === 'Data Processing' 
          ? Math.max(30, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
          : metric.value
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Real-time Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <HoverCard className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">{metric.name}</h3>
                    <motion.div
                      className={`w-3 h-3 rounded-full ${
                        metric.status === 'secure' ? 'bg-green-400' :
                        metric.status === 'monitoring' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-3xl font-bold text-neon-blue mb-2">
                    {metric.value.toFixed(1)}{metric.unit}
                  </div>
                  <div className="text-sm text-white/60">
                    Threshold: {metric.threshold}{metric.unit}
                  </div>
                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        metric.status === 'secure' ? 'bg-green-400' :
                        metric.status === 'monitoring' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${(metric.value / metric.threshold) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>

        {/* Compliance Frameworks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {complianceFrameworks.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <HoverCard className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">{framework.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-400/20 text-green-400">
                      {framework.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {framework.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2 text-white/80"
                      >
                        <span className="text-green-400">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 