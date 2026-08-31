import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
 
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
  FaChartLine,
  FaPlus,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";
import { API_BASE_URL } from "../../services/apiBase";
 
const styles = {
 page: {
  minHeight: "100vh",
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  color: "#20382a",
  overflowX: "hidden",
  marginLeft: "-215px",
},
 
  /* ================= HERO ================= */
 
  hero: {
    background:
      "linear-gradient(135deg, #123d27 0%, #1d5a38 55%, #2f7048 100%)",
    borderRadius: "24px",
    padding: "38px 42px",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    boxShadow: "0 18px 45px rgba(24, 74, 45, 0.16)",
    marginBottom: "30px",
  },
 
  heroCircleOne: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.09)",
    right: "-120px",
    top: "-150px",
    pointerEvents: "none",
  },
 
  heroCircleTwo: {
    position: "absolute",
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    border: "1px solid rgba(216,185,110,0.18)",
    right: "100px",
    bottom: "-125px",
    pointerEvents: "none",
  },
 
  heroLeaf: {
    position: "absolute",
    right: "45px",
    bottom: "35px",
    fontSize: "70px",
    color: "rgba(255,255,255,0.055)",
    transform: "rotate(-18deg)",
    pointerEvents: "none",
  },
 
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "720px",
  },
 
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#dfc27b",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "13px",
  },
 
  heroTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "34px",
    fontWeight: "500",
    letterSpacing: "-0.5px",
    lineHeight: "1.2",
  },
 
  heroText: {
    margin: "11px 0 0",
    maxWidth: "650px",
    color: "rgba(255,255,255,0.72)",
    fontSize: "13px",
    lineHeight: "1.75",
  },
 
  heroBottom: {
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },
 
  status: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.78)",
  },
 
  statusDot: {
    width: "8px",
    height: "8px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#8bc47d",
    boxShadow: "0 0 0 5px rgba(139,196,125,0.12)",
  },
 
  date: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "11px",
  },
 
  /* ================= SECTION ================= */
 
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "22px",
    fontWeight: "500",
    color: "#20382a",
    margin: "0 0 17px",
  },
 
  /* ================= STATS ================= */
 
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "17px",
    marginBottom: "32px",
    width: "100%",
  },
 
  statCard: {
    minWidth: 0,
    background: "#fff",
    border: "1px solid #e6ece7",
    borderRadius: "19px",
    padding: "22px",
    boxShadow: "0 8px 25px rgba(30,65,43,0.055)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
 
  statTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
  },
 
  statIcon: {
    width: "43px",
    height: "43px",
    flexShrink: 0,
    borderRadius: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#edf5ee",
    color: "#286341",
    fontSize: "16px",
  },
 
  statLabel: {
    color: "#89958c",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
 
  statValue: {
    fontFamily: "Georgia, serif",
    fontSize: "30px",
    color: "#20382a",
    margin: 0,
    fontWeight: "500",
  },
 
  statChange: {
    margin: "7px 0 0",
    color: "#748279",
    fontSize: "10px",
    lineHeight: "1.5",
  },
 
  statDecor: {
    position: "absolute",
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    right: "-35px",
    bottom: "-35px",
    background: "#f5f8f5",
    pointerEvents: "none",
  },
 
  /* ================= CONTENT ================= */
 
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.7fr)",
    gap: "20px",
    width: "100%",
  },
 
  panel: {
    minWidth: 0,
    background: "#fff",
    border: "1px solid #e6ece7",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 25px rgba(30,65,43,0.05)",
  },
 
  panelHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "19px",
  },
 
  panelTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "19px",
    fontWeight: "500",
    color: "#20382a",
  },
 
  panelSubtitle: {
    margin: "5px 0 0",
    fontSize: "10px",
    color: "#929d95",
    lineHeight: "1.5",
  },
 
  viewAll: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
    color: "#276341",
    textDecoration: "none",
    fontSize: "10px",
    fontWeight: "800",
  },
 
  /* ================= ACTIVITY ================= */
 
  activity: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderBottom: "1px solid #edf1ed",
    minWidth: 0,
  },
 
  activityLast: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0 3px",
    minWidth: 0,
  },
 
  activityIcon: {
    width: "39px",
    height: "39px",
    flexShrink: 0,
    borderRadius: "12px",
    background: "#f1f6f1",
    color: "#316b48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
 
  activityContent: {
    flex: 1,
    minWidth: 0,
  },
 
  activityTitle: {
    margin: 0,
    color: "#314438",
    fontSize: "12px",
    fontWeight: "700",
  },
 
  activityTime: {
    margin: "4px 0 0",
    color: "#9aa49d",
    fontSize: "10px",
    lineHeight: "1.5",
    wordBreak: "break-word",
  },
 
  /* ================= QUICK ACTIONS ================= */
 
  quickActions: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
  },
 
  action: {
    minHeight: "108px",
    minWidth: 0,
    border: "1px solid #e5ebe6",
    borderRadius: "15px",
    background: "#fbfdfb",
    padding: "17px",
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
    display: "block",
    boxSizing: "border-box",
    transition:
      "transform 0.2s ease, border-color 0.2s ease",
  },
 
  actionIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#edf5ee",
    color: "#286341",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "13px",
    fontSize: "13px",
  },
 
  actionTitle: {
    margin: 0,
    color: "#314438",
    fontSize: "11px",
    fontWeight: "800",
  },
 
  actionText: {
    margin: "5px 0 0",
    color: "#98a29b",
    fontSize: "9px",
    lineHeight: "1.4",
  },
 
  /* ================= INSIGHT ================= */
 
  insight: {
    marginTop: "20px",
    background:
      "linear-gradient(135deg, #f7f3e7, #fbfaf4)",
    border: "1px solid #eee6d0",
    borderRadius: "18px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    minWidth: 0,
  },
 
  insightIcon: {
    width: "43px",
    height: "43px",
    flexShrink: 0,
    borderRadius: "13px",
    background: "#fff",
    color: "#aa8b48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
 
  insightTitle: {
    margin: 0,
    color: "#5e5132",
    fontSize: "12px",
    fontWeight: "800",
  },
 
  insightText: {
    margin: "4px 0 0",
    color: "#897d61",
    fontSize: "10px",
    lineHeight: "1.5",
  },
 
  loading: {
    color: "#8b968e",
    fontSize: "12px",
  },
};
 
/* =========================================================
   RESPONSIVE STYLES
   No external CSS file required.
========================================================= */
 
const responsiveCSS = `

.page-responsive {
  margin-left: -210px;
  width: calc(100% + 210px);
  box-sizing: border-box;
}

@media (min-width: 1920px) {
  .page-responsive {
    margin-left: -210px;
    width: calc(100% + 210px);
  }
}

@media (min-width: 1600px) and (max-width: 1919px) {
  .page-responsive {
    margin-left: -190px;
    width: calc(100% + 190px);
  }
}

@media (min-width: 1440px) and (max-width: 1599px) {
  .page-responsive {
    margin-left: -170px;
    width: calc(100% + 170px);
  }
}

@media (min-width: 1280px) and (max-width: 1439px) {
  .page-responsive {
    margin-left: -150px;
    width: calc(100% + 150px);
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .page-responsive {
    margin-left: -100px;
    width: calc(100% + 100px);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .page-responsive {
    margin-left: -50px;
    width: calc(100% + 50px);
  }
}

@media (min-width: 600px) and (max-width: 767px) {
  .page-responsive {
    margin-left: 0;
    width: 100%;
  }
}

@media (min-width: 480px) and (max-width: 599px) {
  .page-responsive {
    margin-left: 0;
    width: 100%;
  }
}

@media (min-width: 360px) and (max-width: 479px) {
  .page-responsive {
    margin-left: 0;
    width: 100%;
  }
}

@media (max-width: 359px) {
  .page-responsive {
    margin-left: 0;
    width: 100%;
  }
}


  * {
    box-sizing: border-box;
  }
 
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
  }
 
  @media (max-width: 1200px) {
    .dashboard-stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
 
    .dashboard-content-grid {
      grid-template-columns: minmax(0, 1fr) !important;
    }
  }
 
  @media (max-width: 900px) {
    .dashboard-page {
      padding: 6px !important;
    }
 
    .dashboard-hero {
      padding: 32px !important;
      border-radius: 20px !important;
    }
 
    .dashboard-hero-title {
      font-size: 30px !important;
    }
 
    .dashboard-stats-grid {
      gap: 14px !important;
    }
 
    .dashboard-panel {
      padding: 20px !important;
    }
  }
 
  @media (max-width: 640px) {
    .dashboard-page {
      padding: 5px !important;
    }
 
    .dashboard-hero {
      padding: 27px 21px !important;
      margin-bottom: 24px !important;
      border-radius: 18px !important;
      min-height: 300px;
    }
 
    .dashboard-hero-circle-one {
      width: 220px !important;
      height: 220px !important;
      right: -110px !important;
      top: -115px !important;
    }
 
    .dashboard-hero-circle-two {
      width: 140px !important;
      height: 140px !important;
      right: 30px !important;
      bottom: -100px !important;
    }
 
    .dashboard-hero-leaf {
      right: 15px !important;
      bottom: 20px !important;
      font-size: 52px !important;
    }
 
    .dashboard-eyebrow {
      font-size: 9px !important;
      letter-spacing: 1.5px !important;
    }
 
    .dashboard-hero-title {
      font-size: clamp(26px, 8vw, 34px) !important;
      line-height: 1.18 !important;
    }
 
    .dashboard-hero-text {
      font-size: 12px !important;
      line-height: 1.65 !important;
    }
 
    .dashboard-hero-bottom {
      align-items: flex-start !important;
      flex-direction: column !important;
      gap: 10px !important;
      margin-top: 20px !important;
    }
 
    .dashboard-section-title {
      font-size: 20px !important;
      margin-bottom: 14px !important;
    }
 
    .dashboard-stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 10px !important;
      margin-bottom: 24px !important;
    }
 
    .dashboard-stat-card {
      padding: 16px !important;
      border-radius: 15px !important;
    }
 
    .dashboard-stat-top {
      margin-bottom: 15px !important;
    }
 
    .dashboard-stat-icon {
      width: 36px !important;
      height: 36px !important;
      border-radius: 10px !important;
      font-size: 13px !important;
    }
 
    .dashboard-stat-label {
      font-size: 8px !important;
      letter-spacing: 0.7px !important;
    }
 
    .dashboard-stat-value {
      font-size: 25px !important;
    }
 
    .dashboard-stat-change {
      font-size: 9px !important;
      line-height: 1.4 !important;
    }
 
    .dashboard-content-grid {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }
 
    .dashboard-panel {
      padding: 17px !important;
      border-radius: 16px !important;
    }
 
    .dashboard-panel-header {
      margin-bottom: 13px !important;
    }
 
    .dashboard-panel-title {
      font-size: 17px !important;
    }
 
    .dashboard-panel-subtitle {
      font-size: 9px !important;
    }
 
    .dashboard-view-all {
      font-size: 9px !important;
    }
 
    .dashboard-activity {
      gap: 10px !important;
      padding: 13px 0 !important;
    }
 
    .dashboard-activity-icon {
      width: 35px !important;
      height: 35px !important;
      border-radius: 10px !important;
      font-size: 12px !important;
    }
 
    .dashboard-activity-title {
      font-size: 11px !important;
    }
 
    .dashboard-activity-time {
      font-size: 9px !important;
    }
 
    .dashboard-quick-actions {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 9px !important;
    }
 
    .dashboard-action {
      min-height: 100px !important;
      padding: 13px !important;
      border-radius: 13px !important;
    }
 
    .dashboard-action-icon {
      width: 31px !important;
      height: 31px !important;
      margin-bottom: 10px !important;
      border-radius: 9px !important;
    }
 
    .dashboard-action-title {
      font-size: 10px !important;
    }
 
    .dashboard-action-text {
      font-size: 8px !important;
    }
 
    .dashboard-insight {
      padding: 15px !important;
      gap: 11px !important;
      border-radius: 15px !important;
    }
 
    .dashboard-insight-icon {
      width: 38px !important;
      height: 38px !important;
      border-radius: 10px !important;
    }
 
    .dashboard-insight-title {
      font-size: 11px !important;
    }
 
    .dashboard-insight-text {
      font-size: 9px !important;
    }
  }
 
  @media (max-width: 390px) {
    .dashboard-hero {
      padding: 24px 17px !important;
    }
 
    .dashboard-stats-grid {
      grid-template-columns: 1fr !important;
    }
 
    .dashboard-stat-card {
      padding: 15px !important;
    }
 
    .dashboard-quick-actions {
      grid-template-columns: 1fr !important;
    }
 
    .dashboard-action {
      min-height: 90px !important;
    }
 
    .dashboard-insight {
      align-items: flex-start !important;
    }
  }
`;
 
function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [sales, setSales] = useState({
    grossSales: 0,
    collectedIncome: 0,
    activeOrders: 0,
    monthGrowth: 0,
    thisMonthSales: 0,
    recentOrders: [],
  });
 
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
 
  useEffect(() => {
    const fetchDashboardData = async () => {
      /* ================= PRODUCTS ================= */
 
      try {
        setLoadingProducts(true);
 
        const productsResponse = await fetch(
          `${API_BASE_URL}/api/products`
        );
 
        if (!productsResponse.ok) {
          throw new Error(
            `Products request failed: ${productsResponse.status}`
          );
        }
 
        const productsData = await productsResponse.json();
 
        if (
          productsData.success &&
          Array.isArray(productsData.products)
        ) {
          setProductCount(productsData.products.length);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
 
      /* ================= USERS ================= */
 
      try {
        setLoadingUsers(true);
 
        const usersResponse = await fetch(
          `${API_BASE_URL}/api/admin/users`
        );
 
        if (!usersResponse.ok) {
          throw new Error(
            `Users request failed: ${usersResponse.status}`
          );
        }
 
        const usersData = await usersResponse.json();
 
        if (
          usersData.success &&
          Array.isArray(usersData.users)
        ) {
          setUserCount(usersData.users.length);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoadingUsers(false);
      }

      try {
        setLoadingSales(true);
        const token = localStorage.getItem("adminToken");
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const salesResponse = await fetch(
          `${API_BASE_URL}/api/admin/analytics`,
          { headers }
        );
        const salesData = await salesResponse.json();

        if (salesResponse.ok && salesData.success && salesData.analytics) {
          const totals = salesData.analytics.totals || {};
          setSales({
            grossSales: totals.grossSales || 0,
            collectedIncome: totals.collectedIncome || 0,
            activeOrders: totals.activeOrders || 0,
            monthGrowth: totals.monthGrowth || 0,
            thisMonthSales: totals.thisMonthSales || 0,
            recentOrders: salesData.analytics.recentOrders || [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch sales analytics:", error);
      } finally {
        setLoadingSales(false);
      }
    };
 
    fetchDashboardData();
  }, []);
 
  return (
    <>
      <style>{responsiveCSS}</style>
 
      <AdminLayout>
        <div
          className="dashboard-page"
          style={styles.page}
        >
          {/* =====================================================
              HERO
          ===================================================== */}
 
          <section
            className="dashboard-hero"
            style={styles.hero}
          >
            <div
              className="dashboard-hero-circle-one"
              style={styles.heroCircleOne}
            />
 
            <div
              className="dashboard-hero-circle-two"
              style={styles.heroCircleTwo}
            />
 
            <FaLeaf
              className="dashboard-hero-leaf"
              style={styles.heroLeaf}
            />
 
            <div style={styles.heroContent}>
              <div
                className="dashboard-eyebrow"
                style={styles.eyebrow}
              >
                <FaLeaf size={10} />
                Amruthahara Administration
              </div>
 
              <h1
                className="dashboard-hero-title"
                style={styles.heroTitle}
              >
                Welcome to your Admin Panel
              </h1>
 
              <p
                className="dashboard-hero-text"
                style={styles.heroText}
              >
                Manage your premium organic marketplace,
                products and customers from one elegant
                workspace.
              </p>
 
              <div
                className="dashboard-hero-bottom"
                style={styles.heroBottom}
              >
                <div style={styles.status}>
                  <span style={styles.statusDot} />
                  All systems operational
                </div>
 
                <div style={styles.date}>
                  Premium Organic Marketplace
                </div>
              </div>
            </div>
          </section>
 
          {/* =====================================================
              OVERVIEW
          ===================================================== */}
 
          <h2
            className="dashboard-section-title"
            style={styles.sectionTitle}
          >
            Overview
          </h2>
 
          <div
            className="dashboard-stats-grid"
            style={styles.statsGrid}
          >
            {/* PRODUCTS */}
 
            <div
              className="dashboard-stat-card"
              style={styles.statCard}
            >
              <div style={styles.statDecor} />
 
              <div
                className="dashboard-stat-top"
                style={styles.statTop}
              >
                <div
                  className="dashboard-stat-icon"
                  style={styles.statIcon}
                >
                  <FaBoxOpen />
                </div>
 
                <span
                  className="dashboard-stat-label"
                  style={styles.statLabel}
                >
                  PRODUCTS
                </span>
              </div>
 
              <h3
                className="dashboard-stat-value"
                style={styles.statValue}
              >
                {loadingProducts ? (
                  <span style={styles.loading}>
                    Loading...
                  </span>
                ) : (
                  productCount
                )}
              </h3>
 
              <p
                className="dashboard-stat-change"
                style={styles.statChange}
              >
                Active products
              </p>
            </div>
 
            {/* SALES */}
 
            <div
              className="dashboard-stat-card"
              style={styles.statCard}
            >
              <div style={styles.statDecor} />
 
              <div
                className="dashboard-stat-top"
                style={styles.statTop}
              >
                <div
                  className="dashboard-stat-icon"
                  style={styles.statIcon}
                >
                  <FaShoppingBag />
                </div>
 
                <span
                  className="dashboard-stat-label"
                  style={styles.statLabel}
                >
                  SALES
                </span>
              </div>
 
              <h3
                className="dashboard-stat-value"
                style={styles.statValue}
              >
                {loadingSales ? (
                  <span style={styles.loading}>
                    Loading...
                  </span>
                ) : (
                  formatMoney(sales.grossSales)
                )}
              </h3>
 
              <p
                className="dashboard-stat-change"
                style={styles.statChange}
              >
                {sales.activeOrders} active orders ·{" "}
                {formatMoney(sales.collectedIncome)} collected
              </p>
            </div>
 
            {/* USERS */}
 
            <div
              className="dashboard-stat-card"
              style={styles.statCard}
            >
              <div style={styles.statDecor} />
 
              <div
                className="dashboard-stat-top"
                style={styles.statTop}
              >
                <div
                  className="dashboard-stat-icon"
                  style={styles.statIcon}
                >
                  <FaUsers />
                </div>
 
                <span
                  className="dashboard-stat-label"
                  style={styles.statLabel}
                >
                  USERS
                </span>
              </div>
 
              <h3
                className="dashboard-stat-value"
                style={styles.statValue}
              >
                {loadingUsers ? (
                  <span style={styles.loading}>
                    Loading...
                  </span>
                ) : (
                  userCount
                )}
              </h3>
 
              <p
                className="dashboard-stat-change"
                style={styles.statChange}
              >
                Registered customers
              </p>
            </div>
 
            {/* GROWTH */}
 
            <div
              className="dashboard-stat-card"
              style={styles.statCard}
            >
              <div style={styles.statDecor} />
 
              <div
                className="dashboard-stat-top"
                style={styles.statTop}
              >
                <div
                  className="dashboard-stat-icon"
                  style={styles.statIcon}
                >
                  <FaChartLine />
                </div>
 
                <span
                  className="dashboard-stat-label"
                  style={styles.statLabel}
                >
                  GROWTH
                </span>
              </div>
 
              <h3
                className="dashboard-stat-value"
                style={styles.statValue}
              >
                {loadingSales ? (
                  <span style={styles.loading}>
                    Loading...
                  </span>
                ) : (
                  `${Number(sales.monthGrowth || 0).toFixed(1)}%`
                )}
              </h3>
 
              <p
                className="dashboard-stat-change"
                style={styles.statChange}
              >
                {formatMoney(sales.thisMonthSales)} this month vs last month
              </p>
            </div>
          </div>
 
          {/* =====================================================
              LOWER CONTENT
          ===================================================== */}
 
          <div
            className="dashboard-content-grid"
            style={styles.contentGrid}
          >
            {/* ================= RECENT ACTIVITY ================= */}
 
            <div
              className="dashboard-panel"
              style={styles.panel}
            >
              <div
                className="dashboard-panel-header"
                style={styles.panelHeader}
              >
                <div style={{ minWidth: 0 }}>
                  <h3
                    className="dashboard-panel-title"
                    style={styles.panelTitle}
                  >
                    Recent Activity
                  </h3>
 
                  <p
                    className="dashboard-panel-subtitle"
                    style={styles.panelSubtitle}
                  >
                    Current activity across your store
                  </p>
                </div>
 
                <Link
                  to="/admin/analytics"
                  className="dashboard-view-all"
                  style={styles.viewAll}
                >
                  Analytics
                  <FaArrowRight size={8} />
                </Link>
              </div>
 
              {/* PRODUCT ACTIVITY */}
 
              <div
                className="dashboard-activity"
                style={styles.activity}
              >
                <div
                  className="dashboard-activity-icon"
                  style={styles.activityIcon}
                >
                  <FaBoxOpen />
                </div>
 
                <div style={styles.activityContent}>
                  <p
                    className="dashboard-activity-title"
                    style={styles.activityTitle}
                  >
                    Product catalog
                  </p>
 
                  <p
                    className="dashboard-activity-time"
                    style={styles.activityTime}
                  >
                    {loadingProducts
                      ? "Loading product information..."
                      : `${productCount} active products available`}
                  </p>
                </div>
              </div>
 
              {/* USER ACTIVITY */}
 
              <div
                className="dashboard-activity"
                style={styles.activity}
              >
                <div
                  className="dashboard-activity-icon"
                  style={styles.activityIcon}
                >
                  <FaUsers />
                </div>
 
                <div style={styles.activityContent}>
                  <p
                    className="dashboard-activity-title"
                    style={styles.activityTitle}
                  >
                    Customer accounts
                  </p>
 
                  <p
                    className="dashboard-activity-time"
                    style={styles.activityTime}
                  >
                    {loadingUsers
                      ? "Loading customer information..."
                      : `${userCount} registered customers`}
                  </p>
                </div>
              </div>
 
              {/* SALES ACTIVITY */}
 
              <div
                className="dashboard-activity"
                style={styles.activityLast}
              >
                <div
                  className="dashboard-activity-icon"
                  style={styles.activityIcon}
                >
                  <FaShoppingBag />
                </div>
 
                <div style={styles.activityContent}>
                  <p
                    className="dashboard-activity-title"
                    style={styles.activityTitle}
                  >
                    Sales activity
                  </p>
 
                  <p
                    className="dashboard-activity-time"
                    style={styles.activityTime}
                  >
                    {loadingSales
                      ? "Loading sales information..."
                      : sales.recentOrders[0]
                        ? `${sales.recentOrders[0].customer} · ${formatMoney(sales.recentOrders[0].amount)}`
                        : `${sales.activeOrders} active orders · ${formatMoney(sales.grossSales)} sales`}
                  </p>
                </div>
              </div>
            </div>
 
            {/* ================= QUICK ACTIONS ================= */}
 
            <div
              className="dashboard-panel"
              style={styles.panel}
            >
              <div
                className="dashboard-panel-header"
                style={styles.panelHeader}
              >
                <div>
                  <h3
                    className="dashboard-panel-title"
                    style={styles.panelTitle}
                  >
                    Quick Actions
                  </h3>
 
                  <p
                    className="dashboard-panel-subtitle"
                    style={styles.panelSubtitle}
                  >
                    Frequently used tools
                  </p>
                </div>
              </div>
 
              <div
                className="dashboard-quick-actions"
                style={styles.quickActions}
              >
                {/* ADD PRODUCT */}
 
                <Link
                  to="/admin/products"
                  className="dashboard-action"
                  style={styles.action}
                >
                  <div
                    className="dashboard-action-icon"
                    style={styles.actionIcon}
                  >
                    <FaPlus />
                  </div>
 
                  <p
                    className="dashboard-action-title"
                    style={styles.actionTitle}
                  >
                    Add Product
                  </p>
 
                  <p
                    className="dashboard-action-text"
                    style={styles.actionText}
                  >
                    Add a new organic product
                  </p>
                </Link>
 
                {/* PRODUCTS */}
 
                <Link
                  to="/admin/products"
                  className="dashboard-action"
                  style={styles.action}
                >
                  <div
                    className="dashboard-action-icon"
                    style={styles.actionIcon}
                  >
                    <FaBoxOpen />
                  </div>
 
                  <p
                    className="dashboard-action-title"
                    style={styles.actionTitle}
                  >
                    Products
                  </p>
 
                  <p
                    className="dashboard-action-text"
                    style={styles.actionText}
                  >
                    Manage your catalog
                  </p>
                </Link>
 
                {/* USERS */}
 
                <Link
                  to="/admin/users"
                  className="dashboard-action"
                  style={styles.action}
                >
                  <div
                    className="dashboard-action-icon"
                    style={styles.actionIcon}
                  >
                    <FaUsers />
                  </div>
 
                  <p
                    className="dashboard-action-title"
                    style={styles.actionTitle}
                  >
                    Users
                  </p>
 
                  <p
                    className="dashboard-action-text"
                    style={styles.actionText}
                  >
                    View registered customers
                  </p>
                </Link>
 
                {/* ANALYTICS */}
 
                <Link
                  to="/admin/analytics"
                  className="dashboard-action"
                  style={styles.action}
                >
                  <div
                    className="dashboard-action-icon"
                    style={styles.actionIcon}
                  >
                    <FaChartLine />
                  </div>
 
                  <p
                    className="dashboard-action-title"
                    style={styles.actionTitle}
                  >
                    Analytics
                  </p>
 
                  <p
                    className="dashboard-action-text"
                    style={styles.actionText}
                  >
                    Monitor store performance
                  </p>
                </Link>
              </div>
            </div>
          </div>
 
          {/* =====================================================
              PREMIUM INSIGHT
          ===================================================== */}
 
          <div
            className="dashboard-insight"
            style={styles.insight}
          >
            <div
              className="dashboard-insight-icon"
              style={styles.insightIcon}
            >
              <FaLeaf />
            </div>
 
            <div style={{ minWidth: 0 }}>
              <p
                className="dashboard-insight-title"
                style={styles.insightTitle}
              >
                Growing something meaningful
              </p>
 
              <p
                className="dashboard-insight-text"
                style={styles.insightText}
              >
                Amruthahara brings nature closer to every
                home. Keep your products, customers and
                marketplace experience beautifully organized.
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
 
export default Dashboard;
 
