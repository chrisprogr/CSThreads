'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setSending(true)
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSending(false)

    toast.success('Message sent successfully!', {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '13px',
        letterSpacing: '0.03em',
      },
      iconTheme: { primary: '#c9a96e', secondary: '#fff' },
    })

    setFormData({ name: '', email: '', subject: '', message: '' })
  }

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
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mt-3 tracking-tight">
              Contact <span className="italic font-light font-[family-name:var(--font-playfair)]">Us</span>
            </h1>
            <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-6" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">
              We&apos;d love to hear from you
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 tracking-tight">
              Let&apos;s start a{' '}
              <span className="italic font-light font-[family-name:var(--font-playfair)]">conversation</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mt-6 max-w-md">
              Have a question about our products, sizing, or orders? We&apos;re here to help. 
              Reach out through the form or contact us directly.
            </p>

            <div className="w-full h-px bg-gray-200 my-10" />

            <div className="space-y-8">
              {[
                {
                  label: 'Email',
                  value: 'hello@csthreads.com',
                  icon: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
                },
                {
                  label: 'Phone',
                  value: '+63 912 345 6789',
                  icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
                },
                {
                  label: 'Location',
                  value: 'Manila, Philippines',
                  icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-200">
                    <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 block">{item.label}</span>
                    <span className="text-sm text-gray-900 mt-0.5 block">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-gray-200 my-10" />

            {/* Business hours */}
            <div>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-900 block mb-4">Business Hours</span>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monday – Friday</span>
                  <span className="text-gray-900">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-gray-900">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#f5f5f0] p-8 md:p-10">
              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-8">Send a Message</h3>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 block mb-2">
                    Name <span className="text-[#c9a96e]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 block mb-2">
                    Email <span className="text-[#c9a96e]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 block mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e] transition-colors text-gray-600"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Returns</option>
                    <option value="sizing">Sizing Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 block mb-2">
                    Message <span className="text-[#c9a96e]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-white border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 hover:bg-[#c9a96e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
