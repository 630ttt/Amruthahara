import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  page: {
    minHeight: "70vh",
    padding: "60px 5%",
    backgroundColor: "#faf7f2",
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "45px",
  },
  title: {
    color: "#1c3829",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#8c8275",
    fontSize: "15px",
    fontFamily: "sans-serif",
  },
  empty: {
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "65px",
    color: "#c28d4b",
    marginBottom: "20px",
  },
  emptyTitle: {
    color: "#1c3829",
    fontSize: "26px",
    marginBottom: "10px",
  },
  emptyText: {
    color: "#7a867d",
    marginBottom: "25px",
    fontFamily: "sans-serif",
  },
  shopButton: {
    backgroundColor: "#1c3829",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 28px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    fontFamily: "sans-serif",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "220px",
    marginBottom: "16px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#c59a4e",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "2px",
    letterSpacing: "0.5px",
    fontFamily: "sans-serif",
  },
  content: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  category: {
    color: "#c59a4e",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontFamily: "sans-serif",
  },
  name: {
    color: "#1c3829",
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  description: {
    color: "#8c8275",
    fontSize: "13px",
    lineHeight: "1.4",
    marginBottom: "16px",
    minHeight: "36px",
    fontFamily: "sans-serif",
  },
  bottomRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "10px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  price: {
    color: "#1c3829",
    fontSize: "18px",
    fontWeight: "800",
    fontFamily: "sans-serif",
  },
  originalPrice: {
    color: "#b0a8a0",
    fontSize: "13px",
    textDecoration: "line-through",
    fontFamily: "sans-serif",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cartIconButton: {
    backgroundColor: "#1c3829",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "sans-serif",
  },
  removeIconButton: {
    backgroundColor: "transparent",
    color: "#d45d65",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  clearButton: {
    display: "block",
    margin: "45px auto 0",
    backgroundColor: "transparent",
    color: "#d45d65",
    border: "1px solid #d45d65",
    borderRadius: "4px",
    padding: "10px 22px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "sans-serif",
  },
};

function WishlistPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const isLoggedIn =
      localStorage.getItem("amruthahara_logged_in") === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          pendingProduct: product,
          from: location.pathname,
        },
      });
      return;
    }

    addToCart(product);
    navigate("/cart");
  };

  if (wishlist.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.empty}>
          <FaHeart style={styles.emptyIcon} />
          <h2 style={styles.emptyTitle}>Your Wishlist is Empty</h2>
          <p style={styles.emptyText}>
            Save your favorite products and find them here later.
          </p>
          <button
            style={styles.shopButton}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Wishlist</h1>
        <p style={styles.subtitle}>
          {wishlist.length} {wishlist.length === 1 ? "product" : "products"}{" "}
          saved
        </p>
      </div>

      <div style={styles.grid}>
        {wishlist.map((product) => (
          <div key={product._id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.image}
              />
              {product.discount && (
                <span style={styles.badge}>{product.discount}% OFF</span>
              )}
            </div>

            <div style={styles.content}>
              <span style={styles.category}>
                {product.category || "Organic"}
              </span>

              <h3 style={styles.name}>{product.name}</h3>

              <p style={styles.description}>
                {product.description ||
                  "Traditionally processed premium organic product."}
              </p>

              <div style={styles.bottomRow}>
                <div style={styles.priceContainer}>
                  <span style={styles.price}>₹{product.price}</span>
                  {product.originalPrice && (
                    <span style={styles.originalPrice}>
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <div style={styles.actionButtons}>
                  <button
                    type="button"
                    style={styles.cartIconButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Add
                  </button>

                  <button
                    type="button"
                    style={styles.removeIconButton}
                    onClick={() => removeFromWishlist(product._id)}
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        style={styles.clearButton}
        onClick={clearWishlist}
      >
        Clear Wishlist
      </button>
    </div>
  );
}

export default WishlistPage;