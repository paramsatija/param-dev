'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Trash2, Bell, RefreshCw, Link } from 'lucide-react'

interface AccountSettings {
  syncInterval: number
  notifications: {
    syncComplete: boolean
    syncError: boolean
    dataChanges: boolean
  }
  webhookUrl?: string
}

interface AccountSettingsModalProps {
  accountId: string
  accountName: string
  initialSettings: AccountSettings
  onClose: () => void
  onSave: (settings: AccountSettings) => Promise<void>
  onDelete: () => Promise<void>
}

export function AccountSettingsModal({
  accountId,
  accountName,
  initialSettings,
  onClose,
  onSave,
  onDelete
}: AccountSettingsModalProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'advanced'>('general')

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(settings)
      onClose()
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">{accountName}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 px-6">
            {['general', 'notifications', 'advanced'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sync Interval
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full"
                  placeholder="Sync Interval"
                  value={settings.syncInterval}
                  onChange={(e) => setSettings({ ...settings, syncInterval: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sync Complete Notifications
                </label>
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={settings.notifications.syncComplete}
                  onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, syncComplete: e.target.checked } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sync Error Notifications
                </label>
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={settings.notifications.syncError}
                  onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, syncError: e.target.checked } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Changes Notifications
                </label>
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={settings.notifications.dataChanges}
                  onChange={(e) => setSettings({ ...settings, notifications: { ...settings.notifications, dataChanges: e.target.checked } })}
                />
              </div>
            </div>
          )}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook URL
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full"
                  placeholder="Webhook URL"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className={`${
                  isSaving ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'
                } py-2 px-4 rounded-md`}
                disabled={isSaving}
              >
                {isSaving ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
