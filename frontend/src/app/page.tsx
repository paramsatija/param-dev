'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, ArrowLeft } from 'lucide-react'
import { EnhancedSocialButton } from '@/components/ui/enhanced-social-button'
import { EmailForm } from '@/components/auth/email-form'
import { ForgotPasswordModal } from '@/components/auth/forgot-password-modal'
import { useAuthStore } from '@/store/auth-store'

type LoginMethod = 'social' | 'email'

export default function Home() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('social')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore()

  // Enhanced animations
  const pageTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    if (provider === 'github') {
      await useAuthStore.getState().login('github');
      router.push('/');
      return;
    }

    // Keep existing logic for other providers
    try {
      await login(provider)
      if (isAuthenticated) {
        router.push('/dashboard')
      }
    } catch (error) {
      // Error handled by store
    }
  }

  const handleEmailLogin = async (data: any) => {
    try {
      await login('email')
      if (isAuthenticated) {
        router.push('/dashboard')
      }
    } catch (error) {
      // Error handled by store
    }
  }

  return (
    <>
      <motion.div 
        className="flex min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side - Animated Background */}
        <motion.div 
          className="relative w-1/2 bg-black overflow-hidden"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={pageTransition}
        >
          <Image
            src="/images/space-bg.jpg"
            alt="Space background"
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 whitespace-nowrap leading-normal py-2">
              Cognifuse AI
            </h1>
            <motion.p 
              className="text-3xl text-center text-blue-200 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Empowering Business Intelligence
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="w-1/2 bg-white flex items-center justify-center p-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={pageTransition}
        >
          <div className="max-w-md w-full">
            {/* Add smaller logo at the top of the form */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/images/cognifuse-logo.png"
                alt="Cognifuse Logo"
                width={50}
                height={50}
                className="opacity-80" // Slightly transparent for subtle appearance
              />
            </motion.div>

            {/* Error Alert */}
            <AnimatePresence mode="wait">
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
                    onClick={clearError}
                    className="hover:bg-red-100 p-1 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
              variants={containerVariants}
              className="text-center mb-8"
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to your
              </motion.h2>
              <motion.h3 
                className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                AI BUSINESS COPILOT SUITE
              </motion.h3>
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
                  <EnhancedSocialButton
                    provider="google"
                    onClick={() => handleSocialLogin('google')}
                    isLoading={isLoading}
                  />
                  
                  <EnhancedSocialButton
                    provider="github"
                    onClick={() => {
                      router.push('/dashboard')
                    }}
                    isLoading={false}
                  />
                  
                  <EnhancedSocialButton
                    provider="email"
                    onClick={() => setLoginMethod('email')}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EmailForm 
                    onSubmit={handleEmailLogin}
                    isLoading={isLoading}
                    onForgotPassword={() => setShowForgotPassword(true)}
                  />
                  <motion.button
                    onClick={() => setLoginMethod('social')}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to all sign in options
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terms and Privacy */}
            <motion.p 
              className="mt-8 text-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              By continuing, you agree to our{' '}
              <motion.a 
                href="#" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              {' '}and{' '}
              <motion.a 
                href="#" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  )
}
