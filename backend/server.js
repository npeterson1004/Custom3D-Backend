//server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const contactRoutes = require("./routes/contactRoutes");
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const allowedOrigins = ['http://localhost:5500', 'http://localhost:8000'];
const orderRoutes = require("./routes/orderRoutes"); 



console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging
const app = express();
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

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
