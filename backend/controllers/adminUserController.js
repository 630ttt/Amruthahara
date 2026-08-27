const User = require("../models/User");

// Get all registered customers
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

module.exports = {
  getAllUsers,
};