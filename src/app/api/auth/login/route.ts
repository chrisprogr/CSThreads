import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/db'
import { comparePassword, generateToken } from '@/lib/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please provide email and password' },
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
          name: 'Mock User',
          avatar: null,
          role: 'CUSTOMER',
        },
        token: mockToken,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
