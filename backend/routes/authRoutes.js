const express = require("express");

const {
  registerUser,
  loginUser,
  restoreSession,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Restore JWT for an already logged-in customer
router.post("/session", restoreSession);

module.exports = router;