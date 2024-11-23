'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-space-black/80 backdrop-blur-sm z-50">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-transparent border-t-neon-blue rounded-full" />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 border-2 border-transparent border-t-neon-purple rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center dot */}
        <div className="absolute inset-1/3 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full animate-pulse" />
      </motion.div>
    </div>
  )
} 