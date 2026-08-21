import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));

      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log("Sending product:", formData);

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: Number(formData.price),
            stock: Number(formData.stock),
            image: formData.image,
          }),
        }
      );

      console.log(
        "Response status:",
        response.status
      );

      const responseText = await response.text();

      console.log(
        "Response:",
        responseText
      );

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (error) {
        throw new Error(
          "Frontend received HTML instead of JSON. Check the Request URL in browser Network tab."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add product"
        );
      }

      if (data.success) {
        alert("Product added successfully!");

        navigate("/admin/products");
      } else {
        throw new Error(
          data.message || "Product was not added"
        );
      }

    } catch (error) {
      console.error(
        "ADD PRODUCT ERROR:",
        error
      );

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.heading}>
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

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


          <label style={styles.label}>
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={styles.file}
          />


          {preview && (
            <img
              src={preview}
              alt="Product Preview"
              style={styles.preview}
            />
          )}


          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
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

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f8f3",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

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
    marginTop: "10px",
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

  file: {
    padding: "12px",
    border: "1px solid #d5ddd5",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },

  preview: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
    marginTop: "10px",
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
    cursor: "pointer",
  },
};

export default AddProduct;