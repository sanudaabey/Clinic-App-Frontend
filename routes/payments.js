const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice'); 
// NEW: Import the Notification model so we can create alerts!
const Notification = require('../models/Notification'); 

// STRIPE DEPENDENCY
const stripe = require('stripe')('sk_test_51TL770Axgv4sFwCFUgBYpr7RpaYbpiBqcnqmk1rjfNfkEpCdflC4bBlL7E3a0dtpdTjaKcyJgtDX1Wh5w1Uf6l9w00FwrljmBw'); 

// 1. Create a Payment Intent (FOR MOBILE)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const amountInCents = Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', 
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. STRIPE CHECKOUT SESSION (FOR WEB)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { invoiceId, amount, userId } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Invoice Payment`,
              description: `Payment for Invoice ID: ${invoiceId.substring(0, 8)}`,
            },
            unit_amount: Math.round(Number(amount) * 100), 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:8081/invoices?success=true&invoiceId=${invoiceId}&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:8081/invoices?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});
