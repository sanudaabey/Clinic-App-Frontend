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
