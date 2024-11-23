'use client'

import { useEffect, useRef } from 'react'

export default function SoundEffects() {
  const hoverSound = useRef<HTMLAudioElement | null>(null)
  const clickSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    hoverSound.current = new Audio('/sounds/hover.mp3')
    clickSound.current = new Audio('/sounds/click.mp3')

    const playHoverSound = () => hoverSound.current?.play()
    const playClickSound = () => clickSound.current?.play()

    // Add event listeners for interactive elements
    const buttons = document.querySelectorAll('button, a')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', playHoverSound)
      button.addEventListener('click', playClickSound)
    })

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', playHoverSound)
        button.removeEventListener('click', playClickSound)
      })
    }
  }, [])

  return null
} 