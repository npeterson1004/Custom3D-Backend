//contactRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { submitContact, getContacts } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure "uploads" directory exists (Render sometimes deletes empty folders)
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    }
});

// ✅ Validate File Type
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg", "image/png", "application/pdf", // ✅ Existing formats
        "model/stl", "model/obj", "application/octet-stream", // ✅ 3D print formats
        "application/x-step", "application/sla" // ✅ STEP & SLA files
    ];

    if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(stl|obj|step|step|3mf|sla|igs|iges)$/i)) {
        cb(null, true);
    } else {
        cb(new Error("⚠️ Invalid file type. Allowed formats: JPG, PNG, PDF, STL, OBJ, STEP, 3MF, SLA, IGES, IGS."), false);
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // ✅ Increase file size limit to 50MB
});


// ✅ Submit contact form with optional file
router.post("/", upload.single("file"), async (req, res, next) => {
    try {
        console.log("📩 Contact request received.");
        console.log("✅ Request Body:", req.body);
        console.log("📂 Uploaded File:", req.file || "No file uploaded.");

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
