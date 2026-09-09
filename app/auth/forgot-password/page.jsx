'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Lock, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TypewriterText from '@/components/TypewriterText'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setIsSubmitted(true)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (err) {
      const msg =
        err.code === 'auth/user-not-found'
          ? 'No account found with this email address'
          : err.code === 'auth/too-many-requests'
          ? 'Too many requests. Please try again later.'
          : 'Failed to send reset email. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          variants={itemVariants}
        >
          {/* Logo & Icon */}
          <motion.div
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-2xl font-bold text-text-primary text-center mb-2"
            variants={itemVariants}
          >
            <TypewriterText text="Reset Your Password" />
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-text-secondary text-center text-sm mb-6"
            variants={itemVariants}
          >
            <TypewriterText text="Enter your email address and we'll send you a link to reset your password." />
          </motion.p>

          {/* Success State */}
          {isSubmitted ? (
            <motion.div
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              variants={itemVariants}
            >
              <p className="text-green-800 text-sm font-medium">
                ✅ Reset email sent! Check your inbox and follow the link to reset your password. It will expire in 1 hour.
              </p>
            </motion.div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-text-secondary pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="pl-10 h-11 border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                  disabled={isSubmitted}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-medium"
                disabled={isLoading || isSubmitted}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </motion.div>
          </form>

          {/* Back Link */}
          <motion.div
            className="mt-6 text-center"
            variants={itemVariants}
          >
            <Link
              href="/sign-in"
              className="text-text-secondary hover:text-text-primary text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <TypewriterText text="Back to Sign In" />
            </Link>
          </motion.div>

          {/* Security Note */}
          <motion.div
            className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-xs text-text-secondary"
            variants={itemVariants}
          >
            <Lock className="w-4 h-4 text-blue-500" />
            <TypewriterText text="Your account is secure. We never share your data." />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
