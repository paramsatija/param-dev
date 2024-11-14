/**
 * Calendar Page Component
 * Displays and manages calendar events and scheduling.
 * 
 * Features:
 * - Full calendar view with month, week, and day views
 * - Drag and drop event management
 * - Event clicking and editing
 * - Better event visualization
 * - Upcoming events sidebar
 * - Proper date/time handling
 * - Event details with icons
 * - Responsive layout
 * - Better typing for events
 * - Interactive event management
 * 
 * BACKEND INTEGRATION POINTS:
 * - Event CRUD operations
 * - Calendar sync with external services
 * - Attendee management
 */

'use client'

import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Calendar } from '@/components/calendar/Calendar'

export default function CalendarPage() {
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month')

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <p className="text-sm text-gray-500">November 2024</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-[300px]"
            />
          </div>

          {/* View Switcher */}
          <div className="flex rounded-lg border border-gray-200 bg-white">
            {['Month', 'Week', 'Day'].map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption as 'Month' | 'Week' | 'Day')}
                className={`px-4 py-2 text-sm font-medium ${
                  view === viewOption 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {viewOption}
              </button>
            ))}
          </div>

          {/* Add Event Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="bg-white rounded-lg shadow">
        <Calendar view={view} />
      </div>
    </div>
  )
}