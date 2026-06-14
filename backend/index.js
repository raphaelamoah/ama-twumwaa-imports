const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    service: 'Ama Twumwaa Imports API'
  });
});

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/emails', require('./routes/emails'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║ 🚀 Ama Twumwaa Imports API             ║
║    Server running on port ${PORT}         ║
╚════════════════════════════════════════╝
  `);
  console.log(`📧 Email service: ${process.env.GMAIL_USER}`);
  console.log(`💳 Paystack integrated for Ghana payments`);
  console.log(`☁️  Cloudinary integrated for image storage`);
  console.log(`📊 Admin dashboard available at /api/admin`);
});
