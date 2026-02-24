# 1Fi EMI Store

Buy premium smartphones with flexible EMI plans backed by mutual funds.

## 🔗 Live Demo
**https://emi-product-platform.vercel.app/**

## 🛠️ Tech Stack
- Next.js 14
- PostgreSQL + Prisma
- Tailwind CSS
- Vercel

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your DATABASE_URL

# Push database schema
npx prisma db push

# Seed database
npm run seed

# Run development server
npm run dev
```

Open http://localhost:3000

## 📁 Project Structure

```
src/
├── app/
│   ├── api/products/          # API routes
│   ├── products/[slug]/       # Dynamic product pages
│   └── page.js                # Home page with filters
├── components/                # React components
└── lib/                       # Utils & Prisma client

prisma/
├── schema.prisma              # Database schema
└── seed.js                    # Sample data
```

## 🚀 API Endpoints

- `GET /api/products` - List all products
- `GET /api/products/[slug]` - Get product by slug with variants & EMI plans

### Example Response
```json
{
  "id": "...",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "variants": [
    {
      "color": "Deep Blue",
      "storage": "256GB",
      "price": 127400,
      "images": ["/images/iphone-17-pro-deep-blue.png"],
      "emiPlans": [
        {
          "tenure": 3,
          "monthlyAmount": 44967,
          "interestRate": 0,
          "cashback": 7500
        }
      ]
    }
  ]
}
``` 

## 🗄️ Database Schema

**Product** → **ProductVariant** → **EmiPlan**

Each product has multiple variants (colors/storage), and each variant has multiple EMI plans.

---

Built for 1Fi Full Stack Developer Assignment
