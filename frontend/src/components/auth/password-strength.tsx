'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState('')

  const calculateStrength = (pass: string) => {
    let score = 0
    if (!pass) return 0

    // Length check
    if (pass.length >= 8) score += 1
    if (pass.length >= 12) score += 1

    // Character type checks
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    return score
  }

  useEffect(() => {
    const score = calculateStrength(password)
    setStrength(score)

    const messages = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'Strong',
      'Very strong'
    ]
    setMessage(messages[score])
  }, [password])

  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500'
  ]

  return (
    <div className="mt-2">
      <div className="flex h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-full ${i < strength ? strengthColors[i] : 'bg-gray-200'}`}
            initial={{ width: '0%' }}
            animate={{ width: '20%' }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
      <motion.p
        className={`text-sm mt-1 ${strength > 2 ? 'text-green-600' : 'text-gray-500'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={message}
      >
        {message}
      </motion.p>
    </div>
  )
}
