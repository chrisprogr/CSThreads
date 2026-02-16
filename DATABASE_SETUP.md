# Database Setup Guide

## Quick Start (Choose ONE option)

### Option 1: Railway (Easiest - Recommended)
Railway provides free PostgreSQL hosting with automatic connections.

1. **Sign up:** https://railway.app
2. **Create a new project** → Add PostgreSQL
3. **Copy the connection string** from Railway dashboard
4. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   JWT_SECRET="your-secret-key-here"
   JWT_EXPIRE="30d"
   ```
5. **Run migrations:**
   ```bash
   npm run db:migrate
   ```
6. **Seed with sample data:**
   ```bash
   npm run db:seed
   ```

---

### Option 2: Supabase (Free PostgreSQL with Dashboard)
Supabase is a Firebase alternative with a powerful PostgreSQL database.

1. **Sign up:** https://supabase.com
2. **Create a new project** (select PostgreSQL)
3. **Go to Settings → Database → Connection Strings** (use "URI")
4. **Copy the connection string** and update `.env.local`
5. **Run the same migration and seed commands above**

---

### Option 3: Local PostgreSQL (If installed on your computer)

**Requirements:**
- PostgreSQL installed locally
- PostgreSQL running (check: `psql --version`)

**Steps:**
1. **Create a database:**
   ```bash
   createdb clothingshop
   ```

2. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clothingshop"
   JWT_SECRET="your-secret-key-here"
   JWT_EXPIRE="30d"
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Seed with sample data:**
   ```bash
   npm run db:seed
   ```

---

## After Setup

### View Database (Prisma Studio)
```bash
npm run db:studio
```
This opens a beautiful UI at http://localhost:5555 to view and edit your data.

---

## Available Commands

```bash
# Create and run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open database studio UI
npm run db:studio

# View Prisma documentation
npx prisma docs
```

---

## What Gets Seeded

After running `npm run db:seed`, your database will have:

### Users (for testing login)
- **Customer 1:** john@example.com / password123
- **Customer 2:** jane@example.com / password123
- **Admin:** admin@example.com / admin123

### Products (8 sample items)
- Classic Black T-Shirt
- Elegant White Dress
- Denim Jeans Blue
- Leather Handbag
- Casual Sneakers
- Summer Blouse
- Winter Jacket
- Silk Scarf

### Categories
- Men
- Women
- Accessories

### Sample Data
- Reviews on products
- Wishlist items
- Sample orders with items

---

## Environment Variables Needed

Create or update `.env.local` with:

```env
# Required for database connection
DATABASE_URL="your-postgresql-url"

# Required for JWT authentication
JWT_SECRET="your-secret-key-here"
JWT_EXPIRE="30d"
```

---

## Troubleshooting

### Error: "Database connection refused"
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running (if local)
- Check username and password

### Error: "Migration failed"
- Delete `prisma/migrations` folder
- Run `npm run db:migrate` again

### Error: "Cannot find module ts-node"
- Install: `npm install -D ts-node`

### Need to reset database?
```bash
# Drop all tables and recreate
npx prisma migrate reset
```

---

## Next Steps

1. ✅ Set up your PostgreSQL database
2. ✅ Update `.env.local` with connection string
3. ✅ Run `npm run db:migrate`
4. ✅ Run `npm run db:seed`
5. ✅ Test login with sample credentials
6. 🚀 Start building!

---

## Database Schema

Your app automatically includes:

- **Users** - Authentication & profiles
- **Products** - Store inventory
- **Categories** - Product organization
- **Cart Items** - Shopping cart management
- **Orders** - Customer orders
- **Order Items** - Items in each order
- **Reviews** - Product reviews
- **Wishlist** - Saved items

All relationships are pre-configured and ready to use!
