import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";

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
    fontSize: "13px",
    fontWeight: "800",
    marginTop: "7px",
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

  empty: {
    textAlign: "center",
    padding: "60px",
  },
};

function OrderTracking() {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    const orders =
      JSON.parse(
        localStorage.getItem(
          "amruthahara_orders"
        )
      ) || [];

    const found = orders.find(
      (item) => item.id === orderId
    );

    setOrder(found || null);
  }, [orderId]);

  if (!order) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div
            style={{
              ...styles.card,
              ...styles.empty,
            }}
          >
            <FaBoxOpen
              size={45}
              color="#39764B"
            />

            <h2>
              Order Not Found
            </h2>

            <button
              onClick={() =>
                navigate("/orders")
              }
              style={{
                border: "none",
                padding: "12px 20px",
                borderRadius: "9px",
                background: "#175C38",
                color: "#fff",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </main>
    );
  }

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
            Order #{order.id}
          </div>

          <div style={styles.summary}>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Status
              </span>

              <span style={styles.value}>
                {order.status}
              </span>
            </div>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Payment
              </span>

              <span style={styles.value}>
                {order.paymentMethod}
              </span>
            </div>

            <div style={styles.summaryBox}>
              <span style={styles.label}>
                Items
              </span>

              <span style={styles.value}>
                {order.items?.length || 0}
              </span>
            </div>

          </div>

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
                    order.tracking.length -
                      1 && (
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

          <div style={styles.total}>
            <span style={styles.totalLabel}>
              Total Amount
            </span>

            <span style={styles.totalValue}>
              ₹{order.total}
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}

export default OrderTracking;