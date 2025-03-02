//server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { authMiddleware } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// CORS Configuration
app.use(cors({
    origin: [
        'http://localhost:5500', // ✅ Local frontend (development)
        'http://localhost:8000', // ✅ Local API testing (Postman, browser)
        'https://natescustom3d.netlify.app' // ✅ Live frontend (Netlify)
    ],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['Authorization']
}));

// ✅ Handle CORS Preflight Requests Properly
app.options('*', cors()); // ✅ Allow preflight requests for all routes



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        crypto: { secret: process.env.SESSION_SECRET }
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
