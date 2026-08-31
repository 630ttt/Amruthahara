
const express = require("express");

const router = express.Router();

const { login } = require("../controllers/adminController");

const {
  getAllUsers,
} = require("../controllers/adminUserController");

const {
  getAllOrders,
  updateOrderStatus,
  getSalesAnalytics,
} = require("../controllers/orderController");

const {
  identifyAuth,
  requireAdmin,
} = require("../middleware/auth");

// =====================================================
// USERS
// =====================================================

router.get("/users", getAllUsers);

router.get("/analytics", getSalesAnalytics);

// =====================================================
// ORDERS
// =====================================================

router.get(
  "/orders",
  identifyAuth,
  requireAdmin,
  getAllOrders
);

router.put(
  "/orders/:id/status",
  identifyAuth,
  requireAdmin,
  updateOrderStatus
);

// =====================================================
// TEST
// =====================================================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working",
  });
});

// =====================================================
// LOGIN
// =====================================================

router.post("/login", login);

module.exports = router;

