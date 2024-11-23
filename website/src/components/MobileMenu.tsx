'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// Menu items interface for type safety
interface MenuItem {
  label: string
  href: string
}

// Navigation items
const menuItems: MenuItem[] = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' }
]

export default function MobileMenu() {
  // State for menu open/close
  const [isOpen, setIsOpen] = useState(false)

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      {/* Hamburger button with animated states */}
      <motion.button
        onClick={toggleMenu}
        className="relative z-50 p-2"
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-5 relative">
          {/* Animated hamburger lines */}
          <motion.span
            className="absolute h-0.5 w-full bg-soft-white rounded-full"
            animate={{
              top: isOpen ? '50%' : '0%',
              rotate: isOpen ? '45deg' : '0deg',
              translateY: isOpen ? '-50%' : '0'
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute top-1/2 h-0.5 w-full bg-soft-white rounded-full"
            animate={{
              opacity: isOpen ? 0 : 1,
              translateY: '-50%'
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute bottom-0 h-0.5 w-full bg-soft-white rounded-full"
            animate={{
              bottom: isOpen ? '50%' : '0%',
              rotate: isOpen ? '-45deg' : '0deg',
              translateY: isOpen ? '50%' : '0'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-space-black/95 backdrop-blur-lg"
          >
            {/* Menu items container */}
            <nav className="h-full flex flex-col items-center justify-center">
              {/* Animated menu items */}
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="block py-4 px-8 text-2xl font-grotesk text-soft-white hover:text-neon-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-grotesk"
                onClick={toggleMenu}
              >
                Get Started
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 