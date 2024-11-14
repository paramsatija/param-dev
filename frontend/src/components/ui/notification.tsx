'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { useEffect } from 'react'

export type NotificationType = 'success' | 'error' | 'info'

interface NotificationProps {
  type: NotificationType
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({ type, message, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 
                 flex items-center gap-3 max-w-md z-50"
    >
      {icons[type]}
      <p className="text-sm text-gray-600">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
} 