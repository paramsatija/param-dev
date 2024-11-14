/**
 * Chat Store
 * Manages all chat-related state and operations.
 * Uses Zustand for state management.
 * 
 * BACKEND INTEGRATION POINTS:
 * - Message sending/receiving
 * - Chat history persistence
 * - Real-time updates
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define message types
interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

// Define chat structure
interface Chat {
  id: string
  title: string
  messages: Message[]
}

// Define chat store state and actions
interface ChatStore {
  chats: Chat[]
  currentChatId: string | null
  isTyping: boolean

  // Actions
  addChat: () => void
  addMessage: (content: string) => Promise<void>
  setCurrentChat: (id: string) => void
}

/**
 * Chat Store Implementation
 * BACKEND NOTES:
 * - Replace mockChats with actual database calls
 * - Implement proper error handling
 * - Add message persistence
 * - Add real-time updates
 */
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isTyping: false,

      // Create a new chat
      addChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
        }
        set((state) => ({
          chats: [...state.chats, newChat],
          currentChatId: newChat.id,
        }))
      },

      // Add a message to the current chat
      addMessage: async (content: string) => {
        const { currentChatId, chats } = get()
        if (!currentChatId) return

        // Add user message
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      id: crypto.randomUUID(),
                      content,
                      role: 'user',
                      timestamp: new Date(),
                    },
                  ],
                }
              : chat
          ),
        }))

        // Simulate AI response
        set({ isTyping: true })
        await new Promise((resolve) => setTimeout(resolve, 1000))

        set((state) => ({
          isTyping: false,
          chats: state.chats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      id: crypto.randomUUID(),
                      content: 'This is a simulated AI response.',
                      role: 'assistant',
                      timestamp: new Date(),
                    },
                  ],
                }
              : chat
          ),
        }))
      },

      setCurrentChat: (id: string) => {
        set({ currentChatId: id })
      },
    }),
    {
      name: 'chat-storage',
    }
  )
)