import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ChevronDown } from 'lucide-react'

const CATEGORIES = [
  'Phones',
  'Tablets',
  'Laptops',
  'Electronics',
  'Accessories',
  'Cosmetics',
  'Perfumes',
]

const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Dell', 'ASUS', 'Corsair', 'Logitech', 'Anker', 'Premium', 'Beauty', 'Generic']

const RATINGS = [
  { label: '4.0 & above', value: 4.0 },
  { label: '4.5 & above', value: 4.5 },
  { label: '4.7 & above', value: 4.7 },
]

export default function FilterSidebar({ filters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFilterChange({ ...filters, categories: newCategories })
  }

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onFilterChange({ ...filters, brands: newBrands })
  }

  const handlePriceChange = (value) => {
    onFilterChange({ ...filters, priceRange: value })
  }

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating: filters.rating === rating ? 0 : rating })
  }

  const handleEasyBuyChange = (checked) => {
    onFilterChange({ ...filters, easyBuyOnly: checked })
  }

  const handleInStockChange = (checked) => {
    onFilterChange({ ...filters, inStockOnly: checked })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)
  }

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between font-semibold text-text-primary mb-4 hover:text-brand-orange transition"
        >
          Categories
          <ChevronDown
            className={`w-4 h-4 transition ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 rounded accent-brand-orange"
                />
                <span className="text-sm text-text-secondary hover:text-text-primary transition">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-text-primary mb-4 hover:text-brand-orange transition"
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 transition ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              min={0}
              max={2000000}
              step={50000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex gap-2 text-sm">
              <div className="flex-1">
                <label className="text-text-secondary block mb-1">Min</label>
                <div className="text-brand-orange font-semibold">₦{(filters.priceRange[0] / 1000).toFixed(0)}K</div>
              </div>
              <div className="flex-1">
                <label className="text-text-secondary block mb-1">Max</label>
                <div className="text-brand-orange font-semibold">₦{(filters.priceRange[1] / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between font-semibold text-text-primary mb-4 hover:text-brand-orange transition"
        >
          Brand
          <ChevronDown
            className={`w-4 h-4 transition ${expandedSections.brand ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brand && (
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 rounded accent-brand-orange"
                />
                <span className="text-sm text-text-secondary hover:text-text-primary transition">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-semibold text-text-primary mb-4 hover:text-brand-orange transition"
        >
          Rating
          <ChevronDown
            className={`w-4 h-4 transition ${expandedSections.rating ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-3">
            {RATINGS.map((rating) => (
              <button
                key={rating.value}
                onClick={() => handleRatingChange(rating.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  filters.rating === rating.value
                    ? 'bg-brand-orange text-white'
                    : 'bg-bg-secondary text-text-primary hover:bg-border-light'
                }`}
              >
                {rating.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Easy Buy */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-text-primary cursor-pointer">
            Easy Buy Eligible Only
          </label>
          <Switch
            checked={filters.easyBuyOnly}
            onCheckedChange={handleEasyBuyChange}
          />
        </div>
      </div>

      {/* In Stock */}
      <div className="bg-white rounded-lg border border-border-light p-4">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-text-primary cursor-pointer">
            In Stock Only
          </label>
          <Switch
            checked={filters.inStockOnly}
            onCheckedChange={handleInStockChange}
          />
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          onFilterChange({
            categories: [],
            subcategory: 'all',
            priceRange: [0, 2000000],
            brands: [],
            rating: 0,
            easyBuyOnly: false,
            inStockOnly: false,
          })
        }
        className="w-full py-3 bg-bg-secondary text-text-primary font-semibold rounded-lg hover:bg-border-light transition"
      >
        Reset Filters
      </button>
    </div>
  )
}
