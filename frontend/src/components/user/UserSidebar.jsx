import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaHome,
  FaUser,
  FaBoxOpen,
  FaSyncAlt,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

const styles = {
  /* =====================================================
     DESKTOP SIDEBAR
  ===================================================== */

  sidebar: {
    width: "250px",
    minHeight: "calc(100vh - 70px)",
    background: "#ffffff",
    borderRight: "1px solid #e4ebe5",
    padding: "28px 16px",
    boxSizing: "border-box",
    flexShrink: 0,
    position: "sticky",
    top: "70px",
    alignSelf: "flex-start",
    zIndex: 20,
  },

  logo: {
    fontSize: "23px",
    fontWeight: "900",
    color: "#175c38",
    marginBottom: "5px",
    paddingLeft: "12px",
    cursor: "pointer",
    letterSpacing: "-0.5px",
  },

  logoSub: {
    fontSize: "10px",
    color: "#819087",
    paddingLeft: "12px",
    marginBottom: "28px",
    letterSpacing: "0.2px",
  },

  userBox: {
    background:
      "linear-gradient(145deg, #f3f9f4, #f8fbf8)",
    border: "1px solid #e3eee5",
    borderRadius: "16px",
    padding: "15px",
    marginBottom: "25px",
    boxShadow:
      "0 8px 24px rgba(30,70,40,0.04)",
  },

  userTop: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    minWidth: 0,
  },

  avatar: {
    width: "43px",
    height: "43px",
    minWidth: "43px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #175c38, #39764b)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "17px",
    boxShadow:
      "0 5px 14px rgba(23,92,56,0.16)",
  },

  userInfo: {
    minWidth: 0,
    flex: 1,
  },

  userName: {
    color: "#23432e",
    fontWeight: "800",
    fontSize: "13px",
    marginBottom: "3px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  userEmail: {
    color: "#7a877e",
    fontSize: "10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  memberBadge: {
    marginTop: "11px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 9px",
    borderRadius: "20px",
    background: "#e5f3e8",
    color: "#28643d",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  navTitle: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#9aa49d",
    textTransform: "uppercase",
    letterSpacing: "1px",
    padding: "0 12px",
    marginBottom: "9px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 12px",
    borderRadius: "11px",
    textDecoration: "none",
    fontSize: "13px",
    color: "#5d6b62",
    transition:
      "all .22s ease",
    position: "relative",
  },

  navIcon: {
    width: "21px",
    minWidth: "21px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },

  activeArrow: {
    marginLeft: "auto",
    fontSize: "8px",
    opacity: 0.7,
  },

  logout: {
    width: "100%",
    marginTop: "25px",
    padding: "11px 12px",
    borderRadius: "11px",
    border: "1px solid #eadbdb",
    background:
      "linear-gradient(145deg, #fff9f9, #fff5f5)",
    color: "#bd5159",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all .2s ease",
  },

  /* =====================================================
     MOBILE TOP ACCOUNT BAR
  ===================================================== */

  mobileBar: {
    display: "none",
  },

  mobileUser: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },

  mobileAvatar: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #175c38, #39764b)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "800",
    boxShadow:
      "0 4px 12px rgba(23,92,56,.15)",
  },

  mobileUserInfo: {
    minWidth: 0,
    flex: 1,
  },

  mobileGreeting: {
    fontSize: "9px",
    color: "#8a958d",
    marginBottom: "2px",
    fontWeight: "600",
  },

  mobileName: {
    fontSize: "13px",
    color: "#23432e",
    fontWeight: "850",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  mobileLogout: {
    width: "36px",
    height: "36px",
    minWidth: "36px",
    borderRadius: "10px",
    border: "1px solid #eadbdb",
    background: "#fff8f8",
    color: "#bd5159",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "13px",
  },

  mobileNav: {
    display: "flex",
    overflowX: "auto",
    gap: "8px",
    paddingBottom: "2px",
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "touch",
  },

  mobileNavItem: {
    flex: "0 0 auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "9px 12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "11px",
    fontWeight: "750",
    whiteSpace: "nowrap",
    transition: "all .2s ease",
    border: "1px solid #e3ebe4",
  },
};

function UserSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    {
      path: "/dashboard",
      label: "Overview",
      icon: <FaHome />,
      end: true,
    },
    {
      path: "/dashboard/profile",
      label: "My Profile",
      icon: <FaUser />,
    },
    {
      path: "/orders",
      label: "My Orders",
      icon: <FaBoxOpen />,
    },
    {
      path: "/dashboard/subscriptions",
      label: "Subscriptions",
      icon: <FaSyncAlt />,
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: <FaHeart />,
    },
    {
      path: "/cart",
      label: "Cart",
      icon: <FaShoppingCart />,
    },
  ];

  return (
    <>
      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      <aside style={styles.sidebar}>
        <div
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          Amruthahara
        </div>

        <div style={styles.logoSub}>
          Pure. Natural. Premium.
        </div>

        <div style={styles.userBox}>
          <div style={styles.userTop}>
            <div style={styles.avatar}>
              {initial}
            </div>

            <div style={styles.userInfo}>
              <div style={styles.userName}>
                {user?.name || "User"}
              </div>

              <div style={styles.userEmail}>
                {user?.email || ""}
              </div>
            </div>
          </div>

          <div style={styles.memberBadge}>
            ✦ PREMIUM MEMBER
          </div>
        </div>

        <div style={styles.navTitle}>
          My Account
        </div>

        <nav style={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              style={({ isActive }) => ({
                ...styles.navItem,

                background: isActive
                  ? "linear-gradient(135deg, #eaf5ed, #f0f8f2)"
                  : "transparent",

                color: isActive
                  ? "#175c38"
                  : "#5d6b62",

                fontWeight: isActive
                  ? "800"
                  : "600",

                boxShadow: isActive
                  ? "inset 3px 0 0 #39764b"
                  : "none",
              })}
            >
              <span style={styles.navIcon}>
                {link.icon}
              </span>

              <span>{link.label}</span>

              <span style={styles.activeArrow}>
                <FaChevronRight />
              </span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          style={styles.logout}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "#fff0f0";
            e.currentTarget.style.borderColor =
              "#e7caca";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(145deg, #fff9f9, #fff5f5)";
            e.currentTarget.style.borderColor =
              "#eadbdb";
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* =================================================
          MOBILE ACCOUNT BAR
      ================================================= */}

      <div className="mobile-account-wrapper">
        <div style={styles.mobileBar}>
          <div style={styles.mobileUser}>
            <div style={styles.mobileAvatar}>
              {initial}
            </div>

            <div style={styles.mobileUserInfo}>
              <div style={styles.mobileGreeting}>
                WELCOME BACK
              </div>

              <div style={styles.mobileName}>
                {user?.name || "User"}
              </div>
            </div>
          </div>

          <button
            type="button"
            style={styles.mobileLogout}
            onClick={handleLogout}
            aria-label="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

        <nav style={styles.mobileNav}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              style={({ isActive }) => ({
                ...styles.mobileNavItem,

                background: isActive
                  ? "linear-gradient(135deg, #175c38, #39764b)"
                  : "#ffffff",

                color: isActive
                  ? "#ffffff"
                  : "#5d6b62",

                borderColor: isActive
                  ? "#175c38"
                  : "#e3ebe4",

                boxShadow: isActive
                  ? "0 5px 14px rgba(23,92,56,.16)"
                  : "none",
              })}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* =================================================
          RESPONSIVE CSS
      ================================================= */}

      <style>{`
        .mobile-account-wrapper {
          display: none;
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 950px) {
          aside {
            width: 215px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          aside > div:first-child {
            font-size: 21px !important;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {
          aside {
            display: none !important;
          }

          .mobile-account-wrapper {
            display: block;
            width: 100%;
            background: rgba(255,255,255,.96);
            border-bottom: 1px solid #e3ebe4;
            padding: 12px 14px 10px;
            box-sizing: border-box;
            position: relative;
            z-index: 15;
            box-shadow:
              0 4px 18px rgba(25,65,37,.045);
          }

          .mobile-account-wrapper > div:first-child {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 11px;
          }

          .mobile-account-wrapper nav {
            display: flex !important;
          }

          .mobile-account-wrapper nav::-webkit-scrollbar {
            display: none;
          }
        }

        /* ================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 480px) {
          .mobile-account-wrapper {
            padding: 10px 11px 9px;
          }

          .mobile-account-wrapper > div:first-child {
            margin-bottom: 9px;
          }
        }

        /* ================================
           VERY SMALL MOBILE
        ================================= */

        @media (max-width: 360px) {
          .mobile-account-wrapper {
            padding-left: 9px;
            padding-right: 9px;
          }

          .mobile-account-wrapper nav {
            gap: 6px;
          }

          .mobile-account-wrapper nav a {
            padding: 8px 10px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  );
}

export default UserSidebar;