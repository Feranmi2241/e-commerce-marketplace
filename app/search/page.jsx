'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ChatButton from '@/components/ChatButton'
import Footer from '@/components/Footer'
import FilterSidebar from '@/components/FilterSidebar'
import ProductGridResults from '@/components/ProductGridResults'

// Mock product data
const MOCK_PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Phones', price: 799000, originalPrice: 899000, image: '📱', rating: 4.8, reviews: 342, discount: 11, inStock: true, easyBuyEligible: true, brand: 'Apple', description: 'Latest flagship phone' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'Phones', price: 699000, originalPrice: 799000, image: '📱', rating: 4.7, reviews: 289, discount: 12, inStock: true, easyBuyEligible: true, brand: 'Samsung', description: 'Top Android phone' },
  { id: 3, name: 'iPad Air', category: 'Tablets', price: 549000, originalPrice: 649000, image: '📱', rating: 4.6, reviews: 156, discount: 15, inStock: true, easyBuyEligible: true, brand: 'Apple', description: 'Powerful tablet' },
  { id: 4, name: 'OnePlus 12', category: 'Phones', price: 449000, originalPrice: 549000, image: '📱', rating: 4.5, reviews: 198, discount: 18, inStock: true, easyBuyEligible: true, brand: 'OnePlus', description: 'Fast and sleek' },
  { id: 5, name: 'MacBook Air M3', category: 'Laptops', price: 1299000, originalPrice: 1499000, image: '💻', rating: 4.9, reviews: 421, discount: 13, inStock: true, easyBuyEligible: false, brand: 'Apple', description: 'Portable powerhouse' },
  { id: 6, name: 'Dell XPS 15', category: 'Laptops', price: 1099000, originalPrice: 1249000, image: '💻', rating: 4.7, reviews: 267, discount: 12, inStock: true, easyBuyEligible: false, brand: 'Dell', description: 'Professional laptop' },
  { id: 7, name: 'USB-C Cable 2M', category: 'Accessories', price: 4999, originalPrice: 9999, image: '🔌', rating: 4.3, reviews: 89, discount: 50, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'High quality cable' },
  { id: 8, name: 'Wireless Charger', category: 'Accessories', price: 15999, originalPrice: 24999, image: '🔌', rating: 4.6, reviews: 234, discount: 36, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'Fast charging' },
  { id: 9, name: 'Perfume Essence', category: 'Perfumes', price: 45000, originalPrice: 65000, image: '🌸', rating: 4.7, reviews: 456, discount: 30, inStock: true, easyBuyEligible: true, brand: 'Premium', description: 'Luxury fragrance' },
  { id: 10, name: 'Face Serum', category: 'Cosmetics', price: 12999, originalPrice: 18999, image: '💄', rating: 4.5, reviews: 321, discount: 31, inStock: true, easyBuyEligible: true, brand: 'Beauty', description: 'Glowing skin' },
  { id: 11, name: '27" 4K Monitor', category: 'Electronics', price: 189999, originalPrice: 249999, image: '🖥️', rating: 4.6, reviews: 178, discount: 24, inStock: true, easyBuyEligible: false, brand: 'ASUS', description: 'Crystal clear display' },
  { id: 12, name: 'Mechanical Keyboard', category: 'Accessories', price: 29999, originalPrice: 39999, image: '⌨️', rating: 4.8, reviews: 412, discount: 25, inStock: true, easyBuyEligible: true, brand: 'Corsair', description: 'Premium typing' },
  { id: 13, name: 'Wireless Mouse', category: 'Accessories', price: 8999, originalPrice: 14999, image: '🖱️', rating: 4.4, reviews: 203, discount: 40, inStock: true, easyBuyEligible: true, brand: 'Logitech', description: 'Smooth control' },
  { id: 14, name: 'Laptop Stand', category: 'Accessories', price: 7999, originalPrice: 12999, image: '🖥️', rating: 4.5, reviews: 167, discount: 38, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'Ergonomic design' },
  { id: 15, name: 'Power Bank 30000mAh', category: 'Accessories', price: 34999, originalPrice: 49999, image: '🔋', rating: 4.7, reviews: 389, discount: 30, inStock: true, easyBuyEligible: true, brand: 'Anker', description: 'All-day charging' },
  { id: 16, name: 'Screen Protector Pack', category: 'Accessories', price: 3999, originalPrice: 7999, image: '📱', rating: 4.2, reviews: 145, discount: 50, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'Protect your device' },
  { id: 17, name: 'Earbuds Pro', category: 'Electronics', price: 89999, originalPrice: 129999, image: '🎧', rating: 4.8, reviews: 567, discount: 30, inStock: true, easyBuyEligible: true, brand: 'Premium', description: 'Crystal audio' },
  { id: 18, name: 'Smart Watch', category: 'Electronics', price: 44999, originalPrice: 64999, image: '⌚', rating: 4.6, reviews: 298, discount: 30, inStock: false, easyBuyEligible: true, brand: 'Premium', description: 'Track everything' },
  { id: 19, name: 'Tablet Pen', category: 'Accessories', price: 9999, originalPrice: 14999, image: '✏️', rating: 4.3, reviews: 112, discount: 33, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'Precision drawing' },
  { id: 20, name: 'USB Hub 7-Port', category: 'Accessories', price: 12999, originalPrice: 19999, image: '🔌', rating: 4.5, reviews: 234, discount: 35, inStock: true, easyBuyEligible: true, brand: 'Generic', description: 'Expand connectivity' },
]

export default function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    subcategory: 'all',
    priceRange: [0, 2000000],
    brands: [],
    rating: 0,
    easyBuyOnly: false,
    inStockOnly: false,
  })
  const [sort, setSort] = useState('popularity')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...MOCK_PRODUCTS]

    // Apply filters
    if (filters.categories.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category))
    }

    products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    if (filters.brands.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand))
    }

    if (filters.rating > 0) {
      products = products.filter(p => p.rating >= filters.rating)
    }

    if (filters.easyBuyOnly) {
      products = products.filter(p => p.easyBuyEligible)
    }

    if (filters.inStockOnly) {
      products = products.filter(p => p.inStock)
    }

    // Apply sorting
    switch (sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        products.reverse()
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'popularity':
      default:
        products.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return products
  }, [filters, sort])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 py-8">
        {/* Filters Sidebar */}
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="text-sm text-text-secondary">
              Showing <span className="font-semibold text-text-primary">{filteredAndSortedProducts.length}</span> results
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 border border-border-light rounded-lg text-sm bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="popularity">Sort: Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex border border-border-light rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm transition ${
                    viewMode === 'grid'
                      ? 'bg-brand-orange text-white'
                      : 'bg-white text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm transition ${
                    viewMode === 'list'
                      ? 'bg-brand-orange text-white'
                      : 'bg-white text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGridResults
            products={paginatedProducts}
            viewMode={viewMode}
            isLoggedIn={isLoggedIn}
            totalResults={filteredAndSortedProducts.length}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? 'bg-brand-orange text-white'
                        : 'bg-bg-secondary text-text-primary hover:bg-border-light'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoggedIn && <ChatButton />}
      <Footer />
    </div>
  )
}
