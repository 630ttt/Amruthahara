
const mongoose = require("mongoose");
const Product = require("../models/Productsss");
const { API_BASE_URL } = require("../config/apiBase");

const BASE_URL = API_BASE_URL;

const PRODUCTS_LIST_CACHE_MS = 30 * 1000;

let productsListCache = {
  expiresAt: 0,
  body: null,
};

const clearProductsListCache = () => {
  productsListCache = {
    expiresAt: 0,
    body: null,
  };
};

const listingImageRewrite = {
  $map: {
    input: { $ifNull: ["$images", []] },
    as: "img",
    in: {
      $cond: [
        { $eq: [{ $type: "$$img" }, "string"] },
        "$$img",
        { $literal: true },
      ],
    },
  },
};

const findProductsWithoutImageData = (match = null) => {
  const pipeline = [];

  if (match) {
    pipeline.push({ $match: match });
  }

  pipeline.push({
    $addFields: {
      images: listingImageRewrite,
    },
  });

  return Product.aggregate(pipeline);
};


// =====================================================
// CREATE PRODUCT
// =====================================================

exports.createProduct = async (req, res) => {
  try {
    console.log(
      "🔥 CREATE PRODUCT CONTROLLER RUNNING"
    );

    console.log(
      "🔥 FILES:",
      req.files
    );

    const {
      name,
      description,
      ingredients,
      benefits,
      category,
      price,
      stock,

      availableInBowl,
      bowlCategory,
      inventoryDetails,
      inventoryPrice,
    } = req.body;


    // =================================================
    // IMAGES
    // STORE DIRECTLY IN MONGODB
    // =================================================

    const images =
      req.files?.images?.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      })) || [];


    console.log(
      "🔥 IMAGES TO STORE:",
      images.length
    );


    // =================================================
    // VIDEO
    // SAME AS BEFORE
    // =================================================

    const video =
      req.files?.video?.length > 0
        ? `${BASE_URL}/uploads/videos/${req.files.video[0].filename}`
        : "";


    // =================================================
    // 3D MODEL
    // SAME AS BEFORE
    // =================================================

    const model3d =
      req.files?.model3d?.length > 0
        ? `${BASE_URL}/uploads/models/${req.files.model3d[0].filename}`
        : "";


    // =================================================
    // CREATE PRODUCT
    // =================================================

    const product =
      await Product.create({
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

        availableInBowl:
          availableInBowl === true ||
          availableInBowl === "true",

        bowlCategory:
          bowlCategory || "",

        inventoryDetails:
          inventoryDetails || "",

        inventoryPrice:
          inventoryPrice !== undefined &&
          inventoryPrice !== ""
            ? Number(inventoryPrice)
            : 0,
      });


    console.log(
      "✅ PRODUCT CREATED:",
      product._id
    );

    clearProductsListCache();


    res.status(201).json({
      success: true,

      message:
        "Product Created Successfully",

      product: formatProduct(
        product
      ),
    });

  } catch (error) {

    console.error(
      "❌ CREATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

exports.getProducts = async (
  req,
  res
) => {
  try {
    if (
      productsListCache.body &&
      Date.now() < productsListCache.expiresAt
    ) {
      return res.status(200).json(productsListCache.body);
    }

    const products = await Product.find()
      .select({ "images.data": 0 })
      .lean();

    const body = {
      success: true,
      products: products.map((product) =>
        formatProduct(product)
      ),
    };

    productsListCache = {
      expiresAt: Date.now() + PRODUCTS_LIST_CACHE_MS,
      body,
    };

    return res.status(200).json(body);

  } catch (error) {

    console.error(
      "❌ GET PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

exports.getProduct = async (
  req,
  res
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const product = await Product.findById(req.params.id)
      .select({ "images.data": 0 })
      .lean();


    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product Not Found",
      });
    }


    res.status(200).json({
      success: true,

      product:
        formatProduct(product),
    });

  } catch (error) {

    console.error(
      "❌ GET PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET IMAGE FROM MONGODB
// =====================================================

exports.getProductImage = async (
  req,
  res
) => {
  try {

    console.log(
      "🔥 GET PRODUCT IMAGE"
    );

    console.log(
      "🔥 PRODUCT ID:",
      req.params.id
    );

    console.log(
      "🔥 IMAGE INDEX:",
      req.params.imageIndex
    );


    // =================================================
    // FIND PRODUCT
    // =================================================

    const imageIndex =
      Number(
        req.params.imageIndex
      );

    if (
      !Number.isInteger(
        imageIndex
      ) ||
      imageIndex < 0
    ) {

      return res.status(400).send(
        "Invalid image index"
      );
    }

    const product =
      await Product.findById(
        req.params.id
      )
        .select({
          _id: 1,
          images: {
            $slice: [imageIndex, 1],
          },
        })
        .lean();


    if (!product) {

      console.log(
        "❌ PRODUCT NOT FOUND"
      );

      return res.status(404).send(
        "Product not found"
      );
    }


    const image =
      product.images?.[0];


    if (!image) {

      console.log(
        "❌ IMAGE NOT FOUND"
      );

      return res.status(404).send(
        "Image not found"
      );
    }


    console.log(
      "🔥 IMAGE CONTENT TYPE:",
      image.contentType
    );


    // =================================================
    // NEW MONGODB IMAGE
    // =================================================

    if (
      image.data &&
      image.contentType
    ) {

      let imageBuffer;


      // =================================================
      // CASE 1
      // NORMAL NODE.JS BUFFER
      // =================================================

      if (
        Buffer.isBuffer(
          image.data
        )
      ) {

        console.log(
          "✅ IMAGE DATA IS BUFFER"
        );

        imageBuffer =
          image.data;
      }


      // =================================================
      // CASE 2
      // MONGODB BSON BINARY
      // =================================================

      else if (
        image.data.buffer &&
        Buffer.isBuffer(
          image.data.buffer
        )
      ) {

        console.log(
          "✅ IMAGE DATA IS BSON BINARY"
        );

        imageBuffer =
          image.data.buffer;
      }


      // =================================================
      // CASE 3
      // SERIALIZED BUFFER
      // =================================================

      else if (
        image.data.type ===
          "Buffer" &&
        Array.isArray(
          image.data.data
        )
      ) {

        console.log(
          "✅ IMAGE DATA IS SERIALIZED BUFFER"
        );

        imageBuffer =
          Buffer.from(
            image.data.data
          );
      }


      // =================================================
      // CASE 4
      // MONGODB BINARY WITH VALUE()
      // =================================================

      else if (
        typeof image.data.value ===
        "function"
      ) {

        console.log(
          "✅ IMAGE DATA HAS BSON VALUE()"
        );

        imageBuffer =
          Buffer.from(
            image.data.value()
          );
      }


      // =================================================
      // INVALID IMAGE DATA
      // =================================================

      else {

        console.error(
          "❌ UNKNOWN IMAGE DATA FORMAT"
        );

        console.error(
          image.data
        );

        return res.status(500).send(
          "Invalid image binary data"
        );
      }


      // =================================================
      // CHECK BUFFER
      // =================================================

      if (
        !imageBuffer ||
        !Buffer.isBuffer(
          imageBuffer
        )
      ) {

        console.error(
          "❌ IMAGE BUFFER CONVERSION FAILED"
        );

        return res.status(500).send(
          "Unable to convert image data"
        );
      }


      // =================================================
      // CHECK IMAGE SIZE
      // =================================================

      if (
        imageBuffer.length === 0
      ) {

        console.error(
          "❌ IMAGE BUFFER IS EMPTY"
        );

        return res.status(404).send(
          "Image data is empty"
        );
      }


      console.log(
        "✅ IMAGE BUFFER SIZE:",
        imageBuffer.length,
        "bytes"
      );


      // =================================================
      // SEND IMAGE
      // =================================================

      res.status(200);


      // IMPORTANT:
      // Tell browser what type of image this is

      res.set(
        "Content-Type",
        image.contentType
      );


      // IMPORTANT:
      // Tell browser exact image size

      res.set(
        "Content-Length",
        imageBuffer.length
      );


      // Cache image

      res.set(
        "Cache-Control",
        "public, max-age=86400"
      );


      // Prevent browser from downloading
      // instead of displaying the image

      res.set(
        "Content-Disposition",
        "inline"
      );


      // Send actual binary image

      return res.end(
        imageBuffer
      );
    }


    // =================================================
    // OLD URL IMAGE
    // =================================================

    if (
      typeof image === "string"
    ) {

      console.log(
        "🔄 OLD URL IMAGE"
      );

      return res.redirect(
        image
      );
    }


    // =================================================
    // INVALID IMAGE
    // =================================================

    return res.status(404).send(
      "Invalid image"
    );

  } catch (error) {

    console.error(
      "❌ IMAGE ERROR:",
      error
    );

    console.error(
      error.stack
    );

    return res.status(500).send(
      "Unable to load image"
    );
  }
};


// =====================================================
// UPDATE PRODUCT
// =====================================================

exports.updateProduct = async (
  req,
  res
) => {
  try {

    console.log(
      "🔥 UPDATE PRODUCT CONTROLLER RUNNING"
    );

    console.log(
      "🔥 UPDATE FILES:",
      req.files
    );


    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product Not Found",
      });
    }


    // =================================================
    // NORMAL FIELDS
    // =================================================

    if (
      req.body.name !== undefined
    ) {
      product.name =
        req.body.name;
    }


    if (
      req.body.description !==
      undefined
    ) {
      product.description =
        req.body.description;
    }


    if (
      req.body.ingredients !==
      undefined
    ) {
      product.ingredients =
        req.body.ingredients;
    }


    if (
      req.body.benefits !==
      undefined
    ) {
      product.benefits =
        req.body.benefits;
    }


    if (
      req.body.category !==
      undefined
    ) {
      product.category =
        req.body.category;
    }


    // =================================================
    // PRICE
    // =================================================

    if (
      req.body.price !==
      undefined
    ) {
      product.price =
        Number(
          req.body.price
        );
    }


    // =================================================
    // STOCK
    // =================================================

    if (
      req.body.stock !==
      undefined
    ) {
      product.stock =
        Number(
          req.body.stock
        );
    }


    // =================================================
    // BOWL
    // =================================================

    if (
      req.body.availableInBowl !==
      undefined
    ) {

      product.availableInBowl =
        req.body.availableInBowl ===
          true ||
        req.body.availableInBowl ===
          "true";
    }


    if (
      req.body.bowlCategory !==
      undefined
    ) {

      product.bowlCategory =
        req.body.bowlCategory;
    }


    if (
      req.body.inventoryDetails !==
      undefined
    ) {

      product.inventoryDetails =
        req.body.inventoryDetails;
    }


    if (
      req.body.inventoryPrice !==
      undefined
    ) {

      product.inventoryPrice =
        req.body.inventoryPrice ===
        ""
          ? 0
          : Number(
              req.body.inventoryPrice
            );
    }


    // =================================================
    // UPDATE IMAGES
    // =================================================
    // Only replace images when new images are uploaded
    // =================================================

    if (
      req.files?.images &&
      req.files.images.length > 0
    ) {

      product.images =
        req.files.images.map(
          (file) => ({
            data: file.buffer,

            contentType:
              file.mimetype,
          })
        );


      console.log(
        "🔥 NEW IMAGES STORED:",
        product.images.length
      );
    }


    // =================================================
    // UPDATE VIDEO
    // SAME MECHANISM
    // =================================================

    if (
      req.files?.video &&
      req.files.video.length > 0
    ) {

      product.video =
        `${BASE_URL}/uploads/videos/${req.files.video[0].filename}`;
    }


    // =================================================
    // UPDATE 3D MODEL
    // SAME MECHANISM
    // =================================================

    if (
      req.files?.model3d &&
      req.files.model3d.length > 0
    ) {

      product.model3d =
        `${BASE_URL}/uploads/models/${req.files.model3d[0].filename}`;
    }


    // =================================================
    // SAVE
    // =================================================

    const updatedProduct =
      await product.save();


    console.log(
      "✅ PRODUCT UPDATED:",
      updatedProduct._id
    );

    clearProductsListCache();


    res.status(200).json({
      success: true,

      message:
        "Product Updated Successfully",

      product:
        formatProduct(
          updatedProduct
        ),
    });

  } catch (error) {

    console.error(
      "❌ UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE PRODUCT
// =====================================================

exports.deleteProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({
        success: false,

        message:
          "Product Not Found",
      });
    }

    clearProductsListCache();


    res.status(200).json({
      success: true,

      message:
        "Product Deleted Successfully",
    });

  } catch (error) {

    console.error(
      "❌ DELETE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// FORMAT PRODUCT FOR FRONTEND
// =====================================================

function formatProduct(product) {

  const obj =
    product.toObject
      ? product.toObject()
      : product;


  // =================================================
  // CONVERT IMAGE DATA TO API URL
  // =================================================

  obj.images =
    (obj.images || []).map(
      (image, index) => {

        // =================================================
        // NEW MONGODB IMAGE
        // =================================================

        if (
          typeof image ===
          "string"
        ) {

          return image;
        }

        if (image) {
          return `${BASE_URL}/api/products/${obj._id}/image/${index}`;
        }


        return "";
      }
    );


  return obj;
}

