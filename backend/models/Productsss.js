
const mongoose = require("mongoose");

// =====================================================
// PRODUCT SCHEMA
// =====================================================

const productSchema = new mongoose.Schema(
  {
    // ===================================================
    // BASIC PRODUCT DETAILS
    // ===================================================

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    ingredients: {
      type: String,
      default: "",
    },

    benefits: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    // ===================================================
    // PRICE & STOCK
    // ===================================================

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    // ===================================================
    // IMAGES
    //
    // New images are stored as:
    //
    // {
    //   data: Buffer,
    //   contentType: "image/jpeg"
    // }
    //
    // Old image URLs are also supported because
    // Mixed allows both formats.
    // ===================================================

    images: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    // ===================================================
    // VIDEO
    // ===================================================

    video: {
      type: String,
      default: "",
    },

    // ===================================================
    // 3D MODEL
    // ===================================================

    model3d: {
      type: String,
      default: "",
    },

    // ===================================================
    // BOWL DETAILS
    // ===================================================

    availableInBowl: {
      type: Boolean,
      default: false,
    },

    bowlCategory: {
      type: String,
      default: "",
    },

    inventoryDetails: {
      type: String,
      default: "",
    },

    inventoryPrice: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);


// =====================================================
// EXPORT PRODUCT MODEL
// =====================================================
//
// This is important.
//
// It ensures that:
//
// Product.find()
// Product.findById()
// Product.create()
// Product.findByIdAndDelete()
//
// all work correctly.
// =====================================================

module.exports =
  mongoose.models.Productsss ||
  mongoose.model(
    "Productsss",
    productSchema
  );

