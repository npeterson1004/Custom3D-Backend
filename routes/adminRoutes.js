//adminRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { adminLogin } = require("../controllers/authController");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");




const router = express.Router();
router.post("/login", adminLogin);



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



module.exports = router;
