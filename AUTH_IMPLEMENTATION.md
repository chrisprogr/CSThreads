# Login & Register System Documentation

## 🎨 Features Implemented

### ✅ Beautiful & Responsive Design
- **Gradient backgrounds** with modern color schemes
- **Dark mode support** using Tailwind CSS
- **Mobile-first responsive design** that works on all screen sizes
- **Smooth animations** using Framer Motion
- **Professional card-based UI** with shadows and hover effects

### ✅ Fully Functional Authentication
- **User Registration** with email validation and password hashing
- **User Login** with JWT token generation
- **Password visibility toggle** (show/hide buttons)
- **Form validation** on client and server side
- **Error handling** with toast notifications
- **Loading states** during authentication

### ✅ Security Features
- Password hashing using bcryptjs (10 salt rounds)
- JWT token generation with configurable expiration
- Token storage in secure HTTP cookies
- Email uniqueness validation
- Password minimum length validation (6 characters)

### ✅ State Management
- Zustand store for global auth state
- Automatic token initialization on app load
- User data persistence
- Auth provider for app-wide integration

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── register/
│   │       │   └── route.ts        # Register API endpoint
│   │       └── login/
│   │           └── route.ts        # Login API endpoint
│   ├── login/
│   │   └── page.tsx                # Login page component
│   ├── register/
│   │   └── page.tsx                # Register page component
│   └── layout.tsx                  # Updated with AuthProvider & Toaster
├── components/
│   ├── auth-provider.tsx           # Auth state initializer
│   └── common/navbar.tsx           # Updated with auth support
├── lib/
│   ├── db.ts                       # Prisma client singleton
│   └── utils/
│       └── auth.ts                 # Authentication utilities (hash, jwt, etc.)
└── store/
    ├── index.ts                    # Updated with auth store export
    └── authStore.ts                # Complete auth store with login/register
```

## 🚀 How It Works

### Registration Flow
1. User fills in name, email, password, and confirm password
2. Client-side validation checks:
   - Name is not empty
   - Email is valid format
   - Password is at least 6 characters
   - Passwords match
3. Form submits to `/api/auth/register`
4. Server validates and:
   - Checks if email already exists
   - Hashes the password
   - Creates user in database
   - Generates JWT token
5. Token stored in cookie automatically
6. User redirected to `/shop`
7. Toast notification shows success/error

### Login Flow
1. User enters email and password
2. Client-side validation checks:
   - Email is provided
   - Password is provided
3. Form submits to `/api/auth/login`
4. Server validates and:
   - Finds user by email
   - Compares password with hash
   - Generates JWT token
5. Token stored in cookie automatically
6. User redirected to `/shop`
7. Toast notification shows success/error

### Auth State Management
1. `AuthProvider` component initializes auth on app load
2. It checks for existing token in cookies
3. Updates Zustand store with auth state
4. Navbar displays login/register links or user menu based on auth state
5. User can logout and token is cleared

## 🔐 Environment Variables Required

```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
DATABASE_URL=your-postgresql-connection-string
```

## 🎯 API Endpoints

### Register Endpoint
**POST** `/api/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "avatar": null
  },
  "token": "eyJhbGc..."
}
```

### Login Endpoint
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "cuid...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "avatar": null
  },
  "token": "eyJhbGc..."
}
```

## 🎨 UI Components

### Register Page (`/register`)
- Beautiful gradient header with icon
- Full name input field
- Email input field with validation
- Password input with toggle visibility
- Confirm password input with toggle visibility
- Submit button with loading state
- Link to login page
- Terms of service link

### Login Page (`/login`)
- Beautiful gradient header with icon (different color from register)
- Email input field
- Password input with toggle visibility
- "Forgot password?" link
- Remember me checkbox
- Submit button with loading state
- Social login placeholders
- Link to register page

## 🔄 How to Use

### For Users
1. Go to `/register` to create a new account
2. Fill in your details and submit
3. Automatically logged in and redirected to shop
4. Click on profile icon in navbar to see user menu
5. Click "Logout" to sign out

### For Developers
```typescript
// Import the auth store
import { useAuthStore } from '@/store/authStore'

// Use in components
export function MyComponent() {
  const { user, isAuthenticated, login, register, logout, isLoading } = useAuthStore()
  
  // user: null | { id, email, name, role, avatar }
  // isAuthenticated: boolean
  // isLoading: boolean (during auth operations)
  
  return (
    <>
      {isAuthenticated ? (
        <p>Welcome {user?.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </>
  )
}
```

## 🎨 Customization Options

### Colors
- Register page: Blue to Purple gradient
- Login page: Emerald to Teal gradient
- Change in the gradient classes in the components

### Animations
- Page entrance animation (fade + slight scale)
- Form fields animate in sequentially
- Button hover and tap animations
- Smooth transitions throughout

### Validation Rules
Edit in the page components or API routes:
- Minimum password length (currently 6)
- Email regex pattern
- Required field checks

## 🔒 Security Considerations

1. **Password Hashing**: Uses bcryptjs with 10 salt rounds
2. **JWT Tokens**: Signed with JWT_SECRET, configurable expiration
3. **Cookie Storage**: HTTP-only cookies for token (recommended to set in production)
4. **Input Validation**: Both client and server-side validation
5. **Database**: Uses Prisma ORM for safe queries

## 🚦 Next Steps

1. **Run Prisma migrations**: `npx prisma migrate dev`
2. **Start the dev server**: `npm run dev`
3. **Test registration**: Go to `http://localhost:3000/register`
4. **Test login**: Go to `http://localhost:3000/login`

## 📝 Notes

- Tokens are valid for 30 days by default (configurable via JWT_EXPIRE)
- Users are created with CUSTOMER role by default
- Password reset feature can be added later
- Email verification can be added as an enhancement
- Two-factor authentication can be implemented
