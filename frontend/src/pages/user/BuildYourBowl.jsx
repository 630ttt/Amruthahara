import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { useCart } from "../../context/CartContext";
import { API_BASE_URL } from "../../services/apiBase";
import { formatRupees } from "../../utils/bowlOrder";

export default function BuildYourBowl() {
  const navigate = useNavigate();
  const { checkoutBowl } = useCart();
  const [inventory, setInventory] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET BOWL PRODUCTS
  // =========================
  useEffect(() => {
    fetchBowlProducts();
  }, []);

  const fetchBowlProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      const bowlProducts = (data.products || []).filter(
        (product) =>
          product.availableInBowl === true && product.bowlCategory
      );

      setInventory(bowlProducts);
    } catch (err) {
      console.error("Fetch Bowl Products Error:", err);
      setError("Unable to load bowl products.");
    } finally {
      setLoading(false);
    }
  };

  const getItemId = (item) => String(item?._id || item?.id || "");

  const getItemPrice = (item) => {
    const inventoryPrice = Number(item.inventoryPrice);
    const productPrice = Number(item.price);

    return inventoryPrice > 0 ? inventoryPrice : productPrice || 0;
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (id, delta) => {
    const itemId = String(id);

    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, Math.min(99, current + delta));

      const updated = { ...prev };

      if (next === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }

      return updated;
    });
  };

  const setItemQuantity = (id, value) => {
    const itemId = String(id);
    const next = Math.max(0, Math.min(99, Number(value) || 0));

    setQuantities((prev) => {
      const updated = { ...prev };

      if (next === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }

      return updated;
    });
  };

  // =========================
  // CALCULATED VALUES
  // =========================
  const selectedItems = inventory.filter(
    (item) => quantities[getItemId(item)] > 0
  );

  const totalItemsCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const totalPrice = selectedItems.reduce((total, item) => {
    return total + getItemPrice(item) * quantities[getItemId(item)];
  }, 0);

  const categories = [
    "All",
    ...new Set(
      inventory
        .map((item) => item.bowlCategory)
        .filter((category) => category)
    ),
  ];

  const filteredInventory =
    selectedCategory === "All"
      ? inventory
      : inventory.filter(
          (item) => item.bowlCategory === selectedCategory
        );

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please add at least one item to your bowl.");
      return;
    }

    const ingredients = selectedItems.map((item) => {
      const itemId = getItemId(item);
      const quantity = quantities[itemId];
      const price = getItemPrice(item);

      return {
        productId: item._id || item.id,
        name: item.name,
        quantity,
        price,
        image:
          item.images?.[0] ||
          item.image ||
          "",
        category: item.bowlCategory || "",
      };
    });

    const bowlImage =
      ingredients.find((item) => item.image)?.image ||
      "/placeholder.png";

    checkoutBowl({
      _id: `bowl-${Date.now()}`,
      id: `bowl-${Date.now()}`,
      name: "Custom Bowl",
      category: "Bowl",
      isBowl: true,
      price: totalPrice,
      quantity: 1,
      image: bowlImage,
      images: [bowlImage],
      bowlIngredients: ingredients,
      description: ingredients
        .map((item) => `${item.name} × ${item.quantity}`)
        .join(", "),
    });

    navigate("/checkout");
  };

  return (
    <div className="cb-wrapper">
      {/* GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Be+Vietnam+Pro:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popIn {
          0% {
            transform: scale(0.92);
            opacity: 0;
          }

          70% {
            transform: scale(1.03);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(171, 53, 0, 0.4);
          }

          70% {
            box-shadow: 0 0 0 12px rgba(171, 53, 0, 0);
          }

          100% {
            box-shadow: 0 0 0 0 rgba(171, 53, 0, 0);
          }
        }

        /* =========================
           PAGE WRAPPER
        ========================= */

        .cb-wrapper {
          width: 100%;
          min-height: 100vh;
          background-color: #f9f9f9;
          color: #1a1c1c;
          font-family: "Be Vietnam Pro", sans-serif;
          box-sizing: border-box;
        }

        .cb-wrapper * {
          box-sizing: border-box;
        }

        /* =========================
           MAIN BOWL LAYOUT
        ========================= */

        .cb-layout {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px 80px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: stretch;
        }

        @media (min-width: 1024px) {
          .cb-layout {
            flex-direction: row-reverse;
            align-items: flex-start;
          }
        }

        /* =========================
           SIDEBAR / CURRENT BOWL
        ========================= */

        .cb-sidebar {
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
          border: 1px solid #e1bfb5;
          border-radius: 16px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          flex-shrink: 0;

          animation: slideInLeft
            0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;

          transition: box-shadow 0.3s ease;
        }

        .cb-sidebar:hover {
          box-shadow: 0 15px 35px -5px rgba(12, 161, 27, 0.12);
        }

        @media (min-width: 1024px) {
          .cb-sidebar {
            width: 380px;

            /*
              IMPORTANT:
              Sidebar no longer has 100vh height.
              This allows the footer to naturally
              appear after the entire bowl section.
            */
            height: auto;

            position: sticky;
            top: 100px;

            max-height: calc(100vh - 120px);
          }
        }

        /* =========================
           SIDEBAR HEADER
        ========================= */

        .cb-sidebar-header {
          padding: 24px;
          background-color: #f3f3f3;
          border-bottom: 1px solid #e1bfb5;
        }

        .cb-sidebar-title {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 22px;
          font-weight: 700;
          line-height: 28px;
          color: #1a1c1c;
          margin-bottom: 6px;
        }

        .cb-sidebar-meta {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          color: #594139;
        }

        /* =========================
           SIDEBAR CONTENT
        ========================= */

        .cb-sidebar-content {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }

        /* =========================
           MAIN SECTION
        ========================= */

        .cb-main {
          flex: 1;
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;

          animation: slideInRight
            0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* =========================
           MAIN HEADER
        ========================= */

        .cb-main-header {
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 1px solid #e2e2e2;
          padding-bottom: 16px;
        }

        .cb-main-title {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 32px;
          font-weight: 800;
          line-height: 40px;
          margin-bottom: 4px;
          color: #1a1c1c;
        }

        .cb-main-subtitle {
          font-size: 15px;
          color: #594139;
        }

        /* =========================
           CATEGORIES
        ========================= */

        .cb-categories {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .cb-chip {
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          border: 1px solid #e2e2e2;
          cursor: pointer;
          background-color: #eeeeee;
          color: #1a1c1c;

          transition:
            all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cb-chip:hover {
          transform: translateY(-2px);
          background-color: #e2e2e2;
        }

        .cb-chip.active {
          background: linear-gradient(
            135deg,
            #173f2a 0%,
            #173f2a 100%
          );

          color: #ffffff;
          border-color: transparent;
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(15, 162, 25, 0.3);
        }

        /* =========================
           INVENTORY CARD
        ========================= */

        .cb-inventory-card {
          width: 100%;
          border: 1px solid #e2e2e2;
          border-radius: 16px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

          transition: box-shadow 0.3s ease;
        }

        .cb-inventory-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        /* =========================
           TABLE
        ========================= */

        .cb-table {
          width: 100%;
          text-align: left;
          border-collapse: collapse;
        }

        .cb-table th {
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 700;
          color: #594139;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cb-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #e2e2e2;
          transition: background-color 0.2s ease;
        }

        .cb-table tbody tr {
          transition:
            transform 0.2s ease,
            background-color 0.2s ease;
        }

        .cb-table tbody tr:hover {
          background-color: #fafafa;
          transform: scale(1.005);
        }

        /* =========================
           PRODUCT
        ========================= */

        .cb-product-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cb-product-img-wrapper {
          width: 48px;
          height: 48px;
          background-color: #e2e2e2;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid #e2e2e2;

          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cb-table tbody tr:hover
          .cb-product-img-wrapper {
          transform: scale(1.1) rotate(3deg);
        }

        .cb-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cb-product-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a1c1c;

          transition: color 0.2s ease;
        }

        .cb-product-name.active {
          color: #ab3500;
        }

        /* =========================
           QUANTITY CONTROLS
        ========================= */

        .cb-qty-control {
          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #8d7168;
          border-radius: 8px;
          background-color: #ffffff;
          overflow: hidden;

          transition:
            all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cb-qty-control.active {
          border-color: #ab3500;
          box-shadow: 0 0 0 3px rgba(171, 53, 0, 0.15);
        }

        .cb-qty-btn {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;
          background: transparent;
          color: #1a1c1c;
          cursor: pointer;

          transition:
            background-color 0.2s ease,
            transform 0.1s ease;
        }

        .cb-qty-btn:hover {
          background-color: #f0f0f0;
        }

        .cb-qty-btn:active {
          transform: scale(0.85);
        }

        .cb-qty-value {
          font-size: 14px;
          width: 32px;
          text-align: center;

          border-left: 1px solid #8d7168;
          border-right: 1px solid #8d7168;

          transition: all 0.2s ease;
        }

        .cb-qty-value.active {
          border-color: #ab3500;
          font-weight: 700;
          color: #ab3500;

          animation: popIn 0.2s ease-out;
        }

        .cb-qty-value::-webkit-outer-spin-button,
        .cb-qty-value::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .cb-qty-value[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }

        /* =========================
           SIDEBAR FOOTER
        ========================= */

        .cb-sidebar-footer {
          padding: 24px;
          background-color: #f3f3f3;
          border-top: 1px solid #e1bfb5;
          margin-top: auto;
        }

        .cb-subtotal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 12px;

          font-size: 14px;
          font-weight: 600;
          color: #594139;
        }

        .cb-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 20px;

          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1a1c1c;
        }

        /* =========================
           CHECKOUT BUTTON
        ========================= */

        .cb-btn-checkout {
          width: 100%;

          background: linear-gradient(
            135deg,
            #173f2a 0%,
            #173f2a 100%
          );

          color: #ffffff;

          padding: 14px 0;

          border: none;
          border-radius: 10px;

          font-weight: 700;
          font-size: 14px;

          text-transform: uppercase;
          letter-spacing: 0.05em;

          cursor: pointer;

          box-shadow: 0 4px 15px rgba(0, 171, 74, 0.25);

          transition:
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.25s ease;
        }

        .cb-btn-checkout:hover {
          transform: translateY(-2px) scale(1.01);

          box-shadow: 0 8px 25px rgba(171, 53, 0, 0.4);

          animation: pulseGlow 1.5s infinite;
        }

        .cb-btn-checkout:active {
          transform: translateY(1px) scale(0.98);
        }

        /* =========================
           STATES
        ========================= */

        .cb-message {
          padding: 50px 20px;
          text-align: center;
          color: #594139;
          font-size: 15px;
        }

        .cb-error {
          color: #b42318;
        }

        /* =========================
           FOOTER
        ========================= */

        .cb-footer-wrapper {
          width: 100%;
          display: block;
          clear: both;
          margin: 0;
          padding: 0;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1023px) {
          .cb-layout {
            padding: 30px 40px;
          }

          .cb-sidebar {
            position: static;
            max-height: none;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {
          .cb-layout {
            padding: 25px 20px;
            gap: 25px;
          }

          .cb-hide-mobile {
            display: none;
          }

          .cb-main-header {
            align-items: flex-start;
          }

          .cb-main-title {
            font-size: 26px;
            line-height: 34px;
          }

          .cb-main-subtitle {
            font-size: 14px;
          }

          .cb-table th,
          .cb-table td {
            padding: 12px;
          }

          .cb-product-info {
            gap: 10px;
          }

          .cb-product-name {
            font-size: 13px;
          }

          .cb-product-img-wrapper {
            width: 42px;
            height: 42px;
          }

          .cb-qty-btn {
            width: 30px;
            height: 30px;
          }

          .cb-qty-value {
            width: 30px;
          }

          .cb-sidebar-title {
            font-size: 20px;
          }

          .cb-total-row {
            font-size: 22px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {
          .cb-layout {
            padding: 20px 12px;
          }

          .cb-sidebar-header {
            padding: 18px;
          }

          .cb-sidebar-footer {
            padding: 18px;
          }

          .cb-main-title {
            font-size: 23px;
          }

          .cb-table th {
            font-size: 10px;
          }

          .cb-table td {
            padding: 10px 8px;
          }

          .cb-product-img-wrapper {
            width: 38px;
            height: 38px;
          }

          .cb-product-name {
            font-size: 12px;
          }
        }
      `}</style>

      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar />

      {/* =====================================================
          BOWL CONTENT ONLY
          
          IMPORTANT:
          Footer is NOT inside this div.
      ===================================================== */}
      <div className="cb-layout">

        {/* =========================
            CURRENT BOWL SIDEBAR
        ========================= */}
        <aside className="cb-sidebar">

          {/* SIDEBAR HEADER */}
          <div className="cb-sidebar-header">
            <h2 className="cb-sidebar-title">
              Current Bowl
            </h2>

            <div className="cb-sidebar-meta">
              <span>
                Items: {totalItemsCount}
              </span>

              <span>
                Total: {formatRupees(totalPrice)}
              </span>
            </div>
          </div>

          {/* SIDEBAR CONTENT */}
          <div className="cb-sidebar-content">

            <table className="cb-table">
              <thead
                style={{
                  backgroundColor: "#ffffff",
                  position: "sticky",
                  top: 0,
                  borderBottom: "1px solid #e2e2e2",
                  zIndex: 10,
                }}
              >
                <tr>
                  <th>Item</th>

                  <th
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Qty
                  </th>

                  <th
                    style={{
                      textAlign: "right",
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {selectedItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        color: "#594139",
                        padding: "40px 0",
                        fontSize: "14px",
                      }}
                    >
                      Your bowl is Empty.
                    </td>
                  </tr>
                ) : (
                  selectedItems.map((item) => {
                    const itemId = getItemId(item);
                    const price = getItemPrice(item);

                    return (
                      <tr key={itemId}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#1a1c1c",
                              }}
                            >
                              {item.name}
                            </span>

                            <span
                              style={{
                                fontSize: "12px",
                                color: "#594139",
                              }}
                            >
                              {item.inventoryDetails ||
                                "Bowl item"}
                            </span>
                          </div>
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {quantities[itemId]}
                        </td>

                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#1a1c1c",
                          }}
                        >
                          {formatRupees(price * quantities[itemId])}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

          </div>

          {/* SIDEBAR FOOTER */}
          <div className="cb-sidebar-footer">

            <div className="cb-subtotal-row">
              <span>Subtotal</span>

              <span>
                {formatRupees(totalPrice)}
              </span>
            </div>

            <div className="cb-total-row">
              <span>Total</span>

              <span>
                {formatRupees(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              className="cb-btn-checkout"
              onClick={handleCheckout}
            >
              Checkout Now
            </button>

          </div>
        </aside>

        {/* =========================
            INVENTORY LIST
        ========================= */}
        <main className="cb-main">

          {/* MAIN HEADER */}
          <header className="cb-main-header">
            <div>
              <h1 className="cb-main-title">
                Bowl Ingredients
              </h1>

              <p className="cb-main-subtitle">
                Select quantities to add to your bowl.
              </p>
            </div>
          </header>

          {/* =========================
              CATEGORIES
          ========================= */}
          {!loading && inventory.length > 0 && (
            <div className="cb-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`cb-chip ${
                    selectedCategory === category
                      ? "active"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* =========================
              INVENTORY
          ========================= */}
          <div className="cb-inventory-card">

            {loading ? (
              <div className="cb-message">
                Loading bowl products...
              </div>
            ) : error ? (
              <div className="cb-message cb-error">
                {error}
              </div>
            ) : filteredInventory.length === 0 ? (
              <div className="cb-message">
                No products are currently available for
                the bowl.
              </div>
            ) : (
              <table className="cb-table">

                <thead
                  style={{
                    backgroundColor: "#f3f3f3",
                    borderBottom: "1px solid #e2e2e2",
                  }}
                >
                  <tr>

                    <th>
                      Product
                    </th>

                    <th className="cb-hide-mobile">
                      Details
                    </th>

                    <th
                      style={{
                        textAlign: "right",
                      }}
                    >
                      Price
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        width: "128px",
                      }}
                    >
                      Quantity
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {filteredInventory.map((item) => {
                    const itemId = getItemId(item);
                    const qty = quantities[itemId] || 0;

                    const isSelected = qty > 0;
                    const price = getItemPrice(item);

                    return (
                      <tr
                        key={itemId}
                        style={{
                          backgroundColor: isSelected
                            ? "#ffffff"
                            : "transparent",
                        }}
                      >

                        {/* PRODUCT */}
                        <td>
                          <div className="cb-product-info">

                            <div className="cb-product-img-wrapper">

                              <img
                                className="cb-product-img"
                                alt={item.name}
                                src={
                                  item.images &&
                                  item.images.length > 0
                                    ? item.images[0]
                                    : "/placeholder.png"
                                }
                              />

                            </div>

                            <span
                              className={`cb-product-name ${
                                isSelected
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {item.name}
                            </span>

                          </div>
                        </td>

                        {/* DETAILS */}
                        <td className="cb-hide-mobile">

                          <span
                            style={{
                              fontSize: "12px",
                              color: "#594139",
                              display: "block",
                              marginBottom: "4px",
                            }}
                          >
                            {item.inventoryDetails ||
                              "Fresh ingredient"}
                          </span>

                          <span
                            style={{
                              fontSize: "12px",
                              color: "#ab3500",
                              display: "block",
                              fontWeight: 600,
                            }}
                          >
                            Category:{" "}
                            {item.bowlCategory}
                          </span>

                        </td>

                        {/* PRICE */}
                        <td
                          style={{
                            textAlign: "right",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#1a1c1c",
                          }}
                        >
                          {formatRupees(price)}
                        </td>

                        {/* QUANTITY */}
                        <td>

                          <div
                            className={`cb-qty-control ${
                              isSelected
                                ? "active"
                                : ""
                            }`}
                          >

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  itemId,
                                  -1
                                )
                              }
                              className="cb-qty-btn"
                            >
                              <span
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                -
                              </span>
                            </button>

                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={qty}
                              onChange={(event) =>
                                setItemQuantity(
                                  itemId,
                                  event.target.value
                                )
                              }
                              className={`cb-qty-value ${
                                isSelected
                                  ? "active"
                                  : ""
                              }`}
                              style={{
                                width: "42px",
                                border: "none",
                                background: "transparent",
                                textAlign: "center",
                                fontSize: "14px",
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? "#ab3500" : "#1a1c1c",
                              }}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  itemId,
                                  1
                                )
                              }
                              className="cb-qty-btn"
                            >
                              <span
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                +
                              </span>
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            )}

          </div>

        </main>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <AdyaFooter />

    </div>
  );
}
