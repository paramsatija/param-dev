'use client'

import { useState } from 'react'

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'open', label: 'Open' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'unqualified', label: 'Unqualified' },
] as const

type FilterTab = typeof filterTabs[number]['id']

export function LeadFilters() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')

  return (
    <div className="flex gap-2 mb-6">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFilter(tab.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab.id === activeFilter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}