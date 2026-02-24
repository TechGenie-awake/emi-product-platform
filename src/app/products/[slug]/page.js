import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${slug}`,
    { cache: 'no-store' }
  )
  
  if (!res.ok) return null
  return res.json()
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const firstVariant = product.variants[0]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetails 
          product={product}
          initialVariant={firstVariant}
        />

        <div className="mt-16 border-t border-gray-200 pt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            About {product.name}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}