
|=======================================|
    Custom3D Webstore
    Created by: Nathan Peterson
    Description: The 3D Print Webstore
    Date: 3/4/25
|=======================================|



📌 Project Overview
The 3D Print Webstore is a full-stack e-commerce platform designed to manage and sell custom 3D-printed items. It enables users to browse products, add items to their cart, register and log in securely, place orders, and submit inquiries with 3D model file uploads.
The platform utilizes:
Secure user authentication with JWT, password hashing, and session-based security for admin access.
Admin Dashboard for managing products, users, orders, and customer inquiries.
Cloudinary storage for images and 3D model files (STL, OBJ, STEP, 3MF) to ensure reliable file handling.
MongoDB as a cloud database to store users, products, orders, and contact requests.
RESTful API architecture built with Node.js, Express.js, and MongoDB for efficient backend operations.
Frontend developed with HTML, CSS, JavaScript, and Bootstrap, offering a dynamic user experience with AJAX-powered updates.
The project includes order management, file uploads, and an admin-controlled inventory system, making it a fully functional e-commerce solution for custom 3D printing services.










🚀 Features
🛍 Public Pages
✔️ Home Page (index.html) – Displays featured products and store information.
✔️ Warehouse Page (warehouse.html) – Lists all 3D-printed items available for purchase.
✔️ Contact Page (contact.html) – Allows users to send inquiries with file uploads (supports STL, OBJ, STEP, 3MF files).
✔️ Cart Page (cart.html) – Users can add/remove items and proceed to checkout.
✔️ Find Prints Page (find-prints.html) – Search for available 3D prints.🔒 User Authentication
✔️ Login Page (login.html) – Secure user login using JWT authentication.
✔️ Register Page (register.html) – Secure user registration with password hashing.
✔️ Logout – Securely logs users out and clears their session.🛠️ Admin Functionality
✔️ Admin Login Page (admin-login.html) – Authenticates admin users securely.
✔️ Admin Dashboard (admin-dashboard.html) – Provides an interface for managing:
📦 Products – Add/Edit/Delete 3D print items.
👥 Users – View and manage registered customers.
📩 Contact Requests – View/download file submissions from users.
🛒 Orders – View and manage customer orders.
✔️ Product Management:
Upload new products (with Cloudinary-based image storage).
Edit/Delete items from the warehouse.
✔️ Order Management:
View orders with customer details and purchase history.
Manage order status and process transactions.
✔️ Contact Management:
View submitted inquiries (including downloadable 3D print files stored on Cloudinary).
Respond to customer queries efficiently.
🗄️ Database & File Management
✔️ MongoDB (db.js) – Stores and retrieves data using Mongoose models.
✔️ User Management – Handles authentication & authorization for users and admins.
✔️ Product Management – CRUD operations for 3D print products.
✔️ Order Management – Processes customer orders with a secure checkout system.
✔️ Contact Management – Stores inquiries and uploaded 3D model files.
✔️ Cloudinary Integration –
📁 Stores product images dynamically for fast and secure retrieval.
📂 Handles 3D model file uploads (STL, OBJ, STEP, 3MF) for user inquiries.
✔️ Automatic Featured Products – Fetches random featured prints for the homepage.

🔐 Security & API
✔️ RESTful API Architecture – Handles authentication, products, orders, and contact forms.
✔️ CORS-enabled API Requests – Ensures secure frontend-backend communication.
✔️ JWT Authentication (authMiddleware.js) – Secure, token-based authentication for users.
✔️ Session-Based Authentication (express-session) – Secure admin authentication.
✔️ Password Encryption (bcrypt.js) – Encrypts passwords for enhanced security.

📡 Deployment
🚀 Backend (Render)
✔️ Hosted on Render (https://custom3d-backend.onrender.com).
✔️ Automatic deployments from GitHub.
✔️ Environment variables managed through Render's settings.
✔️ Uses MongoDB Atlas for cloud-based database storage.
🌎 Frontend (Netlify)
✔️ Hosted on Netlify (https://delicate-yeot-77f124.netlify.app/public).
✔️ Automatic deployments from GitHub.
✔️ Environment variables managed through Netlify settings.
✔️ CORS-enabled API requests to the Render backend.

🛠️ Tech Stack
1️⃣ Backend (Server-Side)
✅ Programming Language:
Node.js – JavaScript runtime for server-side logic.
✅ Frameworks & Libraries:
Express.js – Handles API requests and backend logic.
Mongoose – ODM library for MongoDB schema interactions.
dotenv – Loads environment variables securely.
bcrypt.js – Password hashing for security.
jsonwebtoken (JWT) – Secure user authentication.
express-session – Handles session-based authentication.
cookie-parser – Parses authentication tokens stored in cookies.
cors – Enables cross-domain API communication.
multer & Cloudinary – Handles file uploads for product images & 3D models.
✅ Database & Storage:
MongoDB Atlas (db.js) – Stores users, products, orders, and contact inquiries.
Cloudinary Storage – Manages product images and file uploads.
✅ Controllers (Business Logic):
authController.js – Handles user/admin authentication.
adminController.js – Manages admin-specific functionalities.
productController.js – Handles product CRUD operations.
contactController.js – Processes contact form submissions with file uploads.
orderController.js – Manages customer orders.
✅ Models (Database Schemas):
User.js – Defines user schema (authentication, role-based access).
Admin.js – Defines admin schema for secure login.
Product.js – Stores product details, including images and stock.
Contact.js – Stores customer inquiries and uploaded files.
Order.js – Stores customer orders.


✅ Middleware:
authMiddleware.js – Protects routes using JWT authentication.
✅ Development Tools:
Postman – API testing.
Git & GitHub – Version control and collaboration.
Nodemon – Auto-restarts the server during development.
ngrok – Exposes local development server to external networks.

2️⃣ Frontend (Client-Side)
✅ Languages:
HTML – Page structure.
CSS – Styling and responsive design.
JavaScript – User interactions & API requests.
✅ Frameworks & Libraries:
Bootstrap – Responsive UI framework.
AJAX (Fetch API) – Dynamic data loading.
✅ Frontend Scripts:
auth.js – Handles user authentication (register, login, logout).
adminlogin.js – Handles admin authentication.
admin-dashboard.js – Manages admin panel functionalities (users, products, orders).
cart.js – Manages cart operations (adding/removing items, checkout).
contact.js – Manages the contact form (submitting inquiries with file uploads).
config.js – Stores API configuration (e.g., API_BASE_URL).
Home.js – Controls homepage functionality (e.g., loading featured products dynamically).
Warehouse.js – Manages the warehouse page (fetches and displays all available products).
register.js – Handles user registration logic.
Login.js – Handles user login authentication.
order.js – Manages order processing and checkout functionality.

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

│── frontend/                     # Frontend folder
│   ├── public/                    # Static assets
│   │   ├── index.html             # Home Page
│   │   ├── admin-login.html       # Admin login page
│   │   ├── login.html       # User login page
│   │   ├── admin-dashboard.html   # Admin dashboard
│   │   ├── warehouse.html         # Warehouse product listing page
│   │   ├── contact.html           # Contact page
│   │   ├── cart.html           # cart page
│   │   ├── register.html           # register page
│   │   ├── find-prints.html       # find prints page
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
│   │   │   ├── register.js            # Register page logic
│   │   │   ├── contact.js             # Contact page logic
│   │   │   ├── admin-dashboard.js      # Admin dashboard logic
│   │   │   ├── adminlogin.js      # Admin login logic
│   │   │   ├── cart.js      # cart logic
│   │   │   ├── order.js      # orderlogic
│   │   │   ├── auth.js      # authlogic
│   │   │   ├── config.js      # configlogic
│   │
│── README.md                      # Project documentation
│── .gitignore                      # Files to ignore in Git



