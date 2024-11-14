'use client'

import { useEffect } from 'react'
import { addDays, addWeeks, subDays, subWeeks } from 'date-fns'

interface UseKeyboardNavigationProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  view: 'Month' | 'Week' | 'Day'
}

export function useKeyboardNavigation({
  currentDate,
  setCurrentDate,
  view
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.startsWith('Arrow')) {
        e.preventDefault()
        
        switch (e.key) {
          case 'ArrowLeft':
            setCurrentDate(subDays(currentDate, 1))
            break
          case 'ArrowRight':
            setCurrentDate(addDays(currentDate, 1))
            break
          case 'ArrowUp':
            setCurrentDate(subWeeks(currentDate, 1))
            break
          case 'ArrowDown':
            setCurrentDate(addWeeks(currentDate, 1))
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentDate, setCurrentDate, view])
} 