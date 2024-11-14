'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, HelpCircle, Settings, Sparkles, User, FileText, BarChart3, LogOut, KeyIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profileMenuItems } from './profile-menu-items'
import { useTheme } from 'next-themes'
import { signOut } from 'aws-amplify/auth' // Since you're using AWS Amplify

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/inbox', label: 'Inbox' },
  { href: '/chat', label: 'Chat' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/leads', label: 'Leads' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/contacts', label: 'Contacts' },
] as const

const settingsItems = [
  { href: '/settings/integrations', label: 'Integrations' },
  { href: '/settings/api-keys', label: 'API Keys' },
  { href: '/settings/notifications', label: 'Notifications' },
  { href: '/settings/profile', label: 'Profile Settings' },
] as const

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export function TopNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Lead',
      message: 'Sarah Johnson from Tech Solutions showed interest',
      time: '2m ago',
      read: false
    },
    // Add more notifications as needed
  ])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle navigation with dropdown close
  const handleNavigation = (path: string) => {
    setIsProfileOpen(false)
    router.push(path)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Zoe
                </span>
                <span className="text-sm text-gray-600 font-medium tracking-wide">
                  Your Sales Copilot
                </span>
              </div>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-white rounded-lg w-64 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200 text-black placeholder-gray-500"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Bell size={20} className="text-gray-700" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg 
                           shadow-lg border border-gray-200 py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    <button className="text-xs text-gray-600 hover:underline">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-100 ${
                          !notification.read ? 'bg-white' : ''
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-8 w-8 rounded-full bg-white border border-gray-200
                        flex items-center justify-center hover:ring-2 hover:ring-indigo-100 transition-all"
            >
              <span className="text-sm font-medium text-black">EA</span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg 
                           shadow-lg border border-gray-200 py-2 z-50"
                >
                  {/* User Info - Clickable to go to profile */}
                  <button 
                    onClick={() => handleNavigation('/settings/profile')}
                    className="w-full px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-600">EA</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">Edward Anderson</p>
                        <p className="text-sm text-gray-500">edward@example.com</p>
                      </div>
                    </div>
                  </button>

                  {/* Menu Items */}
                  <div className="py-2">
                    {/* Account Section */}
                    <div>
                      <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </p>
                      <button
                        onClick={() => handleNavigation('/settings/profile')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </button>
                      <button
                        onClick={() => handleNavigation('/settings/notifications')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Bell className="w-4 h-4" />
                        Notifications
                        {notifications.some(n => !n.read) && (
                          <span className="ml-auto h-2 w-2 bg-red-500 rounded-full" />
                        )}
                      </button>
                      <button
                        onClick={() => handleNavigation('/settings/api-keys')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <KeyIcon className="w-4 h-4" />
                        API Keys
                      </button>
                    </div>

                    {/* Resources Section */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resources
                      </p>
                      <button
                        onClick={() => handleNavigation('/docs')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4" />
                        Documentation
                      </button>
                      <button
                        onClick={() => handleNavigation('/analytics')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
