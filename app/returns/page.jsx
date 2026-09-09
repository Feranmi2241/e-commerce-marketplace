'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  ChevronRight,
  Upload,
  X,
  ImageIcon,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCcw,
  Package,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Mock Orders (for the order/item select dropdown) ─────────────────────────

const MOCK_ORDERS = [
  {
    id: 'ORD-38291',
    label: 'ORD-38291 — Samsung 55" Crystal UHD 4K Smart TV',
    item: 'Samsung 55" Crystal UHD 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
    price: 485000,
  },
  {
    id: 'ORD-38291-B',
    label: 'ORD-38291 — Sony WH-1000XM5 Wireless Headphones',
    item: 'Sony WH-1000XM5 Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
    price: 189000,
  },
  {
    id: 'ORD-36850',
    label: 'ORD-36850 — Samsung 55" Crystal UHD 4K Smart TV',
    item: 'Samsung 55" Crystal UHD 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
    price: 485000,
  },
  {
    id: 'ORD-36201',
    label: 'ORD-36201 — Hisense 200L Chest Freezer',
    item: 'Hisense 200L Chest Freezer',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop',
    price: 210000,
  },
  {
    id: 'ORD-32910',
    label: 'ORD-32910 — Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    item: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&h=80&fit=crop',
    price: 65000,
  },
  {
    id: 'ORD-32910-B',
    label: 'ORD-32910 — LG 24" IPS Full HD Monitor',
    item: 'LG 24" IPS Full HD Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop',
    price: 33000,
  },
]

// ─── Return Reasons ───────────────────────────────────────────────────────────

const RETURN_REASONS = [
  { value: 'damaged',         label: 'Damaged / Defective' },
  { value: 'wrong_item',      label: 'Wrong Item Received' },
  { value: 'not_as_described',label: 'Not as Described' },
  { value: 'changed_mind',    label: 'Changed My Mind' },
  { value: 'other',           label: 'Other' },
]

// ─── Mock Existing Return Requests ────────────────────────────────────────────

const EXISTING_RETURNS = [
  {
    id: 'RET-1042',
    orderId: 'ORD-36850',
    item: 'Samsung 55" Crystal UHD 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
    reason: 'Damaged / Defective',
    date: 'Jul 18, 2025',
    status: 'Approved',
    refundMethod: 'Original Payment Method',
    amount: 485000,
  },
  {
    id: 'RET-1031',
    orderId: 'ORD-32910',
    item: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&h=80&fit=crop',
    reason: 'Not as Described',
    date: 'Jun 10, 2025',
    status: 'Refunded',
    refundMethod: 'Wallet Credit',
    amount: 65000,
  },
  {
    id: 'RET-1018',
    orderId: 'ORD-36201',
    item: 'Hisense 200L Chest Freezer',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop',
    reason: 'Wrong Item Received',
    date: 'May 22, 2025',
    status: 'Rejected',
    refundMethod: 'Original Payment Method',
    amount: 210000,
  },
  {
    id: 'RET-1009',
    orderId: 'ORD-32910-B',
    item: 'LG 24" IPS Full HD Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop',
    reason: 'Changed My Mind',
    date: 'May 5, 2025',
    status: 'Pending',
    refundMethod: 'Wallet Credit',
    amount: 33000,
  },
]

// ─── Status Badge Config ──────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Pending:  { variant: 'warning',     icon: Clock },
  Approved: { variant: 'success',     icon: CheckCircle2 },
  Rejected: { variant: 'destructive', icon: XCircle },
  Refunded: { variant: 'default',     icon: RefreshCcw },
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

          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
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

// ─── Success Toast ────────────────────────────────────────────────────────────

function SuccessToast({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-4 shadow-xl"
      style={{ boxShadow: '0 8px 32px rgba(16,185,129,0.15)' }}
    >
      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <p className="text-sm font-bold text-text-primary">Return request submitted!</p>
        <p className="text-xs text-text-secondary mt-0.5">We&apos;ll review it within 2–3 business days.</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-bg-secondary rounded-full transition flex-shrink-0"
      >
        <X className="w-4 h-4 text-text-secondary" />
      </button>
    </motion.div>
  )
}

// ─── Photo Upload ─────────────────────────────────────────────────────────────

function PhotoUpload({ files, setFiles }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback((incoming) => {
    const imageFiles = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    const withPreviews = imageFiles.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name,
    }))
    setFiles((prev) => [...prev, ...withPreviews].slice(0, 4))
  }, [setFiles])

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-brand-orange bg-orange-50 scale-[1.01]'
            : 'border-border-light bg-bg-secondary hover:border-orange-300 hover:bg-orange-50/40'
        }`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          isDragging ? 'bg-orange-100' : 'bg-white border border-border-light'
        }`}>
          <Upload className={`w-5 h-5 ${isDragging ? 'text-brand-orange' : 'text-text-secondary'}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary">
            {isDragging ? 'Drop photos here' : 'Drag & drop photos here'}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            or <span className="text-brand-orange font-medium">click to browse</span> · PNG, JPG up to 10MB · max 4 photos
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {files.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          {files.map((f, i) => (
            <div key={i} className="relative group">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-border-light bg-bg-secondary">
                <img src={f.preview} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {files.length < 4 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-border-light bg-bg-secondary flex flex-col items-center justify-center gap-1 hover:border-orange-300 transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-text-secondary" />
              <span className="text-[10px] text-text-secondary font-medium">Add more</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Return Request Form ──────────────────────────────────────────────────────

function ReturnRequestForm({ onSuccess }) {
  const [selectedOrder, setSelectedOrder] = useState('')
  const [reason, setReason]               = useState('')
  const [description, setDescription]     = useState('')
  const [photos, setPhotos]               = useState([])
  const [refundMethod, setRefundMethod]   = useState('wallet')
  const [errors, setErrors]               = useState({})
  const [submitting, setSubmitting]       = useState(false)

  const validate = () => {
    const e = {}
    if (!selectedOrder)  e.order       = 'Please select an order item.'
    if (!reason)         e.reason      = 'Please select a return reason.'
    if (!description.trim()) e.description = 'Please describe the issue.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSelectedOrder('')
      setReason('')
      setDescription('')
      setPhotos([])
      setRefundMethod('wallet')
      onSuccess()
    }, 900)
  }

  const selectedItem = MOCK_ORDERS.find((o) => o.id === selectedOrder)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── 1. Order / Item Select ─────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">
          Order / Item to Return <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={selectedOrder}
            onChange={(e) => { setSelectedOrder(e.target.value); setErrors((p) => ({ ...p, order: undefined })) }}
            className={`w-full h-11 rounded-xl border px-4 pr-10 text-sm bg-white text-text-primary appearance-none outline-none transition-all cursor-pointer ${
              errors.order
                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:border-brand-orange focus:ring-2 focus:ring-orange-100'
            }`}
          >
            <option value="">Select an order item...</option>
            {MOCK_ORDERS.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary rotate-90 pointer-events-none" />
        </div>
        {errors.order && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.order}</p>}

        {/* Selected item preview */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-border-light flex-shrink-0">
              <img src={selectedItem.image} alt={selectedItem.item} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{selectedItem.item}</p>
              <p className="text-xs text-text-secondary">₦{selectedItem.price.toLocaleString()}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── 2. Return Reason Select ────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">
          Reason for Return <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={reason}
            onChange={(e) => { setReason(e.target.value); setErrors((p) => ({ ...p, reason: undefined })) }}
            className={`w-full h-11 rounded-xl border px-4 pr-10 text-sm bg-white text-text-primary appearance-none outline-none transition-all cursor-pointer ${
              errors.reason
                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:border-brand-orange focus:ring-2 focus:ring-orange-100'
            }`}
          >
            <option value="">Select a reason...</option>
            {RETURN_REASONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary rotate-90 pointer-events-none" />
        </div>
        {errors.reason && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.reason}</p>}
      </div>

      {/* ── 3. Description Textarea ────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">
          Describe the Issue <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: undefined })) }}
          placeholder="Please describe the problem in detail — what happened, when you noticed it, and any other relevant information..."
          rows={4}
          className={`w-full rounded-xl border px-4 py-3 text-sm bg-white text-text-primary placeholder-text-secondary outline-none resize-none transition-all ${
            errors.description
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-border-light focus:border-brand-orange focus:ring-2 focus:ring-orange-100'
          }`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.description
            ? <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>
            : <span />
          }
          <p className="text-xs text-text-secondary ml-auto">{description.length}/500</p>
        </div>
      </div>

      {/* ── 4. Photo Upload ────────────────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">
          Upload Photos <span className="text-text-secondary font-normal">(optional)</span>
        </label>
        <PhotoUpload files={photos} setFiles={setPhotos} />
      </div>

      {/* ── 5. Refund Method RadioGroup ────────────────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Preferred Refund Method <span className="text-red-500">*</span>
        </label>
        <RadioGroup
          value={refundMethod}
          onValueChange={setRefundMethod}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            {
              value: 'wallet',
              label: 'Wallet Credit',
              desc: 'Added to your marketplace wallet instantly',
              icon: '💳',
            },
            {
              value: 'original',
              label: 'Original Payment Method',
              desc: 'Refunded to your card or bank account (3–5 days)',
              icon: '🏦',
            },
          ].map((opt) => (
            <label
              key={opt.value}
              htmlFor={opt.value}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                refundMethod === opt.value
                  ? 'border-brand-orange bg-orange-50'
                  : 'border-border-light bg-white hover:border-orange-200'
              }`}
            >
              <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  <span>{opt.icon}</span>
                  {opt.label}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">{opt.desc}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* ── Submit Button ──────────────────────────────────────────────────── */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto h-12 px-10 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm gap-2 transition-all"
          style={{ boxShadow: submitting ? 'none' : '0 4px 16px rgba(246,139,30,0.3)' }}
        >
          {submitting ? (
            <>
              <RefreshCcw className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Package className="w-4 h-4" />
              Submit Request
            </>
          )}
        </Button>
        <p className="text-xs text-text-secondary mt-3">
          By submitting, you agree to our{' '}
          <Link href="/legal" className="text-brand-orange hover:underline font-medium">
            Returns Policy
          </Link>
          . We&apos;ll review your request within 2–3 business days.
        </p>
      </div>
    </form>
  )
}

// ─── Existing Return Requests ─────────────────────────────────────────────────

function ExistingReturns() {
  return (
    <div className="space-y-4">
      {EXISTING_RETURNS.map((ret, i) => {
        const config = STATUS_CONFIG[ret.status]
        const Icon   = config.icon

        return (
          <motion.div
            key={ret.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-md transition-shadow"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="p-5 flex items-start gap-4 flex-wrap sm:flex-nowrap">

              {/* Product image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-bg-secondary border border-border-light flex-shrink-0">
                <img src={ret.image} alt={ret.item} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-bold text-text-primary line-clamp-1">{ret.item}</p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {ret.orderId} · {ret.date}
                    </p>
                  </div>
                  <Badge variant={config.variant} className="flex-shrink-0">
                    <Icon className="w-3 h-3" />
                    {ret.status}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center gap-4 flex-wrap text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-text-primary">Reason:</span>
                    {ret.reason}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-text-primary">Refund:</span>
                    {ret.refundMethod}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-text-primary">Amount:</span>
                    <span className="text-brand-orange font-semibold">₦{ret.amount.toLocaleString()}</span>
                  </span>
                </div>

                {/* Status-specific message */}
                {ret.status === 'Approved' && (
                  <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Return approved — please ship the item back within 7 days.
                  </p>
                )}
                {ret.status === 'Refunded' && (
                  <p className="mt-2 text-xs text-brand-orange font-medium flex items-center gap-1">
                    <RefreshCcw className="w-3 h-3" />
                    Refund processed successfully.
                  </p>
                )}
                {ret.status === 'Rejected' && (
                  <p className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Request rejected — item did not meet return criteria.
                  </p>
                )}
                {ret.status === 'Pending' && (
                  <p className="mt-2 text-xs text-amber-600 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Under review — we&apos;ll update you within 2–3 business days.
                  </p>
                )}
              </div>
            </div>

            {/* Request ID footer */}
            <div className="px-5 py-2.5 bg-bg-secondary border-t border-border-light flex items-center justify-between">
              <p className="text-xs text-text-secondary font-medium">Request ID: {ret.id}</p>
              <Link href="/help-center"
                className="text-xs text-brand-orange hover:underline font-medium flex items-center gap-1">
                Get help <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReturnsPage() {
  const [showToast, setShowToast] = useState(false)

  const handleSuccess = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-10">

        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/orders" className="hover:text-brand-orange transition">My Orders</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Returns & Refunds</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                My Account
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Returns & Refund Requests
              </h1>
              <p className="text-sm text-text-secondary mt-1.5 max-w-lg">
                Not happy with your order? Submit a return request below and we&apos;ll take care of it.
              </p>
            </div>
            <Link href="/orders">
              <Button variant="outline"
                className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Return Request Form Card ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut', delay: 0.1 }}
          className="bg-white rounded-2xl border border-border-light p-6 md:p-8"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-brand-orange" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
                New Request
              </p>
              <p className="text-base font-bold text-text-primary leading-tight">
                Submit a Return or Refund
              </p>
            </div>
          </div>

          <ReturnRequestForm onSuccess={handleSuccess} />
        </motion.div>

        {/* ── Existing Return Requests ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                History
              </p>
              <h2 className="text-xl font-bold text-text-primary">
                Your Return Requests
                <span className="ml-2 text-sm font-semibold bg-orange-100 text-brand-orange px-2.5 py-0.5 rounded-full">
                  {EXISTING_RETURNS.length}
                </span>
              </h2>
            </div>
          </div>

          <ExistingReturns />
        </motion.div>

        {/* ── Bottom help note ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs text-text-secondary pb-4"
        >
          Need help with a return?{' '}
          <Link href="/help-center" className="text-brand-orange hover:underline font-medium">
            Visit our Help Centre
          </Link>
          {' '}or{' '}
          <Link href="/contact" className="text-brand-orange hover:underline font-medium">
            Contact Support
          </Link>
        </motion.p>

      </main>

      {/* ── Success Toast ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showToast && <SuccessToast onClose={() => setShowToast(false)} />}
      </AnimatePresence>

      <ChatButton />
    </div>
  )
}


