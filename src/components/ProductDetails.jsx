'use client'

import { useState } from 'react'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Wallet, ShieldCheck, TrendingUp } from 'lucide-react'
import VariantSelector from './VariantSelector'
import EMIPlanCard from './EMIPlanCard'
import ConfirmationModal from './ConfirmationModal'
import ProductImage from './ProductImage'

export default function ProductDetails({ product, initialVariant }) {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant)
  const [selectedPlan, setSelectedPlan] = useState(selectedVariant.emiPlans[0])
  const [showModal, setShowModal] = useState(false)

  const discount = calculateDiscount(selectedVariant.price, selectedVariant.mrp)
  const downpayment = Math.round(selectedVariant.price * 0.02)

  const handleVariantChange = (newVariant) => {
    setSelectedVariant(newVariant)
    setSelectedPlan(newVariant.emiPlans[0])
  }

  const handleConfirmPurchase = () => {
    setShowModal(false)
    alert(`Purchase confirmed!\n\nProduct: ${product.name}\nVariant: ${selectedVariant.color}, ${selectedVariant.storage}\nEMI: ${formatPrice(selectedPlan.monthlyAmount)}/month for ${selectedPlan.tenure} months\n\nThank you for your purchase!`)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
      {/* Left panel - image synced with selected variant */}
      <div className="lg:sticky lg:top-12 lg:self-start">
        <ProductImage 
          variant={selectedVariant}
          productName={product.name}
        />
      </div>

      {/* Right panel - details */}
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {selectedVariant.storage} • {selectedVariant.color}
            </p>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  {formatPrice(selectedVariant.mrp)}
                </span>
                <span className="text-sm sm:text-base text-green-600 font-medium">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-50 border border-green-200 rounded-lg">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700">
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
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Choose your EMI plan
              </h2>
            </div>
            
            <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {selectedVariant.emiPlans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlan.id === plan.id}
                  onSelect={() => setSelectedPlan(plan)}
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-3">
              EMI starts from next billing cycle
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6 pb-4 sm:pb-0">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-3 sm:py-4 bg-gray-900 text-white text-sm sm:text-base font-semibold rounded-xl 
                       hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            Proceed with {selectedPlan.tenure}-month EMI
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Backed by mutual funds</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        variant={selectedVariant}
        plan={selectedPlan}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  )
}