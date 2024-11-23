'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlowingText from '@/components/effects/GlowingText'
import HoverCard from '@/components/effects/HoverCard'

// Type declarations for window
declare global {
  interface Window {
    gtag: (type: string, name: string, data?: any) => void
    lintrk: (type: string, data: any) => void
  }
}

// Constants
const CALENDLY_URL = "https://calendly.com/your-calendly-link" // CUSTOMIZE: Add your Calendly link

// Types
interface IFormData {
  name: string
  email: string
  company: string
  message: string
}

interface NotificationState {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  details?: string
}

interface MeetingType {
  title: string
  duration: string
  description: string
  url: string
}

// Meeting types configuration
const meetingTypesList: MeetingType[] = [
  {
    title: "Quick Demo",
    duration: "30 min",
    description: "Quick overview of Zoe capabilities",
    url: `${CALENDLY_URL}/quick-demo`
  },
  {
    title: "In-depth Demo",
    duration: "45 min",
    description: "Detailed walkthrough with Q&A",
    url: `${CALENDLY_URL}/detailed-demo`
  },
  {
    title: "Technical Discussion",
    duration: "60 min",
    description: "Deep dive into integrations and setup",
    url: `${CALENDLY_URL}/technical`
  }
]

// Support hours configuration
const supportHoursList = [
  {
    region: "Americas",
    hours: "6:00 AM - 6:00 PM PST"
  },
  {
    region: "Europe",
    hours: "9:00 AM - 6:00 PM CET"
  },
  {
    region: "Asia Pacific",
    hours: "9:00 AM - 6:00 PM SGT"
  }
]

// Animation variants
const formAnimationVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

// Calendly component
const CalendlyEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div 
      className="calendly-inline-widget h-[650px] w-full"
      data-url={CALENDLY_URL}
    />
  )
}

// Track events safely
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (typeof window !== "undefined") {
      // Google Analytics
      if (window.gtag) {
        window.gtag("event", eventName, properties)
      }
      
      // LinkedIn Insight Tag
      if (window.lintrk) {
        window.lintrk("track", { conversion_id: eventName })
      }
      
      // Custom event
      const event = new CustomEvent("cognifuse_track", {
        detail: { event: eventName, properties }
      })
      window.dispatchEvent(event)
    }
  } catch (err) {
    console.error("Error tracking event:", err)
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Separate error state for each field
  const [errors, setErrors] = useState<Partial<Record<keyof IFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<NotificationState | null>(null)

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    const newErrors: Partial<Record<keyof IFormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Your form submission logic here
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setNotification({
        type: 'success',
        message: 'Message sent successfully!',
        details: "We'll get back to you soon"
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send message',
        details: 'Please try again later'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlowingText className="text-5xl md:text-7xl font-grotesk font-bold mb-6">
              Let's Connect
            </GlowingText>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Schedule a demo or reach out to learn how Zoe can transform your sales process
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Schedule Demo */}
            <div>
              <HoverCard className="h-full p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Schedule a Demo</h2>
                <p className="text-white/80 mb-8">
                  Book a personalized demo to see how Zoe can help your sales team.
                </p>
                <CalendlyEmbed />
              </HoverCard>
            </div>

            {/* Contact Form */}
            <div>
              <HoverCard className="h-full p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-space-black/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-space-black/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-white mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-space-black/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-space-black/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk text-lg text-white"
                  >
                    Send Message
                  </motion.button>
                </form>
              </HoverCard>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <GlowingText className="text-3xl md:text-4xl font-grotesk font-bold mb-4">
              Choose Your Meeting Type
            </GlowingText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {meetingTypesList.map((type) => (
              <motion.div
                key={type.title}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => window.open(type.url, '_blank')}
              >
                <HoverCard className="p-6 text-center h-full">
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-neon-blue">{type.duration}</p>
                  <p className="text-white/80">{type.description}</p>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-20 bg-gradient-to-b from-neon-blue/5 to-neon-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <GlowingText className="text-3xl md:text-4xl font-grotesk font-bold mb-4">
              Global Support Hours
            </GlowingText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportHoursList.map((support) => (
              <HoverCard key={support.region} className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{support.region}</h3>
                <p className="text-white/80">{support.hours}</p>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            <p className="text-white">{notification.message}</p>
            {notification.details && (
              <p className="text-white/80 text-sm">{notification.details}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 