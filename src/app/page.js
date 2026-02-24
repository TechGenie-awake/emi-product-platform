import { redirect } from 'next/navigation'

async function getFirstProduct() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`,
    { cache: 'no-store' }
  )
  
  if (!res.ok) return null
  const products = await res.json()
  return products[0]
}

export default async function Home() {
  const firstProduct = await getFirstProduct()
  
  if (firstProduct) {
    redirect(`/products/${firstProduct.slug}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          1Fi EMI Store
        </h1>
        <p className="text-gray-600">
          Loading products...
        </p>
      </div>
    </div>
  )
}