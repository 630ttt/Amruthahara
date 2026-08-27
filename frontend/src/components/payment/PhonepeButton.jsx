import React, { useState } from "react";
import {
  FaMobileAlt,
  FaLock,
} from "react-icons/fa";

const PhonePeButton = ({
  amount,
  customer,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handlePhonePePayment = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "🔥 Starting PhonePe payment"
      );

      const response = await fetch(
        "http://localhost:5000/api/phonepe/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            amount: Number(amount),
            customer,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "PhonePe response:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to create PhonePe payment"
        );
      }

      if (!data.redirectUrl) {
        throw new Error(
          "PhonePe payment URL was not received"
        );
      }

      // Save payment information
      localStorage.setItem(
        "amruthahara_phonepe_order",
        JSON.stringify({
          merchantOrderId:
            data.merchantOrderId,
          amount: Number(amount),
          customer:
            customer || null,
        })
      );

      console.log(
        "✅ Redirecting to PhonePe..."
      );

      // Open PhonePe checkout
      window.location.href =
        data.redirectUrl;
    } catch (error) {
      console.error(
        "❌ PhonePe Error:",
        error
      );

      setError(
        error.message ||
          "Unable to start PhonePe payment"
      );

      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <button
        type="button"
        onClick={handlePhonePePayment}
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
        }}
      >
        <FaMobileAlt />

        {loading
          ? "Opening PhonePe..."
          : `Pay ₹${Number(amount).toFixed(
              2
            )} with PhonePe`}
      </button>

      <div style={styles.secure}>
        <FaLock />
        Secure payment powered by PhonePe
      </div>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
  },

  button: {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "15px 18px",
    background:
      "linear-gradient(135deg, #5F259F, #7B3FC6)",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    cursor: "pointer",
  },

  secure: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    color: "#7A847D",
    fontSize: "10px",
  },

  error: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "8px",
    background: "#FFF2F2",
    border:
      "1px solid #FFD4D4",
    color: "#C0392B",
    fontSize: "12px",
    textAlign: "center",
  },
};

export default PhonePeButton;