const dns = require("dns");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 MongoDB connection starting...");

    // Check if MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing from environment variables"
      );
    }

    console.log("🔑 MONGO_URI found");

    // Windows / ISP DNS often refuses MongoDB SRV lookups
    // (querySrv ECONNREFUSED _mongodb._tcp....mongodb.net).
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
      family: 4,
    });

    console.log("✅ MongoDB Connected");

    return mongoose.connection;
  } catch (error) {
    console.error("======================================");
    console.error("❌ MONGODB CONNECTION FAILED");
    console.error("======================================");

    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);

    // Don't hide the actual error
    throw error;
  }
};

module.exports = connectDB;
