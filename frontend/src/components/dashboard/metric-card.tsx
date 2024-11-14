// src/components/dashboard/metric-card.tsx
'use client'

import { useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, MoreVertical, Download, RefreshCw } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  isLoading?: boolean
  error?: string
  onRefresh?: () => void
  timeRange?: string
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  isLoading = false,
  error,
  onRefresh,
  timeRange = '30 days'
}: MetricCardProps) {
  const [showOptions, setShowOptions] = useState(false)

  const handleRefresh = () => {
    setShowOptions(false)
    onRefresh?.()
  }

  const handleExport = () => {
    console.log('Exporting data for:', title)
    setShowOptions(false)
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <button 
            onClick={handleRefresh}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <RefreshCw size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value}
        </p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </p>
      </div>
    </div>
  )
}
