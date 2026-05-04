const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit'); // IMPORT PDFKIT HERE

// CREATE
router.post('/', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) { 
    res.status(500).json({ message: "Error adding invoice" }); 
  }
});

// GET: Admin fetches ALL invoices in the clinic
router.get('/', async (req, res) => {
  try {
    const allInvoices = await Invoice.find();
    res.status(200).json(allInvoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Patient fetches ONLY their own invoices
router.get('/user/:userId', async (req, res) => {
  try {
    const userInvoices = await Invoice.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(userInvoices);
  } catch (error) { 
    res.status(500).json({ message: "Server Error" }); 
  }
});
