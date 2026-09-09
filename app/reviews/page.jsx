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
  Star,
  Upload,
  X,
  ImageIcon,
  CheckCircle2,
  Pencil,
  ThumbsUp,
  Package,
  Camera,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  lastName: 'Okonkwo',
  initials: 'AO',
}

// ─── Eligible Products (recently purchased, not yet reviewed) ─────────────────

const ELIGIBLE_PRODUCTS = [
  {
    id: 'ep-1',
    orderId: 'ORD-38291',
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    category: 'Electronics',
    price: 485000,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&h=300&fit=crop',
    deliveredDate: 'Jul 14, 2025',
  },
  {
    id: 'ep-2',
    orderId: 'ORD-38291',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    price: 189000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    deliveredDate: 'Jul 14, 2025',
  },
  {
    id: 'ep-3',
    orderId: 'ORD-36201',
    name: 'Hisense 200L Chest Freezer',
    category: 'Home Appliances',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop',
    deliveredDate: 'Jun 28, 2025',
  },
  {
    id: 'ep-4',
    orderId: 'ORD-32910',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    category: 'Kitchen',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',
    deliveredDate: 'Jun 5, 2025',
  },
]

// ─── Already Submitted Reviews ────────────────────────────────────────────────

const INITIAL_SUBMITTED = [
  {
    id: 'rev-1',
    productId: 'sub-1',
    orderId: 'ORD-36850',
    name: 'LG 24" IPS Full HD Monitor',
    category: 'Electronics',
    price: 33000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    rating: 5,
    title: 'Absolutely brilliant display!',
    body: 'The colours are vivid and the screen is super sharp. Setup was easy and it fits perfectly on my desk. Very happy with this purchase — would definitely recommend to anyone looking for a budget-friendly monitor.',
    date: 'Jul 20, 2025',
    helpful: 12,
    photos: [],
  },
  {
    id: 'rev-2',
    productId: 'sub-2',
    orderId: 'ORD-32910',
    name: 'Philips Air Fryer HD9252',
    category: 'Kitchen',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1648146956409-a5e7e5e5e5e5?w=400&h=300&fit=crop&auto=format',
    rating: 4,
    title: 'Great air fryer, easy to clean',
    body: 'Cooks food evenly and quickly. The basket is non-stick and very easy to clean. Only minor issue is it is a bit loud, but overall a solid product for the price.',
    date: 'Jun 15, 2025',
    helpful: 7,
    photos: [],
  },
  {
    id: 'rev-3',
    productId: 'sub-3',
    orderId: 'ORD-29441',
    name: 'Anker PowerCore 20000mAh Power Bank',
    category: 'Accessories',
    price: 28500,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    rating: 5,
    title: 'Best power bank I have ever owned',
    body: 'Charges my phone multiple times on a single charge. The fast charging feature is a game changer. Build quality feels premium and it is very compact for 20,000mAh. Highly recommend!',
    date: 'May 30, 2025',
    helpful: 21,
    photos: [],
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.42, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' } },
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
              { label: 'Shop',       href: '/search' },
              { label: 'Categories', href: '#' },
              { label: 'Deals',      href: '#' },
              { label: 'Easy Buy',   href: '/easy-buy' },
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

// ─── Star Rating Selector ─────────────────────────────────────────────────────

const STAR_LABELS = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent']

function StarRating({ value, onChange, size = 'md', readOnly = false }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value

  const sizeClass = size === 'lg' ? 'w-9 h-9' : size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
  const gapClass  = size === 'lg' ? 'gap-1.5' : 'gap-1'

  return (
    <div className="space-y-1.5">
      <div className={`flex items-center ${gapClass}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={`transition-transform duration-100 ${!readOnly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              className={`${sizeClass} transition-colors duration-150 ${
                star <= active
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {!readOnly && size === 'lg' && (
        <p className="text-xs font-semibold text-text-secondary h-4 transition-all">
          {active > 0 ? STAR_LABELS[active] : 'Tap a star to rate'}
        </p>
      )}
    </div>
  )
}

// ─── Star Display (read-only, compact) ───────────────────────────────────────

function StarDisplay({ rating, showCount = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-gray-300'}`}
        />
      ))}
      {showCount && (
        <span className="text-xs text-text-secondary ml-1 font-medium">{rating}.0</span>
      )}
    </div>
  )
}

// ─── Photo Upload ─────────────────────────────────────────────────────────────

function PhotoUpload({ files, setFiles }) {
  const inputRef   = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = useCallback((incoming) => {
    const imgs = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    const withPreviews = imgs.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name,
    }))
    setFiles((prev) => [...prev, ...withPreviews].slice(0, 4))
  }, [setFiles])

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const remove = (i) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[i].preview)
      return prev.filter((_, idx) => idx !== i)
    })
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-brand-orange bg-orange-50 scale-[1.01]'
            : 'border-border-light bg-bg-secondary hover:border-orange-300 hover:bg-orange-50/40'
        }`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          dragging ? 'bg-orange-100' : 'bg-white border border-border-light'
        }`}>
          <Camera className={`w-5 h-5 ${dragging ? 'text-brand-orange' : 'text-text-secondary'}`} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary">
            {dragging ? 'Drop photos here' : 'Add review photos'}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            or <span className="text-brand-orange font-medium">click to browse</span> · max 4 photos
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

      {files.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          {files.map((f, i) => (
            <div key={i} className="relative group">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-border-light bg-bg-secondary">
                <img src={f.preview} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
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
              className="w-16 h-16 rounded-xl border-2 border-dashed border-border-light bg-bg-secondary flex flex-col items-center justify-center gap-1 hover:border-orange-300 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-text-secondary" />
              <span className="text-[10px] text-text-secondary font-medium">Add</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Write / Edit Review Dialog ───────────────────────────────────────────────

function WriteReviewDialog({ product, existingReview, onSubmit, onClose }) {
  const isEdit = Boolean(existingReview)

  const [rating,  setRating]  = useState(existingReview?.rating  ?? 0)
  const [title,   setTitle]   = useState(existingReview?.title   ?? '')
  const [body,    setBody]    = useState(existingReview?.body    ?? '')
  const [photos,  setPhotos]  = useState(existingReview?.photos  ?? [])
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const validate = () => {
    const e = {}
    if (!rating)        e.rating = 'Please select a star rating.'
    if (!body.trim())   e.body   = 'Please write your review.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      onSubmit({ rating, title, body, photos })
      setTimeout(onClose, 1200)
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-2xl border border-border-light w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.14)' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border-light px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
              {isEdit ? 'Edit Review' : 'Write a Review'}
            </p>
            <p className="text-base font-bold text-text-primary leading-tight mt-0.5 line-clamp-1">
              {product.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-bg-secondary flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Product mini-card */}
        <div className="px-6 pt-5">
          <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl mb-5">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-border-light flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-text-primary truncate">{product.name}</p>
              <p className="text-xs text-text-secondary">{product.orderId} · ₦{product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Success state */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 pb-8 flex flex-col items-center justify-center gap-3 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-lg font-bold text-text-primary">
                {isEdit ? 'Review updated!' : 'Review submitted!'}
              </p>
              <p className="text-sm text-text-secondary">Thank you for your feedback, {CUSTOMER.firstName}.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {!done && (
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">

            {/* Star rating */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <StarRating value={rating} onChange={(v) => { setRating(v); setErrors((p) => ({ ...p, rating: undefined })) }} size="lg" />
              {errors.rating && (
                <p className="text-xs text-red-500 mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Review title */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Review Title <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarise your experience..."
                maxLength={80}
                className="w-full h-11 rounded-xl border border-border-light px-4 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Review body */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => { setBody(e.target.value); setErrors((p) => ({ ...p, body: undefined })) }}
                placeholder="What did you like or dislike? How was the quality, delivery, and overall experience?"
                rows={4}
                maxLength={1000}
                className={`w-full rounded-xl border px-4 py-3 text-sm text-text-primary placeholder-text-secondary outline-none resize-none transition-all ${
                  errors.body
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-border-light focus:border-brand-orange focus:ring-2 focus:ring-orange-100'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.body
                  ? <p className="text-xs text-red-500">{errors.body}</p>
                  : <span />
                }
                <p className="text-xs text-text-secondary ml-auto">{body.length}/1000</p>
              </div>
            </div>

            {/* Photo upload */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Add Photos <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <PhotoUpload files={photos} setFiles={setPhotos} />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm gap-2 transition-all"
              style={{ boxShadow: loading ? 'none' : '0 4px 16px rgba(246,139,30,0.3)' }}
            >
              {loading ? (
                <>
                  <Upload className="w-4 h-4 animate-bounce" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {isEdit ? 'Update Review' : 'Submit Review'}
                </>
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

// ─── Eligible Product Card ────────────────────────────────────────────────────

function EligibleProductCard({ product, onWriteReview }) {
  return (
    <motion.div
      variants={cardVariant}
      className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-md transition-shadow group"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Product image */}
      <div className="relative h-44 overflow-hidden bg-bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wide">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-bold text-text-primary line-clamp-2 leading-snug">{product.name}</p>
          <p className="text-xs text-text-secondary mt-1">{product.orderId} · Delivered {product.deliveredDate}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-brand-orange">₦{product.price.toLocaleString()}</p>
          {/* Placeholder stars to show "not yet rated" */}
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-transparent text-gray-200" />
            ))}
          </div>
        </div>

        <Button
          onClick={() => onWriteReview(product)}
          className="w-full h-10 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl text-sm gap-2 transition-all"
          style={{ boxShadow: '0 3px 12px rgba(246,139,30,0.25)' }}
        >
          <Star className="w-4 h-4" />
          Write a Review
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Submitted Review Card ────────────────────────────────────────────────────

function SubmittedReviewCard({ review, onEdit }) {
  return (
    <motion.div
      variants={cardVariant}
      className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-md transition-shadow"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="p-5 flex gap-4 flex-wrap sm:flex-nowrap">

        {/* Product image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
          <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">

          {/* Top row: product name + edit button */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary line-clamp-1">{review.name}</p>
              <p className="text-xs text-text-secondary">{review.orderId}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => onEdit(review)}
              className="flex-shrink-0 h-8 px-3 text-xs border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-1.5 rounded-lg"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          </div>

          {/* Stars + date */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarDisplay rating={review.rating} showCount />
            <span className="text-xs text-text-secondary">{review.date}</span>
            <Badge variant="success" className="text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              Published
            </Badge>
          </div>

          {/* Review title */}
          {review.title && (
            <p className="text-sm font-semibold text-text-primary">{review.title}</p>
          )}

          {/* Review body */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{review.body}</p>

          {/* Helpful count */}
          <div className="flex items-center gap-1.5 pt-1">
            <ThumbsUp className="w-3.5 h-3.5 text-text-secondary" />
            <p className="text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">{review.helpful}</span> people found this helpful
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [submitted,    setSubmitted]    = useState(INITIAL_SUBMITTED)
  const [eligible,     setEligible]     = useState(ELIGIBLE_PRODUCTS)
  const [dialogTarget, setDialogTarget] = useState(null)   // { product, existingReview? }

  const openWrite = (product) => {
    setDialogTarget({ product, existingReview: null })
  }

  const openEdit = (review) => {
    setDialogTarget({
      product: {
        id:       review.productId,
        orderId:  review.orderId,
        name:     review.name,
        image:    review.image,
        price:    review.price,
        category: review.category,
      },
      existingReview: review,
    })
  }

  const handleSubmit = ({ rating, title, body, photos }) => {
    if (dialogTarget.existingReview) {
      // Edit existing
      setSubmitted((prev) =>
        prev.map((r) =>
          r.id === dialogTarget.existingReview.id
            ? { ...r, rating, title, body, photos, date: 'Just now' }
            : r
        )
      )
    } else {
      // New review — move product from eligible to submitted
      const product = dialogTarget.product
      const newReview = {
        id:        `rev-${Date.now()}`,
        productId: product.id,
        orderId:   product.orderId,
        name:      product.name,
        category:  product.category,
        price:     product.price,
        image:     product.image,
        rating,
        title,
        body,
        date:    'Just now',
        helpful: 0,
        photos,
      }
      setSubmitted((prev) => [newReview, ...prev])
      setEligible((prev) => prev.filter((p) => p.id !== product.id))
    }
  }

  const closeDialog = () => setDialogTarget(null)

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-12">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/dashboard" className="hover:text-brand-orange transition">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/orders" className="hover:text-brand-orange transition">My Orders</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Reviews & Ratings</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                My Account
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Reviews & Ratings
              </h1>
              <p className="text-sm text-text-secondary mt-1.5 max-w-lg">
                Share your experience with products you&apos;ve purchased. Your reviews help other shoppers make better decisions.
              </p>
            </div>

            {/* Summary pill */}
            <div className="flex items-center gap-3 bg-white border border-border-light rounded-2xl px-5 py-3"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="text-center">
                <p className="text-xl font-bold text-brand-orange">{submitted.length}</p>
                <p className="text-xs text-text-secondary font-medium">Reviews</p>
              </div>
              <div className="w-px h-8 bg-border-light" />
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">{eligible.length}</p>
                <p className="text-xs text-text-secondary font-medium">Pending</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Section 1: Eligible Products ────────────────────────────────── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Awaiting Your Feedback
              </p>
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                Products to Review
                {eligible.length > 0 && (
                  <span className="text-sm font-semibold bg-orange-100 text-brand-orange px-2.5 py-0.5 rounded-full">
                    {eligible.length}
                  </span>
                )}
              </h2>
            </div>
          </motion.div>

          {eligible.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-border-light p-10 flex flex-col items-center justify-center gap-3 text-center"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-brand-orange" />
              </div>
              <p className="text-base font-bold text-text-primary">All caught up!</p>
              <p className="text-sm text-text-secondary max-w-xs">
                You&apos;ve reviewed all your recent purchases. Keep shopping to leave more reviews.
              </p>
              <Link href="/search">
                <Button className="mt-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl text-sm gap-2"
                  style={{ boxShadow: '0 3px 12px rgba(246,139,30,0.25)' }}>
                  <Package className="w-4 h-4" />
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {eligible.map((product) => (
                <EligibleProductCard
                  key={product.id}
                  product={product}
                  onWriteReview={openWrite}
                />
              ))}
            </motion.div>
          )}
        </section>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="border-t border-border-light" />

        {/* ── Section 2: Submitted Reviews ────────────────────────────────── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Your Contributions
              </p>
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                Reviews You&apos;ve Written
                {submitted.length > 0 && (
                  <span className="text-sm font-semibold bg-orange-100 text-brand-orange px-2.5 py-0.5 rounded-full">
                    {submitted.length}
                  </span>
                )}
              </h2>
            </div>
          </motion.div>

          {submitted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-border-light p-10 flex flex-col items-center justify-center gap-3 text-center"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center">
                <Star className="w-7 h-7 text-text-secondary" />
              </div>
              <p className="text-base font-bold text-text-primary">No reviews yet</p>
              <p className="text-sm text-text-secondary max-w-xs">
                Start by reviewing one of your recent purchases above.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {submitted.map((review) => (
                <SubmittedReviewCard
                  key={review.id}
                  review={review}
                  onEdit={openEdit}
                />
              ))}
            </motion.div>
          )}
        </section>

        {/* ── Bottom help note ─────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs text-text-secondary pb-4"
        >
          Reviews are subject to our{' '}
          <Link href="/legal" className="text-brand-orange hover:underline font-medium">
            Community Guidelines
          </Link>
          . Need help?{' '}
          <Link href="/help-center" className="text-brand-orange hover:underline font-medium">
            Visit our Help Centre
          </Link>
        </motion.p>

      </main>

      {/* ── Write / Edit Review Dialog ──────────────────────────────────── */}
      <AnimatePresence>
        {dialogTarget && (
          <WriteReviewDialog
            product={dialogTarget.product}
            existingReview={dialogTarget.existingReview}
            onSubmit={handleSubmit}
            onClose={closeDialog}
          />
        )}
      </AnimatePresence>

      <ChatButton />
    </div>
  )
}
