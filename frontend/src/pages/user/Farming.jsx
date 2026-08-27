import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "CULTIVATION",
    readTime: "5 MIN READ",
    title: "Growing With Nature, Not Against It",
    description:
      "Understanding the delicate balance of local ecosystems to foster crop resilience and natural vitality without synthetic intervention.",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "SOIL SCIENCE",
    readTime: "8 MIN READ",
    title: "Why Healthy Soil Creates Better Harvests",
    description:
      "Delve into the microscopic world beneath our feet and learn why soil health is the cornerstone of nutrient-dense organic produce.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "HERITAGE",
    readTime: "6 MIN READ",
    title: "Traditional Farming Knowledge That Still Matters",
    description:
      "Revisiting ancestral techniques like crop rotation and companion planting that have sustained lands for generations.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "PEOPLE",
    readTime: "10 MIN READ",
    title: "A Day in the Life of an Organic Farmer",
    description:
      "Follow the rhythm of the seasons through the daily routines of those who steward the land with patience and purpose.",
    image:
      "https://images.unsplash.com/photo-1595053826286-2e59efd9ff18?auto=format&fit=crop&q=80&w=900",
  },
];

const Farming = () => {
  return (
    <div className="farming-page">
      <Navbar />

      <main className="farming-container">
        <Link to="/our-story" className="farming-back-link">
          ← Back to Journal
        </Link>

        <header className="farming-header">
          <p className="farming-category-label">CATEGORY</p>
          <h1>Farming</h1>

          <p className="farming-subtitle">
            Stories from the soil, sustainable cultivation, and the people who
            grow with patience and purpose.
          </p>
        </header>

        <section className="farming-featured">
          <div className="farming-featured-image">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
              alt="Sustainable farming"
            />
          </div>

          <div className="farming-featured-content">
            <p className="farming-meta">
              FEATURED • FARMING • 8 MIN READ
            </p>

            <h2>
              From Soil to Soul: The Philosophy of Sustainable Farming
            </h2>

            <p className="farming-description">
              Discover how ancient agricultural wisdom intersects with modern
              ecological needs. We explore the profound connection between the
              earth we tend and the food that nourishes us.
            </p>
          </div>
        </section>

        <section>
          {articles.map((article, index) => (
            <article
              className={`farming-card ${
                index % 2 !== 0 ? "farming-card-reverse" : ""
              }`}
              key={article.title}
            >
              <div className="farming-card-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="farming-card-content">
                <p className="farming-meta">
                  {article.category} • {article.readTime}
                </p>

                <h3>{article.title}</h3>

                <p className="farming-description">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="farming-shop-wrap">
          <Link to="/products" className="farming-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      <footer className="farming-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="farming-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .farming-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #1b3022;
          font-family: Arial, Helvetica, sans-serif;
        }

        .farming-page * {
          box-sizing: border-box;
        }

        .farming-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        .farming-back-link {
          display: block;
          width: fit-content;
          margin: 0 auto 65px;
          color: #1b3022 !important;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .farming-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .farming-category-label {
          margin: 0 0 20px;
          color: #737c76;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .farming-header h1 {
          margin: 0 0 22px;
          color: #1b3022 !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;
          line-height: 1.08 !important;
        }

        .farming-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #526058;
          font-size: 18px;
          font-style: italic;
          line-height: 1.7;
          text-align: center;
        }

        .farming-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          margin-bottom: 120px;
          padding-bottom: 90px;
          border-bottom: 1px solid #ddd9d0;
        }

        .farming-featured-image img {
          display: block;
          width: 100%;
          height: 500px;
          object-fit: cover;
        }

        .farming-featured-content {
          min-height: 500px;
          padding: 20px 25px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .farming-meta {
          margin: 0 0 17px;
          color: #737c76;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .farming-featured-content h2 {
          margin: 0 0 25px;
          color: #1b3022 !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 3.2vw, 50px);
          font-weight: 400;
          line-height: 1.18 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .farming-description {
          margin: 0;
          color: #68726c;
          font-size: 15px;
          line-height: 1.8;
          text-align: left;
        }

        .farming-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          padding: 75px 0;
          border-bottom: 1px solid #ddd9d0;
        }

        .farming-card-reverse .farming-card-image {
          order: 2;
        }

        .farming-card-reverse .farming-card-content {
          order: 1;
        }

        .farming-card-image img {
          display: block;
          width: 100%;
          height: 390px;
          object-fit: cover;
        }

        .farming-card-content {
          max-width: 500px;
          text-align: left;
        }

        .farming-card h3 {
          margin: 0 0 20px;
          color: #1b3022 !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 2.7vw, 40px);
          font-weight: 400;
          line-height: 1.22 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .farming-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .farming-shop-button {
          display: inline-block;
          padding: 16px 34px;
          background: #1b3022;
          color: #fbf9f4 !important;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .farming-footer {
          padding: 90px 20px 60px;
          background: #f5f3ee;
          text-align: center;
        }

        .farming-footer h2 {
          color: #1b3022 !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: 3px;
        }

        .farming-footer-links {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin: 35px 0;
        }

        .farming-footer-links span {
          color: #68726c;
          font-size: 12px;
          text-decoration: underline;
        }

        .farming-footer p {
          color: #939991;
          font-size: 9px;
        }

        @media (max-width: 700px) {
          .farming-container {
            width: calc(100% - 34px);
          }

          .farming-featured,
          .farming-card {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .farming-card-reverse .farming-card-image,
          .farming-card-reverse .farming-card-content {
            order: initial;
          }

          .farming-featured-image img,
          .farming-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .farming-featured-content {
            min-height: auto;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Farming;