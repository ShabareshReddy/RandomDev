const express = require("express");
const multer = require("multer");
const { userAuth } = require("../middlewares/auth");
const fs = require("fs");

const uploadRouter = express.Router();

// Local storage fallback
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

uploadRouter.post("/upload", userAuth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      console.error("No file received by multer");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Return local URL
    const host = `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${host}/uploads/${req.file.filename}`;

    res.json({ message: "File uploaded successfully", fileUrl });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed: " + err.message });
  }
});

module.exports = uploadRouter;
