// routes/blogs.js
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const multer = require("multer");
const slugify = require("../utils/slugify");

// Import Cloudinary storage
const { blogStorage } = require("../config/cloudinary");
const upload = multer({ storage: blogStorage });

// Helper: ensure unique slug
async function ensureUniqueSlug(desired) {
  let base = slugify(desired || "");
  if (!base) base = "post";
  let candidate = base;
  let i = 1;
  while (await Blog.findOne({ slug: candidate })) {
    candidate = `${base}-${i++}`;
  }
  return candidate;
}

// Public: GET /api/blogs -> list published blogs
router.get("/", async (req, res) => {
  try {
    const { category, tag } = req.query;
    const q = { status: "published" };
    if (category) q.category = category;
    if (tag) q.tags = tag;
    const blogs = await Blog.find(q).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: GET /api/blogs/admin -> list all (draft+published) - MUST BE BEFORE /:slug
router.get("/admin", auth, async (req, res) => {
  try {
    const { status } = req.query;
    const q = {};
    if (status) q.status = status;
    const blogs = await Blog.find(q).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Public: GET /api/blogs/:slug -> single published blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    });
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected: POST /api/blogs -> create blog (featuredImage optional)
router.post("/", auth, upload.single("featuredImage"), async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      source,
      status,
      category,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    let finalSlug = slug ? slugify(slug) : await ensureUniqueSlug(title);
    // if provided slug collides, make unique
    if (await Blog.findOne({ slug: finalSlug })) {
      finalSlug = await ensureUniqueSlug(finalSlug);
    }

    let featuredImage;
    if (req.file) {
      featuredImage = {
        filename: req.file.filename,
        url: req.file.path, // Cloudinary URL
      };
    }

    const blog = new Blog({
      title,
      slug: finalSlug,
      excerpt: excerpt || "",
      content: content || "",
      featuredImage,
      source,
      status: status === "published" ? "published" : "draft",
      category,
      tags:
        typeof tags === "string"
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : Array.isArray(tags)
            ? tags
            : [],
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected: PUT /api/blogs/:id -> update (optional new featuredImage)
router.put("/:id", auth, upload.single("featuredImage"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    const update = { ...req.body };
    if (update.tags && typeof update.tags === "string") {
      update.tags = update.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // handle slug change with uniqueness
    if (typeof update.slug !== "undefined" && update.slug) {
      let desired = slugify(update.slug);
      if (desired !== blog.slug) {
        if (await Blog.findOne({ slug: desired })) {
          desired = await ensureUniqueSlug(desired);
        }
        update.slug = desired;
      } else {
        delete update.slug; // no change
      }
    }

    // handle featured image replacement
    if (req.file) {
      // Cloudinary automatically handles old file deletion if needed
      // You can optionally delete old Cloudinary image using cloudinary.uploader.destroy()
      update.featuredImage = {
        filename: req.file.filename,
        url: req.file.path, // Cloudinary URL
      };
    }

    // sanitize status
    if (typeof update.status !== "undefined") {
      update.status = update.status === "published" ? "published" : "draft";
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected: PATCH /api/blogs/:id/status -> publish/unpublish toggle
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["draft", "published"].includes(status)) {
      return res
        .status(400)
        .json({ message: "status must be 'draft' or 'published'" });
    }
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected: DELETE /api/blogs/:id -> delete blog (and image)
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    // If using Cloudinary, delete the image by public_id
    if (blog.featuredImage && blog.featuredImage.public_id) {
      try {
        const cloudinary = require("cloudinary").v2;
        await cloudinary.uploader.destroy(blog.featuredImage.public_id);
      } catch (e) {
        console.warn("Failed to delete Cloudinary image:", e);
      }
    }
    await blog.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
