'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Laptop, Tv, Refrigerator, Wind, Waves, Zap, Microwave } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasyBuyCanvas({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState(0)

  const categories = [
    {
      id: 'phones',
      icon: Smartphone,
      label: 'Phones',
      color: 'from-blue-500 to-blue-600',
      products: [
        { id: 1, name: 'iPhone 15 Pro', price: '₦850,000', rating: 4.8 },
        { id: 2, name: 'Samsung S24', price: '₦750,000', rating: 4.7 },
        { id: 3, name: 'Google Pixel 8', price: '₦650,000', rating: 4.6 },
      ],
    },
    {
      id: 'laptops',
      icon: Laptop,
      label: 'Laptops',
      color: 'from-purple-500 to-purple-600',
      products: [
        { id: 4, name: 'MacBook Pro 16"', price: '₦2,500,000', rating: 4.9 },
        { id: 5, name: 'Dell XPS 15', price: '₦1,800,000', rating: 4.7 },
        { id: 6, name: 'HP Spectre', price: '₦1,500,000', rating: 4.6 },
      ],
    },
    {
      id: 'tvs',
      icon: Tv,
      label: 'TVs',
      color: 'from-indigo-500 to-indigo-600',
      products: [
        { id: 7, name: '65" OLED TV', price: '₦1,200,000', rating: 4.8 },
        { id: 8, name: '55" 4K Smart TV', price: '₦750,000', rating: 4.7 },
        { id: 9, name: '43" Full HD TV', price: '₦450,000', rating: 4.5 },
      ],
    },
    {
      id: 'fridges',
      icon: Refrigerator,
      label: 'Fridges',
      color: 'from-cyan-500 to-cyan-600',
      products: [
        { id: 10, name: 'Double Door Fridge', price: '₦850,000', rating: 4.7 },
        { id: 11, name: 'Side-by-Side Fridge', price: '₦1,200,000', rating: 4.8 },
        { id: 12, name: 'Single Door Fridge', price: '₦450,000', rating: 4.5 },
      ],
    },
    {
      id: 'ac',
      icon: Wind,
      label: 'Air Conditioners',
      color: 'from-sky-500 to-sky-600',
      products: [
        { id: 13, name: '2HP Split AC', price: '₦650,000', rating: 4.6 },
        { id: 14, name: '1.5HP Split AC', price: '₦480,000', rating: 4.5 },
        { id: 15, name: '3HP Split AC', price: '₦950,000', rating: 4.7 },
      ],
    },
    {
      id: 'washers',
      icon: Waves,
      label: 'Washing Machines',
      color: 'from-teal-500 to-teal-600',
      products: [
        { id: 16, name: 'Front Load Washer', price: '₦550,000', rating: 4.6 },
        { id: 17, name: 'Top Load Washer', price: '₦380,000', rating: 4.5 },
        { id: 18, name: 'Semi-Auto Washer', price: '₦280,000', rating: 4.3 },
      ],
    },
    {
      id: 'generators',
      icon: Zap,
      label: 'Generators',
      color: 'from-amber-500 to-amber-600',
      products: [
        { id: 19, name: '5.5KVA Generator', price: '₦850,000', rating: 4.7 },
        { id: 20, name: '3.5KVA Generator', price: '₦550,000', rating: 4.6 },
        { id: 21, name: '7.5KVA Generator', price: '₦1,200,000', rating: 4.8 },
      ],
    },
    {
      id: 'cookers',
      icon: Microwave,
      label: 'Electric Cookers',
      color: 'from-orange-500 to-orange-600',
      products: [
        { id: 22, name: 'Electric Cooker 4-Plate', price: '₦350,000', rating: 4.5 },
        { id: 23, name: 'Electric Oven', price: '₦480,000', rating: 4.6 },
        { id: 24, name: 'Induction Cooker', price: '₦280,000', rating: 4.4 },
      ],
    },
  ]

  // Auto-advance tab every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % categories.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [categories.length])

  const currentCategory = categories[activeTab]
  const CurrentIcon = currentCategory.icon

  return (
    <div className="space-y-8">
      {/* Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-border-light overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            {currentCategory.products.map((product, idx) => (
              <motion.div
                key={`${activeTab}-${product.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                layout
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${currentCategory.color} rounded-xl p-6 text-white h-full flex flex-col justify-between hover:shadow-lg transition-shadow`}>
                  <div>
                    <p className="text-sm opacity-90 mb-2">Easy Buy Available</p>
                    <h4 className="text-lg font-bold">{product.name}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold">{product.price}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      <span className="text-sm">{product.rating} rating</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, idx) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === idx
                  ? `bg-brand-orange text-white shadow-md`
                  : 'bg-white text-text-primary border border-border-light hover:border-brand-orange'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
