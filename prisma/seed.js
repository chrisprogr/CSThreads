const path = require('path')
const module = require(path.join(__dirname, '..', 'src', 'generated', 'prisma', 'client.ts'))
const { PrismaClient } = module
const bcryptjs = require('bcryptjs')

const prisma = new PrismaClient()

async function hashPassword(password) {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

async function main() {
  try {
    console.log('Starting database seed...')

    // Clear existing data
    await prisma.cartItem.deleteMany({})
    await prisma.wishlist.deleteMany({})
    await prisma.review.deleteMany({})
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.category.deleteMany({})

    console.log('Cleared existing data')

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Men',
          slug: 'men',
          description: 'Clothing for men',
          image: 'https://images.unsplash.com/photo-1506629082632-25b7652139db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Women',
          slug: 'women',
          description: 'Clothing for women',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        },
      }),
      prisma.category.create({
        data: {
          name: 'Accessories',
          slug: 'accessories',
          description: 'Fashion accessories',
          image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        },
      }),
    ])

    console.log('Created categories')

    // Create sample products
    const products = await Promise.all([
      // T-shirts
      prisma.product.create({
        data: {
          name: 'Classic Cotton Tee',
          description: 'Premium quality classic cotton tee. Perfect for everyday wear.',
          price: 399,
          originalPrice: 599,
          imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 50,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Black', 'White', 'Navy']),
          rating: 4.5,
          tags: JSON.stringify(['t-shirt', 'casual', 'basic']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Minimal Logo Tshirt',
          description: 'Minimalist design tshirt with subtle logo. Premium comfort and style.',
          price: 449,
          originalPrice: 649,
          imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 45,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['White', 'Black', 'Gray']),
          rating: 4.6,
          tags: JSON.stringify(['t-shirt', 'minimal', 'logo']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Oversized Street Tee',
          description: 'Relaxed oversized fit perfect for street style. Made from quality cotton.',
          price: 499,
          originalPrice: 749,
          imageUrl: 'https://images.unsplash.com/photo-1609333862171-190ecbb40a75?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1609333862171-190ecbb40a75?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 40,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Black', 'Beige', 'Cream']),
          rating: 4.7,
          tags: JSON.stringify(['t-shirt', 'oversized', 'street']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Vintage Washed Tshirt',
          description: 'Classic vintage washed tshirt with timeless appeal. Comfortable everyday wear.',
          price: 529,
          originalPrice: 799,
          imageUrl: 'https://images.unsplash.com/photo-1473621038790-b9c5dba30015?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1473621038790-b9c5dba30015?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 35,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Navy', 'Charcoal', 'Olive']),
          rating: 4.8,
          tags: JSON.stringify(['t-shirt', 'vintage', 'washed']),
          isNew: false,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Premium Basic Tee',
          description: 'Premium quality basic tee for everyday essentials. Superior comfort and durability.',
          price: 599,
          originalPrice: 899,
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 55,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['White', 'Black', 'Navy', 'Gray']),
          rating: 4.9,
          tags: JSON.stringify(['t-shirt', 'premium', 'basic']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Graphic Print Shirt',
          description: 'Bold graphic print shirt with artistic designs. Stand out in style.',
          price: 549,
          originalPrice: 849,
          imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 30,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Black', 'White', 'Dark Gray']),
          rating: 4.5,
          tags: JSON.stringify(['t-shirt', 'graphic', 'print']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Relaxed Fit Pocket Tee',
          description: 'Comfortable relaxed fit tee with front pocket detail. Casual and practical.',
          price: 469,
          originalPrice: 699,
          imageUrl: 'https://images.unsplash.com/photo-1608639066605-52e9b4e6bc21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1608639066605-52e9b4e6bc21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 50,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Khaki', 'Stone', 'Sage']),
          rating: 4.6,
          tags: JSON.stringify(['t-shirt', 'relaxed', 'pocket']),
          isNew: false,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Athletic Performance Tee',
          description: 'High-performance athletic tee designed for sports and workouts. Moisture-wicking fabric.',
          price: 579,
          originalPrice: 899,
          imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 40,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Black', 'White', 'Navy']),
          rating: 4.7,
          tags: JSON.stringify(['t-shirt', 'athletic', 'performance']),
          isNew: true,
          isSale: false,
        },
      }),
      // Pants
      prisma.product.create({
        data: {
          name: 'Slim Fit Denim Jeans',
          description: 'Classic slim fit denim jeans with premium quality. Perfect for any occasion.',
          price: 999,
          originalPrice: 1499,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 35,
          category: 'Men',
          sizes: JSON.stringify(['28', '30', '32', '34', '36', '38']),
          colors: JSON.stringify(['Dark Blue', 'Light Blue', 'Black']),
          rating: 4.8,
          tags: JSON.stringify(['jeans', 'slim', 'denim']),
          isNew: false,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Straight Cut Jeans',
          description: 'Timeless straight cut jeans with comfortable fit. Quality denim construction.',
          price: 1049,
          originalPrice: 1549,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 40,
          category: 'Men',
          sizes: JSON.stringify(['28', '30', '32', '34', '36', '38']),
          colors: JSON.stringify(['Dark Blue', 'Black', 'Medium Blue']),
          rating: 4.7,
          tags: JSON.stringify(['jeans', 'straight', 'classic']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Baggy Curve Jeans',
          description: 'Modern baggy jeans with curved fit. Perfect for contemporary street style.',
          price: 1079,
          originalPrice: 1599,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 30,
          category: 'Men',
          sizes: JSON.stringify(['28', '30', '32', '34', '36', '38']),
          colors: JSON.stringify(['Black', 'Dark Blue', 'Gray']),
          rating: 4.6,
          tags: JSON.stringify(['jeans', 'baggy', 'curve']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Cargo Utility Pants',
          description: 'Practical cargo utility pants with multiple pockets. Durable and functional.',
          price: 1199,
          originalPrice: 1799,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 25,
          category: 'Men',
          sizes: JSON.stringify(['28', '30', '32', '34', '36', '38']),
          colors: JSON.stringify(['Olive', 'Black', 'Khaki']),
          rating: 4.5,
          tags: JSON.stringify(['cargo', 'utility', 'pants']),
          isNew: true,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Relaxed Fit Trousers',
          description: 'Comfortable relaxed fit trousers for everyday comfort. Versatile style.',
          price: 1050,
          originalPrice: 1550,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 35,
          category: 'Men',
          sizes: JSON.stringify(['28', '30', '32', '34', '36', '38']),
          colors: JSON.stringify(['Gray', 'Black', 'Navy', 'Tan']),
          rating: 4.7,
          tags: JSON.stringify(['trousers', 'relaxed', 'comfortable']),
          isNew: false,
          isSale: false,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Track Pants',
          description: 'Comfortable track pants for casual wear. Perfect for relaxation and workouts.',
          price: 999,
          originalPrice: 1499,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
          images: JSON.stringify(['https://images.unsplash.com/photo-1542272604-787c62d465d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60']),
          stock: 45,
          category: 'Men',
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Black', 'Gray', 'Navy']),
          rating: 4.6,
          tags: JSON.stringify(['track', 'pants', 'casual']),
          isNew: true,
          isSale: false,
        },
      }),
    ])

    console.log('Created sample products')

    // Create sample users
    const user1 = await prisma.user.create({
      data: {
        email: 'john@example.com',
        password: await hashPassword('password123'),
        name: 'John Doe',
        role: 'CUSTOMER',
      },
    })

    const user2 = await prisma.user.create({
      data: {
        email: 'jane@example.com',
        password: await hashPassword('password123'),
        name: 'Jane Smith',
        role: 'CUSTOMER',
      },
    })

    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: await hashPassword('admin123'),
        name: 'Admin User',
        role: 'ADMIN',
      },
    })

    console.log('Created sample users')

    // Create sample reviews
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excellent quality! Very satisfied with this purchase.',
        userId: user1.id,
        productId: products[0].id,
      },
    })

    await prisma.review.create({
      data: {
        rating: 4,
        comment: 'Great product, arrived quickly.',
        userId: user2.id,
        productId: products[1].id,
      },
    })

    console.log('Created reviews')

    // Create sample wishlist items
    await prisma.wishlist.create({
      data: {
        userId: user1.id,
        productId: products[3].id,
      },
    })

    console.log('Created wishlist items')

    // Create sample order
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        status: 'DELIVERED',
        totalAmount: 159.97,
        shippingCost: 10,
        tax: 12.97,
        paymentMethod: 'Credit Card',
        paymentStatus: 'PAID',
        shippingAddress: '123 Main St, New York, NY 10001',
        userId: user1.id,
      },
    })

    // Create order items
    await prisma.orderItem.create({
      data: {
        quantity: 2,
        price: 29.99,
        size: 'M',
        color: 'Black',
        orderId: order.id,
        productId: products[0].id,
      },
    })

    await prisma.orderItem.create({
      data: {
        quantity: 1,
        price: 100,
        size: 'One Size',
        color: 'Black',
        orderId: order.id,
        productId: products[3].id,
      },
    })

    console.log('Database seeding completed successfully!')
    console.log('\nSample users created:')
    console.log('- Customer: john@example.com / password123')
    console.log('- Customer: jane@example.com / password123')
    console.log('- Admin: admin@example.com / admin123')
    console.log('\n8 products with reviews, wishlist, and orders are ready!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
