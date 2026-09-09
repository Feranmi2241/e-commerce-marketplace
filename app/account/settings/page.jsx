'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, User, Lock, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

const fadeCard = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

export default function AccountSettingsPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const SETTINGS_SECTIONS = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Edit Profile', href: '#profile' },
        { label: 'Upload Photo', href: '#photo' },
        { label: 'Personal Info', href: '#personal' }
      ]
    },
    {
      id: 'security',
      label: 'Security & Privacy',
      icon: Lock,
      items: [
        { label: 'Change Password', href: '#password' },
        { label: 'Two-Factor Auth', href: '#2fa' },
        { label: 'Login Activity', href: '#activity' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Preferences', href: '#email' },
        { label: 'Push Notifications', href: '#push' },
        { label: 'SMS Alerts', href: '#sms' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-white border-b border-border-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Account Settings</h1>
              <p className="text-sm text-text-secondary mt-1">Manage your account preferences and security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            variants={fadeCard}
            initial="initial"
            animate="animate"
            className="hidden md:block"
          >
            <div className="bg-white rounded-2xl border border-border-light overflow-hidden p-4 space-y-2">
              {SETTINGS_SECTIONS.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.id}>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-secondary mb-1">
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
              <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium mt-4 border-t border-border-light pt-4">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Main Settings Area */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeCard}
            className="md:col-span-3 space-y-6"
          >
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.id} className="bg-white rounded-2xl border border-border-light overflow-hidden">
                  <div className="border-b border-border-light bg-bg-secondary px-6 py-4 flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-orange" />
                    <h2 className="text-lg font-bold text-text-primary">{section.label}</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between pb-4 border-b border-border-light last:pb-0 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-secondary mt-0.5">Configure your {item.label.toLowerCase()}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-secondary" />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-light bg-white px-4 py-3 space-y-1">
          {[
            { label: 'Shop', href: '/shop' },
            { label: 'Categories', href: '/shop?view=categories' },
            { label: 'Deals', href: '/shop' },
            { label: 'Easy Buy', href: '/easy-buy' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="block py-2 text-sm text-text-primary hover:text-brand-orange transition">
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}