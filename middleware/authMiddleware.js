//authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("🚨 No token found in request headers.");
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        // ✅ Verify and Decode Token in One Step
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("✅ Decoded Token:", decoded);

        if (!decoded || !decoded.role) {
            console.error("🚨 Invalid Token Structure. No role found.");
            return res.status(403).json({ message: "Invalid Token" });
        }

        // ✅ Ensure Token Hasn't Expired
        if (Date.now() >= decoded.exp * 1000) {
            console.error("🚨 Token Expired!");
            return res.status(403).json({ message: "Token Expired" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("🚨 Token Verification Failed:", error.message);
        res.status(403).json({ message: "Invalid Token" });
    }
};


const adminMiddleware = (req, res, next) => {
    console.log("🔍 Checking Admin Role:", req.user);

    if (!req.user || req.user.role !== 'admin') {
        console.error("🚨 Access Denied. User is not an admin.");
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    console.log("✅ Admin Authentication Passed.");
    next();
};

module.exports = { authMiddleware, adminMiddleware };
