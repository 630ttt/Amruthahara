const express = require("express");
const router = express.Router();

const { login } = require("../controllers/adminController");
const {
  getAllUsers,
} = require("../controllers/adminUserController");

// Your existing admin routes stay here

router.get("/users", getAllUsers);

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