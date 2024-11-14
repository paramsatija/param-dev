export const mockIntegrationConnect = async (service: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Simulate success/failure randomly
  if (Math.random() > 0.2) {
    return true
  }
  throw new Error(`Failed to connect ${service}`)
} 