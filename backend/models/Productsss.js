const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Product ingredients
    ingredients: {
      type: String,
      default: "",
    },

    // Product benefits
    benefits: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    // Maximum 5 product images
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 5;
        },
        message: "Product must have between 1 and 5 images",
      },
    },

    // One product video
    video: {
      type: String,
      default: "",
    },

    // One 3D model
    model3d: {
      type: String,
      default: "",
    },

    // =========================
    // BOWL DETAILS
    // =========================

    // Show this product in Bowl
    availableInBowl: {
      type: Boolean,
      default: false,
    },

    // Bowl-specific category
    // Example: Berries, Melons, Tropical, Citrus
    bowlCategory: {
      type: String,
      default: "",
    },

    // Details displayed in Bowl
    // Example: Farm: Sunny Orchards | 95 kcal / each
    inventoryDetails: {
      type: String,
      default: "",
    },

    // Separate price for Bowl
    inventoryPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Productsss", productSchema);