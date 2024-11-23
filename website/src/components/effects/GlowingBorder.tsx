'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingBorderProps {
  children: ReactNode
  className?: string
}

export default function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute -inset-[1px] bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative bg-space-black rounded-lg overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
} 