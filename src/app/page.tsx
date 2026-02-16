'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/sections/hero'
import { ProductCard } from '@/components/common/product-card'
import { Product } from '@/types'
import axios from 'axios'

const categories = [
  {
    name: 'T-Shirts',
    slug: 'T-Shirts',
    image: '/images/products/Oversized Street Tee.jpg',
    description: 'Premium tees for every occasion',
  },
  {
    name: 'Pants',
    slug: 'Pants',
    image: '/images/products/Slim Fit Denim Jeans.jpg',
    description: 'From denim to cargo — find your fit',
  },
]

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products?limit=8&featured=true')
        setFeaturedProducts(response.data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Ticker */}
      <div className="bg-black py-3 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[11px] text-white/70 tracking-[0.3em] uppercase mx-8">
              Free Shipping Over ₱2,000 &nbsp;✦&nbsp; New Arrivals Weekly &nbsp;✦&nbsp; Premium Quality &nbsp;✦&nbsp; Philippine Made
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Products Section */}
      <section className="py-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          >
            <div>
              <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
                Curated Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-light mt-3 text-gray-900 tracking-tight">
                Featured <span className="italic font-light font-[family-name:var(--font-playfair)]">Products</span>
              </h2>
            </div>
            <Link href="/shop" className="mt-4 md:mt-0">
              <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500 hover:text-[#c9a96e] transition-colors border-b border-gray-300 hover:border-[#c9a96e] pb-1">
                View All Products →
              </span>
            </Link>
          </motion.div>

          {/* Decorative divider */}
          <div className="w-full h-px bg-gray-200 mb-12" />

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="bg-[#f5f5f0] aspect-[3/4] animate-pulse" />
                  <div className="h-3 bg-gray-100 w-20 animate-pulse" />
                  <div className="h-4 bg-gray-100 w-32 animate-pulse" />
                  <div className="h-3 bg-gray-100 w-16 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-sm tracking-wider">No products available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 bg-[#f5f5f0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              Browse
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-3 text-gray-900 tracking-tight">
              Shop by <span className="italic font-light font-[family-name:var(--font-playfair)]">Category</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} href={`/shop?category=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative overflow-hidden group cursor-pointer h-[500px]"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase font-medium">
                      {category.description}
                    </span>
                    <h3 className="text-3xl md:text-4xl text-white font-light mt-2 tracking-wide">
                      {category.name}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-white/80 tracking-[0.2em] uppercase group-hover:text-[#c9a96e] transition-colors">
                      <span>Shop Now</span>
                      <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </div>
                    <div className="w-12 h-px bg-[#c9a96e] mt-4 group-hover:w-20 transition-all duration-500" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: '◇', title: 'Premium Quality', desc: 'Carefully curated fabrics and materials for lasting comfort' },
              { icon: '◇', title: 'Free Shipping', desc: 'Complimentary shipping on all orders over ₱2,000' },
              { icon: '◇', title: 'Easy Returns', desc: '30-day hassle-free return policy on all purchases' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-[#c9a96e] text-2xl mb-4">{item.icon}</span>
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-[#1a1a1a]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 text-white tracking-tight">
              Join the <span className="italic font-light font-[family-name:var(--font-playfair)]">Community</span>
            </h2>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </p>
            <div className="flex mt-8 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-5 py-3.5 placeholder-gray-500 focus:outline-none focus:border-[#c9a96e] transition-colors"
              />
              <button className="bg-[#c9a96e] text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-3.5 hover:bg-[#b89a5f] transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
