// models/Blog.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" }, // HTML/rich text
    featuredImage: {
      filename: { type: String },
      url: { type: String }, // e.g., /uploads/xxx.jpg
    },
    source: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    category: { type: String },
    tags: [{ type: String }],
    // SEO fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
