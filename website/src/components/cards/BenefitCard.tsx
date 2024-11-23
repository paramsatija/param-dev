'use client'

import { motion } from 'framer-motion'
import HoverCard from '@/components/effects/HoverCard'

interface BenefitProps {
  benefit: {
    title: string
    description: string
    icon: string
    metrics: {
      [key: string]: string
    }
  }
  index: number
}

export function BenefitCard({ benefit, index }: BenefitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <HoverCard className="h-full">
        <div className="p-8">
          <div className="text-4xl mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
          <p className="text-white/80 mb-6">{benefit.description}</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(benefit.metrics).map(([key, value]) => (
              <div
                key={key}
                className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
              >
                <div className="text-white/60 text-sm capitalize">{key}</div>
                <div className="text-white font-mono">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </HoverCard>
    </motion.div>
  )
} 