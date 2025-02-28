//contactController.js

const Contact = require("../models/Contact");

// ✅ Handle contact form submissions
exports.submitContact = async (req, res) => {
    try {
        const { name, email, number, description } = req.body;

        if (!name || !email || !number || !description) {
            return res.status(400).json({ message: "⚠️ All fields are required." });
        }

        const newContact = new Contact({ name, email, number, description });

        await newContact.save();
        res.status(201).json({ message: "✅ Request submitted successfully!" });

    } catch (error) {
        console.error("❌ Error submitting contact request:", error);
        res.status(500).json({ message: "❌ Server error. Could not submit request." });
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
