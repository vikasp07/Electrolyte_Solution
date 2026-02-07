// routes/sponsors.js
const express = require("express");
const router = express.Router();
const Sponsor = require("../models/Sponsor");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// GET list (public)
router.get("/", async (req, res) => {
  const sponsors = await Sponsor.find({}).sort({ order: 1, createdAt: -1 });
  res.json(sponsors);
});

// POST create (protected) - multipart/form-data with logo
router.post("/", auth, upload.single("logo"), async (req, res) => {
  const { name, website, order, active } = req.body;
  let logoUrl, logoFilename;
  if (req.file) {
    logoFilename = req.file.filename;
    logoUrl = `/uploads/${req.file.filename}`;
  }
  const sponsor = new Sponsor({
    name,
    website,
    order: order ? parseInt(order, 10) : 0,
    active: typeof active === "undefined" ? true : active === "true",
    logoFilename,
    logoUrl,
  });
  await sponsor.save();
  res.json(sponsor);
});

// PUT update (protected) (optional new logo via 'logo')
router.put("/:id", auth, upload.single("logo"), async (req, res) => {
  const update = req.body;
  if (req.file) {
    update.logoFilename = req.file.filename;
    update.logoUrl = `/uploads/${req.file.filename}`;
  }
  if (update.order) update.order = parseInt(update.order, 10);
  const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  if (!sponsor) return res.status(404).json({ message: "Not found" });
  res.json(sponsor);
});

// DELETE (protected) - deletes file
router.delete("/:id", auth, async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);
  if (!sponsor) return res.status(404).json({ message: "Not found" });
  if (sponsor.logoFilename) {
    const filePath = path.join(uploadsDir, sponsor.logoFilename);
    if (fs.existsSync(filePath))
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.warn(e);
      }
  }
  await sponsor.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
