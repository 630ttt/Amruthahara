import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    benefits: "",
    category: "",
    price: "",
    stock: "",

    // =============================
    // BOWL FIELDS
    // =============================
    availableInBowl: false,
    bowlCategory: "",
    inventoryDetails: "",
    inventoryPrice: "",
  });

  // 5 Images
  const [images, setImages] = useState([]);

  // Image previews
  const [imagePreviews, setImagePreviews] = useState([]);

  // 1 Video
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  // 1 3D Model
  const [model3d, setModel3d] = useState(null);

  const [loading, setLoading] = useState(false);

  // =============================
  // TOAST STATE
  // =============================

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  // =============================
  // NORMAL INPUT CHANGE
  // =============================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =============================
  // IMAGE CHANGE
  // =============================

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      showToast(
        "You can upload a maximum of 5 images.",
        "error"
      );

      e.target.value = "";
      return;
    }

    setImages(selectedFiles);

    const previews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  // =============================
  // VIDEO CHANGE
  // =============================

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setVideo(file);

    setVideoPreview(URL.createObjectURL(file));
  };

  // =============================
  // 3D MODEL CHANGE
  // =============================

  const handle3DChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setModel3d(file);
  };

  // =============================
  // SUBMIT
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      showToast(
        "Please upload at least one product image.",
        "error"
      );

      return;
    }

    // If product is available in Bowl,
    // require Bowl category, details and price.
    if (formData.availableInBowl) {
      if (!formData.bowlCategory) {
        showToast(
          "Please select a Bowl category.",
          "error"
        );
        return;
      }

      if (!formData.inventoryDetails.trim()) {
        showToast(
          "Please enter inventory details.",
          "error"
        );
        return;
      }

      if (
        formData.inventoryPrice === "" ||
        Number(formData.inventoryPrice) < 0
      ) {
        showToast(
          "Please enter a valid inventory price.",
          "error"
        );
        return;
      }
    }

    setLoading(true);

    try {
      const productData = new FormData();

      // =============================
      // NORMAL FIELDS
      // =============================

      productData.append("name", formData.name);

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "ingredients",
        formData.ingredients
      );

      productData.append(
        "benefits",
        formData.benefits
      );

      productData.append(
        "category",
        formData.category
      );

      productData.append(
        "price",
        formData.price
      );

      productData.append(
        "stock",
        formData.stock
      );

      // =============================
      // BOWL FIELDS
      // =============================

      productData.append(
        "availableInBowl",
        formData.availableInBowl
      );

      productData.append(
        "bowlCategory",
        formData.bowlCategory
      );

      productData.append(
        "inventoryDetails",
        formData.inventoryDetails
      );

      productData.append(
        "inventoryPrice",
        formData.inventoryPrice
      );

      // =============================
      // 5 IMAGES
      // =============================

      images.forEach((image) => {
        productData.append("images", image);
      });

      // =============================
      // 1 VIDEO
      // =============================

      if (video) {
        productData.append("video", video);
      }

      // =============================
      // 1 3D MODEL
      // =============================

      if (model3d) {
        productData.append("model3d", model3d);
      }

      console.log("Sending Product...");
      console.log("Images:", images);
      console.log("Video:", video);
      console.log("3D Model:", model3d);

      console.log("Bowl Available:", formData.availableInBowl);
      console.log("Bowl Category:", formData.bowlCategory);
      console.log(
        "Inventory Details:",
        formData.inventoryDetails
      );
      console.log(
        "Inventory Price:",
        formData.inventoryPrice
      );

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          body: productData,
        }
      );

      const data = await response.json();

      console.log("Server Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add product"
        );
      }

      if (data.success) {
        showToast(
          "Product added successfully!",
          "success"
        );

        setTimeout(() => {
          navigate("/admin/products");
        }, 1200);
      }
    } catch (error) {
      console.error(
        "ADD PRODUCT ERROR:",
        error
      );

      showToast(
        error.message || "Unable to add product",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* ============================= */}
      {/* TOAST NOTIFICATION */}
      {/* ============================= */}

      {toast && (
        <div
          style={{
            ...styles.toast,
            ...(toast.type === "error"
              ? styles.toastError
              : styles.toastSuccess),
          }}
        >
          <div
            style={{
              ...styles.toastIcon,
              ...(toast.type === "error"
                ? styles.toastIconError
                : styles.toastIconSuccess),
            }}
          >
            {toast.type === "error" ? "!" : "✓"}
          </div>

          <div style={styles.toastMessage}>
            {toast.message}
          </div>

          <button
            type="button"
            onClick={() => setToast(null)}
            style={styles.toastClose}
          >
            ×
          </button>
        </div>
      )}

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          {/* PRODUCT NAME */}

          <label style={styles.label}>
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Fresh Apples"
            required
            style={styles.input}
          />

          {/* DESCRIPTION */}

          <label style={styles.label}>
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Fresh organic product"
            required
            style={styles.textarea}
          />

          {/* INGREDIENTS */}

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

          {/* BENEFITS */}

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

          {/* CATEGORY */}

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

            <option value="Flowers">
              Flowers
            </option>

            <option value="Organic Foods">
              Organic Foods
            </option>

            <option value="Wellness">
              Wellness
            </option>
          </select>

          {/* PRICE */}

          <label style={styles.label}>
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="120"
            min="0"
            required
            style={styles.input}
          />

          {/* STOCK */}

          <label style={styles.label}>
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="50"
            min="0"
            required
            style={styles.input}
          />

          {/* ======================= */}
          {/* BOWL SETTINGS */}
          {/* ======================= */}

          <div style={styles.bowlSection}>

            <h2 style={styles.bowlHeading}>
              Bowl Inventory
            </h2>

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                name="availableInBowl"
                checked={formData.availableInBowl}
                onChange={handleChange}
                style={styles.checkbox}
              />

              <span>
                Available in Bowl
              </span>
            </label>

            {formData.availableInBowl && (
              <>
                {/* BOWL CATEGORY */}

                <label style={styles.label}>
                  Bowl Category
                </label>

                <select
                  name="bowlCategory"
                  value={formData.bowlCategory}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select Bowl Category
                  </option>

                  <option value="Berries">
                    Berries
                  </option>
                  <option value="Flowers">
                    Flowers
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
                  value={formData.inventoryDetails}
                  onChange={handleChange}
                  placeholder="Example: Farm: Berry Best Farms&#10;50 kcal / basket"
                  style={styles.textarea}
                />

                <p style={styles.helpText}>
                  Enter the details that should appear
                  in the Bowl inventory.
                </p>

                {/* INVENTORY PRICE */}

                <label style={styles.label}>
                  Inventory Price
                </label>

                <input
                  type="number"
                  name="inventoryPrice"
                  value={formData.inventoryPrice}
                  onChange={handleChange}
                  placeholder="4.50"
                  min="0"
                  step="0.01"
                  style={styles.input}
                />

                <p style={styles.helpText}>
                  This is the separate price used only
                  for the Bowl.
                </p>
              </>
            )}

          </div>

          {/* ======================= */}
          {/* PRODUCT IMAGES */}
          {/* ======================= */}

          <label style={styles.label}>
            Product Images
          </label>

          <p style={styles.helpText}>
            Upload between 1 and 5 images
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            required
            style={styles.file}
          />

          {/* IMAGE PREVIEWS */}

          {imagePreviews.length > 0 && (
            <div style={styles.imageGrid}>

              {imagePreviews.map(
                (preview, index) => (
                  <div
                    key={index}
                    style={styles.imageBox}
                  >
                    <img
                      src={preview}
                      alt={`Product ${index + 1}`}
                      style={styles.preview}
                    />

                    <span style={styles.imageNumber}>
                      Image {index + 1}
                    </span>
                  </div>
                )
              )}

            </div>
          )}

          {/* ======================= */}
          {/* PRODUCT VIDEO */}
          {/* ======================= */}

          <label style={styles.label}>
            Product Video
          </label>

          <p style={styles.helpText}>
            Upload one product video
          </p>

          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleVideoChange}
            style={styles.file}
          />

          {videoPreview && (
            <video
              src={videoPreview}
              controls
              style={styles.videoPreview}
            />
          )}

          {/* ======================= */}
          {/* 3D MODEL */}
          {/* ======================= */}

          <label style={styles.label}>
            Product 3D Model
          </label>

          <p style={styles.helpText}>
            Upload one .glb or .gltf file
          </p>

          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handle3DChange}
            style={styles.file}
          />

          {model3d && (
            <div style={styles.modelSelected}>
              3D Model Selected:
              <strong>
                {" "}
                {model3d.name}
              </strong>
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}


// =============================
// STYLES
// =============================

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f8f3",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  // =============================
  // TOAST
  // =============================

  toast: {
    position: "fixed",
    top: "25px",
    right: "25px",
    zIndex: 99999,

    minWidth: "300px",
    maxWidth: "380px",

    padding: "14px 16px",

    display: "flex",
    alignItems: "center",
    gap: "12px",

    borderRadius: "14px",

    boxShadow:
      "0 12px 35px rgba(0,0,0,0.14)",

    animation:
      "toastSlideIn 0.35s ease forwards",
  },

  toastSuccess: {
    backgroundColor: "#ffffff",
    border: "1px solid #d7ead1",
  },

  toastError: {
    backgroundColor: "#ffffff",
    border: "1px solid #f0cccc",
  },

  toastIcon: {
    width: "30px",
    height: "30px",
    minWidth: "30px",

    borderRadius: "50%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: "15px",
    fontWeight: "800",
  },

  toastIconSuccess: {
    backgroundColor: "#e9f6e4",
    color: "#38832f",
  },

  toastIconError: {
    backgroundColor: "#fdeaea",
    color: "#d92d20",
  },

  toastMessage: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    lineHeight: "1.4",
  },

  toastClose: {
    border: "none",
    background: "transparent",
    color: "#999",
    fontSize: "21px",
    cursor: "pointer",
    padding: "0 3px",
    lineHeight: "1",
  },

  // =============================
  // CONTAINER
  // =============================

  container: {
    width: "100%",
    maxWidth: "750px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 25px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  heading: {
    color: "#14532D",
    fontSize: "32px",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#333",
    marginTop: "16px",
  },

  helpText: {
    margin: "0 0 5px",
    fontSize: "12px",
    color: "#777",
  },

  input: {
    width: "100%",
    padding: "13px",
    boxSizing: "border-box",
    border: "1px solid #d5ddd5",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px",
    boxSizing: "border-box",
    border: "1px solid #d5ddd5",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
  },

  // =============================
  // BOWL SECTION
  // =============================

  bowlSection: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #d7e5d5",
    backgroundColor: "#f7faf6",
  },

  bowlHeading: {
    margin: "0 0 18px",
    color: "#14532D",
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

  file: {
    padding: "12px",
    border: "1px solid #d5ddd5",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },

  imageGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    marginTop: "10px",
  },

  imageBox: {
    textAlign: "center",
    backgroundColor: "#f7faf6",
    padding: "8px",
    borderRadius: "10px",
    border: "1px solid #e3e9e2",
  },

  preview: {
    width: "100%",
    height: "130px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  imageNumber: {
    display: "block",
    marginTop: "6px",
    fontSize: "12px",
    color: "#166534",
    fontWeight: "600",
  },

  videoPreview: {
    width: "100%",
    maxHeight: "350px",
    marginTop: "10px",
    borderRadius: "10px",
    backgroundColor: "#000",
  },

  modelSelected: {
    backgroundColor: "#edf7ed",
    color: "#14532D",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "5px",
    fontSize: "13px",
  },

  button: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#166534",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    fontSize: "16px",
    fontWeight: "700",
  },
};

export default AddProduct;