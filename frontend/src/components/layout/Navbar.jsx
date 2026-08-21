import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  navbar: {
    height: "80px",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 50px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#166534",
  },

  navLinks: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "17px",
    fontWeight: "500",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "30px",
    padding: "8px 15px",
    width: "320px",
    backgroundColor: "#f8f8f8",
  },

  input: {
    border: "none",
    outline: "none",
    flex: 1,
    background: "transparent",
    fontSize: "15px",
  },

  icons: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontSize: "20px",
  },

  iconWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconLink: {
    color: "#166534",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: "-10px",
    right: "-12px",
    minWidth: "18px",
    height: "18px",
    padding: "0 5px",
    borderRadius: "20px",
    backgroundColor: "#d45d65",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
    boxSizing: "border-box",
    border: "2px solid #ffffff",
  },
};

function Navbar() {
  const { isAuthenticated } = useAuth();

  const { cartCount } = useCart();

  const { wishlistCount } = useWishlist();

  return (
    <header style={styles.navbar}>

      {/* LOGO */}
      <Link
        to="/"
        style={{
          ...styles.logo,
          textDecoration: "none",
        }}
      >
        Amruthahara
      </Link>

      {/* NAVIGATION */}
      <nav style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/products" style={styles.link}>
          Products
        </Link>

        <Link to="/categories" style={styles.link}>
          Categories
        </Link>

        <Link to="/our-story" style={styles.link}>
          Our Story
        </Link>
      </nav>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search products..."
          style={styles.input}
        />

        <FaSearch color="#166534" />
      </div>

      {/* ICONS */}
      <div style={styles.icons}>

        {/* WISHLIST */}
        <div style={styles.iconWrapper}>
          <Link
            to="/wishlist"
            style={styles.iconLink}
            title="Wishlist"
          >
            <FaHeart />
          </Link>

          {wishlistCount > 0 && (
            <span style={styles.badge}>
              {wishlistCount}
            </span>
          )}
        </div>

        {/* CART */}
        <div style={styles.iconWrapper}>
          <Link
            to="/cart"
            style={styles.iconLink}
            title="Cart"
          >
            <FaShoppingCart />
          </Link>

          {cartCount > 0 && (
            <span style={styles.badge}>
              {cartCount}
            </span>
          )}
        </div>

        {/* USER */}
        <Link
          to={
            isAuthenticated
              ? "/dashboard"
              : "/login"
          }
          style={styles.iconLink}
          title={
            isAuthenticated
              ? "Dashboard"
              : "Login"
          }
        >
          <FaUser />
        </Link>

      </div>
    </header>
  );
}

export default Navbar;