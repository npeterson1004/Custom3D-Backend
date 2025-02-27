//authController.js
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email }); // ✅ Find admin user in the database
        if (!admin) {
            console.log("❌ Admin not found");
            return res.status(400).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("❌ Incorrect password");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.json({ token, message: "✅ Login successful!" });
    } catch (error) {
        console.error("❌ Admin login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Register New User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "✅ Registration successful! You can now log in." });

    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Server error. Could not register user." });
    }
};

// User Login Function
exports.loginUser = async (req, res) => {
    try {
        console.log("🔍 Incoming Request Body:", req.body); // Debugging

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "❌ All fields are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "❌ Invalid email or password." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid email or password." });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id, email: user.email }, "secretkey", { expiresIn: "1h" });

        res.status(200).json({ 
            message: "✅ Login successful!", 
            token, 
            user: { email: user.email }  // ✅ Ensure user email is returned
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "❌ Server error. Could not log in." });
    }
};
