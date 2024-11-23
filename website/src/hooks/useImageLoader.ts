'use client'

import { useState, useEffect } from 'react'

export function useImageLoader(src: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const img = new Image()
    
    img.onload = () => {
      setIsLoaded(true)
    }
    
    img.onerror = (e: Event | string) => {
      const error = e instanceof Error ? e : new Error('Failed to load image')
      setError(error)
    }
    
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { isLoaded, error }
} 