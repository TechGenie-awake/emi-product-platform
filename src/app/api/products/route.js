import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/products — list all products with first variant preview
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        variants: {
          take: 1,
          select: {
            price: true,
            mrp: true,
            imageUrl: true,
          },
        },
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
