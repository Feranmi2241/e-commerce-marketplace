'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  ChevronRight,
  Package,
  TrendingDown,
  CreditCard,
  Tag,
  CheckCheck,
  Circle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Mock Notifications ───────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS = [
  {
    id: 'N001',
    type: 'order_update',
    message: 'Your order ORD-38291 has been shipped and is on its way to you.',
    timestamp: '2 minutes ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop',
  },
  {
    id: 'N002',
    type: 'price_drop',
    message: 'Price drop! Sony WH-1000XM5 Headphones dropped from ₦210,000 to ₦189,000.',
    timestamp: '1 hour ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=48&h=48&fit=crop',
  },
  {
    id: 'N003',
    type: 'payment_reminder',
    message: 'Easy Buy instalment of ₦40,417 for your Samsung TV is due in 3 days.',
    timestamp: '3 hours ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop',
  },
  {
    id: 'N004',
    type: 'promotion',
    message: 'Flash Sale! Up to 40% off on Kitchen Appliances — today only. Shop now.',
    timestamp: '5 hours ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=48&h=48&fit=crop',
  },
  {
    id: 'N005',
    type: 'order_update',
    message: 'Your order ORD-36850 has been delivered. Enjoy your new Samsung TV!',
    timestamp: 'Yesterday, 4:12 PM',
    read: true,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop',
  },
  {
    id: 'N006',
    type: 'price_drop',
    message: 'LG 24" IPS Monitor is back in stock and now ₦5,000 cheaper. Grab it fast.',
    timestamp: 'Yesterday, 11:30 AM',
    read: true,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=48&h=48&fit=crop',
  },
  {
    id: 'N007',
    type: 'promotion',
    message: 'New arrivals in Home & Living — over 200 new products just added this week.',
    timestamp: '2 days ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=48&h=48&fit=crop',
  },
  {
    id: 'N008',
    type: 'payment_reminder',
    message: 'Your Easy Buy instalment of ₦40,417 was successfully paid. Thank you!',
    timestamp: '3 days ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=48&h=48&fit=crop',
  },
  {
    id: 'N009',
    type: 'order_update',
    message: 'Your return request RET-1042 has been approved. Please ship the item back.',
    timestamp: '4 days ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=48&h=48&fit=crop',
  },
  {
    id: 'N010',
    type: 'promotion',
    message: 'Refer a friend and earn ₦2,000 wallet credit when they make their first purchase.',
    timestamp: '1 week ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=48&h=48&fit=crop',
  },
]

// ─── Type Config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  order_update: {
    icon: Package,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    dotColor: 'bg-blue-500',
    label: 'Order Update',
    badgeVariant: 'outline',
  },
  price_drop: {
    icon: TrendingDown,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    label: 'Price Drop',
    badgeVariant: 'success',
  },
  payment_reminder: {
    icon: CreditCard,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    dotColor: 'bg-amber-500',
    label: 'Payment',
    badgeVariant: 'warning',
  },
  promotion: {
    icon: Tag,
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-orange',
    dotColor: 'bg-brand-orange',
    label: 'Promotion',
    badgeVariant: 'default',
  },
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-6">

        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
            <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-5 text-sm mr-3">
            {[
              { label: 'Shop', href: '/search' },
              { label: 'Categories', href: '#' },
              { label: 'Deals', href: '#' },
              { label: 'Easy Buy', href: '/easy-buy' },
            ].map((link) => (
              <Link key={link.label} href={link.href}
                className="text-text-primary hover:text-brand-orange transition font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/notifications" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-brand-orange" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </Link>

          <Link href="/cart" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <ShoppingCart className="w-5 h-5 text-text-primary" />
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </Link>

          <div className="flex items-center gap-2 pl-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
              {CUSTOMER.initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-text-primary leading-tight">{CUSTOMER.firstName}</p>
              <p className="text-xs text-text-secondary leading-tight">My Account</p>
            </div>
          </div>

          <button
            className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>

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
    </nav>
  )
}

// ─── Notification Item ────────────────────────────────────────────────────────

function NotificationItem({ notification, index, onMarkRead }) {
  const config = TYPE_CONFIG[notification.type]
  const Icon = config.icon
  const isUnread = !notification.read

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
      onClick={() => !notification.read && onMarkRead(notification.id)}
      className={`relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
        isUnread
          ? 'bg-white border-border-light hover:border-orange-200 hover:shadow-md'
          : 'bg-bg-secondary border-transparent hover:bg-white hover:border-border-light'
      }`}
      style={isUnread ? { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' } : {}}
    >
      {/* One-time highlight fade for unread on load */}
      {isUnread && (
        <motion.div
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: index * 0.08 + 0.3 }}
          className="absolute inset-0 rounded-2xl bg-orange-50 pointer-events-none"
        />
      )}

      {/* Type icon */}
      <div className={`relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${config.iconBg}`}>
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
        {/* Unread dot on icon */}
        {isUnread && (
          <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${config.dotColor}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={config.badgeVariant} className="text-[10px] px-2 py-0.5">
              {config.label}
            </Badge>
            {isUnread && (
              <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${config.dotColor}`} />
            )}
          </div>
          <span className="text-xs text-text-secondary flex-shrink-0">{notification.timestamp}</span>
        </div>

        <p className={`mt-1.5 text-sm leading-relaxed ${
          isUnread ? 'font-semibold text-text-primary' : 'font-normal text-text-secondary'
        }`}>
          {notification.message}
        </p>

        {isUnread && (
          <p className="mt-2 text-xs text-brand-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to mark as read
          </p>
        )}
      </div>

      {/* Unread indicator bar on left edge */}
      {isUnread && (
        <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${config.dotColor}`} />
      )}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-8">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Notifications</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                My Account
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3">
                Notifications
                {unreadCount > 0 && (
                  <span className="text-sm font-semibold bg-brand-orange text-white px-2.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-sm text-text-secondary mt-1.5">
                Stay up to date with your orders, deals, and account activity.
              </p>
            </div>

            {/* Mark all as read */}
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-sm text-brand-orange hover:text-orange-600 font-semibold transition-colors flex-shrink-0 mt-1"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Filter tabs (All / Unread) ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
          className="flex items-center gap-2"
        >
          {[
            { label: 'All', count: notifications.length },
            { label: 'Unread', count: unreadCount },
          ].map((tab) => (
            <span
              key={tab.label}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-white border border-border-light text-text-secondary"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              {tab.label}
              <span className="text-xs bg-bg-secondary text-text-secondary px-1.5 py-0.5 rounded-full font-medium">
                {tab.count}
              </span>
            </span>
          ))}
        </motion.div>

        {/* ── Notification List ────────────────────────────────────────────── */}
        <div className="space-y-3">
          <AnimatePresence>
            {notifications.map((notification, i) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                index={i}
                onMarkRead={markRead}
              />
            ))}
          </AnimatePresence>

          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-text-secondary" />
              </div>
              <p className="text-base font-semibold text-text-primary">No notifications yet</p>
              <p className="text-sm text-text-secondary mt-1">
                We&apos;ll notify you about orders, deals, and more.
              </p>
            </motion.div>
          )}
        </div>

        {/* ── All read state ───────────────────────────────────────────────── */}
        {unreadCount === 0 && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-center gap-2 py-4"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-text-secondary font-medium">
              You&apos;re all caught up — no unread notifications.
            </p>
          </motion.div>
        )}

        {/* ── Bottom note ──────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs text-text-secondary pb-4"
        >
          Manage your notification preferences in{' '}
          <Link href="/settings" className="text-brand-orange hover:underline font-medium">
            Account Settings
          </Link>
        </motion.p>

      </main>

      <ChatButton />
    </div>
  )
}
