'use client'

import { useEffect, useState } from 'react'

// Define types for Web Speech API
interface IWindow extends Window {
  webkitSpeechRecognition: any
  SpeechRecognition: any
}

declare const window: IWindow

export default function VoiceCommands() {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    try {
      // Get the correct Speech Recognition API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported')
        return
      }

      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')

        console.log('Transcript:', transcript)
        // Add your voice command handling logic here
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      // Start listening
      recognition.start()

      // Cleanup
      return () => {
        recognition.stop()
      }
    } catch (error) {
      console.error('Speech recognition setup error:', error)
    }
  }, [])

  return null // Or return your UI components
} 