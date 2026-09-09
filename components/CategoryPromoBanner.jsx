import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function CategoryPromoBanner({ categoryName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12 mb-8"
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-orange via-brand-amber to-brand-orange p-8 md:p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-white" />
              <span className="text-sm font-bold text-white/90 uppercase tracking-wide">
                Limited Time Offer
              </span>
            </div>
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-white mb-2 transition-colors duration-200 hover:text-white/80 cursor-default"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            >
              Save up to 40% on {categoryName}
            </motion.h3>
            <motion.p
              className="text-white/90 text-lg transition-colors duration-200 hover:text-white"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
            >
              Exclusive deals on top-rated products. Free delivery on orders over ₦50,000.
            </motion.p>
          </div>

          <div className="flex-shrink-0">
            <button className="px-8 py-4 bg-white text-brand-orange font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl sm:whitespace-nowrap whitespace-normal">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
