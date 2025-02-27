//adminRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { adminLogin } = require("../controllers/authController");



const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Change this to find from the Admin collection
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Unauthorized: Admin access only" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: admin._id, role: "admin" }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        console.log("Generated Token:", token);
        res.json({ message: "✅ Login successful!", token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// ✅ Admin Dashboard API
router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
    console.log("Received Token:", req.headers.authorization);
    console.log("Decoded User:", req.user);

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        res.json({ message: "Welcome to Admin Dashboard!", totalUsers, totalProducts });
    } catch (error) {
        console.error("Dashboard API Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Save New Order
router.post("/orders", async (req, res) => {
    try {
        const newOrder = new Order({
            userEmail: req.body.userEmail,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            orderDate: req.body.orderDate
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to place order." });
    }
});

// Get All Orders for Admin Dashboard
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
    }
});

router.post("/login", adminLogin);

module.exports = router;
