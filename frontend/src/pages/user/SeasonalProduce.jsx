import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "FARM UPDATES",
    readTime: "5 MIN READ",
    title: "What Is Fresh on the Farm This Month",
    description:
      "An inside look at the vibrant crops currently coming into season across our partner farms, and how to make the most of them.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "NUTRITION",
    readTime: "4 MIN READ",
    title: "Why Seasonal Produce Tastes Better",
    description:
      "Exploring the science and sensory experience behind eating foods exactly when nature intended them to be enjoyed.",
    image:
      "https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "EDUCATION",
    readTime: "7 MIN READ",
    title: "Understanding Nature's Harvest Calendar",
    description:
      "A comprehensive guide to anticipating the natural cycles of growth and harvest throughout the shifting seasons.",
    image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "LIFESTYLE",
    readTime: "6 MIN READ",
    title: "From Farm to Table at the Right Time",
    description:
      "Mastering the art of timing your culinary creations to align perfectly with the arrival of fresh farm deliveries.",
    image:
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=900",
  },
];

const SeasonalProduce = () => {
  return (
    <div className="seasonal-page">
      <Navbar />

      <main className="seasonal-container">
        <Link to="/our-story" className="seasonal-back-link">
          ← Back to Journal
        </Link>

        {/* PAGE HEADER */}
        <header className="seasonal-header">
          <p className="seasonal-category-label">CATEGORY</p>

          <h1>Seasonal Produce</h1>

          <p className="seasonal-subtitle">
            Celebrate nature's changing rhythm through fresh harvests.
          </p>
        </header>

        {/* FEATURED SECTION */}
        <section className="seasonal-featured">
          <div className="seasonal-featured-content">
            <p className="seasonal-meta">
              FEATURED • SEASONAL PRODUCE • 8 MIN READ
            </p>

            <h2>Eating With the Seasons</h2>

            <p className="seasonal-description">
              Discover the unparalleled flavour and nutritional benefits of
              produce harvested at its absolute peak. A journey into the heart
              of agricultural rhythms and the natural cycle of every harvest.
            </p>
          </div>

          <div className="seasonal-featured-image">
            <img
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200"
              alt="Basket of seasonal vegetables"
            />
          </div>
        </section>

        {/* ARTICLE LIST */}
        <section className="seasonal-articles">
          {articles.map((article, index) => (
            <article
              className="seasonal-card"
              key={article.title}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="seasonal-card-content">
                    <p className="seasonal-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="seasonal-description">
                      {article.description}
                    </p>
                  </div>

                  <div className="seasonal-card-image">
                    <img
                      src={article.image}
                      alt={article.title}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="seasonal-card-image">
                    <img
                      src={article.image}
                      alt={article.title}
                    />
                  </div>

                  <div className="seasonal-card-content">
                    <p className="seasonal-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="seasonal-description">
                      {article.description}
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </section>

        {/* SHOP BUTTON */}
        <div className="seasonal-shop-wrap">
          <Link to="/products" className="seasonal-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="seasonal-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="seasonal-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .seasonal-page {
          min-height: 100vh;

          background: #fbf9f4;
          color: #1b3022;

          font-family: Arial, Helvetica, sans-serif;
        }

        .seasonal-page * {
          box-sizing: border-box;
        }

        .seasonal-container {
          width: min(1180px, calc(100% - 80px));

          margin: 0 auto;

          padding: 55px 0 110px;
        }

        /* BACK */

        .seasonal-back-link {
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

        .seasonal-back-link:hover {
          opacity: 0.7;
        }

        /* HEADER */

        .seasonal-header {
          max-width: 900px;

          margin: 0 auto 85px;

          text-align: center;
        }

        .seasonal-category-label {
          margin: 0 0 20px;

          color: #737c76 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-transform: uppercase;
        }

        .seasonal-header h1 {
          margin: 0 0 22px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;

          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;

          line-height: 1.08 !important;
          letter-spacing: 0 !important;

          text-align: center;

          overflow-wrap: break-word;
          word-break: normal;
        }

        .seasonal-subtitle {
          max-width: 720px;

          margin: 0 auto;

          color: #526058 !important;

          font-size: 18px;
          font-style: italic;

          line-height: 1.7;

          text-align: center;
        }

        /* FEATURED */

        .seasonal-featured {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;

          gap: 70px;

          margin-bottom: 120px;
          padding-bottom: 90px;

          border-bottom: 1px solid #dedbd3;
        }

        .seasonal-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 500px;

          padding: 20px 20px 20px 0;

          text-align: left;
        }

        .seasonal-featured-image {
          overflow: hidden;
        }

        .seasonal-featured-image img {
          display: block;

          width: 100%;
          height: 500px;

          object-fit: cover;
        }

        .seasonal-meta {
          margin: 0 0 17px;

          color: #737c76 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .seasonal-featured-content h2 {
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

        .seasonal-description {
          margin: 0;

          color: #68726c !important;

          font-size: 15px;
          line-height: 1.8;

          text-align: left;
        }

        /* ARTICLES */

        .seasonal-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          padding: 75px 0;

          border-bottom: 1px solid #dedbd3;
        }

        .seasonal-card-image {
          overflow: hidden;
        }

        .seasonal-card-image img {
          display: block;

          width: 100%;
          height: 390px;

          object-fit: cover;

          transition: transform 0.4s ease;
        }

        .seasonal-card:hover .seasonal-card-image img {
          transform: scale(1.02);
        }

        .seasonal-card-content {
          width: 100%;
          max-width: 500px;

          text-align: left;
        }

        .seasonal-card h3 {
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

        /* SHOP */

        .seasonal-shop-wrap {
          padding-top: 90px;

          text-align: center;
        }

        .seasonal-shop-button {
          display: inline-block;

          padding: 16px 34px;

          background: #1b3022;
          color: #fbf9f4 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-decoration: none;
        }

        .seasonal-shop-button:hover {
          background: #31523d;
        }

        /* FOOTER */

        .seasonal-footer {
          padding: 90px 20px 60px;

          border-top: 1px solid #dedbd3;

          background: #f5f3ee;

          text-align: center;
        }

        .seasonal-footer h2 {
          margin: 0 0 35px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 38px;
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 3px;
        }

        .seasonal-footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 28px;

          margin-bottom: 35px;
        }

        .seasonal-footer-links span {
          color: #68726c;

          font-size: 12px;

          text-decoration: underline;
        }

        .seasonal-footer p {
          margin: 0;

          color: #939991;

          font-size: 9px;
          letter-spacing: 1.3px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .seasonal-container {
            width: calc(100% - 50px);
          }

          .seasonal-featured,
          .seasonal-card {
            gap: 45px;
          }

          .seasonal-featured-image img {
            height: 430px;
          }

          .seasonal-featured-content {
            min-height: 430px;
          }

          .seasonal-card-image img {
            height: 330px;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .seasonal-container {
            width: calc(100% - 34px);

            padding-top: 35px;
          }

          .seasonal-back-link {
            margin-bottom: 45px;
          }

          .seasonal-header {
            margin-bottom: 55px;
          }

          .seasonal-header h1 {
            font-size: 43px;

            line-height: 1.15 !important;
          }

          .seasonal-subtitle {
            font-size: 15px;
          }

          .seasonal-featured,
          .seasonal-card {
            grid-template-columns: 1fr;

            gap: 30px;
          }

          .seasonal-featured {
            margin-bottom: 55px;
            padding-bottom: 55px;
          }

          .seasonal-featured-image img,
          .seasonal-card-image img {
            height: auto;

            aspect-ratio: 4 / 3;
          }

          .seasonal-featured-content {
            min-height: auto;
            padding: 0;

            order: 2;
          }

          .seasonal-featured-image {
            order: 1;
          }

          .seasonal-featured-content h2 {
            font-size: 31px;

            line-height: 1.22 !important;
          }

          .seasonal-card {
            padding: 50px 0;
          }

          .seasonal-card > * {
            order: initial;
          }

          .seasonal-card-content {
            max-width: none;
          }

          .seasonal-card h3 {
            font-size: 28px;

            line-height: 1.25 !important;
          }

          .seasonal-shop-wrap {
            padding-top: 60px;
          }

          .seasonal-footer {
            padding-top: 70px;
          }

          .seasonal-footer h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalProduce;