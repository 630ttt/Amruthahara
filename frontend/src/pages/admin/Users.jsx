import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const API_URL = "http://localhost:5000";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/users`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch users");
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error("FETCH USERS ERROR:", err);
      setError(err.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={styles.page}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>AMRUTHAHARA ADMIN</p>

            <h1 style={styles.title}>
              Customers
            </h1>

            <p style={styles.subtitle}>
              View and manage all registered customer accounts.
            </p>
          </div>

          <div style={styles.countCard}>
            <div style={styles.countNumber}>
              {users.length}
            </div>

            <div style={styles.countLabel}>
              Registered Users
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* CONTENT */}
        <div style={styles.card}>

          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>
                Customer Accounts
              </h2>

              <p style={styles.cardSubtitle}>
                All users registered through the customer login system.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              style={styles.refreshButton}
            >
              Refresh
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div style={styles.center}>
              Loading customers...
            </div>
          ) : users.length === 0 ? (
            <div style={styles.center}>
              No registered users found.
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Registered</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>

                      <td style={styles.td}>
                        {index + 1}
                      </td>

                      <td style={styles.td}>
                        <div style={styles.customer}>
                          <div style={styles.avatar}>
                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>

                          <div>
                            <div style={styles.name}>
                              {user.name || "Unknown User"}
                            </div>

                            <div style={styles.id}>
                              ID: {user._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={styles.td}>
                        {user.email || "—"}
                      </td>

                      <td style={styles.td}>
                        {user.phone || "—"}
                      </td>

                      <td style={styles.td}>
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "35px",
    background:
      "linear-gradient(135deg, #f6f8f3 0%, #eef4ed 100%)",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    marginBottom: "30px",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#a68b4f",
  },

  title: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "38px",
    fontWeight: "500",
    color: "#183b28",
  },

  subtitle: {
    margin: "8px 0 0",
    fontSize: "13px",
    color: "#78857c",
  },

  countCard: {
    minWidth: "170px",
    padding: "20px 25px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid #e1e9df",
    boxShadow: "0 12px 30px rgba(28,70,42,0.08)",
    textAlign: "center",
  },

  countNumber: {
    fontFamily: "Georgia, serif",
    fontSize: "34px",
    fontWeight: "600",
    color: "#176039",
  },

  countLabel: {
    marginTop: "5px",
    fontSize: "11px",
    color: "#849087",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "22px",
    border: "1px solid #e1e9df",
    boxShadow: "0 15px 40px rgba(28,70,42,0.08)",
    overflow: "hidden",
  },

  cardHeader: {
    padding: "24px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #edf1ec",
  },

  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "22px",
    fontWeight: "500",
    color: "#203d2b",
  },

  cardSubtitle: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#879188",
  },

  refreshButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 18px",
    background: "#176039",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },

  th: {
    textAlign: "left",
    padding: "16px 20px",
    background: "#f7faf6",
    color: "#647269",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    borderBottom: "1px solid #e8eee6",
  },

  td: {
    padding: "17px 20px",
    borderBottom: "1px solid #edf1ec",
    color: "#435047",
    fontSize: "13px",
  },

  customer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #176039, #3d8055)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "14px",
  },

  name: {
    color: "#203d2b",
    fontWeight: "700",
    fontSize: "13px",
  },

  id: {
    marginTop: "3px",
    color: "#a0aaa3",
    fontSize: "9px",
  },

  center: {
    padding: "70px 20px",
    textAlign: "center",
    color: "#89958d",
    fontSize: "13px",
  },

  error: {
    marginBottom: "20px",
    padding: "14px 18px",
    background: "#fff3f2",
    border: "1px solid #f0d6d5",
    borderRadius: "12px",
    color: "#b6424b",
    fontSize: "13px",
  },
};

export default Users;