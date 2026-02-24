const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/1fi_emi'

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.emiPlan.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()

  // iPhone 17 Pro
  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      description: 'The most powerful iPhone ever with A19 Pro chip, titanium design, and pro camera system.',
      variants: {
        create: [
          {
            color: 'Deep Blue',
            storage: '256GB',
            price: 127400,
            mrp: 134900,
            imageUrl: '/images/iphone-17-pro-deep-blue.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 44967, interestRate: 0,    cashback: 7500 },
                { tenure: 6,  monthlyAmount: 22483, interestRate: 0,    cashback: 7500 },
                { tenure: 12, monthlyAmount: 11242, interestRate: 0,    cashback: 7500 },
                { tenure: 24, monthlyAmount: 5621,  interestRate: 0,    cashback: 7500 },
                { tenure: 36, monthlyAmount: 4297,  interestRate: 10.5, cashback: 7500 },
                { tenure: 48, monthlyAmount: 3385,  interestRate: 10.5, cashback: 7500 },
                { tenure: 60, monthlyAmount: 2842,  interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            color: 'Silver',
            storage: '256GB',
            price: 127400,
            mrp: 134900,
            imageUrl: '/images/iphone-17-pro-silver.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 44967, interestRate: 0,    cashback: 7500 },
                { tenure: 6,  monthlyAmount: 22483, interestRate: 0,    cashback: 7500 },
                { tenure: 12, monthlyAmount: 11242, interestRate: 0,    cashback: 7500 },
                { tenure: 24, monthlyAmount: 5621,  interestRate: 0,    cashback: 7500 },
                { tenure: 36, monthlyAmount: 4297,  interestRate: 10.5, cashback: 7500 },
                { tenure: 48, monthlyAmount: 3385,  interestRate: 10.5, cashback: 7500 },
                { tenure: 60, monthlyAmount: 2842,  interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            color: 'Cosmic Orange',
            storage: '512GB',
            price: 147400,
            mrp: 154900,
            imageUrl: '/images/iphone-17-pro-cosmic-orange.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 51967, interestRate: 0,    cashback: 7500 },
                { tenure: 6,  monthlyAmount: 25983, interestRate: 0,    cashback: 7500 },
                { tenure: 12, monthlyAmount: 12992, interestRate: 0,    cashback: 7500 },
                { tenure: 24, monthlyAmount: 6496,  interestRate: 0,    cashback: 7500 },
                { tenure: 36, monthlyAmount: 4968,  interestRate: 10.5, cashback: 7500 },
                { tenure: 48, monthlyAmount: 3912,  interestRate: 10.5, cashback: 7500 },
                { tenure: 60, monthlyAmount: 3285,  interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  })

  // Samsung Galaxy S25 Ultra
  const samsung = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-galaxy-s25-ultra',
      brand: 'Samsung',
      description: 'The ultimate Galaxy experience with Snapdragon 8 Elite, built-in S Pen, and 200MP camera.',
      variants: {
        create: [
          {
            color: 'Titanium Black',
            storage: '256GB',
            price: 124999,
            mrp: 134999,
            imageUrl: '/images/samsung-galaxy-s25-ultra-Titanium-Black.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 43999, interestRate: 0,    cashback: 5000 },
                { tenure: 6,  monthlyAmount: 21999, interestRate: 0,    cashback: 5000 },
                { tenure: 12, monthlyAmount: 10999, interestRate: 0,    cashback: 5000 },
                { tenure: 24, monthlyAmount: 5499,  interestRate: 0,    cashback: 5000 },
                { tenure: 36, monthlyAmount: 4204,  interestRate: 10.5, cashback: 5000 },
                { tenure: 48, monthlyAmount: 3312,  interestRate: 10.5, cashback: 5000 },
                { tenure: 60, monthlyAmount: 2781,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
          {
            color: 'Titanium Whitesilver',
            storage: '256GB',
            price: 124999,
            mrp: 134999,
            imageUrl: '/images/samsung-galaxy-s25-ultra-Titanium-Whitesilver.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 43999, interestRate: 0,    cashback: 5000 },
                { tenure: 6,  monthlyAmount: 21999, interestRate: 0,    cashback: 5000 },
                { tenure: 12, monthlyAmount: 10999, interestRate: 0,    cashback: 5000 },
                { tenure: 24, monthlyAmount: 5499,  interestRate: 0,    cashback: 5000 },
                { tenure: 36, monthlyAmount: 4204,  interestRate: 10.5, cashback: 5000 },
                { tenure: 48, monthlyAmount: 3312,  interestRate: 10.5, cashback: 5000 },
                { tenure: 60, monthlyAmount: 2781,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
          {
            color: 'Titanium Gray',
            storage: '512GB',
            price: 144999,
            mrp: 154999,
            imageUrl: '/images/samsung-galaxy-s25-ultra-Titanium-Gray.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 50999, interestRate: 0,    cashback: 5000 },
                { tenure: 6,  monthlyAmount: 25499, interestRate: 0,    cashback: 5000 },
                { tenure: 12, monthlyAmount: 12749, interestRate: 0,    cashback: 5000 },
                { tenure: 24, monthlyAmount: 6374,  interestRate: 0,    cashback: 5000 },
                { tenure: 36, monthlyAmount: 4871,  interestRate: 10.5, cashback: 5000 },
                { tenure: 48, monthlyAmount: 3836,  interestRate: 10.5, cashback: 5000 },
                { tenure: 60, monthlyAmount: 3222,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
          {
            color: 'Titanium Silverblue',
            storage: '512GB',
            price: 144999,
            mrp: 154999,
            imageUrl: '/images/samsung-galaxy-s25-ultra-Titanium-Silverblue.png',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 50999, interestRate: 0,    cashback: 5000 },
                { tenure: 6,  monthlyAmount: 25499, interestRate: 0,    cashback: 5000 },
                { tenure: 12, monthlyAmount: 12749, interestRate: 0,    cashback: 5000 },
                { tenure: 24, monthlyAmount: 6374,  interestRate: 0,    cashback: 5000 },
                { tenure: 36, monthlyAmount: 4871,  interestRate: 10.5, cashback: 5000 },
                { tenure: 48, monthlyAmount: 3836,  interestRate: 10.5, cashback: 5000 },
                { tenure: 60, monthlyAmount: 3222,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
        ],
      },
    },
  })

  // OnePlus 13
  const oneplus = await prisma.product.create({
    data: {
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      description: 'Flagship performance with Snapdragon 8 Elite, Hasselblad cameras, and 100W SUPERVOOC charging.',
      variants: {
        create: [
          {
            color: 'Arctic Dawn',
            storage: '256GB',
            price: 69999,
            mrp: 74999,
            imageUrl: '/images/oneplus-13-arctic-dawn.webp',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 24666, interestRate: 0,    cashback: 3000 },
                { tenure: 6,  monthlyAmount: 12333, interestRate: 0,    cashback: 3000 },
                { tenure: 12, monthlyAmount: 6166,  interestRate: 0,    cashback: 3000 },
                { tenure: 24, monthlyAmount: 3083,  interestRate: 0,    cashback: 3000 },
                { tenure: 36, monthlyAmount: 2357,  interestRate: 10.5, cashback: 3000 },
                { tenure: 48, monthlyAmount: 1856,  interestRate: 10.5, cashback: 3000 },
                { tenure: 60, monthlyAmount: 1559,  interestRate: 10.5, cashback: 3000 },
              ],
            },
          },
          {
            color: 'Black Eclipse',
            storage: '256GB',
            price: 69999,
            mrp: 74999,
            imageUrl: '/images/oneplus-13-black-eclipse.webp',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 24666, interestRate: 0,    cashback: 3000 },
                { tenure: 6,  monthlyAmount: 12333, interestRate: 0,    cashback: 3000 },
                { tenure: 12, monthlyAmount: 6166,  interestRate: 0,    cashback: 3000 },
                { tenure: 24, monthlyAmount: 3083,  interestRate: 0,    cashback: 3000 },
                { tenure: 36, monthlyAmount: 2357,  interestRate: 10.5, cashback: 3000 },
                { tenure: 48, monthlyAmount: 1856,  interestRate: 10.5, cashback: 3000 },
                { tenure: 60, monthlyAmount: 1559,  interestRate: 10.5, cashback: 3000 },
              ],
            },
          },
          {
            color: 'Midnight Ocean',
            storage: '512GB',
            price: 79999,
            mrp: 84999,
            imageUrl: '/images/oneplus-13-midnight-ocean.webp',
            emiPlans: {
              create: [
                { tenure: 3,  monthlyAmount: 28166, interestRate: 0,    cashback: 3000 },
                { tenure: 6,  monthlyAmount: 14083, interestRate: 0,    cashback: 3000 },
                { tenure: 12, monthlyAmount: 7041,  interestRate: 0,    cashback: 3000 },
                { tenure: 24, monthlyAmount: 3520,  interestRate: 0,    cashback: 3000 },
                { tenure: 36, monthlyAmount: 2691,  interestRate: 10.5, cashback: 3000 },
                { tenure: 48, monthlyAmount: 2119,  interestRate: 10.5, cashback: 3000 },
                { tenure: 60, monthlyAmount: 1780,  interestRate: 10.5, cashback: 3000 },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Seeded:', iphone.name, samsung.name, oneplus.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })