'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, ArrowLeft } from 'lucide-react'

type LoginMethod = 'social' | 'email'

export default function LoginPage() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('social')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen">
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center text-white hover:text-neon-blue transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      {/* Left Side - Animated Background */}
      <motion.div 
        className="relative w-1/2 bg-black overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/images/space-bg.jpg"
          alt="Space background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
          <motion.h1 
            className="text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Cognifuse AI
          </motion.h1>
          <motion.p 
            className="text-3xl text-center text-white/80 font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Empowering Business Intelligence
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div 
        className="w-1/2 bg-white flex items-center justify-center p-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/cognifuse-logo.png"
              alt="Cognifuse Logo"
              width={50}
              height={50}
              className="opacity-80"
            />
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div 
                className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>{error}</span>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="hover:bg-red-100 p-1 rounded-full transition-colors"
                  aria-label="Close error message"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              AI BUSINESS COPILOT SUITE
            </h3>
          </motion.div>

          {/* Login Methods */}
          <AnimatePresence mode="wait">
            {loginMethod === 'social' ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/images/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Google
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="/images/email.svg"
                    alt="Email"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Email
                </button>
              </motion.div>
            ) : (
              <motion.form
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('social')}
                  className="w-full text-center text-indigo-600 hover:text-indigo-500"
                >
                  Back to all sign in options
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <p className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 