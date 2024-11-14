'use client'

import { ViewType } from '@/types/calendar'

interface ViewSwitcherProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200">
      {['month', 'week', 'day'].map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view as ViewType)}
          className={`
            px-4 py-2 text-sm font-medium
            ${currentView === view 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'}
          `}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  )
} 