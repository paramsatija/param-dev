'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface ROIInputs {
  sdrs: number
  leadsPerMonth: number
  avgDealSize: number
  conversionRate: number
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    sdrs: 5,
    leadsPerMonth: 100,
    avgDealSize: 10000,
    conversionRate: 20
  })

  // Calculate ROI metrics with more detailed analysis
  const calculations = {
    currentRevenue: (inputs.leadsPerMonth * inputs.conversionRate / 100 * inputs.avgDealSize * 12),
    aiLeads: (inputs.leadsPerMonth * 3), // 3x more leads
    aiRevenue: (inputs.leadsPerMonth * 3 * (inputs.conversionRate * 1.5) / 100 * inputs.avgDealSize * 12),
    timeSaved: (inputs.sdrs * 30), // Hours per month
    costSavings: (inputs.sdrs * 50000), // Annual cost savings
    roi: ((inputs.leadsPerMonth * 3 * (inputs.conversionRate * 1.5) / 100 * inputs.avgDealSize * 12) / 
          (inputs.leadsPerMonth * inputs.conversionRate / 100 * inputs.avgDealSize * 12) * 100 - 100).toFixed(0)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-space-black/80 to-space-black/95 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <HoverCard className="p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Calculate Your ROI</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="sdrs" className="block text-sm mb-2 text-white">Number of SDRs</label>
              <input
                id="sdrs"
                type="number"
                value={inputs.sdrs}
                onChange={(e) => setInputs({ ...inputs, sdrs: Number(e.target.value) })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white"
                placeholder="Enter number of SDRs"
              />
            </div>
            <div>
              <label htmlFor="leads" className="block text-sm mb-2 text-white">Leads per Month</label>
              <input
                id="leads"
                type="number"
                value={inputs.leadsPerMonth}
                onChange={(e) => setInputs({ ...inputs, leadsPerMonth: Number(e.target.value) })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white"
                placeholder="Enter leads per month"
              />
            </div>
            <div>
              <label htmlFor="dealSize" className="block text-sm mb-2 text-white">Average Deal Size ($)</label>
              <input
                id="dealSize"
                type="number"
                value={inputs.avgDealSize}
                onChange={(e) => setInputs({ ...inputs, avgDealSize: Number(e.target.value) })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white"
                placeholder="Enter average deal size"
              />
            </div>
            <div>
              <label htmlFor="conversion" className="block text-sm mb-2 text-white">Current Conversion Rate (%)</label>
              <input
                id="conversion"
                type="number"
                value={inputs.conversionRate}
                onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white"
                placeholder="Enter conversion rate"
              />
            </div>
          </div>
        </HoverCard>

        {/* Results Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HoverCard className="p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Current Annual Revenue</h4>
              <p className="text-2xl text-neon-blue">${calculations.currentRevenue.toLocaleString()}</p>
            </HoverCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HoverCard className="p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Projected Leads with AI</h4>
              <p className="text-2xl text-neon-blue">{calculations.aiLeads.toLocaleString()} leads/month</p>
            </HoverCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HoverCard className="p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Projected Annual Revenue</h4>
              <p className="text-2xl text-neon-purple">${calculations.aiRevenue.toLocaleString()}</p>
            </HoverCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <HoverCard className="p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Monthly Time Saved</h4>
              <p className="text-2xl text-neon-blue">{calculations.timeSaved} hours</p>
            </HoverCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HoverCard className="p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Annual Cost Savings</h4>
              <p className="text-2xl text-neon-purple">${calculations.costSavings.toLocaleString()}</p>
            </HoverCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HoverCard className="p-6 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
              <h4 className="text-lg font-bold mb-2 text-white">Total ROI</h4>
              <p className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                {calculations.roi}%
              </p>
            </HoverCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 