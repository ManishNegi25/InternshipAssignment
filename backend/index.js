const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// CORS configuration
const corsOptions = {
  origin: "https://internship-assignment-frontendlink.vercel.app", // Your frontend URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 200 // For legacy browsers support
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions)); // Preflight all routes

app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://manishnegi252001:siwrRpaSkR3QnHg4@availability-scheduler.4saeo.mongodb.net/?retryWrites=true&w=majority&appName=availability-scheduler",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
const User = require("./models/User");
const Availability = require("./models/Availability");
const Session = require("./models/Session");

// Routes
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
