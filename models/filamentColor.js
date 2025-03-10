//models/fillamentColor.js

const mongoose = require("mongoose");

const FilamentColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    images: {  // ✅ Change from single image to an array of images
        type: [String],  // ✅ Array of image URLs
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("FilamentColor", FilamentColorSchema);

