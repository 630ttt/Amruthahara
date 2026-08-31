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

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
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
