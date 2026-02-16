'use client'

import React, { useEffect } from 'react'
import { useThemeStore } from '@/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // Force light theme
    if (typeof window !== 'undefined') {
      setTheme(false) // false = light mode
    }
  }, [setTheme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }, [])

  return <>{children}</>
}
