//paymentRoutes.js

const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/venmo", paymentController.processVenmoPayment);

module.exports = router;
