export type EventCategory = 'meeting' | 'task' | 'reminder' | 'personal' | 'work'

export interface EventColors {
  meeting: string
  task: string
  reminder: string
  personal: string
  work: string
}

export const EVENT_COLORS: EventColors = {
  meeting: '#3B82F6', // blue
  task: '#10B981',    // green
  reminder: '#F59E0B', // yellow
  personal: '#EC4899', // pink
  work: '#8B5CF6'     // purple
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  location?: string
  color?: string
  // Remove category and attendees if you don't need them
  // Or add them if you do:
  // category?: string
  // attendees?: string[]
}

export interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event?: CalendarEvent
  onSave: (event: CalendarEvent) => void
  onDelete?: (eventId: string) => void
}

export interface EventCardProps {
  event: CalendarEvent
  onClick?: () => void
}

export type ViewType = 'Month' | 'Week' | 'Day' 