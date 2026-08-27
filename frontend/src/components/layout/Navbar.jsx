import React, { useState } from "react";
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
    minHeight: "76px",
    width: "100%",
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(23,92,56,0.08)",
    boxShadow: "0 8px 30px rgba(20,55,32,0.06)",
    gap: "30px",
    boxSizing: "border-box",
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    flexShrink: 0,
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    marginLeft: "10px",
  },

  link: {
    position: "relative",
    textDecoration: "none",
    color: "#45554B",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    padding: "8px 0",
    transition: "color 0.25s ease",
  },

  searchBox: {
    flex: 1,
    maxWidth: "280px",
    minWidth: "150px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid rgba(23,92,56,0.13)",
    borderRadius: "50px",
    padding: "0 14px",
    background: "#F7FAF6",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "12px",
    color: "#263D2E",
    minWidth: 0,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexShrink: 0,
  },

  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  loginButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    padding: "0 16px",
    borderRadius: "7px",
    border: "1px solid rgba(23,92,56,0.25)",
    background: "#FFFFFF",
    color: "#24563B",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
  },

  registerButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    padding: "0 17px",
    borderRadius: "7px",
    border: "1px solid #245E3C",
    background: "linear-gradient(135deg, #245E3C, #39764B)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
    boxShadow: "0 7px 18px rgba(23,92,56,0.15)",
  },

  accountButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "38px",
    padding: "0 14px",
    borderRadius: "7px",
    background: "#F1F7F2",
    border: "1px solid rgba(23,92,56,0.10)",
    color: "#245E3C",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
  },

  icons: {
    display: "flex",
    alignItems: "center",
    gap: "19px",
  },

  iconWrapper: {
    position: "relative",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#285D3E",
    textDecoration: "none",
    fontSize: "16px",
    transition: "all 0.25s ease",
  },

  badge: {
    position: "absolute",
    top: "-9px",
    right: "-10px",
    minWidth: "17px",
    height: "17px",
    padding: "0 4px",
    borderRadius: "50%",
    background: "#B96A63",
    color: "#FFFFFF",
    border: "2px solid #FFFFFF",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
};

function Navbar() {
  const { isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState("");

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap');

          .amruthahara-logo-image {
            width: 155px;
            height: 64px;
            object-fit: contain;
            display: block;
            transition: transform 0.25s ease;
          }

          .amruthahara-logo-image:hover {
            transform: scale(1.03);
          }

          .amruthahara-nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 1px;
            width: 100%;
            height: 1px;
            background: #789C5B;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }

          .amruthahara-nav-link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }

          .amruthahara-search:hover {
            border-color: rgba(23,92,56,0.25) !important;
            background: #FFFFFF !important;
          }

          .amruthahara-login:hover {
            background: #F1F7F2 !important;
            transform: translateY(-1px);
          }

          .amruthahara-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(23,92,56,0.22) !important;
          }

          .amruthahara-account:hover {
            background: #EAF4EC !important;
            transform: translateY(-1px);
          }

          .amruthahara-icon:hover {
            transform: translateY(-2px);
          }

          @media (max-width: 1150px) {
            .amruthahara-nav-links {
              gap: 20px !important;
            }

            .amruthahara-search {
              max-width: 210px !important;
            }

            .amruthahara-navbar {
              gap: 18px !important;
            }

            .amruthahara-logo-image {
              width: 140px;
            }
          }

          @media (max-width: 950px) {
            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              max-width: 260px !important;
            }
          }

          @media (max-width: 700px) {
            .amruthahara-navbar {
              padding: 0 20px !important;
              min-height: 70px !important;
              gap: 12px !important;
            }

            .amruthahara-logo-image {
              width: 125px;
              height: 58px;
            }

            .amruthahara-search {
              display: none !important;
            }

            .amruthahara-auth {
              display: none !important;
            }

            .amruthahara-right {
              gap: 14px !important;
            }

            .amruthahara-icons {
              gap: 15px !important;
            }
          }

          @media (max-width: 400px) {
            .amruthahara-navbar {
              padding: 0 15px !important;
            }

            .amruthahara-logo-image {
              width: 110px;
              height: 54px;
            }

            .amruthahara-icons {
              gap: 12px !important;
            }
          }
        `}
      </style>

      <header
        className="amruthahara-navbar"
        style={styles.navbar}
      >

        {/* ================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="amruthahara-logo"
          style={styles.logoWrapper}
        >
          <img
            src="/images/amruthahara-logo.png"
            alt="Amruthahara"
            className="amruthahara-logo-image"
          />
        </Link>


        {/* ================================
            NAVIGATION
        ================================= */}

        <nav
          className="amruthahara-nav-links"
          style={styles.navLinks}
        >

          <Link
            to="/"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "home"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Home
          </Link>


          <Link
            to="/products"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "products"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("products")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Products
          </Link>


          <Link
            to="/our-story"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "story"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("story")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Our Story
          </Link>


          <Link
            to="/bowl"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "bowl"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("bowl")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Bowl
          </Link>

          <Link
            to="/subscription"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "subscription"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("subscription")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Subscription
          </Link>


        </nav>


        {/* ================================
            SEARCH
        ================================= */}

        <div
          className="amruthahara-search"
          style={{
            ...styles.searchBox,
            borderColor: searchFocused
              ? "rgba(23,92,56,0.30)"
              : "rgba(23,92,56,0.13)",
            backgroundColor: searchFocused
              ? "#FFFFFF"
              : "#F7FAF6",
            boxShadow: searchFocused
              ? "0 5px 18px rgba(23,92,56,0.06)"
              : "none",
          }}
        >

          <FaSearch
            size={12}
            color="#52755C"
          />

          <input
            type="text"
            placeholder="Search products..."
            style={styles.input}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />

        </div>


        {/* ================================
            RIGHT SECTION
        ================================= */}

        <div
          className="amruthahara-right"
          style={styles.rightSection}
        >

          {/* AUTH */}

          {!isAuthenticated ? (

            <div
              className="amruthahara-auth"
              style={styles.authButtons}
            >

              <Link
                to="/login"
                className="amruthahara-login"
                style={styles.loginButton}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="amruthahara-register"
                style={styles.registerButton}
              >
                Create Account
              </Link>

            </div>

          ) : (

            <Link
              to="/dashboard"
              className="amruthahara-account"
              style={styles.accountButton}
              title="My Account"
            >
              <FaUser size={12} />
              My Account
            </Link>

          )}


          {/* ================================
              WISHLIST + CART
          ================================= */}

          <div
            className="amruthahara-icons"
            style={styles.icons}
          >

            {/* WISHLIST */}

            <div style={styles.iconWrapper}>

              <Link
                to="/wishlist"
                className="amruthahara-icon"
                style={{
                  ...styles.iconLink,
                  color:
                    hoveredIcon === "wishlist"
                      ? "#B35D61"
                      : "#285D3E",
                }}
                title="Wishlist"
                onMouseEnter={() =>
                  setHoveredIcon("wishlist")
                }
                onMouseLeave={() =>
                  setHoveredIcon("")
                }
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
                className="amruthahara-icon"
                style={{
                  ...styles.iconLink,
                  color:
                    hoveredIcon === "cart"
                      ? "#245E3C"
                      : "#285D3E",
                }}
                title="Cart"
                onMouseEnter={() =>
                  setHoveredIcon("cart")
                }
                onMouseLeave={() =>
                  setHoveredIcon("")
                }
              >
                <FaShoppingCart />
              </Link>

              {cartCount > 0 && (
                <span style={styles.badge}>
                  {cartCount}
                </span>
              )}

            </div>

          </div>

        </div>

      </header>
    </>
  );
}

export default Navbar;