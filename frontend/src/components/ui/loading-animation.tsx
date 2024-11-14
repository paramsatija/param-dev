'use client'

import { motion } from 'framer-motion'

export function LoadingAnimation() {
  return (
    <motion.div 
      className="flex space-x-2 justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-indigo-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2
          }}
        />
      ))}
    </motion.div>
  )
}
