//filamentController.js
const FilamentColor = require("../models/filamentColor");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Add a new filament color
exports.addFilamentColor = async (req, res) => {
    try {
        const { name, type } = req.body;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "filament_colors"
        });

        const newColor = new FilamentColor({
            name,
            image: result.secure_url,
            type
        });

        await newColor.save();
        res.status(201).json({ message: "Filament color added successfully!" });
    } catch (error) {
        console.error("Error adding filament color:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// ✅ Get all filament colors
exports.getFilamentColors = async (req, res) => {
    try {
        const colors = await FilamentColor.find();
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch filament colors." });
    }
};

// ✅ Get a single filament color by ID
exports.getFilamentColorById = async (req, res) => {
    try {
        const color = await FilamentColor.findById(req.params.id);
        if (!color) return res.status(404).json({ message: "Filament color not found" });
        res.status(200).json(color);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch filament color." });
    }
};

// ✅ Update a filament color
exports.updateFilamentColor = async (req, res) => {
    try {
        const { name, type } = req.body;

        // Check if there's a new image to upload
        let image = req.body.image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "filament_colors"
            });
            image = result.secure_url;
        }

        const updatedColor = await FilamentColor.findByIdAndUpdate(
            req.params.id,
            { name, type, image },
            { new: true }
        );

        res.status(200).json(updatedColor);
    } catch (error) {
        res.status(500).json({ message: "Failed to update filament color." });
    }
};

// ✅ Delete a filament color
exports.deleteFilamentColor = async (req, res) => {
    try {
        const { id } = req.params;
        await FilamentColor.findByIdAndDelete(id);
        res.json({ message: "Filament color deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete filament color." });
    }
};
