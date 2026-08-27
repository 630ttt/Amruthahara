import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaArrowRight,
  FaArrowLeft,
  FaMapMarkerAlt,
} from "react-icons/fa";

const styles = {
  page: {
    minHeight: "80vh",
    background:
      "linear-gradient(180deg, #F7FAF5, #FFFFFF)",
    padding: "45px 5%",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  /* ================================
     BACK TO SHOP
  ================================= */

  backShop: {
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

  header: {
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    color: "#23432E",
    fontSize: "32px",
    fontWeight: "900",
  },

  subtitle: {
    color: "#7A857D",
    fontSize: "14px",
    marginTop: "8px",
  },

  empty: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "18px",
    padding: "60px 25px",
    textAlign: "center",
  },

  emptyIcon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#EAF4E5",
    color: "#39764B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  emptyTitle: {
    color: "#263D2E",
    fontSize: "23px",
    fontWeight: "800",
  },

  emptyText: {
    color: "#7B867E",
    fontSize: "14px",
    marginBottom: "25px",
  },

  shopButton: {
    border: "none",
    borderRadius: "10px",
    padding: "13px 22px",
    background: "#175C38",
    color: "#FFFFFF",
    fontWeight: "800",
    cursor: "pointer",
  },

  order: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "18px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    paddingBottom: "18px",
    borderBottom:
      "1px solid #EDF1ED",
  },

  orderId: {
    color: "#23432E",
    fontSize: "15px",
    fontWeight: "900",
  },

  date: {
    color: "#8A948D",
    fontSize: "12px",
    marginTop: "5px",
  },

  status: {
    background: "#DFF3E4",
    color: "#176338",
    borderRadius: "20px",
    padding: "7px 13px",
    fontSize: "11px",
    fontWeight: "800",
  },

  body: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    paddingTop: "20px",
    flexWrap: "wrap",
  },

  products: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flex: 1,
    minWidth: "250px",
  },

  image: {
    width: "55px",
    height: "55px",
    borderRadius: "10px",
    objectFit: "cover",
    background: "#F1F5EE",
  },

  moreProducts: {
    color: "#7B867E",
    fontSize: "12px",
  },

  amount: {
    color: "#175C38",
    fontSize: "21px",
    fontWeight: "900",
  },

  payment: {
    color: "#7B867E",
    fontSize: "11px",
    marginTop: "4px",
  },

  action: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 15px",
    borderRadius: "9px",
    background: "#175C38",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "800",
  },

  address: {
    marginTop: "18px",
    padding: "13px",
    borderRadius: "10px",
    background: "#F8FAF7",
    color: "#69756D",
    fontSize: "12px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
};

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(
        localStorage.getItem(
          "amruthahara_orders"
        )
      ) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* ================================
            BACK TO SHOP
        ================================= */}

        <button
          type="button"
          style={styles.backShop}
          onClick={() => navigate("/products")}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              "#175C38";
            e.currentTarget.style.transform =
              "translateX(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              "#52705C";
            e.currentTarget.style.transform =
              "translateX(0)";
          }}
        >
          <FaArrowLeft
            style={styles.backArrow}
          />

          Back to Shop
        </button>

        {/* ================================
            HEADER
        ================================= */}

        <div style={styles.header}>
          <h1 style={styles.title}>
            My Orders
          </h1>

          <p style={styles.subtitle}>
            View your Amruthahara orders and
            track their delivery status.
          </p>
        </div>

        {/* ================================
            NO ORDERS
        ================================= */}

        {orders.length === 0 ? (
          <div style={styles.empty}>

            <div style={styles.emptyIcon}>
              <FaBoxOpen />
            </div>

            <h2 style={styles.emptyTitle}>
              No Orders Yet
            </h2>

            <p style={styles.emptyText}>
              Your completed orders will appear
              here.
            </p>

            <button
              type="button"
              style={styles.shopButton}
              onClick={() =>
                navigate("/products")
              }
            >
              Start Shopping
            </button>

          </div>

        ) : (

          /* ================================
             ORDERS
          ================================= */

          orders.map((order) => (

            <div
              key={order.id}
              style={styles.order}
            >

              <div style={styles.orderHeader}>

                <div>

                  <div style={styles.orderId}>
                    Order #{order.id}
                  </div>

                  <div style={styles.date}>
                    {new Date(
                      order.orderDate
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>

                </div>

                <span style={styles.status}>
                  {order.status}
                </span>

              </div>

              <div style={styles.body}>

                {/* PRODUCTS */}

                <div style={styles.products}>

                  {order.items
                    ?.slice(0, 3)
                    .map(
                      (item, index) => (

                        <img
                          key={index}
                          src={
                            item.image ||
                            "/placeholder.png"
                          }
                          alt={item.name}
                          style={styles.image}
                        />

                      )
                    )}

                  {order.items?.length >
                    3 && (

                    <span
                      style={
                        styles.moreProducts
                      }
                    >
                      +
                      {order.items.length -
                        3}{" "}
                      more
                    </span>

                  )}

                </div>

                {/* AMOUNT */}

                <div>

                  <div style={styles.amount}>
                    ₹{order.total}
                  </div>

                  <div style={styles.payment}>
                    {order.paymentMethod}
                  </div>

                </div>

                {/* TRACK ORDER */}

                <Link
                  to={`/orders/${order.id}`}
                  style={styles.action}
                >
                  Track Order
                  <FaArrowRight />
                </Link>

              </div>

              {/* ADDRESS */}

              <div style={styles.address}>

                <FaMapMarkerAlt />

                {order.address?.city},{" "}
                {order.address?.state}{" "}
                - {order.address?.pincode}

              </div>

            </div>

          ))
        )}

      </div>
    </main>
  );
}

export default Orders;