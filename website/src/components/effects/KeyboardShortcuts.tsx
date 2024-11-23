'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Command/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('[data-search]')?.focus()
      }

      // Navigation shortcuts
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            router.push('/')
            break
          case 'f':
            router.push('/features')
            break
          case 'p':
            router.push('/pricing')
            break
          case 'c':
            router.push('/contact')
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [router])

  return null
} 