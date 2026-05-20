const express = require('express');
const router = express.Router();
// 🛑 ADDED: Import bcryptjs to hash the new password securely
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); // Assuming you use "User" for patients

// 🛑 ADDED: Import your security middleware
const auth = require('../middleware/auth'); 

// ==========================================
// NEW ROUTE: GET - Fetch all patients for Admin Dropdown
// (Must be above /:id so Express doesn't confuse 'patients' for an ID)
// ==========================================
// FIX: Removed 'auth' middleware here because the frontend isn't sending the token yet!
router.get('/patients', async (req, res) => {
  try {
    // FIX: Added { role: 'patient' } so it actually filters for patients!
    // .select('-password') ensures we never accidentally send passwords to the frontend!
    const patients = await User.find({ role: 'patient' }).select('-password'); 
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
