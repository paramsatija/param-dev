'use client'

import { motion, Reorder, useDragControls } from 'framer-motion'
import { format } from 'date-fns'
import { CalendarEvent } from '@/types/calendar'

interface DraggableEventProps {
  event: CalendarEvent
  view: 'Month' | 'Week' | 'Day'
  onEventClick: (e: React.MouseEvent) => void
  onDragStart?: () => void
  onDragEnd?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void
}

export function DraggableEvent({
  event,
  view,
  onEventClick,
  onDragStart,
  onDragEnd
}: DraggableEventProps) {
  const dragControls = useDragControls()

  return (
    <Reorder.Item value={event} dragControls={dragControls}>
      <motion.div
        layout
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={onDragStart}
        onDragEnd={(_, info) => {
          if (onDragEnd) {
            const pixelsPerHour = 48 // Matches our time grid
            const hoursMoved = Math.round(info.offset.y / pixelsPerHour)
            
            const newStart = new Date(event.start)
            newStart.setHours(newStart.getHours() + hoursMoved)
            
            const newEnd = new Date(event.end)
            newEnd.setHours(newEnd.getHours() + hoursMoved)
            
            onDragEnd(event, newStart, newEnd)
          }
        }}
        className={`
          group relative rounded-md overflow-hidden cursor-grab active:cursor-grabbing
          ${view === 'Month' ? 'p-1' : 'p-2'}
        `}
        style={{ backgroundColor: event.color || '#3B82F6' }}
      >
        <div className={`text-white ${view === 'Month' ? 'text-xs' : 'text-sm'}`}>
          <div className="font-medium truncate">{event.title}</div>
          {view !== 'Month' && (
            <>
              <div className="text-white/80 text-xs">
                {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
              </div>
              {event.location && (
                <div className="text-white/80 text-xs truncate">{event.location}</div>
              )}
            </>
          )}
        </div>

        {/* Resize handles */}
        <div className="absolute inset-x-0 top-0 h-1 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-1 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-white/20" />
      </motion.div>
    </Reorder.Item>
  )
} 