// routes/photos.js
const express = require("express");
const router = express.Router();
const Photo = require("../models/Photos");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup multer storage in /uploads
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});
const upload = multer({ storage });

// GET /api/photos  (public)
router.get("/", async (req, res) => {
  const { tag, active } = req.query;
  const q = {};
  if (tag) q.tags = tag;
  if (typeof active !== "undefined") q.active = active === "true";
  const photos = await Photo.find(q).sort({ order: 1, createdAt: -1 });
  res.json(photos);
});

// GET single
router.get("/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).json({ message: "Not found" });
  res.json(photo);
});

// POST upload (protected)
router.post("/", auth, upload.single("image"), async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "Image required (multipart/form-data name=image)" });
  const { title, description, tags, order, active } = req.body;
  const url = `/uploads/${req.file.filename}`;
  const photo = new Photo({
    title: title || "",
    description: description || "",
    filename: req.file.filename,
    url,
    tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    order: order ? parseInt(order, 10) : 0,
    active: typeof active === "undefined" ? true : active === "true",
  });
  await photo.save();
  res.json(photo);
});

// PUT update (protected)
router.put("/:id", auth, async (req, res) => {
  const update = req.body;
  if (update.tags && typeof update.tags === "string")
    update.tags = update.tags.split(",").map((t) => t.trim());
  const photo = await Photo.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  if (!photo) return res.status(404).json({ message: "Not found" });
  res.json(photo);
});

// DELETE (protected) - also delete file
router.delete("/:id", auth, async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).json({ message: "Not found" });
  const filePath = path.join(uploadsDir, photo.filename || "");
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.warn("unlink failed", e);
    }
  }
  await photo.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
