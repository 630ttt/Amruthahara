require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const phonepeRoutes = require("./routes/phonepeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/ProductRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// =====================================================
// STARTUP LOGS
// =====================================================

console.log("🔥 RUNNING SERVER FILE:", __filename);
console.log("======================================");
console.log("🔥 AMRUTHAHARA BACKEND STARTING");
console.log("======================================");

// =====================================================
// MIDDLEWARE
// =====================================================

// CORS
app.use(
  cors({
    origin:"https://amruthahara-9.onrender.com",
    credentials: true,
  })
);

// JSON body
app.use(
  express.json({
    limit: "1000mb",
  })
);

// URL encoded body
app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

// =====================================================
// STATIC UPLOADS
// =====================================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================================
// BASIC TEST ROUTES
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AMRUTHAHARA BACKEND IS RUNNING 🚀",
  });
});

app.get("/hello-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AMRUTHAHARA SERVER IS WORKING",
  });
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/products", productRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/phonepe", phonepeRoutes);

// =====================================================
// AUTH TEST
// =====================================================

app.get("/api/auth/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AUTH ROUTES ARE WORKING",
  });
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("======================================");
  console.error("❌ SERVER ERROR");
  console.error("======================================");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// =====================================================
// PORT
// =====================================================

// Render provides process.env.PORT.
// Local development falls back to 5000.
const PORT = process.env.PORT || 5000;

// =====================================================
// START SERVER
// =====================================================

const startServer = async () => {
  try {
    console.log("🔄 Starting MongoDB connection...");

    await connectDB();

    console.log("✅ MongoDB connection completed");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("--------------------------------------");
      console.log(`🚀 Server Running on Port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("--------------------------------------");
    });
  } catch (error) {
    console.error("======================================");
    console.error("❌ SERVER STARTUP FAILED");
    console.error("======================================");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Full Error:", error);

    process.exit(1);
  }
};

startServer();
