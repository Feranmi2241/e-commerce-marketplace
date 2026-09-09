import { Heart, Lock, Star, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductCard({ product, isLoggedIn, showBadge }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showGlow, setShowGlow] = useState(false)

  // Show glow pulse on first card with badge
  useEffect(() => {
    if (showBadge && product.badge) {
      setShowGlow(true)
      const timer = setTimeout(() => setShowGlow(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showBadge, product.badge])

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/product/${product.id}`} className="no-underline">
      <motion.div
        className={`bg-white rounded-lg border border-border-light overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
          showGlow ? 'ring-2 ring-offset-2 ring-brand-orange ring-offset-white' : ''
        }`}
        style={{
          boxShadow: showGlow ? '0 0 20px rgba(246, 139, 30, 0.3)' : '0 2px 12px rgba(0, 0, 0, 0.06)',
        }}
      >
      {/* Image Container */}
      <div className="relative bg-bg-secondary aspect-square overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        {product.badge && (
          <motion.div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${product.badgeColor}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {product.badge === 'Price Drop' && <TrendingDown className="w-3 h-3 inline mr-1" />}
            {product.badge}
          </motion.div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white px-2 py-1 rounded-md text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-3 left-12 opacity-0 group-hover:opacity-100 transition-opacity">
          {isLoggedIn ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
              className={`p-2 rounded-full transition ${
                isFavorite ? 'bg-brand-orange text-white' : 'bg-white text-text-primary hover:bg-brand-orange hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          ) : (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-white/70 text-text-secondary cursor-not-allowed opacity-50"
            >
              <Heart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-text-primary text-sm line-clamp-2 mb-2 hover:text-brand-orange transition">
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
          <span className="text-xs text-text-secondary">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-text-secondary line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* CTA Button */}
        {isLoggedIn ? (
          <button 
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
        ) : (
          <button 
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-gray-200 text-gray-400 font-medium py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            <span>Sign in to buy</span>
          </button>
        )}
      </div>
      </motion.div>
    </Link>
  )
}
