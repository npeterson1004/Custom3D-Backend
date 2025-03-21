//authController.js
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("❌ Admin not found");
            return res.status(400).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log("❌ Incorrect password");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Ensure JWT contains `role: "admin"`
        const token = jwt.sign(
            { id: admin._id, role: 'admin', email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("✅ Admin Token Generated:", token); // Debugging

        res.json({ token, message: "✅ Login successful!" });

    } catch (error) {
        console.error("❌ Admin login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};




// ✅ Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        console.log("📥 Registering User:", { username, email });

        // ✅ Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "❌ Passwords do not match." });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log("⚠️ User already exists:", email);
            return res.status(400).json({ message: "⚠️ Email already registered." });
        }

        // ✅ Create new user instance (let `User.js` handle password hashing)
        const newUser = new User({ username, email: email.toLowerCase(), password });
        await newUser.save();

        console.log("✅ User registered successfully:", newUser);
        res.status(201).json({ message: "✅ Registration successful! You can now log in." });

    } catch (error) {
        console.error("❌ Server Error during Registration:", error);
        res.status(500).json({ message: "❌ Server error. Could not register user." });
    }
};







// ✅ User Login Function
exports.loginUser = async (req, res) => {
    try {
        console.log("🔍 Incoming Request Body:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "❌ All fields are required." });
        }

        // ✅ Convert email to lowercase to prevent case-sensitivity issues
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            console.log("❌ User not found:", normalizedEmail);
            return res.status(400).json({ message: "❌ Invalid email or password." });
        }

        // ✅ Debugging: Log stored hashed password vs entered password
        console.log("🔍 Stored Hashed Password:", user.password);
        console.log("🔍 Entered Password:", password);

        // ✅ Compare passwords correctly
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(400).json({ message: "❌ Invalid email or password." });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ Token Generated:", token);

        res.status(200).json({ 
            message: "✅ Login successful!", 
            token, 
            user: { email: user.email }
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "❌ Server error. Could not log in." });
    }
};




exports.verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        console.log("🔍 Incoming Token for Verification:", token); // ✅ Debugging

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Decoded:", decoded);

        // ✅ Ensure Admins Have `role: "admin"`
        if (decoded.role && decoded.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized: Admins only" });
        }

        res.json({ message: "Token valid", user: decoded });
    } catch (error) {
        console.error("❌ Token Verification Failed:", error.message);
        res.status(403).json({ message: "Invalid Token" });
    }
};
