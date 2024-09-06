const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://manishnegi252001:siwrRpaSkR3QnHg4@availability-scheduler.4saeo.mongodb.net/?retryWrites=true&w=majority&appName=availability-scheduler",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://internship-assignment-frontendlink.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Models
const User = require("./models/User");
const Availability = require("./models/Availability");
const Session = require("./models/Session");

// Routes
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
