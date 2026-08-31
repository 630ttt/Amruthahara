import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";

const categories = [
  {
    name: "Organic Flowers",
    to: "/products?search=flower",
    text: "Seasonal blooms and ritual flowers from partner farms.",
  },
  {
    name: "Natural Honey",
    to: "/honey",
    text: "Raw forest honey and everyday pantry sweetness.",
  },
  {
    name: "Organic Foods",
    to: "/products?search=organic",
    text: "Wholesome staples chosen for daily cooking.",
  },
  {
    name: "Farm Products",
    to: "/seasonal-produce",
    text: "Fresh harvests that follow the season.",
  },
  {
    name: "Wellness Products",
    to: "/wellness",
    text: "Natural essentials for slower, healthier living.",
  },
  {
    name: "Millet Range",
    to: "/millet-range",
    text: "Ragi, jowar, bajra and other ancient grains.",
  },
];

export default function Categories() {
  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.wrap}>
        <p style={styles.eyebrow}>Shop Range</p>
        <h1 style={styles.title}>Natural Foods</h1>
        <p style={styles.intro}>
          Explore Amruthahara by range — flowers, honey, farm harvests, millets
          and wellness staples, all in the same organic shopping experience.
        </p>

        <div style={styles.grid}>
          {categories.map((category) => (
            <Link key={category.name} to={category.to} style={styles.card}>
              <h2 style={styles.heading}>{category.name}</h2>
              <p style={styles.body}>{category.text}</p>
              <span style={styles.link}>Shop this range →</span>
            </Link>
          ))}
        </div>
      </main>

      <AdyaFooter />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 55%, #F4F7F2 100%)",
  },
  wrap: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "48px 5% 90px",
  },
  eyebrow: {
    color: "#C79A45",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    margin: 0,
  },
  title: {
    fontFamily: "Georgia, serif",
    color: "#173F2A",
    fontSize: "42px",
    margin: "10px 0 14px",
    fontWeight: 500,
  },
  intro: {
    color: "#6B756E",
    fontSize: "16px",
    lineHeight: 1.7,
    marginBottom: "32px",
    maxWidth: "640px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "18px",
    padding: "24px",
    textDecoration: "none",
    boxShadow: "0 10px 28px rgba(23,63,42,0.04)",
  },
  heading: {
    color: "#175C38",
    fontSize: "20px",
    margin: "0 0 8px",
  },
  body: {
    color: "#5C675F",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: "0 0 14px",
  },
  link: {
    color: "#C79A45",
    fontSize: "13px",
    fontWeight: 800,
  },
};
