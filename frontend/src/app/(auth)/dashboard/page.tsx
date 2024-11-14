'use client'

import { useState } from 'react'
import { MetricCard } from '@/components/dashboard/metric-card'
import { RecentLeads } from '@/components/dashboard/recent-leads'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { WelcomeHeader } from '@/components/dashboard/welcome-header'
import { TaskList } from '@/components/dashboard/task-list'

// Mock data
const mockTasks = [
  {
    id: '1',
    title: 'Call Michael at 2pm',
    description: 'Follow up with new lead',
    type: 'call' as const,
  },
  {
    id: '2',
    title: 'Follow up with Alex',
    description: 'Follow up with new lead',
    type: 'email' as const,
  },
]

const mockMetrics = {
  totalLeads: { value: '1,234', change: '+12.3%', trend: 'up' as const },
  conversionRate: { value: '23.5%', change: '+2.1%', trend: 'up' as const },
  revenue: { value: '$45.2K', change: '-3.2%', trend: 'down' as const },
  activeDeals: { value: '28', change: '+4', trend: 'up' as const }
}

export default function DashboardPage() {
  // Remove Firebase auth and loading state
  const [metrics] = useState(mockMetrics)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl text-gray-900 mb-6">
        Here's what's happening with your sales today.
      </h2>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Leads"
          value={metrics.totalLeads.value}
          change={metrics.totalLeads.change}
          trend={metrics.totalLeads.trend}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate.value}
          change={metrics.conversionRate.change}
          trend={metrics.conversionRate.trend}
        />
        <MetricCard
          title="Revenue"
          value={metrics.revenue.value}
          change={metrics.revenue.change}
          trend={metrics.revenue.trend}
        />
        <MetricCard
          title="Active Deals"
          value={metrics.activeDeals.value}
          change={metrics.activeDeals.change}
          trend={metrics.activeDeals.trend}
        />
      </div>

      {/* Charts and Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            "Today's Overview"
          </h3>
          <PerformanceChart />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Leads
          </h3>
          <RecentLeads />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming tasks</h2>
        <TaskList tasks={mockTasks} />
      </div>
    </div>
  )
}
