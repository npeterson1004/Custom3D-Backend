//filamentRoutes.js
const express = require("express");
const multer = require("multer");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
    addFilamentColor,
    getFilamentColors,
    getFilamentColorById,
    updateFilamentColor,
    deleteFilamentColor
} = require("../controllers/filamentController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary upload folder

// ✅ Define Filament Color Routes
router.post("/", authMiddleware, adminMiddleware, upload.array("images", 2), addFilamentColor);
router.get("/", getFilamentColors);
router.get("/:id", getFilamentColorById);
router.put("/:id", authMiddleware, adminMiddleware, upload.array("images", 2), updateFilamentColor);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFilamentColor);





module.exports = router;
