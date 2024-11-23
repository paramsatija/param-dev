'use client'

import { motion } from 'framer-motion'

interface Feature {
  name: keyof Capabilities
  description: string
}

interface Competitor {
  name: string
  capabilities: Capabilities
}

interface Capabilities {
  'Advanced Persona Targeting': boolean
  'Intent Detection': boolean
  'Smart Personalization': boolean
  'Predictive Analytics': boolean
  'Multi-channel Orchestration': boolean
  'Workflow Automation': boolean
  'Real-time Monitoring': boolean
  'A/B Testing': boolean
  'Integration Ecosystem': boolean
  'Custom Reporting': boolean
  'ROI Tracking': boolean
}

const features: Feature[] = [
  {
    name: 'Advanced Persona Targeting',
    description: 'AI-driven persona identification and targeting'
  },
  {
    name: 'Intent Detection',
    description: 'Real-time prospect intent analysis'
  },
  {
    name: 'Smart Personalization',
    description: 'Dynamic content personalization'
  },
  {
    name: 'Predictive Analytics',
    description: 'AI-powered sales forecasting'
  },
  {
    name: 'Multi-channel Orchestration',
    description: 'Seamless multi-channel communication'
  },
  {
    name: 'Workflow Automation',
    description: 'Intelligent workflow automation'
  },
  {
    name: 'Real-time Monitoring',
    description: 'Live performance tracking'
  },
  {
    name: 'A/B Testing',
    description: 'Automated testing and optimization'
  },
  {
    name: 'Integration Ecosystem',
    description: 'Wide range of integrations'
  },
  {
    name: 'Custom Reporting',
    description: 'Customizable reporting dashboards'
  },
  {
    name: 'ROI Tracking',
    description: 'Advanced ROI analytics'
  }
]

const comparisonData = {
  competitors: [
    {
      name: 'Cognifuse AI',
      capabilities: {
        'Advanced Persona Targeting': true,
        'Intent Detection': true,
        'Smart Personalization': true,
        'Predictive Analytics': true,
        'Multi-channel Orchestration': true,
        'Workflow Automation': true,
        'Real-time Monitoring': true,
        'A/B Testing': true,
        'Integration Ecosystem': true,
        'Custom Reporting': true,
        'ROI Tracking': true
      }
    },
    {
      name: 'Competitor A',
      capabilities: {
        'Advanced Persona Targeting': false,
        'Intent Detection': true,
        'Smart Personalization': true,
        'Predictive Analytics': false,
        'Multi-channel Orchestration': true,
        'Workflow Automation': true,
        'Real-time Monitoring': true,
        'A/B Testing': false,
        'Integration Ecosystem': true,
        'Custom Reporting': true,
        'ROI Tracking': false
      }
    },
    {
      name: 'Competitor B',
      capabilities: {
        'Advanced Persona Targeting': true,
        'Intent Detection': false,
        'Smart Personalization': true,
        'Predictive Analytics': false,
        'Multi-channel Orchestration': false,
        'Workflow Automation': true,
        'Real-time Monitoring': true,
        'A/B Testing': true,
        'Integration Ecosystem': false,
        'Custom Reporting': true,
        'ROI Tracking': true
      }
    }
  ] as Competitor[]
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10">
        <thead>
          <tr>
            <th className="p-4 text-left text-white">Feature</th>
            {comparisonData.competitors.map((competitor) => (
              <th key={competitor.name} className="p-4 text-center text-white">
                {competitor.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {features.map((feature, index) => (
            <motion.tr
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-white/5"
            >
              <td className="p-4">
                <div className="font-medium text-white">{feature.name}</div>
                <div className="text-sm text-white/60">{feature.description}</div>
              </td>
              {comparisonData.competitors.map((competitor) => (
                <td key={competitor.name} className="p-4 text-center">
                  {competitor.capabilities[feature.name] ? (
                    <span className="text-green-400 text-xl">✓</span>
                  ) : (
                    <span className="text-red-400 text-xl">×</span>
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 