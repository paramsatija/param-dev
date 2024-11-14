import { ButtonHTMLAttributes } from 'react'
import { Github, Mail, Chrome } from 'lucide-react'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'github' | 'email'
  isLoading?: boolean
}

const providerIcons = {
  google: Chrome,
  github: Github,
  email: Mail,
}

const providerColors = {
  google: 'hover:bg-red-50 border-red-200',
  github: 'hover:bg-gray-50 border-gray-200',
  email: 'hover:bg-blue-50 border-blue-200',
}

export function SocialButton({ 
  provider, 
  isLoading, 
  children, 
  ...props 
}: SocialButtonProps) {
  const Icon = providerIcons[provider]
  
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`
        w-full flex items-center justify-center px-4 py-2.5
        border rounded-lg shadow-sm
        text-gray-700 bg-white
        transition-all duration-200
        ${providerColors[provider]}
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
    >
      <Icon className={`
        w-5 h-5 mr-3 
        transition-transform duration-200
        group-hover:scale-110
      `} />
      {children}
    </button>
  )
} 