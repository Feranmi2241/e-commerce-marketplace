'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import ChatButton from '@/components/ChatButton'
import Footer from '@/components/Footer'
import ComparisonTable from '@/components/ComparisonTable'
import AddProductDialog from '@/components/AddProductDialog'

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    price: 1299000,
    originalPrice: 1599000,
    image: 'https://via.placeholder.com/300x400?text=Samsung+S24',
    rating: 4.8,
    reviews: 324,
    specs: {
      'Display': '6.2" Dynamic AMOLED',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '512GB',
      'Camera': '50MP Main',
      'Battery': '4000mAh',
      'Fast Charging': '25W',
      'Water Resistance': 'IP68',
    }
  },
  {
    id: 2,
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    price: 1499000,
    originalPrice: 1799000,
    image: 'https://via.placeholder.com/300x400?text=iPhone+16+Pro',
    rating: 4.9,
    reviews: 412,
    specs: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A18 Pro',
      'RAM': '8GB',
      'Storage': '512GB',
      'Camera': '48MP Main',
      'Battery': '3582mAh',
      'Fast Charging': '45W',
      'Water Resistance': 'IP69',
    }
  },
  {
    id: 3,
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    price: 1199000,
    originalPrice: 1499000,
    image: 'https://via.placeholder.com/300x400?text=Pixel+9+Pro',
    rating: 4.7,
    reviews: 289,
    specs: {
      'Display': '6.3" LTPO OLED',
      'Processor': 'Tensor G4',
      'RAM': '16GB',
      'Storage': '512GB',
      'Camera': '42MP Main',
      'Battery': '5050mAh',
      'Fast Charging': '37W',
      'Water Resistance': 'IP68',
    }
  }
]

const COMPARISON_SPECS = [
  'Display',
  'Processor',
  'RAM',
  'Storage',
  'Camera',
  'Battery',
  'Fast Charging',
  'Water Resistance'
]

export default function ComparePage({ isLoggedIn = true }) {
  const [selectedProducts, setSelectedProducts] = useState([MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProduct = (product) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product])
      setIsDialogOpen(false)
    }
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="bg-white overflow-x-hidden">
        {/* Banner */}
        <motion.section
          className="py-8 bg-bg-secondary border-b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Compare Products</h1>
            <p className="text-text-secondary mb-4">
              Compare up to 3 products side-by-side to find the perfect match for your needs
            </p>
            <p className="text-sm text-text-secondary flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-brand-orange rounded-full"></span>
              Currently comparing <strong className="text-text-primary">{selectedProducts.length}</strong> of 3 products
            </p>
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-full px-4">
            <ComparisonTable
              products={selectedProducts}
              specs={COMPARISON_SPECS}
              onRemove={handleRemoveProduct}
              isLoggedIn={isLoggedIn}
              onAddProduct={() => setIsDialogOpen(true)}
              canAddMore={selectedProducts.length < 3}
            />
          </div>
        </motion.section>

        {/* Add Product Dialog */}
        <AddProductDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSelectProduct={handleAddProduct}
          allProducts={MOCK_PRODUCTS}
          selectedProductIds={selectedProducts.map(p => p.id)}
        />
      </main>

      {isLoggedIn && <ChatButton />}
      <Footer />
    </>
  )
}
