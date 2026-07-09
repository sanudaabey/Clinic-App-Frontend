const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

// Load environment variables (to get your MONGO_URI)
dotenv.config();
