# GhanaTech Store - Frontend

A Next.js 14 e-commerce frontend for the GhanaTech Store.

## Tech Stack

- **Next.js 14** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Axios** - API calls
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

3. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

- `/` - Home page
- `/products` - Products listing
- `/products/[id]` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/orders` - Order history
- `/login` - Login
- `/register` - Registration
- `/admin` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders

## Features

- User authentication (JWT)
- Product browsing with filters
- Shopping cart
- Checkout with multiple payment methods
- Order tracking
- Admin dashboard
- Mobile Money payment (Ghana-specific)
- Responsive design

## Ghana-Specific Features

- Ghana Cedis (GHS) currency
- All 16 regions for shipping
- Ghana Post GPS address support
- Mobile Money integration (MTN MoMo, Vodafone Cash, AirtelTigo Money)
- Ghana phone number validation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
