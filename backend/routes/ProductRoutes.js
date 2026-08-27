const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Create Product
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

// Update Product
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

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;