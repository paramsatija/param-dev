'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Integration, IntegrationType } from '@/lib/integration-utils'

interface AccountDetailsProps {
  account: {
    id: string
    type: IntegrationType
    name: string
    status: 'active' | 'error' | 'syncing'
    lastSync?: string
    error?: string
    syncHistory: Array<{
      id: string
      timestamp: string
      status: 'success' | 'error' | 'warning'
      message: string
    }>
  }
  integration: Integration
  onSync: () => Promise<void>
  onDelete: () => void
}

export function AccountDetails({ account, integration, onSync, onDelete }: AccountDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await onSync()
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <integration.iconComponent className={`w-8 h-8 ${integration.iconColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{account.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    account.status === 'active' ? 'success' :
                    account.status === 'error' ? 'error' :
                    'warning'
                  }
                >
                  {account.status === 'active' ? 'Connected' :
                   account.status === 'error' ? 'Error' :
                   'Syncing'}
                </Badge>
                {account.lastSync && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last synced {new Date(account.lastSync).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg 
                       hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg 
                       hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sync History */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Sync History</h3>
        <div className="space-y-4">
          {account.syncHistory.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 text-sm"
            >
              {event.status === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              )}
              {event.status === 'error' && (
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              )}
              {event.status === 'warning' && (
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              )}
              <div>
                <p className="text-gray-900">{event.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Info */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Integration Details</h3>
            <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
          </div>
          <a
            href={integration.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium 
                     flex items-center gap-1"
          >
            View Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
} 