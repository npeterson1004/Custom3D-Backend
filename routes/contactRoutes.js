//contact routes
const express = require("express");
const { submitContact, getContacts } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware"); // ✅ Protect admin routes

const router = express.Router();

// Submit contact form
router.post("/", submitContact);

// Get all contact requests (Admin View) - Protected Route
router.get("/", authMiddleware, getContacts);

module.exports = router;
