'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-gray-200" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" aria-hidden="true" />
      )}
    </button>
  )
}

