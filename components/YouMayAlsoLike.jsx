'use client'

import { useState } from 'react'
import { Heart, Lock } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

const mockRelatedProducts = [
  {
    id: 'prod-002',
    name: 'Sony 55" 4K LED TV',
    price: 350000,
    originalPrice: 450000,
    discount: 22,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'LG 65" OLED TV',
    price: 580000,
    originalPrice: 720000,
    discount: 19,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
    inStock: true,
  },
  {
    id: 'prod-004',
    name: 'TCL 43" Smart TV',
    price: 180000,
    originalPrice: 220000,
    discount: 18,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Hisense 75" 4K TV',
    price: 420000,
    originalPrice: 550000,
    discount: 24,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    inStock: false,
  },
  {
    id: 'prod-006',
    name: 'Panasonic 55" TV',
    price: 320000,
    originalPrice: 420000,
    discount: 24,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
    inStock: true,
  },
]

export default function YouMayAlsoLike({ isLoggedIn }) {
  const [liked, setLiked] = useState({})

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">You may also like</h2>
      
      <div className="relative px-0 sm:px-10 overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {mockRelatedProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <div className="bg-white rounded-lg border border-border-light overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative bg-bg-secondary rounded-t-lg overflow-hidden h-40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-semibold text-text-primary text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-brand-orange">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-text-secondary line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Actions */}
                  {isLoggedIn ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLiked({ ...liked, [product.id]: !liked[product.id] })}
                        className="flex-1 py-2 px-2 rounded-lg border border-border-light hover:border-brand-orange transition-all"
                      >
                        <Heart
                          className={`w-4 h-4 mx-auto ${
                            liked[product.id]
                              ? 'fill-red-500 text-red-500'
                              : 'text-text-secondary'
                          }`}
                        />
                      </button>
                      <button className="flex-1 py-2 px-2 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-orange-600 transition">
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <button className="w-full py-2 px-2 rounded-lg border border-border-light text-text-secondary text-xs font-bold hover:border-brand-orange transition flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  )
}
