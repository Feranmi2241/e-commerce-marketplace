import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CustomerReviews({ product, reviews }) {
  const ratingBreakdown = [
    { stars: 5, count: 245 },
    { stars: 4, count: 68 },
    { stars: 3, count: 12 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ]

  return (
    <div className="space-y-8">
      <motion.h2
        className="text-2xl font-bold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{ opacity: [1, 0.6, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        Customer Reviews
      </motion.h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-bg-secondary rounded-lg p-6">
        {/* Left: Overall Rating */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div>
              <div className="text-4xl font-bold text-brand-orange">{product.rating}</div>
              <div className="flex gap-1 mt-1">
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
              <p className="text-sm text-text-secondary mt-2">
                Based on {product.reviewCount} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Right: Rating Breakdown */}
        <div className="space-y-3">
          {ratingBreakdown.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-text-primary w-12">
                {stars} ★
              </span>
              <div className="flex-1 bg-white rounded-full h-2">
                <div
                  className="bg-brand-orange h-2 rounded-full"
                  style={{
                    width: `${(count / product.reviewCount) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-text-secondary w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border-light pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <motion.h4
                    className="font-semibold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                  >{review.author}</motion.h4>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{review.date}</span>
                </div>
                <motion.h5
                  className="font-semibold text-text-primary mb-1 transition-colors duration-200 hover:text-brand-orange cursor-default"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
                >{review.title}</motion.h5>
                <motion.p
                  className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
                >{review.content}</motion.p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
