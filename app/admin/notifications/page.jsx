'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Users,
  BarChart2,
  Star,
  Percent,
  Zap,
  MessageSquare,
  Settings,
  UserCircle,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CheckCheck,
  Check,
  ShoppingCart,
  AlertTriangle,
  MessageCircle,
  Flag,
  CheckCircle2,
  Clock,
  PackageCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Admin ────────────────────────────────────────────────────────────────────

const ADMIN = {
  name: 'Chukwuemeka Eze',
  firstName: 'Emeka',
  initials: 'CE',
  role: 'Super Admin',
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────

const SIDEBAR_NAV = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Products',      icon: Package,         href: '/admin/products' },
  { label: 'Categories',    icon: Tag,             href: '/admin/categories' },
  { label: 'Orders',        icon: ShoppingBag,     href: '/admin/orders' },
  { label: 'Customers',     icon: Users,           href: '/admin/customers' },
  { label: 'Analytics',     icon: BarChart2,       href: '/admin/analytics' },
  { label: 'Reviews',       icon: Star,            href: '/admin/reviews' },
  { label: 'Discounts',     icon: Percent,         href: '/admin/discounts' },
  { label: 'Easy Buy',      icon: Zap,             href: '/admin/easy-buy' },
  { label: 'Chats',         icon: MessageSquare,   href: '/admin/chats' },
  { label: 'Settings',      icon: Settings,        href: '/admin/settings' },
  { label: 'Account',       icon: UserCircle,      href: '/admin/account' },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const fadeCard = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const itemVariant = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.3, ease: 'easeOut' } },
}

// ─── Type Config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  order: {
    label:      'New Order',
    icon:       ShoppingCart,
    iconBg:     'bg-blue-50',
    iconColor:  'text-blue-500',
    dotColor:   'bg-blue-500',
    borderColor:'border-l-blue-500',
    badgeBg:    'bg-blue-100',
    badgeText:  'text-blue-700',
  },
  inventory: {
    label:      'Inventory Alert',
    icon:       AlertTriangle,
    iconBg:     'bg-amber-50',
    iconColor:  'text-amber-500',
    dotColor:   'bg-amber-500',
    borderColor:'border-l-amber-500',
    badgeBg:    'bg-amber-100',
    badgeText:  'text-amber-700',
  },
  easybuy: {
    label:      'Easy Buy',
    icon:       Zap,
    iconBg:     'bg-orange-50',
    iconColor:  'text-brand-orange',
    dotColor:   'bg-brand-orange',
    borderColor:'border-l-brand-orange',
    badgeBg:    'bg-orange-100',
    badgeText:  'text-orange-700',
  },
  review: {
    label:      'Review',
    icon:       Star,
    iconBg:     'bg-violet-50',
    iconColor:  'text-violet-500',
    dotColor:   'bg-violet-500',
    borderColor:'border-l-violet-500',
    badgeBg:    'bg-violet-100',
    badgeText:  'text-violet-700',
  },
  dispute: {
    label:      'Dispute',
    icon:       Flag,
    iconBg:     'bg-red-50',
    iconColor:  'text-red-500',
    dotColor:   'bg-red-500',
    borderColor:'border-l-red-500',
    badgeBg:    'bg-red-100',
    badgeText:  'text-red-700',
  },
}

// ─── Mock Notifications ───────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS = [
  {
    id: 'N001',
    type: 'order',
    message: 'New order ORD-10042 placed by Adaeze Okonkwo for ₦1,187,000 — iPhone 15 Pro Max via Easy Buy.',
    timestamp: '2 minutes ago',
    read: false,
    resolved: false,
    link: '/admin/orders',
  },
  {
    id: 'N002',
    type: 'inventory',
    message: 'Samsung 55" Crystal UHD 4K Smart TV is critically low — only 3 units left in stock.',
    timestamp: '18 minutes ago',
    read: false,
    resolved: false,
    link: '/admin/products',
  },
  {
    id: 'N003',
    type: 'easybuy',
    message: 'New Easy Buy application from Chidi Okafor for MacBook Air M3 (₦1,480,000) — awaiting your approval.',
    timestamp: '45 minutes ago',
    read: false,
    resolved: false,
    link: '/admin/easy-buy',
  },
  {
    id: 'N004',
    type: 'dispute',
    message: 'Tunde Adeyemi has raised a dispute on order ORD-10036 — claims item arrived damaged. Needs urgent attention.',
    timestamp: '1 hour ago',
    read: false,
    resolved: false,
    link: '/admin/reviews',
  },
  {
    id: 'N005',
    type: 'review',
    message: 'A new 1-star review was flagged on Sony WH-1000XM5 by Ngozi Eze — contains potentially inappropriate language.',
    timestamp: '2 hours ago',
    read: false,
    resolved: false,
    link: '/admin/reviews',
  },
  {
    id: 'N006',
    type: 'order',
    message: 'Order ORD-10041 by Emeka Nwosu has been successfully delivered. Customer confirmation received.',
    timestamp: '3 hours ago',
    read: true,
    resolved: false,
    link: '/admin/orders',
  },
  {
    id: 'N007',
    type: 'easybuy',
    message: 'Easy Buy instalment payment of ₦98,333 received from Seun Adesanya for Nikon Z50 Camera — Month 2 of 6.',
    timestamp: '5 hours ago',
    read: true,
    resolved: true,
    link: '/admin/easy-buy',
  },
  {
    id: 'N008',
    type: 'inventory',
    message: 'Dyson V15 Detect Cordless Vacuum is now completely out of stock. Consider restocking immediately.',
    timestamp: 'Yesterday, 4:30 PM',
    read: true,
    resolved: false,
    link: '/admin/products',
  },
  {
    id: 'N009',
    type: 'dispute',
    message: 'Dispute on order ORD-10033 by Blessing Obi has been resolved. Refund of ₦320,000 processed successfully.',
    timestamp: 'Yesterday, 1:15 PM',
    read: true,
    resolved: true,
    link: '/admin/reviews',
  },
  {
    id: 'N010',
    type: 'review',
    message: 'Fatima Bello left a 5-star review on Dior Sauvage EDP — "Absolutely authentic, fast delivery. Love it!"',
    timestamp: 'Yesterday, 10:00 AM',
    read: true,
    resolved: false,
    link: '/admin/reviews',
  },
  {
    id: 'N011',
    type: 'order',
    message: '3 new orders placed in the last hour totalling ₦2,460,000. View all pending orders for fulfilment.',
    timestamp: '2 days ago',
    read: true,
    resolved: false,
    link: '/admin/orders',
  },
  {
    id: 'N012',
    type: 'easybuy',
    message: 'Easy Buy application from Hauwa Musa for Dyson V15 Vacuum (₦420,000) was declined — insufficient credit score.',
    timestamp: '2 days ago',
    read: true,
    resolved: true,
    link: '/admin/easy-buy',
  },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-border-light transition-all duration-300 flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-border-light ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent leading-tight">
            Marketplace<br />
            <span className="text-xs font-semibold text-text-secondary tracking-widest uppercase">Admin</span>
          </span>
        )}
        {collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">M</span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => {
          const Icon = item.icon
          const isActive = pathname && pathname.startsWith(item.href)
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-orange-50 text-brand-orange'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-orange' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium truncate ${isActive ? 'text-brand-orange font-semibold' : ''}`}>
                    {item.label}
                  </span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border-light p-3">
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-all text-sm font-medium ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ onMobileMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border-light flex items-center gap-4 px-4 md:px-6 py-3">

      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition flex-shrink-0"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      <span className="md:hidden text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent flex-shrink-0">
        Admin
      </span>

      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link href="/admin/notifications">
          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-brand-orange" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
              5
            </span>
          </button>
        </Link>

        <div className="flex items-center gap-2.5 pl-2 border-l border-border-light">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {ADMIN.initials}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-text-primary leading-tight">{ADMIN.firstName}</p>
            <p className="text-xs text-text-secondary leading-tight">{ADMIN.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Notification Item ────────────────────────────────────────────────────────

function NotificationItem({ notification, index, onMarkRead, onMarkResolved }) {
  const config  = TYPE_CONFIG[notification.type]
  const Icon    = config.icon
  const isUnread   = !notification.read
  const isResolved = notification.resolved
  const canResolve = notification.type === 'dispute' || notification.type === 'review' || notification.type === 'easybuy'

  return (
    <motion.div
      layout
      variants={itemVariant}
      onClick={() => isUnread && onMarkRead(notification.id)}
      className={`relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-l-4 border border-border-light transition-all duration-300 cursor-pointer group ${
        config.borderColor
      } ${
        isUnread
          ? 'bg-white hover:shadow-md'
          : 'bg-bg-secondary hover:bg-white'
      } ${
        isResolved ? 'opacity-60' : ''
      }`}
      style={isUnread ? { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' } : {}}
    >
      {/* One-time highlight fade for unread on load */}
      {isUnread && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut', delay: index * 0.08 + 0.3 }}
          className="absolute inset-0 rounded-2xl bg-orange-50 pointer-events-none"
        />
      )}

      {/* Type icon */}
      <div className={`relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${config.iconBg}`}>
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
        {isUnread && (
          <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${config.dotColor}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Type badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${config.badgeBg} ${config.badgeText}`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
            {/* Unread dot */}
            {isUnread && (
              <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${config.dotColor}`} />
            )}
            {/* Resolved badge */}
            {isResolved && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-3 h-3" />
                Resolved
              </span>
            )}
          </div>
          <span className="text-xs text-text-secondary flex-shrink-0 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {notification.timestamp}
          </span>
        </div>

        {/* Message */}
        <p className={`mt-1.5 text-sm leading-relaxed ${
          isUnread ? 'font-semibold text-text-primary' : 'font-normal text-text-secondary'
        }`}>
          {notification.message}
        </p>

        {/* Action row */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <Link
            href={notification.link}
            onClick={(e) => e.stopPropagation()}
            className={`text-xs font-semibold hover:underline transition-colors ${config.badgeText}`}
          >
            View details →
          </Link>

          {isUnread && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkRead(notification.id) }}
              className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              <Check className="w-3 h-3" />
              Mark as read
            </button>
          )}

          {canResolve && !isResolved && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkResolved(notification.id) }}
              className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              <CheckCircle2 className="w-3 h-3" />
              Mark as resolved
            </button>
          )}
        </div>

        {isUnread && (
          <p className="mt-1.5 text-xs text-brand-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to mark as read
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ activeTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
        <Bell className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
      </div>
      <p className="text-base font-bold text-text-primary">No {activeTab === 'All' ? '' : activeTab} notifications</p>
      <p className="text-sm text-text-secondary mt-1 max-w-xs">
        {activeTab === 'All'
          ? "You're all caught up — no notifications at the moment."
          : `There are no ${activeTab.toLowerCase()} notifications right now.`}
      </p>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'All',       label: 'All',       type: null },
  { key: 'Orders',    label: 'Orders',    type: 'order' },
  { key: 'Inventory', label: 'Inventory', type: 'inventory' },
  { key: 'Easy Buy',  label: 'Easy Buy',  type: 'easybuy' },
  { key: 'Reviews',   label: 'Reviews',   type: 'review' },
  { key: 'Disputes',  label: 'Disputes',  type: 'dispute' },
]

export default function AdminNotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [notifications,    setNotifications]    = useState(MOCK_NOTIFICATIONS)
  const [activeTab,        setActiveTab]        = useState('All')

  // ── Derived counts per tab ──
  const countFor = (type) =>
    type === null
      ? notifications.filter((n) => !n.read).length
      : notifications.filter((n) => n.type === type && !n.read).length

  // ── Filtered list ──
  const filtered = activeTab === 'All'
    ? notifications
    : notifications.filter((n) => n.type === TABS.find((t) => t.key === activeTab)?.type)

  const unreadCount = notifications.filter((n) => !n.read).length

  // ── Actions ──
  const markRead = (id) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const markResolved = (id) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, resolved: true, read: true } : n))

  return (
    <div className="min-h-screen bg-bg-secondary flex overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border-light">
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Marketplace Admin
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-bg-secondary rounded-full">
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
              {SIDEBAR_NAV.map((item) => {
                const Icon = item.icon
                const isActive = item.href === '/admin/notifications'
                return (
                  <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all ${
                      isActive ? 'bg-orange-50 text-brand-orange' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`text-sm font-medium ${isActive ? 'font-semibold text-brand-orange' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">

          {/* ── Page heading ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Admin Panel
              </p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Notifications Center
                {unreadCount > 0 && (
                  <span className="text-sm font-semibold bg-brand-orange text-white px-2.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Stay on top of orders, inventory alerts, Easy Buy applications, reviews, and disputes.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 text-sm text-brand-orange hover:text-orange-600 font-semibold transition-colors flex-shrink-0"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </motion.div>

          {/* ── Summary stat cards ── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {TABS.filter((t) => t.type !== null).map((tab) => {
              const cfg   = TYPE_CONFIG[tab.type]
              const Icon  = cfg.icon
              const count = notifications.filter((n) => n.type === tab.type).length
              const unread = notifications.filter((n) => n.type === tab.type && !n.read).length
              return (
                <motion.button
                  key={tab.key}
                  variants={fadeCard}
                  onClick={() => setActiveTab(tab.key)}
                  className={`bg-white rounded-2xl border p-4 text-left hover:shadow-md transition-all ${
                    activeTab === tab.key ? 'border-brand-orange ring-2 ring-brand-orange/10' : 'border-border-light'
                  }`}
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${cfg.iconBg}`}>
                    <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">{cfg.label}</p>
                  <p className="text-2xl font-bold text-text-primary">{count}</p>
                  {unread > 0 && (
                    <p className={`text-xs font-semibold mt-1 ${cfg.badgeText}`}>{unread} unread</p>
                  )}
                  <div className={`mt-3 h-1 rounded-full opacity-30 ${cfg.dotColor}`} />
                </motion.button>
              )
            })}
          </motion.div>

          {/* ── Filter tabs + notification list ── */}
          <motion.div
            variants={fadeCard}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-border-light overflow-hidden"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {/* Tab bar */}
            <div className="px-5 py-4 border-b border-border-light overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {TABS.map((tab) => {
                  const unread = countFor(tab.type)
                  const isActive = activeTab === tab.key
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-brand-orange text-white shadow-sm'
                          : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                      }`}
                      style={isActive ? { boxShadow: '0 4px 12px rgba(246,139,30,0.25)' } : {}}
                    >
                      {tab.label}
                      {unread > 0 && (
                        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                          isActive ? 'bg-white/25 text-white' : 'bg-red-100 text-red-600'
                        }`}>
                          {unread}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Result count */}
            <div className="px-5 py-3 border-b border-border-light flex items-center justify-between">
              <p className="text-xs text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{filtered.length}</span> notification{filtered.length !== 1 ? 's' : ''}
                {activeTab !== 'All' && <span> in <span className="font-semibold text-text-primary">{activeTab}</span></span>}
              </p>
              {filtered.filter((n) => !n.read).length > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-brand-orange hover:underline font-semibold"
                >
                  Mark visible as read
                </button>
              )}
            </div>

            {/* Notification list */}
            <div className="p-4 space-y-3">
              {filtered.length === 0 ? (
                <EmptyState activeTab={activeTab} />
              ) : (
                <motion.div
                  variants={fadeContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  <AnimatePresence>
                    {filtered.map((notification, i) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        index={i}
                        onMarkRead={markRead}
                        onMarkResolved={markResolved}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* All-read state */}
            {filtered.length > 0 && filtered.every((n) => n.read) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-center gap-2 py-5 border-t border-border-light"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm text-text-secondary font-medium">
                  All caught up — no unread notifications{activeTab !== 'All' ? ` in ${activeTab}` : ''}.
                </p>
              </motion.div>
            )}
          </motion.div>

          <div className="h-4" />
        </main>
      </div>
    </div>
  )
}