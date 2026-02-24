'use client'

import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
        
        const prices = data.flatMap(p => p.variants.map(v => v.price))
        setPriceRange([Math.min(...prices), Math.max(...prices)])
      })
  }, [])

  const brands = [...new Set(products.map(p => p.brand))]
  const minPrice = Math.min(...products.flatMap(p => p.variants.map(v => v.price))) || 0
  const maxPrice = Math.max(...products.flatMap(p => p.variants.map(v => v.price))) || 200000

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const productPrice = product.variants[0].price
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1]
    
    return matchesSearch && matchesBrand && matchesPrice
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">1Fi EMI Store</h1>
            <p className="text-xs sm:text-sm text-gray-600">Buy premium smartphones on easy EMI</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for smartphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <ProductFilters
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </aside>

          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <ProductFilters
                    brands={brands}
                    selectedBrands={selectedBrands}
                    onBrandChange={setSelectedBrands}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full mt-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No products found</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedBrands([])
                    setPriceRange([minPrice, maxPrice])
                  }}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}