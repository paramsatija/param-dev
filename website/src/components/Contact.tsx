'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Define form data interface
interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

export default function Contact() {
  // Initialize form handling with validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement your form submission logic here
      // Example: await axios.post('/api/contact', data)
      setSubmitStatus('success')
      reset() // Clear form on success
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-black to-neon-purple/20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Ready for Takeoff?
          </h2>
          <p className="mt-4 text-soft-white/80">
            Let's discuss how Cognifuse can transform your sales operations
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Form fields with floating labels and validation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name field */}
            <div className="relative">
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:outline-none focus:border-neon-blue"
                placeholder="Name"
                id="name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-6 text-sm text-neon-blue/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-soft-white/50 peer-placeholder-shown:top-3 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-neon-blue"
              >
                Name
              </label>
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
              )}
            </div>

            {/* Email field */}
            <div className="relative">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:outline-none focus:border-neon-blue"
                placeholder="Email"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-6 text-sm text-neon-blue/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-soft-white/50 peer-placeholder-shown:top-3 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-neon-blue"
              >
                Email
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
              )}
            </div>
          </div>

          {/* Message field */}
          <div className="relative">
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="w-full bg-space-black/50 border border-neon-blue/30 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:outline-none focus:border-neon-blue h-32"
              placeholder="Message"
              id="message"
            />
            <label
              htmlFor="message"
              className="absolute left-4 -top-6 text-sm text-neon-blue/70 peer-placeholder-shown:text-base peer-placeholder-shown:text-soft-white/50 peer-placeholder-shown:top-3 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-neon-blue"
            >
              Message
            </label>
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
            )}
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk text-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>

          {/* Success/Error messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center ${
                submitStatus === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {submitStatus === 'success'
                ? 'Message sent successfully!'
                : 'Error sending message. Please try again.'}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
} 