'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  Heart,
  X,
  Star,
  ShoppingBag,
  ArrowRight,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import ChatButton from '@/components/ChatButton'

// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Mock Wishlist Products ───────────────────────────────────────────────────
// Real Nigerian consumer goods with matching Unsplash product images

const INITIAL_WISHLIST = [
  {
    id: 1,
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    price: 485000,
    originalPrice: 620000,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 1342,
    stock: 'In Stock',
    dateAdded: 'Jul 10, 2025',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 1150000,
    originalPrice: 1350000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop',
    rating: 4.9,
    reviews: 3210,
    stock: 'Low Stock',
    dateAdded: 'Jul 14, 2025',
    category: 'Phones',
  },
  {
    id: 3,
    name: 'LG 9kg Front Load Washing Machine',
    price: 320000,
    originalPrice: 395000,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 876,
    stock: 'In Stock',
    dateAdded: 'Jul 15, 2025',
    category: 'Home Appliances',
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    price: 189000,
    originalPrice: 245000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 2109,
    stock: 'In Stock',
    dateAdded: 'Jul 16, 2025',
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'Thermomix TM6 Smart Kitchen Appliance',
    price: 890000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 543,
    stock: 'Out of Stock',
    dateAdded: 'Jul 17, 2025',
    category: 'Kitchen',
  },
  {
    id: 6,
    name: 'MacBook Air M3 13" 16GB 512GB',
    price: 1480000,
    originalPrice: 1650000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    rating: 4.9,
    reviews: 4521,
    stock: 'In Stock',
    dateAdded: 'Jul 18, 2025',
    category: 'Computers',
  },
  {
    id: 7,
    name: 'Dyson V15 Detect Cordless Vacuum',
    price: 420000,
    originalPrice: 510000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 987,
    stock: 'Low Stock',
    dateAdded: 'Jul 19, 2025',
    category: 'Home Appliances',
  },
  {
    id: 8,
    name: 'Nikon Z6 III Mirrorless Camera Body',
    price: 1250000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 312,
    stock: 'In Stock',
    dateAdded: 'Jul 20, 2025',
    category: 'Cameras',
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

// ─── Stock Badge ──────────────────────────────────────────────────────────────

function StockBadge({ stock }) {
  const styles = {
    'In Stock': 'bg-emerald-100 text-emerald-700',
    'Low Stock': 'bg-amber-100 text-amber-700',
    'Out of Stock': 'bg-red-100 text-red-600',
  }
  const dots = {
    'In Stock': 'bg-emerald-500',
    'Low Stock': 'bg-amber-500',
    'Out of Stock': 'bg-red-500',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[stock]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[stock]}`} />
      {stock}
    </span>
  )
}

// ─── Wishlist Card ────────────────────────────────────────────────────────────

function WishlistCard({ product, onRemove, onAddToCart }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const isOutOfStock = product.stock === 'Out of Stock'

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit="exit"
      className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-lg transition-shadow group"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Image area */}
      <div className="relative aspect-square bg-bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        {/* Remove button — always visible, top-right */}
        <button
          onClick={() => onRemove(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-text-secondary hover:text-red-500 hover:shadow-lg transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-white text-red-500 text-xs font-bold px-3 py-1.5 rounded-full shadow border border-red-100">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Category + stock */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <StockBadge stock={product.stock} />
        </div>

        {/* Product name */}
        <h3 className="font-semibold text-text-primary text-sm line-clamp-2 mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-brand-orange text-brand-orange'
                    : 'fill-border-light text-border-light'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-text-primary">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-text-secondary line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart — fully active since user is logged in */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-bg-secondary text-text-secondary cursor-not-allowed'
              : 'bg-brand-orange hover:bg-orange-600 text-white hover:shadow-md'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>

        {/* Date saved */}
        <p className="text-xs text-text-secondary text-center mt-2">
          Saved {product.dateAdded}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Icon with soft glow ring */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-100 blur-xl opacity-70 scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
          <Heart className="w-10 h-10 text-brand-orange" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-text-secondary text-sm max-w-xs leading-relaxed mb-8">
        You haven't saved anything yet. Browse our store and tap the heart icon on any product to save it here.
      </p>

      <Link href="/shop">
        <Button className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl gap-2">
          Start Browsing
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ cartCount }) {
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

          {/* Wishlist icon — active/highlighted since we're on this page */}
          <Link href="/wishlist" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Heart className="w-5 h-5 fill-brand-orange text-brand-orange" />
          </Link>

          <Link href="/cart" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <ShoppingCart className="w-5 h-5 text-text-primary" />
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
  const { addToCart, cartItems } = useCart()
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST)
  const [addedIds, setAddedIds] = useState([])

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id))
  }

  const handleClearAll = () => {
    setWishlist([])
  }

  const handleAddToCart = (product) => {
    if (product.stock === 'Out of Stock') return
    // Add to shared cart context
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    // Show visual feedback
    setAddedIds((prev) => [...prev, product.id])
    // Remove the "added" highlight after 2s
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar cartCount={cartItems.length} />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-start justify-between gap-4 flex-wrap mb-8"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
              My Account
            </p>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              Wishlist
              {wishlist.length > 0 && (
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange"
                >
                  ← Dashboard
                </Button>
              </Link>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* Grid or empty state */}
        {wishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {wishlist.map((product) => (
              <AnimatePresence key={product.id} mode="popLayout">
                <WishlistCard
                  key={product.id}
                  product={product}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                  isAdded={addedIds.includes(product.id)}
                />
              </AnimatePresence>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA when items exist */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-text-secondary text-sm mb-4">
              Want to find more products to save?
            </p>
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-brand-orange text-brand-orange hover:bg-orange-50 font-semibold gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Browsing
              </Button>
            </Link>
          </motion.div>
        )}
      </main>

      <ChatButton />
    </div>
  )
}
