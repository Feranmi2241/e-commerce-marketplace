'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ChatButton from '@/components/ChatButton'
import Footer from '@/components/Footer'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'
import DeliveryInfo from '@/components/DeliveryInfo'
import SpecificationsTable from '@/components/SpecificationsTable'
import CustomerReviews from '@/components/CustomerReviews'
import YouMayAlsoLike from '@/components/YouMayAlsoLike'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { motion } from 'framer-motion'

const mockProduct = {
  id: 'prod-001',
  name: 'Samsung 65" QLED 4K Smart TV',
  brand: 'Samsung',
  price: 450000,
  originalPrice: 600000,
  discountPercentage: 25,
  rating: 4.7,
  reviewCount: 328,
  stock: 8,
  images: [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
  ],
  description: [
    '65-inch 4K QLED display with Quantum Dot technology for vivid colors',
    'Smart TV features with built-in streaming apps (Netflix, YouTube, Prime Video)',
    '120Hz refresh rate for smooth motion in sports and gaming',
    'Voice control compatible with Alexa and Google Assistant',
    'Multiple HDMI and USB ports for connectivity',
    'Energy-efficient design with eco mode',
  ],
  variants: [
    { type: 'Color', options: ['Black', 'Silver', 'Champagne'] },
    { type: 'Size', options: ['55"', '65"', '75"'] },
  ],
  specifications: {
    Display: '65-inch QLED 4K (3840x2160)',
    'Refresh Rate': '120Hz',
    'Brightness': '2000 nits peak brightness',
    'Smart TV': 'Tizen OS with Smart Hub',
    Connectivity: 'WiFi 6E, Bluetooth 5.2, HDMI 2.1',
    'Sound System': 'Dolby Atmos with 2.2.2 channel speakers',
    Dimensions: '57.5" x 3.1" x 33.4" (with stand)',
    Weight: '28.2 kg (with stand)',
    Warranty: '2 years manufacturer warranty',
    'Energy Consumption': '165W typical',
  },
  easyBuyEligible: true,
  easyBuyDownPayment: 100000,
  easyBuyTerms: [
    { months: 3, monthlyPayment: 116667 },
    { months: 6, monthlyPayment: 58333 },
    { months: 9, monthlyPayment: 38889 },
    { months: 12, monthlyPayment: 29167 },
  ],
}

const mockReviews = [
  {
    id: 'rev-001',
    author: 'Chinedu O.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    date: '2 weeks ago',
    title: 'Amazing TV!',
    content: 'Great picture quality and very responsive smart TV interface. Highly recommended!',
    verified: true,
  },
  {
    id: 'rev-002',
    author: 'Amara P.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 4,
    date: '1 month ago',
    title: 'Good value for money',
    content: 'Excellent TV overall. Picture is crisp. My only concern is the sound could be better.',
    verified: true,
  },
  {
    id: 'rev-003',
    author: 'Tunde M.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    rating: 5,
    date: '1 month ago',
    title: 'Best purchase!',
    content: 'Ordered via Easy Buy. Delivery was quick and the TV works perfectly.',
    verified: true,
  },
]

export default function ProductPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [selectedEasyBuyTerm, setSelectedEasyBuyTerm] = useState(null)

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />

      {/* Breadcrumb */}
      <div className="sticky top-16 bg-white border-b border-border-light z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/category">Electronics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/category">TVs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{mockProduct.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Main Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <ProductGallery images={mockProduct.images} />

          {/* Right: Product Details */}
          <ProductDetails
            product={mockProduct}
            isLoggedIn={isLoggedIn}
            selectedVariants={selectedVariants}
            onVariantChange={setSelectedVariants}
            quantity={quantity}
            onQuantityChange={setQuantity}
            selectedEasyBuyTerm={selectedEasyBuyTerm}
            onEasyBuyTermChange={setSelectedEasyBuyTerm}
          />
        </div>
      </motion.div>

      {/* Delivery Info */}
      <DeliveryInfo />

      {/* Specifications */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-text-primary mb-8">Specifications</h2>
        <SpecificationsTable specs={mockProduct.specifications} />
      </div>

      {/* Product Description */}
      <div className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">About This Product</h2>
          <ul className="space-y-3">
            {mockProduct.description.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-brand-orange font-bold mt-1">•</span>
                <span className="text-text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <CustomerReviews product={mockProduct} reviews={mockReviews} />
      </div>

      {/* You May Also Like */}
      <div className="bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <YouMayAlsoLike isLoggedIn={isLoggedIn} />
        </div>
      </div>

      {isLoggedIn && <ChatButton />}
      <Footer />
    </main>
  )
}
