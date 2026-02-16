'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@/lib/utils/helpers'
import type { Product } from '@/types'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
      setHasSearched(false)
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=20`)
      const data = await res.json()
      if (data.success) {
        setResults(data.products)
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      searchProducts(value)
    }, 300)
  }

  const popularSearches = ['T-Shirt', 'Pants', 'Oversized', 'Slim Fit', 'Cargo']

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[80] bg-white max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="border-b border-gray-100">
              <div className="max-w-[900px] mx-auto px-4 py-5 flex items-center gap-4">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                  className="flex-1 text-lg font-light tracking-wide text-gray-900 placeholder:text-gray-300 outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('')
                      setResults([])
                      setHasSearched(false)
                      inputRef.current?.focus()
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 px-2.5 py-1"
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Results area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[900px] mx-auto px-4 py-6">
                {/* Loading */}
                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-5 h-5 border-2 border-gray-200 border-t-[#c9a96e] rounded-full animate-spin" />
                  </div>
                )}

                {/* No query - show popular searches */}
                {!loading && !hasSearched && (
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 block mb-4">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setQuery(term)
                            searchProducts(term)
                          }}
                          className="text-[11px] tracking-[0.1em] uppercase text-gray-600 border border-gray-200 px-4 py-2 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {!loading && hasSearched && results.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400 block mb-5">
                      {results.length} Result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {results.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                        >
                          <Link
                            href={`/shop/${product.id}`}
                            onClick={onClose}
                            className="group block"
                          >
                            <div className="aspect-[3/4] relative bg-[#f5f5f0] overflow-hidden mb-3">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                              />
                              {product.isNew && (
                                <span className="absolute top-2 left-2 text-[9px] font-semibold tracking-[0.15em] uppercase bg-black text-white px-2 py-1">
                                  New
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 tracking-[0.1em] uppercase block">
                              {product.category}
                            </span>
                            <h4 className="text-sm text-gray-900 mt-0.5 line-clamp-1 group-hover:text-[#c9a96e] transition-colors">
                              {product.name}
                            </h4>
                            <span className="text-sm text-gray-900 font-medium mt-1 block">
                              {formatPrice(product.price)}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* View all link */}
                    <div className="text-center mt-8 pb-4">
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600 border-b border-gray-300 pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
                      >
                        View All Results →
                      </Link>
                    </div>
                  </div>
                )}

                {/* No results */}
                {!loading && hasSearched && results.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="text-sm text-gray-400 mb-1">No results found for &ldquo;{query}&rdquo;</p>
                    <p className="text-[11px] text-gray-300 tracking-wide">Try searching for a different term</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
