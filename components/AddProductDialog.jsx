'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AddProductDialog({
  isOpen,
  onOpenChange,
  onSelectProduct,
  allProducts,
  selectedProductIds
}) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter products: exclude already selected ones, filter by search
  const availableProducts = allProducts.filter(
    p => !selectedProductIds.includes(p.id) && 
         (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a Product to Compare</DialogTitle>
          <DialogDescription>
            Search and select a product to add to your comparison
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
          <Input
            placeholder="Search products or brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Product List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {availableProducts.length > 0 ? (
            availableProducts.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => {
                  onSelectProduct(product)
                  setSearchTerm('')
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-bg-secondary transition border hover:border-brand-orange"
                whileHover={{ x: 4 }}
              >
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover bg-bg-secondary"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary uppercase font-semibold mb-1">
                      {product.brand}
                    </p>
                    <p className="font-semibold text-text-primary line-clamp-1">{product.name}</p>
                    <p className="text-sm text-brand-orange font-bold">
                      ₦{(product.price / 1000).toFixed(0)}K
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-yellow-400">★</span>
                      <span className="text-xs text-text-secondary">{product.rating} ({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary">
                {searchTerm ? 'No products found' : 'All products are already selected'}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              setSearchTerm('')
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
