'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-lg overflow-hidden border border-border-light">
        <motion.img
          key={mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[mainImage]}
          alt="Product main image"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
              mainImage === idx
                ? 'border-brand-orange'
                : 'border-border-light hover:border-text-secondary'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
