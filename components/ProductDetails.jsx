'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Lock, MessageCircle, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductDetails({
  product,
  isLoggedIn,
  selectedVariants,
  onVariantChange,
  quantity,
  onQuantityChange,
  selectedEasyBuyTerm,
  onEasyBuyTermChange,
}) {
  const [wishlist, setWishlist] = useState(false)

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  )

  const stockStatus = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'
  const stockColor = product.stock > 5 ? 'text-green-600' : 'text-red-600'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.p
          className="text-sm text-brand-orange font-semibold uppercase tracking-wide mb-2 transition-colors duration-200 hover:text-orange-600 cursor-default"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          {product.brand}
        </motion.p>
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 transition-colors duration-200 hover:text-brand-orange cursor-default"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
        >{product.name}</motion.h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <motion.span
            className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
          >
            {product.rating} ({product.reviewCount} reviews)
          </motion.span>
        </div>

        {/* Stock Status */}
        <p className={`text-sm font-semibold ${stockColor}`}>{stockStatus}</p>
      </div>

      {/* Pricing */}
      <div className="bg-bg-secondary rounded-lg p-4">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-brand-orange">
            ₦{discountedPrice.toLocaleString()}
          </span>
          <span className="text-lg text-text-secondary line-through">
            ₦{product.originalPrice.toLocaleString()}
          </span>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
            -{product.discountPercentage}%
          </span>
        </div>
      </div>

      {/* Variants */}
      {product.variants.map((variant) => (
        <div key={variant.type}>
          <motion.label
            className="text-sm font-semibold text-text-primary mb-3 block uppercase tracking-wide transition-colors duration-200 hover:text-brand-orange cursor-default"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            {variant.type}
          </motion.label>
          <div className="flex gap-3 flex-wrap">
            {variant.options.map((option) => (
              <button
                key={option}
                onClick={() =>
                  onVariantChange({ ...selectedVariants, [variant.type]: option })
                }
                className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                  selectedVariants[variant.type] === option
                    ? 'border-brand-orange bg-orange-50 text-brand-orange'
                    : 'border-border-light text-text-primary hover:border-brand-orange'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div>
        <motion.label
          className="text-sm font-semibold text-text-primary mb-3 block uppercase tracking-wide transition-colors duration-200 hover:text-brand-orange cursor-default"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
        >
          Quantity
        </motion.label>
        <div className="flex items-center gap-3 bg-bg-secondary rounded-lg p-2 w-fit">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-white rounded transition"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="px-4 font-semibold text-text-primary">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-1 hover:bg-white rounded transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Easy Buy Panel */}
      {product.easyBuyEligible && (
        <div className="bg-orange-50 border-2 border-brand-orange rounded-lg p-4">
          <h3 className="font-bold text-brand-orange mb-3 flex items-center gap-2">
            💳 Flexible Payment with Easy Buy
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Down payment: <span className="font-bold text-text-primary">₦{product.easyBuyDownPayment.toLocaleString()}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {product.easyBuyTerms.map((term) => (
              <button
                key={term.months}
                onClick={() => onEasyBuyTermChange(term.months)}
                className={`py-2 px-2 rounded-lg border-2 text-sm font-semibold transition-all text-center ${
                  selectedEasyBuyTerm === term.months
                    ? 'border-brand-orange bg-brand-orange text-white'
                    : 'border-border-light text-text-primary hover:border-brand-orange'
                }`}
              >
                <div>{term.months}mo</div>
                <div className="text-xs">₦{term.monthlyPayment.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {isLoggedIn ? (
          <>
            <div className="flex gap-3">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  wishlist
                    ? 'border-red-500 bg-red-50'
                    : 'border-border-light hover:border-brand-orange'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${wishlist ? 'fill-red-500 text-red-500' : 'text-text-secondary'}`}
                />
              </button>
              <Button className="flex-1" variant="outline">
                Add to Cart
              </Button>
            </div>
            <Button className="w-full bg-brand-orange hover:bg-orange-600 text-white">
              Buy Now
            </Button>
            {product.easyBuyEligible && (
              <Button
                className="w-full"
                variant={selectedEasyBuyTerm ? 'default' : 'outline'}
                disabled={!selectedEasyBuyTerm}
              >
                Apply for Easy Buy
              </Button>
            )}
            <Link href={`/chat?product=${product.id}`}>
              <button className="w-full py-3 rounded-lg border-2 border-brand-orange text-brand-orange hover:bg-orange-50 font-semibold flex items-center justify-center gap-2 transition-all">
                <MessageCircle className="w-5 h-5" />
                Chat with AI about this product
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="space-y-2 bg-gray-100 rounded-lg p-4 text-center">
              <Lock className="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-text-secondary">Sign in to unlock these actions</p>
            </div>
            <Button className="w-full bg-brand-orange hover:bg-orange-600 text-white">
              Sign In to Continue
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
