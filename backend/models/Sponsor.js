// models/Sponsor.js
const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    website: { type: String },
    logoFilename: { type: String }, // file in /uploads
    logoUrl: { type: String }, // e.g., /uploads/logo-123.jpg
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", SponsorSchema);
