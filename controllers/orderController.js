// controllers/orderController.js
const Order = require("../models/Order");

// Handle order creation
exports.createOrder = async (req, res) => {
    try {
        const { userEmail, items, totalAmount, paymentMethod } = req.body;
        const orderDate = new Date();

        // Validate required fields
        if (!userEmail || !items || items.length === 0 || !paymentMethod) {
            return res.status(400).json({ error: "Missing required fields: userEmail, items, or paymentMethod." });
        }

        // Create and save the order (Now with colors)
        const newOrder = new Order({
            userEmail,
            items: items.map(item => ({
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                color: item.color // ✅ Store color information
            })),
            totalAmount,
            orderDate,
            paymentMethod, // ✅ Store Payment Method
            paymentStatus: "Pending" // ✅ Mark as pending
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to place order." });
    }
};

// ✅ Allow Admin to Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus } = req.body;

        if (!["Pending", "Processing Payment", "Completed"].includes(paymentStatus)) {
            return res.status(400).json({ message: "Invalid payment status." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { paymentStatus }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment status updated successfully", order: updatedOrder });
    } catch (error) {
        console.error("❌ Error updating payment status:", error);
        res.status(500).json({ message: "Failed to update payment status" });
    }
};


// Get all orders (Admin View)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().select("userEmail items totalAmount orderDate paymentStatus");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};

