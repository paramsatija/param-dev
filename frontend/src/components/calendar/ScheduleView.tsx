'use client'

import { format } from 'date-fns'
import { Clock } from 'lucide-react'

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  type?: string
}

interface ScheduleViewProps {
  events: Event[]
}

export function ScheduleView({ events }: ScheduleViewProps) {
  const sortedEvents = events.sort((a, b) => a.start.getTime() - b.start.getTime())

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Your schedule</h3>
      <div className="space-y-4">
        {sortedEvents.map(event => (
          <div 
            key={event.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {event.title}
              </p>
              <p className="text-sm text-gray-500">
                {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
              </p>
              {event.type && (
                <p className="text-sm text-gray-500">
                  {event.type}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 