'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  Package,
  Truck,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Zap,
  ChevronRight,
  Clock,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Status Config ────────────────────────────────────────────────────────────
// Single source of truth for every status's color, icon, and bar color

const STATUS_CONFIG = {
  Processing: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    bar: 'bg-amber-400',
    dot: 'bg-amber-400',
    icon: RotateCcw,
  },
  Shipped: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    bar: 'bg-blue-500',
    dot: 'bg-blue-500',
    icon: Truck,
  },
  Delivered: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    bar: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  Cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    bar: 'bg-red-400',
    dot: 'bg-red-400',
    icon: XCircle,
  },
  'Easy Buy': {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    bar: 'bg-amber-400',
    dot: 'bg-amber-400',
    icon: Zap,
  },
}

// ─── Mock Orders ──────────────────────────────────────────────────────────────

const ALL_ORDERS = [
  {
    id: 'ORD-38291',
    date: 'Jul 25, 2025',
    status: 'Processing',
    isEasyBuy: false,
    total: 1099000,
    items: [
      {
        name: 'Samsung 55" Crystal UHD 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
      },
      {
        name: 'Dyson V15 Vacuum Cleaner',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-37104',
    date: 'Jul 20, 2025',
    status: 'Shipped',
    isEasyBuy: false,
    total: 420000,
    items: [
      {
        name: 'Dyson V15 Detect Cordless Vacuum',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-36850',
    date: 'Jul 15, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    total: 493500,
    items: [
      {
        name: 'Samsung 55" 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
      },
      {
        name: 'HDMI Cable 2.1',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-36201',
    date: 'Jul 10, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    total: 210000,
    items: [
      {
        name: 'Hisense Chest Freezer 200L',
        image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-35780',
    date: 'Jul 5, 2025',
    status: 'Cancelled',
    isEasyBuy: false,
    total: 195000,
    items: [
      {
        name: 'Xiaomi Redmi Note 13 Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop',
      },
      {
        name: 'Phone Case & Screen Guard',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-35102',
    date: 'Jun 28, 2025',
    status: 'Delivered',
    isEasyBuy: true,
    total: 1480000,
    items: [
      {
        name: 'MacBook Air M3 13" 16GB 512GB',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-34890',
    date: 'Jun 20, 2025',
    status: 'Shipped',
    isEasyBuy: false,
    total: 320000,
    items: [
      {
        name: 'LG 9kg Front Load Washing Machine',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-34201',
    date: 'Jun 14, 2025',
    status: 'Processing',
    isEasyBuy: true,
    total: 1150000,
    items: [
      {
        name: 'iPhone 15 Pro Max 256GB',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-33540',
    date: 'Jun 8, 2025',
    status: 'Cancelled',
    isEasyBuy: false,
    total: 580000,
    items: [
      {
        name: 'Nikon Z50 Mirrorless Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-32910',
    date: 'May 30, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    total: 98000,
    items: [
      {
        name: 'Instant Pot Duo 7-in-1',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&h=80&fit=crop',
      },
      {
        name: 'LG 24" IPS Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop',
      },
    ],
  },
]

// ─── Filter Tabs Config ───────────────────────────────────────────────────────

const TABS = [
  { id: 'All', label: 'All', count: ALL_ORDERS.length },
  { id: 'Processing', label: 'Processing', count: ALL_ORDERS.filter((o) => o.status === 'Processing').length },
  { id: 'Shipped', label: 'Shipped', count: ALL_ORDERS.filter((o) => o.status === 'Shipped').length },
  { id: 'Delivered', label: 'Delivered', count: ALL_ORDERS.filter((o) => o.status === 'Delivered').length },
  { id: 'Cancelled', label: 'Cancelled', count: ALL_ORDERS.filter((o) => o.status === 'Cancelled').length },
  { id: 'Easy Buy', label: 'Easy Buy', count: ALL_ORDERS.filter((o) => o.isEasyBuy).length },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
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
              { label: 'Shop', href: '/shop' },
              { label: 'Categories', href: '/shop' },
              { label: 'Deals', href: '/shop' },
              { label: 'Easy Buy', href: '/easy-buy' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-primary hover:text-brand-orange transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Link href="/notifications">
              <Bell className="w-5 h-5 text-text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
            </Link>
          </button>

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
          {[{ label: 'Shop', href: '/shop' }, { label: 'Categories', href: '/shop' }, { label: 'Deals', href: '/shop' }, { label: 'Easy Buy', href: '/easy-buy' }].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-sm text-text-primary hover:text-brand-orange transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}


// ─── Status Badge ─────────────────────────────────────────────────────────────
// Color-coded, always pairs color with icon + text (accessibility requirement)

function StatusBadge({ status, isEasyBuy }) {
  const key = isEasyBuy && status !== 'Cancelled' ? 'Easy Buy' : status
  const config = STATUS_CONFIG[key] || STATUS_CONFIG['Processing']
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      {isEasyBuy && status !== 'Cancelled' ? 'Easy Buy' : status}
    </span>
  )
}


// ─── Filter Tabs ──────────────────────────────────────────────────────────────

function FilterTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        const isEasyBuy = tab.id === 'Easy Buy'

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
              isActive
                ? isEasyBuy
                  ? 'bg-amber-400 text-white shadow-sm'
                  : 'bg-brand-orange text-white shadow-sm'
                : 'bg-white text-text-secondary border border-border-light hover:border-orange-200 hover:text-text-primary'
            }`}
            style={
              isActive && !isEasyBuy
                ? { boxShadow: '0 2px 8px rgba(246,139,30,0.25)' }
                : isActive && isEasyBuy
                ? { boxShadow: '0 2px 8px rgba(251,191,36,0.3)' }
                : undefined
            }
          >
            {isEasyBuy && <Zap className="w-3.5 h-3.5 flex-shrink-0" />}
            {tab.label}
            {/* Count badge */}
            <span
              className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-bg-secondary text-text-secondary'
              }`}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}


// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order }) {
  const statusKey = order.isEasyBuy && order.status !== 'Cancelled' ? 'Easy Buy' : order.status
  const config = STATUS_CONFIG[statusKey] || STATUS_CONFIG['Processing']

  // Show max 4 thumbnails, then a "+N more" overflow indicator
  const MAX_THUMBS = 4
  const visibleItems = order.items.slice(0, MAX_THUMBS)
  const overflow = order.items.length - MAX_THUMBS

  return (
    <motion.div
      layout
      variants={cardVariant}
      className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-md transition-shadow group"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Colored top bar — status indicator */}
      <div className={`h-1 w-full ${config.bar}`} />

      <div className="p-5 sm:p-6">
        {/* Top row: order number + status badge + date */}
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-bold text-text-primary text-sm">{order.id}</span>
              <StatusBadge status={order.status} isEasyBuy={order.isEasyBuy} />
              {/* Easy Buy secondary badge when order also has a real status */}
              {order.isEasyBuy && order.status !== 'Cancelled' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  {order.status}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-text-secondary">
              <Clock className="w-3 h-3" />
              {order.date}
            </div>
          </div>

          {/* Total price */}
          <div className="text-right">
            <p className="text-xs text-text-secondary mb-0.5">Order Total</p>
            <p className="text-lg font-bold text-text-primary">
              ₦{order.total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Product thumbnails row */}
        <div className="flex items-center gap-2 mb-5">
          {visibleItems.map((item, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0"
              title={item.name}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Overflow indicator */}
          {overflow > 0 && (
            <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-light flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-bold text-text-secondary">+{overflow}</span>
            </div>
          )}

          {/* Item count label */}
          <span className="text-xs text-text-secondary ml-1">
            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Bottom row: Easy Buy instalment note + View Details */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border-light">
          {order.isEasyBuy ? (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              Easy Buy — monthly instalments active
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Package className="w-3.5 h-3.5 flex-shrink-0" />
              {order.status === 'Delivered'
                ? 'Delivered successfully'
                : order.status === 'Cancelled'
                ? 'Order was cancelled'
                : order.status === 'Shipped'
                ? 'On its way to you'
                : 'Being prepared'}
            </div>
          )}

          <Link href={`/orders/${order.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="border-border-light hover:border-brand-orange hover:text-brand-orange text-xs font-semibold gap-1 group-hover:border-orange-200 transition-all"
            >
              View Details
              <ChevronRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}


// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ activeTab }) {
  const isEasyBuy = activeTab === 'Easy Buy'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-100 blur-xl opacity-60 scale-150" />
        <div className="relative w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
          {isEasyBuy ? (
            <Zap className="w-9 h-9 text-brand-orange" strokeWidth={1.5} />
          ) : (
            <Package className="w-9 h-9 text-brand-orange" strokeWidth={1.5} />
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-text-primary mb-2">
        {isEasyBuy ? 'No Easy Buy orders yet' : `No ${activeTab.toLowerCase()} orders`}
      </h3>
      <p className="text-text-secondary text-sm max-w-xs leading-relaxed mb-8">
        {isEasyBuy
          ? 'You haven\'t used Easy Buy yet. Browse eligible products and spread the cost.'
          : `You don't have any ${activeTab.toLowerCase()} orders right now.`}
      </p>

      <Link href="/shop">
        <Button className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl gap-2">
          <ShoppingBag className="w-4 h-4" />
          Start Shopping
        </Button>
      </Link>
    </motion.div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All')

  // Client-side filtering
  const filteredOrders = ALL_ORDERS.filter((order) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Easy Buy') return order.isEasyBuy
    return order.status === activeTab
  })

  return (
    <div className="min-h-screen bg-bg-secondary overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-8"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">My Orders</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                My Account
              </p>
              <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                Order History
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {ALL_ORDERS.length} orders
                </span>
              </h1>
            </div>

            <Link href="/shop">
              <Button
                variant="outline"
                className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          className="mb-6"
        >
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Orders list or empty state */}
        <AnimatePresence mode="wait">
          {filteredOrders.length === 0 ? (
            <EmptyState key={`empty-${activeTab}`} activeTab={activeTab} />
          ) : (
            <motion.div
              key={activeTab}
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom summary note */}
        {filteredOrders.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center text-xs text-text-secondary mt-10"
          >
            Showing {filteredOrders.length} of {ALL_ORDERS.length} orders ·{' '}
            <Link href="/help-center" className="text-brand-orange hover:underline font-medium">
              Need help with an order?
            </Link>
          </motion.p>
        )}
      </main>

      <ChatButton />
    </div>
  )
}
