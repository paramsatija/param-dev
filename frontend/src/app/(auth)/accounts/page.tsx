'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, AlertCircle } from 'lucide-react'
import { AccountList } from '@/components/accounts/account-list'
import { AddAccountModal } from '@/components/accounts/add-account-modal'
import { ErrorBoundary } from '@/components/accounts/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { IntegrationType } from '@/lib/integration-utils'

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accounts, setAccounts] = useState<Array<{
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
  }>>([])

  // Simulated data loading
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setIsLoading(true)
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setAccounts([]) // Add mock data here
      } catch (err) {
        setError('Failed to load accounts')
      } finally {
        setIsLoading(false)
      }
    }
    loadAccounts()
  }, [])

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSync = async (accountId: string) => {
    const accountIndex = accounts.findIndex(a => a.id === accountId)
    if (accountIndex === -1) return

    const updatedAccounts = [...accounts]
    updatedAccounts[accountIndex] = {
      ...updatedAccounts[accountIndex],
      status: 'syncing'
    }
    setAccounts(updatedAccounts)

    try {
      // TODO: Replace with actual sync API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      updatedAccounts[accountIndex] = {
        ...updatedAccounts[accountIndex],
        status: 'success',
        lastSync: new Date().toISOString()
      }
    } catch (err) {
      updatedAccounts[accountIndex] = {
        ...updatedAccounts[accountIndex],
        status: 'error',
        error: 'Sync failed'
      }
    }

    setAccounts(updatedAccounts)
  }

  const handleSettingsChange = async (accountId: string, newSettings: any) => {
    const accountIndex = accounts.findIndex(a => a.id === accountId)
    if (accountIndex === -1) return

    const updatedAccounts = [...accounts]
    updatedAccounts[accountIndex] = {
      ...updatedAccounts[accountIndex],
      settings: newSettings
    }
    setAccounts(updatedAccounts)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
              <p className="text-sm text-gray-500">Manage your connected accounts</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 
                       flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Account
            </motion.button>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounts"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              <AlertCircle className="w-6 h-6 mr-2" />
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner />
          )}

          {/* Accounts Grid */}
          <AccountList
            accounts={filteredAccounts}
            isLoading={isLoading}
            onSync={handleSync}
            onSettingsChange={handleSettingsChange}
          />

          {/* Add Account Modal */}
          <AnimatePresence>
            {isAddModalOpen && (
              <AddAccountModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSelect={(type) => {
                  // TODO: Implement account creation
                  console.log('Selected integration:', type)
                  setIsAddModalOpen(false)
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  )
}

