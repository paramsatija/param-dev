'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface SyncEvent {
  id: string
  timestamp: string
  status: 'success' | 'error' | 'warning'
  message: string
  details?: string
}

interface SyncHistoryProps {
  accountId: string
  events: SyncEvent[]
}

export function SyncHistory({ accountId, events }: SyncHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusIcons = {
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
    error: <XCircle className="w-4 h-4 text-red-500" />,
    warning: <AlertCircle className="w-4 h-4 text-yellow-500" />
  }

  return (
    <div className="mt-4 border-t border-gray-100">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Sync History
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="space-y-2 py-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 text-sm p-2 rounded-lg hover:bg-gray-50"
            >
              {statusIcons[event.status]}
              <div>
                <p className="text-gray-900">{event.message}</p>
                {event.details && (
                  <p className="text-gray-500 text-xs mt-1">{event.details}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
