import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";

import UserSidebar from "../../components/user/UserSidebar";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f7faf7 0%, #ffffff 55%, #f2f7f2 100%)",
    display: "flex",
  },

  content: {
    flex: 1,
    padding: "42px 5%",
    boxSizing: "border-box",
    position: "relative",
  },

  /* ================================
     BACK TO SHOP
  ================================= */

  backHome: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    border: "none",
    background: "transparent",
    color: "#52705C",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "8px 0",
    marginBottom: "24px",
    transition: "all 0.2s ease",
  },

  backArrow: {
    fontSize: "12px",
  },

  title: {
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    color: "#78847b",
    margin: "0 0 30px",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5ede6",
    borderRadius: "18px",
    padding: "40px 30px",
    textAlign: "center",
    boxShadow: "0 8px 28px rgba(35,67,46,0.045)",
  },

  icon: {
    width: "72px",
    height: "72px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    background: "#eaf5ed",
    color: "#39764B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  emptyTitle: {
    color: "#23432e",
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  emptyText: {
    color: "#78847b",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  order: {
    background: "#fff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow: "0 6px 22px rgba(35,67,46,0.04)",
    transition: "all 0.2s ease",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  orderId: {
    color: "#23432e",
    fontWeight: "800",
    fontSize: "14px",
  },

  status: {
    background: "#eaf5ed",
    color: "#176338",
    borderRadius: "20px",
    padding: "5px 12px",
    fontSize: "11px",
    fontWeight: "800",
  },

  orderAmount: {
    color: "#175C38",
    fontSize: "18px",
    fontWeight: "800",
  },

  loading: {
    textAlign: "center",
    color: "#758178",
    fontSize: "14px",
  },
};

function OrdersPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        /*
         * This expects your backend to eventually provide:
         *
         * GET /api/orders/user/:userId
         *
         * If that endpoint does not exist yet,
         * the page simply shows no orders.
         */

        if (!user?.id) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/orders/user/${user.id}`
        );

        if (!response.ok) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await response.json();

        setOrders(
          Array.isArray(data)
            ? data
            : data.orders || []
        );
      } catch (error) {
        console.log(
          "Orders not available yet:",
          error
        );

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <div style={styles.page}>
      <UserSidebar />

      <main style={styles.content}>

        {/* ================================
            BACK TO SHOP
        ================================= */}

        <button
          type="button"
          style={styles.backHome}
          onClick={() => navigate("/products")}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#175C38";
            e.currentTarget.style.transform =
              "translateX(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#52705C";
            e.currentTarget.style.transform =
              "translateX(0)";
          }}
        >
          <FaArrowLeft style={styles.backArrow} />
          Back to Shop
        </button>

        {/* ================================
            HEADER
        ================================= */}

        <h1 style={styles.title}>
          My Orders
        </h1>

        <p style={styles.subtitle}>
          View and track your Amruthahara orders.
        </p>

        {/* ================================
            LOADING
        ================================= */}

        {loading ? (
          <div style={styles.card}>
            <div style={styles.loading}>
              Loading orders...
            </div>
          </div>

        ) : orders.length === 0 ? (

          /* ================================
             EMPTY ORDERS
          ================================= */

          <div style={styles.card}>

            <div style={styles.icon}>
              <FaBoxOpen />
            </div>

            <div style={styles.emptyTitle}>
              No Orders Yet
            </div>

            <div style={styles.emptyText}>
              Your completed and ongoing orders
              will appear here.
            </div>

          </div>

        ) : (

          /* ================================
             ORDERS
          ================================= */

          <div>
            {orders.map((order) => (

              <div
                key={order._id}
                style={styles.order}
              >

                <div
                  style={styles.orderHeader}
                >

                  <div
                    style={styles.orderId}
                  >
                    Order #
                    {order._id?.slice(-8)}
                  </div>

                  <span
                    style={styles.status}
                  >
                    {order.status ||
                      "Processing"}
                  </span>

                </div>

                <div
                  style={styles.orderAmount}
                >
                  ₹
                  {order.totalAmount ||
                    order.amount ||
                    0}
                </div>

              </div>

            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrdersPage;