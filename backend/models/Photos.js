// models/Photo.js
const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    filename: { type: String, required: true }, // stored filename in /uploads
    url: { type: String, required: true }, // public URL to access (e.g., /uploads/xxx.jpg)
    tags: [String], // e.g., ["hero", "vendor", "case-study"]
    order: { type: Number, default: 0 }, // for ordering in front-end carousels
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", PhotoSchema);
