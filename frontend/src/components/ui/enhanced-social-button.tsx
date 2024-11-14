'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { buttonHover } from '@/lib/animations'
import { LoadingSpinner } from './loading-spinner'

interface EnhancedSocialButtonProps {
  provider: 'google' | 'github' | 'email'
  onClick?: () => void
  isLoading?: boolean
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.27-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.28-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.4.11-2.91 0 0 .93-.3 3.05 1.13a10.65 10.65 0 015.6 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.51.22 2.63.11 2.91.7.76 1.12 1.73 1.12 2.92 0 4.18-2.54 5.1-4.97 5.37.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0012 1.27"
    />
  </svg>
)

const EmailIcon = () => (
  <Mail className="w-5 h-5" />
)

export function EnhancedSocialButton({ 
  provider, 
  onClick, 
  isLoading 
}: EnhancedSocialButtonProps) {
  const getProviderDetails = () => {
    switch (provider) {
      case 'google':
        return {
          icon: <GoogleIcon />,
          text: 'Continue with Google'
        }
      case 'github':
        return {
          icon: <GithubIcon />,
          text: 'Continue with GitHub'
        }
      case 'email':
        return {
          icon: <EmailIcon />,
          text: 'Sign in with Email'
        }
    }
  }

  const { icon, text } = getProviderDetails()

  return (
    <motion.div
      whileHover={buttonHover}
      whileTap={{ scale: 0.98 }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingSpinner className="w-5 h-5" />
        ) : (
          <>
            {icon}
            <span>{text}</span>
          </>
        )}
      </button>
    </motion.div>
  )
}