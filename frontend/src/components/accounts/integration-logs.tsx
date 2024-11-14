'use client'

import { useState } from 'react'
import { Activity, Filter, Download } from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  type: 'info' | 'warning' | 'error'
  message: string
  details?: Record<string, any>
}

interface IntegrationLogsProps {
  accountId: string
  logs: LogEntry[]
}

export function IntegrationLogs({ accountId, logs }: IntegrationLogsProps) {
  const [filterType, setFilterType] = useState<'all' | 'info' | 'warning' | 'error'>('all')
  
  const filteredLogs = logs.filter(log => 
    filterType === 'all' ? true : log.type === filterType
  )

  const downloadLogs = () => {
    // BACKEND TODO: Implement log download
    const logData = JSON.stringify(logs, null, 2)
    const blob = new Blob([logData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `integration-logs-${accountId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Activity Logs</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-sm border border-gray-200 rounded-lg p-1"
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warning">Warnings</option>
            <option value="error">Errors</option>
          </select>
          
          <button
            onClick={downloadLogs}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg 
                     hover:bg-gray-100 transition-colors"
            title="Download logs"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`font-medium ${
                  log.type === 'error' ? 'text-red-600' :
                  log.type === 'warning' ? 'text-yellow-600' :
                  'text-gray-900'
                }`}>
                  {log.message}
                </p>
                {log.details && (
                  <pre className="mt-1 text-xs text-gray-500 overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
