//paymentController.js

const Order = require("../models/Order");

exports.processVenmoPayment = async (req, res) => {
    try {
        const { orderId, userEmail } = req.body;
        const venmoUsername = "@Nathan-Peterson-151"; // ✅ Your Venmo username
        

        console.log(`🛒 Payment request received for Order ${orderId} from ${userEmail}`);

        const order = await Order.findById(orderId);

        if (!order) {
        return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Payment request sent. Complete payment in Venmo.",
            venmoUsername: venmoUsername,
            orderNumber: order.orderNumber // ✅ Return readable order number
        });
        
    } catch (error) {
        console.error("❌ Error processing Venmo payment:", error);
        res.status(500).json({ message: "Payment failed. Please try again." });
    }
};
