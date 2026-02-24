'use client'

import { formatPrice } from '@/lib/utils'
import { X, ShieldCheck, CreditCard, TrendingUp } from 'lucide-react'

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  product, 
  variant, 
  plan,
  onConfirm 
}) {
  if (!isOpen) return null

  const totalAmount = plan.monthlyAmount * plan.tenure
  const downpayment = Math.round(variant.price * 0.02)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Confirm Your Purchase
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product</span>
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Variant</span>
                <span className="font-medium text-gray-900">
                  {variant.color}, {variant.storage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(variant.price)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              EMI Plan Selected
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(plan.monthlyAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure</span>
                <span className="font-medium text-gray-900">{plan.tenure} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-medium text-gray-900">
                  {plan.interestRate === 0 ? '0% (No Cost EMI)' : `${plan.interestRate}%`}
                </span>
              </div>
              {plan.cashback > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cashback</span>
                  <span className="font-medium text-green-600">
                    {formatPrice(plan.cashback)}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-green-200 flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pay Today (Down Payment)</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(downpayment)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Starting from next month</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(plan.monthlyAmount)}/month
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Secure & Backed by Mutual Funds</p>
              <p>Your EMI plan is backed by mutual funds, ensuring transparency and security for your purchase.</p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium 
                     rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl 
                     hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  )
}