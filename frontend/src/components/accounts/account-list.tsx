'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedAccountCard } from './enhanced-account-card'
import { AccountSkeleton } from './account-skeleton'
import { INTEGRATION_CONFIG, IntegrationType } from '@/lib/integration-utils'

interface Account {
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

interface AccountListProps {
  accounts: Account[]
  isLoading: boolean
  onSync: (accountId: string) => Promise<void>
  onSettingsChange: (accountId: string, settings: any) => Promise<void>
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function AccountList({ accounts, isLoading, onSync, onSettingsChange }: AccountListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <AccountSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (accounts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-gray-500">No accounts found. Add your first integration!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {accounts.map(account => (
          <motion.div key={account.id} variants={item} layout>
            <EnhancedAccountCard
              account={account}
              integration={INTEGRATION_CONFIG[account.type]}
              onSync={() => onSync(account.id)}
              onSettingsChange={(settings) => onSettingsChange(account.id, settings)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
} 