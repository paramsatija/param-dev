/**
 * WhatsApp Business Integration Modal
 * Handles WhatsApp Business API connection setup.
 * 
 * BACKEND REQUIREMENTS:
 * - WhatsApp Business API credentials validation
 * - Secure credential storage
 * - Connection state management
 * - Error handling for API limits and validation
 */
'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

interface WhatsAppConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (credentials: { phoneNumber: string; apiKey: string }) => Promise<void>
}

export function WhatsAppConnectModal({ isOpen, onClose, onConnect }: WhatsAppConnectModalProps) {
  // Form state management
  const [phoneNumber, setPhoneNumber] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  /**
   * Handle form submission
   * BACKEND: 
   * - Validate credentials with WhatsApp Business API
   * - Store credentials securely
   * - Initialize WebSocket connection if needed
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await onConnect({ phoneNumber, apiKey })
      onClose()
    } catch (err) {
      setError('Failed to connect WhatsApp. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect WhatsApp Business</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1234567890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Business API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your API key"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Connecting...
                </span>
              ) : (
                'Connect WhatsApp'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

