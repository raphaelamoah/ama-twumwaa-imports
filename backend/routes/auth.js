const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // TODO: Check if user already exists in database
    // TODO: Hash password
    // TODO: Save user to database

    const token = jwt.sign(
      { userId: 'user_id', email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        firstName,
        lastName,
        email,
        phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // TODO: Fetch user from database
    // TODO: Compare password with hashed password
    // TODO: If invalid, return error

    const token = jwt.sign(
      { userId: 'user_id', email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: 'user_id',
        email,
        firstName: 'User',
        role: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user profile
router.get('/profile', (req, res) => {
  try {
    // TODO: Add JWT authentication middleware
    // TODO: Fetch user from database
    
    res.json({
      success: true,
      user: {
        id: 'user_id',
        firstName: 'User',
        lastName: 'Name',
        email: 'user@example.com',
        phone: '+233XXXXXXXXX',
        role: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    // TODO: Add JWT authentication middleware
    // TODO: Validate input
    // TODO: Update user in database

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        firstName,
        lastName,
        phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change password
router.post('/change-password', (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // TODO: Add JWT authentication middleware
    // TODO: Verify old password
    // TODO: Hash new password
    // TODO: Update in database

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
