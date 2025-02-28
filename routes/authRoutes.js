//AuthRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { registerUser, loginUser, verifyToken} = require("../controllers/authController");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;



// ✅ Register User (Connected to Controller)
router.post("/register", registerUser);

// ✅ Login User (Connected to Controller)
router.post("/login", loginUser);

router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Admin Login Attempt:", email); // Debugging

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Admin not found");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Stored Hashed Password:", user.password);
        console.log("Entered Password:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Login Successful!");

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get("/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Authenticated", user: decoded, token }); // ✅ Always return token
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
});



module.exports = router;
