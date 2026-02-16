'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice, calculateDiscount } from '@/lib/utils/helpers'
import toast from 'react-hot-toast'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0] || '')
      setQuantity(1)
      setActiveImageIndex(0)
    }
  }, [product])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!product) return null

  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0
  const isWishlisted = isInWishlist(product.id)
  const images = product.images?.length > 0 ? product.images : [product.imageUrl]

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error('Please select a size')
      return
    }

    const cartItem = {
      id: product.id,
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addItem(cartItem)
    toast.success(`${product.name} added to bag`, {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '13px',
        letterSpacing: '0.03em',
      },
      iconTheme: {
        primary: '#c9a96e',
        secondary: '#fff',
      },
    })
  }

  const handleWishlist = () => {
    const wishlistItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      createdAt: new Date(),
    }
    toggleItem(wishlistItem)
    toast.success(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          fontSize: '13px',
          letterSpacing: '0.03em',
        },
        iconTheme: {
          primary: '#c9a96e',
          secondary: '#fff',
        },
      }
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
              {/* Left - Image */}
              <div className="relative bg-[#f5f5f0] aspect-square md:aspect-auto md:h-full min-h-[400px]">
                <Image
                  src={images[activeImageIndex] || '/images/products/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isNew && (
                    <span className="px-3 py-1.5 bg-black text-white text-[9px] font-semibold tracking-[0.15em] uppercase">
                      New
                    </span>
                  )}
                  {product.isSale && discount > 0 && (
                    <span className="px-3 py-1.5 bg-[#c9a96e] text-white text-[9px] font-semibold tracking-[0.15em] uppercase">
                      -{discount}% Off
                    </span>
                  )}
                </div>

                {/* Image thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeImageIndex === index ? 'bg-[#c9a96e] w-6' : 'bg-white/60 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Product Info */}
              <div className="p-8 md:p-10 flex flex-col">
                {/* Category */}
                <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
                  {product.category}
                </span>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mt-2 tracking-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-xl font-light text-gray-900">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 my-5" />

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {product.description}
                  </p>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-900">
                        Size
                      </span>
                      {!selectedSize && (
                        <span className="text-[10px] text-red-400 tracking-wider">Required</span>
                      )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[44px] h-10 px-3 border text-[11px] tracking-[0.1em] uppercase transition-all ${
                            selectedSize === size
                              ? 'bg-black text-white border-black'
                              : 'border-gray-300 text-gray-600 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2.5 block">
                      Color — <span className="font-normal text-gray-400">{selectedColor}</span>
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-2 border text-[11px] tracking-[0.1em] transition-all ${
                            selectedColor === color
                              ? 'bg-black text-white border-black'
                              : 'border-gray-300 text-gray-600 hover:border-black'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="flex gap-3 mt-auto">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-10 h-11 flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 h-11 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-[#c9a96e]'
                    }`}
                  >
                    {product.stock === 0 ? 'Sold Out' : 'Add to Bag'}
                  </motion.button>

                  {/* Wishlist */}
                  <motion.button
                    onClick={handleWishlist}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 ${isWishlisted ? 'fill-[#c9a96e] text-[#c9a96e]' : 'text-gray-500'}`}
                      fill={isWishlisted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </motion.button>
                </div>

                {/* Stock */}
                <p className="text-[11px] text-gray-400 tracking-wider mt-3">
                  {product.stock > 0
                    ? product.stock <= 5
                      ? `Only ${product.stock} left in stock`
                      : `${product.stock} in stock`
                    : 'Currently out of stock'}
                </p>

                {/* View Full Details Link */}
                <Link
                  href={`/shop/${product.id}`}
                  onClick={onClose}
                  className="mt-4 text-[11px] tracking-[0.15em] uppercase text-gray-400 hover:text-[#c9a96e] transition-colors border-b border-gray-300 hover:border-[#c9a96e] pb-0.5 self-start"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
