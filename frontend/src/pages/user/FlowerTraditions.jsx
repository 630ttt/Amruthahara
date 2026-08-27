import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "HERITAGE",
    readTime: "5 MIN READ",
    title: "Why Jasmine Holds a Special Place in Indian Traditions.",
    description:
      "Fragrant, delicate and deeply symbolic, jasmine has been woven into celebrations, ceremonies and everyday traditions for generations.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "RITUALS",
    readTime: "6 MIN READ",
    title: "Flowers Used in Sacred Rituals and Their Meaning.",
    description:
      "A guide to the blooms chosen for offerings, ceremonies and sacred spaces, exploring the symbolism and spiritual meaning carried by every petal.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "AGRICULTURE",
    readTime: "10 MIN READ",
    title: "From Farm to Garland: The Journey of Fresh Flowers.",
    description:
      "Follow the careful process of cultivating, harvesting and weaving traditional garlands, celebrating the farmers and artisans behind every bloom.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "SEASONAL",
    readTime: "4 MIN READ",
    title: "How Seasonal Flowers Shape Traditional Celebrations.",
    description:
      "Understanding the rhythm of nature and how seasonal blossoms influence the colours, fragrances and traditions of cultural festivities.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=900",
  },
];

const FlowerTraditions = () => {
  return (
    <div className="flower-page">
      <Navbar />

      <main className="flower-container">
        <Link to="/our-story" className="flower-back-link">
          ← Back to Journal
        </Link>

        <header className="flower-header">
          <p className="flower-category-label">CATEGORY</p>
          <h1>Flower Traditions</h1>

          <p className="flower-subtitle">
            Sacred blooms, timeless rituals, and stories carried through
            flowers.
          </p>
        </header>

        <section className="flower-featured">
          <div className="flower-featured-image">
            <img
              src="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=1200"
              alt="Traditional flowers"
            />
          </div>

          <div className="flower-featured-content">
            <p className="flower-meta">
              FEATURED • FLOWER TRADITIONS • 8 MIN READ
            </p>

            <h2>
              Sacred Blooms: The Role of Marigolds in Traditional Rituals.
            </h2>

            <p className="flower-description">
              Explore the deep-rooted significance of marigolds in festive and
              spiritual ceremonies, tracing their vibrant journey from local
              farms to sacred spaces.
            </p>
          </div>
        </section>

        <section>
          {articles.map((article, index) => (
            <article
              className={`flower-card ${
                index % 2 !== 0 ? "flower-card-reverse" : ""
              }`}
              key={article.title}
            >
              <div className="flower-card-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="flower-card-content">
                <p className="flower-meta">
                  {article.category} • {article.readTime}
                </p>

                <h3>{article.title}</h3>

                <p className="flower-description">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="flower-shop-wrap">
          <Link to="/products" className="flower-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      <footer className="flower-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="flower-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .flower-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #2b211d;
          font-family: Arial, Helvetica, sans-serif;
        }

        .flower-page * {
          box-sizing: border-box;
        }

        .flower-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        .flower-back-link {
          display: block;
          width: fit-content;
          margin: 0 auto 65px;
          color: #2b211d !important;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .flower-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .flower-category-label {
          margin: 0 0 20px;
          color: #8b7468;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .flower-header h1 {
          margin: 0 0 22px;
          color: #2b211d !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;
          line-height: 1.08 !important;
        }

        .flower-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #75685f;
          font-size: 18px;
          font-style: italic;
          line-height: 1.7;
          text-align: center;
        }

        .flower-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          margin-bottom: 120px;
          padding-bottom: 90px;
          border-bottom: 1px solid #ded8d2;
        }

        .flower-featured-image img {
          display: block;
          width: 100%;
          height: 500px;
          object-fit: cover;
        }

        .flower-featured-content {
          min-height: 500px;
          padding: 20px 25px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .flower-meta {
          margin: 0 0 17px;
          color: #8b7468;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .flower-featured-content h2 {
          margin: 0 0 25px;
          color: #2b211d !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 3.2vw, 50px);
          font-weight: 400;
          line-height: 1.18 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .flower-description {
          margin: 0;
          color: #766c66;
          font-size: 15px;
          line-height: 1.8;
          text-align: left;
        }

        .flower-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          padding: 75px 0;
          border-bottom: 1px solid #ded8d2;
        }

        .flower-card-reverse .flower-card-image {
          order: 2;
        }

        .flower-card-reverse .flower-card-content {
          order: 1;
        }

        .flower-card-image img {
          width: 100%;
          height: 390px;
          object-fit: cover;
          display: block;
        }

        .flower-card-content {
          max-width: 500px;
          text-align: left;
        }

        .flower-card h3 {
          margin: 0 0 20px;
          color: #2b211d !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 2.7vw, 40px);
          font-weight: 400;
          line-height: 1.22 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .flower-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .flower-shop-button {
          display: inline-block;
          padding: 16px 34px;
          background: #3b2b26;
          color: #fbf9f4 !important;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .flower-footer {
          padding: 90px 20px 60px;
          background: #f5f1ec;
          text-align: center;
        }

        .flower-footer h2 {
          color: #2b211d !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: 3px;
        }

        .flower-footer-links {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin: 35px 0;
        }

        .flower-footer-links span {
          color: #756a63;
          font-size: 12px;
          text-decoration: underline;
        }

        .flower-footer p {
          color: #999088;
          font-size: 9px;
        }

        @media (max-width: 700px) {
          .flower-container {
            width: calc(100% - 34px);
          }

          .flower-featured,
          .flower-card {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .flower-card-reverse .flower-card-image,
          .flower-card-reverse .flower-card-content {
            order: initial;
          }

          .flower-featured-image img,
          .flower-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .flower-featured-content {
            min-height: auto;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowerTraditions;