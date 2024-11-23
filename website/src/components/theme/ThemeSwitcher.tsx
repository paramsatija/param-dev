'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const themes = [
  { name: 'Space', primary: '#00FFFF', secondary: '#8A2BE2' },
  { name: 'Cyber', primary: '#FF00FF', secondary: '#00FF00' },
  { name: 'Neon', primary: '#FF0000', secondary: '#FFFF00' }
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(0)

  const changeTheme = () => {
    const nextTheme = (currentTheme + 1) % themes.length
    setCurrentTheme(nextTheme)
    
    // Update CSS variables
    document.documentElement.style.setProperty('--theme-primary', themes[nextTheme].primary)
    document.documentElement.style.setProperty('--theme-secondary', themes[nextTheme].secondary)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={changeTheme}
      className="fixed top-4 right-4 p-4 rounded-full glass"
    >
      🎨 {themes[currentTheme].name}
    </motion.button>
  )
} 