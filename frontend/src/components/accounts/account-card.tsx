'use client'

import { useState } from 'react'
import { MoreVertical, RefreshCw, Loader2 } from 'lucide-react'
import { IntegrationType, getIntegrationIcon, getIntegrationColor, INTEGRATION_CONFIG } from '@/lib/integration-utils'

interface AccountCardProps {
  account: {
    id: string
    type: IntegrationType
    name: string
    status: 'active' | 'error' | 'syncing'
    lastSync?: string
    error?: string
  }
  onSync: () => Promise<void>
}

export function AccountCard({ account, onSync }: AccountCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await onSync()
    } finally {
      setIsSyncing(false)
    }
  }

  const iconColor = getIntegrationColor(account.type)
  const IconComponent = INTEGRATION_CONFIG[account.type]?.iconComponent

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className={`p-2 bg-gray-50 rounded-lg ${iconColor}`}>
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{account.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {account.status === 'active' && (
                <span className="text-sm text-green-600">Connected</span>
              )}
              {account.status === 'error' && (
                <span className="text-sm text-red-600">
                  {account.error || 'Connection error'}
                </span>
              )}
              {account.lastSync && (
                <span className="text-xs text-gray-500">
                  Last synced: {new Date(account.lastSync).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 
                         flex items-center gap-2"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Sync Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
