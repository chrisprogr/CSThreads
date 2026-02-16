import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/data/products'

const getProductById = (id: string) => {
  return products.find((p) => p.id === id)
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    product,
  })
}
