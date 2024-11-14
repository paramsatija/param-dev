'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeContextType {
  theme: 'light' | 'dark'
  primaryColor: string
  setPrimaryColor: (color: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_COLORS = {
  blue: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    hover: '#2563eb'
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    hover: '#7c3aed'
  },
  green: {
    primary: '#10b981',
    secondary: '#34d399',
    hover: '#059669'
  },
  // Add more color schemes
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [primaryColor, setPrimaryColor] = useState(THEME_COLORS.blue.primary)

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, setPrimaryColor, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
