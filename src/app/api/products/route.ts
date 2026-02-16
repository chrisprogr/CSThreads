import { NextRequest, NextResponse } from 'next/server'

// Sample database of products
const products = [
  // T-Shirts
  {
    id: '1',
    name: 'Classic Cropped Tee',
    description: 'Premium 100% cotton t-shirt with perfect fit and comfort',
    price: 399,
    imageUrl: '/images/products/Classsic Cropped Tee.jpg',
    images: ['/images/products/Classsic Cropped Tee.jpg'],
    stock: 45,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    rating: 4.6,
    tags: ['classic', 'casual', 'cotton'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Minimal Logo Tshirt',
    description: 'Sleek minimalist design with subtle logo embroidery',
    price: 449,
    imageUrl: '/images/products/Minimal Logo Tshirt.jpg',
    images: ['/images/products/Minimal Logo Tshirt.jpg'],
    stock: 50,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Heather Gray'],
    rating: 4.7,
    tags: ['minimal', 'modern', 'casual'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Oversized Street Tee',
    description: 'Trendy oversized fit perfect for street style fashion',
    price: 499,
    imageUrl: '/images/products/Oversized Street Tee.jpg',
    images: ['/images/products/Oversized Street Tee.jpg'],
    stock: 40,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Olive', 'Cream'],
    rating: 4.5,
    tags: ['oversized', 'street', 'trendy'],
    isNew: true,
    isSale: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Vintage Washed Tshirt',
    description: 'Classic vintage wash effect for that retro cool look',
    price: 529,
    imageUrl: '/images/products/Vintage Washed Tshirt.jpg',
    images: ['/images/products/Vintage Washed Tshirt.jpg'],
    stock: 35,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Black', 'Vintage White', 'Vintage Gray'],
    rating: 4.8,
    tags: ['vintage', 'casual', 'retro'],
    isNew: false,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Premium Basic Tee',
    description: 'High-quality essentials basic tee for everyday wear',
    price: 599,
    imageUrl: '/images/products/Premium Basic Tee.jpg',
    images: ['/images/products/Premium Basic Tee.jpg'],
    stock: 60,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Burgundy'],
    rating: 4.9,
    tags: ['premium', 'basic', 'essential'],
    isNew: false,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Graphic Print Tshirt',
    description: 'Bold and vibrant graphic designs for statement looks',
    price: 549,
    imageUrl: '/images/products/Graphic Print Tshirt.jpg',
    images: ['/images/products/Graphic Print Tshirt.jpg'],
    stock: 38,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray'],
    rating: 4.6,
    tags: ['graphic', 'print', 'bold'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Relaxed Fit Pocket Tee',
    description: 'Comfortable relaxed fit with functional chest pocket',
    price: 469,
    imageUrl: '/images/products/Relaxed Fit Pocket Tee.jpg',
    images: ['/images/products/Relaxed Fit Pocket Tee.jpg'],
    stock: 42,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki', 'Navy', 'Cream', 'Forest Green'],
    rating: 4.5,
    tags: ['relaxed', 'pocket', 'casual'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Athletic Performance Tee',
    description: 'Moisture-wicking performance fabric for active lifestyle',
    price: 579,
    imageUrl: '/images/products/Athletic Performance Tee.jpg',
    images: ['/images/products/Athletic Performance Tee.jpg'],
    stock: 48,
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Sport Blue', 'Electric Lime'],
    rating: 4.8,
    tags: ['athletic', 'performance', 'sports'],
    isNew: true,
    isSale: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Pants
  {
    id: '9',
    name: 'Slim Fit Denim Jeans',
    description: 'Classic slim fit denim with perfect ankle taper',
    price: 999,
    imageUrl: '/images/products/Slim Fit Denim Jeans.jpg',
    images: ['/images/products/Slim Fit Denim Jeans.jpg'],
    stock: 32,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    rating: 4.7,
    tags: ['denim', 'slim', 'jeans'],
    isNew: false,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'Straight Cut Jeans',
    description: 'Versatile straight cut jeans for all-day comfort',
    price: 1049,
    imageUrl: '/images/products/Straight Cut Jeans.jpg',
    images: ['/images/products/Straight Cut Jeans.jpg'],
    stock: 40,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Indigo', 'Medium Blue', 'Black', 'Gray'],
    rating: 4.8,
    tags: ['straight', 'jeans', 'classic'],
    isNew: false,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '11',
    name: 'Cargo Utility Pants',
    description: 'Multi-pocket cargo pants with functional utility design',
    price: 1199,
    imageUrl: '/images/products/Cargo Utility Pants.jpg',
    images: ['/images/products/Cargo Utility Pants.jpg'],
    stock: 28,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Olive', 'Black', 'Khaki', 'Navy'],
    rating: 4.6,
    tags: ['cargo', 'utility', 'tactical'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12',
    name: 'Casual Chino Pants',
    description: 'Timeless chino pants perfect for casual and smart-casual',
    price: 899,
    imageUrl: '/images/products/Casual Chino Pants.jpg',
    images: ['/images/products/Casual Chino Pants.jpg'],
    stock: 50,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Khaki', 'Navy', 'Gray', 'Olive', 'Burgundy'],
    rating: 4.8,
    tags: ['chino', 'casual', 'smart-casual'],
    isNew: false,
    isSale: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '13',
    name: 'Jogger Sweatpants',
    description: 'Comfortable jogger style sweatpants for relaxed wear',
    price: 799,
    imageUrl: '/images/products/Jogger Sweatpants.jpg',
    images: ['/images/products/Jogger Sweatpants.jpg'],
    stock: 55,
    category: 'Pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Charcoal'],
    rating: 4.7,
    tags: ['jogger', 'sweatpants', 'comfort'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '14',
    name: 'Relaxed Fit Trousers',
    description: 'Loose and comfortable fit trousers for all-day wear',
    price: 1099,
    imageUrl: '/images/products/Relaxed Fit Trousers.jpg',
    images: ['/images/products/Relaxed Fit Trousers.jpg'],
    stock: 35,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Charcoal', 'Olive', 'Navy'],
    rating: 4.6,
    tags: ['relaxed', 'trousers', 'comfort'],
    isNew: false,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '15',
    name: 'Distressed Denim Jeans',
    description: 'Trendy distressed denim with selective rips and tears',
    price: 1149,
    imageUrl: '/images/products/Distressed Denim Jeans.jpg',
    images: ['/images/products/Distressed Denim Jeans.jpg'],
    stock: 30,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Light Blue', 'Medium Blue', 'Black'],
    rating: 4.5,
    tags: ['distressed', 'trendy', 'jeans'],
    isNew: true,
    isSale: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '16',
    name: 'Techwear Cargo Pants',
    description: 'Modern techwear cargo pants with advanced fabric technology',
    price: 1299,
    imageUrl: '/images/products/Techwear Cargo Pants.jpg',
    images: ['/images/products/Techwear Cargo Pants.jpg'],
    stock: 25,
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Dark Gray', 'Olive Green'],
    rating: 4.9,
    tags: ['techwear', 'cargo', 'modern'],
    isNew: true,
    isSale: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

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
