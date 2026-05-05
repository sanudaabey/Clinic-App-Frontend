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

// --- NEW PDF GENERATION ROUTE ---
router.get('/:id/pdf', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).send('Invoice not found');

    // Tell the browser to expect a PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice._id}.pdf`);

    // Create the PDF
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res); 

    // Header
    doc.fontSize(22).font('Helvetica-Bold').text('SLIIT CLINICCARE', { align: 'center', color: '#4F46E5' });
    doc.fontSize(10).font('Helvetica').fillColor('#64748B').text('123 University Way, Malabe, Sri Lanka', { align: 'center' });
    doc.moveDown();
    
    // Divider Line
    doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).strokeColor('#E2E8F0').stroke();
    doc.moveDown();

    // Title
    doc.fontSize(18).font('Helvetica-Bold').fillColor('#0F172A').text('OFFICIAL INVOICE', { align: 'center' });
    doc.moveDown(2);

    // Invoice Details
    doc.fontSize(12).font('Helvetica-Bold').text('Invoice Details:');
    doc.font('Helvetica').fillColor('#334155')
       .text(`Invoice Ref: ${invoice._id}`)
       .text(`Date Issued: ${new Date().toLocaleDateString()}`)
       .text(`Patient ID: ${invoice.userId}`)
       .text(`Status: ${invoice.status.toUpperCase()}`);
    doc.moveDown(2);
