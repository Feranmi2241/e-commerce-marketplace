'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  CheckCircle2,
  Circle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Zap,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  HeadphonesIcon,
  ArrowLeft,
  Clock,
  RefreshCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Mock Orders ──────────────────────────────────────────────────────────────

const ALL_ORDERS = [
  {
    id: 'ORD-38291',
    date: 'Jul 25, 2025',
    status: 'Processing',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'card', label: 'Mastercard ending in 4242' },
    items: [
      {
        name: 'Samsung 55" Crystal UHD 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&h=120&fit=crop',
        qty: 1,
        price: 485000,
      },
      {
        name: 'Sony WH-1000XM5 Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
        qty: 1,
        price: 189000,
      },
      {
        name: 'Dyson V15 Detect Cordless Vacuum',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
        qty: 1,
        price: 420000,
      },
    ],
    estimatedDelivery: 'Aug 1, 2025',
  },
  {
    id: 'ORD-37104',
    date: 'Jul 20, 2025',
    status: 'Shipped',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'bank', label: 'Bank Transfer — GTBank' },
    items: [
      {
        name: 'Dyson V15 Detect Cordless Vacuum',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
        qty: 1,
        price: 420000,
      },
    ],
    estimatedDelivery: 'Jul 28, 2025',
  },
  {
    id: 'ORD-36850',
    date: 'Jul 15, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'card', label: 'Visa ending in 1234' },
    items: [
      {
        name: 'Samsung 55" Crystal UHD 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&h=120&fit=crop',
        qty: 1,
        price: 485000,
      },
      {
        name: 'HDMI 2.1 Ultra High Speed Cable 2m',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
        qty: 1,
        price: 8500,
      },
    ],
    estimatedDelivery: 'Jul 22, 2025',
  },
  {
    id: 'ORD-36201',
    date: 'Jul 10, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'pod', label: 'Pay on Delivery — Cash' },
    items: [
      {
        name: 'Hisense 200L Chest Freezer',
        image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=120&fit=crop',
        qty: 1,
        price: 210000,
      },
    ],
    estimatedDelivery: 'Jul 17, 2025',
  },
  {
    id: 'ORD-35780',
    date: 'Jul 5, 2025',
    status: 'Cancelled',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'card', label: 'Mastercard ending in 4242' },
    items: [
      {
        name: 'Xiaomi Redmi Note 13 Pro 256GB',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop',
        qty: 1,
        price: 185000,
      },
      {
        name: 'Phone Case & Tempered Glass Screen Guard',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=120&h=120&fit=crop',
        qty: 1,
        price: 10000,
      },
    ],
    estimatedDelivery: 'N/A — Cancelled',
  },
  {
    id: 'ORD-35102',
    date: 'Jun 28, 2025',
    status: 'Delivered',
    isEasyBuy: true,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'easybuy', label: 'Easy Buy — 6 Monthly Instalments' },
    items: [
      {
        name: 'Apple MacBook Air M3 13" 16GB 512GB',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&h=120&fit=crop',
        qty: 1,
        price: 1480000,
      },
    ],
    estimatedDelivery: 'Jul 5, 2025',
    easyBuySchedule: [
      { due: 'Jun 28, 2025', amount: 246667, paid: true },
      { due: 'Jul 28, 2025', amount: 246667, paid: true },
      { due: 'Aug 28, 2025', amount: 246667, paid: false },
      { due: 'Sep 28, 2025', amount: 246667, paid: false },
      { due: 'Oct 28, 2025', amount: 246667, paid: false },
      { due: 'Nov 28, 2025', amount: 246665, paid: false },
    ],
  },
  {
    id: 'ORD-34890',
    date: 'Jun 20, 2025',
    status: 'Shipped',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'bank', label: 'Bank Transfer — Access Bank' },
    items: [
      {
        name: 'LG 9kg Front Load Washing Machine',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=120&h=120&fit=crop',
        qty: 1,
        price: 320000,
      },
    ],
    estimatedDelivery: 'Jun 27, 2025',
  },
  {
    id: 'ORD-34201',
    date: 'Jun 14, 2025',
    status: 'Processing',
    isEasyBuy: true,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'easybuy', label: 'Easy Buy — 6 Monthly Instalments' },
    items: [
      {
        name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&h=120&fit=crop',
        qty: 1,
        price: 1150000,
      },
    ],
    estimatedDelivery: 'Jun 21, 2025',
    easyBuySchedule: [
      { due: 'Jun 14, 2025', amount: 191667, paid: true },
      { due: 'Jul 14, 2025', amount: 191667, paid: false },
      { due: 'Aug 14, 2025', amount: 191667, paid: false },
      { due: 'Sep 14, 2025', amount: 191667, paid: false },
      { due: 'Oct 14, 2025', amount: 191667, paid: false },
      { due: 'Nov 14, 2025', amount: 191665, paid: false },
    ],
  },
  {
    id: 'ORD-33540',
    date: 'Jun 8, 2025',
    status: 'Cancelled',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'card', label: 'Visa ending in 5678' },
    items: [
      {
        name: 'Nikon Z50 Mirrorless Camera Body',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop',
        qty: 1,
        price: 580000,
      },
    ],
    estimatedDelivery: 'N/A — Cancelled',
  },
  {
    id: 'ORD-32910',
    date: 'May 30, 2025',
    status: 'Delivered',
    isEasyBuy: false,
    deliveryAddress: {
      name: 'Adaeze Okonkwo',
      line1: '14B Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      phone: '+234 801 234 5678',
    },
    paymentMethod: { type: 'card', label: 'Mastercard ending in 4242' },
    items: [
      {
        name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=120&h=120&fit=crop',
        qty: 1,
        price: 65000,
      },
      {
        name: 'LG 24" IPS Full HD Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop',
        qty: 1,
        price: 33000,
      },
    ],
    estimatedDelivery: 'Jun 6, 2025',
  },
]

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">

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

// ─── Timeline Steps Config ────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  { key: 'Placed',           label: 'Order Placed',     icon: Package },
  { key: 'Processing',       label: 'Processing',       icon: RotateCcw },
  { key: 'Shipped',          label: 'Shipped',          icon: Truck },
  { key: 'Out for Delivery', label: 'Out for Delivery', icon: MapPin },
  { key: 'Delivered',        label: 'Delivered',        icon: CheckCircle2 },
]

function getStepIndex(status) {
  const map = {
    Placed: 0,
    Processing: 1,
    Shipped: 2,
    'Out for Delivery': 3,
    Delivered: 4,
  }
  return map[status] ?? 1
}

// ─── Status Timeline ──────────────────────────────────────────────────────────

function StatusTimeline({ status, isCancelled }) {
  const currentIndex = isCancelled ? -1 : getStepIndex(status)

  return (
    <div
      className="bg-white rounded-2xl border border-border-light p-6 md:p-8"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-6">
        Order Status
      </p>

      {isCancelled ? (
        <div className="flex items-center gap-3 py-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="font-bold text-red-600 text-sm">Order Cancelled</p>
            <p className="text-xs text-text-secondary mt-0.5">
              This order was cancelled and will not be processed.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Background connector line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border-light hidden sm:block" />

          {/* Animated fill line */}
          <motion.div
            className="absolute top-5 left-5 h-0.5 bg-brand-orange hidden sm:block origin-left"
            style={{ right: 'auto' }}
            initial={{ width: 0 }}
            animate={{
              width:
                currentIndex === 0
                  ? 0
                  : `calc(${(currentIndex / (TIMELINE_STEPS.length - 1)) * 100}% - 2.5rem)`,
            }}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.3 }}
          />

          <div className="flex items-start justify-between relative gap-2">
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = index < currentIndex
              const isActive    = index === currentIndex
              const Icon        = step.icon

              return (
                <div key={step.key} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 * index, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      isCompleted
                        ? 'bg-brand-orange text-white'
                        : isActive
                        ? 'bg-white border-2 border-brand-orange text-brand-orange'
                        : 'bg-white border-2 border-border-light text-text-secondary'
                    }`}
                    style={
                      isActive
                        ? { boxShadow: '0 0 0 4px rgba(246,139,30,0.12), 0 2px 8px rgba(246,139,30,0.2)' }
                        : isCompleted
                        ? { boxShadow: '0 2px 8px rgba(246,139,30,0.25)' }
                        : undefined
                    }
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}

                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-brand-orange"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
                      />
                    )}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 * index + 0.2 }}
                    className={`text-xs font-semibold text-center leading-tight px-1 ${
                      isCompleted
                        ? 'text-brand-orange'
                        : isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary'
                    }`}
                  >
                    {step.label}
                  </motion.p>

                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="text-[10px] font-bold bg-orange-100 text-brand-orange px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      Current
                    </motion.span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Order Items List ─────────────────────────────────────────────────────────

function OrderItemsList({ items }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const delivery = 2500
  const total    = subtotal + delivery

  return (
    <div
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="px-6 pt-6 pb-2">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-4">
          Items in this Order
        </p>

        <div className="divide-y divide-border-light">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.38, delay: 0.1 * i, ease: 'easeOut' }}
              className="flex items-center gap-4 py-4"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
                  {item.name}
                </p>
                <p className="text-xs text-text-secondary mt-1">Qty: {item.qty}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-text-primary">
                  ₦{(item.price * item.qty).toLocaleString()}
                </p>
                {item.qty > 1 && (
                  <p className="text-xs text-text-secondary">₦{item.price.toLocaleString()} each</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-bg-secondary px-6 py-4 space-y-2 border-t border-border-light">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Delivery fee</span>
          <span>₦{delivery.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border-light">
          <span>Order Total</span>
          <span className="text-brand-orange">₦{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Delivery Address Card ────────────────────────────────────────────────────

function DeliveryAddressCard({ address }) {
  return (
    <div
      className="bg-white rounded-2xl border border-border-light p-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-4 h-4 text-brand-orange" />
        </div>
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
          Delivery Address
        </p>
      </div>
      <p className="text-sm font-bold text-text-primary">{address.name}</p>
      <p className="text-sm text-text-secondary mt-0.5">{address.line1}</p>
      <p className="text-sm text-text-secondary">{address.city}, {address.state}</p>
      <p className="text-sm text-text-secondary mt-1">{address.phone}</p>
    </div>
  )
}

// ─── Payment Method Card ──────────────────────────────────────────────────────

const PAYMENT_ICONS = {
  card:    CreditCard,
  bank:    CreditCard,
  pod:     Package,
  easybuy: Zap,
}

function PaymentMethodCard({ payment }) {
  const Icon      = PAYMENT_ICONS[payment.type] || CreditCard
  const isEasyBuy = payment.type === 'easybuy'

  return (
    <div
      className="bg-white rounded-2xl border border-border-light p-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isEasyBuy ? 'bg-amber-50' : 'bg-orange-50'}`}>
          <Icon className={`w-4 h-4 ${isEasyBuy ? 'text-amber-500' : 'text-brand-orange'}`} />
        </div>
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
          Payment Method
        </p>
      </div>
      <p className="text-sm font-semibold text-text-primary">{payment.label}</p>
      {isEasyBuy && (
        <p className="text-xs text-amber-600 mt-1 font-medium flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Instalment plan active — see schedule below
        </p>
      )}
    </div>
  )
}

// ─── Easy Buy Instalment Schedule ────────────────────────────────────────────

function EasyBuySchedule({ schedule }) {
  const totalPaid  = schedule.filter((r) => r.paid).reduce((s, r) => s + r.amount, 0)
  const totalOwed  = schedule.filter((r) => !r.paid).reduce((s, r) => s + r.amount, 0)
  const paidCount  = schedule.filter((r) => r.paid).length
  const totalCount = schedule.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-amber-200 overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(251,191,36,0.12)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Easy Buy Instalment Schedule</p>
            <p className="text-xs text-text-secondary">{paidCount} of {totalCount} payments made</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-text-secondary">Remaining</p>
            <p className="text-sm font-bold text-amber-600">₦{totalOwed.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">Paid</p>
            <p className="text-sm font-bold text-emerald-600">₦{totalPaid.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-amber-100">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paidCount / totalCount }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              <th className="text-left px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Due Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {schedule.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.08 * i + 0.5 }}
                className={row.paid ? 'bg-white' : 'bg-white hover:bg-amber-50/40 transition-colors'}
              >
                <td className="px-6 py-3.5 text-xs text-text-secondary font-medium">{i + 1}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                    <span className="text-sm text-text-primary font-medium">{row.due}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-bold text-text-primary">₦{row.amount.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3.5">
                  {row.paid ? (
                    <Badge variant="success">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <Circle className="w-3 h-3" />
                      Unpaid
                    </Badge>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// ─── Order Actions ────────────────────────────────────────────────────────────

function OrderActions({ status }) {
  const canReturn = status === 'Delivered'

  return (
    <div
      className="bg-white rounded-2xl border border-border-light p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div>
        <p className="text-sm font-semibold text-text-primary">Need assistance?</p>
        <p className="text-xs text-text-secondary mt-0.5">
          We&apos;re here to help with returns, refunds, or any order issue.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href="/help-center"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline transition"
        >
          <HeadphonesIcon className="w-4 h-4" />
          Need help with this order?
        </Link>

        {canReturn && (
          <Link href="/returns">
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold text-sm gap-2 h-10 rounded-xl"
            >
              <RefreshCcw className="w-4 h-4" />
              Request Return / Refund
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params?.id
  const order = ALL_ORDERS.find((o) => o.id === orderId) ?? ALL_ORDERS[0]

  const isCancelled = order.status === 'Cancelled'

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/orders" className="hover:text-brand-orange transition">My Orders</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">{order.id}</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Order Detail
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3 flex-wrap">
                {order.id}
                {order.isEasyBuy && (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full">
                    <Zap className="w-3.5 h-3.5" />
                    Easy Buy
                  </span>
                )}
              </h1>
              <p className="text-sm text-text-secondary mt-1 flex items-center gap-1.5 flex-wrap">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                Placed on {order.date}
                {!isCancelled && (
                  <>
                    <span className="mx-1">·</span>
                    Est. delivery:
                    <span className="font-medium text-text-primary ml-1">{order.estimatedDelivery}</span>
                  </>
                )}
              </p>
            </div>

            <Link href="/orders">
              <Button
                variant="outline"
                className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Status Timeline — near top, animate on mount */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut', delay: 0.08 }}
        >
          <StatusTimeline status={order.status} isCancelled={isCancelled} />
        </motion.div>

        {/* Order Items — scroll-triggered, once */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <OrderItemsList items={order.items} />
        </motion.div>

        {/* Delivery + Payment — scroll-triggered, once */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <DeliveryAddressCard address={order.deliveryAddress} />
          <PaymentMethodCard payment={order.paymentMethod} />
        </motion.div>

        {/* Easy Buy Schedule — only for Easy Buy orders */}
        {order.isEasyBuy && order.easyBuySchedule && (
          <EasyBuySchedule schedule={order.easyBuySchedule} />
        )}

        {/* Actions — scroll-triggered, once */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <OrderActions status={order.status} />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="text-center text-xs text-text-secondary pb-4"
        >
          Questions about your order?{' '}
          <Link href="/help-center" className="text-brand-orange hover:underline font-medium">
            Visit our Help Centre
          </Link>
          {' '}or{' '}
          <Link href="/contact" className="text-brand-orange hover:underline font-medium">
            Contact Support
          </Link>
        </motion.p>

      </main>

      <ChatButton />
    </div>
  )
}
