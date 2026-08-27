import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#F5F8F3",
  },

  content: {
    marginLeft: "250px",
    width: "calc(100% - 250px)",
    padding: "35px",
    boxSizing: "border-box",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    gap: "20px",
  },

  heading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#173F2A",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#7A847C",
    fontSize: "13px",
  },

  button: {
    backgroundColor: "#166534",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "9px",
    fontWeight: "700",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },

  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E3EAE1",
    boxShadow: "0 8px 25px rgba(30,70,40,0.05)",
    overflow: "hidden",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    minWidth: "850px",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor: "#173F2A",
    color: "#FFFFFF",
    padding: "16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.4px",
  },

  td: {
    padding: "15px 16px",
    borderBottom: "1px solid #EDF0EC",
    color: "#465249",
    fontSize: "13px",
  },

  productCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  productImage: {
    width: "48px",
    height: "48px",
    borderRadius: "9px",
    objectFit: "cover",
    backgroundColor: "#F1F5EF",
  },

  productName: {
    color: "#263D2E",
    fontWeight: "700",
    fontSize: "14px",
  },

  category: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: "20px",
    backgroundColor: "#EAF4E5",
    color: "#39764B",
    fontSize: "11px",
    fontWeight: "700",
  },

  price: {
    color: "#175C38",
    fontWeight: "800",
  },

  stockGood: {
    color: "#39764B",
    fontWeight: "700",
  },

  stockLow: {
    color: "#C7772F",
    fontWeight: "700",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  edit: {
    backgroundColor: "#EFF5FF",
    color: "#2563EB",
    border: "1px solid #D7E5FF",
    padding: "8px 13px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
  },

  delete: {
    backgroundColor: "#FFF1F1",
    color: "#DC2626",
    border: "1px solid #FFD8D8",
    padding: "8px 13px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
  },

  loading: {
    padding: "60px",
    textAlign: "center",
    color: "#66736A",
    fontSize: "14px",
  },

  empty: {
    padding: "60px",
    textAlign: "center",
    color: "#66736A",
  },

  error: {
    backgroundColor: "#FFF1F1",
    color: "#B91C1C",
    padding: "14px 18px",
    borderRadius: "9px",
    marginBottom: "20px",
    fontSize: "13px",
  },
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH PRODUCTS
  // ==============================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Product fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  // ==============================
  // PRODUCT IMAGE
  // ==============================

  const getProductImage = (product) => {
    // New products - multiple images
    if (
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images[0];
    }

    // Old products - single image
    if (product.image) {
      return product.image;
    }

    return "";
  };

  // ==============================
  // JSX
  // ==============================

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.content}>

        {/* HEADER */}

        <div style={styles.topBar}>
          <div>
            <h1 style={styles.heading}>
              Products
            </h1>

            <p style={styles.subtitle}>
              Manage your Amruthahara product catalogue
            </p>
          </div>

          <Link
            to="/admin/products/add"
            style={styles.button}
          >
            + Add Product
          </Link>
        </div>

        {/* ERROR */}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* PRODUCT TABLE */}

        <div style={styles.tableCard}>

          {loading ? (

            <div style={styles.loading}>
              Loading products...
            </div>

          ) : products.length === 0 ? (

            <div style={styles.empty}>
              <h3>
                No Products Found
              </h3>

              <p>
                Add your first product from the
                Add Product button.
              </p>
            </div>

          ) : (

            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>
                  <tr>

                    <th style={styles.th}>
                      ID
                    </th>

                    <th style={styles.th}>
                      Product
                    </th>

                    <th style={styles.th}>
                      Category
                    </th>

                    <th style={styles.th}>
                      Price
                    </th>

                    <th style={styles.th}>
                      Stock
                    </th>

                    <th style={styles.th}>
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {products.map((product, index) => (

                    <tr key={product._id}>

                      {/* ID */}

                      <td style={styles.td}>
                        {index + 1}
                      </td>

                      {/* PRODUCT */}

                      <td style={styles.td}>

                        <div style={styles.productCell}>

                          {getProductImage(product) ? (
                            <img
                              src={getProductImage(product)}
                              alt={product.name}
                              style={styles.productImage}
                            />
                          ) : (
                            <div
                              style={{
                                ...styles.productImage,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                color: "#777",
                              }}
                            >
                              No Image
                            </div>
                          )}

                          <span style={styles.productName}>
                            {product.name}
                          </span>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td style={styles.td}>

                        <span style={styles.category}>
                          {product.category}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td style={styles.td}>

                        <span style={styles.price}>
                          ₹{product.price}
                        </span>

                      </td>

                      {/* STOCK */}

                      <td style={styles.td}>

                        <span
                          style={
                            product.stock <= 10
                              ? styles.stockLow
                              : styles.stockGood
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td style={styles.td}>

                        <div style={styles.actions}>

                          <Link
  to={`/admin/products/edit/${product._id}`}
  style={{
    ...styles.edit,
    textDecoration: "none",
    display: "inline-block",
  }}
>
  Edit
</Link>

                          <button
                            type="button"
                            style={styles.delete}
                            onClick={() =>
                              handleDelete(
                                product._id,
                                product.name
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>
    </div>
  );
}

export default Products;