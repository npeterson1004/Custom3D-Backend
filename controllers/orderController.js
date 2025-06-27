// controllers/orderController.js
const Order = require("../models/Order");

function generateOrderNumber() {
    const now = new Date();
    return `ORD-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
}

exports.createOrder = async (req, res) => {
    try {
        const { userEmail, items, totalAmount, paymentMethod } = req.body;
        const orderDate = new Date();

        if (!userEmail || !items || items.length === 0 || !paymentMethod) {
            return res.status(400).json({ error: "Missing required fields: userEmail, items, or paymentMethod." });
        }

        // ✅ Ensure each item includes `name`, `quantity`, and `color.name`
        const formattedItems = items.map(item => ({
            name: item.name && item.name.trim() !== "" ? item.name : "Unnamed Item", // ✅ Prevent empty names
            price: item.price || 0, // ✅ Ensure price exists
            quantity: item.quantity || 1, // ✅ Ensure quantity exists
            image: item.image || "", // ✅ Ensure image exists
            color: item.color 
                ? { 
                    name: item.color.name && item.color.name.trim() !== "" ? item.color.name : "No Color Selected", // ✅ Prevent empty color names
                    images: Array.isArray(item.color.images) ? item.color.images : [] // ✅ Ensure images exist
                }
                : { name: "No Color Selected", images: [] } // ✅ Default color object if missing
        }));

        const newOrder = new Order({
            userEmail,
            items: formattedItems,
            totalAmount,
            orderDate,
            paymentMethod, 
            paymentStatus: "Pending",
            orderNumber: generateOrderNumber()
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("❌ Error saving order:", error);
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


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().select("userEmail items totalAmount orderDate paymentStatus");

        // ✅ Ensure all necessary fields exist before sending response
        const formattedOrders = orders.map(order => ({
            ...order._doc,
            items: order.items.map(item => ({
                name: item.name && item.name.trim() !== "" ? item.name : "Unnamed Item", // ✅ Ensure name exists
                price: item.price || 0, // ✅ Ensure price exists
                quantity: item.quantity || 1, // ✅ Ensure quantity exists
                image: item.image || "", // ✅ Ensure image exists
                color: item.color 
                    ? { 
                        name: item.color.name && item.color.name.trim() !== "" ? item.color.name : "No Color Selected", // ✅ Ensure color name exists
                        images: Array.isArray(item.color.images) ? item.color.images : [] // ✅ Ensure images exist
                    }
                    : { name: "No Color Selected", images: [] } // ✅ Default color object if missing
            }))
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};



