//server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require("./routes/orderRoutes"); 
const allowedOrigins = [
    'http://localhost:5500', 
    'http://localhost:8000',
    'https://delicate-yeot-77f124.netlify.app',  // ✅ Netlify Frontend
    'https://custom3d-backend.onrender.com' // ✅ Render Backend (Important)
];




const app = express();
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ Add 'OPTIONS' for preflight requests
}));



app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, 
        collectionName: 'sessions',
        crypto: { secret: process.env.SESSION_SECRET } // Secure session encryption
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'None'
    }
})).on('error', (err) => {
    console.error("Session Store Error:", err);
});
// Connect to MongoDB
connectDB();

// Import Routes

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes); 
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
