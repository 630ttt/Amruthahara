
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://amruthahara-2.onrender.com";

// =====================================================
// EXACT ORDER STATUSES
// =====================================================

const ORDER_STATUSES = [
  "Order Placed",
  "Order Confirmed",
  "Preparing",
  "Shipped",
  "Out Of Delivery",
  "Delivered",
  "Cancelled",
];

// =====================================================
// STYLES
// =====================================================

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#F5F8F3",
  },

  content: {
    marginLeft: "250px",
    width: "calc(100% - 250px)",
    padding: "35px",
    boxSizing: "border-box",
    minWidth: 0,
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    gap: "20px",
  },

  heading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#173F2A",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#7A847C",
    fontSize: "13px",
  },

  refreshButton: {
    border: "none",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    padding: "12px 18px",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },

  countCard: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E3EAE1",
    borderRadius: "12px",
    padding: "18px 22px",
    marginBottom: "20px",
    color: "#445148",
    boxShadow: "0 5px 18px rgba(30,70,40,0.03)",
  },

  countNumber: {
    color: "#175C38",
    fontSize: "22px",
    fontWeight: "800",
  },

  tableCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E3EAE1",
    boxShadow: "0 8px 25px rgba(30,70,40,0.05)",
    overflow: "hidden",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },

  table: {
    width: "100%",
    minWidth: "1200px",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor: "#173F2A",
    color: "#FFFFFF",
    padding: "16px 15px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "17px 15px",
    borderBottom: "1px solid #EDF0EC",
    color: "#536058",
    fontSize: "13px",
    verticalAlign: "middle",
  },

  orderId: {
    color: "#175C38",
    fontWeight: "800",
  },

  customerName: {
    color: "#263D2E",
    fontWeight: "700",
    marginBottom: "3px",
  },

  customerInfo: {
    lineHeight: "1.6",
    minWidth: "180px",
  },

  amount: {
    color: "#175C38",
    fontWeight: "800",
  },

  payment: {
    fontWeight: "700",
    color: "#56635A",
  },

  status: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  orderPlaced: {
    backgroundColor: "#FFF4D6",
    color: "#9A7200",
  },

  orderConfirmed: {
    backgroundColor: "#E4F5E8",
    color: "#24733A",
  },

  preparing: {
    backgroundColor: "#E5F0FF",
    color: "#2860A8",
  },

  shipped: {
    backgroundColor: "#EEE7FF",
    color: "#6841A5",
  },

  outForDelivery: {
    backgroundColor: "#FFF0D9",
    color: "#B56718",
  },

  delivered: {
    backgroundColor: "#DCF5E4",
    color: "#1D7136",
  },

  cancelled: {
    backgroundColor: "#FFE4E4",
    color: "#A53232",
  },

  statusControl: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "180px",
  },

  statusSelect: {
    width: "100%",
    border: "1px solid #D7E1D4",
    backgroundColor: "#FFFFFF",
    color: "#34463A",
    padding: "9px 10px",
    borderRadius: "7px",
    fontSize: "12px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
  },

  updateButton: {
    border: "none",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    padding: "9px 12px",
    borderRadius: "7px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  updateDisabled: {
    backgroundColor: "#9AA79D",
    cursor: "not-allowed",
  },

  error: {
    backgroundColor: "#FFF1F1",
    color: "#B91C1C",
    border: "1px solid #FFD8D8",
    padding: "14px 18px",
    borderRadius: "9px",
    marginBottom: "20px",
    fontSize: "13px",
  },

  success: {
    backgroundColor: "#ECFDF3",
    color: "#166534",
    border: "1px solid #C8EFD4",
    padding: "14px 18px",
    borderRadius: "9px",
    marginBottom: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  retryButton: {
    marginTop: "12px",
    border: "none",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    padding: "10px 18px",
    borderRadius: "7px",
    cursor: "pointer",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#175C38",
    fontSize: "18px",
    fontWeight: "700",
  },

  empty: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#7C877F",
  },
};

// =====================================================
// ADMIN ORDERS
// =====================================================

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  // ===================================================
  // FETCH ORDERS
  // ===================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("adminToken");
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/orders`,
        { headers }
      );

      const data = await response.json();

      console.log("GET ORDERS RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("FETCH ORDERS ERROR:", err);

      setError(
        err.message || "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===================================================
  // CHANGE STATUS DIRECTLY INSIDE ORDER
  // ===================================================

  const handleStatusChange = (orderId, newStatus) => {
    console.log(
      "STATUS SELECTED:",
      orderId,
      newStatus
    );

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              selectedStatus: newStatus,
            }
          : order
      )
    );
  };

  // ===================================================
  // UPDATE STATUS
  // ===================================================

  const updateOrderStatus = async (orderId) => {
    try {
      setError("");
      setSuccess("");

      const order = orders.find(
        (item) => item._id === orderId
      );

      if (!order) {
        setError("Order not found.");
        return;
      }

      // IMPORTANT:
      // Use selectedStatus if user selected something.
      // Otherwise use current database status.

      const newStatus =
        order.selectedStatus ||
        order.status ||
        "Order Placed";

      console.log(
        "================================"
      );

      console.log(
        "UPDATING ORDER:"
      );

      console.log(
        "ORDER ID:",
        orderId
      );

      console.log(
        "STATUS:",
        newStatus
      );

      console.log(
        "================================"
      );

      // ------------------------------------------------
      // CHECK STATUS
      // ------------------------------------------------

      if (!ORDER_STATUSES.includes(newStatus)) {
        setError(
          `Invalid order status: ${newStatus}`
        );

        return;
      }

      setUpdatingId(orderId);

      // ------------------------------------------------
      // SEND TO BACKEND
      // ------------------------------------------------

      const token = localStorage.getItem("adminToken");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",

          headers,

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "UPDATE ORDER RESPONSE:",
        data
      );

      // ------------------------------------------------
      // BACKEND ERROR
      // ------------------------------------------------

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      // ------------------------------------------------
      // GET ACTUAL UPDATED STATUS
      // ------------------------------------------------

      const updatedStatus =
        data.order?.status || newStatus;

      console.log(
        "UPDATED STATUS FROM SERVER:",
        updatedStatus
      );

      // ------------------------------------------------
      // UPDATE ORDER IN FRONTEND
      // ------------------------------------------------

      setOrders((previousOrders) =>
        previousOrders.map((item) =>
          item._id === orderId
            ? {
                ...item,

                // Main status
                status: updatedStatus,

                // Dropdown status
                selectedStatus: updatedStatus,
              }
            : item
        )
      );

      setSuccess(
        `Order status changed to "${updatedStatus}".`
      );

      // ------------------------------------------------
      // OPTIONAL:
      // RE-FETCH FROM DATABASE
      // ------------------------------------------------

      // This guarantees that the UI is displaying
      // exactly what is stored in MongoDB.

      const refreshToken = localStorage.getItem("adminToken");
      const refreshHeaders = {};

      if (refreshToken) {
        refreshHeaders.Authorization = `Bearer ${refreshToken}`;
      }

      const refreshResponse = await fetch(
        `${API_BASE_URL}/api/orders`,
        { headers: refreshHeaders }
      );

      const refreshData =
        await refreshResponse.json();

      if (
        refreshResponse.ok &&
        refreshData.success
      ) {
        setOrders(
          refreshData.orders || []
        );
      }
    } catch (err) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        err
      );

      setError(
        err.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ===================================================
  // DATE FORMAT
  // ===================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ===================================================
  // STATUS STYLE
  // ===================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Confirmed":
        return {
          ...styles.status,
          ...styles.orderConfirmed,
        };

      case "Preparing":
        return {
          ...styles.status,
          ...styles.preparing,
        };

      case "Shipped":
        return {
          ...styles.status,
          ...styles.shipped,
        };

      case "Out Of Delivery":
        return {
          ...styles.status,
          ...styles.outForDelivery,
        };

      case "Delivered":
        return {
          ...styles.status,
          ...styles.delivered,
        };

      case "Cancelled":
        return {
          ...styles.status,
          ...styles.cancelled,
        };

      case "Order Placed":
      default:
        return {
          ...styles.status,
          ...styles.orderPlaced,
        };
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />

        <main style={styles.content}>
          <div style={styles.loading}>
            Loading orders...
          </div>
        </main>
      </div>
    );
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <div style={styles.container}>

      <Sidebar />

      <main style={styles.content}>

        {/* =========================================
            HEADER
        ========================================= */}

        <div style={styles.topBar}>

          <div>
            <h1 style={styles.heading}>
              Orders
            </h1>

            <p style={styles.subtitle}>
              Manage and monitor all customer
              orders.
            </p>
          </div>

          <button
            style={styles.refreshButton}
            onClick={fetchOrders}
          >
            ↻ Refresh Orders
          </button>

        </div>

        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <div style={styles.error}>

            {error}

            <br />

            <button
              style={styles.retryButton}
              onClick={fetchOrders}
            >
              Try Again
            </button>

          </div>
        )}

        {/* =========================================
            SUCCESS
        ========================================= */}

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        {/* =========================================
            COUNT
        ========================================= */}

        <div style={styles.countCard}>
          Total Orders:{" "}

          <strong style={styles.countNumber}>
            {orders.length}
          </strong>
        </div>

        {/* =========================================
            TABLE
        ========================================= */}

        <div style={styles.tableCard}>

          {orders.length === 0 ? (

            <div style={styles.empty}>

              <h3>
                No Orders Found
              </h3>

              <p>
                There are currently no
                customer orders.
              </p>

            </div>

          ) : (

            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>

                  <tr>

                    <th style={styles.th}>
                      Order ID
                    </th>

                    <th style={styles.th}>
                      Customer
                    </th>

                    <th style={styles.th}>
                      Items
                    </th>

                    <th style={styles.th}>
                      Amount
                    </th>

                    <th style={styles.th}>
                      Payment
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>

                    <th style={styles.th}>
                      Date
                    </th>

                    <th style={styles.th}>
                      Update Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => {

                    const currentStatus =
                      order.status ||
                      "Order Placed";

                    const selectedStatus =
                      order.selectedStatus ||
                      currentStatus;

                    const isUpdating =
                      updatingId ===
                      order._id;

                    return (
                      <tr key={order._id}>

                        {/* ======================
                            ORDER ID
                        ====================== */}

                        <td style={styles.td}>

                          <div
                            style={
                              styles.orderId
                            }
                          >
                            #
                            {order._id?.slice(
                              -8
                            )}
                          </div>

                        </td>

                        {/* ======================
                            CUSTOMER
                        ====================== */}

                        <td style={styles.td}>

                          <div
                            style={
                              styles.customerInfo
                            }
                          >

                            <div
                              style={
                                styles.customerName
                              }
                            >
                              {order.customer
                                ?.name ||
                                "Customer"}
                            </div>

                            <div>
                              {order.customer
                                ?.email ||
                                "-"}
                            </div>

                            <div>
                              {order.customer
                                ?.phone ||
                                "-"}
                            </div>

                          </div>

                        </td>

                        {/* ======================
                            ITEMS
                        ====================== */}

                        <td style={styles.td}>
                          {order.items?.some(
                            (item) => item.isBowl
                          )
                            ? "Custom Bowl"
                            : order.items?.length || 0}
                        </td>

                        {/* ======================
                            AMOUNT
                        ====================== */}

                        <td style={styles.td}>

                          <span
                            style={
                              styles.amount
                            }
                          >
                            ₹
                            {Number(
                              order.amount || 0
                            )}
                          </span>

                        </td>

                        {/* ======================
                            PAYMENT
                        ====================== */}

                        <td style={styles.td}>

                          <span
                            style={
                              styles.payment
                            }
                          >
                            {order.paymentMethod ||
                              "Razorpay"}
                          </span>

                        </td>

                        {/* ======================
                            CURRENT STATUS
                        ====================== */}

                        <td style={styles.td}>

                          <span
                            style={getStatusStyle(
                              currentStatus
                            )}
                          >
                            {currentStatus}
                          </span>

                        </td>

                        {/* ======================
                            DATE
                        ====================== */}

                        <td style={styles.td}>

                          {formatDate(
                            order.createdAt
                          )}

                        </td>

                        {/* ======================
                            UPDATE STATUS
                        ====================== */}

                        <td style={styles.td}>

                          <div
                            style={
                              styles.statusControl
                            }
                          >

                            <select
                              style={
                                styles.statusSelect
                              }

                              value={
                                selectedStatus
                              }

                              disabled={
                                isUpdating
                              }

                              onChange={(event) => {

                                const newStatus =
                                  event.target
                                    .value;

                                console.log(
                                  "DROPDOWN CHANGED:",
                                  newStatus
                                );

                                handleStatusChange(
                                  order._id,
                                  newStatus
                                );
                              }}
                            >

                              {ORDER_STATUSES.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>
                                )
                              )}

                            </select>

                            <button
                              style={{
                                ...styles.updateButton,

                                ...(isUpdating
                                  ? styles.updateDisabled
                                  : {}),
                              }}

                              disabled={
                                isUpdating
                              }

                              onClick={() =>
                                updateOrderStatus(
                                  order._id
                                )
                              }
                            >

                              {isUpdating
                                ? "Updating..."
                                : "Update Status"}

                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

      <style>{`

        @media (max-width: 1100px) {
          main {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }

        @media (max-width: 700px) {
          main {
            padding: 20px 12px !important;
          }
        }

        @media (max-width: 600px) {
          .orders-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }

      `}</style>

    </div>
  );
}

export default AdminOrders;

