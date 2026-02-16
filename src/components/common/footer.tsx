'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  const shopLinks = [
    { label: 'All Products', href: '/shop' },
    { label: 'T-Shirts', href: '/shop?category=T-Shirts' },
    { label: 'Pants', href: '/shop?category=Pants' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
  ]

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ]

  const supportLinks = [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/faq' },
  ]

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="text-xl tracking-[0.15em] uppercase font-light">
                CS<span className="italic font-[family-name:var(--font-playfair)]">Threads</span>
                <span className="text-[#c9a96e] text-xs align-super ml-0.5">®</span>
              </span>
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed mb-6 max-w-xs">
              A premium lifestyle brand crafting quality essentials for the modern individual. Bold style, timeless design.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/_vvtope/' },
                { label: 'Facebook', href: 'https://web.facebook.com/christopher.solis.180873' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-[10px] text-gray-500 tracking-[0.15em] uppercase hover:text-[#c9a96e] transition-colors"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-gray-400 hover:text-[#c9a96e] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-gray-400 hover:text-[#c9a96e] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white mb-5">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-gray-400 hover:text-[#c9a96e] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-gray-500 tracking-wider">
              © {new Date().getFullYear()} CSThreads. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-gray-500 tracking-wider">Visa</span>
              <span className="text-[11px] text-gray-500 tracking-wider">Mastercard</span>
              <span className="text-[11px] text-gray-500 tracking-wider">GCash</span>
              <span className="text-[11px] text-gray-500 tracking-wider">Maya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
