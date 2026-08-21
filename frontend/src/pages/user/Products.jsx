import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProductCard from "../../components/product/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      console.log("PRODUCTS FROM BACKEND:", data);

      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Product API failed:", data);
      }
    } catch (error) {
      console.error("PRODUCT FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        {/* PAGE HEADER */}

        <div style={styles.header}>

          <div>
            <p style={styles.smallTitle}>
              AMRUTHAHARA
            </p>

            <h1 style={styles.heading}>
              Fresh Products
            </h1>

            <p style={styles.description}>
              Discover fresh, natural and quality
              products carefully selected for your
              home.
            </p>
          </div>

        </div>


        {/* MAIN CONTENT */}

        <div style={styles.main}>

          {/* SIDEBAR */}

          <aside style={styles.sidebar}>

            <h2 style={styles.filterTitle}>
              Filters
            </h2>

            <div style={styles.line} />

            <h3 style={styles.categoryTitle}>
              Categories
            </h3>

            {categories.map((category) => (
              <label
                key={category}
                style={styles.categoryRow}
              >

                <input
                  type="checkbox"
                  checked={
                    selectedCategory === category
                  }
                  onChange={() =>
                    setSelectedCategory(category)
                  }
                  style={styles.checkbox}
                />

                <span>
                  {category}
                </span>

              </label>
            ))}

          </aside>


          {/* PRODUCTS AREA */}

          <section style={styles.productsArea}>

            <div style={styles.productsHeader}>

              <div>
                <h2 style={styles.productsTitle}>
                  {selectedCategory === "All"
                    ? "All Products"
                    : selectedCategory}
                </h2>

                <p style={styles.count}>
                  {filteredProducts.length} products
                </p>
              </div>

            </div>


            {/* LOADING */}

            {loading && (
              <div style={styles.message}>
                Loading products...
              </div>
            )}


            {/* PRODUCTS */}

            {!loading &&
              filteredProducts.length > 0 && (

                <div style={styles.grid}>

                  {filteredProducts.map(
                    (product) => (

                      <ProductCard
                        key={product._id}
                        product={product}
                      />

                    )
                  )}

                </div>

              )}


            {/* EMPTY */}

            {!loading &&
              filteredProducts.length === 0 && (

                <div style={styles.empty}>

                  <div style={styles.emptyIcon}>
                    🛒
                  </div>

                  <h2>
                    No Products Found
                  </h2>

                  <p>
                    No products are available in
                    this category yet.
                  </p>

                </div>

              )}

          </section>

        </div>

      </div>
    </>
  );
}


const styles = {

  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#F7F9F6",
    boxSizing: "border-box",
  },

  header: {
    width: "100%",
    padding:
      "55px clamp(20px, 6vw, 90px)",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #EAF4E8, #F8FBF7)",
    borderBottom:
      "1px solid #E1E9DF",
  },

  smallTitle: {
    margin: "0 0 8px",
    color: "#6A856F",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  heading: {
    margin: 0,
    color: "#16452D",
    fontSize:
      "clamp(34px, 5vw, 56px)",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  description: {
    maxWidth: "600px",
    marginTop: "15px",
    color: "#69756C",
    fontSize: "16px",
    lineHeight: "1.6",
  },

  main: {
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
    padding:
      "35px clamp(20px, 5vw, 70px) 70px",
    boxSizing: "border-box",

    display: "grid",
    gridTemplateColumns:
      "230px minmax(0, 1fr)",

    gap: "30px",
  },

  sidebar: {
    backgroundColor: "#fff",
    border:
      "1px solid #E1E8DF",
    borderRadius: "14px",
    padding: "22px",
    height: "fit-content",
    boxSizing: "border-box",
  },

  filterTitle: {
    margin: 0,
    color: "#234432",
    fontSize: "20px",
  },

  line: {
    height: "1px",
    backgroundColor: "#E8EDE7",
    margin:
      "18px 0 20px",
  },

  categoryTitle: {
    margin:
      "0 0 18px",
    color: "#526157",
    fontSize: "14px",
    fontWeight: "700",
  },

  categoryRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    color: "#59665D",
    fontSize: "13px",
    cursor: "pointer",
  },

  checkbox: {
    width: "15px",
    height: "15px",
    accentColor: "#166534",
    cursor: "pointer",
  },

  productsArea: {
    minWidth: 0,
  },

  productsHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  productsTitle: {
    margin: 0,
    color: "#203D2B",
    fontSize: "28px",
    fontWeight: "800",
  },

  count: {
    margin:
      "5px 0 0",
    color: "#89938B",
    fontSize: "12px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill, minmax(220px, 1fr))",

    gap: "25px",
  },

  message: {
    padding: "80px 20px",
    textAlign: "center",
    color: "#166534",
    fontSize: "18px",
  },

  empty: {
    backgroundColor: "#fff",
    border:
      "1px solid #E1E8DF",
    borderRadius: "14px",
    padding: "80px 20px",
    textAlign: "center",
    color: "#66736A",
  },

  emptyIcon: {
    fontSize: "45px",
    marginBottom: "15px",
  },

};

export default Products;