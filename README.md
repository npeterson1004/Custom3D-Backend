Project Overview
The 3D Print Webstore is a full-stack e-commerce platform designed for managing and selling 3D-printed items. It allows users to browse available products, add items to their cart, register and log in securely, and submit inquiries or orders. The platform features robust user authentication using JWT, password hashing, and session-based security for admin access. The admin dashboard enables product management, user oversight, and contact request handling. The backend is built with Node.js, Express.js, and MongoDB, utilizing RESTful APIs for seamless communication. The frontend, developed with HTML, CSS, JavaScript, and Bootstrap, delivers a dynamic user experience with AJAX-powered updates. Secure data handling, local file storage for product images, and CORS-enabled API requests ensure smooth and safe operations. The project includes order management, contact form submissions, and a cart system, making it a fully functional e-commerce solution tailored for custom 3D printing services.
Features
Public Pages
Home Page (index.html) – Displays featured products and general store information.
Warehouse Page (warehouse.html) – Showcases all available 3D-printed items.
Contact Page (contact.html) – Allows users to send inquiries.
Cart Page (cart.html) – Enables users to view and manage selected items.
User Authentication
Login Page (login.html) – User authentication using JWT.
Register Page (register.html) – Secure user registration with password hashing.
Logout – Securely logs users out.
Admin Functionality
Admin Login Page (admin-login.html) – Authenticates admin users.
Admin Dashboard (admin-dashboard.html) – Allows management of users, products, and incoming contact messages.
Add Items Page (add-item.html) – Upload new 3D print items to the store.
Edit/Delete Items – Modify or remove products from the store.
Database Integration
MongoDB (db.js) – Stores and retrieves data using Mongoose.
User Management – Handles authentication and authorization for users and admins.
Product Management – CRUD operations for 3D print products.
Order Management (orderController.js, orderRoutes.js, Order.js) – Handles order submissions.
Contact Form Management (contactController.js, contactRoutes.js, Contact.js) – Stores and retrieves inquiries.
Local File Storage (/uploads/) – Stores product images securely.
Security & API
RESTful API Architecture – Handles authentication, products, and contact forms.
CORS-enabled API Requests – Ensures secure frontend-backend communication.
JWT Authentication (authMiddleware.js) – Secure, token-based authentication for users.
Session-Based Authentication (express-session) – Secure admin authentication.
Password Encryption (bcrypt.js) – Encrypts passwords for enhanced security.
Deployment
Backend (Render)
Hosted on Render
// assets/js/config.js
export const API_BASE_URL = "https://custom3d-backend.onrender.com";
export { API_BASE_URL };
Automatic deployments from GitHub
Environment variables managed through Render's settings
Uses MongoDB Atlas for cloud database storage



Frontend (Netlify)
Hosted on Netlify
Frontend base URL: https://delicate-yeot-77f124.netlify.app/public
Automatic deployments from GitHub
Environment variables managed through Netlify's settings
CORS-enabled API requests to Render backend










1️⃣ Backend (Server-Side)
✅ Programming Language:
Node.js – JavaScript runtime for server-side logic.
✅ Frameworks & Libraries:
Express.js – Web framework for handling API requests.
Mongoose – ODM library for MongoDB schema and interactions.
dotenv – Loads environment variables securely.
bcrypt.js – Password hashing for security.
jsonwebtoken (JWT) – Secure user authentication.
express-session – Handles session-based authentication.
cookie-parser – Parses authentication tokens stored in cookies.
cors – Enables cross-domain API communication.
multer – Handles file uploads for product images.
✅ Database & Storage:
MongoDB (db.js) – NoSQL database for storing users, products, orders, and messages.
Local File Storage (/uploads/) – Stores product images locally.
✅ Security & API
RESTful API – Structured API for authentication, products, orders, and contact forms.
JWT Authentication (authMiddleware.js) – Secure, token-based authentication.
Session-Based Authentication – Secure admin login.
CORS Configuration – Enables safe frontend-backend interaction.
✅ Controllers (Business Logic)
authController.js – Handles user and admin authentication.
adminController.js – Manages admin-specific functionalities.
productController.js – Handles product CRUD operations.
contactController.js – Processes contact form submissions.
orderController.js – Manages order form submissions.
✅ Models (Database Schemas)
User.js – Defines the user schema (authentication, role-based access).
Admin.js – Defines admin schema for secure login.
Product.js – Defines product details, including images and stock.
Contact.js – Stores customer inquiries.
Order.js – Stores customer orders.
✅ Routes (API Endpoints)
authRoutes.js – Routes for user authentication (register, login).
adminRoutes.js – Routes for admin authentication & dashboard.
productRoutes.js – Routes for managing products (CRUD).
contactRoutes.js – Routes for contact form submissions.
orderRoutes.js – Routes for handling order submissions.
✅ Middleware
authMiddleware.js – Protects routes using JWT authentication.
✅ Development Tools:
Postman – API testing.
Git & GitHub – Version control and collaboration.
Nodemon – Auto-restarts the server during development.
ngrok – Exposes local development server to external networks.














2️⃣ Frontend (Client-Side)
✅ Languages:
HTML – Page structure.
CSS – Styling.
JavaScript – Handles user interactions and API requests.
✅ Frameworks & Libraries:
Bootstrap – Responsive UI framework.
AJAX (Fetch API) – Enables dynamic data loading.
✅ UI Components:
Home Page (index.html) – Displays featured products and general store information.
Warehouse Page (warehouse.html) – Showcases all available 3D-printed items.
Contact Page (contact.html) – Allows users to send inquiries.
Login Page (login.html) – User authentication using JWT.
Register Page (register.html) – Secure user registration.
Cart Page (cart.html) – Enables users to view and manage selected items.
Logout Functionality – Securely logs users out.
Admin Login Page (admin-login.html) – Admin authentication.
Admin Dashboard (admin-dashboard.html) – Manage users, products, and orders.
Add Items Page (add-item.html) – Upload new 3D print items.
✅ Frontend Scripts:
auth.js – Handles user authentication (register, login, logout).
AdminLogin.js – Handles admin authentication.
admin-dashboard.js – Manages admin panel functionalities.
custom.js – Includes UI animations, effects, and smooth scrolling.
✅ File Storage:
assets/ – Stores CSS, JavaScript, fonts, images, and logos.
css/ – Styling files (styles.css).
js/ – JavaScript files for various functionalities.
images/ – Stores static images for the site.
logo/ – Brand logos.




File Structure

Custom3D/
│── backend/                    # Backend folder
│   ├── controllers/             # Logic for handling routes
│   │   ├── authController.js    # Handles user authentication (login, register)
│   │   ├── productController.js # Handles product CRUD operations
│   │   ├── adminController.js   # Handles admin functionalities
│   │   ├── contactController.js # Handles contact form submissions
│   │   ├── orderController.js # Handles order form submissions
│   │
│   ├── data/                    # Database-related files
│   │   ├── db.js                # MongoDB connection setup
│   │
│   ├── models/                  # Database schemas
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Contact.js           # Contact schema
│   │   ├── Admin.js             # Admin schema
│   │   ├── Order.js             # Order schema
│   │
│   ├── routes/                  # API Routes
│   │   ├── authRoutes.js        # User authentication routes
│   │   ├── productRoutes.js     # Product-related routes
│   │   ├── adminRoutes.js       # Admin dashboard routes
│   │   ├── contactRoutes.js     # Contact form routes
│   │   ├── orderRoutes.js     # order routes

│   │
│   ├── middleware/              # Middleware functions
│   │   ├── authMiddleware.js    # Protects routes (JWT-based auth)
│   │
│   ├── config/                  # Configuration files
│   │   ├── db.js                # Database connection
│   │
│   ├── uploads/                 # Stores product images
│   ├── .env                     # Environment variables (DB_URI, JWT_SECRET, etc.)
│   ├── server.js                # Main server entry file
│   ├── package.json             # Project dependencies
│   ├── README.md                # Backend documentation
│
│
│
│
│── frontend/                     # Frontend folder
│   ├── public/                    # Static assets
│   │   ├── index.html             # Home Page
│   │   ├── admin-login.html       # Admin login page
│   │   ├── admin-dashboard.html   # Admin dashboard
│   │   ├── warehouse.html         # Warehouse product listing page
│   │   ├── contact.html           # Contact page
│   │   ├── cart.html           # cart page

│   │
│   ├── assets/                    # Static resources
│   │   ├── css/  
│   │   │   ├── styles.css         # Main CSS file
│   │   ├── fonts/                 # Custom fonts
│   │   ├── images/                # Static images
│   │   ├── logo/                  # Brand logos
│   │   ├── js/                        # JavaScript files
│   │   │   ├── bootstrap/             # Bootstrap scripts
│   │   │   ├── Home.js                # Home page logic
│   │   │   ├── Warehouse.js           # Warehouse listing logic
│   │   │   ├── Login.js               # Login page logic
│   │   │   ├── Register.js            # Register page logic
│   │   │   ├── Contact.js             # Contact page logic
│   │   │   ├── admin-dashboard.js      # Admin dashboard logic
│   │   │   ├── adminlogin.js      # Admin login logic
│   │   │   ├── cart.js      # cart logic
│   │
│── README.md                      # Project documentation
│── .gitignore                      # Files to ignore in Git



