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
