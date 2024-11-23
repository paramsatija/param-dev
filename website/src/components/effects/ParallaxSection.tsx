'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  offset?: number
}

export default function ParallaxSection({ children, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
} 