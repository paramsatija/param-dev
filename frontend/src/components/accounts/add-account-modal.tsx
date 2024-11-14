'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Integration, IntegrationType } from '@/types/integrations'
import { INTEGRATION_CONFIG } from '@/lib/integration-utils'
import { ConnectionModal } from './connection-modal'

interface AddAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (integrationType: IntegrationType) => void
}

export function AddAccountModal({ isOpen, onClose, onSelect }: AddAccountModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const filteredIntegrations = Object.values(INTEGRATION_CONFIG).filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleIntegrationSelect = (integration: Integration) => {
    setSelectedIntegration(integration)
  }

  const handleConnectionComplete = async () => {
    if (selectedIntegration) {
      await onSelect(selectedIntegration.id)
      setSelectedIntegration(null)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add Account</h2>
                  <p className="text-sm text-gray-500">Select an integration to connect</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search integrations..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Integrations Grid */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredIntegrations.map((integration) => (
                    <button
                      key={integration.id}
                      onClick={() => handleIntegrationSelect(integration)}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg 
                               hover:border-indigo-500 hover:shadow-md transition-all text-left"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {integration.iconComponent && 
                          <integration.iconComponent className={`w-6 h-6 ${integration.iconColor}`} />
                        }
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConnectionModal
        integration={selectedIntegration!}
        isOpen={!!selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
        onConnect={handleConnectionComplete}
      />
    </>
  )
}
