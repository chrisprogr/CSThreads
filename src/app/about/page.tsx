'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 py-24 md:py-32 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mt-3 tracking-tight">
              About <span className="italic font-light font-[family-name:var(--font-playfair)]">CSThreads</span>
            </h1>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-24 px-4">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 tracking-tight">
              Crafting quality essentials for the{' '}
              <span className="italic font-light font-[family-name:var(--font-playfair)]">modern individual</span>
            </h2>
            <p className="text-gray-500 mt-8 leading-relaxed max-w-2xl mx-auto">
              CSThreads was born from a simple idea — that everyday clothing should feel premium without the premium price tag. 
              We believe in timeless design, quality materials, and a bold approach to style that speaks louder than any logo.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto">
              Based in the Philippines, we're a lifestyle brand that caters to a diverse community of individuals who value 
              comfort, authenticity, and understated elegance in everything they wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 tracking-tight">
              Our <span className="italic font-light font-[family-name:var(--font-playfair)]">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Quality First',
                desc: 'Every piece is crafted with carefully selected fabrics and meticulous attention to detail, ensuring comfort and durability that lasts.',
                icon: '◇',
              },
              {
                title: 'Timeless Design',
                desc: 'We create pieces that transcend trends. Our designs are minimal, versatile, and built to be staples in your wardrobe for years.',
                icon: '◇',
              },
              {
                title: 'Accessible Style',
                desc: 'Premium clothing shouldn\'t break the bank. We\'re committed to offering quality at prices that make sense for everyone.',
                icon: '◇',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="text-[#c9a96e] text-3xl mb-5 block">{value.icon}</span>
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '16+', label: 'Products' },
              { number: '2K+', label: 'Happy Customers' },
              { number: '100%', label: 'Quality Materials' },
              { number: '₱0', label: 'Shipping Over ₱2K' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-light text-gray-900">{stat.number}</span>
                <p className="text-[11px] text-gray-400 tracking-[0.15em] uppercase mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-[#1a1a1a]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              Join the Movement
            </span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 text-white tracking-tight">
              Ready to elevate your{' '}
              <span className="italic font-light font-[family-name:var(--font-playfair)]">style</span>?
            </h2>
            <Link href="/shop" className="inline-block mt-8">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a96e] hover:text-white transition-colors"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
