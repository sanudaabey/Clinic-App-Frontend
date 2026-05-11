const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice'); 
// NEW: Import the Notification model so we can create alerts!
const Notification = require('../models/Notification'); 

// STRIPE DEPENDENCY
const stripe = require('stripe')('sk_test_51TL770Axgv4sFwCFUgBYpr7RpaYbpiBqcnqmk1rjfNfkEpCdflC4bBlL7E3a0dtpdTjaKcyJgtDX1Wh5w1Uf6l9w00FwrljmBw'); 

