import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import ProductCard from "../../components/product/ProductCard";
import { API_BASE_URL } from "../../services/apiBase";

export default function MilletRange() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        const list = (data.products || []).filter((product) => {
          const text = [
            product.name,
            product.description,
            product.category,
            product.bowlCategory,
          ]
            .join(" ")
            .toLowerCase();

          return text.includes("millet") || text.includes("ragi") || text.includes("jowar") || text.includes("bajra");
        });

        setProducts(list);
      } catch (error) {
        console.error("Millet range load error:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.wrap}>
        <p style={styles.eyebrow}>Shop Range</p>
        <h1 style={styles.title}>Millet Range</h1>
        <p style={styles.intro}>
          Ancient grains for everyday cooking. Explore ragi, jowar, bajra and
          other millet staples sourced for wholesome Indian kitchens.
        </p>

        {loading ? (
          <p style={styles.intro}>Loading millet products...</p>
        ) : products.length === 0 ? (
          <article style={styles.card}>
            <h2 style={styles.heading}>Browse the shop</h2>
            <p style={styles.body}>
              Millet products will appear here as they are added. You can also
              search the full catalogue.
            </p>
            <Link to="/products?search=millet" style={styles.cta}>
              Search millet products
            </Link>
          </article>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
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
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "18px",
    padding: "28px",
  },
  heading: {
    color: "#175C38",
    marginTop: 0,
  },
  body: {
    color: "#5C675F",
    lineHeight: 1.7,
  },
  cta: {
    display: "inline-block",
    marginTop: "12px",
    background: "#175C38",
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "13px",
  },
};
