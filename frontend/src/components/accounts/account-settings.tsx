'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  X, 
  Bell, 
  Clock, 
  RefreshCw,
  Shield,
  Settings2,
  AlertCircle
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Integration, IntegrationType } from '@/lib/integration-utils'

interface AccountSettings {
  notifications: boolean
  syncInterval: number
  autoSync: boolean
  syncSchedule: 'realtime' | 'hourly' | 'daily' | 'weekly'
  dataRetention: number
  errorAlerts: boolean
}

interface AccountSettingsProps {
  account: {
    id: string
    type: IntegrationType
    name: string
    settings: AccountSettings
  }
  integration: Integration
  onSave: (settings: AccountSettings) => Promise<void>
  onClose: () => void
}

export function AccountSettings({ account, integration, onSave, onClose }: AccountSettingsProps) {
  const [settings, setSettings] = useState<AccountSettings>(account.settings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(settings)
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive updates about sync status
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({
                ...settings,
                notifications: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-blue-300 rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
            </div>
          </label>
        </div>

        {/* Sync Interval */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium">Sync Interval</h3>
          </div>
          <select
            value={settings.syncInterval}
            onChange={(e) => setSettings({
              ...settings,
              syncInterval: Number(e.target.value)
            })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value={15}>Every 15 minutes</option>
            <option value={30}>Every 30 minutes</option>
            <option value={60}>Every hour</option>
            <option value={360}>Every 6 hours</option>
            <option value={720}>Every 12 hours</option>
            <option value={1440}>Every 24 hours</option>
          </select>
        </div>

        {/* Auto Sync */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium">Auto Sync</h3>
              <p className="text-sm text-gray-500">
                Automatically sync data
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(e) => setSettings({
                ...settings,
                autoSync: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-blue-300 rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
            </div>
          </label>
        </div>

        {/* Error Alerts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium">Error Alerts</h3>
              <p className="text-sm text-gray-500">
                Get notified about sync errors
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.errorAlerts}
              onChange={(e) => setSettings({
                ...settings,
                errorAlerts: e.target.checked
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-blue-300 rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
