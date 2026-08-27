import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PhonePeButton from "../../components/payment/PhonepeButton";
// import RazorpayButton from "../../components/payment/RazorpayButton"; // Uncomment if needed

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
  FaLeaf,
} from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ==========================================
  // ADDRESS
  // ==========================================
  const [address, setAddress] = useState({
    name: user?.name || "Amruthahara Customer",
    phone: user?.phone || "9999999999",
    addressLine: "12-34, Amruthahara Street",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
  });

  const [tempAddress, setTempAddress] = useState(address);

  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  // ==========================================
  // CUSTOMER
  // ==========================================
  const customer = {
    name: address.name,
    email: user?.email || "customer@example.com",
    phone: address.phone,
  };

  // ==========================================
  // MODAL & ADDRESS HANDLERS
  // ==========================================
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

  // ==========================================
  // CREATE ORDER OBJECT
  // ==========================================
  const createOrderObject = ({ orderId, paymentMethod, paymentStatus }) => {
    return {
      id: orderId || "AMR" + Date.now().toString().slice(-8),
      userId: user?._id || user?.id || user?.email || "guest",
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
          description: "Your order has been successfully placed.",
          completed: true,
          date: new Date().toISOString(),
        },
        {
          title: "Order Confirmed",
          description: "Your order will be confirmed shortly.",
          completed: false,
          date: null,
        },
        {
          title: "Preparing",
          description: "Our team will prepare your fresh products.",
          completed: false,
          date: null,
        },
        {
          title: "Out for Delivery",
          description: "Your order will be handed over to our delivery partner.",
          completed: false,
          date: null,
        },
        {
          title: "Delivered",
          description: "Your order will be delivered to your doorstep.",
          completed: false,
          date: null,
        },
      ],
    };
  };

  // ==========================================
  // SAVE ORDER
  // ==========================================
  const saveOrder = (newOrder) => {
    const existingOrders =
      JSON.parse(localStorage.getItem("amruthahara_orders")) || [];

    existingOrders.unshift(newOrder);
    localStorage.setItem("amruthahara_orders", JSON.stringify(existingOrders));
    localStorage.setItem("amruthahara_latest_order", JSON.stringify(newOrder));

    if (typeof clearCart === "function") {
      clearCart();
    } else {
      localStorage.removeItem("amruthahara_cart");
    }
  };

  // ==========================================
  // COD HANDLER
  // ==========================================
  const handleCOD = () => {
    if (paymentMethod !== "cod") {
      alert("Please select Cash on Delivery.");
      return;
    }

    const orderId = "AMR" + Date.now().toString().slice(-8);
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

  // ==========================================
  // PHONEPE HANDLERS
  // ==========================================
  const handlePhonePeCreated = (phonePeData) => {
    console.log("PhonePe order created:", phonePeData);
  };

  const handlePhonePeError = (error) => {
    console.error("PhonePe error:", error);
  };

  // ==========================================
  // EMPTY CART VIEW
  // ==========================================
  if (!cartItems || cartItems.length === 0) {
    return (
      <main style={styles.emptyPage}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>
            <FaShoppingCart />
          </div>
          <h1 style={styles.emptyTitle}>Your Cart is Empty</h1>
          <p style={styles.emptyText}>
            Add some fresh Amruthahara products to your cart before proceeding to checkout.
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
    );
  }

  // ==========================================
  // MAIN CHECKOUT VIEW
  // ==========================================
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.brandBadge}>🌿 AMRUTHAHARA</div>
          <h1 style={styles.heading}>Secure Checkout</h1>
          <p style={styles.subtitle}>
            Complete your order and enjoy fresh products delivered to your doorstep.
          </p>
        </div>

        <div style={styles.layout}>
          {/* LEFT SIDE */}
          <div>
            {/* ADDRESS SECTION */}
            <section style={styles.card}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>Delivery Address</h2>
                  <p style={styles.sectionSubtitle}>Where should we deliver your order?</p>
                </div>
              </div>

              <div style={styles.address}>
                <div style={styles.addressTop}>
                  <strong style={styles.customerName}>{address.name}</strong>
                  <span style={styles.defaultBadge}>DELIVERY</span>
                </div>
                <p style={styles.addressText}>
                  {address.addressLine}
                  <br />
                  {address.city}, {address.state}
                  <br />
                  {address.pincode}
                </p>
                <p style={styles.phone}>Phone: {address.phone}</p>
              </div>

              <button
                type="button"
                style={styles.changeButton}
                onClick={openAddressModal}
              >
                <FaMapMarkerAlt /> Change Address
              </button>
            </section>

            {/* ORDER ITEMS SECTION */}
            <section style={styles.card}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                  <FaTruck />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>Order Summary</h2>
                  <p style={styles.sectionSubtitle}>
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your order
                  </p>
                </div>
              </div>

              <div style={styles.items}>
                {cartItems.map((item, index) => (
                  <div key={item._id || item.id || index} style={styles.item}>
                    <div style={styles.itemImage}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={styles.productImage} />
                      ) : (
                        <span>🌿</span>
                      )}
                    </div>

                    <div style={styles.itemDetails}>
                      <strong style={styles.itemName}>{item.name}</strong>
                      <span style={styles.itemQuantity}>
                        ₹{item.price} × {item.quantity || 1}
                      </span>
                    </div>

                    <strong style={styles.itemPrice}>
                      ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                    </strong>
                  </div>
                ))}
              </div>
            </section>

            {/* PAYMENT METHOD SECTION */}
            <section style={styles.card}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                  <FaCreditCard />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>Payment Method</h2>
                  <p style={styles.sectionSubtitle}>Choose your preferred payment option</p>
                </div>
              </div>

              {/* PHONEPE OPTION */}
              <label
                style={{
                  ...styles.paymentOption,
                  ...(paymentMethod === "phonepe" ? styles.selectedPayment : {}),
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="phonepe"
                  checked={paymentMethod === "phonepe"}
                  onChange={() => setPaymentMethod("phonepe")}
                  style={styles.radio}
                />
                <div style={styles.phonePeIcon}>
                  <FaCreditCard />
                </div>
                <div style={styles.paymentDetails}>
                  <strong style={styles.paymentTitle}>PhonePe</strong>
                  <p style={styles.paymentDescription}>Pay securely using PhonePe</p>
                  <div style={styles.paymentTags}>
                    <span style={styles.defaultBadge}>UPI</span>
                    <span style={styles.defaultBadge}>Cards</span>
                    <span style={styles.defaultBadge}>Wallets</span>
                  </div>
                </div>
                {paymentMethod === "phonepe" && <FaCheckCircle style={styles.selectedIcon} />}
              </label>

              {paymentMethod === "phonepe" && (
                <div style={styles.payBox}>
                  <PhonePeButton
                    amount={total}
                    customer={customer}
                    onSuccess={handlePhonePeCreated}
                    onError={handlePhonePeError}
                  />
                </div>
              )}

              {/* COD OPTION */}
              <label
                style={{
                  ...styles.paymentOption,
                  ...(paymentMethod === "cod" ? styles.selectedPayment : {}),
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  style={styles.radio}
                />
                <div style={styles.paymentIcon}>
                  <FaMoneyBillWave />
                </div>
                <div style={styles.paymentDetails}>
                  <strong style={styles.paymentTitle}>Cash on Delivery</strong>
                  <p style={styles.paymentDescription}>Pay when your order arrives</p>
                </div>
                {paymentMethod === "cod" && <FaCheckCircle style={styles.selectedIcon} />}
              </label>

              {paymentMethod === "cod" && (
                <button type="button" onClick={handleCOD} style={styles.codButton}>
                  Place Order - ₹{total}
                </button>
              )}
            </section>
          </div>

          {/* RIGHT SIDE (SUMMARY) */}
          <aside style={styles.summary}>
            <h2 style={styles.summaryTitle}>Price Details</h2>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Delivery</span>
              <span style={{ color: deliveryCharge === 0 ? "#398052" : "#465249", fontWeight: "700" }}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span>Total Amount</span>
              <strong style={styles.totalAmount}>₹{total}</strong>
            </div>

            <div style={styles.trustBox}>
              <div style={styles.trustItem}>
                <FaShieldAlt style={styles.trustIcon} />
                <div>
                  <strong>Secure Payment</strong>
                  <span style={{ display: "block", fontSize: "11px", color: "#849087" }}>
                    Your payment is protected
                  </span>
                </div>
              </div>
              <div style={styles.trustItem}>
                <FaTruck style={styles.trustIcon} />
                <div>
                  <strong>Reliable Delivery</strong>
                  <span style={{ display: "block", fontSize: "11px", color: "#849087" }}>
                    Fresh products at your doorstep
                  </span>
                </div>
              </div>
              <div style={styles.trustItem}>
                <FaCheckCircle style={styles.trustIcon} />
                <div>
                  <strong>Quality Guaranteed</strong>
                  <span style={{ display: "block", fontSize: "11px", color: "#849087" }}>
                    Carefully selected products
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.secureText}>🔒 Safe & secure checkout</div>
          </aside>
        </div>
      </div>

      {/* ==========================================
          ADDRESS MODAL
      ========================================== */}
      {showAddressModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Delivery Address</h2>
                <p style={styles.modalSubtitle}>Update where you'd like your order delivered.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                style={styles.closeButton}
              >
                <FaTimes />
              </button>
            </div>

            <div style={styles.addressGrid}>
              <div>
                <label style={styles.modalLabel}>Full Name</label>
                <input
                  style={styles.modalInput}
                  value={tempAddress.name}
                  onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
                />
              </div>

              <div>
                <label style={styles.modalLabel}>Phone</label>
                <input
                  style={styles.modalInput}
                  value={tempAddress.phone}
                  onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
                />
              </div>

              <div style={styles.fullWidthField}>
                <label style={styles.modalLabel}>Address</label>
                <textarea
                  style={styles.modalTextarea}
                  value={tempAddress.addressLine}
                  onChange={(e) => setTempAddress({ ...tempAddress, addressLine: e.target.value })}
                />
              </div>

              <div>
                <label style={styles.modalLabel}>City</label>
                <input
                  style={styles.modalInput}
                  value={tempAddress.city}
                  onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                />
              </div>

              <div>
                <label style={styles.modalLabel}>State</label>
                <input
                  style={styles.modalInput}
                  value={tempAddress.state}
                  onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                />
              </div>

              <div>
                <label style={styles.modalLabel}>Pincode</label>
                <input
                  style={styles.modalInput}
                  value={tempAddress.pincode}
                  onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })}
                />
              </div>
            </div>

            <button type="button" style={styles.saveAddressButton} onClick={saveAddress}>
              <FaPlus /> Save Delivery Address
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 45%, #F5F8F3 100%)",
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
    background: "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 100%)",
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
    boxShadow: "0 30px 80px rgba(0,0,0,0.20)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    background: "linear-gradient(135deg, #175C38, #2F7A4B)",
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