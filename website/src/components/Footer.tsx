'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-space-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <Link 
            href="/api"
            className="text-white hover:text-neon-blue transition-colors"
          >
            API
          </Link>
          <Link 
            href="/support"
            className="text-white hover:text-neon-blue transition-colors"
          >
            Support
          </Link>
          <Link 
            href="/docs"
            className="text-white hover:text-neon-blue transition-colors"
          >
            Documentation
          </Link>
          <Link 
            href="/privacy"
            className="text-white hover:text-neon-blue transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms"
            className="text-white hover:text-neon-blue transition-colors"
          >
            Terms
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-white">
          © 2024 Cognifuse AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 