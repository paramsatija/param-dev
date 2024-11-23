'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingTextProps {
  children: ReactNode
  className?: string
}

export default function GlowingText({ children, className = '' }: GlowingTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 blur-lg bg-gradient-to-r from-neon-blue to-neon-purple opacity-50" />
      
      {/* Main text */}
      <div className="relative bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
        {children}
      </div>
    </motion.div>
  )
} 