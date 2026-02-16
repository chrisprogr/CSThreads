'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore, useAuthStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchOverlay } from './search-overlay'

export function Navbar() {
  const { getTotalItems } = useCartStore()
  const { user, logout } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cartItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-white'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top announcement bar */}
        <div className="bg-[#1a1a1a] text-white text-center py-2 text-xs tracking-[0.2em] uppercase font-light">
          Free shipping on orders over ₱2,000 &mdash; <Link href="/shop" className="underline underline-offset-2 hover:text-[#c9a96e] transition-colors">Shop Now</Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 hover:text-black transition-all duration-300 relative group">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c9a96e] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-xl md:text-2xl font-black tracking-tight text-black">
                CS<span className="font-light italic">Threads</span><span className="text-[#c9a96e] text-sm align-super ml-0.5">®</span>
              </span>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              {/* Search */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-black transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </motion.button>

              {/* User */}
              <div className="relative">
                <motion.button
                  onClick={() => {
                    if (!user) {
                      window.location.href = '/login'
                    } else {
                      setShowUserMenu(!showUserMenu)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-sm shadow-xl border border-gray-100 py-1"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-900 tracking-wide">{user.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-black transition-colors tracking-wide">
                        Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-black transition-colors tracking-wide">
                        Orders
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link href="/admin" className="block px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-black transition-colors tracking-wide">
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors tracking-wide"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-black transition-colors relative"
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  {cartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 bg-[#c9a96e] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      {cartItems}
                    </motion.span>
                  )}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white pt-32 px-8"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-light tracking-wide text-gray-800 hover:text-[#c9a96e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
