const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) { 
    console.error("PRESCRIPTION SAVE ERROR:", error); 
    res.status(500).json({ message: "Error adding prescription" }); 
  }
});
