'use client'

import { ChevronDown } from 'lucide-react'

export default function VariantSelector({ variants, selectedVariant, onVariantChange }) {
  const colors = [...new Set(variants.map(v => v.color))]
  const storages = [...new Set(variants.map(v => v.storage))]
  
  const currentColor = selectedVariant?.color
  const currentStorage = selectedVariant?.storage

  const handleColorChange = (color) => {
    const newVariant = variants.find(
      v => v.color === color && v.storage === currentStorage
    ) || variants.find(v => v.color === color)
    
    if (newVariant) onVariantChange(newVariant)
  }

  const handleStorageChange = (storage) => {
    const newVariant = variants.find(
      v => v.storage === storage && v.color === currentColor
    ) || variants.find(v => v.storage === storage)
    
    if (newVariant) onVariantChange(newVariant)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-6 border-b border-gray-200">
      <div className="flex-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
          Color
        </label>
        <div className="relative">
          <select
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 bg-white border border-gray-300 rounded-lg 
                     appearance-none cursor-pointer focus:outline-none focus:ring-2 
                     focus:ring-gray-900 focus:border-transparent text-gray-900 text-sm sm:text-base"
          >
            {colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
          Storage
        </label>
        <div className="relative">
          <select
            value={currentStorage}
            onChange={(e) => handleStorageChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 bg-white border border-gray-300 rounded-lg 
                     appearance-none cursor-pointer focus:outline-none focus:ring-2 
                     focus:ring-gray-900 focus:border-transparent text-gray-900 text-sm sm:text-base"
          >
            {storages.map(storage => (
              <option key={storage} value={storage}>
                {storage}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}