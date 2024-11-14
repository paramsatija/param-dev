import { mockIntegrationConnect } from '@/lib/mock-integrations'

// Example usage:
const handleGoogleConnect = async (scopes: string[]) => {
  try {
    await mockIntegrationConnect('Google')
    // Handle success
  } catch (error) {
    // Handle error
  }
} 