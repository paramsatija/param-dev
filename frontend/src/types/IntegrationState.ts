export type IntegrationType = 'whatsapp' | 'hubspot' | 'salesforce' | 'google' | 'slack' | 'sap'

export interface Integration {
  connected: boolean
  lastSync?: string
  error?: string
  credentials?: Record<string, any>
}

export interface IntegrationState {
  integrations: Record<IntegrationType, Integration>
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