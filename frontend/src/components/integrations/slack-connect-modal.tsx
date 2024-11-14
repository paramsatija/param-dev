'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

interface SlackConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (credentials: { workspaceUrl: string; botToken: string }) => Promise<void>
}

export function SlackConnectModal({ isOpen, onClose, onConnect }: SlackConnectModalProps) {
  const [credentials, setCredentials] = useState({
    workspaceUrl: '',
    botToken: ''
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
      setError('Failed to connect Slack. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Slack</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace URL
              </label>
              <input
                type="text"
                value={credentials.workspaceUrl}
                onChange={(e) => setCredentials(prev => ({ ...prev, workspaceUrl: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your-workspace.slack.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bot Token
              </label>
              <input
                type="password"
                value={credentials.botToken}
                onChange={(e) => setCredentials(prev => ({ ...prev, botToken: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="xoxb-..."
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
                'Connect Slack'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
