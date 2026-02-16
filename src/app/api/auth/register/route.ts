import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Please provide email, password, and name' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email' },
        { status: 400 }
      )
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Database setup removed - return stub response
    const mockToken = generateToken('mock-user-id')

    return NextResponse.json(
      {
        message: 'Database setup removed',
        user: {
          id: 'mock-user-id',
          email,
          name,
          avatar: null,
          role: 'CUSTOMER',
        },
        token: mockToken,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
