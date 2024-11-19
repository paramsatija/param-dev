// src/app/leads/page.tsx
'use client'

import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { LeadFilters } from '@/components/leads/lead-filters'
import { LeadTable } from '@/components/leads/lead-table'
import { LeadDetailsPanel } from '@/components/leads/lead-details-panel'
import { Lead } from '@/types'
import { CSVUpload } from '@/components/leads/csv-upload'
import { toast } from 'sonner'

// Sample data
const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'Megan Hill',
    company: 'Dunder Mifflin',
    title: 'Sales Manager',
    location: 'Scranton, PA',
    owner: 'Michael Scott',
    lastContacted: '2 days ago',
    email: 'megan.hill@dundermifflin.com',
    phone: '+1 (555) 123-4567',
    website: 'www.dundermifflin.com',
    status: 'new',
  },
]

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>(undefined)
  const [uploadedLeads, setUploadedLeads] = useState<any[]>([])
  const [isSending, setIsSending] = useState(false)

  const filteredLeads = sampleLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUploadComplete = (data: any[]) => {
    setUploadedLeads(data)
    toast.success(`Successfully uploaded ${data.length} leads`)
  }

  const handleSendLeadRequests = async () => {
    if (!uploadedLeads.length) {
      toast.error('No leads to send requests to')
      return
    }

    setIsSending(true)
    try {
      // Replace this with your actual API endpoint
      const response = await fetch('/api/leads/bulk-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leads: uploadedLeads }),
      })

      if (!response.ok) throw new Error('Failed to send lead requests')

      toast.success('Successfully sent lead requests')
      setUploadedLeads([])
    } catch (error) {
      toast.error('Failed to send lead requests')
      console.error(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <div className="flex gap-3">
            {uploadedLeads.length > 0 && (
              <button
                onClick={handleSendLeadRequests}
                disabled={isSending}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSending ? 'Sending...' : `Send Requests (${uploadedLeads.length})`}
              </button>
            )}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus size={20} />
              New lead
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search leads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Filters */}
        <LeadFilters />

        {/* CSV Upload Section */}
        <div className="mb-6">
          <CSVUpload
            onUploadComplete={handleUploadComplete}
            onError={(error) => toast.error(error)}
          />
        </div>

        {/* Table */}
        <LeadTable 
          leads={filteredLeads}
          onLeadSelect={(lead) => setSelectedLead(lead)}
        />
      </div>

      {/* Details Panel */}
      <LeadDetailsPanel 
        lead={selectedLead}
        onClose={() => setSelectedLead(undefined)}
      />
    </>
  )
}
