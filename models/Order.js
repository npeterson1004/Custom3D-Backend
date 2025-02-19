const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
