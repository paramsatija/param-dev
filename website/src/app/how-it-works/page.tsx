'use client'

import { motion } from 'framer-motion'
import GlowingText from '@/components/effects/GlowingText'
import HoverCard from '@/components/effects/HoverCard'
import WorkflowVisualization from '@/components/visualizations/WorkflowVisualization'

const workflowSteps = [
  {
    title: "Lead Discovery",
    description: "Zoe scans multiple data sources to identify potential leads",
    details: [
      "AI-powered lead identification",
      "Automated data enrichment",
      "Smart qualification filters",
      "Real-time validation"
    ],
    metrics: {
      speed: "< 30 seconds per lead",
      accuracy: "95% match rate"
    }
  },
  {
    title: "Personalized Outreach",
    description: "Crafts highly personalized messages for each prospect",
    details: [
      "Context-aware messaging",
      "Industry-specific insights",
      "Dynamic personalization",
      "Multi-channel coordination"
    ],
    metrics: {
      engagement: "3x higher",
      personalization: "100%"
    }
  },
  {
    title: "Intelligent Follow-up",
    description: "Automated follow-up sequences with smart timing",
    details: [
      "Response analysis",
      "Smart scheduling",
      "Context retention",
      "Adaptive messaging"
    ],
    metrics: {
      response: "40% higher",
      efficiency: "85% time saved"
    }
  },
  {
    title: "Meeting Scheduling",
    description: "Seamless meeting coordination and qualification",
    details: [
      "Calendar integration",
      "Timezone handling",
      "Qualification calls",
      "Prep materials"
    ],
    metrics: {
      scheduling: "< 2 min",
      showRate: "90%"
    }
  }
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GlowingText className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              How Zoe Works
            </GlowingText>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience our AI agent's end-to-end workflow for generating and converting high-quality leads
            </p>
          </div>

          <WorkflowVisualization steps={workflowSteps} />
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <HoverCard>
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                        <p className="text-white/80 mb-6">{step.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            {step.details.map((detail) => (
                              <div key={detail} className="flex items-center space-x-2">
                                <span className="text-neon-blue">→</span>
                                <span className="text-white/80">{detail}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-4">
                            {Object.entries(step.metrics).map(([key, value]) => (
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
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 