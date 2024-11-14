/**
 * Integration Store
 * This file manages the state and operations for all third-party integrations.
 * DO NOT modify the IntegrationType without updating corresponding components.
 */

import { create } from 'zustand'
import { 
  IntegrationType, 
  Integration, 
  IntegrationState, 
  NotificationMessage 
} from '@/types/IntegrationState'

interface StoreState extends IntegrationState {
  notifications: NotificationMessage[]
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void
  removeNotification: (id: string) => void
}

export const useIntegrationStore = create<StoreState>((set, get) => ({
  integrations: {
    whatsapp: { connected: false },
    hubspot: { connected: false },
    salesforce: { connected: false },
    google: { connected: false },
    slack: { connected: false },
    sap: { connected: false }
  },
  connecting: null,
  notifications: [],

  setConnecting: (type) => set({ connecting: type }),

  connect: async (type, credentials) => {
    try {
      // TODO: Implement actual connection logic
      set((state) => ({
        integrations: {
          ...state.integrations,
          [type]: {
            connected: true,
            lastSync: new Date().toISOString(),
            credentials
          }
        },
        connecting: null
      }))
      get().addNotification('success', `Connected to ${type} successfully`)
    } catch (error) {
      get().addNotification('error', `Failed to connect to ${type}`)
      throw error
    }
  },

  disconnect: async (type) => {
    try {
      // TODO: Implement actual disconnection logic
      set((state) => ({
        integrations: {
          ...state.integrations,
          [type]: { connected: false }
        }
      }))
      get().addNotification('info', `Disconnected from ${type}`)
    } catch (error) {
      get().addNotification('error', `Failed to disconnect from ${type}`)
      throw error
    }
  },

  syncIntegration: async (type) => {
    try {
      // TODO: Implement actual sync logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      set((state) => ({
        integrations: {
          ...state.integrations,
          [type]: {
            ...state.integrations[type],
            lastSync: new Date().toISOString()
          }
        }
      }))
      get().addNotification('success', `Synced ${type} successfully`)
    } catch (error) {
      get().addNotification('error', `Failed to sync ${type}`)
      throw error
    }
  },

  addNotification: (type, message) => {
    const id = Date.now().toString()
    set((state) => ({
      notifications: [...state.notifications, { id, type, message }]
    }))
    setTimeout(() => get().removeNotification(id), 5000)
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  }
}))

// Re-export the type
export type { IntegrationType }

