const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');
const Notification = require('../models/Notification'); // 🛑 ADDED: Import Notification model

// CREATE
router.post('/', async (req, res) => {
  try {
    // Bulletproof date check
    if (!req.body.date || req.body.date.trim() === '') {
      req.body.date = new Date().toISOString().split('T')[0]; // Gets YYYY-MM-DD
    }

    const newRecord = new MedicalRecord(req.body);
    await newRecord.save();

