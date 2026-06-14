const express = require('express');
const axios = require('axios');
const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize payment
router.post('/initialize', async (req, res) => {
  try {
    const { email, amount, orderId, metadata } = req.body;

    // Validate input
    if (!email || !amount || !orderId) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, amount, orderId' 
      });
    }

    // Amount in pesewas (Ghana cedis * 100)
    const amountInPesewas = Math.round(amount * 100);

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amountInPesewas,
        metadata: {
          orderId,
          ...metadata
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      message: 'Payment initialization successful',
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
      reference: response.data.data.reference
    });
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Payment initialization failed',
      message: error.response?.data?.message || error.message
    });
  }
});

// Verify payment
router.post('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === 'success') {
      // TODO: Update order status in database
      // TODO: Send payment confirmation email
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentStatus: 'completed',
        reference: paymentData.reference,
        amount: paymentData.amount / 100, // Convert from pesewas to cedis
        currency: paymentData.currency,
        orderId: paymentData.metadata.orderId,
        timestamp: paymentData.paid_at
      });
    } else {
      res.json({
        success: false,
        message: 'Payment verification failed',
        paymentStatus: paymentData.status
      });
    }
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Payment verification failed',
      message: error.response?.data?.message || error.message
    });
  }
});

// Get payment details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch payment from database using payment ID or reference
    
    res.json({
      success: true,
      message: 'Payment details retrieved',
      paymentId: id,
      status: 'completed',
      amount: 0,
      currency: 'GHS',
      orderId: ''
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve payment details',
      message: error.message
    });
  }
});

// Paystack Webhook (for order status updates)
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  try {
    // Verify webhook signature
    const hash = req.headers['x-paystack-signature'];
    
    // TODO: Verify hash against PAYSTACK_SECRET_KEY
    
    const event = req.body;

    if (event.event === 'charge.success') {
      const paymentData = event.data;
      
      // TODO: Update order status to 'paid'
      // TODO: Send payment confirmation email
      // TODO: Trigger order processing
      
      console.log(`✅ Payment successful for order: ${paymentData.metadata.orderId}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
