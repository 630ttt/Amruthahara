import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.loading}>
          Loading products...
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section}>

      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>
            AMRUTHAHARA COLLECTION
          </p>

          <h2 style={styles.heading}>
            Fresh from the Farm
          </h2>

          <p style={styles.subtitle}>
            Carefully selected organic and natural products
            for your everyday wellness.
          </p>
        </div>

        <div style={styles.count}>
          {products.length} Products
        </div>
      </div>


      {products.length === 0 ? (

        <div style={styles.empty}>
          <h3>No products available</h3>

          <p>
            Products added by the admin will appear here.
          </p>
        </div>

      ) : (

        <div style={styles.grid}>

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}

    </section>
  );
}


const styles = {

  section: {
    width: "100%",
    padding: "70px 6%",
    boxSizing: "border-box",
    backgroundColor: "#FAFCF8",
  },

  header: {
    maxWidth: "1400px",
    margin: "0 auto 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
  },

  eyebrow: {
    margin: "0 0 8px",
    color: "#6B8E6B",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  heading: {
    margin: 0,
    color: "#173F2A",
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    margin: "10px 0 0",
    color: "#707A73",
    fontSize: "15px",
    lineHeight: "1.6",
    maxWidth: "600px",
  },

  count: {
    color: "#39764B",
    backgroundColor: "#EEF6EB",
    padding: "9px 16px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  grid: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "25px",
  },

  loading: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#39764B",
    fontSize: "16px",
  },

  empty: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "16px",
    color: "#66716A",
  },

};

export default ProductSection;