'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils/helpers'
import { useWishlistStore } from '@/store'
import { QuickViewModal } from './quick-view-modal'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wishlistItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      createdAt: new Date(),
    }
    toggleItem(wishlistItem)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewOpen(true)
  }

  return (
    <>
      <motion.div
        className="group flex flex-col"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <Link href={`/shop/${product.id}`}>
          <div className="relative bg-[#f5f5f0] overflow-hidden aspect-[3/4] mb-4 cursor-pointer">
            <Image
              src={product.imageUrl || '/images/products/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="px-2.5 py-1 bg-black text-white text-[9px] font-semibold tracking-[0.15em] uppercase">
                  New
                </span>
              )}
              {product.isSale && (
                <span className="px-2.5 py-1 bg-[#c9a96e] text-white text-[9px] font-semibold tracking-[0.15em] uppercase">
                  Sale
                </span>
              )}
            </div>

            {/* Quick actions overlay */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <div className="flex">
                <motion.button
                  onClick={handleQuickView}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-black/90 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.2em] uppercase py-3.5 hover:bg-[#c9a96e] transition-colors duration-300"
                >
                  Quick View
                </motion.button>
              </div>
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 ${
                isWishlisted
                  ? 'bg-[#c9a96e] opacity-100'
                  : 'bg-white/80 opacity-0 group-hover:opacity-100 hover:bg-white'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${isWishlisted ? 'text-white fill-white' : 'text-gray-700'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <div className="px-0.5">
          <span className="text-[10px] text-gray-400 tracking-[0.15em] uppercase font-medium">
            {product.category}
          </span>
          <Link href={`/shop/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 hover:text-[#c9a96e] transition-colors mt-1 line-clamp-1 tracking-wide">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  )
}
