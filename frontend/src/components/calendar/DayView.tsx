'use client'

import { format } from 'date-fns'
import { CalendarEvent } from '@/types/calendar'

interface DayViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onTimeSlotClick: (date: Date) => void
}

export function DayView({ currentDate, events, onEventClick, onTimeSlotClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] overflow-auto">
      {/* Day header */}
      <div className="text-center p-4 border-b sticky top-0 bg-white z-10">
        <div className="font-medium">{format(currentDate, 'EEEE')}</div>
        <div className="text-sm text-gray-500">{format(currentDate, 'MMMM d, yyyy')}</div>
      </div>

      {/* Time grid */}
      <div className="flex flex-1">
        {/* Time labels */}
        <div className="w-16 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-12 text-right pr-2 text-sm text-gray-500">
              {format(new Date().setHours(hour), 'ha')}
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="flex-1 relative">
          {/* Hour cells */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                const date = new Date(currentDate)
                date.setHours(hour)
                onTimeSlotClick(date)
              }}
            />
          ))}

          {/* Events */}
          {events
            .filter(event => format(event.start, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd'))
            .map(event => {
              const top = event.start.getHours() * 48 + (event.start.getMinutes() / 60) * 48
              const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)
              const height = duration * 48

              return (
                <div
                  key={event.id}
                  className="absolute left-0 right-0 mx-4 rounded-md px-2 py-1 
                           text-white overflow-hidden cursor-pointer"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color || '#3B82F6'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onEventClick(event)
                  }}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-white/80">
                    {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                  </div>
                  {event.location && (
                    <div className="text-white/80 text-xs">{event.location}</div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
