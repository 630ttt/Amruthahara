
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../services/apiBase";
import { getBowlIngredientLine, isBowlItem } from "../../utils/bowlOrder";

const styles = {
  page: {
    minHeight: "80vh",
    background:
      "linear-gradient(180deg, #F7FAF5, #FFFFFF)",
    padding: "50px 20px",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  back: {
    border: "none",
    background: "transparent",
    color: "#175C38",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "25px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #E2EBE3",
    borderRadius: "20px",
    padding: "30px",
    boxShadow:
      "0 10px 35px rgba(30,70,40,0.07)",
  },

  title: {
    margin: 0,
    color: "#23432E",
    fontSize: "28px",
    fontWeight: "900",
  },

  id: {
    color: "#175C38",
    fontSize: "12px",
    fontWeight: "800",
    marginTop: "7px",
    wordBreak: "break-all",
  },

  summary: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginTop: "25px",
    marginBottom: "35px",
  },

  summaryBox: {
    background: "#F7FAF6",
    borderRadius: "12px",
    padding: "15px",
  },

  label: {
    display: "block",
    color: "#8A948D",
    fontSize: "10px",
    textTransform: "uppercase",
    fontWeight: "800",
    marginBottom: "6px",
  },

  value: {
    color: "#294233",
    fontSize: "13px",
    fontWeight: "800",
  },

  trackingTitle: {
    color: "#294233",
    fontSize: "19px",
    fontWeight: "900",
    marginBottom: "25px",
  },

  timeline: {
    position: "relative",
  },

  item: {
    display: "flex",
    gap: "17px",
    position: "relative",
    paddingBottom: "28px",
  },

  line: {
    position: "absolute",
    left: "18px",
    top: "38px",
    bottom: 0,
    width: "2px",
    background: "#DDE9DF",
  },

  icon: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },

  completedIcon: {
    background: "#DFF3E4",
    color: "#176338",
  },

  pendingIcon: {
    background: "#F0F3F0",
    color: "#A0AAA3",
  },

  trackingContent: {
    paddingTop: "2px",
  },

  trackingName: {
    color: "#294233",
    fontSize: "14px",
    fontWeight: "900",
  },

  trackingDescription: {
    color: "#7C877F",
    fontSize: "12px",
    marginTop: "5px",
    lineHeight: "1.6",
  },

  address: {
    marginTop: "25px",
    background: "#F7FAF6",
    borderRadius: "12px",
    padding: "17px",
    display: "flex",
    gap: "12px",
    color: "#617068",
    fontSize: "12px",
  },

  total: {
    marginTop: "25px",
    paddingTop: "20px",
    borderTop:
      "1px solid #E7ECE8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#68756C",
    fontSize: "13px",
  },

  totalValue: {
    color: "#175C38",
    fontSize: "24px",
    fontWeight: "900",
  },

  loading: {
    textAlign: "center",
    padding: "60px",
    color: "#52705C",
    fontWeight: "700",
  },

  error: {
    textAlign: "center",
    padding: "60px 20px",
  },

  retry: {
    border: "none",
    padding: "12px 20px",
    borderRadius: "9px",
    background: "#175C38",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "15px",
  },
};

function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token: customerToken, sessionReady } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ORDER USING MONGODB _id
  // =====================================================

  const fetchOrder = async () => {
    try {
      setError("");

      if (!orderId) {
        throw new Error(
          "No order ID found"
        );
      }

      const token =
        customerToken ||
        localStorage.getItem("amruthahara_token") ||
        localStorage.getItem("adminToken");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}`,
        { headers }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch order"
        );
      }

      setOrder(data.order);
    } catch (err) {
      console.error(
        "TRACK ORDER ERROR:",
        err
      );

      setError(
        err.message ||
          "Failed to fetch order"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL FETCH + AUTO REFRESH
  // =====================================================

  useEffect(() => {
    if (!sessionReady) {
      return;
    }

    fetchOrder();

    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, sessionReady, customerToken]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.loading}>
              Loading order tracking...
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !order) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>

          <button
            style={styles.back}
            onClick={() =>
              navigate("/orders")
            }
          >
            <FaArrowLeft />
            Back to Orders
          </button>

          <div
            style={{
              ...styles.card,
              ...styles.error,
            }}
          >

            <FaBoxOpen
              size={45}
              color="#39764B"
            />

            <h2>
              Order Not Found
            </h2>

            <p>
              {error ||
                "Unable to load this order."}
            </p>

            <button
              style={styles.retry}
              onClick={fetchOrder}
            >
              Try Again
            </button>

          </div>

        </div>
      </main>
    );
  }

  // =====================================================
  // DISPLAY
  // =====================================================

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <button
          type="button"
          style={styles.back}
          onClick={() =>
            navigate("/orders")
          }
        >
          <FaArrowLeft />
          Back to Orders
        </button>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Track Your Order
          </h1>

          <div style={styles.id}>
             Order ID: {order._id}
          </div>

          {/* SUMMARY */}

          <div style={styles.summary}>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Status
              </span>

              <span style={styles.value}>
                {order.status || "Pending"}
              </span>
            </div>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Payment
              </span>

              <span style={styles.value}>
                {order.paymentMethod || "COD"}
              </span>
            </div>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Items
              </span>

              <span style={styles.value}>
                {order.items?.some(isBowlItem)
                  ? "Custom Bowl"
                  : order.items?.length || 0}
              </span>
            </div>

          </div>

          {order.items?.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <h2 style={styles.trackingTitle}>
                Order Items
              </h2>

              {order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.summaryBox,
                    marginBottom: "10px",
                  }}
                >
                  <span style={styles.value}>
                    {item.name}
                    {isBowlItem(item) ? "" : ` × ${item.quantity || 1}`}
                  </span>

                  {isBowlItem(item) && (
                    <span
                      style={{
                        ...styles.label,
                        marginTop: "8px",
                        textTransform: "none",
                        fontSize: "12px",
                        lineHeight: 1.5,
                      }}
                    >
                      {getBowlIngredientLine(item)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TRACKING */}

          <h2 style={styles.trackingTitle}>
            Order Tracking
          </h2>

          <div style={styles.timeline}>

            {order.tracking?.map(
              (track, index) => (

                <div
                  key={index}
                  style={styles.item}
                >

                  {index <
                    order.tracking.length - 1 && (
                    <div
                      style={styles.line}
                    />
                  )}

                  <div
                    style={{
                      ...styles.icon,
                      ...(track.completed
                        ? styles.completedIcon
                        : styles.pendingIcon),
                    }}
                  >
                    {track.completed ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTruck />
                    )}
                  </div>

                  <div
                    style={
                      styles.trackingContent
                    }
                  >

                    <div
                      style={
                        styles.trackingName
                      }
                    >
                      {track.title}
                    </div>

                    <div
                      style={
                        styles.trackingDescription
                      }
                    >
                      {track.description}
                    </div>

                    {track.date && (
                      <small
                        style={{
                          color: "#9AA39D",
                          fontSize: "10px",
                        }}
                      >
                        {new Date(
                          track.date
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </small>
                    )}

                  </div>

                </div>

              )
            )}

          </div>

          {/* ADDRESS */}

          <div style={styles.address}>

            <FaMapMarkerAlt
              color="#39764B"
            />

            <div>

              <strong
                style={{
                  color: "#294233",
                }}
              >
                Delivery Address
              </strong>

              <br />

              {order.address?.name}
              <br />

              {order.address?.addressLine}
              <br />

              {order.address?.city},{" "}
              {order.address?.state} -{" "}
              {order.address?.pincode}

            </div>

          </div>

          {/* TOTAL */}

          <div style={styles.total}>

            <span style={styles.totalLabel}>
              Total Amount:
            </span>

            <span style={styles.totalValue}>
              ₹{order.amount}
            </span>

          </div>

        </div>
      </div>
    </main>
  );
}

export default OrderTracking;

