const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

// Load environment variables (to get your MONGO_URI)
dotenv.config();

const realisticDoctors = [
  {
    name: "Dr. Sanath Perera",
    specialty: "Cardiologist",
    hospital: "Asiri Surgical Hospital",
    experience: "15 Years",
    rating: 4.9,
    patients: "2.5K+",
    fee: "Rs. 3500",
    imageUrl: "👨‍⚕️" // Using emojis temporarily for mobile UI avatars
  },
  {
    name: "Dr. Nethmi Fernando",
    specialty: "Pediatrician",
    hospital: "Hemas Hospital Wattala",
    experience: "10 Years",
    rating: 4.8,
    patients: "4K+",
    fee: "Rs. 2500",
    imageUrl: "👩‍⚕️"
  },
