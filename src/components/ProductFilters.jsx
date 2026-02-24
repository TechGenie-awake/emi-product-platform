'use client'

import { SlidersHorizontal } from 'lucide-react'

export default function ProductFilters({ 
  brands, 
  selectedBrands, 
  onBrandChange,
  priceRange,
  onPriceRangeChange,
  minPrice,
  maxPrice
}) {
  return (
    <div className="w-full lg:w-64 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-gray-200">
        <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Brand</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {brands.map(brand => (
            <label 
              key={brand}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onBrandChange([...selectedBrands, brand])
                  } else {
                    onBrandChange(selectedBrands.filter(b => b !== brand))
                  }
                }}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 
                         focus:ring-2 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Price Range</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0] || ''}
              onChange={(e) => onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])}
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <span className="text-gray-500 text-sm">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1] || ''}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value) || maxPrice])}
              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatPrice(minPrice)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </div>

      {(selectedBrands.length > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
        <button
          onClick={() => {
            onBrandChange([])
            onPriceRangeChange([minPrice, maxPrice])
          }}
          className="w-full py-2 text-sm text-gray-700 hover:text-gray-900 
                   border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}

function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}