//models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: Number,
            color: {
                name: { type: String, default: null }, // ✅ Allow null color
                image: { type: String, default: null } // ✅ Allow null image
            }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
