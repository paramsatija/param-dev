'use client'

import { useState } from 'react'
import { Search, Filter, Star, Download } from 'lucide-react'

interface App {
  id: string
  name: string
  description: string
  category: string
  rating: number
  downloads: number
  price: string
  image: string
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const apps: App[] = [
    {
      id: '1',
      name: 'Email Campaign Manager',
      description: 'Automate your email campaigns with AI-powered templates and analytics.',
      category: 'Marketing',
      rating: 4.8,
      downloads: 12500,
      price: 'Free',
      image: '/apps/email-campaign.png'
    },
    {
      id: '2',
      name: 'Lead Scoring AI',
      description: 'Advanced AI algorithm to score and prioritize your leads automatically.',
      category: 'Sales',
      rating: 4.9,
      downloads: 8300,
      price: '$29/mo',
      image: '/apps/lead-scoring.png'
    }
  ]

  const categories = [
    'All',
    'Sales',
    'Marketing',
    'Analytics',
    'Communication',
    'Productivity',
    'Integration'
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Marketplace
        </h1>
        <p className="text-gray-500">
          Discover apps and integrations to enhance your sales workflow
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-lg whitespace-nowrap border border-gray-200 ${
                selectedCategory === category.toLowerCase()
                  ? 'bg-gray-50 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div
            key={app.id}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-video bg-gray-50">
              {/* Add image here once you have them */}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {app.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {app.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {app.rating}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {app.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {app.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}