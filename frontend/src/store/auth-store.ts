import { create } from 'zustand'

interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  
  login: (provider: 'email' | 'google' | 'github', data?: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (provider, data) => {
    set({ isLoading: true, error: null })
    try {
      // For GitHub, immediately authenticate
      if (provider === 'github') {
        set({ 
          isAuthenticated: true,
          user: {
            id: '1',
            email: 'github@example.com',
            name: 'GitHub User'
          },
          isLoading: false 
        })
        return;
      }

      // Original login logic for other providers
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      set({ 
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User'
        },
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: 'Failed to login. Please try again.',
        isLoading: false 
      })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      // Simulate logout - Replace with actual auth
      await new Promise(resolve => setTimeout(resolve, 1000))
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({ 
        error: 'Failed to logout. Please try again.',
        isLoading: false 
      })
    }
  },

  clearError: () => set({ error: null })
}))
