'use client'

import { Loader2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface IntegrationCardProps {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  connected: boolean
  lastSync?: string
  onSync: () => Promise<void>
  onConnect: () => void
  onDisconnect: () => void
  isSyncing: boolean
  error?: string
}

export function IntegrationCard({
  id,
  name,
  description,
  icon,
  connected,
  lastSync,
  onSync,
  onConnect,
  onDisconnect,
  isSyncing,
  error
}: IntegrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {icon}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {connected && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full 
                       hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Sync data"
            >
              {isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </button>
          )}
          <button
            onClick={connected ? onDisconnect : onConnect}
            className={`px-4 py-2 rounded-lg transition-colors ${
              connected 
                ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
      
      {/* Status indicators */}
      <div className="mt-4 space-y-2">
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            {error}
          </p>
        )}
        {lastSync && (
          <p className="text-xs text-gray-400">
            Last synced: {new Date(lastSync).toLocaleString()}
          </p>
        )}
        {connected && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500">Connected</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
