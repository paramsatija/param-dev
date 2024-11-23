'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'

interface CarouselItem {
  title: string
  description: string
  image: string
}

export default function CardCarousel({ items }: { items: CarouselItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const rotate = async (direction: 'left' | 'right') => {
    await controls.start({
      rotateY: direction === 'left' ? -180 : 180,
      transition: { duration: 0.5 }
    })
    setCurrentIndex((prev) => 
      direction === 'left' 
        ? (prev + 1) % items.length 
        : (prev - 1 + items.length) % items.length
    )
    await controls.set({ rotateY: 0 })
  }

  return (
    <div className="relative h-[400px] w-full perspective-1000">
      <motion.div
        animate={controls}
        className="relative w-full h-full preserve-3d"
      >
        <div className="absolute inset-0 backface-hidden">
          <div className="p-8 rounded-xl glass">
            <h3 className="text-2xl font-grotesk mb-4">{items[currentIndex].title}</h3>
            <p>{items[currentIndex].description}</p>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button onClick={() => rotate('left')} className="p-2 rounded-full glass">←</button>
        <button onClick={() => rotate('right')} className="p-2 rounded-full glass">→</button>
      </div>
    </div>
  )
} 