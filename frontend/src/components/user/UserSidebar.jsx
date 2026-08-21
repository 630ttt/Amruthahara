import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const styles = {
  sidebar: {
    width: "250px",
    minHeight: "100vh",
    background: "#ffffff",
    borderRight: "1px solid #e4ebe5",
    padding: "30px 18px",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#175c38",
    marginBottom: "6px",
    paddingLeft: "12px",
  },

  logoSub: {
    fontSize: "11px",
    color: "#819087",
    paddingLeft: "12px",
    marginBottom: "35px",
  },

  userBox: {
    background: "#f4f9f5",
    borderRadius: "14px",
    padding: "15px",
    marginBottom: "25px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#175c38",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    marginBottom: "10px",
  },

  userName: {
    color: "#23432e",
    fontWeight: "800",
    fontSize: "14px",
    marginBottom: "3px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  userEmail: {
    color: "#7a877e",
    fontSize: "11px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  navTitle: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#9aa49d",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "0 12px",
    marginBottom: "10px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    color: "#5d6b62",
    transition: "all 0.2s ease",
  },

  navIcon: {
    width: "22px",
    textAlign: "center",
    fontSize: "17px",
  },

  logout: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eadbdb",
    background: "#fff8f8",
    color: "#bd5159",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
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
      icon: "⌂",
      end: true,
    },
    {
      path: "/dashboard/profile",
      label: "My Profile",
      icon: "👤",
    },
    {
      path: "/dashboard/orders",
      label: "My Orders",
      icon: "📦",
    },
    {
      path: "/dashboard/subscriptions",
      label: "Subscriptions",
      icon: "🔄",
    },
    {
      path: "/wishlist",
      label: "Wishlist",
      icon: "♡",
    },
    {
      path: "/cart",
      label: "Cart",
      icon: "🛒",
    },
  ];

  return (
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
        <div style={styles.avatar}>
          {initial}
        </div>

        <div style={styles.userName}>
          {user?.name || "User"}
        </div>

        <div style={styles.userEmail}>
          {user?.email || ""}
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
                ? "#eaf5ed"
                : "transparent",
              color: isActive
                ? "#175c38"
                : "#5d6b62",
              fontWeight: isActive
                ? "800"
                : "600",
            })}
          >
            <span style={styles.navIcon}>
              {link.icon}
            </span>

            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        style={styles.logout}
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </aside>
  );
}

export default UserSidebar;