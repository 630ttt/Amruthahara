
import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { API_BASE_URL } from "../../services/apiBase";

const PLAN_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
};

const statusStyle = (status) => {
  if (status === "approved") {
    return {
      background: "#EAF7EC",
      color: "#2F6B3F",
      border: "1px solid #CBE6D0",
    };
  }

  if (status === "declined") {
    return {
      background: "#FDECEC",
      color: "#B42318",
      border: "1px solid #F5CACA",
    };
  }

  return {
    background: "#FFF8E8",
    color: "#8A6A2F",
    border: "1px solid #EAD9A9",
  };
};

const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// =====================================================
// STYLES
// =====================================================

const styles = {
  // ===================================================
  // MAIN LAYOUT — SAME AS ORDERS PAGE
  // ===================================================

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

  page: {
    width: "100%",
    maxWidth: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },

  headerContent: {
    minWidth: 0,
    flex: "1 1 400px",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2.4px",
    color: "#A68B4F",
  },

  title: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "clamp(28px, 3vw, 40px)",
    fontWeight: "500",
    lineHeight: "1.15",
    color: "#183B28",
  },

  subtitle: {
    margin: "9px 0 0",
    maxWidth: "680px",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#78857C",
  },

  refreshButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minWidth: "110px",
    border: "1px solid #D7E2D5",
    borderRadius: "10px",
    padding: "11px 17px",
    background: "#FFFFFF",
    color: "#205A38",
    fontSize: "12px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(28,70,42,0.06)",
    whiteSpace: "nowrap",
  },

  refreshIcon: {
    fontSize: "18px",
    lineHeight: 1,
  },

  // ===================================================
  // SUMMARY
  // ===================================================

  summaryGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "24px",
    boxSizing: "border-box",
  },

  summaryCard: {
    width: "100%",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px",
    borderRadius: "14px",
    background: "#FFFFFF",
    border: "1px solid #E3EAE1",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
    boxSizing: "border-box",
  },

  summaryIcon: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    fontSize: "18px",
    fontWeight: "800",
  },

  summaryContent: {
    minWidth: 0,
  },

  summaryNumber: {
    fontFamily: "Georgia, serif",
    fontSize: "25px",
    fontWeight: "600",
    color: "#203D2B",
    lineHeight: 1,
  },

  summaryLabel: {
    marginTop: "5px",
    fontSize: "11px",
    color: "#849087",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  // ===================================================
  // ALERTS
  // ===================================================

  error: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
    padding: "13px 16px",
    borderRadius: "9px",
    background: "#FFF1F1",
    border: "1px solid #FFD8D8",
    color: "#B91C1C",
    fontSize: "13px",
  },

  success: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
    padding: "13px 16px",
    borderRadius: "9px",
    background: "#ECFDF3",
    border: "1px solid #C8EFD4",
    color: "#166534",
    fontSize: "13px",
    fontWeight: "600",
  },

  alertIcon: {
    width: "22px",
    height: "22px",
    minWidth: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    fontWeight: "900",
  },

  // ===================================================
  // MAIN CARD
  // ===================================================

  card: {
    width: "100%",
    maxWidth: "100%",
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E3EAE1",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "24px 28px",
    borderBottom: "1px solid #EDF1EC",
    flexWrap: "wrap",
  },

  cardEyebrow: {
    marginBottom: "5px",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1.8px",
    color: "#A68B4F",
  },

  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "22px",
    fontWeight: "500",
    color: "#203D2B",
  },

  cardSubtitle: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#879188",
  },

  requestCount: {
    flexShrink: 0,
    padding: "8px 13px",
    borderRadius: "999px",
    background: "#F1F6EF",
    color: "#39704C",
    border: "1px solid #DCE8D9",
    fontSize: "11px",
    fontWeight: "800",
  },

  // ===================================================
  // LOADING
  // ===================================================

  center: {
    padding: "65px 20px",
    textAlign: "center",
  },

  spinner: {
    width: "30px",
    height: "30px",
    margin: "0 auto 14px",
    border: "3px solid #DCE8D9",
    borderTop: "3px solid #176039",
    borderRadius: "50%",
  },

  loadingTitle: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#304A39",
  },

  loadingText: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#879188",
  },

  // ===================================================
  // EMPTY
  // ===================================================

  empty: {
    padding: "70px 25px",
    textAlign: "center",
  },

  emptyIcon: {
    width: "58px",
    height: "58px",
    margin: "0 auto 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    background: "#F1F6EF",
    color: "#39704C",
    fontSize: "25px",
  },

  emptyTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "22px",
    fontWeight: "500",
    color: "#203D2B",
  },

  emptyText: {
    maxWidth: "430px",
    margin: "8px auto 20px",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#849087",
  },

  emptyButton: {
    border: "none",
    borderRadius: "9px",
    padding: "11px 18px",
    background: "#175C38",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "800",
    cursor: "pointer",
  },

  // ===================================================
  // REQUEST LIST
  // ===================================================

  list: {
    width: "100%",
    maxWidth: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxSizing: "border-box",
  },

  // ===================================================
  // REQUEST CARD
  // ===================================================

  requestCard: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    border: "1px solid #E3EAE1",
    borderRadius: "14px",
    background: "#FBFCFA",
    boxSizing: "border-box",
  },

  // ===================================================
  // REQUEST HEADER
  // ===================================================

  requestHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "20px",
    padding: "20px",
    background: "#FFFFFF",
    borderBottom: "1px solid #EDF1EC",
    flexWrap: "wrap",
  },

  customerSection: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    minWidth: 0,
    flex: "1 1 350px",
  },

  avatar: {
    width: "46px",
    height: "46px",
    minWidth: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #1F6942, #3F8059)",
    color: "#FFFFFF",
    fontFamily: "Georgia, serif",
    fontSize: "19px",
    fontWeight: "600",
  },

  requestNumber: {
    marginBottom: "3px",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1.3px",
    color: "#A68B4F",
  },

  requestName: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#203D2B",
    wordBreak: "break-word",
  },

  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "5px",
    flexWrap: "wrap",
    fontSize: "12px",
    color: "#68766D",
  },

  // ===================================================
  // STATUS
  // ===================================================

  statusSection: {
    minWidth: "145px",
    textAlign: "right",
  },

  statusHeading: {
    marginBottom: "7px",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#879188",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: "800",
  },

  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
  },

  // ===================================================
  // DETAILS
  // ===================================================

  detailsContainer: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "1px",
    background: "#E8EEE6",
    borderBottom: "1px solid #E8EEE6",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  detailItem: {
    minWidth: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 17px",
    background: "#FBFCFA",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  detailIcon: {
    width: "30px",
    height: "30px",
    minWidth: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    background: "#EFF5ED",
    color: "#39704C",
    fontSize: "12px",
    fontWeight: "900",
  },

  detailContent: {
    minWidth: 0,
    maxWidth: "100%",
  },

  detailLabel: {
    marginBottom: "4px",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#89948C",
  },

  detailValue: {
    minWidth: 0,
    maxWidth: "100%",
    fontSize: "12px",
    fontWeight: "700",
    color: "#405048",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },

  // ===================================================
  // NOTES
  // ===================================================

  notes: {
    padding: "15px 18px",
    background: "#FFFFFF",
    borderBottom: "1px solid #E8EEE6",
  },

  notesLabel: {
    marginBottom: "5px",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#89948C",
  },

  notesValue: {
    fontSize: "12px",
    lineHeight: "1.55",
    color: "#59665E",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },

  // ===================================================
  // ACTION AREA
  // ===================================================

  actionArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "16px 18px",
    background: "#F5F8F3",
    flexWrap: "wrap",
  },

  actionInfo: {
    minWidth: 0,
    flex: "1 1 300px",
  },

  actionTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#304A39",
  },

  actionDescription: {
    marginTop: "3px",
    fontSize: "10px",
    lineHeight: "1.5",
    color: "#829087",
  },

  statusControl: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
    minWidth: "190px",
  },

  select: {
    width: "190px",
    maxWidth: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D2DFCF",
    background: "#FFFFFF",
    color: "#203D2B",
    fontSize: "12px",
    fontWeight: "700",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  updating: {
    whiteSpace: "nowrap",
    fontSize: "10px",
    color: "#8A6A2F",
    fontWeight: "700",
  },
};

// =====================================================
// ADMIN SUBSCRIPTIONS
// =====================================================

function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [feedback, setFeedback] = useState("");

  // ===================================================
  // FETCH SUBSCRIPTIONS
  // EXISTING MECHANISM - DO NOT CHANGE
  // ===================================================

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken");

      const headers = {};

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/subscriptions`,
        { headers }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load subscription requests"
        );
      }

      setSubscriptions(
        data.subscriptions || []
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to load subscription requests"
      );

      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ===================================================
  // UPDATE STATUS
  // EXISTING MECHANISM - DO NOT CHANGE
  // ===================================================

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      setFeedback("");
      setError("");

      const token =
        localStorage.getItem("adminToken");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/subscriptions/${id}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update status"
        );
      }

      setSubscriptions((current) =>
        current.map((item) =>
          item._id === id
            ? data.subscription
            : item
        )
      );

      setFeedback(
        "Subscription status updated."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to update status"
      );
    } finally {
      setUpdatingId("");
    }
  };

  // ===================================================
  // SUMMARY COUNTS
  // ===================================================

  const pendingCount =
    subscriptions.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const approvedCount =
    subscriptions.filter(
      (item) =>
        item.status === "approved"
    ).length;

  const declinedCount =
    subscriptions.filter(
      (item) =>
        item.status === "declined"
    ).length;

  // ===================================================
  // UI
  // ===================================================

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main style={styles.content}>

        <div style={styles.page}>

          {/* =========================================
              PAGE HEADER
          ========================================= */}

          <div style={styles.header}>

            <div style={styles.headerContent}>

              <div style={styles.eyebrow}>
                AMRUTHAHARA ADMIN
              </div>

              <h1 style={styles.title}>
                Subscription Management
              </h1>

              <p style={styles.subtitle}>
                Review customer subscription
                requests and manage their
                approval status.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchSubscriptions}
              style={styles.refreshButton}
            >
              <span style={styles.refreshIcon}>
                ↻
              </span>

              Refresh
            </button>

          </div>

          {/* =========================================
              SUMMARY CARDS
          ========================================= */}

          <div style={styles.summaryGrid}>

            {/* TOTAL */}

            <div style={styles.summaryCard}>

              <div
                style={{
                  ...styles.summaryIcon,
                  background: "#EDF7EF",
                  color: "#2F6B3F",
                }}
              >
                ✓
              </div>

              <div style={styles.summaryContent}>

                <div style={styles.summaryNumber}>
                  {subscriptions.length}
                </div>

                <div style={styles.summaryLabel}>
                  Total Requests
                </div>

              </div>

            </div>

            {/* PENDING */}

            <div style={styles.summaryCard}>

              <div
                style={{
                  ...styles.summaryIcon,
                  background: "#FFF8E8",
                  color: "#8A6A2F",
                }}
              >
                ◷
              </div>

              <div style={styles.summaryContent}>

                <div style={styles.summaryNumber}>
                  {pendingCount}
                </div>

                <div style={styles.summaryLabel}>
                  Pending
                </div>

              </div>

            </div>

            {/* APPROVED */}

            <div style={styles.summaryCard}>

              <div
                style={{
                  ...styles.summaryIcon,
                  background: "#EDF7EF",
                  color: "#2F6B3F",
                }}
              >
                ✓
              </div>

              <div style={styles.summaryContent}>

                <div style={styles.summaryNumber}>
                  {approvedCount}
                </div>

                <div style={styles.summaryLabel}>
                  Approved
                </div>

              </div>

            </div>

            {/* DECLINED */}

            <div style={styles.summaryCard}>

              <div
                style={{
                  ...styles.summaryIcon,
                  background: "#FDECEC",
                  color: "#B42318",
                }}
              >
                ×
              </div>

              <div style={styles.summaryContent}>

                <div style={styles.summaryNumber}>
                  {declinedCount}
                </div>

                <div style={styles.summaryLabel}>
                  Declined
                </div>

              </div>

            </div>

          </div>

          {/* =========================================
              ERROR
          ========================================= */}

          {error && (
            <div style={styles.error}>

              <span style={styles.alertIcon}>
                !
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =========================================
              SUCCESS
          ========================================= */}

          {feedback && (
            <div style={styles.success}>

              <span style={styles.alertIcon}>
                ✓
              </span>

              <span>
                {feedback}
              </span>

            </div>
          )}

          {/* =========================================
              MAIN CARD
          ========================================= */}

          <div style={styles.card}>

            {/* CARD HEADER */}

            <div style={styles.cardHeader}>

              <div>

                <div style={styles.cardEyebrow}>
                  CUSTOMER REQUESTS
                </div>

                <h2 style={styles.cardTitle}>
                  Subscription Requests
                </h2>

                <p style={styles.cardSubtitle}>
                  All subscription requests submitted
                  by customers are shown below.
                </p>

              </div>

              <div style={styles.requestCount}>
                {subscriptions.length}{" "}
                {subscriptions.length === 1
                  ? "Request"
                  : "Requests"}
              </div>

            </div>

            {/* =======================================
                LOADING
            ======================================= */}

            {loading ? (

              <div style={styles.center}>

                <div
                  style={styles.spinner}
                  className="subscription-spinner"
                ></div>

                <div style={styles.loadingTitle}>
                  Loading subscriptions
                </div>

                <div style={styles.loadingText}>
                  Please wait while we fetch
                  the requests.
                </div>

              </div>

            ) : subscriptions.length === 0 ? (

              /* =====================================
                 EMPTY
              ===================================== */

              <div style={styles.empty}>

                <div style={styles.emptyIcon}>
                  ✦
                </div>

                <h3 style={styles.emptyTitle}>
                  No subscription requests
                </h3>

                <p style={styles.emptyText}>
                  Customer subscription requests
                  will appear here once they are
                  submitted.
                </p>

                <button
                  type="button"
                  onClick={fetchSubscriptions}
                  style={styles.emptyButton}
                >
                  Refresh Requests
                </button>

              </div>

            ) : (

              /* =====================================
                 REQUEST LIST
              ===================================== */

              <div style={styles.list}>

                {subscriptions.map(
                  (item, index) => (

                    <div
                      key={item._id}
                      style={styles.requestCard}
                    >

                      {/* ==========================
                          CUSTOMER HEADER
                      ========================== */}

                      <div
                        style={
                          styles.requestHeader
                        }
                      >

                        <div
                          style={
                            styles.customerSection
                          }
                        >

                          <div
                            style={styles.avatar}
                          >
                            {(item.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div
                            style={{
                              minWidth: 0,
                            }}
                          >

                            <div
                              style={
                                styles.requestNumber
                              }
                            >
                              REQUEST #
                              {String(index + 1)
                                .padStart(2, "0")}
                            </div>

                            <div
                              style={
                                styles.requestName
                              }
                            >
                              {item.name ||
                                "Unnamed Customer"}
                            </div>

                            <div
                              style={
                                styles.contactRow
                              }
                            >

                              <span>
                                ✉{" "}
                                {item.email ||
                                  "No email"}
                              </span>

                              <span>
                                ☎{" "}
                                {item.phone ||
                                  "No phone"}
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* STATUS */}

                        <div
                          style={
                            styles.statusSection
                          }
                        >

                          <div
                            style={
                              styles.statusHeading
                            }
                          >
                            CURRENT STATUS
                          </div>

                          <span
                            style={{
                              ...styles.badge,
                              ...statusStyle(
                                item.status
                              ),
                            }}
                          >

                            <span
                              style={
                                styles.badgeDot
                              }
                            ></span>

                            {STATUS_LABELS[
                              item.status
                            ] ||
                              item.status ||
                              "Pending"}

                          </span>

                        </div>

                      </div>

                      {/* ==========================
                          DETAILS
                      ========================== */}

                      <div
                        style={
                          styles.detailsContainer
                        }
                      >

                        {/* PLAN */}

                        <div
                          style={
                            styles.detailItem
                          }
                        >

                          <div
                            style={
                              styles.detailIcon
                            }
                          >
                            ◉
                          </div>

                          <div
                            style={
                              styles.detailContent
                            }
                          >

                            <div
                              style={
                                styles.detailLabel
                              }
                            >
                              PLAN
                            </div>

                            <div
                              style={
                                styles.detailValue
                              }
                            >
                              {PLAN_LABELS[
                                item.plan
                              ] ||
                                item.plan ||
                                "—"}
                            </div>

                          </div>

                        </div>

                        {/* DAYS */}

                        <div
                          style={
                            styles.detailItem
                          }
                        >

                          <div
                            style={
                              styles.detailIcon
                            }
                          >
                            #
                          </div>

                          <div
                            style={
                              styles.detailContent
                            }
                          >

                            <div
                              style={
                                styles.detailLabel
                              }
                            >
                              DAYS
                            </div>

                            <div
                              style={
                                styles.detailValue
                              }
                            >
                              {item.days || "—"}
                            </div>

                          </div>

                        </div>

                        {/* REQUESTED */}

                        <div
                          style={
                            styles.detailItem
                          }
                        >

                          <div
                            style={
                              styles.detailIcon
                            }
                          >
                            +
                          </div>

                          <div
                            style={
                              styles.detailContent
                            }
                          >

                            <div
                              style={
                                styles.detailLabel
                              }
                            >
                              REQUESTED
                            </div>

                            <div
                              style={
                                styles.detailValue
                              }
                            >
                              {formatDate(
                                item.createdAt
                              )}
                            </div>

                          </div>

                        </div>

                        {/* UPDATED */}

                        <div
                          style={
                            styles.detailItem
                          }
                        >

                          <div
                            style={
                              styles.detailIcon
                            }
                          >
                            ↻
                          </div>

                          <div
                            style={
                              styles.detailContent
                            }
                          >

                            <div
                              style={
                                styles.detailLabel
                              }
                            >
                              LAST UPDATED
                            </div>

                            <div
                              style={
                                styles.detailValue
                              }
                            >
                              {formatDate(
                                item.updatedAt
                              )}
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* ==========================
                          NOTES
                      ========================== */}

                      <div style={styles.notes}>

                        <div
                          style={styles.notesLabel}
                        >
                          CUSTOMER NOTES
                        </div>

                        <div
                          style={styles.notesValue}
                        >
                          {item.notes ||
                            "No additional notes provided."}
                        </div>

                      </div>

                      {/* ==========================
                          STATUS ACTION
                      ========================== */}

                      <div
                        style={
                          styles.actionArea
                        }
                      >

                        <div
                          style={
                            styles.actionInfo
                          }
                        >

                          <div
                            style={
                              styles.actionTitle
                            }
                          >
                            Manage Request
                          </div>

                          <div
                            style={
                              styles.actionDescription
                            }
                          >
                            Change the subscription
                            status to update the
                            customer's dashboard.
                          </div>

                        </div>

                        <div
                          style={
                            styles.statusControl
                          }
                        >

                          <select
                            value={
                              item.status ||
                              "pending"
                            }
                            disabled={
                              updatingId ===
                              item._id
                            }
                            onChange={(event) =>
                              updateStatus(
                                item._id,
                                event.target.value
                              )
                            }
                            style={{
                              ...styles.select,
                              opacity:
                                updatingId ===
                                item._id
                                  ? 0.6
                                  : 1,
                            }}
                            aria-label={`Update status for ${
                              item.name
                            }`}
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="approved">
                              Approved
                            </option>

                            <option value="declined">
                              Declined
                            </option>

                          </select>

                          {updatingId ===
                          item._id ? (
                            <span
                              style={
                                styles.updating
                              }
                            >
                              Updating...
                            </span>
                          ) : null}

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </main>

      {/* ===========================================
          RESPONSIVE CSS
      =========================================== */}

      <style>{`

        .subscription-spinner {
          animation:
            subscriptionSpin
            1s linear infinite;
        }

        .subscription-refresh-button {
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .subscription-refresh-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 8px 18px
            rgba(23, 96, 57, 0.12);
        }

        .subscription-empty-button {
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .subscription-empty-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 8px 18px
            rgba(23, 96, 57, 0.20);
        }

        .subscription-select {
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .subscription-select:focus {
          border-color: #8caf91 !important;
          box-shadow:
            0 0 0 3px
            rgba(47, 107, 63, 0.08);
        }

        .subscription-select:disabled {
          cursor: not-allowed;
        }

        @keyframes subscriptionSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1250px) {

          main {
            margin-left: 250px;
            width: calc(100% - 250px);
          }

          .subscription-summary-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .subscription-details-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        /* =========================================
           SMALL TABLET
        ========================================= */

        @media (max-width: 1100px) {

          main {
            margin-left: 0 !important;
            width: 100% !important;
          }

        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 850px) {

          main {
            padding: 24px 20px !important;
          }

          .subscription-summary-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;
          }

          .subscription-details-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;
          }

          .subscription-header-title {
            font-size: 32px !important;
          }

          .subscription-header {
            align-items: flex-start !important;
          }

          .subscription-card-header {
            align-items: flex-start !important;
            flex-direction: column !important;
          }

          .subscription-request-header {
            flex-direction: column !important;
          }

          .subscription-status-section {
            width: 100% !important;
            text-align: left !important;
          }

          .subscription-action-area {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .subscription-status-control {
            width: 100% !important;
          }

          .subscription-select {
            width: 100% !important;
          }

        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

          main {
            padding: 20px 12px !important;
          }

        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 600px) {

          .subscription-page {
            padding-bottom: 30px !important;
          }

          .subscription-summary-grid {
            grid-template-columns: 1fr !important;
          }

          .subscription-details-grid {
            grid-template-columns: 1fr !important;
          }

          .subscription-header-title {
            font-size: 28px !important;
          }

          .subscription-header-subtitle {
            font-size: 12px !important;
          }

          .subscription-refresh-button {
            width: 100%;
          }

          .subscription-list {
            padding: 12px !important;
          }

          .subscription-request-header {
            padding: 17px !important;
          }

          .subscription-customer-section {
            width: 100%;
          }

          .subscription-contact-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }

          .subscription-details-grid {
            gap: 1px !important;
          }

          .subscription-action-area {
            padding: 15px !important;
          }

          .subscription-card-header {
            padding: 20px !important;
          }

          .subscription-status-control {
            min-width: 0 !important;
          }

        }

      `}</style>

    </div>
  );
}

export default AdminSubscriptions;

