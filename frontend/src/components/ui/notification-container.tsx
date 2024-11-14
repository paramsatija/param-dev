'use client'

import { AnimatePresence } from 'framer-motion'
import { Notification } from './notification'
import { useIntegrationStore } from '@/store/integration-store'

export function NotificationContainer() {
  const { notifications, removeNotification } = useIntegrationStore()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
