'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { CalendarEvent } from '@/types/calendar'

// Animated Add Button
export function AnimatedAddButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
    >
      <Plus className="w-5 h-5" />
    </motion.button>
  )
}

// Animated Event Card
export function AnimatedEventCard({ event, onDelete }: { 
  event: CalendarEvent
  onDelete: () => void 
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </motion.button>
      
      <h3 className="font-medium text-gray-900">{event.title}</h3>
      <div className="mt-2 text-sm text-gray-500">
        {new Date(event.start).toLocaleString()}
      </div>
    </motion.div>
  )
}

// Animated Modal
export function AnimatedModal({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:max-w-lg w-full bg-white rounded-lg shadow-xl"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Loading Spinner
export function AnimatedLoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
    />
  )
}
