const Admin = require('../models/Admin');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        res.json({ totalUsers, totalProducts });
    } catch (error) {
        console.error("❌ Dashboard Data Fetch Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

