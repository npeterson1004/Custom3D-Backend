//contactRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { submitContact, getContacts } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure "uploads" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files in the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")); // Replace spaces with underscores
    }
});

// ✅ Validate File Type
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("⚠️ Invalid file type. Allowed formats: JPG, PNG, PDF."), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // ✅ Limit file size to 5MB
});

// ✅ Submit contact form with optional file
router.post("/", upload.single("file"), async (req, res, next) => {
    try {
        await submitContact(req, res);
    } catch (error) {
        console.error("❌ Error processing contact form:", error);
        res.status(500).json({ message: "❌ Server error. Could not process request." });
    }
});

// ✅ Get all contact requests (Admin View) - Protected Route
router.get("/", authMiddleware, async (req, res) => {
    try {
        await getContacts(req, res);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ message: "❌ Server error. Could not retrieve contacts." });
    }
});

module.exports = router;
