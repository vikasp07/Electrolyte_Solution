// routes/certificates.js
const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const auth = require("../middleware/auth");
const multer = require("multer");

// Import Cloudinary storage
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

// Create storage for certificates
const certificateStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "electrolyte/certificates",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
    transformation: [{ width: 1200, height: 1600, crop: "limit" }],
  },
});

const upload = multer({ storage: certificateStorage });

// GET /api/certificates (public) - Get all certificates
router.get("/", async (req, res) => {
  try {
    const { active } = req.query;
    const query = {};
    if (typeof active !== "undefined") {
      query.active = active === "true";
    }
    const certificates = await Certificate.find(query).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/certificates/:id (public) - Get single certificate
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/certificates (protected) - Create new certificate
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Certificate image required (multipart/form-data name=image)",
      });
    }

    const { name, description, order, active } = req.body;

    const certificate = new Certificate({
      name: name || "",
      description: description || "",
      image: {
        filename: req.file.filename,
        url: req.file.path, // Cloudinary URL
      },
      order: order ? parseInt(order, 10) : 0,
      active: typeof active === "undefined" ? true : active === "true",
    });

    await certificate.save();
    res.json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/certificates/:id (protected) - Update certificate
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const update = { ...req.body };

    // Handle new image upload
    if (req.file) {
      // Optionally delete old image from Cloudinary
      if (certificate.image && certificate.image.filename) {
        try {
          await cloudinary.uploader.destroy(certificate.image.filename);
        } catch (e) {
          console.warn("Error deleting old image:", e);
        }
      }

      update.image = {
        filename: req.file.filename,
        url: req.file.path, // Cloudinary URL
      };
    }

    // Handle order
    if (update.order) {
      update.order = parseInt(update.order, 10);
    }

    // Handle active status
    if (typeof update.active !== "undefined") {
      update.active = update.active === "true" || update.active === true;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(updatedCertificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/certificates/:id (protected) - Delete certificate
router.delete("/:id", auth, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Delete image from Cloudinary
    if (certificate.image && certificate.image.filename) {
      try {
        await cloudinary.uploader.destroy(certificate.image.filename);
      } catch (e) {
        console.warn("Error deleting image:", e);
      }
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
