const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

const createRazorpayOrder = async (req, res) => {
  try {
    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `amruthahara_${Date.now()}`,
    };

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create(options);

    console.log(
      "Razorpay order created:",
      razorpayOrder.id
    );

    // Save order in MongoDB
    const order = await Order.create({
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      currency: "INR",
      status: "Pending",

      customer: {
        name: customerName || "",
        email: customerEmail || "",
        phone: customerPhone || "",
      },
    });

    console.log(
      "MongoDB order created:",
      order._id
    );

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      databaseOrder: order,
    });

  } catch (error) {
    console.error(
      "Razorpay order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create Razorpay order",
      error: error.message,
    });
  }
};


// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // Compare signatures
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Update MongoDB order
    const order = await Order.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: "Paid",
      },
      {
        new: true,
      }
    );

    console.log(
      "Payment verified successfully:",
      razorpay_payment_id
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      databaseOrder: order,
    });

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
};


module.exports = {
  createRazorpayOrder,
  verifyPayment,
};