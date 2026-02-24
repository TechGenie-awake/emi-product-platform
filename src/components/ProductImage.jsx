'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductImage({ variant, productName }) {
  const [selectedThumb, setSelectedThumb] = useState(0)
  
  const thumbnails = variant.images && variant.images.length > 0 
    ? variant.images 
    : [variant.imageUrl]
  
  const mainImage = thumbnails[selectedThumb]

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-contain p-6 sm:p-8"
          priority
        />
      </div>
      
      {thumbnails.length > 1 && (
        <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
          {thumbnails.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedThumb(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 transition-all overflow-hidden bg-gray-50 flex-shrink-0
                ${selectedThumb === idx 
                  ? 'border-gray-900 shadow-md' 
                  : 'border-gray-200 hover:border-gray-400'
                }`}
            >
              <Image
                src={thumb}
                alt={`${productName} view ${idx + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}