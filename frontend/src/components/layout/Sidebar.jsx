 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaLeaf,
  FaBars,
  FaTimes,
} from "react-icons/fa";
 
function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
 
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
 
    navigate("/login");
  };
 
  const closeMobileMenu = () => {
    setMobileOpen(false);
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
    boxSizing: "border-box",
  };
 
  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="admin-mobile-topbar">
        <div className="admin-mobile-brand">
          <FaLeaf />
          <span>Amruthahara</span>
        </div>
 
        <button
          className="admin-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle admin menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
 
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeMobileMenu}
        />
      )}
 
      {/* SIDEBAR */}
      <div
        className={`admin-sidebar ${
          mobileOpen ? "admin-sidebar-open" : ""
        }`}
      >
        {/* BRAND */}
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon">
            <FaLeaf size={21} />
          </div>
 
          <h2>Amruthahara</h2>
 
          <p>Admin Panel</p>
        </div>
 
        {/* MOBILE CLOSE */}
        <button
          className="admin-sidebar-close"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
 
        {/* NAVIGATION */}
        <nav className="admin-sidebar-nav">
          <Link
            to="/admin/dashboard"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaTachometerAlt size={14} />
            <span>Dashboard</span>
          </Link>
 
          <Link
            to="/admin/products"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaBox size={14} />
            <span>Products</span>
          </Link>
 
          <Link
            to="/admin/users"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaUsers size={14} />
            <span>Users</span>
          </Link>
 
          <Link
            to="/admin/settings"
            style={linkStyle}
            onClick={closeMobileMenu}
          >
            <FaCog size={14} />
            <span>Settings</span>
          </Link>
 
          {/* DIVIDER */}
          <div className="admin-sidebar-divider" />
 
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
            <span>Logout</span>
          </button>
        </nav>
 
        {/* FOOTER */}
        <div className="admin-sidebar-footer">
          Pure • Natural • Premium
        </div>
      </div>
 
      {/* RESPONSIVE CSS */}
      <style>{`
        /* ================================
           DESKTOP
        ================================= */
 
        .admin-sidebar {
          width: 250px;
          height: 100vh;
          background:
            linear-gradient(
              180deg,
              #103d27 0%,
              #155331 55%,
              #124329 100%
            );
 
          color: white;
          position: fixed;
          left: 0;
          top: 0;
 
          padding: 25px 16px;
          box-sizing: border-box;
 
          box-shadow:
            8px 0 30px rgba(16, 61, 39, 0.12);
 
          z-index: 1200;
 
          overflow-y: auto;
 
          transition:
            transform 0.3s ease;
        }
 
        .admin-sidebar-brand {
          text-align: center;
          padding-bottom: 28px;
 
          border-bottom:
            1px solid rgba(255,255,255,0.10);
 
          margin-bottom: 25px;
        }
 
        .admin-brand-icon {
          width: 48px;
          height: 48px;
 
          border-radius: 15px;
 
          margin: 0 auto 12px;
 
          display: flex;
          align-items: center;
          justify-content: center;
 
          background:
            rgba(255,255,255,0.10);
 
          border:
            1px solid rgba(255,255,255,0.12);
 
          color: #dfc27b;
        }
 
        .admin-sidebar-brand h2 {
          margin: 0;
 
          font-family: Georgia, serif;
 
          font-size: 23px;
 
          font-weight: 500;
 
          letter-spacing: -0.3px;
        }
 
        .admin-sidebar-brand p {
          margin: 6px 0 0;
 
          color:
            rgba(255,255,255,0.48);
 
          font-size: 9px;
 
          letter-spacing: 2px;
 
          text-transform: uppercase;
        }
 
        .admin-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
 
        .admin-sidebar-nav a:hover,
        .admin-sidebar-nav button:hover {
          color: #ffffff !important;
 
          background:
            rgba(255,255,255,0.09) !important;
        }
 
        .admin-sidebar-divider {
          height: 1px;
 
          background:
            rgba(255,255,255,0.10);
 
          margin:
            22px 8px 12px;
        }
 
        .admin-sidebar-footer {
          position: absolute;
 
          bottom: 22px;
 
          left: 16px;
          right: 16px;
 
          text-align: center;
 
          color:
            rgba(255,255,255,0.35);
 
          font-size: 9px;
 
          letter-spacing: 0.5px;
        }
 
        /* ================================
           MOBILE TOP BAR
        ================================= */
 
        .admin-mobile-topbar {
          display: none;
 
          position: fixed;
 
          top: 0;
          left: 0;
          right: 0;
 
          height: 62px;
 
          padding: 0 16px;
 
          box-sizing: border-box;
 
          align-items: center;
 
          justify-content: space-between;
 
          background:
            linear-gradient(
              90deg,
              #103d27 0%,
              #155331 55%,
              #124329 100%
            );
 
          z-index: 1100;
 
          box-shadow:
            0 4px 20px rgba(16,61,39,0.18);
        }
 
        .admin-mobile-brand {
          display: flex;
 
          align-items: center;
 
          gap: 10px;
 
          color: #ffffff;
 
          font-family: Georgia, serif;
 
          font-size: 20px;
        }
 
        .admin-mobile-brand svg {
          color: #dfc27b;
 
          font-size: 18px;
        }
 
        .admin-menu-button {
          width: 42px;
          height: 42px;
 
          border:
            1px solid rgba(255,255,255,0.15);
 
          border-radius: 12px;
 
          background:
            rgba(255,255,255,0.08);
 
          color: #ffffff;
 
          display: flex;
 
          align-items: center;
 
          justify-content: center;
 
          cursor: pointer;
 
          font-size: 18px;
        }
 
        .admin-sidebar-close {
          display: none;
 
          position: absolute;
 
          top: 16px;
          right: 14px;
 
          width: 36px;
          height: 36px;
 
          border:
            1px solid rgba(255,255,255,0.12);
 
          border-radius: 10px;
 
          background:
            rgba(255,255,255,0.08);
 
          color: #ffffff;
 
          align-items: center;
          justify-content: center;
 
          cursor: pointer;
        }
 
        .admin-sidebar-overlay {
          position: fixed;
 
          inset: 0;
 
          background:
            rgba(0,0,0,0.42);
 
          z-index: 1150;
        }
 
        /* ================================
           TABLET
        ================================= */
 
        @media (max-width: 900px) {
 
          .admin-mobile-topbar {
            display: flex;
          }
 
          .admin-sidebar {
            transform:
              translateX(-100%);
 
            width: 270px;
          }
 
          .admin-sidebar-open {
            transform:
              translateX(0);
          }
 
          .admin-sidebar-close {
            display: flex;
          }
 
          .admin-sidebar-footer {
            position: static;
 
            margin-top: 35px;
 
            padding-bottom: 10px;
          }
        }
 
        /* ================================
           MOBILE
        ================================= */
 
        @media (max-width: 600px) {
 
          .admin-mobile-topbar {
            height: 60px;
 
            padding:
              0 14px;
          }
 
          .admin-mobile-brand {
            font-size: 18px;
          }
 
          .admin-menu-button {
            width: 40px;
            height: 40px;
          }
 
          .admin-sidebar {
            width: 280px;
 
            max-width: 85vw;
 
            padding:
              22px 14px;
          }
 
          .admin-sidebar-brand {
            padding-top: 12px;
 
            padding-bottom: 22px;
 
            margin-bottom: 20px;
          }
 
          .admin-sidebar-brand h2 {
            font-size: 21px;
          }
 
          .admin-sidebar-nav a,
          .admin-sidebar-nav button {
            min-height: 46px;
          }
        }
 
        /* ================================
           SMALL MOBILE
        ================================= */
 
        @media (max-width: 380px) {
 
          .admin-sidebar {
            width: 260px;
          }
 
          .admin-mobile-brand {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  );
}
 
export default Sidebar;
 
 
 