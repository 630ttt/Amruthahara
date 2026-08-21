import React, { useEffect, useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    display: "flex",
  },

  content: {
    flex: 1,
    padding: "45px 5%",
  },

  title: {
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#78847b",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "30px",
    textAlign: "center",
  },

  icon: {
    fontSize: "55px",
    marginBottom: "15px",
  },

  emptyTitle: {
    color: "#23432e",
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  emptyText: {
    color: "#78847b",
    fontSize: "14px",
  },

  order: {
    background: "#fff",
    border: "1px solid #e5ede6",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "15px",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  orderId: {
    color: "#23432e",
    fontWeight: "800",
  },

  status: {
    background: "#eaf5ed",
    color: "#176338",
    borderRadius: "20px",
    padding: "5px 12px",
    fontSize: "11px",
    fontWeight: "800",
  },

  loading: {
    textAlign: "center",
    color: "#758178",
  },
};

function OrdersPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        /*
         * This expects your backend to eventually provide:
         *
         * GET /api/orders/user/:userId
         *
         * If that endpoint does not exist yet,
         * the page simply shows no orders.
         */

        if (!user?.id) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/orders/user/${user.id}`
        );

        if (!response.ok) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await response.json();

        setOrders(
          Array.isArray(data)
            ? data
            : data.orders || []
        );
      } catch (error) {
        console.log("Orders not available yet:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <div style={styles.page}>
      <UserSidebar />

      <main style={styles.content}>
        <h1 style={styles.title}>
          My Orders
        </h1>

        <p style={styles.subtitle}>
          View and track your Amruthahara orders.
        </p>

        {loading ? (
          <div style={styles.card}>
            <div style={styles.loading}>
              Loading orders...
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div style={styles.card}>
            <div style={styles.icon}>
              📦
            </div>

            <div style={styles.emptyTitle}>
              No Orders Yet
            </div>

            <div style={styles.emptyText}>
              Your completed and ongoing orders
              will appear here.
            </div>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order._id}
                style={styles.order}
              >
                <div style={styles.orderHeader}>
                  <div style={styles.orderId}>
                    Order #
                    {order._id?.slice(-8)}
                  </div>

                  <span style={styles.status}>
                    {order.status || "Processing"}
                  </span>
                </div>

                <div>
                  ₹
                  {order.totalAmount ||
                    order.amount ||
                    0}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrdersPage;