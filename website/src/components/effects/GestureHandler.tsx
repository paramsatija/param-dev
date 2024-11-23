'use client'

import { useEffect } from 'react'

export default function GestureHandler() {
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeThreshold = 50
      const difference = touchEndX - touchStartX

      if (Math.abs(difference) > swipeThreshold) {
        // Swipe right
        if (difference > 0) {
          console.log('Swiped right')
        }
        // Swipe left
        else {
          console.log('Swiped left')
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return null
} 