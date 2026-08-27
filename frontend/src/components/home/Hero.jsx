import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    minHeight: "760px",
    height: "calc(100vh - 72px)",
    maxHeight: "900px",
    overflow: "hidden",
    background: "#10251A",
    color: "#FFFFFF",
  },

  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    transform: "scale(1.02)",
  },

  /* Main cinematic overlay */
  leftOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    background:
      "linear-gradient(90deg, rgba(8,25,15,0.93) 0%, rgba(8,28,16,0.82) 27%, rgba(8,28,16,0.48) 52%, rgba(8,28,16,0.12) 82%, rgba(8,28,16,0.20) 100%)",
  },

  /* Bottom cinematic fade */
  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "240px",
    zIndex: 1,
    background:
      "linear-gradient(180deg, transparent 0%, rgba(5,20,12,0.18) 35%, rgba(5,20,12,0.82) 100%)",
    pointerEvents: "none",
  },

  /* Very subtle green atmospheric glow */
  atmosphere: {
    position: "absolute",
    width: "550px",
    height: "550px",
    right: "-100px",
    top: "-150px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(167,198,123,0.15), transparent 68%)",
    filter: "blur(20px)",
    zIndex: 1,
    pointerEvents: "none",
  },

  container: {
    position: "relative",
    zIndex: 3,
    width: "90%",
    maxWidth: "1380px",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },

  content: {
    width: "100%",
    maxWidth: "720px",
    paddingTop: "25px",
    animation:
      "heroContentReveal 1.2s cubic-bezier(.22,1,.36,1) forwards",
  },

  brandLine: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "28px",
  },

  brandLineSmall: {
    width: "34px",
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, #B5CF91)",
  },

  eyebrow: {
    margin: 0,
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "3.2px",
    color: "#C9DCB0",
  },

  title: {
    margin: 0,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(62px, 7vw, 104px)",
    lineHeight: "0.88",
    fontWeight: "500",
    letterSpacing: "-3.5px",
    color: "#FFFFFF",
  },

  titleSecond: {
    display: "block",
    marginTop: "12px",
    color: "#B8D28F",
    fontStyle: "italic",
  },

  description: {
    maxWidth: "555px",
    margin: "32px 0 35px",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "15px",
    lineHeight: "1.85",
    fontWeight: "400",
    color: "rgba(255,255,255,0.72)",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "16px",
    padding: "15px 21px",
    border: "1px solid rgba(201,222,176,0.25)",
    borderRadius: "4px",
    background: "#789C5B",
    color: "#FFFFFF",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.1px",
    cursor: "pointer",
    transition: "all 0.35s ease",
    boxShadow: "0 15px 35px rgba(0,0,0,0.20)",
  },

  arrow: {
    fontSize: "17px",
    lineHeight: 1,
    transition: "transform 0.3s ease",
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 3px",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 0,
    background: "transparent",
    color: "rgba(255,255,255,0.88)",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  trust: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginTop: "65px",
  },

  trustItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  trustNumber: {
    fontFamily:
      "'Cormorant Garamond', Georgia, serif",
    fontSize: "25px",
    lineHeight: 1,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  trustLabel: {
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "1.8px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.48)",
  },

  divider: {
    width: "1px",
    height: "32px",
    background:
      "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)",
  },

  rightLabel: {
    position: "absolute",
    right: "5%",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    writingMode: "vertical-rl",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "3px",
    color: "rgba(255,255,255,0.52)",
    animation:
      "sideLabelReveal 1.5s ease 0.5s forwards",
    opacity: 0,
  },

  sideLine: {
    width: "1px",
    height: "55px",
    background:
      "linear-gradient(180deg, transparent, rgba(255,255,255,0.5))",
  },

  scroll: {
    position: "absolute",
    bottom: "26px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "2.5px",
    color: "rgba(255,255,255,0.42)",
  },

  scrollLine: {
    width: "40px",
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6))",
    animation: "scrollLine 2.5s ease-in-out infinite",
  },

  videoStatus: {
    position: "absolute",
    right: "5%",
    bottom: "35px",
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    gap: "9px",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "1.8px",
    color: "rgba(255,255,255,0.45)",
  },

  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#A9C985",
    boxShadow:
      "0 0 12px rgba(169,201,133,0.8)",
    animation: "statusPulse 2s ease-in-out infinite",
  },
};

function Hero() {
  const navigate = useNavigate();

  const [hoverShop, setHoverShop] = useState(false);
  const [hoverStory, setHoverStory] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700;800&display=swap');

          * {
            box-sizing: border-box;
          }

          @keyframes heroContentReveal {
            0% {
              opacity: 0;
              transform: translateY(45px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes sideLabelReveal {
            0% {
              opacity: 0;
              transform: translateY(-50%) translateX(15px);
            }

            100% {
              opacity: 1;
              transform: translateY(-50%) translateX(0);
            }
          }

          @keyframes scrollLine {
            0%, 100% {
              opacity: 0.3;
              transform: scaleX(0.6);
              transform-origin: left;
            }

            50% {
              opacity: 1;
              transform: scaleX(1);
              transform-origin: left;
            }
          }

          @keyframes statusPulse {
            0%, 100% {
              opacity: 0.45;
              transform: scale(0.8);
            }

            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }

          @media (max-width: 900px) {

            .amruthahara-hero {
              height: 820px !important;
              min-height: 820px !important;
            }

            .amruthahara-hero-container {
              width: 88% !important;
            }

            .amruthahara-hero-content {
              max-width: 650px !important;
            }

            .amruthahara-side-label {
              display: none !important;
            }

            .amruthahara-video-status {
              display: none !important;
            }
          }

          @media (max-width: 650px) {

            .amruthahara-hero {
              height: 820px !important;
              min-height: 820px !important;
            }

            .amruthahara-hero-container {
              width: 88% !important;
              align-items: center !important;
            }

            .amruthahara-hero-content {
              text-align: center !important;
            }

            .amruthahara-brand-line {
              justify-content: center !important;
            }

            .amruthahara-hero-title {
              font-size: clamp(54px, 15vw, 75px) !important;
              letter-spacing: -2px !important;
              line-height: 0.92 !important;
            }

            .amruthahara-hero-description {
              margin-left: auto !important;
              margin-right: auto !important;
              font-size: 14px !important;
            }

            .amruthahara-actions {
              justify-content: center !important;
            }

            .amruthahara-trust {
              justify-content: center !important;
              gap: 16px !important;
            }

            .amruthahara-divider {
              height: 26px !important;
            }

            .amruthahara-scroll {
              display: none !important;
            }

            .amruthahara-video {
              object-position: center !important;
            }
          }

          @media (max-width: 430px) {

            .amruthahara-hero {
              height: 780px !important;
              min-height: 780px !important;
            }

            .amruthahara-hero-title {
              font-size: 50px !important;
            }

            .amruthahara-trust {
              gap: 11px !important;
            }

            .amruthahara-trust-number {
              font-size: 21px !important;
            }

            .amruthahara-trust-label {
              font-size: 7px !important;
              letter-spacing: 1px !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      <section
        className="amruthahara-hero"
        style={styles.hero}
      >

        {/* =========================================
            BACKGROUND VIDEO
        ========================================== */}

        <video
          className="amruthahara-video"
          style={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/Videos/organic-farm.mp4"
            type="video/mp4"
          />
        </video>

        {/* =========================================
            CINEMATIC OVERLAYS
        ========================================== */}

        <div style={styles.leftOverlay}></div>

        <div style={styles.bottomOverlay}></div>

        <div style={styles.atmosphere}></div>

        {/* =========================================
            MAIN CONTENT
        ========================================== */}

        <div
          className="amruthahara-hero-container"
          style={styles.container}
        >

          <div
            className="amruthahara-hero-content"
            style={styles.content}
          >

            {/* BRAND LINE */}

            <div
              className="amruthahara-brand-line"
              style={styles.brandLine}
            >

              <span style={styles.brandLineSmall}></span>

              <p style={styles.eyebrow}>
                AMRUTHAHARA
              </p>

              <span style={styles.brandLineSmall}></span>

            </div>

            {/* TITLE */}

            <h1
              className="amruthahara-hero-title"
              style={styles.title}
            >
              Goodness of Nature,

              <span style={styles.titleSecond}>
                Delivered to You.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="amruthahara-hero-description"
              style={styles.description}
            >
              Thoughtfully sourced organic foods, farm-fresh
              produce and natural wellness essentials —
              bringing the purity of nature closer to home.
            </p>

            {/* BUTTONS */}

            <div
              className="amruthahara-actions"
              style={styles.actions}
            >

              {/* KEEPING YOUR EXISTING NAVIGATION */}

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  transform: hoverShop
                    ? "translateY(-3px)"
                    : "translateY(0)",
                  background: hoverShop
                    ? "#86AA66"
                    : "#789C5B",
                }}
                onMouseEnter={() =>
                  setHoverShop(true)
                }
                onMouseLeave={() =>
                  setHoverShop(false)
                }
                onClick={() =>
                  navigate("/products")
                }
              >
                SHOP FRESH PRODUCTS

                <span
                  style={{
                    ...styles.arrow,
                    transform: hoverShop
                      ? "translateX(5px)"
                      : "translateX(0)",
                  }}
                >
                  →
                </span>
              </button>

              {/* SAME STORY BUTTON */}

              <button
                type="button"
                style={{
                  ...styles.secondaryButton,
                  color: hoverStory
                    ? "#C9DDAF"
                    : "#FFFFFF",
                  borderBottomColor: hoverStory
                    ? "#A9C985"
                    : "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={() =>
                  setHoverStory(true)
                }
                onMouseLeave={() =>
                  setHoverStory(false)
                }
              >
                EXPLORE OUR STORY
              </button>

            </div>

            {/* TRUST INFORMATION */}

            <div
              className="amruthahara-trust"
              style={styles.trust}
            >

              <div style={styles.trustItem}>

                <strong
                  className="amruthahara-trust-number"
                  style={styles.trustNumber}
                >
                  100%
                </strong>

                <span
                  className="amruthahara-trust-label"
                  style={styles.trustLabel}
                >
                  Natural
                </span>

              </div>

              <div
                className="amruthahara-divider"
                style={styles.divider}
              />

              <div style={styles.trustItem}>

                <strong
                  className="amruthahara-trust-number"
                  style={styles.trustNumber}
                >
                  Farm
                </strong>

                <span
                  className="amruthahara-trust-label"
                  style={styles.trustLabel}
                >
                  Fresh
                </span>

              </div>

              <div
                className="amruthahara-divider"
                style={styles.divider}
              />

              <div style={styles.trustItem}>

                <strong
                  className="amruthahara-trust-number"
                  style={styles.trustNumber}
                >
                  Pure
                </strong>

                <span
                  className="amruthahara-trust-label"
                  style={styles.trustLabel}
                >
                  Quality
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            SIDE LABEL
        ========================================== */}

        <div
          className="amruthahara-side-label"
          style={styles.rightLabel}
        >

          <span style={styles.sideLine}></span>

          FROM FARM TO HOME

        </div>

        {/* =========================================
            VIDEO STATUS
        ========================================== */}

        <div
          className="amruthahara-video-status"
          style={styles.videoStatus}
        >

          <span style={styles.statusDot}></span>

          LIFE IN EVERY HARVEST

        </div>

        {/* =========================================
            SCROLL INDICATOR
        ========================================== */}

        <div
          className="amruthahara-scroll"
          style={styles.scroll}
        >

          <span style={styles.scrollLine}></span>

          SCROLL TO DISCOVER

        </div>

      </section>
    </>
  );
}

export default Hero;