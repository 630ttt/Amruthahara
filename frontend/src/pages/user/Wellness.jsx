import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "RITUALS",
    readTime: "3 MIN READ",
    title: "Simple Morning Rituals Inspired by Nature.",
    description:
      "Starting the day with intention and grounded practices to cultivate lasting calm.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "NUTRITION",
    readTime: "7 MIN READ",
    title: "Natural Ingredients for Everyday Wellbeing.",
    description:
      "Harnessing the potent, healing properties found in unprocessed, earth-derived staples.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "LIFESTYLE",
    readTime: "4 MIN READ",
    title: "Finding Calm Through Slower Living.",
    description:
      "Reclaiming time and reducing noise in a fast-paced modern environment.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "MIND",
    readTime: "6 MIN READ",
    title: "Creating Small Moments of Mindfulness.",
    description:
      "Micro-practices to anchor yourself in the present throughout a busy day.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900",
  },
];

const Wellness = () => {
  return (
    <div className="wellness-page">
      <Navbar />

      <main className="wellness-container">
        <Link to="/our-story" className="wellness-back-link">
          ← Back to Journal
        </Link>

        {/* PAGE HEADER */}
        <header className="wellness-header">
          <p className="wellness-category-label">CATEGORY</p>

          <h1>Wellness.</h1>

          <p className="wellness-subtitle">
            Natural rituals, wholesome ingredients, and simple practices for a
            calmer and more balanced way of living.
          </p>
        </header>

        {/* FEATURED */}
        <section className="wellness-featured">
          <div className="wellness-featured-content">
            <p className="wellness-meta">
              FEATURED • WELLNESS • 5 MIN READ
            </p>

            <h2>Returning to Nature for Everyday Wellness.</h2>

            <p className="wellness-description">
              Discover the grounding power of aligning our daily rhythms with
              the natural world. Simple rituals, mindful choices and a closer
              connection with nature can bring a greater sense of balance into
              everyday life.
            </p>
          </div>

          <div className="wellness-featured-image">
            <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
            alt="Returning to nature for everyday wellness"
            />
          </div>
        </section>

        {/* ARTICLES */}
        <section className="wellness-articles">
          {articles.map((article, index) => (
            <article
              className="wellness-card"
              key={article.title}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="wellness-card-content">
                    <p className="wellness-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="wellness-description">
                      {article.description}
                    </p>
                  </div>

                  <div className="wellness-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                </>
              ) : (
                <>
                  <div className="wellness-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>

                  <div className="wellness-card-content">
                    <p className="wellness-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="wellness-description">
                      {article.description}
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </section>

        {/* SHOP */}
        <div className="wellness-shop-wrap">
          <Link to="/products" className="wellness-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="wellness-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="wellness-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .wellness-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #1b3022;
          font-family: Arial, Helvetica, sans-serif;
        }

        .wellness-page * {
          box-sizing: border-box;
        }

        .wellness-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        /* BACK LINK */

        .wellness-back-link {
          display: block;
          width: fit-content;
          margin: 0 auto 65px;

          color: #1b3022 !important;

          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;

          text-decoration: none;
          text-transform: uppercase;
        }

        .wellness-back-link:hover {
          opacity: 0.7;
        }

        /* MAIN HEADER */

        .wellness-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .wellness-category-label {
          margin: 0 0 20px;

          color: #737c76 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-transform: uppercase;
        }

        .wellness-header h1 {
          margin: 0 0 22px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;

          line-height: 1.08 !important;
          letter-spacing: 0 !important;

          text-align: center;
        }

        .wellness-subtitle {
          max-width: 720px;
          margin: 0 auto;

          color: #526058 !important;

          font-size: 18px;
          font-style: italic;
          line-height: 1.7;

          text-align: center;
        }

        /* FEATURED SECTION */

        .wellness-featured {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;

          gap: 70px;

          margin-bottom: 120px;
          padding-bottom: 90px;

          border-bottom: 1px solid #dedbd3;
        }

        .wellness-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 500px;

          padding: 20px 20px 20px 0;

          text-align: left;
        }

        .wellness-featured-image {
          overflow: hidden;
        }

        .wellness-featured-image img {
          display: block;

          width: 100%;
          height: 500px;

          object-fit: cover;
        }

        .wellness-meta {
          margin: 0 0 17px;

          color: #737c76 !important;
          opacity: 1 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .wellness-featured-content h2 {
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

        .wellness-description {
          margin: 0;

          color: #68726c !important;
          opacity: 1 !important;

          font-size: 15px;
          line-height: 1.8;

          text-align: left;
        }

        /* ARTICLE ROWS */

        .wellness-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          padding: 75px 0;

          border-bottom: 1px solid #dedbd3;
        }

        .wellness-card-image {
          overflow: hidden;
        }

        .wellness-card-image img {
          display: block;

          width: 100%;
          height: 390px;

          object-fit: cover;

          transition: transform 0.4s ease;
        }

        .wellness-card:hover .wellness-card-image img {
          transform: scale(1.02);
        }

        .wellness-card-content {
          width: 100%;
          max-width: 500px;

          text-align: left;
        }

        .wellness-card h3 {
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

        .wellness-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .wellness-shop-button {
          display: inline-block;

          padding: 16px 34px;

          background: #1b3022;
          color: #fbf9f4 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-decoration: none;
        }

        .wellness-shop-button:hover {
          background: #31523d;
        }

        /* FOOTER */

        .wellness-footer {
          padding: 90px 20px 60px;

          border-top: 1px solid #dedbd3;

          background: #f5f3ee;

          text-align: center;
        }

        .wellness-footer h2 {
          margin: 0 0 35px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;

          font-size: 38px;
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 3px;
        }

        .wellness-footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 28px;

          margin-bottom: 35px;
        }

        .wellness-footer-links span {
          color: #68726c !important;

          font-size: 12px;

          text-decoration: underline;
          cursor: pointer;
        }

        .wellness-footer p {
          margin: 0;

          color: #939991 !important;

          font-size: 9px;
          letter-spacing: 1.3px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .wellness-container {
            width: calc(100% - 50px);
          }

          .wellness-featured,
          .wellness-card {
            gap: 45px;
          }

          .wellness-featured-image img {
            height: 430px;
          }

          .wellness-featured-content {
            min-height: 430px;
          }

          .wellness-card-image img {
            height: 330px;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .wellness-container {
            width: calc(100% - 34px);
            padding-top: 35px;
          }

          .wellness-back-link {
            margin-bottom: 45px;
          }

          .wellness-header {
            margin-bottom: 55px;
          }

          .wellness-header h1 {
            font-size: 43px;
            line-height: 1.15 !important;
          }

          .wellness-subtitle {
            font-size: 15px;
          }

          .wellness-featured,
          .wellness-card {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .wellness-featured {
            margin-bottom: 55px;
            padding-bottom: 55px;
          }

          .wellness-featured-image img,
          .wellness-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .wellness-featured-content {
            min-height: auto;
            padding: 0;
            order: 2;
          }

          .wellness-featured-image {
            order: 1;
          }

          .wellness-featured-content h2 {
            font-size: 31px;
            line-height: 1.22 !important;
          }

          .wellness-card {
            padding: 50px 0;
          }

          .wellness-card > * {
            order: initial;
          }

          .wellness-card-content {
            max-width: none;
          }

          .wellness-card h3 {
            font-size: 28px;
            line-height: 1.25 !important;
          }

          .wellness-shop-wrap {
            padding-top: 60px;
          }

          .wellness-footer {
            padding-top: 70px;
          }

          .wellness-footer h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Wellness;