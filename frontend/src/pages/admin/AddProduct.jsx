import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { FaLeaf } from "react-icons/fa";
import { API_BASE_URL } from "../../services/apiBase";

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
        `${API_BASE_URL}/api/products`,
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
    <AdminLayout>
    <style>{`
      .admin-product-form input,
      .admin-product-form textarea,
      .admin-product-form select {
        color: #173F2A;
      }
      .admin-product-form input::placeholder,
      .admin-product-form textarea::placeholder {
        color: #8FA396;
        opacity: 1;
      }
      .admin-product-form select option {
        color: #173F2A;
      }
    `}</style>
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

      <div style={styles.hero}>
        <div style={styles.heroCircle} />
        <FaLeaf style={styles.heroLeaf} />
        <p style={styles.eyebrow}>Catalogue</p>
        <h1 style={styles.heading}>Add Product</h1>
        <p style={styles.heroText}>
          Create a premium organic listing with images, pricing and optional bowl inventory.
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.subtitle}>Fill in listing details, media and bowl options</p>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            style={styles.backButton}
          >
            ← Back to products
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="admin-product-form"
          style={styles.form}
        >

          <div style={styles.card}>
          <h2 style={styles.cardTitle}>Product details</h2>

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

            <option value="Flowers">
              Flowers
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
          </div>

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

                  <option value="Honey">
                   Honey
                  </option>

                  <option value="Flowers">
                   Flowers
                  </option>

                  <option value="Vegetables">
                    Vegetables
                  </option>

                  <option value="fruits">
                    fruits
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

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Media</h2>
            <p style={styles.cardIntro}>
              Add listing photos, an optional video and an optional 3D model.
            </p>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>Images</span>
                <span style={styles.mediaMeta}>1 to 5</span>
              </div>

              {imagePreviews.length > 0 ? (
                <div style={styles.imageGrid}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} style={styles.imageBox}>
                      <img src={preview} alt="" style={styles.preview} />
                      <span style={styles.imageNumber}>{index + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyMedia}>No images selected yet</div>
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  required
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {images.length
                    ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                    : "Choose product images"}
                </span>
                <span style={styles.uploadHint}>JPEG, PNG or WebP</span>
              </label>
            </div>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>Video</span>
                <span style={styles.mediaMeta}>Optional</span>
              </div>

              {videoPreview ? (
                <video src={videoPreview} controls style={styles.videoPreview} />
              ) : (
                <div style={styles.emptyMedia}>No video selected yet</div>
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoChange}
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {video ? video.name : "Choose a product video"}
                </span>
                <span style={styles.uploadHint}>MP4, WebM or MOV</span>
              </label>
            </div>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>3D model</span>
                <span style={styles.mediaMeta}>GLB or GLTF</span>
              </div>

              {model3d ? (
                <div style={styles.modelSelected}>{model3d.name}</div>
              ) : (
                <div style={styles.emptyMedia}>No 3D model selected yet</div>
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handle3DChange}
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {model3d ? model3d.name : "Choose a 3D model"}
                </span>
                <span style={styles.uploadHint}>.glb or .gltf</span>
              </label>
            </div>
          </div>

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
    </AdminLayout>
  );
}


// =============================
// STYLES
// =============================

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "transparent",
    padding: "8px 8px 48px",
    boxSizing: "border-box",
    marginLeft: "-215px",
  },

  hero: {
    background:
      "linear-gradient(135deg, #123d27 0%, #1d5a38 55%, #2f7048 100%)",
    borderRadius: "24px",
    padding: "32px 36px",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
    boxShadow: "0 18px 45px rgba(24, 74, 45, 0.16)",
  },

  heroCircle: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    right: "-70px",
    top: "-80px",
  },

  heroLeaf: {
    position: "absolute",
    right: "28px",
    bottom: "22px",
    fontSize: "58px",
    color: "rgba(255,255,255,0.08)",
  },

  eyebrow: {
    margin: 0,
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    fontSize: "11px",
    color: "#dfc27b",
    fontWeight: 800,
  },

  heroText: {
    margin: "8px 0 0",
    maxWidth: "520px",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.6,
    fontSize: "14px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "20px",
    padding: "22px 24px 26px",
    marginBottom: "18px",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
  },

  cardTitle: {
    margin: "0 0 8px",
    color: "#173F2A",
    fontFamily: "Georgia, serif",
    fontSize: "22px",
    fontWeight: 500,
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

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "18px",
  },

  subtitle: {
    margin: 0,
    color: "#6B7A70",
    fontSize: "13px",
  },

  backButton: {
    padding: "10px 16px",
    border: "1px solid #D5DDD5",
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    color: "#173F2A",
    cursor: "pointer",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  container: {
    width: "100%",
    maxWidth: "860px",
    margin: "0 auto",
    backgroundColor: "transparent",
    padding: "0",
    borderRadius: "0",
    boxShadow: "none",
    boxSizing: "border-box",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: "36px",
    margin: "8px 0 0",
    fontFamily: "Georgia, serif",
    fontWeight: 500,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#173F2A",
    marginTop: "16px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  helpText: {
    margin: "0 0 8px",
    fontSize: "13px",
    color: "#6B7A70",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    boxSizing: "border-box",
    border: "1px solid #C9D8CC",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    background: "#F4F8F4",
    color: "#173F2A",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px 14px",
    boxSizing: "border-box",
    border: "1px solid #C9D8CC",
    borderRadius: "12px",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
    background: "#F4F8F4",
    color: "#173F2A",
  },

  // =============================
  // BOWL SECTION
  // =============================

  bowlSection: {
    marginTop: "0",
    padding: "22px 24px 26px",
    borderRadius: "20px",
    border: "1px solid #E3EBE4",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
    borderLeft: "4px solid #C79A45",
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
    display: "none",
  },

  cardIntro: {
    margin: "0 0 18px",
    color: "#6B7A70",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  mediaPanel: {
    border: "1px solid #E3EBE4",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "14px",
    background: "#FBFDFA",
  },

  mediaHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },

  mediaTitle: {
    fontSize: "15px",
    fontWeight: 800,
    color: "#173F2A",
  },

  mediaMeta: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    color: "#C79A45",
  },

  emptyMedia: {
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px dashed #C9D8CC",
    color: "#6B7A70",
    fontSize: "13px",
    textAlign: "center",
    background: "#F7FAF6",
  },

  uploadZone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px dashed #C79A45",
    background: "#FFFBF2",
    cursor: "pointer",
  },

  hiddenFile: {
    display: "none",
  },

  uploadAction: {
    color: "#173F2A",
    fontSize: "14px",
    fontWeight: 700,
  },

  uploadHint: {
    color: "#8FA396",
    fontSize: "12px",
  },

  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
    gap: "10px",
    margin: "4px 0 12px",
  },

  imageBox: {
    textAlign: "center",
    backgroundColor: "#F4F8F4",
    padding: "6px",
    borderRadius: "12px",
    border: "1px solid #D7E3D8",
  },

  preview: {
    width: "100%",
    height: "88px",
    objectFit: "cover",
    borderRadius: "8px",
    background: "#E7EEE8",
  },

  imageNumber: {
    display: "block",
    marginTop: "6px",
    fontSize: "11px",
    color: "#175C38",
    fontWeight: "700",
  },

  videoPreview: {
    width: "100%",
    maxHeight: "240px",
    margin: "4px 0 12px",
    borderRadius: "12px",
    backgroundColor: "#123d27",
  },

  modelSelected: {
    backgroundColor: "#EEF6EE",
    color: "#173F2A",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "12px",
    fontSize: "13px",
    fontWeight: 600,
  },

  button: {
    marginTop: "8px",
    padding: "15px",
    backgroundColor: "#175C38",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "800",
    boxShadow: "0 10px 24px rgba(23,92,56,0.22)",
  },
};

export default AddProduct;
