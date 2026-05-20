const express = require('express');
const router = express.Router();
// 🛑 ADDED: Import bcryptjs to hash the new password securely
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); // Assuming you use "User" for patients

// 🛑 ADDED: Import your security middleware
const auth = require('../middleware/auth'); 

