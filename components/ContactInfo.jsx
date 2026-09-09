'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div>
        <motion.h2
          className="text-2xl font-bold text-text-primary mb-6 transition-colors duration-200 hover:text-brand-orange cursor-default"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          Contact Details
        </motion.h2>
        
        <div className="space-y-4">
          {/* Email */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mt-1">
              <Mail className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <motion.p
                className="font-semibold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              >Email Support</motion.p>
              <a href="mailto:support@marketplace.com" className="text-brand-orange hover:text-orange-700 transition-colors">
                support@marketplace.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mt-1">
              <Phone className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <motion.p
                className="font-semibold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
              >Phone Support</motion.p>
              <a href="tel:+2341234567890" className="text-brand-orange hover:text-orange-700 transition-colors">
                +234 123 456 7890
              </a>
              <motion.p
                className="text-sm text-text-secondary mt-1 transition-colors duration-200 hover:text-text-primary"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
              >Available Mon-Fri, 9AM-6PM WAT</motion.p>
            </div>
          </div>

          {/* Live Chat */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mt-1">
              <MessageSquare className="w-6 h-6 text-brand-orange" />
            </div>
            <div className="flex-1">
              <motion.p
                className="font-semibold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
              >Live Chat</motion.p>
              <motion.p
                className="text-text-secondary text-sm mb-3 transition-colors duration-200 hover:text-text-primary"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
              >Chat with our support team in real-time</motion.p>
              <Button className="bg-brand-orange hover:bg-orange-700 text-white h-10">
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div>
        <motion.h3
          className="text-lg font-semibold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
        >
          Our Location
        </motion.h3>
        <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-border-light flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-brand-orange mx-auto mb-2 opacity-50" />
            <p className="text-text-secondary">Lagos, Nigeria</p>
            <p className="text-sm text-text-secondary mt-1">Interactive map coming soon</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <motion.h3
          className="text-lg font-semibold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
        >
          Follow Us
        </motion.h3>
        <div className="flex gap-3">
          <a
            href="/about"
            aria-label="Facebook"
            className="w-12 h-12 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-lg flex items-center justify-center transition-all"
          >
          <FacebookIcon />
          </a>
          <a
            href="/faq"
            aria-label="Twitter"
            className="w-12 h-12 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-lg flex items-center justify-center transition-all"
          >
          <TwitterIcon />
          </a>
          <a
            href="/contact"
            aria-label="Instagram"
            className="w-12 h-12 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-lg flex items-center justify-center transition-all"
          >
          <InstagramIcon />
          </a>
          <a
            href="/terms"
            aria-label="LinkedIn"
            className="w-12 h-12 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-lg flex items-center justify-center transition-all"
          >
          <LinkedinIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
