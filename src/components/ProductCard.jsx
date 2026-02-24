'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export default function ProductCard({ product }) {
  const firstVariant = product.variants[0]
  const discount = calculateDiscount(firstVariant.price, firstVariant.mrp)
  const lowestEMI = Math.min(...firstVariant.emiPlans.map(p => p.monthlyAmount))
  const downpayment = Math.round(firstVariant.price * 0.02)

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="block bg-white rounded-xl border border-gray-200 hover:border-gray-300 
                 hover:shadow-lg transition-all duration-200 overflow-hidden group"
    >
      <div className="grid grid-cols-[200px_1fr] gap-6 p-6">
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <Image
            src={firstVariant.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {firstVariant.storage} | {firstVariant.color}
            </p>

            {firstVariant.emiPlans.some(p => p.interestRate === 0) && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 
                             text-xs font-medium rounded-full mb-4">
                0% EMI on 3/6 months
              </span>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-gray-600">EMI From</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(lowestEMI)}/month
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Downpayment: {formatPrice(downpayment)}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(firstVariant.price)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(firstVariant.mrp)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      {discount}% Off
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-900 font-medium">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}