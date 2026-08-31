import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "BEVERAGES",
    readTime: "5 MIN READ",
    title: "A Simple Honey and Lemon Morning Drink",
    description:
      "Start your day with this gentle, immune-supporting tonic that balances the tartness of fresh citrus with the rich, soothing qualities of raw honey.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "BREAKFAST",
    readTime: "8 MIN READ",
    title: "Farm-Fresh Seasonal Breakfast Ideas",
    description:
      "Embrace the morning with recipes that highlight the best of the season's harvest, bringing the farm's vitality directly to your breakfast table.",
    image:
      "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "HERITAGE",
    readTime: "12 MIN READ",
    title: "Traditional Recipes With Natural Ingredients",
    description:
      "Rediscover ancestral culinary wisdom through these time-honored recipes that rely on pure, unadulterated ingredients for deep flavor and nourishment.",
    image:
      "https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&q=80&w=900",
  },
];

const Recipes = () => {
  return (
    <div className="recipes-page">
      <Navbar />

      <main className="recipes-container">
        {/* BACK TO JOURNAL */}
        <Link to="/our-story" className="recipes-back-link">
          ← Back to Journal
        </Link>

        {/* MAIN PAGE HEADING */}
        <header className="recipes-header">
          <p className="recipes-category-label">CATEGORY</p>

          <h1>Recipes</h1>

          <p className="recipes-subtitle">
            Wholesome recipes inspired by fresh harvests and traditional
            ingredients.
          </p>
        </header>

        {/* FEATURED RECIPE */}
        <section className="recipes-featured">
          <div className="recipes-featured-image">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
              alt="Rustic kitchen with natural ingredients"
            />
          </div>

          <div className="recipes-featured-content">
            <p className="recipes-meta">
              FEATURED • RECIPES • 8 MIN READ
            </p>

            <h2>Golden Honey Recipes for Everyday Wellness</h2>

            <p className="recipes-description">
              Discover the versatility of our pure, raw honey. From soothing
              morning elixirs to subtle culinary glazes, these foundational
              recipes bring natural sweetness and deep nourishment to your
              daily rituals.
            </p>
          </div>
        </section>

        {/* OTHER RECIPES */}
        <section className="recipes-articles">
          {articles.map((article) => (
            <article className="recipes-card" key={article.title}>
              <div className="recipes-card-image">
                <img
                  src={article.image}
                  alt={article.title}
                />
              </div>

              <div className="recipes-card-content">
                <p className="recipes-meta">
                  {article.category} • {article.readTime}
                </p>

                <h3>{article.title}</h3>

                <p className="recipes-description">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* SHOP BUTTON */}
        <div className="recipes-shop-wrap">
          <Link to="/products" className="recipes-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="recipes-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="recipes-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .recipes-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #1b3022;
          font-family: Arial, Helvetica, sans-serif;
        }

        .recipes-page * {
          box-sizing: border-box;
        }

        /* MAIN PAGE WIDTH */

        .recipes-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        /* BACK TO JOURNAL */

        .recipes-back-link {
          display: block;
          width: fit-content;
          margin: 0 auto 65px;

          color: #1b3022 !important;

          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;

          text-transform: uppercase;
          text-decoration: none;
        }

        .recipes-back-link:hover {
          opacity: 0.7;
        }

        /* MAIN HEADER */

        .recipes-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .recipes-category-label {
          margin: 0 0 20px;

          color: #806f65 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .recipes-header h1 {
          margin: 0 0 22px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;

          line-height: 1.08 !important;
          letter-spacing: 0 !important;
        }

        .recipes-subtitle {
          max-width: 720px;
          margin: 0 auto;

          color: #526058 !important;
          opacity: 1 !important;

          font-size: 18px;
          font-style: italic;
          line-height: 1.7;

          text-align: center;
        }

        /* FEATURED RECIPE */

        .recipes-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          margin-bottom: 120px;
          padding-bottom: 90px;

          border-bottom: 1px solid #dedbd3;
        }

        .recipes-featured-image {
          overflow: hidden;
        }

        .recipes-featured-image img {
          display: block;

          width: 100%;
          height: 500px;

          object-fit: cover;
        }

        .recipes-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 500px;

          padding: 20px 25px;

          text-align: left;
        }

        .recipes-meta {
          margin: 0 0 17px;

          color: #8b684e !important;
          opacity: 1 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .recipes-featured-content h2 {
          margin: 0 0 25px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 3.2vw, 50px);
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 0 !important;

          text-align: left;

          overflow-wrap: break-word;
          word-break: normal;
        }

        .recipes-description {
          margin: 0;

          color: #68726c !important;
          opacity: 1 !important;

          font-size: 15px;
          line-height: 1.8;

          text-align: left;
        }

        /* ARTICLE LIST */

        .recipes-articles {
          width: 100%;
        }

        .recipes-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          padding: 75px 0;

          border-bottom: 1px solid #dedbd3;
        }

        .recipes-card-image {
          overflow: hidden;
        }

        .recipes-card-image img {
          display: block;

          width: 100%;
          height: 390px;

          object-fit: cover;

          transition: transform 0.4s ease;
        }

        .recipes-card:hover .recipes-card-image img {
          transform: scale(1.02);
        }

        .recipes-card-content {
          width: 100%;
          max-width: 500px;

          text-align: left;
        }

        .recipes-card h3 {
          margin: 0 0 20px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 2.7vw, 40px);
          font-weight: 400;

          line-height: 1.25 !important;
          letter-spacing: 0 !important;

          text-align: left;

          overflow-wrap: break-word;
          word-break: normal;
        }

        /* SHOP BUTTON */

        .recipes-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .recipes-shop-button {
          display: inline-block;

          padding: 16px 34px;

          background: #1b3022;
          color: #fbf9f4 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-decoration: none;

          transition: background 0.25s ease;
        }

        .recipes-shop-button:hover {
          background: #31523d;
        }

        /* FOOTER */

        .recipes-footer {
          padding: 90px 20px 60px;

          border-top: 1px solid #dedbd3;

          background: #f5f3ee;

          text-align: center;
        }

        .recipes-footer h2 {
          margin: 0 0 35px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 3px;
        }

        .recipes-footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 28px;

          margin-bottom: 35px;
        }

        .recipes-footer-links span {
          color: #68726c !important;

          font-size: 12px;

          text-decoration: underline;

          cursor: pointer;
        }

        .recipes-footer p {
          margin: 0;

          color: #939991 !important;

          font-size: 9px;
          letter-spacing: 1.3px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .recipes-container {
            width: calc(100% - 50px);
          }

          .recipes-featured,
          .recipes-card {
            gap: 45px;
          }

          .recipes-featured-image img {
            height: 430px;
          }

          .recipes-featured-content {
            min-height: 430px;
          }

          .recipes-card-image img {
            height: 330px;
          }

          .recipes-featured-content h2 {
            font-size: 37px;
          }

          .recipes-card h3 {
            font-size: 31px;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .recipes-container {
            width: calc(100% - 34px);
            padding-top: 35px;
          }

          .recipes-back-link {
            margin-bottom: 45px;
          }

          .recipes-header {
            margin-bottom: 55px;
          }

          .recipes-header h1 {
            font-size: 43px;
          }

          .recipes-subtitle {
            font-size: 15px;
          }

          .recipes-featured {
            grid-template-columns: 1fr;

            gap: 30px;

            margin-bottom: 55px;
            padding-bottom: 55px;
          }

          .recipes-featured-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .recipes-featured-content {
            min-height: auto;
            padding: 0;
          }

          .recipes-featured-content h2 {
            font-size: 31px;
            line-height: 1.22 !important;
          }

          .recipes-card {
            grid-template-columns: 1fr;

            gap: 28px;

            padding: 50px 0;
          }

          .recipes-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .recipes-card-content {
            max-width: none;
          }

          .recipes-card h3 {
            font-size: 28px;
            line-height: 1.25 !important;
          }

          .recipes-shop-wrap {
            padding-top: 60px;
          }

          .recipes-footer {
            padding-top: 70px;
          }

          .recipes-footer h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Recipes;