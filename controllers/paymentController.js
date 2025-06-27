//paymentController.js

const Order = require("../models/Order");

exports.processVenmoPayment = async (req, res) => {
    try {
        const { orderId, userEmail } = req.body;
        const venmoUsername = "@Nathan-Peterson-151"; // ✅ Your Venmo username
        

        console.log(`🛒 Payment request received for Order ${orderId} from ${userEmail}`);

        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Pending" });

        res.status(200).json({
            message: "Payment request sent. Complete payment in Venmo.",
            venmoUsername: venmoUsername,
            orderID: orderId
        });
    } catch (error) {
        console.error("❌ Error processing Venmo payment:", error);
        res.status(500).json({ message: "Payment failed. Please try again." });
    }
};
