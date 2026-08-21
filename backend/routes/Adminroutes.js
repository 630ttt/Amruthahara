const express = require("express");
const router = express.Router();

const { login } = require("../controllers/adminController");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working",
  });
});

// Login Route
router.post("/login", login);

module.exports = router;