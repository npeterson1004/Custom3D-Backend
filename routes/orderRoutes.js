//orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Ensure Order model exists


const orderController = require("../controllers/orderController");

// ✅ Ensure CORS middleware is properly applied
router.options("/:orderId/payment-status", (req, res) => {
    res.header("Access-Control-Allow-Methods", "PATCH");
    res.send();
});

// Save New Order (POST /api/orders)
router.post("/", orderController.createOrder);

// Get All Orders for Admin Dashboard (GET /api/orders)
router.get("/", orderController.getAllOrders);





// Update Order Payment Status (PATCH /api/orders/:orderId)
router.patch("/:orderId/payment-status", orderController.updatePaymentStatus);

module.exports = router;




