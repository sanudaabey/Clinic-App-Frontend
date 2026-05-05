const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');
const Notification = require('../models/Notification'); // 🛑 ADDED: Import Notification model

