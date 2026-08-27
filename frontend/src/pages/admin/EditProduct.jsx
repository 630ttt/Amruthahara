import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ================================
  // FORM DATA
  // ================================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    benefits: "",
    category: "",
    price: "",
    stock: "",

    // ================================
    // BOWL FIELDS
    // ================================

    availableInBowl: false,
    bowlCategory: "",
    inventoryDetails: "",
    inventoryPrice: "",
  });

  // ================================
  // IMAGES
  // ================================

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // ================================
  // VIDEO
  // ================================

  const [existingVideo, setExistingVideo] = useState("");
  const [newVideo, setNewVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  // ================================
  // 3D MODEL
  // ================================

  const [existingModel3d, setExistingModel3d] = useState("");
  const [newModel3d, setNewModel3d] = useState(null);

  // ================================
  // LOADING
  // ================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================================
  // GET PRODUCT
  // ================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load product"
          );
        }

        const product = data.product;

        // ================================
        // SET PRODUCT DATA
        // ================================

        setFormData({
          name: product.name || "",
          description: product.description || "",
          ingredients: product.ingredients || "",
          benefits: product.benefits || "",
          category: product.category || "",
          price: product.price ?? "",
          stock: product.stock ?? "",

          // ================================
          // BOWL FIELDS
          // ================================

          availableInBowl:
            product.availableInBowl === true,

          bowlCategory:
            product.bowlCategory || "",

          inventoryDetails:
            product.inventoryDetails || "",

          inventoryPrice:
            product.inventoryPrice ?? "",
        });

        // ================================
        // EXISTING MEDIA
        // ================================

        setExistingImages(product.images || []);
        setExistingVideo(product.video || "");
        setExistingModel3d(product.model3d || "");
      } catch (error) {
        console.error(
          "EDIT PRODUCT ERROR:",
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================================
  // NORMAL INPUT CHANGE
  // ================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ================================
  // IMAGES
  // ================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Maximum 5 images allowed");

      e.target.value = "";

      return;
    }

    setNewImages(files);

    imagePreviews.forEach((preview) => {
      URL.revokeObjectURL(preview);
    });

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  // ================================
  // VIDEO
  // ================================

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setNewVideo(file);

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoPreview(
      URL.createObjectURL(file)
    );
  };

  // ================================
  // 3D MODEL
  // ================================

  const handle3DChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const extension =
      file.name.split(".").pop().toLowerCase();

    if (
      extension !== "glb" &&
      extension !== "gltf"
    ) {
      alert(
        "Only .glb or .gltf 3D files are allowed"
      );

      e.target.value = "";

      return;
    }

    setNewModel3d(file);
  };

  // ================================
  // UPDATE PRODUCT
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================================
    // BOWL VALIDATION
    // ================================

    if (formData.availableInBowl) {
      if (!formData.bowlCategory) {
        alert(
          "Please select a Bowl category."
        );

        return;
      }

      if (
        !formData.inventoryDetails.trim()
      ) {
        alert(
          "Please enter inventory details."
        );

        return;
      }

      if (
        formData.inventoryPrice === "" ||
        Number(formData.inventoryPrice) < 0
      ) {
        alert(
          "Please enter a valid inventory price."
        );

        return;
      }
    }

    try {
      setSaving(true);

      const updateData = new FormData();

      // ================================
      // NORMAL PRODUCT FIELDS
      // ================================

      updateData.append(
        "name",
        formData.name
      );

      updateData.append(
        "description",
        formData.description
      );

      updateData.append(
        "ingredients",
        formData.ingredients
      );

      updateData.append(
        "benefits",
        formData.benefits
      );

      updateData.append(
        "category",
        formData.category
      );

      updateData.append(
        "price",
        formData.price
      );

      updateData.append(
        "stock",
        formData.stock
      );

      // ================================
      // BOWL FIELDS
      // ================================

      updateData.append(
        "availableInBowl",
        formData.availableInBowl
      );

      updateData.append(
        "bowlCategory",
        formData.availableInBowl
          ? formData.bowlCategory
          : ""
      );

      updateData.append(
        "inventoryDetails",
        formData.availableInBowl
          ? formData.inventoryDetails
          : ""
      );

      updateData.append(
        "inventoryPrice",
        formData.availableInBowl
          ? formData.inventoryPrice
          : ""
      );

      // ================================
      // REPLACE IMAGES
      // ================================

      if (newImages.length > 0) {
        newImages.forEach((image) => {
          updateData.append(
            "images",
            image
          );
        });
      }

      // ================================
      // REPLACE VIDEO
      // ================================

      if (newVideo) {
        updateData.append(
          "video",
          newVideo
        );
      }

      // ================================
      // REPLACE 3D MODEL
      // ================================

      if (newModel3d) {
        updateData.append(
          "model3d",
          newModel3d
        );
      }

      // ================================
      // DEBUG
      // ================================

      console.log(
        "Updating Product..."
      );

      console.log(
        "Bowl Available:",
        formData.availableInBowl
      );

      console.log(
        "Bowl Category:",
        formData.bowlCategory
      );

      console.log(
        "Inventory Details:",
        formData.inventoryDetails
      );

      console.log(
        "Inventory Price:",
        formData.inventoryPrice
      );

      // ================================
      // SEND UPDATE REQUEST
      // ================================

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          body: updateData,
        }
      );

      const data = await response.json();

      console.log(
        "Server Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update product"
        );
      }

      alert(
        "Product updated successfully!"
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading product...
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ================================ */}
        {/* HEADER */}
        {/* ================================ */}

        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>
              Edit Product
            </h1>

            <p style={styles.subtitle}>
              Update product information
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            style={styles.backButton}
          >
            ← Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          {/* ================================ */}
          {/* PRODUCT NAME */}
          {/* ================================ */}

          <label style={styles.label}>
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* ================================ */}
          {/* DESCRIPTION */}
          {/* ================================ */}

          <label style={styles.label}>
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          {/* ================================ */}
          {/* INGREDIENTS */}
          {/* ================================ */}

          <label style={styles.label}>
            Ingredients
          </label>

          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter product ingredients"
            style={styles.textarea}
          />

          {/* ================================ */}
          {/* BENEFITS */}
          {/* ================================ */}

          <label style={styles.label}>
            Benefits
          </label>

          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Enter product benefits"
            style={styles.textarea}
          />

          {/* ================================ */}
          {/* CATEGORY */}
          {/* ================================ */}

          <label style={styles.label}>
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">
              Select Category
            </option>

            <option value="Fruits">
              Fruits
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Honey">
              Honey
            </option>

            <option value="Grains">
              Grains
            </option>

            <option value="Spices">
              Spices
            </option>

            <option value="Organic Foods">
              Organic Foods
            </option>

            <option value="Wellness">
              Wellness
            </option>
          </select>

          {/* ================================ */}
          {/* PRODUCT PRICE */}
          {/* ================================ */}

          <label style={styles.label}>
            Product Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            style={styles.input}
          />

          {/* ================================ */}
          {/* STOCK */}
          {/* ================================ */}

          <label style={styles.label}>
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            style={styles.input}
          />

          {/* ================================ */}
          {/* BOWL SETTINGS */}
          {/* ================================ */}

          <div style={styles.bowlSection}>

            <h2 style={styles.bowlHeading}>
              Bowl Inventory
            </h2>

            <label style={styles.checkboxRow}>

              <input
                type="checkbox"
                name="availableInBowl"
                checked={
                  formData.availableInBowl
                }
                onChange={handleChange}
                style={styles.checkbox}
              />

              <span>
                Available in Bowl
              </span>

            </label>

            {/* ================================ */}
            {/* BOWL FIELDS ONLY WHEN AVAILABLE */}
            {/* ================================ */}

            {formData.availableInBowl && (
              <>

                {/* BOWL CATEGORY */}

                <label style={styles.label}>
                  Bowl Category
                </label>

                <select
                  name="bowlCategory"
                  value={
                    formData.bowlCategory
                  }
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select Bowl Category
                  </option>

                  <option value="Berries">
                    Berries
                  </option>

                  <option value="Melons">
                    Melons
                  </option>

                  <option value="Tropical">
                    Tropical
                  </option>

                  <option value="Citrus">
                    Citrus
                  </option>
                </select>

                {/* INVENTORY DETAILS */}

                <label style={styles.label}>
                  Inventory Details
                </label>

                <textarea
                  name="inventoryDetails"
                  value={
                    formData.inventoryDetails
                  }
                  onChange={handleChange}
                  placeholder={
                    "Example: Farm: Berry Best Farms\n50 kcal / basket"
                  }
                  style={styles.textarea}
                />

                <p style={styles.helpText}>
                  Enter the details that should
                  appear in the Bowl inventory.
                </p>

                {/* INVENTORY PRICE */}

                <label style={styles.label}>
                  Inventory Price
                </label>

                <input
                  type="number"
                  name="inventoryPrice"
                  value={
                    formData.inventoryPrice
                  }
                  onChange={handleChange}
                  placeholder="4.50"
                  min="0"
                  step="0.01"
                  style={styles.input}
                />

                <p style={styles.helpText}>
                  This is the separate price used
                  only for the Bowl.
                </p>

              </>
            )}

          </div>

          {/* ================================ */}
          {/* CURRENT IMAGES */}
          {/* ================================ */}

          <label style={styles.label}>
            Current Product Images
          </label>

          {existingImages.length > 0 ? (
            <div style={styles.imageGrid}>

              {existingImages.map(
                (image, index) => (
                  <div
                    key={index}
                    style={styles.imageBox}
                  >

                    <img
                      src={image}
                      alt={`Current ${
                        index + 1
                      }`}
                      style={
                        styles.productImage
                      }
                    />

                    <span
                      style={styles.imageText}
                    >
                      Image {index + 1}
                    </span>

                  </div>
                )
              )}

            </div>
          ) : (
            <p style={styles.noMedia}>
              No existing images
            </p>
          )}

          {/* ================================ */}
          {/* REPLACE IMAGES */}
          {/* ================================ */}

          <label style={styles.label}>
            Replace Product Images
          </label>

          <p style={styles.helpText}>
            Upload new images only if you want
            to replace the existing images.
            Maximum 5 images.
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            style={styles.fileInput}
          />

          {/* ================================ */}
          {/* NEW IMAGE PREVIEW */}
          {/* ================================ */}

          {imagePreviews.length > 0 && (
            <>
              <p style={styles.previewTitle}>
                New Images
              </p>

              <div style={styles.imageGrid}>

                {imagePreviews.map(
                  (preview, index) => (
                    <div
                      key={index}
                      style={styles.imageBox}
                    >

                      <img
                        src={preview}
                        alt={`New ${
                          index + 1
                        }`}
                        style={
                          styles.productImage
                        }
                      />

                      <span
                        style={
                          styles.imageText
                        }
                      >
                        New Image{" "}
                        {index + 1}
                      </span>

                    </div>
                  )
                )}

              </div>
            </>
          )}

          {/* ================================ */}
          {/* CURRENT VIDEO */}
          {/* ================================ */}

          <label style={styles.label}>
            Current Product Video
          </label>

          {existingVideo ? (
            <video
              src={existingVideo}
              controls
              style={styles.video}
            />
          ) : (
            <p style={styles.noMedia}>
              No existing video
            </p>
          )}

          {/* ================================ */}
          {/* REPLACE VIDEO */}
          {/* ================================ */}

          <label style={styles.label}>
            Replace Product Video
          </label>

          <p style={styles.helpText}>
            Select a video only if you want to
            replace the current video.
          </p>

          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideoChange}
            style={styles.fileInput}
          />

          {/* ================================ */}
          {/* NEW VIDEO PREVIEW */}
          {/* ================================ */}

          {videoPreview && (
            <>
              <p style={styles.previewTitle}>
                New Video
              </p>

              <video
                src={videoPreview}
                controls
                style={styles.video}
              />
            </>
          )}

          {/* ================================ */}
          {/* CURRENT 3D MODEL */}
          {/* ================================ */}

          <label style={styles.label}>
            Current 3D Model
          </label>

          {existingModel3d ? (
            <div style={styles.modelBox}>

              <span>
                ✓ 3D model currently available
              </span>

              <a
                href={existingModel3d}
                target="_blank"
                rel="noreferrer"
                style={styles.modelLink}
              >
                View File
              </a>

            </div>
          ) : (
            <p style={styles.noMedia}>
              No existing 3D model
            </p>
          )}

          {/* ================================ */}
          {/* REPLACE 3D MODEL */}
          {/* ================================ */}

          <label style={styles.label}>
            Replace 3D Model
          </label>

          <p style={styles.helpText}>
            Upload a new .glb or .gltf file only
            if you want to replace the current
            3D model.
          </p>

          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handle3DChange}
            style={styles.fileInput}
          />

          {/* ================================ */}
          {/* NEW 3D MODEL */}
          {/* ================================ */}

          {newModel3d && (
            <div style={styles.newModelBox}>

              <strong>
                New 3D Model:
              </strong>

              <span>
                {newModel3d.name}
              </span>

            </div>
          )}

          {/* ================================ */}
          {/* UPDATE BUTTON */}
          {/* ================================ */}

          <button
            type="submit"
            disabled={saving}
            style={{
              ...styles.saveButton,
              opacity: saving ? 0.6 : 1,
              cursor: saving
                ? "not-allowed"
                : "pointer",
            }}
          >
            {saving
              ? "Updating Product..."
              : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

// ================================
// STYLES
// ================================

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5F8F3",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "750px",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    padding: "35px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.08)",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },

  heading: {
    margin: 0,
    color: "#173F2A",
    fontSize: "32px",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#7A847C",
    fontSize: "13px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    marginTop: "15px",
    color: "#263D2E",
    fontSize: "14px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #D5DDD5",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px",
    border: "1px solid #D5DDD5",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    resize: "vertical",
    outline: "none",
  },

  // ================================
  // BOWL SECTION
  // ================================

  bowlSection: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#F5FAF3",
    border: "1px solid #DDEBDD",
    borderRadius: "12px",
  },

  bowlHeading: {
    margin: "0 0 18px",
    color: "#173F2A",
    fontSize: "20px",
    fontWeight: "700",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
  },

  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#166534",
  },

  imageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "5px",
  },

  imageBox: {
    padding: "7px",
    backgroundColor: "#F8FAF7",
    border: "1px solid #E3EAE1",
    borderRadius: "10px",
    textAlign: "center",
  },

  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    display: "block",
  },

  imageText: {
    display: "block",
    marginTop: "5px",
    fontSize: "11px",
    color: "#66736A",
  },

  video: {
    width: "100%",
    maxWidth: "420px",
    maxHeight: "280px",
    borderRadius: "10px",
    backgroundColor: "#000",
    marginTop: "5px",
  },

  noMedia: {
    color: "#888",
    fontSize: "13px",
  },

  helpText: {
    margin: "0 0 5px",
    color: "#777",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  fileInput: {
    padding: "12px",
    border: "1px solid #D5DDD5",
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
  },

  previewTitle: {
    margin: "15px 0 0",
    color: "#166534",
    fontWeight: "700",
    fontSize: "13px",
  },

  modelBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px",
    borderRadius: "8px",
    backgroundColor: "#EDF7ED",
    color: "#166534",
    fontSize: "13px",
  },

  modelLink: {
    color: "#166534",
    fontWeight: "700",
  },

  newModelBox: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "13px",
    borderRadius: "8px",
    backgroundColor: "#F3F7F1",
    color: "#263D2E",
    fontSize: "13px",
  },

  saveButton: {
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#166534",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "700",
  },

  backButton: {
    padding: "9px 14px",
    border: "1px solid #D5DDD5",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    color: "#173F2A",
    cursor: "pointer",
    fontWeight: "600",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#173F2A",
    fontSize: "18px",
  },
};

export default EditProduct;