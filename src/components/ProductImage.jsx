'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductImage({ imageUrl, productName }) {
  const [selectedThumb, setSelectedThumb] = useState(0)
  
  // Using same image for all thumbs since we only have one product image
  const thumbnails = [imageUrl, imageUrl, imageUrl]

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          className="object-contain p-8"
          priority
        />
      </div>
      
      <div className="flex gap-3 justify-center">
        {thumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedThumb(idx)}
            className={`relative w-20 h-20 rounded-lg border-2 transition-all overflow-hidden bg-gray-50
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
    </div>
  )
}