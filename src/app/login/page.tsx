'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuthStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.email.trim()) {
      toast.error('Please enter your email')
      return
    }

    if (!formData.password) {
      toast.error('Please enter your password')
      return
    }

    try {
      await login(formData.email, formData.password)
      toast.success('Login successful!')
      router.push('/shop')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Login Heading */}
        <div className="text-center mb-12">
          <span className="text-[10px] text-[#c9a96e] font-semibold tracking-[0.25em] uppercase">Welcome Back</span>
          <h1 className="text-4xl font-light text-gray-900 mt-2 tracking-tight">Sign <span className="italic font-light font-[family-name:var(--font-playfair)]">In</span></h1>
          <div className="w-12 h-px bg-[#c9a96e] mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 mb-12">
          {/* Email and Password Fields Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-gray-900 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-gray-900 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-gray-600 hover:text-gray-900 transition"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-[#c9a96e] text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-12 py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="text-center space-y-2">
          <div>
            <Link href="/register" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
              Sign Up
            </Link>
          </div>
          <div>
            <Link href="/forgot-password" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
              Recover Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
