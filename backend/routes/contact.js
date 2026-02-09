// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// POST /api/contact
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, company, subject, message } =
    req.body;

  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({
        message: "Required fields: firstName, lastName, email, message",
      });
  }

  try {
    // Save to database
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

    // Send email notification
    const mailOptions = {
      from: `"Electrolyte Solutions Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form: ${subject || "No Subject"} — from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td>
              <td style="padding:8px;border:1px solid #ddd;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td>
              <td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td>
              <td style="padding:8px;border:1px solid #ddd;">${phone || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td>
              <td style="padding:8px;border:1px solid #ddd;">${company || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Subject</td>
              <td style="padding:8px;border:1px solid #ddd;">${subject || "N/A"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td>
              <td style="padding:8px;border:1px solid #ddd;">${message}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:16px;">Submitted on ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    // Still return success if DB save worked but email failed
    if (err.code === "EAUTH" || err.code === "ESOCKET") {
      return res
        .status(200)
        .json({
          message:
            "Form saved but email notification failed. We'll still get back to you!",
        });
    }
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
