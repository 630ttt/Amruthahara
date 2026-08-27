import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

import {
  FaCheck,
  FaBoxOpen,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    background:
      "linear-gradient(180deg, #F6FAF4 0%, #FFFFFF 100%)",
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    background: "#FFFFFF",
    border: "1px solid #E2EBE3",
    borderRadius: "24px",
    padding: "55px 35px",
    textAlign: "center",
    boxShadow:
      "0 20px 60px rgba(30,70,40,0.10)",
  },

  successCircle: {
    width: "90px",
    height: "90px",
    margin: "0 auto 25px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #DFF5E5, #BDE7C9)",
    color: "#1E7A43",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    boxShadow:
      "0 12px 30px rgba(30,120,65,0.15)",
  },

  title: {
    margin: 0,
    color: "#173F2A",
    fontSize: "34px",
    fontWeight: "900",
  },

  subtitle: {
    maxWidth: "500px",
    margin: "12px auto",
    color: "#758178",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  orderBox: {
    margin: "25px auto",
    maxWidth: "430px",
    background: "#F7FAF6",
    border: "1px solid #E1EAE2",
    borderRadius: "14px",
    padding: "18px",
  },

  orderLabel: {
    color: "#87928A",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "800",
  },

  orderId: {
    color: "#175C38",
    fontSize: "21px",
    fontWeight: "900",
    marginTop: "6px",
    wordBreak: "break-all",
  },

  qrSection: {
    margin: "28px auto",
    width: "fit-content",
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #E1EAE2",
    borderRadius: "18px",
    boxShadow:
      "0 10px 30px rgba(30,70,40,0.08)",
  },

  qrTitle: {
    margin: "0 0 18px",
    color: "#173F2A",
    fontSize: "15px",
    fontWeight: "800",
  },

  qrBox: {
    width: "190px",
    height: "190px",
    padding: "5px",
    margin: "0 auto",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  qrNote: {
    margin: "15px 0 0",
    color: "#8A948D",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "30px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "10px",
    padding: "13px 22px",
    background:
      "linear-gradient(135deg, #175C38, #2F7A4B)",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  secondaryButton: {
    border: "1px solid #175C38",
    borderRadius: "10px",
    padding: "12px 22px",
    background: "#FFFFFF",
    color: "#175C38",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  note: {
    marginTop: "25px",
    color: "#8A948D",
    fontSize: "12px",
  },
};

function OrderSucess() {
  const navigate = useNavigate();
  const location = useLocation();

  // EXISTING ORDER MECHANISM — UNCHANGED
  const order =
    location.state?.order ||
    JSON.parse(
      localStorage.getItem(
        "amruthahara_latest_order"
      )
    );

// Note: The component name "OrderSucess" seems to be a typo. It should probably be "OrderSuccess".

  return (
    <main style={styles.page}>
      <div style={styles.card}>

        {/* SUCCESS ICON */}
        <div style={styles.successCircle}>
          <FaCheck />
        </div>

        {/* SUCCESS TITLE */}
        <h1 style={styles.title}>
          Order Placed Successfully!
        </h1>

        <p style={styles.subtitle}>
          Thank you for shopping with
          Amruthahara. Your order has been
          successfully placed and we'll take
          care of the rest.
        </p>

        {/* ORDER INFORMATION */}
        {order && (
          <>
            <div style={styles.orderBox}>
              <div style={styles.orderLabel}>
                Order ID
              </div>

              <div style={styles.orderId}>
                {order.id}
              </div>
            </div>

            {/* QR CODE */}
            <div style={styles.qrSection}>

              <h3 style={styles.qrTitle}>
                Order QR Code
              </h3>

              <div style={styles.qrBox}>
                <QRCode
                  value={String(order.id)}
                  size={180}
                  bgColor="#FFFFFF"
                  fgColor="#173F2A"
                  level="H"
                />
              </div>

              <p style={styles.qrNote}>
                Scan this QR code to get your
                Order ID.
              </p>

            </div>
          </>
        )}

        {/* BUTTONS */}
        <div style={styles.buttons}>

          <button
            type="button"
            style={styles.primaryButton}
            onClick={() =>
              navigate("/products")
            }
          >
            <FaShoppingBag />
            Shop More
            <FaArrowRight />
          </button>

          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/orders")
            }
          >
            <FaBoxOpen />
            Track Order
          </button>

        </div>

        {/* FOOTER NOTE */}
        <p style={styles.note}>
          You can view your order and tracking
          information anytime from your
          dashboard.
        </p>

      </div>
    </main>
  );
}

export default OrderSucess;