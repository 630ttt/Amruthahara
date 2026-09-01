const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getMySubscriptions,
  getUserSubscriptions,
} = require("../controllers/subscriptionController");

const {
  identifyAuth,
} = require("../middleware/auth");

const requireLoggedInCustomer = (req, res, next) => {
  if (req.authRole !== "customer" || !req.user) {
    return res.status(401).json({
      success: false,
      message: "Please log in to manage your subscription",
    });
  }

  return next();
};

router.use(identifyAuth);

router.post("/", requireLoggedInCustomer, createSubscription);

router.get("/my", requireLoggedInCustomer, getMySubscriptions);

router.get("/user/:userId", requireLoggedInCustomer, getUserSubscriptions);

module.exports = router;
