'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' }
]

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-black/50 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-white">
            Cognifuse
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  )
} 