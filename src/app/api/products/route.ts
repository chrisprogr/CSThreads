import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/data/products'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = parseInt(searchParams.get('skip') || '0')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured') === 'true'
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : null
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : null
  const sortBy = searchParams.get('sortBy') || 'newest'

  let filtered = [...products]

  // Filter by category
  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchLower) || p.description?.toLowerCase().includes(searchLower))
  }

  // Filter by featured (new or sale)
  if (featured) {
    filtered = filtered.filter((p) => p.isNew || p.isSale)
  }

  // Filter by price range
  if (minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= minPrice)
  }
  if (maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= maxPrice)
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
    default:
      filtered.reverse()
  }

  const total = filtered.length
  const paginatedProducts = filtered.slice(skip, skip + limit)

  return NextResponse.json({
    success: true,
    products: paginatedProducts,
    total,
    limit,
    skip,
    pages: Math.ceil(total / limit),
  })
}

export async function POST(request: NextRequest) {
  // This would be for admin to add new products
  // In production, verify admin role and add to database
  return NextResponse.json({ success: false, message: 'Not implemented' }, { status: 501 })
}
