# ClothingShop - Modern Fashion E-Commerce Platform

A fully responsive, modern clothing shop website built with Next.js 14, Tailwind CSS, Framer Motion, and Prisma. Features include dynamic product management, cart functionality, user authentication, admin dashboard, and smooth animations.

## 🚀 Live Demo Features

- **Responsive Design**: Mobile-first approach with full responsiveness
- **Modern Animations**: Smooth transitions and animations with Framer Motion
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Dynamic Products**: Fetch products from database with filtering and sorting
- **Shopping Cart**: Add/remove items, update quantities with local storage
- **Wishlist System**: Save favorite products
- **User Authentication**: JWT-based login/register with protected routes
- **Admin Dashboard**: Manage products, orders, and users
- **Product Details**: Rich product pages with image gallery and reviews
- **Checkout**: Order summary, address form, and payment method selection
- **Glassmorphism Navbar**: Modern sticky navigation with transparency effects

## 📋 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4 with dark mode support
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: JWT + Next Auth (optional)
- **Form Validation**: Built-in with custom utilities
- **API Calls**: Axios
- **Notifications**: React Hot Toast
- **HTTP Utilities**: Cookie management (js-cookie)

## 📁 Project Structure

```
clothingshop/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts (GET, POST)
│   │   │   │   └── [id]/route.ts (GET, PUT, DELETE)
│   │   │   ├── cart/route.ts
│   │   │   ├── orders/route.ts
│   │   │   └── admin/
│   │   │       ├── products/route.ts
│   │   │       ├── orders/route.ts
│   │   │       └── users/route.ts
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── products/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   └── users/page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── wishlist/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── navbar.tsx ✅ DONE
│   │   │   ├── footer.tsx ✅ DONE
│   │   │   ├── product-card.tsx ✅ DONE
│   │   │   ├── button.tsx
│   │   │   ├── modal.tsx
│   │   │   └── loading-skeleton.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx ✅ DONE
│   │   │   ├── featured-products.tsx
│   │   │   └── newsletter.tsx
│   │   ├── forms/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── checkout-form.tsx
│   │   │   └── product-form.tsx
│   │   └── theme-provider.tsx ✅ DONE
│   ├── hooks/
│   │   └── index.ts ✅ DONE
│   ├── lib/
│   │   └── utils/
│   │       ├── auth.ts ✅ DONE
│   │       ├── helpers.ts ✅ DONE
│   │       └── constants.ts
│   ├── store/
│   │   └── index.ts ✅ DONE
│   └── types/
│       └── index.ts ✅ DONE
├── prisma/
│   └── schema.prisma ✅ DONE
├── public/
├── .env ✅ DONE
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn installed
- PostgreSQL database (or use SQLite for development)
- Git

### Installation

1. **Open the project**

```bash
cd clothingshop
```

2. **Dependencies installed**

Dependencies are already installed. To reinstall:

```bash
npm install
```

3. **Environment variables configured**

`.env` file is already created with Prisma Cloud PostgreSQL setup.

4. **Start the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Using Local PostgreSQL

If you want to use a local PostgreSQL database instead:

1. Install PostgreSQL locally
2. Create a database:

```sql
CREATE DATABASE clothingshop;
```

3. Update `.env`:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/clothingshop"
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

### Using SQLite (Development)

For quick development without PostgreSQL:

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:

```
DATABASE_URL="file:./dev.db"
```

3. Create the database:

```bash
npx prisma migrate dev --name init
```

## 🎯 What's Already Implemented

✅ **Completed**:
- Next.js 14 setup with App Router
- Tailwind CSS with dark mode
- Framer Motion animations
- Zustand stores (cart, wishlist, auth, theme)
- Type definitions and interfaces
- Authentication utilities (password hashing, JWT)
- Helper functions (formatting, validation)
- Custom React hooks (useAuth, useApi, useFetch, etc.)
- Theme Provider with dark/light mode
- Navbar with glassmorphism effect
- Footer with newsletter signup
- Product Card component with animations
- Hero section with animated text
- Home page with featured products
- Products API endpoint with filtering/sorting
- Product detail API endpoint
- Registration API endpoint

## 📝 Remaining Pages/Features To Build

Create these files in your IDE to complete the project:

### 1. **Shop Page** (`src/app/shop/page.tsx`)

```typescript
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/common/product-card'
import { Product, ProductFilters } from '@/types'
import axios from 'axios'

export default function ShopPage() {
  // Implement:
  // - Product grid display
  // - Filter sidebar (category, price, size, color)
  // - Sort options
  // - Search functionality
  // - Pagination
  // - Loading states
}
```

### 2. **Product Detail Page** (`src/app/shop/[id]/page.tsx`)

Implement:
- Product image gallery with zoom
- Add to cart with size/color selection
- Quantity selector
- Related products
- Reviews section
- Wishlist button

### 3. **Cart Page** (`src/app/cart/page.tsx`)

Implement:
- Display cart items
- Update quantities
- Remove items
- Clear cart button
- Cart total with tax/shipping
- Continue shopping button
- Checkout button

### 4. **Checkout Page** (`src/app/checkout/page.tsx`)

Implement:
- Order summary
- Address form
- Payment method selection
- Order confirmation
- Success animation

### 5. **Login Page** (`src/app/login/page.tsx` or `src/app/(auth)/login/page.tsx`)

Implement:
- Email and password inputs
- Form validation
- Error handling
- Redirect to dashboard on success
- Register link

### 6. **Register Page** (`src/app/register/page.tsx`)

Implement:
- Name, email, password inputs
- Password confirmation
- Terms and conditions checkbox
- Error feedback
- Auto-login after registration

### 7. **Profile Page** (`src/app/profile/page.tsx`)

Implement:
- User information display
- Edit profile form
- Address book
- Order history
- Account settings

### 8. **Wishlist Page** (`src/app/wishlist/page.tsx`)

Implement:
- Display wishlist items
- Remove from wishlist
- Add to cart from wishlist
- Empty state message

### 9. **Admin Dashboard** (`src/app/admin/page.tsx`)

Implement:
- Dashboard overview with stats
- Quick navigation links
- Sales chart
- Recent orders
- Admin-only access check

### 10. **Admin Products** (`src/app/admin/products/page.tsx`)

Implement:
- Product list table
- Add new product button
- Edit product functionality
- Delete product with confirmation
- Image upload
- Bulk actions

### More API Routes

Create these additional API routes:

```
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts
src/app/api/auth/me/route.ts
src/app/api/cart/route.ts
src/app/api/orders/route.ts
src/app/api/admin/products/route.ts
src/app/api/admin/orders/route.ts
src/app/api/admin/users/route.ts
```

## 🔑 API Endpoints Overview

```
# Products
GET  /api/products?limit=10&skip=0&category=Men&sortBy=newest
GET  /api/products?search=shirt&minPrice=10&maxPrice=100
GET  /api/products/[id]
POST /api/products (admin)

# Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

# Cart (will implement)
GET  /api/cart
POST /api/cart
PUT  /api/cart/[id]
DELETE /api/cart/[id]

# Orders
GET  /api/orders
POST /api/orders
GET  /api/orders/[id]
```

## 🎨 Design Highlights

- **Color Scheme**: Purple & Pink gradients
- **Typography**: Modern sans-serif fonts
- **Spacing**: Consistent 8px grid
- **Animations**: Smooth hover effects, page transitions
- **Responsiveness**: Mobile-first design
- **Accessibility**: ARIA labels, semantic HTML

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Environment variables for secrets
- ⏳ Protected routes (to implement)
- ⏳ CSRF protection (to implement)
- ⏳ Rate limiting (to implement)

## 📱 Responsive Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

## 🚀 Performance Optimizations

- Image optimization with Next.js Image
- Code splitting with dynamic imports
- Lazy loading for images and modals
- Server-side rendering where appropriate
- Caching strategies

## 🌐 SEO Features

- ✅ Meta tags in layout
- ✅ Dynamic meta tags for products
- ✅ Open Graph tags
- ⏳ XML sitemap (to implement)
- ⏳ Robots.txt (to implement)

## 🎓 Learning Resources

- Next.js: https://nextjs.org/learn
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Prisma: https://www.prisma.io/docs/
- TypeScript: https://www.typescriptlang.org/docs/

## 📚 Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio       # Open Prisma Studio
npx prisma migrate dev  # Create and apply migrations
npx prisma db push      # Push schema to database

# Linting
npm run lint             # Run ESLint

# Type checking
npx tsc --noEmit        # Check TypeScript errors
```

## 🐛 Common Issues & Solutions

**Issue**: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue**: Database connection error
- Verify DATABASE_URL is correct
- Check if PostgreSQL service is running
- Try connecting with psql command

**Issue**: Prisma client not generated
```bash
npx prisma generate
```

**Issue**: Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📧 Sample Test Credentials

Once you've created test users via the register page:
- Email: test@example.com
- Password: Test123!@#

## 🎯 Next Steps

1. ✅ Review the existing components and styles
2. ✅ Start the dev server: `npm run dev`
3. Create the remaining pages (start with Shop page)
4. Implement API endpoints
5. Add form validations
6. Set up authentication flow
7. Test on mobile devices
8. Deploy to Vercel

## 📄 License

MIT License - feel free to use this for your projects!

## 🤝 Need Help?

- Check the component examples in `src/components/`
- Review the type definitions in `src/types/`
- Look at the working API routes for patterns
- Use the hooks from `src/hooks/` for data fetching

---

**Built with Next.js, Tailwind CSS, Framer Motion & Prisma** ❤️

Happy Coding! 🚀


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
