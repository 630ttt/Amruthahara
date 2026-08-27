import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import ProductCard from "../../components/product/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      console.log("PRODUCTS FROM BACKEND:", data);
      if (data.success) {
        setProducts(data.products || []);
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
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const getProductPrice = (product) => {
    const price = product?.price;
    if (typeof price === "number") return price;
    if (typeof price === "string")
      return parseFloat(price.replace(/[₹,\s]/g, "")) || 0;
    return 0;
  };

  const getDietaryValues = (product) => {
    let values = [];
    if (Array.isArray(product?.dietaryNeeds)) {
      values = [...values, ...product.dietaryNeeds];
    }
    if (typeof product?.dietaryNeeds === "string") {
      values.push(product.dietaryNeeds);
    }
    if (Array.isArray(product?.dietary)) {
      values = [...values, ...product.dietary];
    }
    if (typeof product?.dietary === "string") {
      values.push(product.dietary);
    }
    if (Array.isArray(product?.tags)) {
      values = [...values, ...product.tags];
    }
    if (typeof product?.tags === "string") {
      values.push(product.tags);
    }
    if (product?.isOrganic === true || product?.organic === true) {
      values.push("Organic");
    }
    if (product?.isGlutenFree === true || product?.glutenFree === true) {
      values.push("Gluten-Free");
    }
    return values.map((value) => String(value).toLowerCase().trim());
  };

  const toggleDietary = (dietary) => {
    setSelectedDietary((prev) =>
      prev.includes(dietary)
        ? prev.filter((item) => item !== dietary)
        : [...prev, dietary]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (minPrice !== "") {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        result = result.filter((product) => getProductPrice(product) >= min);
      }
    }

    if (maxPrice !== "") {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        result = result.filter((product) => getProductPrice(product) <= max);
      }
    }

    if (selectedDietary.length > 0) {
      result = result.filter((product) => {
        const productDietary = getDietaryValues(product);
        return selectedDietary.every((filter) =>
          productDietary.some(
            (value) =>
              value === filter.toLowerCase() ||
              value.includes(filter.toLowerCase())
          )
        );
      });
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }

    return result;
  }, [products, selectedCategory, minPrice, maxPrice, selectedDietary, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSelectedDietary([]);
    setSortBy("featured");
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" ? 1 : 0) +
    selectedDietary.length;

  const handleProductClick = (product) => {
    if (!product?._id) return;
    navigate(`/products/${product._id}`);
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <p style={styles.smallTitle}>PREMIUM ORGANIC COLLECTION</p>
            <h1 style={styles.heading}>Shop Organic Goodness</h1>
            <p style={styles.description}>
              Discover fresh, natural and quality products carefully selected for
              your home.
            </p>

            <div style={styles.trustRow}>
              <div style={styles.trustItem}>
                <span style={styles.trustIcon}>✓</span>
                <span>100% Quality Products</span>
              </div>

              <div style={styles.trustItem}>
                <span style={styles.trustIcon}>✓</span>
                <span>Fresh & Natural</span>
              </div>

              <div style={styles.trustItem}>
                <span style={styles.trustIcon}>✓</span>
                <span>Secure Shopping</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.main}>
          <aside style={styles.sidebar}>
            <div style={styles.sidebarTop}>
              <h3 style={styles.sidebarMainTitle}>Filters</h3>

              {activeFilterCount > 0 && (
                <button style={styles.clearTopButton} onClick={clearAllFilters}>
                  Clear All
                </button>
              )}
            </div>

            <div style={styles.filterGroup}>
              <h3 style={styles.categoryTitle}>Shop By Category</h3>

              <div style={styles.categoryList}>
                {categories.map((category) => (
                  <label key={category} style={styles.categoryRow}>
                    <input
                      type="checkbox"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      style={styles.checkbox}
                    />

                    <span
                      style={
                        selectedCategory === category
                          ? styles.activeCategoryLabel
                          : styles.categoryLabel
                      }
                    >
                      {category}
                    </span>

                    {category !== "All" && (
                      <span style={styles.categoryCount}>
                        {
                          products.filter(
                            (product) => product.category === category
                          ).length
                        }
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.line} />

            <div style={styles.filterGroup}>
              <h3 style={styles.categoryTitle}>Price Range</h3>

              <div style={styles.priceInputs}>
                <input
                  type="number"
                  min="0"
                  placeholder="₹ Min"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  style={styles.priceInput}
                />

                <span style={styles.priceSeparator}>-</span>

                <input
                  type="number"
                  min="0"
                  placeholder="₹ Max"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  style={styles.priceInput}
                />
              </div>

              {minPrice !== "" &&
                maxPrice !== "" &&
                parseFloat(minPrice) > parseFloat(maxPrice) && (
                  <p style={styles.priceError}>
                    Minimum price cannot be greater than maximum price.
                  </p>
                )}
            </div>

            <div style={styles.line} />

            <div style={styles.filterGroup}>
              <h3 style={styles.categoryTitle}>Dietary Needs</h3>

              <div style={styles.dietaryList}>
                <label style={styles.dietaryRow}>
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes("Organic")}
                    onChange={() => toggleDietary("Organic")}
                    style={styles.checkbox}
                  />
                  <span
                    style={
                      selectedDietary.includes("Organic")
                        ? styles.activeCategoryLabel
                        : styles.categoryLabel
                    }
                  >
                    Organic
                  </span>
                </label>

                <label style={styles.dietaryRow}>
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes("Gluten-Free")}
                    onChange={() => toggleDietary("Gluten-Free")}
                    style={styles.checkbox}
                  />
                  <span
                    style={
                      selectedDietary.includes("Gluten-Free")
                        ? styles.activeCategoryLabel
                        : styles.categoryLabel
                    }
                  >
                    Gluten-Free
                  </span>
                </label>
              </div>

              <div style={styles.pillGroup}>
                <button
                  type="button"
                  style={
                    selectedDietary.includes("Organic")
                      ? styles.activePill
                      : styles.pill
                  }
                  onClick={() => toggleDietary("Organic")}
                >
                  Organic
                </button>

                <button
                  type="button"
                  style={
                    selectedDietary.includes("Gluten-Free")
                      ? styles.activePill
                      : styles.pill
                  }
                  onClick={() => toggleDietary("Gluten-Free")}
                >
                  Gluten-Free
                </button>
              </div>
            </div>

            <div style={styles.line} />

            <div style={styles.sidebarBottom}>
              <div style={styles.deliveryIcon}>🚚</div>
              <div>
                <strong style={styles.deliveryTitle}>Fresh Delivery</strong>
                <p style={styles.deliveryText}>
                  Quality products delivered to your doorstep.
                </p>
              </div>
            </div>
          </aside>

          <section style={styles.productsArea}>
            <div style={styles.toolbar}>
              <div style={styles.activeTags}>
                <span style={styles.activeLabel}>
                  {filteredProducts.length} Products
                </span>

                <span style={styles.divider}>|</span>

                <span style={styles.showingText}>
                  Showing {selectedCategory}
                </span>

                {minPrice !== "" && (
                  <span style={styles.filterTag}>
                    Min ₹{minPrice}
                    <span
                      style={styles.removeFilter}
                      onClick={() => setMinPrice("")}
                    >
                      ×
                    </span>
                  </span>
                )}

                {maxPrice !== "" && (
                  <span style={styles.filterTag}>
                    Max ₹{maxPrice}
                    <span
                      style={styles.removeFilter}
                      onClick={() => setMaxPrice("")}
                    >
                      ×
                    </span>
                  </span>
                )}

                {selectedDietary.map((dietary) => (
                  <span key={dietary} style={styles.filterTag}>
                    {dietary}
                    <span
                      style={styles.removeFilter}
                      onClick={() => toggleDietary(dietary)}
                    >
                      ×
                    </span>
                  </span>
                ))}

                {selectedCategory !== "All" && (
                  <span style={styles.filterTag}>
                    {selectedCategory}
                    <span
                      style={styles.removeFilter}
                      onClick={() => setSelectedCategory("All")}
                    >
                      ×
                    </span>
                  </span>
                )}
              </div>

              <div style={styles.sortBox}>
                <span style={styles.sortLabel}>Sort by</span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <div style={styles.activeFilterBar}>
                <div>
                  <span style={styles.activeFilterText}>
                    {activeFilterCount} filter
                    {activeFilterCount > 1 ? "s" : ""} applied
                  </span>
                </div>

                <button
                  style={styles.clearFilterButton}
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {loading && (
              <div style={styles.loadingContainer}>
                <div style={styles.loader}></div>

                <p style={styles.loadingText}>Loading premium products...</p>
              </div>
            )}

            {!loading && filteredProducts.length > 0 && (
              <div style={styles.grid}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id || product.id || index}
                    style={styles.productWrapper}
                    onClick={() => handleProductClick(product)}
                  >
                    <div style={styles.productCardContainer}>
                      {index < 3 && (
                        <div style={styles.bestSeller}>BESTSELLER</div>
                      )}

                      <div style={styles.productInner}>
                        <ProductCard product={product} />
                      </div>

                      <div style={styles.deliveryBadge}>
                        <span style={styles.deliveryCheck}>✓</span>
                        Quality Assured
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>🛒</div>

                <h2 style={styles.emptyHeading}>No Products Found</h2>

                <p style={styles.emptyText}>
                  Try changing your category, price range, or dietary filters.
                </p>

                <button style={styles.emptyButton} onClick={clearAllFilters}>
                  Clear All Filters
                </button>
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
    background: "#f7f7f7",
    fontFamily:
      "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
    color: "#111",
    boxSizing: "border-box",
  },
  heroSection: {
    width: "100%",
    background: "linear-gradient(135deg,#f6f3ed 0%,#fff 50%,#f3f0e8 100%)",
    borderBottom: "1px solid #e7e3dc",
  },
  heroContent: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "55px 40px 42px",
    boxSizing: "border-box",
  },
  smallTitle: {
    margin: "0 0 10px",
    color: "#9a5b25",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2.8px",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0",
    color: "#161616",
    fontSize: "clamp(34px,4vw,52px)",
    fontWeight: "500",
    fontFamily: "Georgia,'Times New Roman',serif",
    letterSpacing: "-1px",
    lineHeight: "1.1",
  },
  description: {
    maxWidth: "600px",
    margin: "15px 0 0",
    color: "#666",
    fontSize: "15px",
    lineHeight: "1.7",
  },
  trustRow: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    marginTop: "25px",
    flexWrap: "wrap",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#555",
  },
  trustIcon: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
  },
  main: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "35px 40px 80px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "245px minmax(0,1fr)",
    gap: "35px",
  },
  sidebar: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    height: "fit-content",
    padding: "22px",
    boxSizing: "border-box",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    position: "sticky",
    top: "20px",
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "22px",
  },
  sidebarMainTitle: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "700",
    color: "#111",
    fontFamily: "Georgia,'Times New Roman',serif",
  },
  clearTopButton: {
    border: "none",
    background: "transparent",
    color: "#b45d15",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
  filterGroup: {
    marginBottom: "5px",
  },
  line: {
    height: "1px",
    background: "#ededed",
    margin: "23px 0",
  },
  categoryTitle: {
    margin: "0 0 17px",
    color: "#161616",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "Georgia,'Times New Roman',serif",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  },
  categoryRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    userSelect: "none",
    padding: "5px 4px",
    borderRadius: "6px",
  },
  dietaryList: {
    display: "flex",
    flexDirection: "column",
    gap: "11px",
    marginBottom: "13px",
  },
  dietaryRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    userSelect: "none",
    padding: "4px",
  },
  categoryLabel: {
    fontSize: "13px",
    color: "#666",
    flex: 1,
  },
  activeCategoryLabel: {
    fontSize: "13px",
    color: "#111",
    fontWeight: "700",
    flex: 1,
  },
  categoryCount: {
    fontSize: "11px",
    color: "#999",
    background: "#f5f5f5",
    padding: "3px 7px",
    borderRadius: "10px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#111",
    cursor: "pointer",
  },
  priceInputs: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  priceInput: {
    width: "100%",
    minWidth: 0,
    padding: "9px 10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "12px",
    background: "#fff",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
  },
  priceSeparator: {
    color: "#999",
    fontSize: "12px",
  },
  priceError: {
    margin: "8px 0 0",
    fontSize: "10px",
    color: "#d32f2f",
    lineHeight: "1.4",
  },
  pillGroup: {
    display: "flex",
    gap: "7px",
    flexWrap: "wrap",
  },
  pill: {
    padding: "7px 12px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "11px",
    color: "#666",
    background: "#fafafa",
    cursor: "pointer",
    transition: "all .2s ease",
  },
  activePill: {
    padding: "7px 12px",
    border: "1px solid #111",
    borderRadius: "20px",
    fontSize: "11px",
    color: "#fff",
    background: "#111",
    cursor: "pointer",
    transition: "all .2s ease",
  },
  sidebarBottom: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    marginTop: "5px",
    padding: "13px",
    background: "#faf9f6",
    borderRadius: "8px",
  },
  deliveryIcon: {
    fontSize: "19px",
  },
  deliveryTitle: {
    display: "block",
    fontSize: "12px",
    color: "#222",
    marginBottom: "3px",
  },
  deliveryText: {
    margin: 0,
    fontSize: "10px",
    lineHeight: "1.5",
    color: "#888",
  },
  productsArea: {
    minWidth: 0,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "12px",
    padding: "12px 15px",
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  activeTags: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    minWidth: 0,
  },
  activeLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#222",
  },
  divider: {
    color: "#ddd",
  },
  showingText: {
    fontSize: "12px",
    color: "#777",
  },
  filterTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 9px",
    background: "#f5f5f5",
    border: "1px solid #e3e3e3",
    borderRadius: "15px",
    fontSize: "10px",
    color: "#444",
  },
  removeFilter: {
    fontSize: "13px",
    lineHeight: "10px",
    cursor: "pointer",
    color: "#888",
  },
  sortBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  sortLabel: {
    fontSize: "11px",
    color: "#888",
  },
  sortSelect: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    padding: "7px 10px",
    fontSize: "11px",
    color: "#333",
    outline: "none",
    cursor: "pointer",
  },
  activeFilterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    marginBottom: "18px",
    background: "#faf8f4",
    border: "1px solid #eee5d8",
    borderRadius: "8px",
  },
  activeFilterText: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#777",
  },
  clearFilterButton: {
    border: "none",
    background: "transparent",
    color: "#a75a20",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(235px,1fr))",
    gap: "24px",
  },
  productWrapper: {
    cursor: "pointer",
    minWidth: 0,
  },
  productCardContainer: {
    position: "relative",
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.25s ease",
    height: "100%",
    boxSizing: "border-box",
  },
  productInner: {
    width: "100%",
    background: "#fff",
  },
  bestSeller: {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 5,
    background: "#111",
    color: "#fff",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "0.6px",
    padding: "5px 8px",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
  },
  deliveryBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px 13px 12px",
    fontSize: "10px",
    fontWeight: "600",
    color: "#777",
    background: "#fff",
    borderTop: "1px solid #f1f1f1",
  },
  deliveryCheck: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    fontSize: "9px",
  },
  loadingContainer: {
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
  },
  loader: {
    width: "38px",
    height: "38px",
    border: "3px solid #e8e8e8",
    borderTop: "3px solid #111",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#777",
  },
  empty: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "90px 20px",
    textAlign: "center",
    color: "#777",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  emptyHeading: {
    margin: "0 0 8px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
  },
  emptyText: {
    margin: "0 0 20px",
    fontSize: "13px",
    color: "#888",
  },
  emptyButton: {
    border: "none",
    background: "#111",
    color: "#fff",
    padding: "11px 22px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Products;