//authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("🚨 No token found in request headers.");
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.decode(token);
        if (!decoded) {
            console.error("🚨 Token could not be decoded.");
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log("✅ Decoded Token:", decoded);

        if (Date.now() >= decoded.exp * 1000) {
            console.warn("🚨 Token Expired! Removing invalid token.");
            res.clearCookie("token"); // Remove invalid session token
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error("🚨 Token Verification Failed:", error.message);
        res.status(403).json({ message: "Invalid Token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        console.error("🚨 Access Denied. User is not an admin.");
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
};

module.exports = { authMiddleware, adminMiddleware };
