'use client'

import { useState } from 'react'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Wallet, ShieldCheck, TrendingUp } from 'lucide-react'
import VariantSelector from './VariantSelector'
import EMIPlanCard from './EMIPlanCard'
import ProductImage from './ProductImage'

export default function ProductDetails({ product, initialVariant }) {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant)
  const [selectedPlan, setSelectedPlan] = useState(selectedVariant.emiPlans[0])

  const discount = calculateDiscount(selectedVariant.price, selectedVariant.mrp)
  const downpayment = Math.round(selectedVariant.price * 0.02)

  const handleVariantChange = (newVariant) => {
    setSelectedVariant(newVariant)
    setSelectedPlan(newVariant.emiPlans[0])
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Left panel — image, stays in sync with selectedVariant */}
      <div className="lg:sticky lg:top-12 lg:self-start">
        <ProductImage
          imageUrl={selectedVariant.imageUrl}
          productName={product.name}
        />
      </div>

      {/* Right panel — details, variant selector, EMI plans */}
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600">
              {selectedVariant.storage} • {selectedVariant.color}
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(selectedVariant.mrp)}
                </span>
                <span className="text-green-600 font-medium">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
            <Wallet className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">
              Pay just <strong>{formatPrice(downpayment)}</strong> to get started
            </span>
          </div>

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Choose your EMI plan
              </h2>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {selectedVariant.emiPlans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlan.id === plan.id}
                  onSelect={() => setSelectedPlan(plan)}
                />
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              EMI starts from next billing cycle
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200 mt-6">
          <button className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl 
                           hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Proceed with {selectedPlan.tenure}-month EMI
          </button>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>Backed by mutual funds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}