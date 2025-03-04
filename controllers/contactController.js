//contactController.js

const Contact = require("../models/Contact");
const fs = require("fs");
const path = require("path");



exports.submitContact = async (req, res) => {
    try {
        console.log("📩 Received contact request:", req.body);
        console.log("📂 Uploaded File:", req.file ? req.file.secure_url : "No file uploaded.");

        const { name, email, number, description } = req.body;
        
        // ✅ Ensure Cloudinary URL is stored correctly
        let fileUrl = req.file ? req.file.secure_url : ""; 

        const newContact = new Contact({ 
            name, 
            email, 
            number, 
            description, 
            fileUrl // ✅ Store Cloudinary URL in MongoDB
        });

        await newContact.save();

        res.status(201).json({ 
            message: "✅ Contact request submitted successfully!", 
            fileUrl // ✅ Return file URL in response
        });
    } catch (error) {
        console.error("❌ Error saving contact request:", error);
        res.status(500).json({ message: "❌ Failed to submit contact request." });
    }
};



exports.getContacts = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "🚫 Access denied. Admins only." });
        }

        // ✅ Fetch contacts including the `fileUrl`
        const contacts = await Contact.find().select("name email number description fileUrl createdAt").sort({ createdAt: -1 });

        res.json(contacts);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ message: "❌ Failed to fetch contacts." });
    }
};

