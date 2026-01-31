// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

// connect DB
connectDB(process.env.MONGO_URI);

// ============================================
// CORS CONFIGURATION - MUST BE BEFORE ROUTES
// ============================================
const cors = require("cors");

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001", 
  process.env.FRONTEND_URL_DEV,
  process.env.FRONTEND_URL_CODESPACES,
  process.env.FRONTEND_URL_PROD,
  // GitHub Codespaces origin (hardcoded as backup)
  "https://refactored-umbrella-pjqrvww49gwj3rwpp-3000.app.github.dev",
  // Add your production frontend URL here
  "https://your-production-domain.com",
  "https://electrolyte-solutions.netlify.app", // Example if using Netlify
  "https://electrolyte-solutions.vercel.app",  // Example if using Vercel
].filter(Boolean); // Remove undefined values

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    // In development, allow all localhost origins
    if (origin && origin.startsWith("http://localhost")) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      // In production, log but still allow (temporary for debugging)
      // Remove this line once you've identified all your frontend origins
      callback(null, true);
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours - cache preflight response
};

// Apply CORS middleware BEFORE routes
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// ============================================
// OTHER MIDDLEWARES
// ============================================
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// serve uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use("/uploads", express.static(uploadsDir));

// ============================================
// ROUTES
// ============================================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/photos", require("./routes/photos"));
app.use("/api/sponsors", require("./routes/sponsors"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/blogs", require("./routes/blogs"));

// health check
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date() }));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Electrolyte Solutions API",
    status: "running",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      photos: "/api/photos",
      sponsors: "/api/sponsors",
      contact: "/api/contact",
      blogs: "/api/blogs",
    },
  });
});

// ============================================
// INITIAL ADMIN AUTO-CREATION
// ============================================
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
const createInitialAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return;
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const admin = new Admin({
        email: email.toLowerCase(),
        passwordHash,
        name: "Admin",
      });
      await admin.save();
      console.log("Initial admin created:", email);
      console.log("DEBUG - Stored email:", admin.email);
      console.log("DEBUG - Password hash exists:", !!admin.passwordHash);
      console.log("DEBUG - Password hash length:", admin.passwordHash?.length);
      // Verify we can find it
      const check = await Admin.findOne({ email: email.toLowerCase() });
      console.log("DEBUG - Can retrieve admin:", !!check);
      console.log("DEBUG - Retrieved email:", check?.email);
    }
  } catch (e) {
    console.error("Error creating initial admin:", e);
  }
};
createInitialAdmin();

// ============================================
// ERROR HANDLING
// ============================================
// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed CORS origins:`, allowedOrigins);
});
