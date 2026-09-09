'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  MapPin,
  Plus,
  CreditCard,
  Landmark,
  Truck,
  Zap,
  Check,
  ChevronRight,
  Package,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DELIVERY_FEE = 5000

const CART_ITEMS = [
  {
    id: 1,
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    variant: 'Black · 55 inch',
    unitPrice: 485000,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&h=120&fit=crop',
    isEasyBuyEligible: true,
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    variant: 'Midnight Black',
    unitPrice: 189000,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
    isEasyBuyEligible: false,
  },
  {
    id: 3,
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    variant: 'Yellow/Nickel',
    unitPrice: 420000,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
    isEasyBuyEligible: true,
  },
]

const SAVED_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    recipient: 'Adaeze Okonkwo',
    line1: '14 Bode Thomas Street',
    line2: 'Surulere',
    city: 'Lagos',
    state: 'Lagos State',
    zip: '101283',
    phone: '+234 801 234 5678',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    recipient: 'Adaeze Okonkwo',
    line1: '3rd Floor, Landmark Towers',
    line2: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    zip: '101241',
    phone: '+234 801 234 5678',
    isDefault: false,
  },
]

// Easy Buy is shown only if at least one cart item is eligible (price ≥ ₦130,000)
const HAS_EASY_BUY_ELIGIBLE = CART_ITEMS.some(
  (item) => item.isEasyBuyEligible && item.unitPrice >= 130000
)

const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Debit / Credit Card',
    desc: 'Visa, Mastercard, Verve — pay securely online',
    icon: CreditCard,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    desc: 'Transfer directly from your bank account',
    icon: Landmark,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'pod',
    label: 'Pay on Delivery',
    desc: 'Pay cash or card when your order arrives',
    icon: Truck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  ...(HAS_EASY_BUY_ELIGIBLE
    ? [
        {
          id: 'easybuy',
          label: 'Easy Buy',
          desc: 'Spread the cost in monthly instalments — 0% interest',
          icon: Zap,
          iconBg: 'bg-amber-50',
          iconColor: 'text-amber-500',
          badge: 'Eligible',
        },
      ]
    : []),
]

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}


// ─── Top Bar ──────────────────────────────────────────────────────────────────

function CheckoutTopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border-light">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>
        <div className="flex items-center gap-2 text-emerald-600">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wide">Secure Checkout</span>
        </div>
      </div>
    </header>
  )
}


// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Delivery', icon: MapPin },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: Package },
]

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const Icon = step.icon
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id
        const isLast = idx === STEPS.length - 1

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isActive
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'bg-white border-2 border-border-light text-text-secondary'
                }`}
                style={
                  isActive
                    ? { boxShadow: '0 0 0 4px rgba(246,139,30,0.15)' }
                    : undefined
                }
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'text-brand-orange'
                    : isCompleted
                    ? 'text-emerald-600'
                    : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {!isLast && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-emerald-400' : 'bg-border-light'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}


// ─── Order Summary Sidebar ────────────────────────────────────────────────────

function OrderSummarySidebar({ onPlaceOrder, currentStep }) {
  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  const total = subtotal + DELIVERY_FEE

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-2xl border border-border-light overflow-hidden lg:sticky lg:top-24"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-light">
        <h2 className="text-base font-bold text-text-primary">Order Summary</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          {CART_ITEMS.reduce((s, i) => s + i.qty, 0)} items
        </p>
      </div>

      {/* Item list */}
      <div className="px-6 py-4 space-y-4 border-b border-border-light">
        {CART_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug">
                {item.name}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">{item.variant}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-bold text-text-primary">
                ₦{(item.unitPrice * item.qty).toLocaleString()}
              </p>
              {item.qty > 1 && (
                <p className="text-xs text-text-secondary">×{item.qty}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-semibold text-text-primary">₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Delivery fee</span>
          <span className="font-semibold text-text-primary">₦{DELIVERY_FEE.toLocaleString()}</span>
        </div>
        <div className="h-px bg-border-light" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-text-primary">Total</span>
          <span className="text-xl font-bold text-text-primary">₦{total.toLocaleString()}</span>
        </div>

        {/* Place Order CTA */}
        <Button
          onClick={onPlaceOrder}
          disabled={currentStep < 3}
          className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm rounded-xl gap-2 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          style={currentStep === 3 ? { boxShadow: '0 4px 16px rgba(246,139,30,0.3)' } : undefined}
        >
          {currentStep < 3 ? (
            <>
              <Lock className="w-4 h-4" />
              Complete Steps to Order
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Place Order
            </>
          )}
        </Button>

        <p className="text-center text-xs text-text-secondary">
          🔒 Secure · Free returns within 7 days
        </p>
      </div>
    </motion.div>
  )
}


// ─── Step 1: Delivery ─────────────────────────────────────────────────────────

function DeliveryStep({ selectedAddressId, setSelectedAddressId, addresses, setAddresses, onNext }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddr, setNewAddr] = useState({
    label: '', recipient: '', line1: '', line2: '', city: '', state: '', zip: '', phone: '',
  })

  const handleAddAddress = () => {
    if (!newAddr.label || !newAddr.line1 || !newAddr.city) return
    const added = { ...newAddr, id: Date.now(), isDefault: false }
    setAddresses((prev) => [...prev, added])
    setSelectedAddressId(added.id)
    setShowAddForm(false)
    setNewAddr({ label: '', recipient: '', line1: '', line2: '', city: '', state: '', zip: '', phone: '' })
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.div variants={fadeUp}>
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Step 1 of 3
        </p>
        <h2 className="text-2xl font-bold text-text-primary mb-1">Delivery Address</h2>
        <p className="text-sm text-text-secondary">Choose where you want your order delivered</p>
      </motion.div>

      {/* Saved address cards */}
      <motion.div variants={fadeUp} className="space-y-3">
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id
          return (
            <button
              key={addr.id}
              onClick={() => setSelectedAddressId(addr.id)}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                isSelected
                  ? 'border-brand-orange bg-orange-50/40'
                  : 'border-border-light bg-white hover:border-orange-200'
              }`}
              style={
                isSelected
                  ? { boxShadow: '0 0 0 3px rgba(246,139,30,0.1)' }
                  : { boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }
              }
            >
              <div className="flex items-start gap-4">
                {/* Radio indicator */}
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? 'border-brand-orange' : 'border-border-light'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-orange block" />
                  )}
                </div>

                {/* Address details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-text-primary text-sm">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-brand-orange text-white text-xs font-bold rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-text-primary">{addr.recipient}</p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {addr.city}, {addr.state} {addr.zip}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">{addr.phone}</p>
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </motion.div>

      {/* Add New Address toggle */}
      <motion.div variants={fadeUp}>
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border-light py-4 text-sm font-semibold text-text-secondary hover:border-brand-orange hover:text-brand-orange transition-all bg-white"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        ) : (
          <div
            className="bg-white rounded-2xl border border-border-light p-6 space-y-4"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-text-primary text-sm">New Delivery Address</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-xs text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">Label</label>
                <input
                  value={newAddr.label}
                  onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                  placeholder="e.g. Home"
                  className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">Recipient Name</label>
                <input
                  value={newAddr.recipient}
                  onChange={(e) => setNewAddr({ ...newAddr, recipient: e.target.value })}
                  placeholder="Full name"
                  className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Address Line 1</label>
              <input
                value={newAddr.line1}
                onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })}
                placeholder="Street address"
                className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Address Line 2 (optional)</label>
              <input
                value={newAddr.line2}
                onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })}
                placeholder="Apartment, suite, etc."
                className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">City</label>
                <input
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  placeholder="Lagos"
                  className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">State</label>
                <input
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  placeholder="Lagos State"
                  className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">ZIP</label>
                <input
                  value={newAddr.zip}
                  onChange={(e) => setNewAddr({ ...newAddr, zip: e.target.value })}
                  placeholder="100001"
                  className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Phone Number</label>
              <input
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            <Button
              onClick={handleAddAddress}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl"
            >
              Save Address
            </Button>
          </div>
        )}
      </motion.div>

      {/* Continue button */}
      <motion.div variants={fadeUp} className="pt-2">
        <Button
          onClick={onNext}
          disabled={!selectedAddressId}
          className="bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-xl gap-2 disabled:opacity-40"
          style={selectedAddressId ? { boxShadow: '0 4px 16px rgba(246,139,30,0.25)' } : undefined}
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}


// ─── Step 2: Payment ──────────────────────────────────────────────────────────

function PaymentStep({ selectedPaymentId, setSelectedPaymentId, onNext, onBack }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.div variants={fadeUp}>
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Step 2 of 3
        </p>
        <h2 className="text-2xl font-bold text-text-primary mb-1">Payment Method</h2>
        <p className="text-sm text-text-secondary">Choose how you'd like to pay for your order</p>
      </motion.div>

      {/* Payment method cards */}
      <motion.div variants={fadeUp} className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon
          const isSelected = selectedPaymentId === method.id
          const isEasyBuy = method.id === 'easybuy'

          return (
            <button
              key={method.id}
              onClick={() => setSelectedPaymentId(method.id)}
              className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
                isSelected
                  ? isEasyBuy
                    ? 'border-amber-400 bg-amber-50/40'
                    : 'border-brand-orange bg-orange-50/40'
                  : 'border-border-light bg-white hover:border-orange-200'
              }`}
              style={
                isSelected
                  ? {
                      boxShadow: isEasyBuy
                        ? '0 0 0 3px rgba(251,191,36,0.15)'
                        : '0 0 0 3px rgba(246,139,30,0.1)',
                    }
                  : { boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }
              }
            >
              <div className="flex items-center gap-4">
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected
                      ? isEasyBuy
                        ? 'border-amber-400'
                        : 'border-brand-orange'
                      : 'border-border-light'
                  }`}
                >
                  {isSelected && (
                    <span
                      className={`w-2.5 h-2.5 rounded-full block ${
                        isEasyBuy ? 'bg-amber-400' : 'bg-brand-orange'
                      }`}
                    />
                  )}
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${method.iconBg}`}>
                  <Icon className={`w-5 h-5 ${method.iconColor}`} />
                </div>

                {/* Label + desc */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-text-primary text-sm">{method.label}</span>
                    {method.badge && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{method.desc}</p>
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isEasyBuy ? 'bg-amber-400' : 'bg-brand-orange'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {/* Easy Buy expanded detail when selected */}
              {isSelected && isEasyBuy && (
                <div className="mt-4 pt-4 border-t border-amber-200 grid grid-cols-3 gap-3">
                  {[
                    { label: '3 months', monthly: Math.round((CART_ITEMS.reduce((s, i) => s + i.unitPrice * i.qty, 0) + DELIVERY_FEE) / 3) },
                    { label: '6 months', monthly: Math.round((CART_ITEMS.reduce((s, i) => s + i.unitPrice * i.qty, 0) + DELIVERY_FEE) / 6) },
                    { label: '12 months', monthly: Math.round((CART_ITEMS.reduce((s, i) => s + i.unitPrice * i.qty, 0) + DELIVERY_FEE) / 12) },
                  ].map((plan) => (
                    <div key={plan.label} className="bg-white rounded-xl p-3 border border-amber-200 text-center">
                      <p className="text-xs text-text-secondary">{plan.label}</p>
                      <p className="text-sm font-bold text-text-primary mt-0.5">
                        ₦{plan.monthly.toLocaleString()}<span className="text-xs font-normal text-text-secondary">/mo</span>
                      </p>
                    </div>
                  ))}
                  <p className="col-span-3 text-xs text-amber-700 font-medium text-center">
                    0% interest · No hidden fees · Flexible plans
                  </p>
                </div>
              )}

              {/* Card payment expanded detail when selected */}
              {isSelected && method.id === 'card' && (
                <div className="mt-4 pt-4 border-t border-orange-100 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1.5">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      placeholder="Adaeze Okonkwo"
                      className="w-full h-10 px-3 rounded-xl border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer expanded detail when selected */}
              {isSelected && method.id === 'bank' && (
                <div className="mt-4 pt-4 border-t border-orange-100">
                  <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
                    <p className="text-xs font-semibold text-violet-700 mb-2">Transfer to this account:</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">Bank</span>
                        <span className="font-semibold text-text-primary">Zenith Bank</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">Account Number</span>
                        <span className="font-semibold text-text-primary font-mono">2034 5678 90</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-text-secondary">Account Name</span>
                        <span className="font-semibold text-text-primary">Marketplace Ltd</span>
                      </div>
                    </div>
                    <p className="text-xs text-violet-600 mt-3">
                      Use your order number as the payment reference. Your order will be confirmed once payment is received.
                    </p>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </motion.div>

      {/* Navigation buttons */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-border-light text-text-secondary hover:text-text-primary hover:border-text-secondary h-12 px-6 rounded-xl"
        >
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedPaymentId}
          className="bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-xl gap-2 disabled:opacity-40"
          style={selectedPaymentId ? { boxShadow: '0 4px 16px rgba(246,139,30,0.25)' } : undefined}
        >
          Review Order
          <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}


// ─── Step 3: Review ───────────────────────────────────────────────────────────

function ReviewStep({ selectedAddressId, selectedPaymentId, onBack, onPlaceOrder, addresses }) {
  const address = addresses.find((a) => a.id === selectedAddressId)
  const payment = PAYMENT_METHODS.find((p) => p.id === selectedPaymentId)
  const PaymentIcon = payment?.icon

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  const total = subtotal + DELIVERY_FEE

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={fadeUp}>
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Step 3 of 3
        </p>
        <h2 className="text-2xl font-bold text-text-primary mb-1">Review Your Order</h2>
        <p className="text-sm text-text-secondary">Check everything looks right before placing your order</p>
      </motion.div>

      {/* Delivery address review */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl border border-border-light overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="font-bold text-text-primary text-sm">Delivery Address</span>
          </div>
          <button
            onClick={onBack}
            className="text-xs font-medium text-brand-orange hover:underline"
          >
            Change
          </button>
        </div>
        {address && (
          <div className="px-6 py-4 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-text-primary text-sm">{address.recipient}</p>
              <p className="text-sm text-text-secondary mt-0.5">
                {address.line1}{address.line2 ? `, ${address.line2}` : ''}
              </p>
              <p className="text-sm text-text-secondary">
                {address.city}, {address.state} {address.zip}
              </p>
              <p className="text-xs text-text-secondary mt-1">{address.phone}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Payment method review */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl border border-border-light overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="font-bold text-text-primary text-sm">Payment Method</span>
          </div>
          <button
            onClick={() => onBack('payment')}
            className="text-xs font-medium text-brand-orange hover:underline"
          >
            Change
          </button>
        </div>
        {payment && (
          <div className="px-6 py-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${payment.iconBg}`}>
              <PaymentIcon className={`w-5 h-5 ${payment.iconColor}`} />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">{payment.label}</p>
              <p className="text-xs text-text-secondary mt-0.5">{payment.desc}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Items review */}
      <motion.div
        variants={fadeUp}
        className="bg-white rounded-2xl border border-border-light overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        <div className="px-6 py-4 border-b border-border-light">
          <span className="font-bold text-text-primary text-sm">
            Items ({CART_ITEMS.reduce((s, i) => s + i.qty, 0)})
          </span>
        </div>
        <div className="px-6 py-4 space-y-4">
          {CART_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary line-clamp-1">{item.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{item.variant} · Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-bold text-text-primary flex-shrink-0">
                ₦{(item.unitPrice * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border-light space-y-2 bg-bg-secondary/50">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal</span>
            <span className="font-semibold text-text-primary">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Delivery fee</span>
            <span className="font-semibold text-text-primary">₦{DELIVERY_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-1 border-t border-border-light">
            <span className="text-text-primary">Total</span>
            <span className="text-text-primary">₦{total.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Trust note */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-100 rounded-2xl"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-700 font-medium leading-relaxed">
          Your payment is protected by 256-bit SSL encryption. We never store your card details.
        </p>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
        <Button
          onClick={() => onBack('payment')}
          variant="outline"
          className="border-border-light text-text-secondary hover:text-text-primary hover:border-text-secondary h-12 px-6 rounded-xl"
        >
          ← Back
        </Button>
        <Button
          onClick={onPlaceOrder}
          className="bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 px-8 rounded-xl gap-2"
          style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.3)' }}
        >
          <ShieldCheck className="w-4 h-4" />
          Place Order
        </Button>
      </motion.div>
    </motion.div>
  )
}


// ─── Order Placed Success Screen ──────────────────────────────────────────────

function OrderPlacedScreen() {
  const [orderRef] = useState(() => `ORD-${Math.floor(Math.random() * 90000) + 10000}`)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-100 blur-2xl opacity-70 scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <Check className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
        </div>
      </div>
      <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-2">
        Order Confirmed
      </p>
      <h2 className="text-3xl font-bold text-text-primary mb-3">
        Thank you, Adaeze! 🎉
      </h2>
      <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-2">
        Your order has been placed successfully. You'll receive a confirmation email shortly.
      </p>
      <p className="text-xs text-text-secondary mb-8">
        Order reference: <span className="font-bold text-text-primary">{orderRef}</span>
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/dashboard">
          <Button className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl gap-2">
            Go to Dashboard
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline" className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange h-11 px-6 rounded-xl">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState(SAVED_ADDRESSES[0].id)
  const [selectedPaymentId, setSelectedPaymentId] = useState(null)
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES)

  const handlePlaceOrder = () => {
    router.push('/order-confirmation')
  }

  const handleBack = (target) => {
    if (target === 'payment') {
      setCurrentStep(2)
    } else {
      setCurrentStep((prev) => Math.max(1, prev - 1))
    }
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <CheckoutTopBar />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Step indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Two-column layout: steps left, sidebar right */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start"
          >
            {/* Left: current step content */}
            <div>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <DeliveryStep
                      selectedAddressId={selectedAddressId}
                      setSelectedAddressId={setSelectedAddressId}
                      addresses={addresses}
                      setAddresses={setAddresses}
                      onNext={() => setCurrentStep(2)}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <PaymentStep
                      selectedPaymentId={selectedPaymentId}
                      setSelectedPaymentId={setSelectedPaymentId}
                      onNext={() => setCurrentStep(3)}
                      onBack={() => setCurrentStep(1)}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <ReviewStep
                      selectedAddressId={selectedAddressId}
                      selectedPaymentId={selectedPaymentId}
                      addresses={addresses}
                      onBack={handleBack}
                      onPlaceOrder={handlePlaceOrder}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: sticky order summary */}
            <OrderSummarySidebar
              onPlaceOrder={handlePlaceOrder}
              currentStep={currentStep}
            />
          </motion.div>
        </main>
    </div>
  )
}
