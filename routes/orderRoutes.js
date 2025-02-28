//orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Ensure Order model exists


const orderController = require("../controllers/orderController");

// Save New Order (POST /api/orders)
router.post("/", orderController.createOrder);

// Get All Orders for Admin Dashboard (GET /api/orders)
router.get("/", orderController.getAllOrders);

module.exports = router;


