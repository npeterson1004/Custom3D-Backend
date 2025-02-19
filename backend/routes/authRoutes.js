//AuthRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;



// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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



module.exports = router;
