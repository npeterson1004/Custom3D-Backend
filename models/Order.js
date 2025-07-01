//models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    username: { type: String},
    orderNumber: { type: String, unique: true }, 
    deliveryMethod: { type: String, enum: ["Delivery", "Skipped"], default: "Skipped" },
    shippingAddress: { type: String, default: "Skipped" },


    items: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: Number,
            color: {
                name: { type: String, default: null },
                images: [{ type: String, default: [] }] // ✅ Store both images as an array
            }            
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ["Venmo"], required: true }, // ✅ Store Payment Method
    paymentStatus: { type: String, enum: ["Pending", "Processing Payment", "Completed"], default: "Pending" } // ✅ Track Payment Status
});

module.exports = mongoose.model("Order", OrderSchema);
