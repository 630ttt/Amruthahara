import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "../../components/payment/RazorpayButton";
import { useCart } from "../../context/CartContext";

import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaShoppingCart,
} from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();

  // Get the actual cart from CartContext
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");

  // Calculate subtotal from actual cart items
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  // Free delivery above ₹500
  const deliveryCharge = subtotal >= 500 ? 0 : 40;

  const total = subtotal + deliveryCharge;

  const customer = {
    name: "Amruthahara Customer",
    email: "customer@example.com",
    phone: "9999999999",
  };

  const handleCOD = () => {
    alert("Cash on Delivery selected!");

    navigate("/order-success");
  };

  // Empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <main style={styles.emptyPage}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>
            <FaShoppingCart />
          </div>

          <h1 style={styles.emptyTitle}>
            Your Cart is Empty
          </h1>

          <p style={styles.emptyText}>
            Add some fresh Amruthahara products to your cart
            before proceeding to checkout.
          </p>

          <button
            type="button"
            style={styles.shopButton}
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>
          <div style={styles.brandBadge}>
            🌿 AMRUTHAHARA
          </div>

          <h1 style={styles.heading}>
            Secure Checkout
          </h1>

          <p style={styles.subtitle}>
            Complete your order and enjoy fresh products
            delivered to your doorstep.
          </p>
        </div>


        {/* CHECKOUT LAYOUT */}

        <div style={styles.layout}>

          {/* LEFT SIDE */}

          <div>

            {/* DELIVERY ADDRESS */}

            <section style={styles.card}>

              <div style={styles.sectionHeader}>

                <div style={styles.sectionIcon}>
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 style={styles.sectionTitle}>
                    Delivery Address
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Where should we deliver your order?
                  </p>
                </div>

              </div>


              <div style={styles.address}>

                <div style={styles.addressTop}>

                  <strong style={styles.customerName}>
                    {customer.name}
                  </strong>

                  <span style={styles.defaultBadge}>
                    DEFAULT
                  </span>

                </div>

                <p style={styles.addressText}>
                  12-34, Amruthahara Street,
                  <br />
                  Hyderabad, Telangana
                  <br />
                  500001
                </p>

                <p style={styles.phone}>
                  Phone: {customer.phone}
                </p>

              </div>


              <button
                type="button"
                style={styles.changeButton}
              >
                Change Address
              </button>

            </section>


            {/* ORDER ITEMS */}

            <section style={styles.card}>

              <div style={styles.sectionHeader}>

                <div style={styles.sectionIcon}>
                  <FaTruck />
                </div>

                <div>
                  <h2 style={styles.sectionTitle}>
                    Order Summary
                  </h2>

                  <p style={styles.sectionSubtitle}>
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
                    key={item._id || item.id || index}
                    style={styles.item}
                  >

                    {/* PRODUCT IMAGE */}

                    <div style={styles.itemImage}>

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


                    {/* PRODUCT DETAILS */}

                    <div style={styles.itemDetails}>

                      <strong style={styles.itemName}>
                        {item.name}
                      </strong>

                      <span style={styles.itemQuantity}>
                        ₹{item.price} ×{" "}
                        {item.quantity || 1}
                      </span>

                    </div>


                    {/* ITEM TOTAL */}

                    <strong style={styles.itemPrice}>
                      ₹
                      {Number(item.price || 0) *
                        Number(item.quantity || 1)}
                    </strong>

                  </div>

                ))}

              </div>

            </section>


            {/* PAYMENT */}

            <section style={styles.card}>

              <div style={styles.sectionHeader}>

                <div style={styles.sectionIcon}>
                  <FaCreditCard />
                </div>

                <div>
                  <h2 style={styles.sectionTitle}>
                    Payment Method
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Choose your preferred payment option
                  </p>
                </div>

              </div>


              {/* RAZORPAY */}

              <label
                style={{
                  ...styles.paymentOption,
                  ...(paymentMethod === "razorpay"
                    ? styles.selectedPayment
                    : {}),
                }}
              >

                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() =>
                    setPaymentMethod("razorpay")
                  }
                  style={styles.radio}
                />

                <div style={styles.paymentIcon}>
                  <FaCreditCard />
                </div>

                <div style={styles.paymentDetails}>

                  <strong style={styles.paymentTitle}>
                    Online Payment
                  </strong>

                  <p style={styles.paymentDescription}>
                    UPI, Cards, Net Banking & Wallets
                  </p>

                  <div style={styles.paymentTags}>
                    <span>UPI</span>
                    <span>Cards</span>
                    <span>Wallets</span>
                  </div>

                </div>

                {paymentMethod === "razorpay" && (
                  <FaCheckCircle
                    style={styles.selectedIcon}
                  />
                )}

              </label>


              {/* RAZORPAY BUTTON */}

              {paymentMethod === "razorpay" && (

                <div style={styles.payBox}>

                  <RazorpayButton
                    amount={total}
                    customer={customer}
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
              >

                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() =>
                    setPaymentMethod("cod")
                  }
                  style={styles.radio}
                />

                <div style={styles.paymentIcon}>
                  <FaMoneyBillWave />
                </div>

                <div style={styles.paymentDetails}>

                  <strong style={styles.paymentTitle}>
                    Cash on Delivery
                  </strong>

                  <p style={styles.paymentDescription}>
                    Pay when your order arrives
                  </p>

                </div>

                {paymentMethod === "cod" && (
                  <FaCheckCircle
                    style={styles.selectedIcon}
                  />
                )}

              </label>


              {/* COD BUTTON */}

              {paymentMethod === "cod" && (

                <button
                  type="button"
                  onClick={handleCOD}
                  style={styles.codButton}
                >
                  Place Order - ₹{total}
                </button>

              )}

            </section>

          </div>


          {/* RIGHT SIDE — PRICE SUMMARY */}

          <aside style={styles.summary}>

            <h2 style={styles.summaryTitle}>
              Price Details
            </h2>


            <div style={styles.summaryRow}>

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>


            <div style={styles.summaryRow}>

              <span>
                Delivery
              </span>

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


            <div style={styles.divider}></div>


            <div style={styles.totalRow}>

              <span>
                Total Amount
              </span>

              <strong style={styles.totalAmount}>
                ₹{total}
              </strong>

            </div>


            {/* TRUST */}

            <div style={styles.trustBox}>

              <div style={styles.trustItem}>

                <FaShieldAlt
                  style={styles.trustIcon}
                />

                <div>
                  <strong>
                    Secure Payment
                  </strong>

                  <span>
                    Your payment is protected
                  </span>
                </div>

              </div>


              <div style={styles.trustItem}>

                <FaTruck
                  style={styles.trustIcon}
                />

                <div>
                  <strong>
                    Reliable Delivery
                  </strong>

                  <span>
                    Fresh products at your doorstep
                  </span>
                </div>

              </div>


              <div style={styles.trustItem}>

                <FaCheckCircle
                  style={styles.trustIcon}
                />

                <div>
                  <strong>
                    Quality Guaranteed
                  </strong>

                  <span>
                    Carefully selected products
                  </span>
                </div>

              </div>

            </div>


            <div style={styles.secureText}>
              🔒 Safe & secure checkout
            </div>

          </aside>

        </div>

      </div>
    </main>
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
    gridTemplateColumns: "minmax(0, 1fr) 350px",
    gap: "28px",
    alignItems: "start",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "18px",
    padding: "27px",
    marginBottom: "22px",
    border: "1px solid #E6ECE4",
    boxShadow: "0 8px 30px rgba(30,70,40,0.055)",
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
    padding: "9px 16px",
    border: "1px solid #39764B",
    backgroundColor: "#FFFFFF",
    color: "#39764B",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
  },

  items: {
    width: "100%",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 0",
    borderBottom: "1px solid #EDF0EC",
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
    transition: "all 0.2s ease",
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

  paymentDetails: {
    flex: 1,
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
  },

  selectedIcon: {
    color: "#39764B",
    fontSize: "17px",
  },

  payBox: {
    marginTop: "18px",
    padding: "17px",
    backgroundColor: "#F7FAF6",
    borderRadius: "11px",
    border: "1px solid #E5ECE2",
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
    boxShadow: "0 10px 35px rgba(30,70,40,0.07)",
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
  },

  trustItemStrong: {
    display: "block",
    color: "#3D4C42",
    fontSize: "11px",
    marginBottom: "3px",
  },

  trustItemSpan: {
    display: "block",
    color: "#89918B",
    fontSize: "10px",
  },

  secureText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#849087",
    fontSize: "10px",
  },

  emptyPage: {
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background:
      "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 100%)",
  },

  emptyCard: {
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    padding: "50px 30px",
    borderRadius: "20px",
    border: "1px solid #E6ECE4",
    boxShadow: "0 10px 35px rgba(30,70,40,0.07)",
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

};

export default Checkout;