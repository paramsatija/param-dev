'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface EnhancedSocialButtonProps {
  provider: 'google' | 'github' | 'email'
  onClick?: () => void
  isLoading?: boolean
}

const providerConfig = {
  google: {
    text: 'Continue with Google',
    icon: '/images/google.svg',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-300',
    hoverBg: 'hover:bg-gray-50'
  },
  github: {
    text: 'Continue with GitHub',
    icon: '/images/github.svg',
    bgColor: 'bg-[#24292F]',
    textColor: 'text-white',
    borderColor: 'border-transparent',
    hoverBg: 'hover:bg-[#1a1f24]'
  },
  email: {
    text: 'Continue with Email',
    icon: '/images/email.svg',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-300',
    hoverBg: 'hover:bg-gray-50'
  }
}

export function EnhancedSocialButton({
  provider,
  onClick,
  isLoading = false
}: EnhancedSocialButtonProps) {
  const config = providerConfig[provider]

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative w-full flex items-center justify-center px-4 py-3
        ${config.bgColor} ${config.textColor} ${config.hoverBg}
        border ${config.borderColor} rounded-xl
        font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Image
            src={config.icon}
            alt={`${provider} icon`}
            width={20}
            height={20}
            className="absolute left-4"
          />
          {config.text}
        </>
      )}
    </motion.button>
  )
} 