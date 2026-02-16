// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'CUSTOMER' | 'ADMIN'
  createdAt: Date
}

// Product Types
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  imageUrl: string
  images: string[]
  stock: number
  category: string
  sizes: string[]
  colors: string[]
  rating: number
  tags: string[]
  isNew: boolean
  isSale: boolean
  createdAt: Date
  updatedAt: Date
}

// Review Types
export interface Review {
  id: string
  rating: number
  comment?: string
  user: User
  product: Product
  createdAt: Date
}

// Cart Types
export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
  createdAt: Date
  updatedAt: Date
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
  totalItems: number
}

// Wishlist Types
export interface WishlistItem {
  id: string
  product: Product
  createdAt: Date
}

// Order Types
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'
export type PaymentStatus = 'UNPAID' | 'PENDING' | 'PAID' | 'FAILED'

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface Order {
  id: string
  orderNumber: string
  user: User
  items: OrderItem[]
  status: OrderStatus
  totalAmount: number
  shippingCost: number
  tax: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  shippingAddress: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message: string
  error?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sizes?: string[]
  colors?: string[]
  search?: string
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular'
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}
