import { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: React.ReactNode
  variant?: 'default' | 'outline'
}

export function LoadingButton({ 
  isLoading, 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium
        transition-colors duration-200
        ${variant === 'outline' 
          ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700'}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
