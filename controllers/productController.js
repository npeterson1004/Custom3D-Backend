//productController.js
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    try {
        console.log("📸 Received request data:", req.body);
        console.log("🔍 Uploaded file:", req.file);  // ✅ Debugging Cloudinary Upload

        const { name, price, description } = req.body;
        const imageUrl = req.file?.path || null; // ✅ Safely extract the image URL

        if (!imageUrl) {
            return res.status(400).json({ message: "⚠️ Image upload failed. Try again." });
        }

        if (!name || !price || !description) {
            return res.status(400).json({ message: "⚠️ All fields are required." });
        }

        const newProduct = new Product({ name, price, description, image: imageUrl });
        await newProduct.save();

        res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
    } catch (error) {
        console.error("❌ Error adding product:", error);
        res.status(500).json({ message: "Server error. Could not add product." });
    }
};


