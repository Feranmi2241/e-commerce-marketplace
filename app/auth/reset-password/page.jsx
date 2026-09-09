'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

// ── Framer Motion variants — exact match to all other auth pages ──────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

// ── Password strength logic — exact same algorithm as Sign Up page ────────────
function calculatePasswordStrength(pwd) {
  let strength = 0
  if (pwd.length >= 8) strength += 25
  if (pwd.length >= 12) strength += 25
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25
  if (/[0-9]/.test(pwd)) strength += 12.5
  if (/[^a-zA-Z0-9]/.test(pwd)) strength += 12.5
  return Math.min(strength, 100)
}

function getStrengthColor(strength) {
  if (strength < 30) return 'bg-red-500'
  if (strength < 60) return 'bg-amber-500'
  if (strength < 85) return 'bg-blue-500'
  return 'bg-green-500'
}

function getStrengthLabel(strength) {
  if (strength === 0) return ''
  if (strength < 30) return 'Weak'
  if (strength < 60) return 'Fair'
  if (strength < 85) return 'Good'
  return 'Strong'
}

function getStrengthLabelColor(strength) {
  if (strength < 30) return 'text-red-500'
  if (strength < 60) return 'text-amber-500'
  if (strength < 85) return 'text-blue-500'
  return 'text-green-600'
}

// ── Strength requirement checklist ────────────────────────────────────────────
function StrengthChecklist({ password }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Uppercase & lowercase letters', pass: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'At least one number', pass: /[0-9]/.test(password) },
    { label: 'Special character (e.g. !@#$)', pass: /[^a-zA-Z0-9]/.test(password) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-3 p-3 bg-bg-secondary rounded-lg border border-border-light space-y-2 overflow-hidden"
    >
      {checks.map((check) => (
        <div key={check.label} className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: check.pass ? 1 : 0.8,
              backgroundColor: check.pass ? '#10B981' : '#E8E8EA',
            }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
          >
            {check.pass && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </motion.div>
          <span
            className={`text-xs transition-colors duration-200 ${
              check.pass ? 'text-green-700 font-medium' : 'text-text-secondary'
            }`}
          >
            {check.label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ResetPassword() {
  const router = useRouter()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)

  const strength = calculatePasswordStrength(newPassword)
  const strengthLabel = getStrengthLabel(strength)
  const strengthColor = getStrengthColor(strength)
  const strengthLabelColor = getStrengthLabelColor(strength)

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword

  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword

  const validate = () => {
    const errs = {}
    if (!newPassword) {
      errs.newPassword = 'New password is required'
    } else if (newPassword.length < 8) {
      errs.newPassword = 'Password must be at least 8 characters'
    } else if (strength < 30) {
      errs.newPassword = 'Password is too weak — add more variety'
    }
    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your new password'
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success('Password reset successfully! Redirecting to sign in...', {
        duration: 4000,
      })
      setTimeout(() => router.push('/sign-in'), 2000)
    }, 1000)
  }

  const handleNewPasswordChange = (e) => {
    const val = e.target.value
    setNewPassword(val)
    setShowChecklist(val.length > 0)
    if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }))
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: '' }))
  }

  const isFormReady =
    newPassword.length >= 8 &&
    confirmPassword.length >= 8 &&
    newPassword === confirmPassword &&
    strength >= 30

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* ── Card ── */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >

          {/* ── Logo / Icon ── */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              {/* Soft glow behind icon — same treatment as OTP page */}
              <div className="absolute inset-0 rounded-full bg-orange-100 blur-md opacity-60 scale-125" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <KeyRound className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>
            {/* Brand name — same gradient text as Navbar logo */}
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div variants={itemVariants} className="text-center mb-2">
            <h1 className="text-2xl font-bold text-text-primary">
              Create New Password
            </h1>
          </motion.div>

          {/* ── Subtext ── */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-text-secondary text-center mb-8 leading-relaxed"
          >
            Your new password must be different from your previous password
            and meet the strength requirements below.
          </motion.p>

          {/* ── Success state ── */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center gap-3 py-6 mb-4"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-green-600" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-green-700 text-base">
                    Password Reset Successful!
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Redirecting you to sign in...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form ── */}
          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* New Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-text-primary"
                >
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="new-password"
                    type={showNew ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    onFocus={() => setShowChecklist(newPassword.length > 0)}
                    className={`h-11 pl-10 pr-11 rounded-lg border transition-all ${
                      errors.newPassword
                        ? 'border-red-400 focus:ring-red-300'
                        : newPassword && strength >= 85
                        ? 'border-green-400 focus:ring-green-200'
                        : 'border-gray-300 focus:border-orange-400 focus:ring-orange-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    aria-label={showNew ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-5 h-5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {/* Strength bar — only shows when user has typed something */}
                <AnimatePresence>
                  {newPassword.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-1.5"
                    >
                      {/* Bar track */}
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${strengthColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${strength}%` }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      </div>

                      {/* Label row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          Password strength
                        </span>
                        <span className={`text-xs font-semibold ${strengthLabelColor}`}>
                          {strengthLabel}
                        </span>
                      </div>

                      {/* Segmented visual indicator */}
                      <div className="flex gap-1.5">
                        {[25, 50, 75, 100].map((threshold, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                              strength >= threshold
                                ? strengthColor
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Checklist */}
                <AnimatePresence>
                  {showChecklist && newPassword.length > 0 && (
                    <StrengthChecklist password={newPassword} />
                  )}
                </AnimatePresence>

                {errors.newPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500"
                  >
                    {errors.newPassword}
                  </motion.p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`h-11 pl-10 pr-11 rounded-lg border transition-all ${
                      errors.confirmPassword || passwordsMismatch
                        ? 'border-red-400 focus:ring-red-300'
                        : passwordsMatch
                        ? 'border-green-400 focus:ring-green-200'
                        : 'border-gray-300 focus:border-orange-400 focus:ring-orange-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-5 h-5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {/* Match / mismatch feedback */}
                <AnimatePresence mode="wait">
                  {passwordsMatch && (
                    <motion.div
                      key="match"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 text-green-600"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      <span className="text-xs font-medium">Passwords match</span>
                    </motion.div>
                  )}
                  {passwordsMismatch && (
                    <motion.p
                      key="mismatch"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-red-500"
                    >
                      Passwords do not match
                    </motion.p>
                  )}
                  {errors.confirmPassword && !passwordsMismatch && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-red-500"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Reset Password Button */}
              <motion.div variants={itemVariants} className="pt-1">
                <Button
                  type="submit"
                  disabled={!isFormReady || isSubmitting}
                  className="w-full h-11 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="inline-block"
                      >
                        <Lock className="w-4 h-4" />
                      </motion.span>
                      Resetting Password...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      Reset Password
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          )}

          {/* ── Divider ── */}
          <motion.div variants={itemVariants} className="my-6">
            <div className="w-full border-t border-gray-100" />
          </motion.div>

          {/* ── Back to Sign In ── */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Sign In
            </Link>
          </motion.div>

          {/* ── Security note — same blue pill as all other auth pages ── */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-3 bg-blue-50 rounded-lg flex items-start gap-3"
          >
            <ShieldCheck
              className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
              strokeWidth={2}
            />
            <p className="text-xs text-blue-700 leading-relaxed">
              Your new password is encrypted end-to-end. We never store
              passwords in plain text.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Step indicator below card — same as OTP page ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-6"
        >
          {['Sign Up', 'Verify', 'Reset'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i === 2
                      ? 'bg-brand-orange text-white shadow-md shadow-orange-200'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {i < 2 ? '✓' : '3'}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i === 2 ? 'text-brand-orange' : 'text-text-secondary'
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
