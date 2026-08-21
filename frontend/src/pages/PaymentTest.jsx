import React, { useState } from "react";
import RazorpayButton from "../components/payment/RazorpayButton";

function PaymentTest() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <h1>Amruthahara Checkout</h1>

      <p>
        Complete your details before making the
        payment.
      </p>

      {/* Customer Name */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Full Name</strong>
        </label>

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Email</strong>
        </label>

        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Phone */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Phone Number</strong>
        </label>

        <input
          type="tel"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          maxLength="10"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Order Amount */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>Order Amount: ₹100</strong>
      </div>

      {/* Razorpay */}
      <RazorpayButton
        amount={100}
        customer={customer}
      />
    </div>
  );
}

export default PaymentTest;