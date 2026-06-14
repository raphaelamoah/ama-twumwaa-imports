const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send order confirmation email
router.post('/send-order-confirmation', async (req, res) => {
  try {
    const { customerEmail, customerName, orderId, orderItems, totalAmount } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Confirmation - Ama Twumwaa Imports #${orderId}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear ${customerName},</p>
        <p>Your order has been received and is being processed.</p>
        <h3>Order Details:</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Amount:</strong> GHS ${totalAmount}</p>
        <h3>Items:</h3>
        <ul>
          ${orderItems.map(item => `<li>${item.name} x ${item.quantity} - GHS ${item.price}</li>`).join('')}
        </ul>
        <p>You will receive a notification once your order is shipped.</p>
        <p>Thank you for shopping with us!</p>
        <p>Ama Twumwaa Imports Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Order confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email', message: error.message });
  }
});

// Send payment confirmation email
router.post('/send-payment-confirmation', async (req, res) => {
  try {
    const { customerEmail, customerName, orderId, amount, paymentReference } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Payment Confirmation - Ama Twumwaa Imports #${orderId}`,
      html: `
        <h2>Payment Received!</h2>
        <p>Dear ${customerName},</p>
        <p>Your payment has been successfully received and verified.</p>
        <h3>Payment Details:</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Amount Paid:</strong> GHS ${amount}</p>
        <p><strong>Payment Reference:</strong> ${paymentReference}</p>
        <p>Your order will be processed and shipped shortly.</p>
        <p>Thank you!</p>
        <p>Ama Twumwaa Imports Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Payment confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email', message: error.message });
  }
});

// Send order status update email
router.post('/send-order-status-update', async (req, res) => {
  try {
    const { customerEmail, customerName, orderId, status, trackingNumber } = req.body;

    let statusMessage = '';
    if (status === 'shipped') {
      statusMessage = `Your order has been shipped! Tracking number: ${trackingNumber}`;
    } else if (status === 'delivered') {
      statusMessage = 'Your order has been delivered. Thank you for your purchase!';
    } else if (status === 'cancelled') {
      statusMessage = 'Your order has been cancelled. Please contact us for more information.';
    } else {
      statusMessage = `Your order status is now: ${status}`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `Order Status Update - Ama Twumwaa Imports #${orderId}`,
      html: `
        <h2>Order Status Update</h2>
        <p>Dear ${customerName},</p>
        <p>${statusMessage}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p>If you have any questions, please contact our support team.</p>
        <p>Ama Twumwaa Imports Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Order status email sent successfully'
    });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email', message: error.message });
  }
});

// Send welcome email
router.post('/send-welcome', async (req, res) => {
  try {
    const { customerEmail, customerName } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Welcome to Ama Twumwaa Imports!',
      html: `
        <h2>Welcome!</h2>
        <p>Dear ${customerName},</p>
        <p>Thank you for joining Ama Twumwaa Imports. We're excited to have you!</p>
        <p>You can now browse our wide selection of quality imports and place orders.</p>
        <p>If you need any assistance, feel free to contact our support team.</p>
        <p>Happy shopping!</p>
        <p>Ama Twumwaa Imports Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Welcome email sent successfully'
    });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email', message: error.message });
  }
});

module.exports = router;
