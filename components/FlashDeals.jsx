import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import ProductCard from './ProductCard'
import { motion } from 'framer-motion'

const flashDealsProducts = [
  {
    id: 101,
    name: 'Wireless Earbuds Pro',
    price: 49,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 102,
    name: 'Portable Charger 30W',
    price: 35,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1591290619009-6f80d90f04c3?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 412,
  },
  {
    id: 103,
    name: 'USB-C Hub 7-in-1',
    price: 39,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 567,
  },
  {
    id: 104,
    name: 'Phone Ring Stand',
    price: 8,
    originalPrice: 19,
    image: 'https://images.unsplash.com/photo-1599481238640-4c1288ca4321?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 289,
  },
]

function CountdownTimer({ targetTime }) {
  const [time, setTime] = useState({
    hours: 3,
    minutes: 45,
    seconds: 22,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 3
              minutes = 45
              seconds = 22
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-2 items-center bg-red-100 px-3 py-2 rounded-lg">
      <Zap className="w-4 h-4 text-red-600" />
      <span className="text-xs font-bold text-red-600">
        {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </span>
    </div>
  )
}

export default function FlashDeals({ isLoggedIn }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
              Limited time
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary flex items-center gap-3">
              <Zap className="w-8 h-8 text-brand-orange" />
              Flash Deals
            </h2>
          </div>
          <div>
            <CountdownTimer targetTime="2024-01-20T18:00:00" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDealsProducts.map((product, idx) => (
            <div key={product.id}>
              <ProductCard product={product} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
