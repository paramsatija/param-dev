'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import HoverCard from '@/components/effects/HoverCard'

const endpoints = [
  {
    method: 'POST',
    path: '/api/leads/analyze',
    description: 'Analyze and score new leads',
    parameters: {
      company: 'string',
      title: 'string',
      industry: 'string',
      signals: 'string[]'
    },
    response: {
      score: 'number',
      intent: 'string',
      nextActions: 'string[]',
      confidence: 'number'
    },
    example: `
// Example Request
const response = await cognifuse.leads.analyze({
  company: "TechCorp",
  title: "VP of Sales",
  industry: "SaaS",
  signals: ["hiring", "funding"]
});

// Example Response
{
  score: 85,
  intent: "high_intent_buyer",
  nextActions: ["schedule_demo", "send_case_study"],
  confidence: 0.92
}`
  },
  {
    method: 'POST',
    path: '/api/outreach/personalize',
    description: 'Generate personalized outreach content',
    parameters: {
      prospect: 'object',
      template: 'string',
      channel: 'string',
      context: 'object'
    },
    response: {
      content: 'string',
      variations: 'string[]',
      metrics: 'object'
    },
    example: `
// Example Request
const response = await cognifuse.outreach.personalize({
  prospect: {
    name: "John Doe",
    role: "CTO",
    company: "TechCorp"
  },
  template: "demo_request",
  channel: "email",
  context: {
    recentFunding: true,
    techStack: ["React", "Node.js"]
  }
});`
  }
]

export default function APIDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [activeTab, setActiveTab] = useState<'docs' | 'playground'>('docs')

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Endpoints Sidebar */}
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <motion.div
                key={endpoint.path}
                onClick={() => setSelectedEndpoint(endpoint)}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <HoverCard className={`p-4 ${
                  selectedEndpoint.path === endpoint.path ? 'border-neon-blue' : ''
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      endpoint.method === 'POST' ? 'bg-green-400/20 text-green-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-white font-mono text-sm">
                      {endpoint.path}
                    </span>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>

          {/* Documentation */}
          <div className="lg:col-span-3">
            <HoverCard className="p-6">
              {/* Tabs */}
              <div className="flex space-x-4 mb-6">
                {['docs', 'playground'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`px-4 py-2 rounded-full capitalize ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-white border border-neon-blue/50'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'docs' ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Description</h3>
                    <p className="text-white/80">{selectedEndpoint.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Parameters</h3>
                    <div className="bg-space-black/50 rounded-lg p-4 font-mono">
                      {Object.entries(selectedEndpoint.parameters).map(([key, type]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="text-neon-purple">{key}</span>
                          <span className="text-white/60">:</span>
                          <span className="text-neon-blue">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Response</h3>
                    <div className="bg-space-black/50 rounded-lg p-4 font-mono">
                      {Object.entries(selectedEndpoint.response).map(([key, type]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="text-neon-purple">{key}</span>
                          <span className="text-white/60">:</span>
                          <span className="text-neon-blue">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Example</h3>
                    <div className="bg-space-black/50 rounded-lg p-4 font-mono">
                      <pre className="text-white/80 whitespace-pre-wrap">
                        {selectedEndpoint.example}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-space-black/50 rounded-lg p-4">
                    <textarea
                      className="w-full h-64 bg-transparent text-white/80 font-mono resize-none focus:outline-none"
                      placeholder="// Try the API here..."
                      defaultValue={selectedEndpoint.example}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white"
                  >
                    Run Request
                  </motion.button>
                </div>
              )}
            </HoverCard>
          </div>
        </div>
      </div>
    </div>
  )
} 