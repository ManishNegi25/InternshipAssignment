const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Availability = require('../models/Availability');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');

// User login
router.post('/login', async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
    await user.save();
  }
  const token = jwt.sign({ id: user._id }, 'secretKey');
  res.json({ token });
});

// Add availability
router.post('/availability', async (req, res) => {
  const { start, end, duration } = req.body;
  const userId = jwt.verify(req.headers.authorization.split(' ')[1], 'secretKey').id;
  const availability = new Availability({ userId, start, end, duration });
  await availability.save();
  res.json({ message: 'Availability added' });
});

// Get all availabilities for a user
router.get('/availability', async (req, res) => {
  const userId = jwt.verify(req.headers.authorization.split(' ')[1], 'secretKey').id;
  const availabilities = await Availability.find({ userId });
  res.json(availabilities);
});

// Get all scheduled sessions for a user
// Get all scheduled sessions for a user
router.get("/sessions", async (req, res) => {
  try {
    // Extract userId from JWT token in Express route
    const authHeader = req.headers.authorization;

    // Ensure the Authorization header is present
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing." });
    }

    const token = authHeader.split(" ")[1];

    // Ensure the token is present
    if (!token) {
      return res.status(401).json({ message: "Token missing." });
    }

    // Verify the token and extract the userId
    let userId;
    try {
      const decodedToken = jwt.verify(token, "secretKey");
      userId = decodedToken.id;
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Find all sessions associated with the user ID
    const sessions = await Session.find({ userIds: userId }); // Corrected query

    // Check if sessions exist
    if (!sessions.length) {
      return res.status(404).json({ message: "No sessions found." });
    }

    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions." });
  }
});




// Update session
router.put('/sessions/:id', async (req, res) => {
  const { id } = req.params;
  const { start, end, type } = req.body;
  await Session.findByIdAndUpdate(id, { start, end, type });
  res.json({ message: 'Session updated' });
});

// Delete session
router.delete('/sessions/:id', async (req, res) => {
  const { id } = req.params;
  await Session.findByIdAndDelete(id);
  res.json({ message: 'Session deleted' });
});

module.exports = router;
