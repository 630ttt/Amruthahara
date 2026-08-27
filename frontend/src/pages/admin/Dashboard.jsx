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
  FaClipboardList,
} from "react-icons/fa";

const API_URL = "http://localhost:5000";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "8px",
    boxSizing: "border-box",
    color: "#20382a",
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
  },

  heroCircleTwo: {
    position: "absolute",
    width: "190px",
    height: "190px",
    borderRadius: "50%",
    border: "1px solid rgba(216,185,110,0.18)",
    right: "100px",
    bottom: "-125px",
  },

  heroLeaf: {
    position: "absolute",
    right: "45px",
    bottom: "35px",
    fontSize: "70px",
    color: "rgba(255,255,255,0.055)",
    transform: "rotate(-18deg)",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
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
    gridTemplateColumns:
      "repeat(auto-fit, minmax(205px, 1fr))",
    gap: "17px",
    marginBottom: "32px",
  },

  statCard: {
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
    marginBottom: "20px",
  },

  statIcon: {
    width: "43px",
    height: "43px",
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
  },

  statDecor: {
    position: "absolute",
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    right: "-35px",
    bottom: "-35px",
    background: "#f5f8f5",
  },

  /* ================= CONTENT ================= */

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    gap: "20px",
  },

  panel: {
    background: "#fff",
    border: "1px solid #e6ece7",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 25px rgba(30,65,43,0.05)",
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  },

  viewAll: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
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
  },

  activityLast: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0 3px",
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
  },

  /* ================= QUICK ACTIONS ================= */

  quickActions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  action: {
    minHeight: "108px",
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

  /* ================= LOADING ================= */

  loading: {
    color: "#8b968e",
    fontSize: "12px",
  },
};

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [loadingUsers, setLoadingUsers] =
    useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      /* ================= PRODUCTS ================= */

      try {
        setLoadingProducts(true);

        const productsResponse = await fetch(
          `${API_URL}/api/products`
        );

        const productsData =
          await productsResponse.json();

        if (
          productsData.success &&
          Array.isArray(productsData.products)
        ) {
          setProductCount(
            productsData.products.length
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );
      } finally {
        setLoadingProducts(false);
      }

      /* ================= USERS ================= */

      try {
        setLoadingUsers(true);

        const usersResponse = await fetch(
          `${API_URL}/api/admin/users`
        );

        const usersData =
          await usersResponse.json();

        if (
          usersData.success &&
          Array.isArray(usersData.users)
        ) {
          setUserCount(
            usersData.users.length
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error
        );
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div style={styles.page}>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section style={styles.hero}>

          <div style={styles.heroCircleOne}></div>

          <div style={styles.heroCircleTwo}></div>

          <FaLeaf style={styles.heroLeaf} />

          <div style={styles.heroContent}>

            <div style={styles.eyebrow}>
              <FaLeaf size={10} />
              Amruthahara Administration
            </div>

            <h1 style={styles.heroTitle}>
              Welcome to your Admin Panel
            </h1>

            <p style={styles.heroText}>
              Manage your premium organic marketplace,
              products and customers from one elegant
              workspace.
            </p>

            <div style={styles.heroBottom}>

              <div style={styles.status}>
                <span style={styles.statusDot}></span>

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

        <h2 style={styles.sectionTitle}>
          Overview
        </h2>

        <div style={styles.statsGrid}>

          {/* PRODUCTS */}

          <div style={styles.statCard}>

            <div style={styles.statDecor}></div>

            <div style={styles.statTop}>

              <div style={styles.statIcon}>
                <FaBoxOpen />
              </div>

              <span style={styles.statLabel}>
                PRODUCTS
              </span>

            </div>

            <h3 style={styles.statValue}>
              {loadingProducts ? (
                <span style={styles.loading}>
                  Loading...
                </span>
              ) : (
                productCount
              )}
            </h3>

            <p style={styles.statChange}>
              Active products
            </p>

          </div>

          {/* SALES */}

          <div style={styles.statCard}>

            <div style={styles.statDecor}></div>

            <div style={styles.statTop}>

              <div style={styles.statIcon}>
                <FaShoppingBag />
              </div>

              <span style={styles.statLabel}>
                SALES
              </span>

            </div>

            <h3 style={styles.statValue}>
              ₹0
            </h3>

            <p style={styles.statChange}>
              Sales tracking coming soon
            </p>

          </div>

          {/* USERS */}

          <div style={styles.statCard}>

            <div style={styles.statDecor}></div>

            <div style={styles.statTop}>

              <div style={styles.statIcon}>
                <FaUsers />
              </div>

              <span style={styles.statLabel}>
                USERS
              </span>

            </div>

            <h3 style={styles.statValue}>
              {loadingUsers ? (
                <span style={styles.loading}>
                  Loading...
                </span>
              ) : (
                userCount
              )}
            </h3>

            <p style={styles.statChange}>
              Registered customers
            </p>

          </div>

          {/* GROWTH */}

          <div style={styles.statCard}>

            <div style={styles.statDecor}></div>

            <div style={styles.statTop}>

              <div style={styles.statIcon}>
                <FaChartLine />
              </div>

              <span style={styles.statLabel}>
                GROWTH
              </span>

            </div>

            <h3 style={styles.statValue}>
              0%
            </h3>

            <p style={styles.statChange}>
              Analytics coming soon
            </p>

          </div>

        </div>

        {/* =====================================================
            LOWER CONTENT
        ===================================================== */}

        <div style={styles.contentGrid}>

          {/* ================= RECENT ACTIVITY ================= */}

          <div style={styles.panel}>

            <div style={styles.panelHeader}>

              <div>

                <h3 style={styles.panelTitle}>
                  Recent Activity
                </h3>

                <p style={styles.panelSubtitle}>
                  Current activity across your store
                </p>

              </div>

              <Link
                to="/admin/products"
                style={styles.viewAll}
              >
                Products
                <FaArrowRight size={8} />
              </Link>

            </div>

            {/* PRODUCT ACTIVITY */}

            <div style={styles.activity}>

              <div style={styles.activityIcon}>
                <FaBoxOpen />
              </div>

              <div style={styles.activityContent}>

                <p style={styles.activityTitle}>
                  Product catalog
                </p>

                <p style={styles.activityTime}>
                  {loadingProducts
                    ? "Loading product information..."
                    : `${productCount} active products available`}
                </p>

              </div>

            </div>

            {/* USER ACTIVITY */}

            <div style={styles.activity}>

              <div style={styles.activityIcon}>
                <FaUsers />
              </div>

              <div style={styles.activityContent}>

                <p style={styles.activityTitle}>
                  Customer accounts
                </p>

                <p style={styles.activityTime}>
                  {loadingUsers
                    ? "Loading customer information..."
                    : `${userCount} registered customers`}
                </p>

              </div>

            </div>

            {/* SALES ACTIVITY */}

            <div style={styles.activityLast}>

              <div style={styles.activityIcon}>
                <FaShoppingBag />
              </div>

              <div style={styles.activityContent}>

                <p style={styles.activityTitle}>
                  Sales activity
                </p>

                <p style={styles.activityTime}>
                  Sales analytics will appear here
                  once payment tracking is enabled.
                </p>

              </div>

            </div>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div style={styles.panel}>

            <div style={styles.panelHeader}>

              <div>

                <h3 style={styles.panelTitle}>
                  Quick Actions
                </h3>

                <p style={styles.panelSubtitle}>
                  Frequently used tools
                </p>

              </div>

            </div>

            <div style={styles.quickActions}>

              {/* ADD PRODUCT */}

              <Link
                to="/admin/products"
                style={styles.action}
              >

                <div style={styles.actionIcon}>
                  <FaPlus />
                </div>

                <p style={styles.actionTitle}>
                  Add Product
                </p>

                <p style={styles.actionText}>
                  Add a new organic product
                </p>

              </Link>

              {/* PRODUCTS */}

              <Link
                to="/admin/products"
                style={styles.action}
              >

                <div style={styles.actionIcon}>
                  <FaBoxOpen />
                </div>

                <p style={styles.actionTitle}>
                  Products
                </p>

                <p style={styles.actionText}>
                  Manage your catalog
                </p>

              </Link>

              {/* USERS */}

              <Link
                to="/admin/users"
                style={styles.action}
              >

                <div style={styles.actionIcon}>
                  <FaUsers />
                </div>

                <p style={styles.actionTitle}>
                  Users
                </p>

                <p style={styles.actionText}>
                  View registered customers
                </p>

              </Link>

              {/* ANALYTICS */}

              <Link
                to="/admin/dashboard"
                style={styles.action}
              >

                <div style={styles.actionIcon}>
                  <FaChartLine />
                </div>

                <p style={styles.actionTitle}>
                  Analytics
                </p>

                <p style={styles.actionText}>
                  Monitor store performance
                </p>

              </Link>

            </div>

          </div>

        </div>

        {/* =====================================================
            PREMIUM INSIGHT
        ===================================================== */}

        <div style={styles.insight}>

          <div style={styles.insightIcon}>
            <FaLeaf />
          </div>

          <div>

            <p style={styles.insightTitle}>
              Growing something meaningful
            </p>

            <p style={styles.insightText}>
              Amruthahara brings nature closer to every
              home. Keep your products, customers and
              marketplace experience beautifully organized.
            </p>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Dashboard;