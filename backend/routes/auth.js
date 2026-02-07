// routes/auth.js
const express = require("express");
const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN || "admin-token-12345";

  if (
    email.toLowerCase() !== adminEmail.toLowerCase() ||
    password !== adminPassword
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: adminToken,
    admin: { email: adminEmail },
  });
});

module.exports = router;
