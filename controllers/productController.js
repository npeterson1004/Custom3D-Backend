const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    try {
        console.log("Received request data:", req.body);
        console.log("Received file:", req.file);

        const { name, price, description } = req.body;
        const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;


        if (!name || !price || !description || !image) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            image
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product added successfully!" });

    } catch (error) {
        console.error("❌ Error adding product:", error);
        res.status(500).json({ message: "Server error. Could not add product." });
    }
};

