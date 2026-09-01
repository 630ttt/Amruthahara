import React from "react";
import UserSidebar from "../../components/user/UserSidebar";
import SubscriptionRequestSection from "../components/subscription/SubscriptionRequestSection";
import { FaCrown } from "react-icons/fa";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    display: "flex",
    width: "100%",
    overflowX: "hidden",
    boxSizing: "border-box",
  },

  content: {
    flex: 1,
    width: "calc(100% - 250px)",
    minWidth: 0,
    padding: "45px 5%",
    boxSizing: "border-box",
  },

  header: {
    marginBottom: "35px",
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    color: "#39764b",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "9px",
  },

  title: {
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    margin: "0 0 8px",
    lineHeight: "1.25",
  },

  subtitle: {
    color: "#78847b",
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.7",
  },
};

function SubscriptionsPage() {
  return (
    <div className="subscription-page" style={styles.page}>
      <UserSidebar />

      <main style={styles.content} className="subscription-content">
        <div style={styles.header} className="subscription-header">
          <div style={styles.eyebrow}>
            <FaCrown size={10} />
            AMRUTHAHARA MEMBERSHIP
          </div>

          <h1 style={styles.title} className="subscription-title">
            Subscriptions
          </h1>

          <p style={styles.subtitle} className="subscription-subtitle">
            Send a subscription request and track its status from your
            dashboard.
          </p>
        </div>

        <SubscriptionRequestSection />
      </main>

      <style>{`
        @media (max-width: 900px) {
          .subscription-page {
            display: block;
          }
          .subscription-content {
            width: 100% !important;
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default SubscriptionsPage;
