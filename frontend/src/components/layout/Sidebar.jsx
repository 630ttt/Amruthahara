import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#166534",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Amruthahara
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link
          to="/admin/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaBox />
          Products
        </Link>

        <Link
          to="/admin/categories"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaList />
          Categories
        </Link>

        <Link
          to="/admin/orders"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaShoppingCart />
          Orders
        </Link>

        <Link
          to="/admin/users"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUsers />
          Users
        </Link>

        <Link
          to="/admin/settings"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaCog />
          Settings
        </Link>

        <Link
          to="/admin/login"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <FaSignOutAlt />
          Logout
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;