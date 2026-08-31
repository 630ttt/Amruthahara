const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const getBearerToken = (req) => {
  const header = req.headers.authorization || "";

  if (header.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }

  return null;
};

const identifyAuth = async (req, res, next) => {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return next();
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server authentication is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return next();
    }

    if (decoded.role === "customer") {
      const user = await User.findById(decoded.id);

      if (user) {
        req.user = user;
        req.authRole = "customer";
      }

      return next();
    }

    if (decoded.role === "admin") {
      const admin = await Admin.findById(decoded.id);

      if (admin) {
        req.admin = admin;
        req.authRole = "admin";
      }

      return next();
    }

    const admin = await Admin.findById(decoded.id);

    if (admin) {
      req.admin = admin;
      req.authRole = "admin";
      return next();
    }

    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
      req.authRole = "customer";
    }

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const requireCustomer = (req, res, next) => {
  if (req.authRole !== "customer" || !req.user) {
    return res.status(401).json({
      success: false,
      message: "Please log in to view your orders",
      orders: [],
    });
  }

  return next();
};

const requireAdmin = (req, res, next) => {
  if (req.authRole !== "admin" || !req.admin) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
      orders: [],
    });
  }

  return next();
};

module.exports = {
  identifyAuth,
  requireCustomer,
  requireAdmin,
};
