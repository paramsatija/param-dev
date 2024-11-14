'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

interface AnimatedContainerProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedContainer({ children, className }: AnimatedContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  )
}
