'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md w-full">
        {/* Shopping bag icon with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50 rounded-full blur-2xl opacity-60" />
            <ShoppingBag
              size={120}
              className="text-orange-500 relative z-10"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* 404 Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-bold text-text-primary mb-3">
            Page Not Found
          </h2>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <p className="text-text-secondary text-base leading-relaxed mb-8">
            Sorry! We couldn't find the page you're looking for. The product or page may have moved, or you might have followed a broken link.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-11 border-text-secondary text-text-primary hover:bg-gray-50"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Shop Now
            </Button>
          </Link>
        </motion.div>

        {/* Optional: Small help text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="mt-8 text-sm text-text-secondary"
        >
          <p>
            Need help? <Link href="/help-center" className="text-orange-500 hover:text-orange-600 font-medium">
              Visit our Help Center
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
