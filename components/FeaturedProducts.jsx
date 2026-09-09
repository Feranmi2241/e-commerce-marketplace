import ProductCard from './ProductCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

const featuredProducts = [
  {
    id: 201,
    name: 'MacBook Pro 16"',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 342,
  },
  {
    id: 202,
    name: 'iPad Pro 12.9"',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 203,
    name: 'Gaming Laptop ROG',
    price: 1299,
    originalPrice: 1699,
    image: 'https://images.unsplash.com/photo-1588872657840-790ff3bda395?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 204,
    name: '4K Webcam Pro',
    price: 249,
    originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 124,
  },
  {
    id: 205,
    name: 'Studio Headphones',
    price: 449,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 512,
  },
  {
    id: 206,
    name: 'Smart Watch Series 8',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 423,
  },
  {
    id: 207,
    name: 'Camera Drone 4K',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 298,
  },
  {
    id: 208,
    name: 'Portable SSD 2TB',
    price: 179,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 356,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function FeaturedProducts({ isLoggedIn }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
            Bestsellers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Handpicked selection of the best-selling and most-loved items in our store
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="no-underline">
            <button className="px-8 py-3 border-2 border-brand-orange text-brand-orange font-semibold rounded-lg hover:bg-orange-50 transition">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
