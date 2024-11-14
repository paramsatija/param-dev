/**
 * HubSpot CRM Integration Modal
 * Handles HubSpot OAuth and API connection setup.
 * 
 * BACKEND REQUIREMENTS:
 * - OAuth2 flow implementation
 * - API token management
 * - Scopes: contacts, deals, companies
 * - Webhook setup for real-time updates
 */

'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/react-dialog'

interface HubspotConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HubSpotConnectModal({ isOpen, onClose }: HubspotConnectModalProps) {
  const [loading, setLoading] = useState(false)

  /**
   * Handle HubSpot OAuth connection
   * BACKEND:
   * - Implement OAuth2 flow
   * - Store refresh tokens
   * - Set up webhooks
   * - Initialize data sync
   */
  const handleConnect = async () => {
    setLoading(true)
    try {
      // BACKEND: Replace with actual OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500))
      // TODO: Implement proper OAuth redirect
      onClose()
    } catch (error) {
      console.error('HubSpot connection failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">Connect HubSpot</h2>
            <p className="text-sm text-gray-500">
              Connect your HubSpot account to sync contacts and deals.
            </p>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
} 