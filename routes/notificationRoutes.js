const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Doctor = require('../models/Doctor'); // 🛑 ADDED: Import the Doctor model

// GET all notifications for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // 1. We start by looking for the User Account ID
    let searchIds = [userId];

    // 2. THE BRIDGE: Check if this user is also a Doctor
    const doctorProfile = await Doctor.findOne({ userId: userId });
    
    // 3. If they are a doctor, add their Doctor Profile ID to our search list!
    if (doctorProfile) {
      searchIds.push(doctorProfile._id.toString());
    }

    // 4. Fetch notifications where the userId matches ANY of the IDs in our list
    const notifications = await Notification.find({ userId: { $in: searchIds } })
                                          .sort({ createdAt: -1 }); // Newest first
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
});

