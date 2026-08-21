import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  page: {
    minHeight: "70vh",
    padding: "60px 5%",
    backgroundColor: "#f8faf7",
  },

  header: {
    textAlign: "center",
    marginBottom: "45px",
  },

  title: {
    color: "#23432e",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#7a867d",
    fontSize: "15px",
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
    color: "#d45d65",
    marginBottom: "20px",
  },

  emptyTitle: {
    color: "#23432e",
    fontSize: "24px",
    marginBottom: "10px",
  },

  emptyText: {
    color: "#7a867d",
    marginBottom: "25px",
  },

  shopButton: {
    backgroundColor: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "13px 25px",
    cursor: "pointer",
    fontWeight: "700",
  },

  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "25px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e8eee6",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.07)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },

  content: {
    padding: "18px",
  },

  name: {
    color: "#23432e",
    fontSize: "17px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  price: {
    color: "#175c38",
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "15px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  cartButton: {
    flex: 1,
    backgroundColor: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  removeButton: {
    width: "42px",
    backgroundColor: "#fff",
    color: "#d45d65",
    border: "1px solid #ead5d7",
    borderRadius: "8px",
    cursor: "pointer",
  },

  clearButton: {
    display: "block",
    margin: "35px auto 0",
    backgroundColor: "#fff",
    color: "#d45d65",
    border: "1px solid #ead5d7",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
  },
};

function WishlistPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  // ===============================
  // ADD WISHLIST PRODUCT TO CART
  // ===============================
  const handleAddToCart = (product) => {
    const isLoggedIn =
      localStorage.getItem(
        "amruthahara_logged_in"
      ) === "true";

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

  // ===============================
  // EMPTY WISHLIST
  // ===============================
  if (wishlist.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.empty}>
          <FaHeart
            style={styles.emptyIcon}
          />

          <h2 style={styles.emptyTitle}>
            Your Wishlist is Empty
          </h2>

          <p style={styles.emptyText}>
            Save your favorite products and
            find them here later.
          </p>

          <button
            style={styles.shopButton}
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // WISHLIST
  // ===============================
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          My Wishlist
        </h1>

        <p style={styles.subtitle}>
          {wishlist.length}{" "}
          {wishlist.length === 1
            ? "product"
            : "products"}{" "}
          saved
        </p>
      </div>

      <div style={styles.grid}>
        {wishlist.map((product) => (
          <div
            key={product._id}
            style={styles.card}
          >
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />

            <div style={styles.content}>
              <div style={styles.name}>
                {product.name}
              </div>

              <div style={styles.price}>
                ₹{product.price}
              </div>

              <div style={styles.actions}>
                {/* ADD TO CART */}
                <button
                  type="button"
                  style={styles.cartButton}
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  <FaShoppingCart />{" "}
                  Add to cart
                </button>

                {/* REMOVE */}
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() =>
                    removeFromWishlist(
                      product._id
                    )
                  }
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
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