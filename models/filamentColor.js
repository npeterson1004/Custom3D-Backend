//models/fillamentColor.js

const mongoose = require("mongoose");

const FilamentColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("filamentColor", FilamentColorSchema);
