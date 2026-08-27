import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const linkStyle = {
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background:
          "linear-gradient(180deg, #103d27 0%, #155331 55%, #124329 100%)",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px 16px",
        boxSizing: "border-box",
        boxShadow: "8px 0 30px rgba(16,61,39,0.12)",
        zIndex: 1000,
      }}
    >
      {/* BRAND */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: "28px",
          borderBottom:
            "1px solid rgba(255,255,255,0.10)",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "15px",
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.10)",
            border:
              "1px solid rgba(255,255,255,0.12)",
            color: "#dfc27b",
          }}
        >
          <FaLeaf size={21} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "23px",
            fontWeight: "500",
            letterSpacing: "-0.3px",
          }}
        >
          Amruthahara
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "rgba(255,255,255,0.48)",
            fontSize: "9px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Admin Panel
        </p>
      </div>

      {/* NAVIGATION */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Link
          to="/admin/dashboard"
          style={linkStyle}
        >
          <FaTachometerAlt size={14} />
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          style={linkStyle}
        >
          <FaBox size={14} />
          Products
        </Link>


        <Link
          to="/admin/users"
          style={linkStyle}
        >
          <FaUsers size={14} />
          Users
        </Link>

        <Link
          to="/admin/settings"
          style={linkStyle}
        >
          <FaCog size={14} />
          Settings
        </Link>

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            background:
              "rgba(255,255,255,0.10)",
            margin: "22px 8px 12px",
          }}
        ></div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            ...linkStyle,
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "left",
            margin: 0,
          }}
        >
          <FaSignOutAlt size={14} />
          Logout
        </button>
      </nav>

      {/* FOOTER */}
      <div
        style={{
          position: "absolute",
          bottom: "22px",
          left: "16px",
          right: "16px",
          textAlign: "center",
          color: "rgba(255,255,255,0.35)",
          fontSize: "9px",
          letterSpacing: "0.5px",
        }}
      >
        Pure • Natural • Premium
      </div>
    </div>
  );
}

export default Sidebar;