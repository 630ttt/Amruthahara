import React from "react";

function OurStory() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Left Image */}
        <div style={styles.imageWrapper}>
          <img
            src="/images/our-story.jpg"
            alt="Amruthahara natural farm"
            style={styles.image}
          />

          <div style={styles.imageBadge}>
            <span style={styles.badgeNumber}>100%</span>
            <span style={styles.badgeText}>Natural</span>
          </div>
        </div>

        {/* Right Content */}
        <div style={styles.content}>
          <span style={styles.eyebrow}>OUR STORY</span>

          <h2 style={styles.heading}>
            From the heart of
            <br />
            <span style={styles.highlight}>nature to your home.</span>
          </h2>

          <div style={styles.divider} />

          <p style={styles.description}>
            At Amruthahara, our journey begins with a simple belief —
            that the best things in life come naturally.
          </p>

          <p style={styles.description}>
            We bring together carefully selected organic, natural and
            farm-fresh products that respect the land, support our
            farmers and bring goodness to every home.
          </p>

          <p style={styles.description}>
            Every product we choose carries a story of purity,
            tradition and care.
          </p>

          <button style={styles.button}>
            Discover Our Story
            <span style={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    padding: "110px 6%",
    background:
      "linear-gradient(135deg, #f8f6ed 0%, #f2f4e9 100%)",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1250px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "560px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(23, 92, 56, 0.16)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imageBadge: {
    position: "absolute",
    bottom: "25px",
    left: "25px",
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(8px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
  },

  badgeNumber: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#175c38",
  },

  badgeText: {
    fontSize: "12px",
    color: "#6b725f",
    marginTop: "2px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  content: {
    paddingRight: "20px",
  },

  eyebrow: {
    display: "inline-block",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "3px",
    color: "#b18135",
    marginBottom: "18px",
  },

  heading: {
    margin: 0,
    fontSize: "clamp(38px, 4vw, 58px)",
    lineHeight: "1.08",
    fontWeight: "700",
    color: "#173b28",
    letterSpacing: "-1.5px",
  },

  highlight: {
    color: "#175c38",
  },

  divider: {
    width: "65px",
    height: "3px",
    background: "#b18135",
    margin: "30px 0",
    borderRadius: "10px",
  },

  description: {
    fontSize: "16px",
    lineHeight: "1.9",
    color: "#5f675d",
    margin: "0 0 17px",
    maxWidth: "560px",
  },

  button: {
    marginTop: "18px",
    padding: "15px 25px",
    border: "none",
    borderRadius: "30px",
    background: "#175c38",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(23, 92, 56, 0.22)",
    transition: "all 0.3s ease",
  },

  arrow: {
    marginLeft: "12px",
    fontSize: "18px",
  },
};

export default OurStory;