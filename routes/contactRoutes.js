//contactRoutes.js
const express = require("express");
const multer = require("multer");
const { submitContact, getContacts } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "custom3d-contact-uploads",
        format: async (req, file) => file.mimetype.split("/")[1],
        public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    }
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 }, // ✅ Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "model/stl", "model/obj"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("⚠️ Invalid file type. Allowed: JPG, PNG, PDF, STL, OBJ"), false);
        }
        cb(null, true);
    }
});

// ✅ Submit contact form with optional file
router.post("/", upload.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
            console.warn("⚠️ No file uploaded. Proceeding without file.");
        } else {
            console.log("📂 Uploaded File:", req.file.path || req.file.secure_url);
        }

        await submitContact(req, res);
    } catch (error) {
        console.error("❌ Error processing contact form:", error);
        res.status(500).json({ message: "❌ Server error. Could not process request." });
    }
});

// ✅ Get all contact requests (Admin View)
router.get("/", authMiddleware, async (req, res) => {
    try {
        await getContacts(req, res);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ message: "❌ Server error. Could not retrieve contacts." });
    }
});

module.exports = router;
