//contactController.js

const Contact = require("../models/Contact");
const fs = require("fs");
const path = require("path");

// ✅ Handle contact form submissions

exports.submitContact = async (req, res) => {
    try {
        const { name, email, number, description } = req.body;
        let fileUrl = "";

        // ✅ Ensure `req.file` exists before accessing it
        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
        }

        const newContact = new Contact({ name, email, number, description, fileUrl });
        await newContact.save();

        res.status(201).json({ message: "✅ Contact request submitted successfully!" });
    } catch (error) {
        console.error("❌ Error saving contact request:", error);
        res.status(500).json({ message: "❌ Failed to submit contact request." });
    }
};

// ✅ Retrieve all contact requests (Admin View)
exports.getContacts = async (req, res) => {
    try {
        // Ensure only admin can access this route
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "🚫 Access denied. Admins only." });
        }

        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ message: "❌ Failed to fetch contacts." });
    }
};
