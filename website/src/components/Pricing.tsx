'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Define pricing tier interface for type safety
interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

// Pricing data with different tiers
const pricingTiers: PricingTier[] = [
  {
    name: 'Startup',
    price: '$499',
    description: 'Perfect for emerging businesses',
    features: [
      'AI-powered lead generation (500/month)',
      'Basic email automation',
      'Calendar integration',
      '8/5 support'
    ]
  },
  {
    name: 'Growth',
    price: '$999',
    description: 'Scale your sales operations',
    features: [
      'AI-powered lead generation (2000/month)',
      'Advanced email automation',
      'Full CRM integration',
      'Custom AI training',
      '24/7 priority support'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Unlimited lead generation',
      'Custom workflow automation',
      'Dedicated success manager',
      'API access',
      'SLA guarantee'
    ]
  }
]

export default function Pricing() {
  // Initialize intersection observer for scroll animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 relative" ref={ref}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Choose Your Launch Pad
          </h2>
        </motion.div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group ${
                tier.highlighted ? 'transform scale-105' : ''
              }`}
            >
              {/* Card background with glass effect */}
              <div className="relative backdrop-blur-lg rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 to-neon-purple/10 opacity-50" />
                <div className="relative p-8">
                  <h3 className="text-2xl font-grotesk font-bold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold mb-4">{tier.price}</div>
                  <p className="text-soft-white/80 mb-6">{tier.description}</p>
                  
                  {/* Feature list */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <span className="text-neon-blue mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button with hover animation */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-full font-grotesk ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple'
                        : 'bg-space-black border border-neon-blue/50'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 