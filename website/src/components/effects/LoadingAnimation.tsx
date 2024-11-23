'use client'

import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-space-black z-50 flex items-center justify-center">
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            initial={{ rotate: i * 90 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 