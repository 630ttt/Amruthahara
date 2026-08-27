import React, { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaSyncAlt,
  FaArrowRight,
  FaTruck,
  FaUser,
  FaMapMarkerAlt,
  FaCrown,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import UserSidebar from "../../components/user/UserSidebar";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const styles = {
  page: {
    minHeight: "calc(100vh - 70px)",
    background:
      "linear-gradient(135deg, #f5f8f3 0%, #fbfcf9 50%, #f2f7f2 100%)",
    display: "flex",
    width: "100%",
    overflowX: "hidden",
  },

  content: {
    flex: 1,
    padding: "42px 5%",
    minWidth: 0,
    maxWidth: "1600px",
    margin: "0 auto",
    boxSizing: "border-box",
    width: "100%",
  },

  welcome: {
    marginBottom: "32px",
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    color: "#39764b",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "9px",
  },

  title: {
    color: "#183b28",
    fontSize: "34px",
    fontWeight: "900",
    letterSpacing: "-0.8px",
    margin: "0 0 7px",
    lineHeight: "1.2",
  },

  subtitle: {
    color: "#78857d",
    fontSize: "14px",
    lineHeight: "1.7",
    margin: 0,
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "32px",
  },

  card: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(145deg, #ffffff 0%, #f9fcf9 100%)",
    border: "1px solid #e0eae1",
    borderRadius: "18px",
    padding: "22px",
    boxShadow:
      "0 12px 35px rgba(28, 67, 39, 0.055)",
    transition:
      "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
    boxSizing: "border-box",
    minWidth: 0,
  },

  cardDecor: {
    position: "absolute",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(57,118,75,0.045)",
    right: "-25px",
    top: "-25px",
  },

  cardIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #edf7ef, #e2f1e5)",
    color: "#28643d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginBottom: "17px",
    position: "relative",
    zIndex: 1,
  },

  cardTitle: {
    color: "#7b8780",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "6px",
    letterSpacing: "0.2px",
  },

  cardNumber: {
    color: "#183b28",
    fontSize: "27px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
  },

  section: {
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e1eae2",
    borderRadius: "19px",
    padding: "24px",
    marginBottom: "22px",
    boxShadow:
      "0 10px 32px rgba(25, 65, 37, 0.045)",
    boxSizing: "border-box",
    width: "100%",
    minWidth: 0,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "19px",
  },

  sectionTitle: {
    color: "#1c402b",
    fontSize: "18px",
    fontWeight: "850",
    letterSpacing: "-0.2px",
  },

  viewLink: {
    color: "#39764b",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "800",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
  },

  latestOrder: {
    background:
      "linear-gradient(135deg, #f1f8f2 0%, #fbfdfb 100%)",
    border: "1px solid #dce9de",
    borderRadius: "16px",
    padding: "21px",
    boxSizing: "border-box",
    width: "100%",
    minWidth: 0,
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  orderId: {
    color: "#21462f",
    fontSize: "14px",
    fontWeight: "850",
    wordBreak: "break-word",
  },

  orderDate: {
    color: "#8b968f",
    fontSize: "11px",
    marginTop: "5px",
  },

  orderStatus: {
    background: "#dff3e4",
    color: "#176338",
    padding: "7px 13px",
    borderRadius: "30px",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  },

  orderBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  orderItems: {
    color: "#6d7a71",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    marginBottom: "7px",
  },

  orderAmount: {
    color: "#1c6a3c",
    fontSize: "22px",
    fontWeight: "900",
  },

  trackButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background:
      "linear-gradient(135deg, #1b6138, #39764b)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    padding: "11px 16px",
    fontSize: "11px",
    fontWeight: "850",
    boxShadow:
      "0 7px 18px rgba(27,97,56,.18)",
    transition: "all .25s ease",
    whiteSpace: "nowrap",
  },

  subscription: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #edf8ef 0%, #f9fcf8 100%)",
    border: "1px solid #d9e9dc",
    borderRadius: "16px",
    padding: "23px",
    boxSizing: "border-box",
  },

  subscriptionTitle: {
    color: "#20472f",
    fontSize: "18px",
    fontWeight: "850",
    marginBottom: "8px",
  },

  status: {
    display: "inline-block",
    background: "#dff3e4",
    color: "#176338",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "0.5px",
    marginBottom: "14px",
  },

  subscriptionText: {
    color: "#68766d",
    fontSize: "13px",
    lineHeight: "1.7",
    marginBottom: "4px",
  },

  subscriptionButton: {
    marginTop: "15px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#1b6138",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    padding: "10px 15px",
    fontSize: "12px",
    fontWeight: "800",
  },

  quickLinks: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
  },

  quickLink: {
    textDecoration: "none",
    color: "#244532",
    background:
      "linear-gradient(145deg, #fafcfa, #f5f9f5)",
    border: "1px solid #e3ebe4",
    padding: "15px 16px",
    borderRadius: "13px",
    fontWeight: "750",
    fontSize: "13px",
    transition: "all .25s ease",
    boxSizing: "border-box",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    padding: "38px 20px",
    color: "#7b8780",
  },
};

function UserDashboard() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const [orders, setOrders] = useState([]);

  /* =========================================
     LOAD ORDERS
  ========================================= */

  const loadOrders = () => {
    try {
      const savedOrders =
        JSON.parse(
          localStorage.getItem(
            "amruthahara_orders"
          )
        ) || [];

      const sortedOrders = [...savedOrders].sort(
        (a, b) =>
          new Date(
            b.orderDate ||
              b.createdAt ||
              0
          ) -
          new Date(
            a.orderDate ||
              a.createdAt ||
              0
          )
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error(
        "Unable to load orders:",
        error
      );

      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();

    const handleFocus = () => {
      loadOrders();
    };

    const handleStorage = (event) => {
      if (
        event.key ===
        "amruthahara_orders"
      ) {
        loadOrders();
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /* =========================================
     CART COUNT
  ========================================= */

  const cartCount = Array.isArray(cart)
    ? cart.reduce((total, item) => {
        const quantity = Number(
          item.quantity ??
            item.qty ??
            1
        );

        return total + quantity;
      }, 0)
    : 0;

  /* =========================================
     WISHLIST COUNT
  ========================================= */

  const wishlistCount =
    Array.isArray(wishlist)
      ? wishlist.length
      : 0;

  /* =========================================
     LATEST ORDER
  ========================================= */

  const latestOrder = orders[0];

  const latestOrderItems =
    latestOrder?.items || [];

  const latestOrderTotal = Number(
    latestOrder?.total || 0
  );

  /* =========================================
     FORMAT PRICE
  ========================================= */

  const formatRupees = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =========================================
     CARD HOVER
  ========================================= */

  const cardHoverIn = (e) => {
    e.currentTarget.style.transform =
      "translateY(-5px)";

    e.currentTarget.style.boxShadow =
      "0 18px 40px rgba(28,67,39,.11)";

    e.currentTarget.style.borderColor =
      "#cddfce";
  };

  const cardHoverOut = (e) => {
    e.currentTarget.style.transform =
      "translateY(0)";

    e.currentTarget.style.boxShadow =
      "0 12px 35px rgba(28,67,39,.055)";

    e.currentTarget.style.borderColor =
      "#e0eae1";
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-page" style={styles.page}>
        <UserSidebar />

        <main
          className="dashboard-content"
          style={styles.content}
        >
          {/* =================================
              WELCOME
          ================================= */}

          <div
            className="dashboard-welcome"
            style={styles.welcome}
          >
            <div style={styles.eyebrow}>
              <FaCrown size={10} />
              AMRUTHAHARA MEMBER
            </div>

            <h1 style={styles.title}>
              Welcome back,{" "}
              {user?.name?.split(" ")[0] ||
                "User"}{" "}
              👋
            </h1>

            <p style={styles.subtitle}>
              Your premium farm-to-home
              experience, all in one place.
            </p>
          </div>

          {/* =================================
              STAT CARDS
          ================================= */}

          <div
            className="dashboard-cards"
            style={styles.cards}
          >
            {/* ORDERS */}

            <div
              style={styles.card}
              onMouseEnter={cardHoverIn}
              onMouseLeave={cardHoverOut}
            >
              <div style={styles.cardDecor} />

              <div style={styles.cardIcon}>
                <FaBoxOpen />
              </div>

              <div style={styles.cardTitle}>
                Total Orders
              </div>

              <div style={styles.cardNumber}>
                {orders.length}
              </div>
            </div>

            {/* WISHLIST */}

            <div
              style={styles.card}
              onMouseEnter={cardHoverIn}
              onMouseLeave={cardHoverOut}
            >
              <div style={styles.cardDecor} />

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

            {/* CART */}

            <div
              style={styles.card}
              onMouseEnter={cardHoverIn}
              onMouseLeave={cardHoverOut}
            >
              <div style={styles.cardDecor} />

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

            {/* SUBSCRIPTIONS */}

            <div
              style={styles.card}
              onMouseEnter={cardHoverIn}
              onMouseLeave={cardHoverOut}
            >
              <div style={styles.cardDecor} />

              <div style={styles.cardIcon}>
                <FaSyncAlt />
              </div>

              <div style={styles.cardTitle}>
                Active Subscriptions
              </div>

              <div style={styles.cardNumber}>
                0
              </div>
            </div>
          </div>

          {/* =================================
              LATEST ORDER
          ================================= */}

          <section
            className="dashboard-section"
            style={styles.section}
          >
            <div
              className="section-header"
              style={styles.sectionHeader}
            >
              <div style={styles.sectionTitle}>
                Latest Order
              </div>

              <Link
                to="/Orders"
                style={styles.viewLink}
              >
                View All Orders
                <FaArrowRight size={9} />
              </Link>
            </div>

            {latestOrder ? (
              <div
                className="latest-order"
                style={styles.latestOrder}
              >
                <div
                  className="order-top"
                  style={styles.orderTop}
                >
                  <div>
                    <div style={styles.orderId}>
                      Order #{" "}
                      {latestOrder.id ||
                        latestOrder.orderId ||
                        "N/A"}
                    </div>

                    <div style={styles.orderDate}>
                      {latestOrder.orderDate ||
                      latestOrder.createdAt
                        ? new Date(
                            latestOrder.orderDate ||
                              latestOrder.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Recently placed"}
                    </div>
                  </div>

                  <span style={styles.orderStatus}>
                    {(
                      latestOrder.status ||
                      "PLACED"
                    ).toUpperCase()}
                  </span>
                </div>

                <div
                  className="order-bottom"
                  style={styles.orderBottom}
                >
                  <div>
                    <div style={styles.orderItems}>
                      <FaBoxOpen
                        style={{
                          marginRight: "7px",
                        }}
                      />

                      {latestOrderItems.length}{" "}
                      product
                      {latestOrderItems.length !==
                      1
                        ? "s"
                        : ""}
                    </div>

                    <div style={styles.orderAmount}>
                      {formatRupees(
                        latestOrderTotal
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/orders/${
                      latestOrder.id ||
                      latestOrder.orderId
                    }`}
                    style={styles.trackButton}
                  >
                    <FaTruck />

                    Track Order

                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            ) : (
              <div style={styles.empty}>
                <FaBoxOpen
                  size={34}
                  color="#39764B"
                />

                <p
                  style={{
                    marginTop: "12px",
                    marginBottom: "14px",
                    fontSize: "13px",
                  }}
                >
                  You haven't placed any
                  orders yet.
                </p>

                <Link
                  to="/products"
                  style={styles.subscriptionButton}
                >
                  Start Shopping
                  <FaArrowRight />
                </Link>
              </div>
            )}
          </section>

          {/* =================================
              SUBSCRIPTION
          ================================= */}

          <section
            className="dashboard-section"
            style={styles.section}
          >
            <div
              className="section-header"
              style={styles.sectionHeader}
            >
              <div style={styles.sectionTitle}>
                My Subscription
              </div>

              <Link
                to="/subscriptions"
                style={styles.viewLink}
              >
                View All
                <FaArrowRight size={9} />
              </Link>
            </div>

            <div
              className="subscription-box"
              style={styles.subscription}
            >
              <div style={styles.subscriptionTitle}>
                No Active Subscription
              </div>

              <span style={styles.status}>
                NOT SUBSCRIBED
              </span>

              <p style={styles.subscriptionText}>
                Subscribe to your favorite
                Amruthahara products and
                receive them regularly.
              </p>

              <p style={styles.subscriptionText}>
                Enjoy convenient, fresh
                farm-to-home deliveries.
              </p>

              <Link
                to="/subscription"
                style={styles.subscriptionButton}
              >
                Explore Subscriptions
                <FaArrowRight />
              </Link>
            </div>
          </section>

          {/* =================================
              QUICK ACCESS
          ================================= */}

          <section
            className="dashboard-section"
            style={styles.section}
          >
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitle}>
                Quick Access
              </div>
            </div>

            <div
              className="quick-links"
              style={styles.quickLinks}
            >
              <Link
                to="/profile"
                style={styles.quickLink}
              >
                <FaUser
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                Edit Profile
              </Link>

              <Link
                to="/Orders"
                style={styles.quickLink}
              >
                <FaBoxOpen
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                View Orders
              </Link>

              <Link
                to="/wishlist"
                style={styles.quickLink}
              >
                <FaHeart
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                My Wishlist
              </Link>

              <Link
                to="/cart"
                style={styles.quickLink}
              >
                <FaShoppingCart
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                Open Cart
              </Link>

              <Link
                to="/subscription"
                style={styles.quickLink}
              >
                <FaSyncAlt
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                Manage Subscriptions
              </Link>

              <Link
                to="/addresses"
                style={styles.quickLink}
              >
                <FaMapMarkerAlt
                  style={{
                    marginRight: "9px",
                    color: "#39764b",
                    flexShrink: 0,
                  }}
                />
                Manage Addresses
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* =========================================
          RESPONSIVE DESIGN
      ========================================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        a {
          transition: all 0.25s ease;
        }

        a:hover {
          opacity: 0.92;
        }

        /* =========================================
           LARGE TABLET
        ========================================= */

        @media (max-width: 1200px) {
          .dashboard-content {
            padding: 35px 30px !important;
          }

          .dashboard-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .quick-links {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {
          .dashboard-content {
            padding: 30px 24px !important;
          }

          .dashboard-cards {
            gap: 14px !important;
          }

          .dashboard-section {
            padding: 20px !important;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 768px) {
          .dashboard-page {
            display: block !important;
            width: 100% !important;
            min-height: calc(100vh - 70px);
          }

          .dashboard-content {
            width: 100% !important;
            max-width: 100% !important;
            padding: 24px 16px 35px !important;
            margin: 0 !important;
          }

          .dashboard-welcome {
            margin-bottom: 24px !important;
          }

          .dashboard-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
          }

          .dashboard-cards > div {
            padding: 17px !important;
            border-radius: 15px !important;
          }

          .dashboard-cards > div:hover {
            transform: none !important;
          }

          .dashboard-cards > div > div:nth-child(2) {
            width: 40px !important;
            height: 40px !important;
            border-radius: 12px !important;
            font-size: 16px !important;
            margin-bottom: 13px !important;
          }

          .dashboard-cards > div > div:nth-child(3) {
            font-size: 11px !important;
          }

          .dashboard-cards > div > div:nth-child(4) {
            font-size: 24px !important;
          }

          .dashboard-section {
            padding: 17px !important;
            border-radius: 16px !important;
            margin-bottom: 16px !important;
          }

          .section-header {
            margin-bottom: 15px !important;
            gap: 10px !important;
          }

          .section-header > div:first-child {
            font-size: 16px !important;
          }

          .viewLink {
            font-size: 10px !important;
          }

          .latest-order {
            padding: 16px !important;
            border-radius: 14px !important;
          }

          .order-top {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 10px !important;
            margin-bottom: 17px !important;
          }

          .order-status {
            align-self: flex-start !important;
          }

          .order-bottom {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 15px !important;
          }

          .order-bottom > div {
            width: 100% !important;
          }

          .order-amount {
            font-size: 20px !important;
          }

          .trackButton {
            width: 100% !important;
            padding: 12px 14px !important;
          }

          .subscription-box {
            padding: 18px !important;
            border-radius: 14px !important;
          }

          .subscriptionButton {
            width: 100% !important;
          }

          .quick-links {
            grid-template-columns: 1fr !important;
            gap: 9px !important;
          }

          .quick-links a {
            padding: 13px 14px !important;
            min-height: 46px !important;
          }
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 500px) {
          .dashboard-content {
            padding: 20px 12px 30px !important;
          }

          .dashboard-welcome {
            padding: 0 3px;
          }

          .dashboard-welcome h1 {
            font-size: 25px !important;
            line-height: 1.25 !important;
            letter-spacing: -0.5px !important;
          }

          .dashboard-welcome p {
            font-size: 12px !important;
            line-height: 1.6 !important;
          }

          .dashboard-cards {
            gap: 9px !important;
          }

          .dashboard-cards > div {
            padding: 15px !important;
            min-height: 135px;
          }

          .dashboard-cards > div > div:nth-child(3) {
            font-size: 10px !important;
          }

          .dashboard-cards > div > div:nth-child(4) {
            font-size: 23px !important;
          }

          .dashboard-section {
            padding: 15px !important;
          }

          .section-header {
            align-items: center !important;
          }

          .section-header > div:first-child {
            font-size: 15px !important;
          }

          .viewLink {
            font-size: 9px !important;
            gap: 4px !important;
          }

          .latest-order {
            padding: 14px !important;
          }

          .order-id {
            font-size: 13px !important;
          }

          .order-date {
            font-size: 10px !important;
          }

          .order-amount {
            font-size: 19px !important;
          }

          .subscription-title {
            font-size: 16px !important;
          }

          .subscription-text {
            font-size: 12px !important;
          }
        }

        /* =========================================
           VERY SMALL PHONES
        ========================================= */

        @media (max-width: 360px) {
          .dashboard-content {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }

          .dashboard-cards {
            gap: 7px !important;
          }

          .dashboard-cards > div {
            padding: 13px !important;
          }

          .dashboard-cards > div > div:nth-child(2) {
            width: 36px !important;
            height: 36px !important;
            font-size: 14px !important;
          }

          .dashboard-cards > div > div:nth-child(3) {
            font-size: 9px !important;
          }

          .dashboard-cards > div > div:nth-child(4) {
            font-size: 21px !important;
          }

          .dashboard-welcome h1 {
            font-size: 23px !important;
          }
        }
      `}</style>
    </>
  );
}

export default UserDashboard;