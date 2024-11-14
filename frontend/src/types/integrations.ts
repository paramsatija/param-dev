import { LucideIcon } from 'lucide-react'

export type IntegrationType = 'whatsapp' | 'hubspot' | 'salesforce' | 'google' | 'slack' | 'sap'

export interface Integration {
  id: IntegrationType
  name: string
  description: string
  iconComponent: LucideIcon
  iconColor: string
  category: 'crm' | 'communication' | 'productivity' | 'erp'
  docsUrl: string
  features: string[]
  status: 'stable' | 'beta' | 'alpha'
}

export interface IntegrationStatus {
  connected: boolean
  lastSync?: string
  error?: string
  credentials?: Record<string, any>
}

export interface IntegrationState {
  integrations: Record<IntegrationType, IntegrationStatus>
  connecting: IntegrationType | null
  setConnecting: (type: IntegrationType | null) => void
  connect: (type: IntegrationType, credentials: any) => Promise<void>
  disconnect: (type: IntegrationType) => Promise<void>
  syncIntegration: (type: IntegrationType) => Promise<void>
}

export interface NotificationMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
} 