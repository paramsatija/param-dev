'use client'

import { useState } from 'react'
import { Search, Mail, Circle, Star, Archive, Reply, Forward, Trash } from 'lucide-react'
import Image from 'next/image'

// Define our message type
interface Message {
  id: number
  name: string
  status: string
  preview: string
  time: string
  avatar: string
  unread: boolean
  category: 'lead' | 'meeting' | 'deal' | 'follow-up'
  starred: boolean
}

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [loading, setLoading] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

  // Function to handle message selection
  const handleMessageClick = (messageId: number) => {
    setSelectedMessage(messageId)
    // Mark message as read
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    ))
  }

  // Function to toggle star
  const toggleStar = (messageId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent message selection
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ))
  }

  // Function to archive message
  const archiveMessage = (messageId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setMessages(messages.filter(msg => msg.id !== messageId))
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Sarah Smith',
      status: 'New lead',
      preview: 'I would like to discuss your product pricing and features...',
      time: '10:31 AM',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith',
      unread: true,
      category: 'lead',
      starred: false
    },
    {
      id: 2,
      name: 'John Doe',
      status: 'Meeting request',
      preview: 'Can we schedule a demo for next week? I have some questions...',
      time: '10:31 AM',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      unread: true,
      category: 'meeting',
      starred: true
    },
    {
      id: 3,
      name: 'Emma Wilson',
      status: 'Deal update',
      preview: 'Thank you for the proposal. Our team has reviewed it and...',
      time: '9:45 AM',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson',
      unread: false,
      category: 'deal',
      starred: false
    },
    // Add more messages as needed
  ])

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white p-4 space-y-2">
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg bg-gray-100">
            <Mail className="w-5 h-5" />
            <span>Inbox</span>
            {messages.filter(m => m.unread).length > 0 && (
              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {messages.filter(m => m.unread).length}
              </span>
            )}
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
            <Archive className="w-5 h-5" />
            <span>Archived</span>
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
            <Star className="w-5 h-5" />
            <span>Starred</span>
          </button>
        </div>

        {/* Categories */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </h3>
          <div className="mt-4 space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <Circle className="w-3 h-3 text-blue-500" />
              <span>Leads</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <Circle className="w-3 h-3 text-green-500" />
              <span>Meetings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <Circle className="w-3 h-3 text-purple-500" />
              <span>Deals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-200 mb-6">
            {['All', 'Unread', 'Starred', 'Archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Messages list */}
          <div className="space-y-2">
            {loading ? (
              // Loading state
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Messages
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message.id)}
                  className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    message.unread ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <Image 
                    src={message.avatar}
                    alt={message.name}
                    width={500}
                    height={300}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${
                        message.unread ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {message.name}
                      </h3>
                      <span className="text-sm text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{message.status}</p>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                  
                  {/* Message actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e: React.MouseEvent) => toggleStar(message.id, e)}
                      className={`p-1 rounded-full hover:bg-gray-100 ${
                        message.starred ? 'text-yellow-400' : 'text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => archiveMessage(message.id, e)}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                      <Reply className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                      <Forward className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}