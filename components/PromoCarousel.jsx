import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const promotions = [
  {
    id: 1,
    text: '🎉 Summer Mega Sale - Up to 70% OFF on selected items!',
    bg: 'from-orange-100 to-amber-100',
  },
  {
    id: 2,
    text: '📦 Free shipping on orders over $50 - Use code FREESHIP',
    bg: 'from-blue-100 to-cyan-100',
  },
  {
    id: 3,
    text: '🏆 New Arrivals - Latest smartphones & gadgets in stock',
    bg: 'from-purple-100 to-pink-100',
  },
  {
    id: 4,
    text: '💳 Easy Buy - Pay in 3 installments, 0% interest',
    bg: 'from-green-100 to-emerald-100',
  },
]

export default function PromoCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % promotions.length)
  const prev = () => setCurrent((prev) => (prev - 1 + promotions.length) % promotions.length)

  return (
    <div className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-1.5 hover:bg-white rounded-full transition hidden sm:block"
          >
            <ChevronLeft className="w-4 h-4 text-text-primary" />
          </button>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-center h-12">
              {promotions.map((promo, idx) => (
                <div
                  key={promo.id}
                  className={`absolute transition-all duration-500 ${
                    idx === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div
                    className={`bg-gradient-to-r ${promo.bg} px-6 py-3 rounded-lg text-center text-sm font-medium text-text-primary whitespace-normal sm:whitespace-nowrap`}
                  >
                    {promo.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={next}
            className="p-1.5 hover:bg-white rounded-full transition hidden sm:block"
          >
            <ChevronRight className="w-4 h-4 text-text-primary" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 md:hidden">
            {promotions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 rounded-full transition ${
                  idx === current ? 'bg-brand-orange' : 'bg-border-light'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
