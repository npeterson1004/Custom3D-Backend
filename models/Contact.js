//models/contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, default: "" }, // ✅ Store Cloudinary file URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
