import React, { useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import { FaLeaf, FaCheck, FaSyncAlt } from "react-icons/fa";

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
    marginBottom: "35px",
  },

  plans: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  plan: {
    background: "#fff",
    border: "1px solid #e3ebe4",
    borderRadius: "16px",
    padding: "25px",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
  },

  icon: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: "#eaf5ed",
    color: "#175c38",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    marginBottom: "17px",
  },

  planTitle: {
    color: "#23432e",
    fontSize: "18px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  description: {
    color: "#748078",
    fontSize: "13px",
    lineHeight: "1.6",
    minHeight: "45px",
  },

  price: {
    color: "#175c38",
    fontSize: "25px",
    fontWeight: "800",
    margin: "18px 0",
  },

  priceSmall: {
    fontSize: "12px",
    color: "#7b887e",
    fontWeight: "500",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#536258",
    fontSize: "13px",
    marginBottom: "9px",
  },

  button: {
    width: "100%",
    marginTop: "18px",
    background: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    padding: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  activeBox: {
    marginBottom: "30px",
    background:
      "linear-gradient(135deg, #eaf7ed, #f8fcf8)",
    border: "1px solid #d6e8d9",
    borderRadius: "16px",
    padding: "25px",
  },

  activeTitle: {
    color: "#23432e",
    fontSize: "19px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  activeStatus: {
    display: "inline-block",
    background: "#d8f0dd",
    color: "#176338",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "800",
    marginBottom: "12px",
  },
};

function SubscriptionsPage() {
  const [activeSubscription, setActiveSubscription] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "amruthahara_subscription"
          )
        );
      } catch {
        return null;
      }
    });

  const subscribe = (plan) => {
    const subscription = {
      ...plan,
      status: "Active",
      startDate: new Date().toISOString(),
    };

    localStorage.setItem(
      "amruthahara_subscription",
      JSON.stringify(subscription)
    );

    setActiveSubscription(subscription);
  };

  const cancelSubscription = () => {
    localStorage.removeItem(
      "amruthahara_subscription"
    );

    setActiveSubscription(null);
  };

  const plans = [
    {
      id: "wellness",
      name: "Wellness Box",
      price: 999,
      description:
        "A curated monthly collection of natural wellness products.",
    },
    {
      id: "honey",
      name: "Pure Honey Plan",
      price: 699,
      description:
        "Fresh natural honey delivered regularly to your home.",
    },
    {
      id: "organic",
      name: "Organic Essentials",
      price: 1499,
      description:
        "Premium organic farm products delivered every month.",
    },
  ];

  return (
    <div style={styles.page}>
      <UserSidebar />

      <main style={styles.content}>
        <h1 style={styles.title}>
          Subscriptions
        </h1>

        <p style={styles.subtitle}>
          Get your favorite Amruthahara products
          delivered regularly.
        </p>

        {activeSubscription && (
          <div style={styles.activeBox}>
            <div style={styles.activeTitle}>
              <FaSyncAlt />{" "}
              {activeSubscription.name}
            </div>

            <span style={styles.activeStatus}>
              ACTIVE
            </span>

            <p>
              ₹{activeSubscription.price} / month
            </p>

            <button
              onClick={cancelSubscription}
              style={{
                ...styles.button,
                width: "auto",
                background: "#fff",
                color: "#c6535c",
                border: "1px solid #ead5d7",
              }}
            >
              Cancel Subscription
            </button>
          </div>
        )}

        <div style={styles.plans}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={styles.plan}
            >
              <div style={styles.icon}>
                {plan.id === "wellness" ? (
                  <FaLeaf />
                ) : (
                  <FaSyncAlt />
                )}
              </div>

              <div style={styles.planTitle}>
                {plan.name}
              </div>

              <p style={styles.description}>
                {plan.description}
              </p>

              <div style={styles.price}>
                ₹{plan.price}
                <span style={styles.priceSmall}>
                  {" "}
                  / month
                </span>
              </div>

              <div style={styles.feature}>
                <FaCheck />
                Monthly delivery
              </div>

              <div style={styles.feature}>
                <FaCheck />
                Premium quality products
              </div>

              <div style={styles.feature}>
                <FaCheck />
                Easy subscription management
              </div>

              <button
                style={styles.button}
                onClick={() => subscribe(plan)}
              >
                {activeSubscription?.id === plan.id
                  ? "Subscribed"
                  : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SubscriptionsPage;