const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Doctor = require('../models/Doctor'); // 🛑 ADDED: Import the Doctor model
