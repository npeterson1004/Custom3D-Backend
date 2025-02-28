//productRoutes.js
const express = require('express');
const multer = require('multer');
const { addProduct } = require("../controllers/productController");
const Product = require("../models/Product");
const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'custom3d-uploads',
        format: async (req, file) => file.mimetype.split('/')[1], // Auto-detect format
        public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
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
