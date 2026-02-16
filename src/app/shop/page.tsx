'use client'

import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from '@/components/common/product-card'
import { Product } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

const CATEGORIES = ['All', 'T-Shirts', 'Pants']
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
]

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#c9a96e] rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState(searchParam || '')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  useEffect(() => {
    setSearchQuery(searchParam || '')
  }, [searchParam])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/products?limit=20`)
      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [products, activeCategory, sortBy, searchQuery])

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              {searchQuery ? 'Search Results' : 'Our Collection'}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mt-3 tracking-tight">
              {searchQuery ? (
                <>Results for &ldquo;<span className="italic font-light font-[family-name:var(--font-playfair)]">{searchQuery}</span>&rdquo;</>
              ) : (
                <>The <span className="italic font-light font-[family-name:var(--font-playfair)]">Shop</span></>
              )}
            </h1>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
          </motion.div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-b border-gray-200 sticky top-[60px] bg-white/95 backdrop-blur-md z-30">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] tracking-[0.15em] uppercase transition-colors relative pb-1 ${
                    activeCategory === cat
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a96e]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sort + Count */}
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-gray-400 tracking-wider hidden md:block">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[11px] tracking-[0.1em] uppercase text-gray-600 bg-transparent border border-gray-200 px-3 py-2 focus:outline-none focus:border-[#c9a96e] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="bg-[#f5f5f0] aspect-[3/4] animate-pulse" />
                  <div className="h-3 bg-gray-100 w-20 animate-pulse" />
                  <div className="h-4 bg-gray-100 w-32 animate-pulse" />
                  <div className="h-3 bg-gray-100 w-16 animate-pulse" />
                </div>
              ))}
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="text-gray-400 text-sm tracking-wider">No products found in this category</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-[11px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#b89a5f] transition-colors border-b border-[#c9a96e] pb-0.5"
              >
                View All Products
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
