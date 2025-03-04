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

// ✅ Move fileFilter function ABOVE multer configuration
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ["stl", "obj", "step", "3mf"];
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        console.error(`⚠️ Invalid file extension: ${fileExtension}`);
        return cb(new Error("⚠️ Invalid file type. Allowed: STL, OBJ, STEP, 3MF"), false);
    }

    cb(null, true);
};

// ✅ Configure Cloudinary Storage for 3D Print Files
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "custom3d-contact-uploads",
        resource_type: "raw", // ✅ Ensures Cloudinary stores STL, OBJ, etc.
        public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    }
});

// ✅ Initialize multer AFTER fileFilter is defined
const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 }, // ✅ Limit file size to 10MB
    fileFilter // ✅ Correctly using fileFilter now
});

// ✅ Submit contact form with optional file
router.post("/", upload.single("file"), async (req, res, next) => {
    try {
        console.log("📩 Contact request received:", req.body);
        console.log("📂 Uploaded File Data:", req.file);

        if (!req.file) {
            console.warn("⚠️ No file uploaded.");
        } else {
            console.log("✅ File uploaded to Cloudinary:", req.file.path || req.file.secure_url);
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

