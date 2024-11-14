'use client'

import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

interface Lead {
  id: string
  name: string
  company: string
  status: 'New' | 'In Progress' | 'Qualified' | 'Unqualified'
  value: string
  lastContact?: string
}

const recentLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Tech Solutions Inc',
    status: 'New',
    value: '$12,000',
    lastContact: '2 days ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Digital Dynamics',
    status: 'In Progress',
    value: '$8,500',
    lastContact: '1 day ago'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    company: 'Cloud Systems',
    status: 'New',
    value: '$15,000',
    lastContact: '3 hours ago'
  },
]

export function RecentLeads() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
        <button className="text-sm text-gray-600 hover:text-gray-900">View all</button>
      </div>
      
      <div className="space-y-4">
        {[
          {
            name: 'Sarah Johnson',
            company: 'Tech Solutions Inc',
            lastContact: '2 days ago',
            value: '$12,000',
            status: 'New'
          },
          {
            name: 'Michael Chen',
            company: 'Digital Dynamics',
            lastContact: '1 day ago',
            value: '$8,500',
            status: 'In Progress'
          },
          {
            name: 'Emma Wilson',
            company: 'Cloud Systems',
            lastContact: '3 hours ago',
            value: '$15,000',
            status: 'New'
          }
        ].map((lead, index) => (
          <div 
            key={index}
            className="group relative bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-all duration-200 ease-in-out"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-gray-900">
                  {lead.name}
                </h3>
                <p className="text-sm text-gray-600">{lead.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last contact: {lead.lastContact}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-900">
                  {lead.value}
                </span>
                <span className={`
                  mt-2 px-2 py-1 text-xs rounded-full
                  ${lead.status === 'New' 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-gray-200 text-gray-800'}
                `}>
                  {lead.status}
                </span>
              </div>
            </div>
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <svg 
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
