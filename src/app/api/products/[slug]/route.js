import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/products/[slug] — single product with all variants & EMI plans
export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: { tenure: 'asc' },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
