'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils/helpers'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCartStore()
  const totalPrice = getTotalPrice()
  const freeShippingThreshold = 2000
  const shippingCost = totalPrice >= freeShippingThreshold ? 0 : 150
  const tax = (totalPrice + shippingCost) * 0.12
  const finalTotal = totalPrice + shippingCost + tax

  const handleRemove = (id: string) => {
    removeItem(id)
    toast.success('Item removed from bag')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-10">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase mb-6">
            <Link href="/" className="text-gray-400 hover:text-[#c9a96e] transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">Shopping Bag</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight"
          >
            Shopping <span className="italic font-light font-[family-name:var(--font-playfair)]">Bag</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-10 md:py-16">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h2 className="text-xl font-light text-gray-900 mb-2 tracking-wide">Your bag is empty</h2>
            <p className="text-sm text-gray-400 mb-8">Discover our collection and add your favorites</p>
            <Link href="/shop">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="bg-black text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a96e] transition-colors"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2"
            >
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-gray-200">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">Product</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 text-center">Quantity</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 text-right">Total</span>
                <span className="w-8" />
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-gray-100"
                  >
                    {/* Product */}
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-[#f5f5f0] flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.imageUrl || '/images/products/placeholder.jpg'}
                          alt={item.product.name}
                          width={80}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <Link href={`/shop/${item.product.id}`}>
                          <h3 className="text-sm font-medium text-gray-900 hover:text-[#c9a96e] transition-colors line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex gap-3 mt-1">
                          {item.size && <span className="text-[11px] text-gray-400">Size: {item.size}</span>}
                          {item.color && <span className="text-[11px] text-gray-400">Color: {item.color}</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{formatPrice(item.product.price)}</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex justify-center">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-9 h-9 flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <p className="text-sm font-medium text-gray-900 text-right">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6">
                <Link href="/shop" className="text-[11px] tracking-[0.15em] uppercase text-gray-400 hover:text-[#c9a96e] transition-colors border-b border-gray-300 hover:border-[#c9a96e] pb-0.5">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={() => { clearCart(); toast.success('Bag cleared') }}
                  className="text-[11px] tracking-[0.15em] uppercase text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#f5f5f0] p-8 sticky top-24">
                <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-8">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-300/50">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Subtotal ({getTotalItems()} items)</span>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Shipping</span>
                    <span className={`text-sm font-medium ${shippingCost === 0 ? 'text-[#c9a96e]' : 'text-gray-900'}`}>
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Tax (12%)</span>
                    <span className="text-sm font-medium text-gray-900">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-sm font-semibold tracking-wider uppercase text-gray-900">Total</span>
                  <span className="text-lg font-light text-gray-900">{formatPrice(finalTotal)}</span>
                </div>

                {/* Free shipping progress */}
                {shippingCost > 0 && (
                  <div className="mb-6">
                    <p className="text-[11px] text-gray-500 mb-2">
                      Add {formatPrice(freeShippingThreshold - totalPrice)} more for free shipping
                    </p>
                    <div className="w-full h-1 bg-gray-300/50 overflow-hidden">
                      <div
                        className="h-full bg-[#c9a96e] transition-all duration-500"
                        style={{ width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {shippingCost === 0 && (
                  <p className="text-[11px] text-[#c9a96e] mb-6 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    Free shipping applied
                  </p>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 hover:bg-[#c9a96e] transition-colors"
                >
                  Proceed to Checkout
                </motion.button>

                <div className="flex items-center justify-center gap-4 mt-6">
                  {['Visa', 'Mastercard', 'GCash'].map((method) => (
                    <span key={method} className="text-[10px] text-gray-400 tracking-wider">{method}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
