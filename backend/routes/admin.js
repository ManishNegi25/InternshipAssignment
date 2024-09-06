const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Make sure to require jwt
const User = require('../models/User');
const Availability = require('../models/Availability');
const Session = require('../models/Session');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users." });
  }
});

// Get user availability
router.get('/availability/:userId', async (req, res) => {
  try {
    const availability = await Availability.find({ userId: req.params.userId });
    res.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Error fetching availability." });
  }
});

// Schedule session
router.post('/schedule', async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log the incoming data
    const { user, start, end, type } = req.body;
    
    // Calculate duration in minutes
    const duration = (new Date(end) - new Date(start)) / (1000 * 60); // Convert milliseconds to minutes

    // Verify the token and extract the admin ID
    const token = req.headers.authorization.split(' ')[1];
    const { id: adminId } = jwt.verify(token, 'secretKey');
    
    // Create and save a new session
    const session = new Session({ adminId, userIds: [user], start, end, type, duration });
    await session.save();
    
    res.json({ message: 'Session scheduled successfully' });
  } catch (error) {
    console.error("Error scheduling session:", error);
    res.status(500).json({ message: "Error scheduling session." });
  }
});

// Fetch sessions for a specific user
router.get('/sessions', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find sessions related to the user
    const sessions = await Session.find({ userIds: userId });
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions." });
  }
});

// Delete a session
router.delete('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Find and delete the session
    const deletedSession = await Session.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found." });
    }

    res.json({ message: 'Session deleted successfully.' });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ message: "Error deleting session." });
  }
});

module.exports = router;
