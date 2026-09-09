import { motion } from 'framer-motion'
import { Heart, Lock, Star, Zap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ProductGridResults({ products, viewMode, isLoggedIn, totalResults }) {
  const [wishlisted, setWishlisted] = useState({})

  const toggleWishlist = (productId) => {
    if (!isLoggedIn) return
    setWishlisted((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  if (totalResults === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-bg-secondary rounded-lg">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-text-primary mb-2">No Products Found</h3>
        <p className="text-text-secondary">Try adjusting your filters to find what you&apos;re looking for</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {products.map((product, index) => (
          <Link key={product.id} href={`/product/${product.id}`} className="no-underline">
            <div
              className="bg-white border border-border-light rounded-lg p-4 flex gap-4 hover:shadow-lg transition cursor-pointer"
            >
            {/* Product Image */}
            <div className="w-24 h-24 bg-bg-secondary rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative">
              {product.image}
              {product.discount > 0 && (
                <div className="absolute top-1 right-1 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">{product.category} • {product.brand}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-brand-orange">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-text-secondary">({product.reviews})</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-brand-orange">
                    ₦{product.price.toLocaleString()}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-sm text-text-secondary line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Badges and Actions */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {product.easyBuyEligible && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    <Zap className="w-3 h-3" />
                    Easy Buy
                  </span>
                )}
                {!product.inStock && (
                  <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                    Out of Stock
                  </span>
                )}

                {/* Actions */}
                <div className="ml-auto flex gap-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlisted[product.id]
                              ? 'fill-red-500 text-red-500'
                              : 'text-text-secondary'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        disabled={!product.inStock}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          product.inStock
                            ? 'bg-brand-orange text-white hover:bg-orange-600'
                            : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-bg-secondary text-text-secondary flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Sign in to buy
                    </button>
                  )}
                </div>
              </div>
            </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Link key={product.id} href={`/product/${product.id}`} className="no-underline">
          <div
            className="bg-white border border-border-light rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer"
          >
          {/* Image Container */}
          <div className="relative bg-bg-secondary aspect-square flex items-center justify-center text-4xl overflow-hidden">
            {product.image}

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{product.discount}%
              </div>
            )}

            {/* Stock Badge */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-3 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-text-primary text-sm line-clamp-2 group-hover:text-brand-orange transition">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-brand-orange">
                {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs text-text-secondary">({product.reviews})</span>
            </div>

            {/* Price */}
            <div>
              <div className="text-lg font-bold text-brand-orange">
                ₦{(product.price / 1000).toFixed(0)}K
              </div>
              {product.originalPrice > product.price && (
                <div className="text-xs text-text-secondary line-through">
                  ₦{(product.originalPrice / 1000).toFixed(0)}K
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="space-y-1">
              {product.easyBuyEligible && (
                <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold w-fit">
                  <Zap className="w-3 h-3" />
                  Easy Buy
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-border-light">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className="w-full p-2 hover:bg-bg-secondary rounded-lg transition flex items-center justify-center"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlisted[product.id]
                          ? 'fill-red-500 text-red-500'
                          : 'text-text-secondary'
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                      product.inStock
                        ? 'bg-brand-orange text-white hover:bg-orange-600'
                        : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2 rounded-lg text-sm font-semibold bg-bg-secondary text-text-secondary flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  <span className="text-xs">Sign in</span>
                </button>
              )}
            </div>
          </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
