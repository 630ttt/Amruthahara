import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { FaLeaf } from "react-icons/fa";
import { API_BASE_URL } from "../../services/apiBase";

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
          `${API_BASE_URL}/api/products/${id}`
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
        `${API_BASE_URL}/api/products/${id}`,
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
      <AdminLayout>
        <div style={styles.loading}>
          Loading product...
        </div>
      </AdminLayout>
    );
  }

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
      <div style={styles.hero}>
        <div style={styles.heroCircle} />
        <FaLeaf style={styles.heroLeaf} />
        <p style={styles.eyebrow}>Catalogue</p>
        <h1 style={styles.heading}>
          Edit Product
        </h1>
        <p style={styles.heroText}>
          Update listing details, bowl inventory and media while keeping the Amruthahara look.
        </p>
      </div>

      <div style={styles.container}>

        <div style={styles.header}>
          <div>
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
          </div>

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

                  <option value="Flowers">
                    Flowers
                  </option>

                  <option value="Honey">
                    Honey
                  </option>

                  <option value="Vegetables">
                    Vegetables
                  </option>

                  <option value="Fruits">
                    Fruits
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

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Media</h2>
            <p style={styles.cardIntro}>
              Keep current files as they are, or choose replacements below.
            </p>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>Images</span>
                <span style={styles.mediaMeta}>Maximum 5</span>
              </div>

              {existingImages.length > 0 ? (
                <div style={styles.imageGrid}>
                  {existingImages.map((image, index) => (
                    <div key={`current-${index}`} style={styles.imageBox}>
                      <img
                        src={image}
                        alt=""
                        style={styles.productImage}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                      <span style={styles.imageText}>{index + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyMedia}>No images on this listing yet</div>
              )}

              {imagePreviews.length > 0 && (
                <div style={styles.imageGrid}>
                  {imagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} style={styles.imageBoxNew}>
                      <img src={preview} alt="" style={styles.productImage} />
                      <span style={styles.imageText}>New {index + 1}</span>
                    </div>
                  ))}
                </div>
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {newImages.length
                    ? `${newImages.length} new image${newImages.length > 1 ? "s" : ""} selected`
                    : "Choose replacement images"}
                </span>
                <span style={styles.uploadHint}>JPEG, PNG or WebP</span>
              </label>
            </div>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>Video</span>
                <span style={styles.mediaMeta}>Optional</span>
              </div>

              {existingVideo ? (
                <video src={existingVideo} controls style={styles.video} />
              ) : (
                <div style={styles.emptyMedia}>No video on this listing yet</div>
              )}

              {videoPreview && (
                <video src={videoPreview} controls style={styles.video} />
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={handleVideoChange}
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {newVideo ? newVideo.name : "Choose a replacement video"}
                </span>
                <span style={styles.uploadHint}>MP4, WebM or MOV</span>
              </label>
            </div>

            <div style={styles.mediaPanel}>
              <div style={styles.mediaHead}>
                <span style={styles.mediaTitle}>3D model</span>
                <span style={styles.mediaMeta}>GLB or GLTF</span>
              </div>

              {existingModel3d ? (
                <div style={styles.modelBox}>
                  <span>Current model is attached</span>
                  <a
                    href={existingModel3d}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.modelLink}
                  >
                    Open file
                  </a>
                </div>
              ) : (
                <div style={styles.emptyMedia}>No 3D model on this listing yet</div>
              )}

              {newModel3d && (
                <div style={styles.newModelBox}>{newModel3d.name}</div>
              )}

              <label style={styles.uploadZone}>
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={handle3DChange}
                  style={styles.hiddenFile}
                />
                <span style={styles.uploadAction}>
                  {newModel3d ? newModel3d.name : "Choose a replacement 3D model"}
                </span>
                <span style={styles.uploadHint}>.glb or .gltf</span>
              </label>
            </div>
          </div>

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
    </AdminLayout>
  );
}

// ================================
// STYLES
// ================================

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
    maxWidth: "560px",
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

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "18px",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: "36px",
    margin: "8px 0 0",
    fontFamily: "Georgia, serif",
    fontWeight: 500,
  },

  subtitle: {
    margin: 0,
    color: "#6B7A70",
    fontSize: "13px",
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

  // ================================
  // BOWL SECTION
  // ================================

  bowlSection: {
    marginTop: "0",
    marginBottom: "18px",
    padding: "22px 24px 26px",
    borderRadius: "20px",
    border: "1px solid #E3EBE4",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
    borderLeft: "4px solid #C79A45",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
    gap: "10px",
    margin: "4px 0 12px",
  },

  imageBox: {
    position: "relative",
    padding: "6px",
    backgroundColor: "#F4F8F4",
    border: "1px solid #D7E3D8",
    borderRadius: "12px",
    textAlign: "center",
  },

  imageBoxNew: {
    position: "relative",
    padding: "6px",
    backgroundColor: "#EEF6EE",
    border: "1px solid #C79A45",
    borderRadius: "12px",
    textAlign: "center",
  },

  productImage: {
    width: "100%",
    height: "88px",
    objectFit: "cover",
    borderRadius: "8px",
    display: "block",
    background: "#E7EEE8",
  },

  imageText: {
    display: "block",
    marginTop: "6px",
    fontSize: "11px",
    fontWeight: 700,
    color: "#175C38",
  },

  video: {
    width: "100%",
    maxHeight: "240px",
    borderRadius: "12px",
    backgroundColor: "#123d27",
    margin: "4px 0 12px",
  },

  helpText: {
    margin: "0 0 8px",
    color: "#6B7A70",
    fontSize: "13px",
    lineHeight: "1.5",
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

  modelBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "13px 14px",
    borderRadius: "12px",
    backgroundColor: "#EEF6EE",
    color: "#173F2A",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "12px",
  },

  modelLink: {
    color: "#175C38",
    fontWeight: "700",
    textDecoration: "none",
  },

  newModelBox: {
    padding: "12px 14px",
    borderRadius: "12px",
    backgroundColor: "#F4F8F4",
    color: "#173F2A",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "12px",
  },

  saveButton: {
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

  loading: {
    minHeight: "40vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#173F2A",
    fontSize: "18px",
    marginLeft: "-215px",
  },
};

export default EditProduct;
