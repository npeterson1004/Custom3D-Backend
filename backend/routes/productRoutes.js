//productRoutes.js
const express = require('express');
const multer = require('multer');
const { addProduct } = require("../controllers/productController");
const Product = require("../models/Product");
const router = express.Router();



// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), addProduct);

// Get 3 random products for "Featured Prints"
router.get("/featured", async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 3 } }]); // Fetch 3 random items
        res.json(products);
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ message: "Failed to fetch featured products" });
    }
});

router.get("/featured", async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 3 } }]); // Fetch 3 random items
        res.json(products);
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ message: "Failed to fetch featured products" });
    }
});




// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products." });
    }
});





module.exports = router;
