import { create } from 'zustand'
import { getTokenFromCookie, setTokenToCookie, removeTokenFromCookie } from '@/lib/utils/auth'

interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  register: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await response.json()
      setTokenToCookie(data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true })
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      setTokenToCookie(data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    removeTokenFromCookie()
    set({ user: null, token: null, isAuthenticated: false })
  },

  setUser: (user: User | null) => {
    set({ user })
  },

  setToken: (token: string | null) => {
    set({ token })
  },

  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const token = getTokenFromCookie()
      if (token) {
        set({ token, isAuthenticated: true })
      }
    }
  },
}))
