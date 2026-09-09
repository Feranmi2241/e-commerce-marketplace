import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

const tabs = ['Trending', 'Flash Deals', 'New Arrivals', 'Easy Buy Deals', 'Top Rated']

const mockProducts = {
  Trending: [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      originalPrice: 1099,
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 245,
      badge: 'Price Drop',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 899,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 349,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 512,
    },
    {
      id: 4,
      name: 'iPad Air',
      price: 599,
      originalPrice: 699,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 156,
    },
  ],
  'Flash Deals': [
    {
      id: 5,
      name: 'Power Bank 20000mAh',
      price: 29,
      originalPrice: 49,
      image: 'https://images.unsplash.com/photo-1591290619009-6f80d90f04c3?w=400&h=400&fit=crop',
      rating: 4.5,
      reviews: 324,
      badge: 'Only 2 left',
      badgeColor: 'bg-orange-100 text-orange-700',
    },
    {
      id: 6,
      name: 'Screen Protector Pack',
      price: 9,
      originalPrice: 19,
      image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop',
      rating: 4.3,
      reviews: 178,
    },
    {
      id: 7,
      name: 'USB-C Cable 3-Pack',
      price: 14,
      originalPrice: 29,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
      rating: 4.4,
      reviews: 421,
    },
    {
      id: 8,
      name: 'Phone Case Silicone',
      price: 12,
      originalPrice: 24,
      image: 'https://images.unsplash.com/photo-1599481238640-4c1288ca4321?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 287,
    },
  ],
  'New Arrivals': [
    {
      id: 9,
      name: 'Google Pixel 8 Pro',
      price: 799,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 89,
      badge: 'NEW',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      id: 10,
      name: 'Laptop Stand Pro',
      price: 79,
      originalPrice: 99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 124,
    },
    {
      id: 11,
      name: 'Mechanical Keyboard RGB',
      price: 159,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 267,
    },
    {
      id: 12,
      name: 'Wireless Mouse Pro',
      price: 49,
      originalPrice: 69,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 198,
    },
  ],
  'Easy Buy Deals': [
    {
      id: 13,
      name: 'Laptop Dell XPS 13',
      price: 1299,
      originalPrice: 1499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 156,
      easyBuy: true,
    },
    {
      id: 14,
      name: 'Canon EOS Camera',
      price: 649,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 234,
      easyBuy: true,
    },
    {
      id: 15,
      name: 'Air Fryer Deluxe',
      price: 199,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 456,
      easyBuy: true,
    },
    {
      id: 16,
      name: 'Microwave Smart',
      price: 329,
      originalPrice: 429,
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 189,
      easyBuy: true,
    },
  ],
  'Top Rated': [
    {
      id: 17,
      name: 'Apple Watch Ultra',
      price: 799,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 678,
    },
    {
      id: 18,
      name: 'AirPods Max',
      price: 549,
      originalPrice: 549,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 543,
    },
    {
      id: 19,
      name: 'MagSafe Charger',
      price: 39,
      originalPrice: 39,
      image: 'https://images.unsplash.com/photo-1609042231185-5a1a0aeb19d5?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 892,
    },
    {
      id: 20,
      name: 'Smart Ring',
      price: 299,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 421,
    },
  ],
}

export default function AnimatedCanvas({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState(0)

  // Auto-cycle tabs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentProducts = mockProducts[tabs[activeTab]]

  return (
    <section className="bg-bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
            Featured
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Discover What's Hot
          </h2>
          <p className="text-text-secondary">
            Auto-cycling through trending, deals, and new arrivals
          </p>
        </div>

        {/* Canvas Container */}
        <div className="bg-white border border-border-light rounded-2xl p-8 mb-8">
          {/* Tab Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 md:justify-center md:pb-0 md:flex-wrap">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all sm:whitespace-nowrap whitespace-normal ${
                  idx === activeTab
                    ? 'bg-brand-orange text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products Grid with Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {currentProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: 'easeOut',
                  }}
                  layout
                >
                  <ProductCard product={product} isLoggedIn={isLoggedIn} showBadge={idx === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Auto-rotate indicator */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            🔄 Tabs auto-rotate every 4 seconds
          </p>
        </div>
      </div>
    </section>
  )
}
