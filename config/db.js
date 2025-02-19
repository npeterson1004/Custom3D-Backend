const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env


const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("Missing MONGO_URI in .env file");

        await mongoose.connect(uri); // ✅ No deprecated options needed

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
