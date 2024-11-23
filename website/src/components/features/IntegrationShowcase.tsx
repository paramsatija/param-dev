'use client'

import { motion } from 'framer-motion'
import HoverCard from '@/components/effects/HoverCard'

const integrations = {
  crm: [
    { name: 'Salesforce', icon: '💼', description: 'Bi-directional sync with real-time updates' },
    { name: 'HubSpot', icon: '🎯', description: 'Full CRM integration with custom field mapping' }
  ],
  communication: [
    { name: 'Gmail', icon: '📧', description: 'Native email integration with tracking' },
    { name: 'Outlook', icon: '📨', description: 'Seamless Microsoft ecosystem integration' },
    { name: 'LinkedIn', icon: '🔗', description: 'Automated social selling capabilities' }
  ],
  collaboration: [
    { name: 'Slack', icon: '💬', description: 'Real-time notifications and commands' },
    { name: 'Teams', icon: '👥', description: 'Microsoft Teams app integration' },
    { name: 'Zoom', icon: '🎥', description: 'One-click meeting scheduling' }
  ],
  tools: [
    { name: 'Zapier', icon: '⚡', description: 'Connect with 3000+ apps' },
    { name: 'Calendly', icon: '📅', description: 'Advanced scheduling automation' },
    { name: 'Custom API', icon: '🔌', description: 'Build custom integrations' }
  ]
}

export default function IntegrationShowcase() {
  return (
    <div className="py-12">
      {Object.entries(integrations).map(([category, apps]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 capitalize">
            {category} Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <motion.div
                key={app.name}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <HoverCard className="h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{app.icon}</div>
                      <div className="text-xl font-bold text-white">{app.name}</div>
                    </div>
                    <p className="text-white/80">{app.description}</p>
                    <div className="mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-neon-blue hover:text-neon-purple transition-colors"
                      >
                        Learn more →
                      </motion.button>
                    </div>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* API Documentation Preview */}
      <div className="mt-16">
        <HoverCard className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Developer API</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 text-white"
            >
              View Documentation
            </motion.button>
          </div>
          <div className="bg-space-black/50 rounded-lg p-4 font-mono text-sm text-white/80">
            <pre>
              {`// Example API Request
const response = await cognifuse.leads.create({
  company: "TechCorp",
  title: "VP of Sales",
  industry: "SaaS",
  signals: ["hiring", "funding"]
});`}
            </pre>
          </div>
        </HoverCard>
      </div>
    </div>
  )
} 