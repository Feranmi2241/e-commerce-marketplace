'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User, Phone, Check, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import TypewriterText from '@/components/TypewriterText'
import { toast } from 'sonner'
import { createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

export default function SignUp() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Handle redirect result when user comes back from Google sign-up
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success('Signed up with Google!')
          router.push('/dashboard')
        }
      })
      .catch(() => {})
  }, [])

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    if (pwd.length >= 8) strength += 25
    if (pwd.length >= 12) strength += 25
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25
    if (/[0-9]/.test(pwd)) strength += 12.5
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 12.5
    return Math.min(strength, 100)
  }

  const getStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500'
    if (passwordStrength < 60) return 'bg-amber-500'
    if (passwordStrength < 85) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength < 30) return 'Weak'
    if (passwordStrength < 60) return 'Fair'
    if (passwordStrength < 85) return 'Good'
    return 'Strong'
  }

  const validateForm = () => {
    const newErrors = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid phone number'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: fullName })
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists'
          : err.code === 'auth/weak-password'
          ? 'Password is too weak'
          : 'Sign up failed. Please try again.'
      toast.error(msg)
      if (err.code === 'auth/email-already-in-use') {
        setErrors((prev) => ({ ...prev, email: msg }))
      }
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordStrength(calculatePasswordStrength(newPassword))
  }

  const isFormValid =
    fullName &&
    email &&
    phone &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    agreeToTerms &&
    passwordStrength >= 30

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo Section */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              <TypewriterText text="Create Account" />
            </h1>
            <p className="text-text-secondary text-sm">
              <TypewriterText text="Join us and start shopping" />
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <TypewriterText text="Full Name" />
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Positive Mind"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <TypewriterText text="Email Address" />
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <TypewriterText text="Phone Number" />
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <Input
                  type="tel"
                  placeholder="+234 (0) 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <TypewriterText text="Password" />
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div variants={itemVariants} className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Password strength:</span>
                    <span className="text-xs font-medium text-text-primary">
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getStrengthColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <TypewriterText text="Confirm Password" />
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-text-secondary hover:text-text-primary"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {password && confirmPassword && password === confirmPassword && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-green-600 text-xs mt-1"
                >
                  <Check className="w-4 h-4" />
                  Passwords match
                </motion.div>
              )}
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div variants={itemVariants} className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={setAgreeToTerms}
              />
              <label htmlFor="terms" className="text-sm text-text-secondary leading-tight">
                <TypewriterText text="I agree to the " />
                <Link href="/legal" className="text-orange-600 hover:underline font-medium">
                  <TypewriterText text="Terms of Service" />
                </Link>
                {' '}<TypewriterText text="and" />{' '}
                <Link href="/legal" className="text-orange-600 hover:underline font-medium">
                  <TypewriterText text="Privacy Policy" />
                </Link>
              </label>
            </motion.div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
            )}

            {/* Create Account Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-text-secondary">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </motion.div>

          {/* Google Sign Up */}
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  await signInWithRedirect(auth, googleProvider)
                } catch {
                  toast.error('Google sign up failed. Please try again.')
                }
              }}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-text-primary"
            >
              <Globe className="w-5 h-5" />
              <TypewriterText text="Sign up with Google" />
            </Button>
          </motion.div>

          {/* Sign In Link */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              <TypewriterText text="Already have an account?" />{' '}
              <Link href="/sign-in" className="text-orange-600 hover:underline font-medium">
                <TypewriterText text="Sign In" />
              </Link>
            </p>
          </motion.div>

          {/* Security Note */}
          <motion.div
            variants={itemVariants}
            className="flex items-start gap-2 mt-6 p-3 bg-blue-50 rounded-lg"
          >
            <Lock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              <TypewriterText text="Your data is encrypted and secure. We never share your information." />
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
