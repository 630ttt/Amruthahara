
import React, { useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import {
  FaLeaf,
  FaCheck,
  FaSyncAlt,
  FaCrown,
} from "react-icons/fa";

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

  plans: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    width: "100%",
  },

  plan: {
    background: "#fff",
    border: "1px solid #e3ebe4",
    borderRadius: "16px",
    padding: "25px",
    boxShadow:
      "0 8px 25px rgba(30,70,40,0.05)",
    boxSizing: "border-box",
    minWidth: 0,
    transition:
      "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
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
    margin: 0,
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
    alignItems: "flex-start",
    gap: "8px",
    color: "#536258",
    fontSize: "13px",
    lineHeight: "1.5",
    marginBottom: "9px",
  },

  featureIcon: {
    color: "#39764b",
    fontSize: "11px",
    marginTop: "3px",
    flexShrink: 0,
  },

  button: {
    width: "100%",
    minHeight: "44px",
    marginTop: "18px",
    background: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    padding: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    transition: "all .2s ease",
  },

  activeBox: {
    marginBottom: "30px",
    background:
      "linear-gradient(135deg, #eaf7ed, #f8fcf8)",
    border: "1px solid #d6e8d9",
    borderRadius: "16px",
    padding: "25px",
    boxSizing: "border-box",
    width: "100%",
  },

  activeHeader: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "8px",
  },

  activeTitle: {
    color: "#23432e",
    fontSize: "19px",
    fontWeight: "800",
    margin: 0,
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

  activePrice: {
    color: "#536258",
    fontSize: "14px",
    margin: "0 0 18px",
  },

  cancelButton: {
    width: "auto",
    minHeight: "42px",
    background: "#fff",
    color: "#c6535c",
    border: "1px solid #ead5d7",
    borderRadius: "9px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
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
    <>
      <div
        className="subscription-page"
        style={styles.page}
      >
        <UserSidebar />

        <main
          style={styles.content}
          className="subscription-content"
        >
          {/* ================================
              HEADER
          ================================= */}

          <div
            style={styles.header}
            className="subscription-header"
          >
            <div style={styles.eyebrow}>
              <FaCrown size={10} />
              AMRUTHAHARA MEMBERSHIP
            </div>

            <h1
              style={styles.title}
              className="subscription-title"
            >
              Subscriptions
            </h1>

            <p
              style={styles.subtitle}
              className="subscription-subtitle"
            >
              Get your favorite Amruthahara
              products delivered regularly.
            </p>
          </div>

          {/* ================================
              ACTIVE SUBSCRIPTION
          ================================= */}

          {activeSubscription && (
            <div
              style={styles.activeBox}
              className="active-subscription"
            >
              <div style={styles.activeHeader}>
                <FaSyncAlt
                  color="#175c38"
                  size={17}
                />

                <div style={styles.activeTitle}>
                  {activeSubscription.name}
                </div>
              </div>

              <span style={styles.activeStatus}>
                ACTIVE
              </span>

              <p style={styles.activePrice}>
                ₹{activeSubscription.price} / month
              </p>

              <button
                type="button"
                onClick={cancelSubscription}
                style={styles.cancelButton}
                className="cancel-button"
              >
                Cancel Subscription
              </button>
            </div>
          )}

          {/* ================================
              PLANS
          ================================= */}

          <div
            style={styles.plans}
            className="subscription-plans"
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={styles.plan}
                className="subscription-plan"
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-4px)";

                  event.currentTarget.style.boxShadow =
                    "0 14px 32px rgba(30,70,40,0.09)";

                  event.currentTarget.style.borderColor =
                    "#d1e1d4";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";

                  event.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(30,70,40,0.05)";

                  event.currentTarget.style.borderColor =
                    "#e3ebe4";
                }}
              >
                {/* ICON */}

                <div style={styles.icon}>
                  {plan.id === "wellness" ? (
                    <FaLeaf />
                  ) : (
                    <FaSyncAlt />
                  )}
                </div>

                {/* TITLE */}

                <div style={styles.planTitle}>
                  {plan.name}
                </div>

                {/* DESCRIPTION */}

                <p style={styles.description}>
                  {plan.description}
                </p>

                {/* PRICE */}

                <div style={styles.price}>
                  ₹{plan.price}

                  <span style={styles.priceSmall}>
                    {" "}
                    / month
                  </span>
                </div>

                {/* FEATURES */}

                <div style={styles.feature}>
                  <FaCheck
                    style={styles.featureIcon}
                  />

                  <span>
                    Monthly delivery
                  </span>
                </div>

                <div style={styles.feature}>
                  <FaCheck
                    style={styles.featureIcon}
                  />

                  <span>
                    Premium quality products
                  </span>
                </div>

                <div style={styles.feature}>
                  <FaCheck
                    style={styles.featureIcon}
                  />

                  <span>
                    Easy subscription management
                  </span>
                </div>

                {/* BUTTON */}

                <button
                  type="button"
                  style={{
                    ...styles.button,
                    background:
                      activeSubscription?.id ===
                      plan.id
                        ? "#dcecdf"
                        : "#175c38",
                    color:
                      activeSubscription?.id ===
                      plan.id
                        ? "#176338"
                        : "#fff",
                    cursor:
                      activeSubscription?.id ===
                      plan.id
                        ? "default"
                        : "pointer",
                  }}
                  onClick={() => subscribe(plan)}
                  disabled={
                    activeSubscription?.id ===
                    plan.id
                  }
                  onMouseEnter={(event) => {
                    if (
                      activeSubscription?.id !==
                      plan.id
                    ) {
                      event.currentTarget.style.background =
                        "#124a2d";
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (
                      activeSubscription?.id !==
                      plan.id
                    ) {
                      event.currentTarget.style.background =
                        "#175c38";
                    }
                  }}
                >
                  {activeSubscription?.id ===
                  plan.id
                    ? "Subscribed"
                    : "Subscribe Now"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* =========================================
          RESPONSIVE DESIGN
      ========================================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }

        /* =================================
           DESKTOP
        ================================= */

        .subscription-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
        }

        .subscription-content {
          min-width: 0;
        }

        /* =================================
           TABLET
        ================================= */

        @media (max-width: 950px) {
          .subscription-content {
            width: calc(100% - 215px) !important;
            padding: 35px 30px !important;
          }

          .subscription-plan {
            padding: 22px !important;
          }
        }

        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {
          .subscription-page {
            display: block !important;
            width: 100% !important;
            min-height: 100vh !important;
          }

          .subscription-content {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 28px 20px 40px !important;
            margin: 0 !important;
          }

          .subscription-header {
            width: 100% !important;
            margin-bottom: 25px !important;
          }

          .subscription-title {
            font-size: 27px !important;
          }

          .subscription-subtitle {
            font-size: 13px !important;
          }

          .active-subscription {
            width: 100% !important;
            padding: 20px !important;
            margin-bottom: 22px !important;
          }

          .subscription-plans {
            display: grid !important;
            grid-template-columns: 1fr !important;
            width: 100% !important;
            gap: 16px !important;
          }

          .subscription-plan {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 22px 20px !important;
            border-radius: 14px !important;
            transform: none !important;
          }

          .subscription-plan:hover {
            transform: none !important;
          }

          .subscription-plan button {
            width: 100% !important;
          }
        }

        /* =================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 480px) {
          .subscription-content {
            padding: 24px 15px 35px !important;
          }

          .subscription-title {
            font-size: 24px !important;
          }

          .subscription-subtitle {
            font-size: 12px !important;
            line-height: 1.6 !important;
          }

          .subscription-plan {
            padding: 20px 17px !important;
          }

          .active-subscription {
            padding: 18px !important;
            border-radius: 14px !important;
          }

          .active-title {
            font-size: 17px !important;
          }

          .cancel-button {
            width: 100% !important;
          }
        }

        /* =================================
           VERY SMALL PHONES
        ================================= */

        @media (max-width: 360px) {
          .subscription-content {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .subscription-title {
            font-size: 22px !important;
          }

          .subscription-plan {
            padding: 18px 15px !important;
          }

          .subscription-plan .subscription-plan {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default SubscriptionsPage;

