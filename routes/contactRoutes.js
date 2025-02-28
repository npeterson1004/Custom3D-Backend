//contact routes
const express = require("express");
const { submitContact, getContacts } = require("../controllers/contactController");

const router = express.Router();

// Submit contact form
router.post("/", submitContact);

// Get all contact requests (Admin View)
router.get("/", getContacts);

module.exports = router;
