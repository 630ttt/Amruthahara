const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  getProductImage,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", getProducts);

// =====================================================
// GET PRODUCT IMAGE
// IMPORTANT: PUT THIS BEFORE /:id
// =====================================================

router.get(
  "/:id/image/:imageIndex",
  getProductImage
);

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:id", getProduct);

// =====================================================
// CREATE PRODUCT
// =====================================================

router.post(
  "/",
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "model3d",
      maxCount: 1,
    },
  ]),
  createProduct
);

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put(
  "/:id",
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "model3d",
      maxCount: 1,
    },
  ]),
  updateProduct
);

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete(
  "/:id",
  deleteProduct
);

module.exports = router;
