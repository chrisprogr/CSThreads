import { NextRequest, NextResponse } from 'next/server'

// Sample product data (in production, fetch from database)
const getProductById = (id: string) => {
  const products = [
    {
      id: '1',
      name: 'Classic Black T-Shirt',
      description: 'Premium cotton t-shirt with perfect fit',
      price: 29.99,
      originalPrice: 39.99,
      imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt',
      images: ['https://via.placeholder.com/300x400?text=T-Shirt'],
      stock: 50,
      category: 'Men',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Blue'],
      rating: 4.5,
      tags: ['classic', 'casual'],
      isNew: true,
      isSale: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
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
