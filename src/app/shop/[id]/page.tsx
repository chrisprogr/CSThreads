'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice, calculateDiscount } from '@/lib/utils/helpers'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data.product)
        if (response.data.product?.sizes?.length > 0) {
          setSelectedSize(response.data.product.sizes[0])
        }
        if (response.data.product?.colors?.length > 0) {
          setSelectedColor(response.data.product.colors[0])
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params])

  const handleAddToCart = () => {
    if (!product) return

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
    toast.success(`${product.name} added to bag`)
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (!product) return

    const wishlistItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      createdAt: new Date(),
    }

    toggleItem(wishlistItem)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] text-gray-400 tracking-[0.2em] uppercase">Loading</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <p className="text-gray-400 text-sm tracking-wider">Product not found</p>
        <Link href="/shop" className="text-[11px] text-[#c9a96e] tracking-[0.15em] uppercase border-b border-[#c9a96e] pb-0.5 hover:text-[#b89a5f] transition-colors">
          Back to Shop
        </Link>
      </div>
    )
  }

  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0
  const isWishlisted = isInWishlist(product.id)
  const images = product.images || [product.imageUrl]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase">
          <Link href="/" className="text-gray-400 hover:text-[#c9a96e] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/shop" className="text-gray-400 hover:text-[#c9a96e] transition-colors">Shop</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/shop?category=${product.category}`} className="text-gray-400 hover:text-[#c9a96e] transition-colors">{product.category}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-[1400px] mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-[#f5f5f0] overflow-hidden aspect-[3/4]">
              <Image
                src={images[activeImageIndex] || '/images/products/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
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
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 overflow-hidden border transition-all ${
                      activeImageIndex === index ? 'border-[#c9a96e]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image src={img} alt={`View ${index + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mt-2 tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-light text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-6" />

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-900">Size</span>
                  <button className="text-[10px] text-gray-400 tracking-wider uppercase hover:text-[#c9a96e] transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 border text-[11px] tracking-[0.1em] uppercase transition-all ${
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
              <div className="mb-8">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-900 mb-3 block">
                  Color — <span className="font-normal text-gray-400">{selectedColor}</span>
                </span>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2.5 border text-[11px] tracking-[0.1em] transition-all ${
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
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 h-12 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all ${
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
                className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
              >
                <svg
                  className={`w-5 h-5 ${isWishlisted ? 'fill-[#c9a96e] text-[#c9a96e]' : 'text-gray-500'}`}
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

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-6" />

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12', title: 'Free Shipping', desc: 'On orders over ₱2,000' },
                { icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182', title: '30-Day Returns', desc: 'Hassle-free return policy' },
                { icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z', title: 'Secure Checkout', desc: 'Encrypted payment processing' },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#c9a96e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-900">{feature.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
