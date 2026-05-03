const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit'); // IMPORT PDFKIT HERE

