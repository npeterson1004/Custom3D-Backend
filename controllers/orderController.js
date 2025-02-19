// controllers/orderController.js
const Order = require("../models/Order");

// Handle order creation
exports.createOrder = async (req, res) => {
    try {
        const { userEmail, items, totalAmount, orderDate } = req.body;

        // Validate required fields
        if (!userEmail || !items || items.length === 0) {
            return res.status(400).json({ error: "Missing required fields: userEmail and items." });
        }

        // Create and save the order
        const newOrder = new Order({
            userEmail,
            items,
            totalAmount,
            orderDate
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to place order." });
    }
};

// Get all orders (Admin View)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};
