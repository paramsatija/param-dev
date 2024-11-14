'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, 
         isSameMonth, isToday, startOfWeek, endOfWeek, addWeeks, subWeeks, 
         addDays, subDays, isSameDay } from 'date-fns'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { CalendarEvent } from '@/types/calendar'
import { EventModal } from './EventModal'
import { WeekView } from './WeekView'
import { DayView } from './DayView'
import { DraggableEvent } from './DraggableEvent'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface CalendarProps {
  view: 'Month' | 'Week' | 'Day'
}

// First, let's define the proper event type at the top of the file
interface CalendarClickEvent extends React.MouseEvent {
  event?: CalendarEvent
}

export function Calendar({ view }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar-events', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>()
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)

  const handleDateChange = (amount: number) => {
    switch (view) {
      case 'Month':
        setCurrentDate(amount > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1))
        break
      case 'Week':
        setCurrentDate(amount > 0 ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1))
        break
      case 'Day':
        setCurrentDate(amount > 0 ? addDays(currentDate, 1) : subDays(currentDate, 1))
        break
    }
  }

  const handleEventDrop = (event: CalendarEvent, newStart: Date, newEnd: Date) => {
    const updatedEvent = {
      ...event,
      start: newStart,
      end: newEnd
    }
    setEvents(events.map(e => e.id === event.id ? updatedEvent : e))
  }

  const handleEventSave = (eventData: Omit<CalendarEvent, 'id'> & { id?: string }) => {
    const newEvent: CalendarEvent = {
      id: eventData.id || Date.now().toString(),
      title: eventData.title,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      description: eventData.description,
      location: eventData.location,
      color: eventData.color
    }

    if (selectedEvent) {
      setEvents(events.map(e => e.id === newEvent.id ? newEvent : e))
    } else {
      setEvents([...events, newEvent])
    }
    setIsModalOpen(false)
    setSelectedEvent(undefined)
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId))
    setIsModalOpen(false)
    setSelectedEvent(undefined)
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

    return (
      <div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Weekday Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-3 text-center text-sm font-medium text-gray-500 border-b">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day) => {
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.start), day)
            )

            return (
              <div
                key={day.toISOString()}
                onClick={() => {
                  setSelectedEvent(undefined)
                  setCurrentDate(day)
                  setIsModalOpen(true)
                }}
                className={`
                  min-h-[120px] p-2 border-b border-r
                  ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : ''}
                  hover:bg-gray-50 cursor-pointer
                `}
              >
                <span className={`
                  inline-flex h-8 w-8 items-center justify-center rounded-full
                  ${isToday(day) ? 'bg-blue-600 text-white' : 'text-gray-900'}
                  ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                `}>
                  {format(day, 'd')}
                </span>

                {/* Events for this day */}
                <div className="mt-1 space-y-1">
                  <Reorder.Group values={dayEvents} onReorder={() => {}}>
                    {dayEvents.map((event) => (
                      <DraggableEvent
                        key={event.id}
                        event={event}
                        view="Month"
                        onEventClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          setSelectedEvent(event)
                          setIsModalOpen(true)
                        }}
                        onDragStart={() => setDraggedEvent(event)}
                        onDragEnd={(event, newStart, newEnd) => {
                          setDraggedEvent(null)
                          handleEventDrop(event, newStart, newEnd)
                        }}
                      />
                    ))}
                  </Reorder.Group>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderView = () => {
    switch (view) {
      case 'Month':
        return renderMonthView()
      case 'Week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={(event) => {
              setSelectedEvent(event)
              setIsModalOpen(true)
            }}
            onTimeSlotClick={(date) => {
              setSelectedEvent(undefined)
              setCurrentDate(date)
              setIsModalOpen(true)
            }}
          />
        )
      case 'Day':
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={(event) => {
              setSelectedEvent(event)
              setIsModalOpen(true)
            }}
            onTimeSlotClick={(date) => {
              setSelectedEvent(undefined)
              setCurrentDate(date)
              setIsModalOpen(true)
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, view === 'Month' ? 'MMMM yyyy' : 'MMM d, yyyy')}
          </h2>
          <button
            onClick={() => handleDateChange(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {renderView()}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEvent(undefined)
        }}
        event={selectedEvent}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
    </div>
  )
} 