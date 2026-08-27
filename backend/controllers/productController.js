const Product = require("../models/Productsss");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      benefits,
      category,
      price,
      stock,

      // Bowl fields
      availableInBowl,
      bowlCategory,
      inventoryDetails,
      inventoryPrice,
    } = req.body;

    const BASE_URL = "http://localhost:5000";

    // Get uploaded images
    const images =
      req.files?.images?.map((file) => {
        return `${BASE_URL}/uploads/images/${file.filename}`;
      }) || [];

    // Get uploaded video
    const video =
      req.files?.video?.length > 0
        ? `${BASE_URL}/uploads/videos/${req.files.video[0].filename}`
        : "";

    // Get uploaded 3D model
    const model3d =
      req.files?.model3d?.length > 0
        ? `${BASE_URL}/uploads/models/${req.files.model3d[0].filename}`
        : "";

    const product = await Product.create({
      name,
      description,
      ingredients,
      benefits,
      category,
      price: Number(price),
      stock: Number(stock),

      images,
      video,
      model3d,

      // Bowl fields
      availableInBowl:
        availableInBowl === true ||
        availableInBowl === "true",

      bowlCategory: bowlCategory || "",

      inventoryDetails:
        inventoryDetails || "",

      inventoryPrice:
        inventoryPrice !== undefined &&
        inventoryPrice !== ""
          ? Number(inventoryPrice)
          : 0,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const BASE_URL = "http://localhost:5000";

    // Update normal fields
    product.name =
      req.body.name || product.name;

    product.description =
      req.body.description || product.description;

    // Ingredients
    product.ingredients =
      req.body.ingredients ?? product.ingredients;

    // Benefits
    product.benefits =
      req.body.benefits ?? product.benefits;

    product.category =
      req.body.category || product.category;

    if (req.body.price !== undefined) {
      product.price = Number(req.body.price);
    }

    if (req.body.stock !== undefined) {
      product.stock = Number(req.body.stock);
    }

    // =========================
    // UPDATE BOWL FIELDS
    // =========================

    if (req.body.availableInBowl !== undefined) {
      product.availableInBowl =
        req.body.availableInBowl === true ||
        req.body.availableInBowl === "true";
    }

    if (req.body.bowlCategory !== undefined) {
      product.bowlCategory =
        req.body.bowlCategory;
    }

    if (req.body.inventoryDetails !== undefined) {
      product.inventoryDetails =
        req.body.inventoryDetails;
    }

    if (req.body.inventoryPrice !== undefined) {
      product.inventoryPrice =
        req.body.inventoryPrice === ""
          ? 0
          : Number(req.body.inventoryPrice);
    }

    // =========================
    // UPDATE FILES
    // =========================

    // Replace images only if new images were uploaded
    if (
      req.files?.images &&
      req.files.images.length > 0
    ) {
      product.images = req.files.images.map(
        (file) =>
          `${BASE_URL}/uploads/images/${file.filename}`
      );
    }

    // Replace video only if new video uploaded
    if (
      req.files?.video &&
      req.files.video.length > 0
    ) {
      product.video =
        `${BASE_URL}/uploads/videos/${req.files.video[0].filename}`;
    }

    // Replace 3D model only if new model uploaded
    if (
      req.files?.model3d &&
      req.files.model3d.length > 0
    ) {
      product.model3d =
        `${BASE_URL}/uploads/models/${req.files.model3d[0].filename}`;
    }

    const updatedProduct =
      await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};