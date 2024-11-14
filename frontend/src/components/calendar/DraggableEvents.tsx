'use client'

import { useEffect } from 'react'
import { Draggable } from '@fullcalendar/interaction'

export function DraggableEvents({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  useEffect(() => {
    if (containerRef.current) {
      new Draggable(containerRef.current, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText,
            duration: { minutes: parseInt(eventEl.dataset.duration || '30') }
          }
        }
      })
    }
  }, [containerRef])

  return null
}
