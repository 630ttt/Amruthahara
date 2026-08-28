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

console.log("🔥 RUNNING SERVER FILE:", __filename);
console.log("======================================");
console.log("🔥 AMRUTHAHARA BACKEND STARTING");
console.log("======================================");

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "1000mb",
  })
);

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
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AMRUTHAHARA BACKEND IS RUNNING 🚀",
  });
});

app.get("/hello-test", (req, res) => {
  res.json({
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
  res.json({
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
  console.error("❌ SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await connectDB();

    console.log("✅ MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("--------------------------------------");
      console.log(`🚀 Server Running on Port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("--------------------------------------");
    });
  } catch (error) {
    console.error("❌ Server startup failed!");
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

startServer();
