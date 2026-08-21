import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  card: {
    width: "100%",
    maxWidth: "280px",
    minWidth: "0",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid #e8eee6",
    boxShadow: "0 8px 25px rgba(30, 70, 40, 0.07)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    position: "relative",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "245px",
    backgroundColor: "#f4f7f2",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },

  badge: {
    position: "absolute",
    top: "13px",
    left: "13px",
    backgroundColor: "#e8f4e4",
    color: "#397347",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.3px",
  },

  wishlist: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.94)",
    color: "#6c8071",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    fontSize: "14px",
    transition: "transform 0.2s ease, color 0.2s ease",
  },

  content: {
    padding: "18px",
  },

  category: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#8a968d",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "7px",
  },

  name: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#23432e",
    lineHeight: "1.4",
    marginBottom: "8px",
  },

  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },

  rating: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#347a47",
    color: "#ffffff",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "11px",
    fontWeight: "700",
  },

  star: {
    fontSize: "8px",
  },

  reviews: {
    fontSize: "11px",
    color: "#929b95",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "15px",
  },

  price: {
    color: "#175c38",
    fontSize: "21px",
    fontWeight: "800",
  },

  oldPrice: {
    color: "#a0a6a1",
    fontSize: "12px",
    textDecoration: "line-through",
  },

  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    backgroundColor: "#175c38",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    transition:
      "background-color 0.2s ease, transform 0.2s ease",
  },
};

function ProductCard({ product }) {
  const navigate = useNavigate();

  // ===============================
  // SUCCESS MESSAGE
  // ===============================
  const [cartMessage, setCartMessage] = useState("");

  // ===============================
  // CART
  // ===============================
  const { addToCart } = useCart();

  // ===============================
  // WISHLIST
  // ===============================
  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  // IMPORTANT:
  // Support both MongoDB _id and normal id
  const productId = String(
    product?._id || product?.id || ""
  );

  const wishlistActive =
    isInWishlist(productId);

  // ===============================
  // ADD TO CART
  // ===============================
  const handleAddToCart = () => {
    const isLoggedIn =
      localStorage.getItem(
        "amruthahara_logged_in"
      ) === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          pendingProduct: product,
        },
      });

      return;
    }

    // EXISTING CART MECHANISM
    addToCart(product);

    // SHOW SUCCESS MESSAGE
    setCartMessage("Item added successfully");

    // HIDE MESSAGE AUTOMATICALLY
    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  // ===============================
  // WISHLIST
  // ===============================
  const handleWishlist = (event) => {
    // Prevent card/image click behavior
    event.preventDefault();
    event.stopPropagation();

    if (!productId) {
      console.error(
        "Product does not have a valid ID:",
        product
      );

      return;
    }

    // EXISTING WISHLIST MECHANISM
    toggleWishlist(product);
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";

        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(30,70,40,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";

        e.currentTarget.style.boxShadow =
          "0 8px 25px rgba(30,70,40,0.07)";
      }}
    >
      {/* IMAGE */}
      <div style={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />

        {/* BADGE */}
        <div style={styles.badge}>
          🌿 Fresh
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          style={{
            ...styles.wishlist,
            color: wishlistActive
              ? "#d45d65"
              : "#6c8071",
          }}
          aria-label={
            wishlistActive
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={handleWishlist}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "scale(1)";
          }}
        >
          <FaHeart />
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {/* CATEGORY */}
        <div style={styles.category}>
          Organic • Farm Fresh
        </div>

        {/* NAME */}
        <div style={styles.name}>
          {product.name}
        </div>

        {/* RATING */}
        <div style={styles.ratingRow}>
          <span style={styles.rating}>
            4.6
            <FaStar style={styles.star} />
          </span>

          <span style={styles.reviews}>
            Trusted by customers
          </span>
        </div>

        {/* PRICE */}
        <div style={styles.priceRow}>
          <div style={styles.price}>
            ₹{product.price}
          </div>

          <div style={styles.oldPrice}>
            ₹{Number(product.price) + 30}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          style={styles.button}
          onClick={handleAddToCart}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "#12492d";

            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "#175c38";

            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>

      {/* ===============================
          SUCCESS NOTIFICATION
          =============================== */}
      {cartMessage && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "15px",
            transform: "translateX(-50%)",
            backgroundColor: "#175c38",
            color: "#ffffff",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            whiteSpace: "nowrap",
            zIndex: 20,
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          ✓ {cartMessage}
        </div>
      )}
    </div>
  );
}

export default ProductCard;