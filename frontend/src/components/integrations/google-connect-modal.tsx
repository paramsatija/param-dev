'use client'

import { useState } from 'react'
import { X, Loader2, Mail, Calendar } from 'lucide-react'

interface GoogleConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (scopes: string[]) => Promise<void>
}

export function GoogleConnectModal({ isOpen, onClose, onConnect }: GoogleConnectModalProps) {
  const [scopes, setScopes] = useState({
    email: true,
    calendar: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const selectedScopes = [
      ...(scopes.email ? ['https://www.googleapis.com/auth/gmail.modify'] : []),
      ...(scopes.calendar ? ['https://www.googleapis.com/auth/calendar'] : [])
    ]

    try {
      await onConnect(selectedScopes)
      onClose()
    } catch (err) {
      setError('Failed to connect Google Workspace.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Google Workspace</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={scopes.email}
                  onChange={(e) => setScopes(prev => ({ ...prev, email: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Gmail Access</span>
              </label>
              <p className="text-xs text-gray-500 ml-6">Read and send emails on your behalf</p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={scopes.calendar}
                  onChange={(e) => setScopes(prev => ({ ...prev, calendar: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Calendar Access</span>
              </label>
              <p className="text-xs text-gray-500 ml-6">Manage your calendar events and meetings</p>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || (!scopes.email && !scopes.calendar)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Connecting...
                </span>
              ) : (
                'Connect Google Workspace'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

