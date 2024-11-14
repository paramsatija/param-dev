'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react'

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'

interface SyncStatusIndicatorProps {
  status: SyncStatus
  lastSync?: string
  error?: string
}

export function SyncStatusIndicator({ status, lastSync, error }: SyncStatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {lastSync ? `Last synced ${new Date(lastSync).toLocaleString()}` : 'Never synced'}
            </span>
          </motion.div>
        )}

        {status === 'syncing' && (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 text-indigo-600"
          >
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Syncing...</span>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Sync completed</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 text-red-600"
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm">{error || 'Sync failed'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
