/**
 * Global Type Definitions
 * This file contains all shared types used across the application.
 * IMPORTANT: Changes here affect multiple components - update with caution.
 */

// Calendar Types
export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  allDay?: boolean
  extendedProps?: {
    type: 'meeting' | 'call' | 'task'
    description?: string
    attendees: string[]
    location?: string
  }
}

// Base Modal Props
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

// Separate Event Modal Props (don't extend ModalProps)
export interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event?: CalendarEvent
  onSave: (event: CalendarEvent) => void
  onDelete?: (eventId: string) => void
}

// Lead Management Types
export interface Lead {
  id: string
  name: string
  company: string
  title: string
  location: string
  owner: string        // Sales rep responsible for the lead
  lastContacted: string // ISO date string
  email: string
  phone: string
  website: string
  status: 'new' | 'open' | 'qualified' | 'unqualified'
}

// Lead Table Component Types
export interface LeadTableProps {
  leads: Lead[]
  onLeadSelect: (lead: Lead) => void
}

// Lead Details Panel Types
export interface LeadDetailsPanelProps {
  lead?: Lead
  onClose: () => void
}
