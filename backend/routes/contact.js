// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, company, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Required fields: firstName, lastName, email, message" });
  }

  try {
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      subject,
      message,
    });
    await contact.save();
    res.json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/contact (protected, for admin to view inquiries)
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;