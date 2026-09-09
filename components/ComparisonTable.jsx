'use client'

import { motion } from 'framer-motion'
import { X, Plus, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Function to compare specs and find best value
function getBestValue(products, spec) {
  if (spec === 'Price') {
    const prices = products.map(p => p.price).filter(p => p)
    return prices.length > 0 ? Math.min(...prices) : null
  }
  
  if (spec === 'Rating') {
    const ratings = products.map(p => p.rating).filter(p => p)
    return ratings.length > 0 ? Math.max(...ratings) : null
  }
  
  // For specs like RAM, Battery, etc - compare numeric values at the start
  const specs = products.map(p => p.specs?.[spec] || 'N/A')
  const numericSpecs = specs
    .map(s => {
      const match = String(s).match(/(\d+)/)
      return match ? parseInt(match[1]) : null
    })
    .filter(n => n !== null)
  
  if (numericSpecs.length === 0) return null
  return Math.max(...numericSpecs)
}

function isSpecBest(products, spec, value) {
  const bestValue = getBestValue(products, spec)
  if (!bestValue) return false
  
  if (spec === 'Price') {
    return value === bestValue
  }
  
  if (spec === 'Rating') {
    return value === bestValue
  }
  
  // For string specs with numbers, extract and compare
  const numMatch = String(value).match(/(\d+)/)
  if (numMatch) {
    return parseInt(numMatch[1]) === bestValue
  }
  
  return false
}

export default function ComparisonTable({
  products,
  specs,
  onRemove,
  isLoggedIn,
  onAddProduct,
  canAddMore
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <motion.div
      className="overflow-x-auto max-w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="min-w-full inline-flex gap-4 px-4">
        {/* Product Columns */}
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            variants={itemVariants}
          >
            {/* Product Header */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover bg-bg-secondary"
              />
              <button
                onClick={() => onRemove(product.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition"
                aria-label="Remove product"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <p className="text-xs text-text-secondary uppercase font-semibold letter-spacing mb-1">
                {product.brand}
              </p>
              <h3 className="font-bold text-text-primary mb-3 line-clamp-2">{product.name}</h3>

              {/* Price */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-brand-orange">
                    ₦{(product.price / 1000).toFixed(0)}K
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ₦{(product.originalPrice / 1000).toFixed(0)}K
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-xs text-red-500 font-semibold">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-text-primary">{product.rating}</span>
                  <span className="text-xs text-text-secondary">({product.reviews})</span>
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2 mb-4">
                {specs.map((spec) => (
                  <div
                    key={spec}
                    className={`p-2 rounded text-sm transition ${
                      isSpecBest(products, spec, product.specs[spec] || 'N/A')
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-bg-secondary border border-transparent'
                    }`}
                  >
                    <p className="text-xs text-text-secondary uppercase font-semibold mb-1">{spec}</p>
                    <p className="font-medium text-text-primary">
                      {product.specs?.[spec] || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t">
                <Link href={`/product?id=${product.id}`}>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>

                <Button
                  className={`w-full ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                  size="sm"
                  disabled={!isLoggedIn}
                >
                  {!isLoggedIn && <X className="w-4 h-4 mr-1" />}
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Product Column */}
        {canAddMore && (
          <motion.button
            onClick={onAddProduct}
            className="flex-shrink-0 w-80 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 hover:border-brand-orange hover:bg-orange-50 transition cursor-pointer"
            variants={itemVariants}
          >
            <Plus className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-center">
              <span className="font-semibold text-text-primary block">Add another product</span>
              <span className="text-xs text-text-secondary mt-1">
                {3 - products.length} more allowed
              </span>
            </p>
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
