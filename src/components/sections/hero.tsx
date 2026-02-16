'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function HeroSection() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&h=1080&auto=format&fit=crop&q=90',
      subtitle: 'New Season',
      title: 'Elevate Your\nWardrobe',
      cta: 'Discover Collection',
    },
    {
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&h=1080&auto=format&fit=crop&q=90',
      subtitle: 'Premium Quality',
      title: 'Timeless\nEssentials',
      cta: 'Shop T-Shirts',
    },
    {
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1920&h=1080&auto=format&fit=crop&q=90',
      subtitle: 'Street Style',
      title: 'Bold &\nAuthentic',
      cta: 'Shop Pants',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].image}
              alt={`Hero slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Subtitle badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-1.5 border border-[#c9a96e]/60 text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase font-medium">
                  {slides[currentIndex].subtitle}
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 whitespace-pre-line"
              >
                {slides[currentIndex].title}
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-16 h-[2px] bg-[#c9a96e] mb-8 origin-left"
              />

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-premium group px-8 py-3.5 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-white transition-all duration-500"
                  >
                    {slides[currentIndex].cta}
                    <span className="inline-block ml-3 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators - right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group flex items-center gap-3"
          >
            <span className={`text-[10px] tracking-wider font-medium transition-all duration-300 ${
              index === currentIndex ? 'text-white' : 'text-white/0 group-hover:text-white/60'
            }`}>
              0{index + 1}
            </span>
            <span className={`block h-[1px] transition-all duration-500 ${
              index === currentIndex ? 'w-8 bg-[#c9a96e]' : 'w-4 bg-white/40 group-hover:bg-white/70'
            }`} />
          </button>
        ))}
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </motion.div>
    </section>
  )
}
