'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HelpHero from '@/components/HelpHero'
import CategoryTiles from '@/components/CategoryTiles'
import FAQList from '@/components/FAQList'
import HelpCTA from '@/components/HelpCTA'

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    { id: 'orders', label: 'Orders', icon: 'Package' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'easy-buy', label: 'Easy Buy', icon: 'Zap' },
    { id: 'delivery', label: 'Delivery', icon: 'Truck' },
    { id: 'returns', label: 'Returns', icon: 'RotateCcw' },
    { id: 'account', label: 'Account', icon: 'User' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={false} />
      
      <HelpHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />

      <CategoryTiles 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FAQList 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      <HelpCTA />
      <Footer />
    </div>
  )
}
