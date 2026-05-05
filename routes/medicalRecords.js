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

    // 🛑 ADDED: Create a global notification for the patient when a record is made
    try {
      const newNoti = new Notification({
        userId: req.body.userId,
        userRole: 'patient', 
        title: req.body.status === 'Pending' ? 'Action Required: Pending Record' : 'New Health Record Ready',
        message: req.body.status === 'Pending' 
          ? `Dr. ${req.body.doctorName} has added a pending ${req.body.recordType} that requires your attention.`
          : `Dr. ${req.body.doctorName} has added a new ${req.body.recordType} to your health history.`,
        isRead: false
      });
