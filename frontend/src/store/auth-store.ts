import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (provider, data) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call - Replace with your actual auth logic
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          const user = {
            id: '1',
            email: data?.email || 'user@example.com',
            name: 'Test User'
          }
          
          // Set auth cookie
          Cookies.set('auth', 'true', { expires: 7 }) // 7 days
          // Set auth token if you have one
          Cookies.set('token', 'your-auth-token', { expires: 7 })
          
          set({ 
            isAuthenticated: true,
            user,
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
          // Remove cookies
          Cookies.remove('auth')
          Cookies.remove('token')
          
          set({ user: null, isAuthenticated: false, isLoading: false })
        } catch (error) {
          set({ 
            error: 'Failed to logout. Please try again.',
            isLoading: false 
          })
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
