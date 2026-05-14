const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/image-ai
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // 🔹 Here you would call your AI processing logic
    // For demo, we just return the uploaded file URL
    const url = `/uploads/${file.filename}`;

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI processing failed" });
  }
});

module.exports = router;
