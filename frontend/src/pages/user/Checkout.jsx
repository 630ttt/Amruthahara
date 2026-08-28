import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PhonePeButton from "../../components/payment/PhonepeButton";
// import RazorpayButton from "../../components/payment/RazorpayButton";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaShoppingCart,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [address, setAddress] = useState({
    name: user?.name || "Amruthahara Customer",
    phone: user?.phone || "9999999999",
    addressLine: "12-34, Amruthahara Street",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
  });

  const [tempAddress, setTempAddress] = useState(address);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const customer = {
    name: address.name,
    email: user?.email || "customer@example.com",
    phone: address.phone,
  };

  const openAddressModal = () => {
    setTempAddress(address);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (
      !tempAddress.name ||
      !tempAddress.phone ||
      !tempAddress.addressLine ||
      !tempAddress.city ||
      !tempAddress.state ||
      !tempAddress.pincode
    ) {
      alert("Please fill all address fields.");
      return;
    }

    setAddress(tempAddress);
    setShowAddressModal(false);
  };

  const createOrderObject = ({
    orderId,
    paymentMethod,
    paymentStatus,
  }) => {
    return {
      id: orderId || "AMR" + Date.now().toString().slice(-8),
      userId:
        user?._id ||
        user?.id ||
        user?.email ||
        "guest",
      orderDate: new Date().toISOString(),
      status: "Order Placed",
      paymentMethod,
      paymentStatus,
      subtotal,
      deliveryCharge,
      total,

      customer: {
        name: address.name,
        email: user?.email || "customer@example.com",
        phone: address.phone,
      },

      address: { ...address },

      items: cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
      })),

      tracking: [
        {
          title: "Order Placed",
          description:
            "Your order has been successfully placed.",
          completed: true,
          date: new Date().toISOString(),
        },
        {
          title: "Order Confirmed",
          description:
            "Your order will be confirmed shortly.",
          completed: false,
          date: null,
        },
        {
          title: "Preparing",
          description:
            "Our team will prepare your fresh products.",
          completed: false,
          date: null,
        },
        {
          title: "Out for Delivery",
          description:
            "Your order will be handed over to our delivery partner.",
          completed: false,
          date: null,
        },
        {
          title: "Delivered",
          description:
            "Your order will be delivered to your doorstep.",
          completed: false,
          date: null,
        },
      ],
    };
  };

  const saveOrder = (newOrder) => {
    const existingOrders =
      JSON.parse(
        localStorage.getItem("amruthahara_orders")
      ) || [];

    existingOrders.unshift(newOrder);

    localStorage.setItem(
      "amruthahara_orders",
      JSON.stringify(existingOrders)
    );

    localStorage.setItem(
      "amruthahara_latest_order",
      JSON.stringify(newOrder)
    );

    if (typeof clearCart === "function") {
      clearCart();
    } else {
      localStorage.removeItem("amruthahara_cart");
    }
  };

  const handleCOD = () => {
    if (paymentMethod !== "cod") {
      alert("Please select Cash on Delivery.");
      return;
    }

    const orderId =
      "AMR" + Date.now().toString().slice(-8);

    const newOrder = createOrderObject({
      orderId,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
    });

    saveOrder(newOrder);

    navigate("/order-success", {
      replace: true,
      state: { order: newOrder },
    });
  };

  const handlePhonePeCreated = (phonePeData) => {
    console.log(
      "PhonePe order created:",
      phonePeData
    );
  };

  const handlePhonePeError = (error) => {
    console.error("PhonePe error:", error);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <style>
          {`
            .checkout-empty-page {
              min-height: 75vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 40px 20px;
              background: linear-gradient(
                180deg,
                #F7FAF5 0%,
                #FFFFFF 100%
              );
              box-sizing: border-box;
            }

            .checkout-empty-card {
              width: 100%;
              max-width: 500px;
              text-align: center;
              background: #FFFFFF;
              padding: 50px 30px;
              border-radius: 20px;
              border: 1px solid #E6ECE4;
              box-shadow:
                0 10px 35px rgba(30,70,40,0.07);
              box-sizing: border-box;
            }

            @media (max-width: 600px) {
              .checkout-empty-page {
                padding: 30px 15px;
              }

              .checkout-empty-card {
                padding: 40px 20px;
                border-radius: 16px;
              }

              .checkout-empty-title {
                font-size: 22px !important;
              }

              .checkout-empty-text {
                font-size: 13px !important;
              }
            }

            @media (max-width: 380px) {
              .checkout-empty-card {
                padding: 30px 16px;
              }

              .checkout-empty-title {
                font-size: 20px !important;
              }
            }
          `}
        </style>

        <main className="checkout-empty-page">
          <div className="checkout-empty-card">
            <div style={styles.emptyIcon}>
              <FaShoppingCart />
            </div>

            <h1
              className="checkout-empty-title"
              style={styles.emptyTitle}
            >
              Your Cart is Empty
            </h1>

            <p
              className="checkout-empty-text"
              style={styles.emptyText}
            >
              Add some fresh Amruthahara products to
              your cart before proceeding to checkout.
            </p>

            <button
              type="button"
              style={styles.shopButton}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          /* =========================================
             CHECKOUT RESPONSIVE DESIGN
          ========================================= */

          * {
            box-sizing: border-box;
          }

          .checkout-page {
            width: 100%;
            overflow-x: hidden;
          }

          .checkout-container {
            width: 92%;
            max-width: 1250px;
            margin: 0 auto;
          }

          .checkout-layout {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) 350px;
            gap: 28px;
            align-items: start;
          }

          .checkout-card {
            width: 100%;
          }

          .checkout-summary {
            width: 100%;
          }

          .checkout-item {
            min-width: 0;
          }

          .checkout-item-details {
            min-width: 0;
          }

          .checkout-item-name {
            overflow-wrap: anywhere;
          }

          .checkout-payment-option {
            width: 100%;
            box-sizing: border-box;
          }

          .checkout-address-grid {
            width: 100%;
          }

          /* =========================================
             LARGE TABLET
          ========================================= */

          @media (max-width: 1050px) {
            .checkout-layout {
              grid-template-columns:
                minmax(0, 1fr) 300px;
              gap: 20px;
            }

            .checkout-container {
              width: 94%;
            }

            .checkout-card {
              padding: 22px !important;
            }

            .checkout-summary {
              padding: 22px !important;
            }

            .checkout-nav-placeholder {
              display: none;
            }
          }

          /* =========================================
             TABLET
          ========================================= */

          @media (max-width: 850px) {
            .checkout-layout {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .checkout-summary {
              position: static !important;
              top: auto !important;
              order: 2;
            }

            .checkout-container {
              width: 94%;
            }

            .checkout-header {
              margin-bottom: 30px !important;
            }

            .checkout-heading {
              font-size: 42px !important;
            }

            .checkout-subtitle {
              max-width: 650px !important;
            }
          }

          /* =========================================
             MOBILE
          ========================================= */

          @media (max-width: 600px) {
            .checkout-page {
              padding:
                30px 0 50px !important;
            }

            .checkout-container {
              width:
                calc(100% - 24px) !important;
            }

            .checkout-header {
              margin-bottom: 25px !important;
            }

            .checkout-brand {
              font-size: 9px !important;
              padding: 7px 12px !important;
              letter-spacing: 1.2px !important;
            }

            .checkout-heading {
              font-size: 32px !important;
              line-height: 1.12 !important;
              letter-spacing: -0.7px !important;
            }

            .checkout-subtitle {
              font-size: 13px !important;
              line-height: 1.6 !important;
              padding: 0 5px;
            }

            .checkout-layout {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }

            .checkout-card {
              padding: 17px !important;
              margin-bottom: 16px !important;
              border-radius: 15px !important;
            }

            .checkout-summary {
              padding: 18px !important;
              border-radius: 15px !important;
            }

            .checkout-section-header {
              gap: 10px !important;
              margin-bottom: 17px !important;
            }

            .checkout-section-icon {
              width: 38px !important;
              height: 38px !important;
            }

            .checkout-section-title {
              font-size: 16px !important;
            }

            .checkout-section-subtitle {
              font-size: 10px !important;
              line-height: 1.4 !important;
            }

            .checkout-address {
              padding: 14px !important;
            }

            .checkout-customer-name {
              font-size: 14px !important;
            }

            .checkout-address-text {
              font-size: 12px !important;
            }

            .checkout-phone {
              font-size: 11px !important;
            }

            .checkout-change-button {
              width: 100%;
              justify-content: center;
              padding: 11px 14px !important;
            }

            /* ITEMS */

            .checkout-item {
              gap: 10px !important;
              padding: 13px 0 !important;
              align-items: center !important;
            }

            .checkout-item-image {
              width: 52px !important;
              height: 52px !important;
              border-radius: 9px !important;
              font-size: 22px !important;
            }

            .checkout-item-name {
              font-size: 12px !important;
              line-height: 1.35 !important;
              margin-bottom: 3px !important;
            }

            .checkout-item-quantity {
              font-size: 10px !important;
            }

            .checkout-item-price {
              font-size: 13px !important;
              white-space: nowrap;
            }

            /* PAYMENT */

            .checkout-payment-option {
              padding: 13px !important;
              gap: 9px !important;
            }

            .checkout-radio {
              width: 15px !important;
              height: 15px !important;
            }

            .checkout-payment-icon {
              width: 34px !important;
              height: 34px !important;
              font-size: 13px !important;
            }

            .checkout-payment-title {
              font-size: 12px !important;
            }

            .checkout-payment-description {
              font-size: 10px !important;
              margin: 3px 0 5px !important;
            }

            .checkout-payment-tags {
              gap: 3px !important;
            }

            .checkout-payment-tags span {
              font-size: 7px !important;
              padding: 3px 5px !important;
            }

            .checkout-selected-icon {
              font-size: 15px !important;
              flex-shrink: 0;
            }

            .checkout-pay-box {
              padding: 13px !important;
              margin-top: 13px !important;
            }

            .checkout-cod-button {
              padding: 13px !important;
              font-size: 13px !important;
            }

            /* SUMMARY */

            .checkout-summary-title {
              font-size: 18px !important;
              margin-bottom: 20px !important;
            }

            .checkout-summary-row {
              font-size: 12px !important;
              margin-bottom: 12px !important;
            }

            .checkout-divider {
              margin: 17px 0 !important;
            }

            .checkout-total-row {
              font-size: 13px !important;
            }

            .checkout-total-amount {
              font-size: 21px !important;
            }

            .checkout-trust-box {
              margin-top: 20px !important;
              padding-top: 16px !important;
            }

            .checkout-trust-item {
              margin-bottom: 13px !important;
            }

            .checkout-trust-icon {
              font-size: 14px !important;
            }

            .checkout-trust-item strong {
              font-size: 11px !important;
            }

            .checkout-trust-item span {
              font-size: 9px !important;
            }

            .checkout-secure-text {
              font-size: 9px !important;
              margin-top: 15px !important;
            }

            /* MODAL */

            .checkout-modal-overlay {
              padding: 12px !important;
              align-items: center !important;
            }

            .checkout-modal {
              width: 100% !important;
              max-width: 100% !important;
              max-height: 94vh !important;
              padding: 19px !important;
              border-radius: 16px !important;
            }

            .checkout-modal-title {
              font-size: 20px !important;
            }

            .checkout-modal-subtitle {
              font-size: 11px !important;
              line-height: 1.5 !important;
            }

            .checkout-modal-header {
              margin-bottom: 18px !important;
            }

            .checkout-address-grid {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }

            .checkout-full-field {
              grid-column: auto !important;
            }

            .checkout-modal-input,
            .checkout-modal-textarea {
              font-size: 12px !important;
              padding: 11px !important;
            }

            .checkout-modal-textarea {
              min-height: 75px !important;
            }

            .checkout-save-address {
              margin-top: 18px !important;
              padding: 13px !important;
              font-size: 12px !important;
            }
          }

          /* =========================================
             VERY SMALL MOBILE
          ========================================= */

          @media (max-width: 400px) {
            .checkout-container {
              width:
                calc(100% - 18px) !important;
            }

            .checkout-page {
              padding-top: 22px !important;
            }

            .checkout-heading {
              font-size: 28px !important;
            }

            .checkout-subtitle {
              font-size: 12px !important;
            }

            .checkout-card {
              padding: 14px !important;
            }

            .checkout-summary {
              padding: 15px !important;
            }

            .checkout-item-image {
              width: 46px !important;
              height: 46px !important;
            }

            .checkout-item {
              gap: 8px !important;
            }

            .checkout-item-price {
              font-size: 12px !important;
            }

            .checkout-payment-option {
              padding: 11px !important;
            }

            .checkout-payment-icon {
              width: 31px !important;
              height: 31px !important;
            }

            .checkout-payment-title {
              font-size: 11px !important;
            }

            .checkout-payment-description {
              font-size: 9px !important;
            }

            .checkout-total-amount {
              font-size: 19px !important;
            }

            .checkout-modal {
              padding: 16px !important;
            }
          }
        `}
      </style>

      <main style={styles.page} className="checkout-page">
        <div
          style={styles.container}
          className="checkout-container"
        >
          {/* HEADER */}
          <div
            style={styles.header}
            className="checkout-header"
          >
            <div
              style={styles.brandBadge}
              className="checkout-brand"
            >
              🌿 AMRUTHAHARA
            </div>

            <h1
              style={styles.heading}
              className="checkout-heading"
            >
              Secure Checkout
            </h1>

            <p
              style={styles.subtitle}
              className="checkout-subtitle"
            >
              Complete your order and enjoy fresh
              products delivered to your doorstep.
            </p>
          </div>

          <div
            style={styles.layout}
            className="checkout-layout"
          >
            {/* LEFT */}
            <div>
              {/* ADDRESS */}
              <section
                style={styles.card}
                className="checkout-card"
              >
                <div
                  style={styles.sectionHeader}
                  className="checkout-section-header"
                >
                  <div
                    style={styles.sectionIcon}
                    className="checkout-section-icon"
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h2
                      style={styles.sectionTitle}
                      className="checkout-section-title"
                    >
                      Delivery Address
                    </h2>

                    <p
                      style={styles.sectionSubtitle}
                      className="checkout-section-subtitle"
                    >
                      Where should we deliver your
                      order?
                    </p>
                  </div>
                </div>

                <div
                  style={styles.address}
                  className="checkout-address"
                >
                  <div style={styles.addressTop}>
                    <strong
                      style={styles.customerName}
                      className="checkout-customer-name"
                    >
                      {address.name}
                    </strong>

                    <span style={styles.defaultBadge}>
                      DELIVERY
                    </span>
                  </div>

                  <p
                    style={styles.addressText}
                    className="checkout-address-text"
                  >
                    {address.addressLine}
                    <br />
                    {address.city}, {address.state}
                    <br />
                    {address.pincode}
                  </p>

                  <p
                    style={styles.phone}
                    className="checkout-phone"
                  >
                    Phone: {address.phone}
                  </p>
                </div>

                <button
                  type="button"
                  style={styles.changeButton}
                  className="checkout-change-button"
                  onClick={openAddressModal}
                >
                  <FaMapMarkerAlt />
                  Change Address
                </button>
              </section>

              {/* ORDER SUMMARY */}
              <section
                style={styles.card}
                className="checkout-card"
              >
                <div
                  style={styles.sectionHeader}
                  className="checkout-section-header"
                >
                  <div
                    style={styles.sectionIcon}
                    className="checkout-section-icon"
                  >
                    <FaTruck />
                  </div>

                  <div>
                    <h2
                      style={styles.sectionTitle}
                      className="checkout-section-title"
                    >
                      Order Summary
                    </h2>

                    <p
                      style={styles.sectionSubtitle}
                      className="checkout-section-subtitle"
                    >
                      {cartItems.length}{" "}
                      {cartItems.length === 1
                        ? "item"
                        : "items"}{" "}
                      in your order
                    </p>
                  </div>
                </div>

                <div style={styles.items}>
                  {cartItems.map((item, index) => (
                    <div
                      key={
                        item._id ||
                        item.id ||
                        index
                      }
                      style={styles.item}
                      className="checkout-item"
                    >
                      <div
                        style={styles.itemImage}
                        className="checkout-item-image"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={styles.productImage}
                          />
                        ) : (
                          <span>🌿</span>
                        )}
                      </div>

                      <div
                        style={styles.itemDetails}
                        className="checkout-item-details"
                      >
                        <strong
                          style={styles.itemName}
                          className="checkout-item-name"
                        >
                          {item.name}
                        </strong>

                        <span
                          style={styles.itemQuantity}
                          className="checkout-item-quantity"
                        >
                          ₹{item.price} ×{" "}
                          {item.quantity || 1}
                        </span>
                      </div>

                      <strong
                        style={styles.itemPrice}
                        className="checkout-item-price"
                      >
                        ₹
                        {Number(item.price || 0) *
                          Number(
                            item.quantity || 1
                          )}
                      </strong>
                    </div>
                  ))}
                </div>
              </section>

              {/* PAYMENT */}
              <section
                style={styles.card}
                className="checkout-card"
              >
                <div
                  style={styles.sectionHeader}
                  className="checkout-section-header"
                >
                  <div
                    style={styles.sectionIcon}
                    className="checkout-section-icon"
                  >
                    <FaCreditCard />
                  </div>

                  <div>
                    <h2
                      style={styles.sectionTitle}
                      className="checkout-section-title"
                    >
                      Payment Method
                    </h2>

                    <p
                      style={styles.sectionSubtitle}
                      className="checkout-section-subtitle"
                    >
                      Choose your preferred payment
                      option
                    </p>
                  </div>
                </div>

                {/* PHONEPE */}
                <label
                  style={{
                    ...styles.paymentOption,
                    ...(paymentMethod === "phonepe"
                      ? styles.selectedPayment
                      : {}),
                  }}
                  className="checkout-payment-option"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="phonepe"
                    checked={
                      paymentMethod ===
                      "phonepe"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "phonepe"
                      )
                    }
                    style={styles.radio}
                    className="checkout-radio"
                  />

                  <div
                    style={styles.phonePeIcon}
                    className="checkout-payment-icon"
                  >
                    <FaCreditCard />
                  </div>

                  <div
                    style={styles.paymentDetails}
                  >
                    <strong
                      style={styles.paymentTitle}
                      className="checkout-payment-title"
                    >
                      PhonePe
                    </strong>

                    <p
                      style={
                        styles.paymentDescription
                      }
                      className="checkout-payment-description"
                    >
                      Pay securely using PhonePe
                    </p>

                    <div
                      style={styles.paymentTags}
                      className="checkout-payment-tags"
                    >
                      <span
                        style={
                          styles.defaultBadge
                        }
                      >
                        UPI
                      </span>

                      <span
                        style={
                          styles.defaultBadge
                        }
                      >
                        Cards
                      </span>

                      <span
                        style={
                          styles.defaultBadge
                        }
                      >
                        Wallets
                      </span>
                    </div>
                  </div>

                  {paymentMethod ===
                    "phonepe" && (
                    <FaCheckCircle
                      style={styles.selectedIcon}
                      className="checkout-selected-icon"
                    />
                  )}
                </label>

                {paymentMethod === "phonepe" && (
                  <div
                    style={styles.payBox}
                    className="checkout-pay-box"
                  >
                    <PhonePeButton
                      amount={total}
                      customer={customer}
                      onSuccess={
                        handlePhonePeCreated
                      }
                      onError={
                        handlePhonePeError
                      }
                    />
                  </div>
                )}

                {/* COD */}
                <label
                  style={{
                    ...styles.paymentOption,
                    ...(paymentMethod === "cod"
                      ? styles.selectedPayment
                      : {}),
                  }}
                  className="checkout-payment-option"
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={() =>
                      setPaymentMethod("cod")
                    }
                    style={styles.radio}
                    className="checkout-radio"
                  />

                  <div
                    style={styles.paymentIcon}
                    className="checkout-payment-icon"
                  >
                    <FaMoneyBillWave />
                  </div>

                  <div
                    style={styles.paymentDetails}
                  >
                    <strong
                      style={styles.paymentTitle}
                      className="checkout-payment-title"
                    >
                      Cash on Delivery
                    </strong>

                    <p
                      style={
                        styles.paymentDescription
                      }
                      className="checkout-payment-description"
                    >
                      Pay when your order arrives
                    </p>
                  </div>

                  {paymentMethod === "cod" && (
                    <FaCheckCircle
                      style={styles.selectedIcon}
                      className="checkout-selected-icon"
                    />
                  )}
                </label>

                {paymentMethod === "cod" && (
                  <button
                    type="button"
                    onClick={handleCOD}
                    style={styles.codButton}
                    className="checkout-cod-button"
                  >
                    Place Order - ₹{total}
                  </button>
                )}
              </section>
            </div>

            {/* RIGHT SUMMARY */}
            <aside
              style={styles.summary}
              className="checkout-summary"
            >
              <h2
                style={styles.summaryTitle}
                className="checkout-summary-title"
              >
                Price Details
              </h2>

              <div
                style={styles.summaryRow}
                className="checkout-summary-row"
              >
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div
                style={styles.summaryRow}
                className="checkout-summary-row"
              >
                <span>Delivery</span>

                <span
                  style={{
                    color:
                      deliveryCharge === 0
                        ? "#398052"
                        : "#465249",
                    fontWeight: "700",
                  }}
                >
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </span>
              </div>

              <div
                style={styles.divider}
                className="checkout-divider"
              />

              <div
                style={styles.totalRow}
                className="checkout-total-row"
              >
                <span>Total Amount</span>

                <strong
                  style={styles.totalAmount}
                  className="checkout-total-amount"
                >
                  ₹{total}
                </strong>
              </div>

              <div
                style={styles.trustBox}
                className="checkout-trust-box"
              >
                <div
                  style={styles.trustItem}
                  className="checkout-trust-item"
                >
                  <FaShieldAlt
                    style={styles.trustIcon}
                    className="checkout-trust-icon"
                  />

                  <div>
                    <strong>
                      Secure Payment
                    </strong>

                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#849087",
                      }}
                    >
                      Your payment is protected
                    </span>
                  </div>
                </div>

                <div
                  style={styles.trustItem}
                  className="checkout-trust-item"
                >
                  <FaTruck
                    style={styles.trustIcon}
                    className="checkout-trust-icon"
                  />

                  <div>
                    <strong>
                      Reliable Delivery
                    </strong>

                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#849087",
                      }}
                    >
                      Fresh products at your
                      doorstep
                    </span>
                  </div>
                </div>

                <div
                  style={styles.trustItem}
                  className="checkout-trust-item"
                >
                  <FaCheckCircle
                    style={styles.trustIcon}
                    className="checkout-trust-icon"
                  />

                  <div>
                    <strong>
                      Quality Guaranteed
                    </strong>

                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#849087",
                      }}
                    >
                      Carefully selected products
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={styles.secureText}
                className="checkout-secure-text"
              >
                🔒 Safe & secure checkout
              </div>
            </aside>
          </div>
        </div>

        {/* ADDRESS MODAL */}
        {showAddressModal && (
          <div
            style={styles.modalOverlay}
            className="checkout-modal-overlay"
          >
            <div
              style={styles.modal}
              className="checkout-modal"
            >
              <div
                style={styles.modalHeader}
                className="checkout-modal-header"
              >
                <div>
                  <h2
                    style={styles.modalTitle}
                    className="checkout-modal-title"
                  >
                    Delivery Address
                  </h2>

                  <p
                    style={styles.modalSubtitle}
                    className="checkout-modal-subtitle"
                  >
                    Update where you'd like your
                    order delivered.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddressModal(false)
                  }
                  style={styles.closeButton}
                >
                  <FaTimes />
                </button>
              </div>

              <div
                style={styles.addressGrid}
                className="checkout-address-grid"
              >
                <div>
                  <label
                    style={styles.modalLabel}
                  >
                    Full Name
                  </label>

                  <input
                    style={styles.modalInput}
                    className="checkout-modal-input"
                    value={tempAddress.name}
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    style={styles.modalLabel}
                  >
                    Phone
                  </label>

                  <input
                    style={styles.modalInput}
                    className="checkout-modal-input"
                    value={tempAddress.phone}
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  style={styles.fullWidthField}
                  className="checkout-full-field"
                >
                  <label
                    style={styles.modalLabel}
                  >
                    Address
                  </label>

                  <textarea
                    style={styles.modalTextarea}
                    className="checkout-modal-textarea"
                    value={
                      tempAddress.addressLine
                    }
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        addressLine:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    style={styles.modalLabel}
                  >
                    City
                  </label>

                  <input
                    style={styles.modalInput}
                    className="checkout-modal-input"
                    value={tempAddress.city}
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        city: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    style={styles.modalLabel}
                  >
                    State
                  </label>

                  <input
                    style={styles.modalInput}
                    className="checkout-modal-input"
                    value={tempAddress.state}
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        state: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    style={styles.modalLabel}
                  >
                    Pincode
                  </label>

                  <input
                    style={styles.modalInput}
                    className="checkout-modal-input"
                    value={tempAddress.pincode}
                    onChange={(e) =>
                      setTempAddress({
                        ...tempAddress,
                        pincode:
                          e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="button"
                style={styles.saveAddressButton}
                className="checkout-save-address"
                onClick={saveAddress}
              >
                <FaPlus />
                Save Delivery Address
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 45%, #F5F8F3 100%)",
    padding: "55px 0 80px",
    boxSizing: "border-box",
  },

  container: {
    width: "92%",
    maxWidth: "1250px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  brandBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "30px",
    backgroundColor: "#E8F3E4",
    color: "#39764B",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "15px",
  },

  heading: {
    margin: 0,
    color: "#173F2A",
    fontSize: "clamp(34px, 5vw, 52px)",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  subtitle: {
    maxWidth: "600px",
    margin: "13px auto 0",
    color: "#778078",
    fontSize: "15px",
    lineHeight: "1.7",
  },

  layout: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) 350px",
    gap: "28px",
    alignItems: "start",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "18px",
    padding: "27px",
    marginBottom: "22px",
    border: "1px solid #E6ECE4",
    boxShadow:
      "0 8px 30px rgba(30,70,40,0.055)",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "22px",
  },

  sectionIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "11px",
    backgroundColor: "#EAF4E5",
    color: "#39764B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  sectionTitle: {
    margin: 0,
    color: "#263D2E",
    fontSize: "19px",
    fontWeight: "800",
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    color: "#8A928C",
    fontSize: "12px",
  },

  address: {
    backgroundColor: "#F7FAF6",
    border: "1px solid #E5ECE2",
    borderRadius: "12px",
    padding: "18px",
  },

  addressTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },

  customerName: {
    color: "#263D2E",
    fontSize: "15px",
  },

  defaultBadge: {
    backgroundColor: "#DDEED9",
    color: "#39764B",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "8px",
    fontWeight: "800",
  },

  addressText: {
    color: "#606A63",
    fontSize: "13px",
    lineHeight: "1.7",
    margin: "0 0 10px",
  },

  phone: {
    color: "#606A63",
    fontSize: "12px",
    margin: 0,
  },

  changeButton: {
    marginTop: "15px",
    padding: "10px 16px",
    border: "1px solid #39764B",
    backgroundColor: "#FFFFFF",
    color: "#39764B",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  items: {
    width: "100%",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 0",
    borderBottom:
      "1px solid #EDF0EC",
  },

  itemImage: {
    width: "58px",
    height: "58px",
    borderRadius: "10px",
    backgroundColor: "#F1F5EE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "27px",
    flexShrink: 0,
    overflow: "hidden",
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  itemDetails: {
    flex: 1,
    minWidth: 0,
  },

  itemName: {
    display: "block",
    color: "#2A4031",
    fontSize: "14px",
    marginBottom: "5px",
  },

  itemQuantity: {
    color: "#818A83",
    fontSize: "12px",
  },

  itemPrice: {
    color: "#175C38",
    fontSize: "15px",
    flexShrink: 0,
  },

  paymentOption: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "17px",
    border: "1px solid #DDE5DB",
    borderRadius: "12px",
    marginTop: "12px",
    cursor: "pointer",
  },

  selectedPayment: {
    border: "1.5px solid #39764B",
    backgroundColor: "#F6FAF4",
  },

  radio: {
    width: "17px",
    height: "17px",
    accentColor: "#39764B",
    flexShrink: 0,
  },

  paymentIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "9px",
    backgroundColor: "#EAF4E5",
    color: "#39764B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  phonePeIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "9px",
    backgroundColor: "#5F259F",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "16px",
    fontWeight: "900",
  },

  paymentDetails: {
    flex: 1,
    minWidth: 0,
  },

  paymentTitle: {
    color: "#2A4031",
    fontSize: "14px",
  },

  paymentDescription: {
    margin: "4px 0 7px",
    color: "#818A83",
    fontSize: "11px",
  },

  paymentTags: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
  },

  selectedIcon: {
    color: "#39764B",
    fontSize: "17px",
    flexShrink: 0,
  },

  payBox: {
    marginTop: "18px",
    padding: "17px",
    backgroundColor: "#F7FAF6",
    border: "1px solid #E5ECE2",
    borderRadius: "11px",
  },

  codButton: {
    width: "100%",
    marginTop: "18px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  },

  summary: {
    backgroundColor: "#FFFFFF",
    borderRadius: "18px",
    padding: "27px",
    border: "1px solid #E6ECE4",
    boxShadow:
      "0 10px 35px rgba(30,70,40,0.07)",
    position: "sticky",
    top: "100px",
  },

  summaryTitle: {
    margin: "0 0 25px",
    color: "#263D2E",
    fontSize: "21px",
    fontWeight: "800",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#68736C",
    fontSize: "14px",
    marginBottom: "15px",
    gap: "15px",
  },

  divider: {
    height: "1px",
    backgroundColor: "#E8ECE7",
    margin: "22px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#263D2E",
    fontSize: "15px",
    gap: "15px",
  },

  totalAmount: {
    color: "#175C38",
    fontSize: "25px",
    fontWeight: "800",
  },

  trustBox: {
    marginTop: "25px",
    paddingTop: "20px",
    borderTop: "1px solid #E8ECE7",
  },

  trustItem: {
    display: "flex",
    gap: "11px",
    alignItems: "center",
    marginBottom: "16px",
  },

  trustIcon: {
    color: "#4B845C",
    fontSize: "16px",
    flexShrink: 0,
  },

  secureText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#849087",
    fontSize: "10px",
  },

  emptyIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    backgroundColor: "#EAF4E5",
    color: "#39764B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  emptyTitle: {
    margin: "0 0 10px",
    color: "#263D2E",
    fontSize: "25px",
    fontWeight: "800",
  },

  emptyText: {
    color: "#7A847D",
    fontSize: "14px",
    lineHeight: "1.7",
    marginBottom: "25px",
  },

  shopButton: {
    border: "none",
    borderRadius: "10px",
    padding: "13px 25px",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(18, 42, 27, 0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 5000,
  },

  modal: {
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "30px",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.20)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "25px",
  },

  modalTitle: {
    margin: 0,
    color: "#23432e",
    fontSize: "24px",
    fontWeight: "800",
  },

  modalSubtitle: {
    color: "#7B867E",
    fontSize: "13px",
    marginTop: "6px",
    marginBottom: 0,
  },

  closeButton: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: "#F2F5F1",
    color: "#45604D",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  addressGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  fullWidthField: {
    gridColumn: "1 / -1",
  },

  modalLabel: {
    display: "block",
    color: "#3A4D40",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  modalInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #DCE6DE",
    borderRadius: "9px",
    outline: "none",
    fontSize: "13px",
  },

  modalTextarea: {
    width: "100%",
    minHeight: "85px",
    boxSizing: "border-box",
    padding: "12px 13px",
    border: "1px solid #DCE6DE",
    borderRadius: "9px",
    outline: "none",
    resize: "vertical",
    fontSize: "13px",
    fontFamily: "inherit",
  },

  saveAddressButton: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #175C38, #2F7A4B)",
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

export default Checkout;