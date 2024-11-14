'use client'

import { useState } from 'react'
import { format, addHours } from 'date-fns'
import { CalendarEvent } from '@/types/calendar'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event?: CalendarEvent
  onSave: (event: CalendarEvent) => void
  onDelete?: (id: string) => void
}

export function EventModal({ isOpen, onClose, event, onSave, onDelete }: EventModalProps) {
  const [title, setTitle] = useState(event?.title || '')
  const [description, setDescription] = useState(event?.description || '')
  const [startDate, setStartDate] = useState(
    event?.start ? format(event.start, "yyyy-MM-dd'T'HH:mm") : 
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  )
  const [endDate, setEndDate] = useState(
    event?.end ? format(event.end, "yyyy-MM-dd'T'HH:mm") : 
    format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm")
  )
  const [location, setLocation] = useState(event?.location || '')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: event?.id || Date.now().toString(),
      title,
      description,
      start: new Date(startDate),
      end: new Date(endDate),
      location,
      color: event?.color || '#3B82F6'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {event ? 'Edit Event' : 'Create Event'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">End</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            {event && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-4 py-2 text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {event ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 