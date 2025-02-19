//authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("🚨 No token found in request headers.");
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("🚨 Token Verification Failed:", error.message);
        res.status(403).json({ message: "Invalid Token" });
    }
};


const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};




/*
exports.authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "❌ Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "secretkey"); // Use the same secret key as login
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "❌ Invalid token." });
    }
};

*/
module.exports = { authMiddleware, adminMiddleware };
