'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Laptop, Tv, Headphones, Cable, Home } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatButton from '@/components/ChatButton'
import ProductCard from '@/components/ProductCard'
import CategoryHero from '@/components/CategoryHero'
import SubcategoryGrid from '@/components/SubcategoryGrid'
import BestOfCarousel from '@/components/BestOfCarousel'
import CategoryPromoBanner from '@/components/CategoryPromoBanner'

const ELECTRONICS_SUBCATEGORIES = [
  { id: 1, name: 'Phones & Tablets', icon: Smartphone },
  { id: 2, name: 'Laptops', icon: Laptop },
  { id: 3, name: 'TVs & Displays', icon: Tv },
  { id: 4, name: 'Audio & Headphones', icon: Headphones },
  { id: 5, name: 'Cables & Accessories', icon: Cable },
  { id: 6, name: 'Smart Home', icon: Home },
]

const MOCK_PRODUCTS = Array.from({ length: 24 }, (_, i) => {
  const id = i + 1
  const price = 45000 + (id * 32000)
  const originalPrice = 65000 + (id * 28000)
  const discount = 12 + ((id * 7) % 25)
  const rating = (3 + ((id % 5) * 0.4) + ((id % 3) * 0.2)).toFixed(1)
  const reviews = 50 + (id * 23)

  return {
    id,
    name: `Premium Electronic ${id}`,
    price,
    originalPrice,
    discount,
    image: `https://via.placeholder.com/300x300?text=Product+${id}`,
    rating,
    reviews,
    inStock: id % 5 !== 0,
    easyBuyEligible: id % 3 !== 0,
  }
})

export default function CategoryPage({ searchParams }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const categoryName = searchParams?.category || 'Electronics'

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />

      {/* Hero Banner */}
      <CategoryHero categoryName={categoryName} />

      {/* Subcategory Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-8">
          Browse by Category
        </h2>
        <SubcategoryGrid subcategories={ELECTRONICS_SUBCATEGORIES} />
      </section>

      {/* Best of Category Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-8">
          Best of {categoryName}
        </h2>
        <BestOfCarousel products={MOCK_PRODUCTS.slice(0, 8)} isLoggedIn={isLoggedIn} />
      </section>

      {/* Category Promo Banner */}
      <CategoryPromoBanner categoryName={categoryName} />

      {/* Main Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-2xl font-bold text-text-primary mb-12">All {categoryName} Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>
      </section>

      {isLoggedIn && <ChatButton />}
      <Footer />
    </div>
  )
}
