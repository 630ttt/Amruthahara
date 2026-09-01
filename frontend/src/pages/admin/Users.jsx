
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://amruthahara-backend.onrender.com";

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

  // ===================================================
  // HEADER
  // ===================================================

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

  // ===================================================
  // COUNT CARD
  // ===================================================

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
    marginLeft: "6px",
  },

  // ===================================================
  // TABLE CARD
  // ===================================================

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
    minWidth: "900px",
    borderCollapse: "collapse",
  },

  // ===================================================
  // TABLE HEADER
  // ===================================================

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

  // ===================================================
  // TABLE DATA
  // ===================================================

  td: {
    padding: "17px 15px",
    borderBottom: "1px solid #EDF0EC",
    color: "#536058",
    fontSize: "13px",
    verticalAlign: "middle",
  },

  // ===================================================
  // CUSTOMER
  // ===================================================

  customer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "220px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #176039, #3d8055)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "14px",
  },

  name: {
    color: "#263D2E",
    fontWeight: "700",
    fontSize: "13px",
    marginBottom: "3px",
  },

  id: {
    color: "#9AA49D",
    fontSize: "9px",
    wordBreak: "break-all",
    maxWidth: "180px",
  },

  email: {
    color: "#536058",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },

  phone: {
    color: "#536058",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },

  registered: {
    color: "#536058",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },

  // ===================================================
  // ERROR
  // ===================================================

  error: {
    backgroundColor: "#FFF1F1",
    color: "#B91C1C",
    border: "1px solid #FFD8D8",
    padding: "14px 18px",
    borderRadius: "9px",
    marginBottom: "20px",
    fontSize: "13px",
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

  // ===================================================
  // LOADING
  // ===================================================

  loading: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#175C38",
    fontSize: "18px",
    fontWeight: "700",
  },

  // ===================================================
  // EMPTY
  // ===================================================

  empty: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#7C877F",
  },
};

// =====================================================
// USERS
// =====================================================

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // FETCH USERS
  // ===================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users`,
        {
          headers,
        }
      );

      const data = await response.json();

      console.log("GET USERS RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch users"
        );
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("FETCH USERS ERROR:", err);

      setError(
        err.message || "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchUsers();
  }, []);

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
      }
    );
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
            Loading customers...
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

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main style={styles.content}>

        {/* =========================================
            HEADER
        ========================================= */}

        <div style={styles.topBar}>

          <div>
            <h1 style={styles.heading}>
              Customers
            </h1>

            <p style={styles.subtitle}>
              View and manage all registered customer
              accounts.
            </p>
          </div>

          <button
            style={styles.refreshButton}
            onClick={fetchUsers}
          >
            ↻ Refresh Users
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
              onClick={fetchUsers}
            >
              Try Again
            </button>

          </div>
        )}

        {/* =========================================
            COUNT
        ========================================= */}

        <div style={styles.countCard}>
          Total Registered Users:{" "}

          <strong style={styles.countNumber}>
            {users.length}
          </strong>
        </div>

        {/* =========================================
            TABLE
        ========================================= */}

        <div style={styles.tableCard}>

          {users.length === 0 ? (

            <div style={styles.empty}>

              <h3>
                No Users Found
              </h3>

              <p>
                There are currently no registered
                customer accounts.
              </p>

            </div>

          ) : (

            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>

                  <tr>

                    <th style={styles.th}>
                      #
                    </th>

                    <th style={styles.th}>
                      Customer
                    </th>

                    <th style={styles.th}>
                      Email
                    </th>

                    <th style={styles.th}>
                      Phone
                    </th>

                    <th style={styles.th}>
                      Registered
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((user, index) => (

                    <tr key={user._id || index}>

                      {/* =========================
                          NUMBER
                      ========================= */}

                      <td style={styles.td}>
                        {index + 1}
                      </td>

                      {/* =========================
                          CUSTOMER
                      ========================= */}

                      <td style={styles.td}>

                        <div style={styles.customer}>

                          <div style={styles.avatar}>
                            {user.name
                              ? user.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <div>

                            <div style={styles.name}>
                              {user.name ||
                                "Unknown User"}
                            </div>

                            <div style={styles.id}>
                              ID: {user._id || "-"}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* =========================
                          EMAIL
                      ========================= */}

                      <td style={styles.td}>

                        <span style={styles.email}>
                          {user.email || "—"}
                        </span>

                      </td>

                      {/* =========================
                          PHONE
                      ========================= */}

                      <td style={styles.td}>

                        <span style={styles.phone}>
                          {user.phone || "—"}
                        </span>

                      </td>

                      {/* =========================
                          REGISTERED
                      ========================= */}

                      <td style={styles.td}>

                        <span
                          style={styles.registered}
                        >
                          {formatDate(
                            user.createdAt
                          )}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* =========================================
          RESPONSIVE CSS
      ========================================= */}

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

          .users-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

        }

      `}</style>

    </div>
  );
}

export default Users;

