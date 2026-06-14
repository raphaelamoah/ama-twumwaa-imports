# Ama Twumwaa Imports - E-Commerce Platform

A complete e-commerce website for Ama Twumwaa Imports dress business in Ghana.

## ✨ Features

- 🛍️ **Product Catalog** - Display dresses with images, prices, and availability
- 💳 **Paystack Integration** - Accept payments via Visa, Mastercard, and Mobile Money (Ghana)
- 📧 **Automated Emails** - Customized order confirmations and payment receipts
- 📊 **Admin Dashboard** - Manage orders, sales, and products
- 🏷️ **Availability Labels** - Mark dresses as in-store or order-only
- ☁️ **Cloudinary Integration** - Cloud storage for 45+ dress images
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

## 🛠 Tech Stack

- **Frontend**: Next.js 14 + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Free on Railway/Render)
- **Payments**: Paystack (Ghana)
- **Email**: Nodemailer + Gmail
- **Image Storage**: Cloudinary (25GB free tier)
- **Hosting**: Vercel (Frontend) + Railway (Backend)

## 📋 Business Details

- **Business Name**: Ama Twumwaa Imports
- **Business Email**: graceaning02@gmail.com
- **Payment Gateway**: Paystack
- **Region**: Ghana
- **Product Images**: 45 dresses (Cloudinary)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/raphaelamoah/ama-twumwaa-imports.git
cd ama-twumwaa-imports
```

2. **Install dependencies**
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

3. **Set up environment variables**
```bash
# Backend
cd backend
cp .env.example .env
# Add your credentials to .env

# Frontend
cd ../frontend
cp .env.example .env.local
```

4. **Run development servers**
```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend  
cd backend && npm run dev
```

Visit `http://localhost:3000`

## 📦 Setup Guides

### 1. Paystack Account (Ghana Payments)
- Sign up: https://dashboard.paystack.com
- Get API keys from dashboard
- Add to `.env` as `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY`

### 2. Cloudinary Account (Image Storage)
- Sign up: https://cloudinary.com (25GB free)
- Upload your 45 dress images
- Get credentials and add to `.env`

### 3. Gmail App Password (Email Receipts)
- Enable 2FA: https://myaccount.google.com/security
- Create App Password: https://myaccount.google.com/apppasswords
- Use: graceaning02@gmail.com
- Add password to `.env` as `GMAIL_PASSWORD`

### 4. PostgreSQL Database
- Free tier: https://railway.app or https://render.com
- Create database named `ama_twumwaa`
- Add connection string to `.env` as `DATABASE_URL`

## 📁 Project Structure

```
ama-twumwaa-imports/
├── frontend/                 # Next.js application
│   ├── pages/               # Pages and API routes
│   ├── components/          # React components
│   ├── public/              # Static files
│   ├── styles/              # CSS files
│   └── package.json
├── backend/                 # Express API server
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── middleware/          # Custom middleware
│   ├── templates/           # Email templates
│   └── package.json
├── database/                # Database setup
│   ├── schema.sql          # Database schema
│   └── migrations/         # Database migrations
└── docs/                   # Documentation
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

### Payments (Paystack)
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify/:reference` - Verify payment
- `GET /api/payments/:id` - Get payment details

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/orders` - All orders
- `GET /api/admin/sales` - Sales analytics

### Emails
- `POST /api/emails/send-order-confirmation` - Send order email
- `POST /api/emails/send-payment-receipt` - Send payment email

## 📧 Email Templates

### Order Confirmation Email
- Order ID
- Items ordered with prices
- Total amount
- Order status
- Payment instructions

### Payment Receipt Email
- Transaction reference
- Amount paid
- Payment method
- Payment date & time
- Next steps

Both emails are:
- Mobile-responsive
- Professional HTML formatted
- Branded with Ama Twumwaa Imports
- Customizable

## 🚀 Deployment

### Frontend (Vercel - Free)
```bash
npm run build
vercel deploy
```

### Backend (Railway - Free)
1. Connect GitHub repo to Railway
2. Select `backend` directory
3. Add environment variables
4. Deploy automatically

### Database (Railway - Free)
- PostgreSQL included with Railway free tier
- 5GB storage

## 📊 Admin Dashboard Features

- View all orders
- Update order status
- View sales analytics
- Manage products
- View customer information
- Generate reports

## 🛍️ Customer Features

- Browse product catalog
- Search and filter dresses
- View product details with images
- Add to cart
- Secure checkout
- Multiple payment options (Paystack/Mobile Money)
- View order history
- Track order status
- Receive email receipts

## 🔒 Security

- JWT authentication
- Bcrypt password hashing
- Environment variables for secrets
- Paystack SSL encryption
- CORS protection
- Input validation

## 📞 Support & Questions

Email: graceaning02@gmail.com

---

**Created by Raphael Amoah for Ama Twumwaa Imports © 2024**
