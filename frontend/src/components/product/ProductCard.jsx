import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaLeaf,
} from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  card: {
    width: "100%",
    maxWidth: "245px",
    minWidth: "0",
    background:
      "linear-gradient(180deg, #FFFFFF 0%, #FBFDF9 100%)",
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid #DDE9DC",
    boxShadow: "0 5px 18px rgba(40, 75, 45, 0.07)",
    transition:
      "transform 0.28s ease, box-shadow 0.28s ease",
    position: "relative",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "190px",
    background:
      "linear-gradient(135deg, #F1F7ED, #E7F0E2)",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },

  imageShade: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.02) 55%, rgba(21,64,37,0.10) 100%)",
    pointerEvents: "none",
  },

  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(255,255,255,0.94)",
    color: "#397347",
    padding: "7px 10px",
    borderRadius: "30px",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    boxShadow: "0 4px 12px rgba(30,70,40,0.10)",
    backdropFilter: "blur(8px)",
  },

  wishlist: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.8)",
    background: "rgba(255,255,255,0.94)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
    fontSize: "13px",
    transition: "all 0.22s ease",
    zIndex: 3,
  },

  content: {
    padding: "14px 14px 15px",
  },

  category: {
    fontSize: "9px",
    fontWeight: "800",
    color: "#87958A",
    letterSpacing: "1.3px",
    textTransform: "uppercase",
    marginBottom: "6px",
  },

  name: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#21452F",
    lineHeight: "1.3",
    minHeight: "42px",
    marginBottom: "8px",
  },

  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginBottom: "10px",
  },

  rating: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    background:
      "linear-gradient(135deg, #347A47, #4B8A59)",
    color: "#FFFFFF",
    padding: "4px 7px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "800",
  },

  star: {
    fontSize: "7px",
  },

  reviews: {
    fontSize: "9px",
    color: "#929B95",
    whiteSpace: "nowrap",
  },

  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "12px",
  },

  price: {
    color: "#175C38",
    fontSize: "19px",
    fontWeight: "900",
  },

  oldPrice: {
    color: "#A5ADA7",
    fontSize: "10px",
    textDecoration: "line-through",
  },

  button: {
    width: "100%",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    background:
      "linear-gradient(135deg, #175C38, #347A50)",
    color: "#FFFFFF",
    border: "none",
    padding: "9px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "800",
    transition:
      "transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease",
    boxShadow: "0 6px 14px rgba(23,92,56,0.14)",
  },

  message: {
    position: "absolute",
    left: "50%",
    bottom: "12px",
    transform: "translateX(-50%)",
    background: "#175C38",
    color: "#FFFFFF",
    padding: "8px 13px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    zIndex: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
  },

  productsCard: {
    maxWidth: "none",
    borderRadius: "20px",
    background: "#FFFDF8",
    border: "1px solid #DDE5DC",
    boxShadow: "0 8px 30px rgba(23, 63, 42, 0.06)",
  },

  productsImageWrapper: {
    height: "clamp(210px, 22vw, 290px)",
    background: "#F4F1E8",
  },

  productsContent: {
    padding: "20px",
  },

  productsCategory: {
    color: "#68736B",
    fontSize: "10px",
    letterSpacing: "1px",
  },

  productsName: {
    minHeight: "48px",
    marginBottom: "8px",
    color: "#173F2A",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "21px",
    fontWeight: "600",
    lineHeight: "1.2",
  },

  productsDescription: {
    minHeight: "36px",
    margin: "-2px 0 12px",
    color: "#68736B",
    fontSize: "12px",
    lineHeight: "1.45",
  },

  productsRating: {
    background: "transparent",
    color: "#C79A45",
    padding: 0,
    fontSize: "12px",
  },

  productsPrice: {
    color: "#173F2A",
    fontSize: "22px",
  },

  productsButton: {
    height: "46px",
    borderRadius: "10px",
    background: "#173F2A",
    fontSize: "13px",
  },
};

function ProductCard({ product, variant = "default" }) {
  const navigate = useNavigate();

  const [cartMessage, setCartMessage] = useState("");

  const { addToCart } = useCart();

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  const productId = String(
    product?._id || product?.id || ""
  );

  const wishlistActive =
    isInWishlist(productId);

  const isProductsVariant = variant === "products";

  // ===============================
  // PRODUCT IMAGE
  // ===============================
  const productImage =
    product?.images?.[0] ||
    product?.image ||
    product?.imageUrl ||
    product?.productImage ||
    product?.thumbnail ||
    "/placeholder-product.png";

  // ===============================
  // ADD TO CART
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

    addToCart(product);

    setCartMessage("Item added successfully");

    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  // WISHLIST
  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) {
      console.error(
        "Product does not have a valid ID:",
        product
      );

      return;
    }

    toggleWishlist(product);
  };

  return (
    <div
      className={isProductsVariant ? "amrutha-products-card" : undefined}
      style={{
        ...styles.card,
        ...(isProductsVariant ? styles.productsCard : {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";

        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(35,75,42,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";

        e.currentTarget.style.boxShadow =
          "0 5px 18px rgba(40,75,45,0.07)";
      }}
    >
      {/* IMAGE */}
      <div style={styles.imageWrapper}>

        <img
          src={productImage}
          alt={product.name}
          style={styles.image}
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder-product.png";
          }}
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
              ? "#D45D65"
              : "#708077",
            transform: wishlistActive
              ? "scale(1.04)"
              : "scale(1)",
          }}
          aria-label={
            wishlistActive
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={handleWishlist}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "scale(1.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              wishlistActive
                ? "scale(1.04)"
                : "scale(1)";
          }}
        >
          <FaHeart />
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.category}>
          Organic • Natural
        </div>

        <div style={styles.name}>

          {product?.name || "Organic Product"}

        </div>

        {isProductsVariant && (product?.description || product?.shortDescription) && (
          <div style={styles.productsDescription}>
            {product.description || product.shortDescription}
          </div>
        )}

        {/* RATING */}

        {/* RATING */}
        <div style={styles.ratingRow}>
          <span style={{
            ...styles.rating,
            ...(isProductsVariant ? styles.productsRating : {}),
          }}>
            4.6
            <FaStar style={styles.star} />
          </span>

          <span style={styles.reviews}>
            Trusted by customers
          </span>
        </div>

        {/* PRICE */}

        {/* PRICE */}
        <div style={styles.priceRow}>
          <div style={styles.price}>
    
            ₹{product?.price || 0}

          </div>

          <div style={styles.oldPrice}>
            ₹{Number(product?.price || 0) + 30}
          </div>
        </div>

        {/* ADD TO CART */}

        {/* ADD TO CART */}
        <button
          type="button"
          style={{
            ...styles.button,
            ...(isProductsVariant ? styles.productsButton : {}),
          }}
          onClick={handleAddToCart}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";

            e.currentTarget.style.boxShadow =
              "0 9px 20px rgba(23,92,56,0.23)";

            e.currentTarget.style.background =
              "linear-gradient(135deg, #12492D, #2F7048)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";

            e.currentTarget.style.boxShadow =
              "0 6px 14px rgba(23,92,56,0.14)";

            e.currentTarget.style.background =
              "linear-gradient(135deg, #175C38, #347A50)";
          }}
        >
          <FaShoppingCart size={11} />
          Add to Cart
        </button>

      </div>

      {/* ================= SUCCESS MESSAGE ================= */}

      {/* ===============================
          SUCCESS NOTIFICATION
          =============================== */}
      {cartMessage && (
        <div style={styles.message}>
          ✓ {cartMessage}
        </div>
      )}
    </div>
  );
}

export default ProductCard;