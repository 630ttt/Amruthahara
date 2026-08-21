import React from "react";
import Navbar from "../../components/layout/Navbar";
import {
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaSyncAlt,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import UserSidebar from "../../components/user/UserSidebar";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    display: "flex",
  },

  content: {
    flex: 1,
    padding: "45px 5%",
    minWidth: 0,
  },

  welcome: {
    marginBottom: "35px",
  },

  title: {
    color: "#23432e",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#758178",
    fontSize: "15px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "18px",
    marginBottom: "35px",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "22px",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
  },

  cardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#eaf5ed",
    color: "#175c38",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "15px",
  },

  cardTitle: {
    color: "#758178",
    fontSize: "13px",
    marginBottom: "7px",
  },

  cardNumber: {
    color: "#23432e",
    fontSize: "26px",
    fontWeight: "800",
  },

  section: {
    background: "#ffffff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  sectionTitle: {
    color: "#23432e",
    fontSize: "19px",
    fontWeight: "800",
  },

  viewLink: {
    color: "#175c38",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "700",
  },

  subscription: {
    background:
      "linear-gradient(135deg, #edf8ef, #f9fcf8)",
    border: "1px solid #dcebdd",
    borderRadius: "14px",
    padding: "22px",
  },

  subscriptionTitle: {
    color: "#23432e",
    fontSize: "18px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  status: {
    display: "inline-block",
    background: "#dff3e4",
    color: "#176338",
    borderRadius: "20px",
    padding: "5px 12px",
    fontSize: "12px",
    fontWeight: "800",
    marginBottom: "15px",
  },

  subscriptionText: {
    color: "#68756c",
    fontSize: "14px",
    marginBottom: "5px",
  },

  subscriptionButton: {
    marginTop: "15px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#175c38",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "9px",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: "700",
  },

  quickLinks: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
  },

  quickLink: {
    textDecoration: "none",
    color: "#23432e",
    background: "#f8faf8",
    border: "1px solid #e8eee9",
    padding: "17px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px",
  },
};

function UserDashboard() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const cartCount = Array.isArray(cart)
    ? cart.length
    : 0;

  const wishlistCount = Array.isArray(wishlist)
    ? wishlist.length
    : 0;

  return (
     <>
      <Navbar />
    
    <div style={styles.page}>
        
      <UserSidebar />
     

      <main style={styles.content}>
        <div style={styles.welcome}>
          <h1 style={styles.title}>
            Welcome back,{" "}
            {user?.name?.split(" ")[0] || "User"} 👋
          </h1>

          <p style={styles.subtitle}>
            Manage your Amruthahara account, orders,
            wishlist and subscriptions.
          </p>
        </div>

        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <FaBoxOpen />
            </div>

            <div style={styles.cardTitle}>
              Total Orders
            </div>

            <div style={styles.cardNumber}>
              0
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <FaHeart />
            </div>

            <div style={styles.cardTitle}>
              Wishlist
            </div>

            <div style={styles.cardNumber}>
              {wishlistCount}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <FaShoppingCart />
            </div>

            <div style={styles.cardTitle}>
              Cart Items
            </div>

            <div style={styles.cardNumber}>
              {cartCount}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>
              <FaSyncAlt />
            </div>

            <div style={styles.cardTitle}>
              Subscription
            </div>

            <div style={styles.cardNumber}>
              0
            </div>
          </div>
        </div>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              My Subscription
            </div>

            <Link
              to="/subscriptions"
              style={styles.viewLink}
            >
              View All
            </Link>
          </div>

          <div style={styles.subscription}>
            <div style={styles.subscriptionTitle}>
              No Active Subscription
            </div>

            <span style={styles.status}>
              NOT SUBSCRIBED
            </span>

            <p style={styles.subscriptionText}>
              Subscribe to your favorite Amruthahara
              products and receive them regularly.
            </p>

            <p style={styles.subscriptionText}>
              Enjoy convenient farm-to-home deliveries.
            </p>

            <Link
              to="/subscriptions"
              style={styles.subscriptionButton}
            >
              Explore Subscriptions
              <FaArrowRight />
            </Link>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              Quick Access
            </div>
          </div>

          <div style={styles.quickLinks}>
            <Link
              to="/profile"
              style={styles.quickLink}
            >
              👤 Edit Profile
            </Link>

            <Link
              to="/orders"
              style={styles.quickLink}
            >
              📦 View Orders
            </Link>

            <Link
              to="/wishlist"
              style={styles.quickLink}
            >
              ❤️ My Wishlist
            </Link>

            <Link
              to="/cart"
              style={styles.quickLink}
            >
              🛒 Open Cart
            </Link>

            <Link
              to="/subscriptions"
              style={styles.quickLink}
            >
              🔄 Manage Subscriptions
            </Link>

            <Link
              to="/addresses"
              style={styles.quickLink}
            >
              📍 Manage Addresses
            </Link>
          </div>
        </section>
      </main>
      
    </div>
     </>
  );
}

export default UserDashboard;