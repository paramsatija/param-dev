import { Amplify } from 'aws-amplify'
import { signIn as awsSignIn, signOut as awsSignOut } from 'aws-amplify/auth'
import awsconfig from '../aws-exports'

// Configure Amplify
Amplify.configure(awsconfig)

export async function signIn(email: string, password: string) {
  try {
    const user = await awsSignIn({
      username: email,
      password,
    })
    return user
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

export async function signOut() {
  try {
    await awsSignOut()
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Add any other auth functions you need...
