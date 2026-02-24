'use client'

import { formatPrice } from '@/lib/utils'
import { Check } from 'lucide-react'

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const isZeroInterest = plan.interestRate === 0

  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left
        ${isSelected 
          ? 'border-gray-900 bg-gray-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
            ${isSelected 
              ? 'border-gray-900 bg-gray-900' 
              : 'border-gray-300'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                {formatPrice(plan.monthlyAmount)}
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                × {plan.tenure} months
              </span>
            </div>
            {plan.cashback > 0 && (
              <p className="text-xs sm:text-sm text-green-600 mt-0.5">
                Cashback of {formatPrice(plan.cashback)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
            ${isZeroInterest 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isZeroInterest ? '0% EMI' : `${plan.interestRate}% interest`}
          </span>
        </div>
      </div>
    </button>
  )
}