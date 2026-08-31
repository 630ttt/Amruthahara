const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const {
  identifyAuth,
  requireCustomer,
  requireAdmin,
} = require("../middleware/auth");

router.use(identifyAuth);

// =====================================================
// CREATE ORDER
// POST /api/orders
// =====================================================

router.post(
  "/",
  orderController.createOrder
);

// =====================================================
// GET LOGGED-IN CUSTOMER ORDERS
// GET /api/orders/my
// =====================================================

router.get(
  "/my",
  requireCustomer,
  orderController.getMyOrders
);

// =====================================================
// GET ORDERS BY CUSTOMER IDENTITY (AUTH OWNER ONLY)
// GET /api/orders/user/:email
// =====================================================

router.get(
  "/user/:email",
  requireCustomer,
  orderController.getUserOrders
);

// =====================================================
// GET ALL ORDERS - ADMIN
// GET /api/orders
// =====================================================

router.get(
  "/",
  requireAdmin,
  orderController.getAllOrders
);

// =====================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =====================================================

router.get(
  "/:id",
  orderController.getOrderById
);

// =====================================================
// UPDATE ORDER STATUS
// PUT /api/orders/:id/status
// =====================================================

router.put(
  "/:id/status",
  requireAdmin,
  orderController.updateOrderStatus
);

// =====================================================
// UPDATE PAYMENT
// PUT /api/orders/:id/payment
// =====================================================

router.put(
  "/:id/payment",
  orderController.updatePayment
);

module.exports = router;
