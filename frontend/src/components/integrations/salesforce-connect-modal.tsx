/**
 * Salesforce CRM Integration Modal
 * Handles Salesforce OAuth and API connection setup.
 * 
 * BACKEND REQUIREMENTS:
 * - OAuth2 flow implementation
 * - API token management
 * - Bulk API support for data sync
 * - Streaming API for real-time updates
 * - Custom object access
 */
'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

interface SalesforceConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (credentials: { 
    clientId: string
    clientSecret: string
    username: string
    password: string 
  }) => Promise<void>
}

export function SalesforceConnectModal({ isOpen, onClose, onConnect }: SalesforceConnectModalProps) {
  const [credentials, setCredentials] = useState({
    clientId: '',
    clientSecret: '',
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await onConnect(credentials)
      onClose()
    } catch (err) {
      setError('Failed to connect Salesforce. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Salesforce</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                value={credentials.clientId}
                onChange={(e) => setCredentials(prev => ({ ...prev, clientId: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Secret
              </label>
              <input
                type="password"
                value={credentials.clientSecret}
                onChange={(e) => setCredentials(prev => ({ ...prev, clientSecret: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="email"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                'Connect Salesforce'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

