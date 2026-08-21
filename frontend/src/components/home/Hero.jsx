import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  hero: {
    width: "100%",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 85% 20%, rgba(145,184,112,0.22), transparent 35%), linear-gradient(135deg, #F8F5EC 0%, #F2F7EC 50%, #EAF4E5 100%)",
  },

  container: {
    width: "92%",
    maxWidth: "1400px",
    minHeight: "680px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "70px",
    padding: "80px 0",
    boxSizing: "border-box",
  },

  content: {
    maxWidth: "650px",
    position: "relative",
    zIndex: 2,
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 16px",
    marginBottom: "24px",
    borderRadius: "50px",
    backgroundColor: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(22,101,52,0.12)",
    color: "#357A4B",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.8px",
    backdropFilter: "blur(10px)",
  },

  title: {
    margin: 0,
    fontSize: "clamp(42px, 5vw, 72px)",
    lineHeight: "1.05",
    fontWeight: "800",
    letterSpacing: "-2.5px",
    color: "#173F2A",
  },

  titleHighlight: {
    display: "block",
    color: "#78A85A",
  },

  description: {
    maxWidth: "590px",
    margin: "28px 0 34px",
    fontSize: "clamp(16px, 1.5vw, 19px)",
    lineHeight: "1.75",
    color: "#5D675F",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "16px 25px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(23,92,56,0.20)",
    transition: "all 0.25s ease",
  },

  secondaryButton: {
    padding: "15px 22px",
    border: "1px solid rgba(23,92,56,0.20)",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.55)",
    color: "#24563B",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  trust: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    marginTop: "48px",
  },

  trustItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  trustStrong: {
    fontSize: "17px",
    color: "#245C3B",
  },

  trustText: {
    fontSize: "12px",
    color: "#7B847D",
  },

  divider: {
    width: "1px",
    height: "35px",
    backgroundColor: "rgba(23,92,56,0.15)",
  },

  visual: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "540px",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "570px",
    height: "560px",
    overflow: "hidden",
    borderRadius: "35px",
    boxShadow: "0 30px 70px rgba(40,70,45,0.18)",
    transform: "rotate(1deg)",
    zIndex: 2,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, transparent 55%, rgba(20,55,30,0.22))",
  },

  freshCard: {
    position: "absolute",
    left: "-25px",
    bottom: "65px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px 20px",
    backgroundColor: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.8)",
    borderRadius: "16px",
    boxShadow: "0 18px 40px rgba(38,66,42,0.16)",
    backdropFilter: "blur(15px)",
    zIndex: 4,
  },

  freshIcon: {
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    backgroundColor: "#EDF6E9",
    fontSize: "21px",
  },

  freshText: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  freshTitle: {
    color: "#1F5134",
    fontSize: "14px",
    fontWeight: "700",
  },

  freshSubtitle: {
    color: "#7B847D",
    fontSize: "11px",
  },

  circle: {
    position: "absolute",
    width: "440px",
    height: "440px",
    borderRadius: "50%",
    backgroundColor: "rgba(144,183,109,0.15)",
    right: "-90px",
    top: "20px",
    zIndex: 0,
  },
};

function Hero() {
  const navigate = useNavigate();
  const [hoverShop, setHoverShop] = useState(false);
  const [hoverStory, setHoverStory] = useState(false);

  return (
    <section style={styles.hero}>
      <div style={styles.container}>

        {/* LEFT CONTENT */}
        <div style={styles.content}>

          <span style={styles.eyebrow}>
            🌿 PURE • FRESH • NATURAL
          </span>

          <h1 style={styles.title}>
            Goodness of Nature,
            <span style={styles.titleHighlight}>
              Delivered to You.
            </span>
          </h1>

          <p style={styles.description}>
            Discover thoughtfully sourced organic groceries,
            farm-fresh produce and natural wellness essentials —
            carefully selected for a healthier lifestyle.
          </p>

          {/* BUTTONS */}
          <div style={styles.actions}>

           <button
  type="button"
  style={{
    ...styles.button,
    transform: hoverShop
      ? "translateY(-3px)"
      : "translateY(0)",
    boxShadow: hoverShop
      ? "0 18px 30px rgba(23,92,56,0.28)"
      : "0 12px 25px rgba(23,92,56,0.20)",
  }}
  onMouseEnter={() => setHoverShop(true)}
  onMouseLeave={() => setHoverShop(false)}
  onClick={() => navigate("/products")}
>
  Shop Fresh Products

  <span style={{ fontSize: "20px" }}>
    →
  </span>
</button>

            <button
              style={{
                ...styles.secondaryButton,
                backgroundColor: hoverStory
                  ? "#FFFFFF"
                  : "rgba(255,255,255,0.55)",
                transform: hoverStory
                  ? "translateY(-2px)"
                  : "translateY(0)",
              }}
              onMouseEnter={() => setHoverStory(true)}
              onMouseLeave={() => setHoverStory(false)}
            >
              Explore Our Story
            </button>

          </div>

          {/* TRUST */}
          <div style={styles.trust}>

            <div style={styles.trustItem}>
              <strong style={styles.trustStrong}>
                100%
              </strong>

              <span style={styles.trustText}>
                Natural
              </span>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.trustItem}>
              <strong style={styles.trustStrong}>
                Farm
              </strong>

              <span style={styles.trustText}>
                Fresh
              </span>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.trustItem}>
              <strong style={styles.trustStrong}>
                Pure
              </strong>

              <span style={styles.trustText}>
                Quality
              </span>
            </div>

          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div style={styles.visual}>

          <div style={styles.circle}></div>

          <div style={styles.imageWrapper}>

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=90"
              alt="Fresh organic vegetables"
              style={styles.image}
            />

            <div style={styles.imageOverlay}></div>

          </div>


          {/* FLOATING CARD */}
          <div style={styles.freshCard}>

            <div style={styles.freshIcon}>
              🌱
            </div>

            <div style={styles.freshText}>

              <strong style={styles.freshTitle}>
                Farm Fresh
              </strong>

              <span style={styles.freshSubtitle}>
                Picked with care
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;