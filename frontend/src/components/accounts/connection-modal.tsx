'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { Integration } from '@/lib/integration-utils'

interface ConnectionModalProps {
  integration: Integration
  isOpen: boolean
  onClose: () => void
  onConnect: () => Promise<void>
}

type ConnectionStep = 'info' | 'connecting' | 'success'

export function ConnectionModal({ integration, isOpen, onClose, onConnect }: ConnectionModalProps) {
  const [step, setStep] = useState<ConnectionStep>('info')
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    setStep('connecting')
    setError(null)
    
    try {
      await onConnect()
      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect')
      setStep('info')
    }
  }

  const isConnecting = step === 'connecting'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <integration.iconComponent className={`w-6 h-6 ${integration.iconColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{integration.name}</h2>
                  <p className="text-sm text-gray-500">Connect your account</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                disabled={isConnecting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'info' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Connect your {integration.name} account to access these features:
                  </p>
                  <ul className="space-y-2">
                    {integration.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </p>
                  )}
                </div>
              )}

              {step === 'connecting' && (
                <div className="py-8 text-center">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Connecting to {integration.name}...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Successfully Connected!
                  </h3>
                  <p className="text-gray-600">
                    Your {integration.name} account is now connected and ready to use.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              {step === 'info' && (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    disabled={isConnecting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConnect}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isConnecting}
                  >
                    Connect
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
              {step === 'success' && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Done
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 