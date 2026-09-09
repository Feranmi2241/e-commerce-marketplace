'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, RefreshCw, ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { toast } from 'sonner'

const RESEND_SECONDS = 45

// ── Framer Motion variants (matching auth pages exactly) ──────────────────────
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

// ── Countdown hook ─────────────────────────────────────────────────────────────
function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      setIsRunning(false)
      return
    }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [isRunning, seconds])

  const reset = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(true)
  }, [initialSeconds])

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return { seconds, formatted, isDone: seconds <= 0, reset }
}

// ── OTP digit indicator dots ───────────────────────────────────────────────────
function OTPProgress({ value }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: value.length > i ? 1.2 : 1,
            backgroundColor:
              value.length > i ? '#F68B1E' : '#E8E8EA',
          }}
          transition={{ duration: 0.2 }}
          className="w-2 h-2 rounded-full"
        />
      ))}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function VerifyOTP() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  const { seconds, formatted, isDone, reset } = useCountdown(RESEND_SECONDS)

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (otp.length === 6 && !isVerifying && !isVerified) {
      handleVerify(otp)
    }
  }, [otp])

  const handleVerify = (code = otp) => {
    if (code.length < 6) {
      setHasError(true)
      toast.error('Please enter all 6 digits.')
      return
    }
    setHasError(false)
    setIsVerifying(true)

    // Simulate verification — any 6 digits pass for mock
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      toast.success('Code verified! Redirecting...')
      setTimeout(() => router.push('/reset-password'), 1200)
    }, 1000)
  }

  const handleResend = () => {
    if (!isDone) return
    setOtp('')
    setHasError(false)
    setResendCount((c) => c + 1)
    reset()
    toast.success('A new code has been sent to your email.')
  }

  const handleOtpChange = (val) => {
    setOtp(val)
    if (hasError) setHasError(false)
  }

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
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-orange-100 blur-md opacity-60 scale-125" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Brand name */}
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div variants={itemVariants} className="text-center mb-2">
            <h1 className="text-2xl font-bold text-text-primary">
              Verify Your Identity
            </h1>
          </motion.div>

          {/* ── Subtext ── */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <p className="text-sm text-text-secondary leading-relaxed">
              We sent a 6-digit verification code to your email address.
              Enter it below to continue.
            </p>

            {/* Email hint pill */}
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-bg-secondary rounded-full border border-border-light">
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-xs font-medium text-text-secondary">
                j***e@example.com
              </span>
            </div>
          </motion.div>

          {/* ── OTP Input ── */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={isVerifying || isVerified}
              className="gap-0"
            >
              <InputOTPGroup className="gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className={
                      hasError
                        ? 'border-red-400 ring-4 ring-red-100 animate-shake'
                        : isVerified
                        ? 'border-green-500 ring-4 ring-green-100 bg-green-50'
                        : ''
                    }
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {/* Progress dots */}
            <OTPProgress value={otp} />
          </motion.div>

          {/* ── Error message ── */}
          <AnimatePresence>
            {hasError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-center text-xs text-red-500 mt-2 mb-4"
              >
                Invalid code. Please check and try again.
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Success state overlay ── */}
          <AnimatePresence>
            {isVerified && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center gap-2 py-4"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-green-700">
                  Verified! Redirecting you now...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Countdown + Resend ── */}
          {!isVerified && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 mt-6 mb-6"
            >
              <AnimatePresence mode="wait">
                {!isDone ? (
                  <motion.div
                    key="countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    {/* Animated ring around timer */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#E8E8EA"
                          strokeWidth="2.5"
                        />
                        <motion.circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#F68B1E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 15}`}
                          strokeDashoffset={
                            2 * Math.PI * 15 * (1 - seconds / RESEND_SECONDS)
                          }
                          transition={{ duration: 1, ease: 'linear' }}
                        />
                      </svg>
                      <span className="text-xs font-bold text-brand-orange relative z-10">
                        {seconds}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary">
                      Resend code in{' '}
                      <span className="font-bold text-text-primary tabular-nums">
                        {formatted}
                      </span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="resend"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <p className="text-sm text-text-secondary">
                      Didn&apos;t receive the code?
                    </p>
                    <button
                      onClick={handleResend}
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-orange-700 transition-colors group"
                    >
                      <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      Resend Code
                      {resendCount > 0 && (
                        <span className="text-xs text-text-secondary font-normal">
                          ({resendCount})
                        </span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Verify Button ── */}
          {!isVerified && (
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => handleVerify()}
                disabled={otp.length < 6 || isVerifying}
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.span>
                    Verifying...
                  </span>
                ) : (
                  'Verify Code'
                )}
              </Button>
            </motion.div>
          )}

          {/* ── Divider ── */}
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
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

          {/* ── Security note ── */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-3 bg-blue-50 rounded-lg flex items-start gap-3"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
            <p className="text-xs text-blue-700 leading-relaxed">
              This code expires in <strong>10 minutes</strong>. Never share
              your verification code with anyone.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Step indicator below card ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-6"
        >
          {['Sign Up', 'Verify', 'Reset'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i === 1
                      ? 'bg-brand-orange text-white shadow-md shadow-orange-200'
                      : i < 1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {i < 1 ? '✓' : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i === 1 ? 'text-brand-orange' : 'text-text-secondary'
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
