'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  MapPin,
  CreditCard,
  Package,
  ShoppingBag,
  Calendar,
  Hash,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Mock Order Data ──────────────────────────────────────────────────────────

const ORDER = {
  number: 'ORD-38291',
  date: 'July 25, 2025',
  estimatedDelivery: 'July 29 – July 31, 2025',
  paymentMethod: 'Debit / Credit Card',
  deliveryAddress: '14 Bode Thomas Street, Surulere, Lagos',
  items: [
    {
      id: 1,
      name: 'Samsung 55" Crystal UHD 4K Smart TV',
      variant: 'Black · 55 inch',
      qty: 1,
      unitPrice: 485000,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&h=120&fit=crop',
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      variant: 'Midnight Black',
      qty: 1,
      unitPrice: 189000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
    },
    {
      id: 3,
      name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
      variant: 'Yellow/Nickel',
      qty: 1,
      unitPrice: 420000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
    },
  ],
  deliveryFee: 5000,
}


// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="bg-white border-b border-border-light">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>
      </div>
    </header>
  )
}


// ─── Success Icon ─────────────────────────────────────────────────────────────
// One-time scale + fade entrance — plays once on mount, never loops.

function SuccessIcon() {
  return (
    <div className="flex items-center justify-center mb-6">
      {/* Outer glow ring — fades in slightly after the icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative"
      >
        {/* Soft ambient glow behind the icon */}
        <div className="absolute inset-0 rounded-full bg-emerald-200 blur-2xl opacity-50 scale-150 pointer-events-none" />

        {/* Pulsing ring — one gentle pulse, then stops */}
        <motion.div
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className="absolute inset-0 rounded-full bg-emerald-300 pointer-events-none"
        />

        {/* The icon itself */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
          className="relative"
        >
          <CheckCircle
            className="w-24 h-24 text-emerald-500"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}


// ─── Headline Block ───────────────────────────────────────────────────────────

function HeadlineBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
      className="text-center mb-8"
    >
      {/* Eyebrow label */}
      <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-3">
        Payment Confirmed
      </p>

      {/* Main headline — exact wording from spec */}
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 leading-tight">
        Order Placed Successfully
      </h1>

      <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed mb-6">
        Thank you, Adaeze! Your order has been received and is being processed.
        A confirmation email has been sent to your inbox.
      </p>

      {/* Order number + estimated delivery — two info pills */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Order number */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border-light rounded-xl shadow-sm">
          <Hash className="w-4 h-4 text-brand-orange flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs text-text-secondary leading-none mb-0.5">Order Number</p>
            <p className="text-sm font-bold text-text-primary">{ORDER.number}</p>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border-light rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-brand-orange flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs text-text-secondary leading-none mb-0.5">Estimated Delivery</p>
            <p className="text-sm font-bold text-text-primary">{ORDER.estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


// ─── Order Summary Card ───────────────────────────────────────────────────────

function OrderSummaryCard() {
  const subtotal = ORDER.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  const total = subtotal + ORDER.deliveryFee

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      className="bg-white rounded-2xl border border-border-light overflow-hidden mb-8"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Card header */}
      <div className="px-6 py-5 border-b border-border-light flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
          <Package className="w-4 h-4 text-brand-orange" />
        </div>
        <div>
          <h2 className="text-base font-bold text-text-primary">Order Summary</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {ORDER.items.reduce((s, i) => s + i.qty, 0)} items · Placed {ORDER.date}
          </p>
        </div>
      </div>

      {/* Items list */}
      <div className="px-6 py-5 space-y-4 border-b border-border-light">
        {ORDER.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Thumbnail */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + variant */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary line-clamp-1 leading-snug">
                {item.name}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {item.variant} · Qty: {item.qty}
              </p>
            </div>

            {/* Line total */}
            <p className="text-sm font-bold text-text-primary flex-shrink-0">
              ₦{(item.unitPrice * item.qty).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Delivery + payment info */}
      <div className="px-6 py-4 border-b border-border-light grid sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-text-primary mb-0.5">Delivery Address</p>
            <p className="text-xs text-text-secondary leading-relaxed">{ORDER.deliveryAddress}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CreditCard className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-text-primary mb-0.5">Payment Method</p>
            <p className="text-xs text-text-secondary">{ORDER.paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="px-6 py-5 space-y-2.5 bg-bg-secondary/40">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-semibold text-text-primary">₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Delivery fee</span>
          <span className="font-semibold text-text-primary">₦{ORDER.deliveryFee.toLocaleString()}</span>
        </div>
        <div className="h-px bg-border-light" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-text-primary">Total Paid</span>
          <span className="text-xl font-bold text-text-primary">₦{total.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  )
}


// ─── Action Buttons ───────────────────────────────────────────────────────────

function ActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.65 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3"
    >
      {/* Primary: Track Order */}
      <Link href="/orders/1">
        <Button
          className="h-12 px-8 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl gap-2 min-w-[180px]"
          style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.28)' }}
        >
          <Truck className="w-4 h-4" />
          Track Order
        </Button>
      </Link>

      {/* Secondary: Continue Shopping */}
      <Link href="/shop">
        <Button
          variant="outline"
          className="h-12 px-8 border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange font-semibold rounded-xl gap-2 min-w-[180px]"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Button>
      </Link>
    </motion.div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-12 md:py-16">

        {/* Success icon — one-time scale+fade entrance */}
        <SuccessIcon />

        {/* Headline + order number + estimated delivery */}
        <HeadlineBlock />

        {/* Brief order summary card */}
        <OrderSummaryCard />

        {/* Track Order + Continue Shopping buttons */}
        <ActionButtons />

        {/* Bottom reassurance note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="text-center text-xs text-text-secondary mt-8 leading-relaxed"
        >
          Need help?{' '}
          <Link href="/help-center" className="text-brand-orange hover:underline font-medium">
            Visit our Help Center
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="text-brand-orange hover:underline font-medium">
            contact support
          </Link>
          .
        </motion.p>

      </main>
    </div>
  )
}
