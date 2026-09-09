'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  Minus,
  Plus,
  Trash2,
  Tag,
  X,
  ArrowRight,
  Zap,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'

// ─── Mock Customer ────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function CartNavbar({ cartCount }) {
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

          <Link href="/notifications" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </Link>

          {/* Cart icon — active/highlighted since we're on this page */}
          <Link href="/cart" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <ShoppingCart className="w-5 h-5 fill-brand-orange text-brand-orange" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 pl-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
              {CUSTOMER.initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-text-primary leading-tight">
                {CUSTOMER.firstName}
              </p>
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
            { label: 'Categories', href: '/shop' },
            { label: 'Deals', href: '/shop' },
            { label: 'Easy Buy', href: '/easy-buy' },
          ].map((link) => (
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

// ─── Mock Cart Data ──────────────────────────────────────────────────────────

const DELIVERY_FEE = 5000
const VALID_PROMO = { code: 'SAVE10', discountRate: 0.10 }

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

// ─── Quantity Stepper ─────────────────────────────────────────────────────────

function QuantityStepper({ qty, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center border border-border-light rounded-xl overflow-hidden">
      <button
        onClick={onDecrement}
        disabled={qty <= 1}
        className="w-9 h-9 flex items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-text-primary border-x border-border-light">
        {qty}
      </span>
      <button
        onClick={onIncrement}
        className="w-9 h-9 flex items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────

function OrderSummary({ cart }) {
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  // Handle both old format (qty, unitPrice) and new format (quantity, price)
  const subtotal = cart.reduce((sum, item) => {
    const qty = item.qty || item.quantity
    const price = item.unitPrice || item.price
    return sum + (price * qty)
  }, 0)
  const promoDiscount = appliedPromo ? Math.round(subtotal * VALID_PROMO.discountRate) : 0
  const total = subtotal - promoDiscount + DELIVERY_FEE

  const handleApply = () => {
    if (promoInput.trim().toUpperCase() === VALID_PROMO.code) {
      setAppliedPromo(VALID_PROMO.code)
      setPromoError('')
    } else {
      setPromoError('Invalid code. Try SAVE10.')
      setAppliedPromo(null)
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
    setPromoError('')
  }

  return (
    <div
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-light">
        <h2 className="text-lg font-bold text-text-primary">Order Summary</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          {cart.reduce((s, i) => s + (i.qty || i.quantity), 0)} item{cart.reduce((s, i) => s + (i.qty || i.quantity), 0) !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="p-6 space-y-4">

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-semibold text-text-primary">₦{subtotal.toLocaleString()}</span>
        </div>

        {/* Delivery fee */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Delivery fee</span>
          <span className="font-semibold text-text-primary">₦{DELIVERY_FEE.toLocaleString()}</span>
        </div>

        {/* Promo discount row — only when a code is applied */}
        <AnimatePresence>
          {appliedPromo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-sm overflow-hidden"
            >
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <Tag className="w-3.5 h-3.5" />
                {appliedPromo}
                <button onClick={handleRemovePromo} className="ml-1 text-text-secondary hover:text-red-500 transition">
                  <X className="w-3 h-3" />
                </button>
              </span>
              <span className="font-semibold text-emerald-600">−₦{promoDiscount.toLocaleString()}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-px bg-border-light" />

        {/* Promo code input — hidden once a code is applied */}
        {!appliedPromo && (
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => { setPromoInput(e.target.value); setPromoError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="Enter code"
                className="flex-1 h-10 px-3 rounded-xl border border-border-light text-sm text-text-primary outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <Button
                onClick={handleApply}
                variant="outline"
                className="h-10 px-4 border-border-light hover:border-brand-orange hover:text-brand-orange text-sm font-semibold rounded-xl"
              >
                Apply
              </Button>
            </div>
            {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
          </div>
        )}

        {/* Savings callout — shown when promo is active */}
        {appliedPromo && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
            <span className="text-base">🎉</span>
            <p className="text-xs text-emerald-700 font-medium">
              You're saving ₦{promoDiscount.toLocaleString()} with this promo!
            </p>
          </div>
        )}

        <div className="h-px bg-border-light" />

        {/* Total — bold, large */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-text-primary">Total</span>
          <span className="text-2xl font-bold text-text-primary">₦{total.toLocaleString()}</span>
        </div>

        {/* Proceed to Checkout CTA */}
        <Link href="/checkout" className="no-underline">
          <Button
            className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white font-bold text-base rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <p className="text-center text-xs text-text-secondary">
          🔒 Secure checkout · Free returns within 7 days
        </p>
      </div>
    </div>
  )
}

// ─── Empty Cart State ────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-28 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-100 blur-2xl opacity-60 scale-150" />
        <div className="relative w-28 h-28 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-brand-orange" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Your cart is empty</h2>
      <p className="text-text-secondary text-sm max-w-xs leading-relaxed mb-8">
        Looks like you haven&apos;t added anything yet. Browse our store and find something you love.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/shop">
          <Button className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl gap-2">
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/wishlist">
          <Button variant="outline" className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange h-11 px-6 rounded-xl">
            View Wishlist
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItemRow({ item, onQtyChange, onRemove }) {
  // Handle both old format (qty, unitPrice) and new format (quantity, price) from context
  const qty = item.qty || item.quantity
  const unitPrice = item.unitPrice || item.price
  const lineTotal = unitPrice * qty

  return (
    <motion.div
      layout
      variants={fadeUp}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-border-light p-5 flex gap-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Product image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-bg-secondary flex-shrink-0 border border-border-light">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {/* Product name */}
            <h3 className="font-semibold text-text-primary text-sm sm:text-base leading-snug line-clamp-2">
              {item.name}
            </h3>
            {/* Variant pill — only show if available */}
            {item.variant && (
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-bg-secondary text-text-secondary text-xs font-medium rounded-full border border-border-light">
                {item.variant}
              </span>
            )}
          </div>

          {/* Remove button */}
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
            className="p-1.5 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 transition flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Easy Buy note — only on eligible items */}
        {item.isEasyBuyEligible && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 font-medium">
              Easy Buy available — spread the cost in monthly instalments.{' '}
              <Link href="/easy-buy" className="underline underline-offset-2 hover:text-amber-900 transition">
                Learn more
              </Link>
            </p>
          </div>
        )}

        {/* Bottom row: stepper + unit price + line total */}
        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
          <QuantityStepper
            qty={qty}
            onDecrement={() => onQtyChange(item.id, qty - 1)}
            onIncrement={() => onQtyChange(item.id, qty + 1)}
          />
          <div className="text-right">
            <p className="text-xs text-text-secondary mb-0.5">
              ₦{unitPrice.toLocaleString()} × {qty}
            </p>
            <p className="text-lg font-bold text-text-primary">
              ₦{lineTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0)

  const handleQtyChange = (id, newQty) => {
    updateQuantity(id, newQty)
  }

  const handleRemove = (id) => {
    removeFromCart(id)
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <CartNavbar cartCount={totalQty} />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <motion.div initial="hidden" animate="show" variants={stagger}>

            {/* Page header */}
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">My Cart</p>
              <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                Shopping Cart
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {totalQty} {totalQty === 1 ? 'item' : 'items'}
                </span>
              </h1>
            </motion.div>

            {/* Cart items list + sidebar — two-column on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

              {/* Left: cart items */}
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                  <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-text-primary font-medium">Cart</span>
                </div>

                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </AnimatePresence>

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-orange font-medium hover:gap-2.5 transition-all"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </motion.div>

              {/* Right: order summary — sticky on large screens */}
              <motion.div variants={fadeUp} className="lg:sticky lg:top-24">
                <OrderSummary cart={cartItems} />
              </motion.div>

            </div>

          </motion.div>
        )}

      </main>
    </div>
  )
}
