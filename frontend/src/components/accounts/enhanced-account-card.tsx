'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, MoreVertical, ExternalLink } from 'lucide-react'
import { Integration, IntegrationType } from '@/lib/integration-utils'
import { SyncStatusIndicator } from './sync-status-indicator'
import { AccountSettings } from './account-settings'

interface EnhancedAccountCardProps {
  account: {
    id: string
    type: IntegrationType
    name: string
    status: 'idle' | 'syncing' | 'success' | 'error'
    lastSync?: string
    error?: string
    settings: {
      notifications: boolean
      syncInterval: number
      autoSync: boolean
      syncSchedule: 'realtime' | 'hourly' | 'daily' | 'weekly'
      dataRetention: number
      errorAlerts: boolean
    }
  }
  integration: Integration
  onSync: () => Promise<void>
  onSettingsChange: (settings: any) => Promise<void>
}

export function EnhancedAccountCard({ 
  account, 
  integration, 
  onSync, 
  onSettingsChange 
}: EnhancedAccountCardProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all"
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gray-50 rounded-lg"
          >
            <integration.iconComponent className={`w-6 h-6 ${integration.iconColor}`} />
          </motion.div>
          <div>
            <h3 className="font-medium text-gray-900">{account.name}</h3>
            <SyncStatusIndicator
              status={account.status}
              lastSync={account.lastSync}
              error={account.error}
            />
          </div>
        </div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full 
                     hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg 
                         border border-gray-200 py-1 z-10"
              >
                <button
                  onClick={() => {
                    setIsSettingsOpen(true)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 
                           hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <a
                  href={integration.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 
                           hover:bg-gray-50 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Documentation
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <AccountSettings
              account={account}
              integration={integration}
              onSave={onSettingsChange}
              onClose={() => setIsSettingsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
