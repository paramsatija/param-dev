'use client'

import { useState } from 'react'
import { 
  MessageCircle, Mail, Calendar, Briefcase, 
  MessageSquare, Database, Check, X, RefreshCw,
  Loader2
} from 'lucide-react'
import { IntegrationType } from '@/types/IntegrationState'
import { useIntegrationStore } from '@/store/integration-store'
import { WhatsAppConnectModal } from '@/components/integrations/whatsapp-connect-modal'
import { HubSpotConnectModal } from '@/components/integrations/hubspot-connect-modal'
import { SalesforceConnectModal } from '@/components/integrations/salesforce-connect-modal'
import { GoogleConnectModal } from '@/components/integrations/google-connect-modal'
import { SlackConnectModal } from '@/components/integrations/slack-connect-modal'
import { SAPConnectModal } from '@/components/integrations/sap-connect-modal'

export default function IntegrationsPage() {
  const { 
    integrations, 
    connecting, 
    setConnecting,
    connect,
    disconnect,
    syncIntegration
  } = useIntegrationStore()

  const [syncingIntegration, setSyncingIntegration] = useState<IntegrationType | null>(null)

  const integrationConfigs = [
    {
      id: 'whatsapp' as IntegrationType,
      name: 'WhatsApp Business',
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      description: 'Connect your WhatsApp Business account for messaging.',
      modal: WhatsAppConnectModal
    },
    {
      id: 'hubspot' as IntegrationType,
      name: 'HubSpot',
      icon: <Briefcase className="w-6 h-6 text-orange-500" />,
      description: 'Sync contacts, deals, and company data with HubSpot CRM.',
      modal: HubSpotConnectModal
    },
    {
      id: 'salesforce' as IntegrationType,
      name: 'Salesforce',
      icon: <Database className="w-6 h-6 text-blue-500" />,
      description: 'Connect with Salesforce for comprehensive CRM integration.',
      modal: SalesforceConnectModal
    },
    {
      id: 'google' as IntegrationType,
      name: 'Google Workspace',
      icon: <Mail className="w-6 h-6 text-red-500" />,
      description: 'Access Gmail and Google Calendar for email and scheduling.',
      modal: GoogleConnectModal
    },
    {
      id: 'slack' as IntegrationType,
      name: 'Slack',
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      description: 'Integrate with Slack for team communications.',
      modal: SlackConnectModal
    },
    {
      id: 'sap' as IntegrationType,
      name: 'SAP',
      icon: <Database className="w-6 h-6 text-blue-700" />,
      description: 'Connect to SAP for enterprise resource planning.',
      modal: SAPConnectModal
    }
  ]

  const handleSync = async (type: IntegrationType) => {
    setSyncingIntegration(type)
    try {
      await syncIntegration(type)
    } finally {
      setSyncingIntegration(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-500">Connect your accounts and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationConfigs.map((config) => {
          const integration = integrations[config.id]
          const ModalComponent = config.modal

          return (
            <div
              key={config.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {config.icon}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {config.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {config.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.connected && (
                    <button
                      onClick={() => handleSync(config.id)}
                      disabled={syncingIntegration === config.id}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      {syncingIntegration === config.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {integration.connected ? (
                    <button
                      onClick={() => disconnect(config.id)}
                      className="flex items-center text-sm text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => setConnecting(config.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
              {integration.lastSync && (
                <p className="mt-4 text-xs text-gray-400">
                  Last synced: {new Date(integration.lastSync).toLocaleString()}
                </p>
              )}
              {integration.error && (
                <p className="mt-2 text-sm text-red-600">
                  {integration.error}
                </p>
              )}

              {connecting === config.id && (
                <ModalComponent
                  isOpen={true}
                  onClose={() => setConnecting(null)}
                  onConnect={(credentials) => connect(config.id, credentials)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}