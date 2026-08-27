console.log("🔥 PAYMENT ROUTES FILE LOADED");

const express = require("express");

const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Payment router is working",
  });
});

router.post("/create-order", createRazorpayOrder);

router.post("/verify", verifyPayment);

module.exports = router;