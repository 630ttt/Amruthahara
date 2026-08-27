const express = require("express");
const { randomUUID } = require("crypto");

const {
  client,
  StandardCheckoutPayRequest,
} = require("../services/phonepeService");

const router = express.Router();

console.log("🔥 PHONEPE PAYMENT ROUTES LOADED");

// ==========================================
// TEST
// ==========================================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "PhonePe payment routes are working",
  });
});

// ==========================================
// CREATE PHONEPE WEBSITE PAYMENT
// POST /api/phonepe/create-order
// ==========================================

router.post("/create-order", async (req, res) => {
  try {
    console.log("🔥 PHONEPE CREATE ORDER ROUTE HIT");

    const { amount } = req.body;

    console.log("Received amount:", amount);

    if (
      amount === undefined ||
      amount === null ||
      amount === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const amountInRupees = Number(amount);

    if (
      Number.isNaN(amountInRupees) ||
      amountInRupees <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    // PhonePe expects paise
    const amountInPaisa = Math.round(
      amountInRupees * 100
    );

    if (amountInPaisa < 100) {
      return res.status(400).json({
        success: false,
        message: "Minimum payment amount is ₹1",
      });
    }

    const merchantOrderId =
      "AMR_" + randomUUID();

    const redirectUrl =
      "http://localhost:5173/payment-success";

    console.log(
      "Merchant Order ID:",
      merchantOrderId
    );

    console.log(
      "Amount in paise:",
      amountInPaisa
    );

    // ==========================================
    // WEBSITE STANDARD CHECKOUT REQUEST
    // ==========================================

    const request =
      StandardCheckoutPayRequest
        .builder()
        .merchantOrderId(
          merchantOrderId
        )
        .amount(amountInPaisa)
        .redirectUrl(redirectUrl)
        .build();

    console.log(
      "📦 Sending Standard Checkout request..."
    );

    const response =
      await client.pay(request);

    console.log(
      "✅ PhonePe payment created"
    );

    console.log({
      merchantOrderId,
      state: response.state,
      redirectUrl:
        response.redirectUrl,
    });

    return res.status(200).json({
      success: true,
      merchantOrderId,
      state: response.state,
      redirectUrl:
        response.redirectUrl,
    });
  } catch (error) {
    console.error(
      "❌ PHONEPE PAYMENT ERROR"
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Unable to create PhonePe payment",
    });
  }
});

module.exports = router;