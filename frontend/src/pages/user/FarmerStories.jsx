import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "HERITAGE",
    readTime: "8 MIN READ",
    title: "Generations Rooted in the Same Soil",
    description:
      "A deep dive into the families who have cultivated the same land for centuries, passing down traditional ecological knowledge alongside ancestral seeds.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "SUSTAINABILITY",
    readTime: "5 MIN READ",
    title: "Why Small Farmers Choose Organic Methods",
    description:
      "Understanding the shift toward regenerative practices and how individual farmers are leading the way in protecting local biodiversity.",
    image:
      "https://images.unsplash.com/photo-1595053826286-2e59efd9ff18?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "COMMUNITY",
    readTime: "6 MIN READ",
    title: "Women Who Keep Farming Traditions Alive",
    description:
      "Celebrating the vital role of women in rural agriculture, from seed preservation to the stewardship of traditional farming rituals.",
    image:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "PHILOSOPHY",
    readTime: "10 MIN READ",
    title: "The Patience Behind Every Harvest",
    description:
      "Understanding the slow, deliberate pace of natural farming and the quiet resilience it demands from those who steward the land.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=900",
  },
];

const FarmerStories = () => {
  return (
    <div className="farmer-page">
      <Navbar />

      <main className="farmer-container">
        <Link to="/our-story" className="farmer-back-link">
          ← Back to Journal
        </Link>

        {/* PAGE HEADER */}
        <header className="farmer-header">
          <p className="farmer-category-label">CATEGORY</p>

          <h1>Farmer Stories</h1>

          <p className="farmer-subtitle">
            Meet the hands behind every harvest and discover rooted values.
          </p>
        </header>

        {/* FEATURED STORY */}
        <section className="farmer-featured">
          <div className="farmer-featured-content">
            <p className="farmer-meta">
              FEATURED • FARMER STORIES • 8 MIN READ
            </p>

            <h2>Meet the Hands Behind the Harvest</h2>

            <p className="farmer-description">
              Behind every harvest is a person, a family and a story shaped by
              the land. Meet the farmers whose patience, knowledge and
              commitment to natural cultivation bring every Amruthahara harvest
              to life.
            </p>
          </div>

          <div className="farmer-featured-image">
            <img
              src="https://images.unsplash.com/photo-1595053826286-2e59efd9ff18?auto=format&fit=crop&q=80&w=1200"
              alt="Farmer standing in a field"
            />
          </div>
        </section>

        {/* ARTICLE LIST */}
        <section className="farmer-articles">
          {articles.map((article, index) => (
            <article
              className={`farmer-card ${
                index % 2 === 0 ? "farmer-card-text-left" : ""
              }`}
              key={article.title}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="farmer-card-content">
                    <p className="farmer-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="farmer-description">
                      {article.description}
                    </p>
                  </div>

                  <div className="farmer-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                </>
              ) : (
                <>
                  <div className="farmer-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>

                  <div className="farmer-card-content">
                    <p className="farmer-meta">
                      {article.category} • {article.readTime}
                    </p>

                    <h3>{article.title}</h3>

                    <p className="farmer-description">
                      {article.description}
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </section>

        {/* SHOP BUTTON */}
        <div className="farmer-shop-wrap">
          <Link to="/products" className="farmer-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="farmer-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="farmer-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .farmer-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #1b3022;
          font-family: Arial, Helvetica, sans-serif;
        }

        .farmer-page * {
          box-sizing: border-box;
        }

        .farmer-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        /* BACK LINK */

        .farmer-back-link {
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

        .farmer-back-link:hover {
          opacity: 0.7;
        }

        /* HEADER */

        .farmer-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .farmer-category-label {
          margin: 0 0 20px;

          color: #6f786f !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-transform: uppercase;
        }

        .farmer-header h1 {
          margin: 0 0 22px;

          color: #1b3022 !important;
          opacity: 1 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;

          line-height: 1.08 !important;
          letter-spacing: 0 !important;
        }

        .farmer-subtitle {
          max-width: 720px;
          margin: 0 auto;

          color: #526058 !important;

          font-size: 18px;
          font-style: italic;
          line-height: 1.7;

          text-align: center;
        }

        /* FEATURED */

        .farmer-featured {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;

          gap: 70px;

          margin-bottom: 120px;
          padding-bottom: 90px;

          border-bottom: 1px solid #dedbd3;
        }

        .farmer-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 500px;
          padding: 20px 20px 20px 0;

          text-align: left;
        }

        .farmer-featured-image {
          overflow: hidden;
        }

        .farmer-featured-image img {
          display: block;

          width: 100%;
          height: 500px;

          object-fit: cover;
        }

        .farmer-meta {
          margin: 0 0 17px;

          color: #737c76 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .farmer-featured-content h2 {
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

        .farmer-description {
          margin: 0;

          color: #68726c !important;

          font-size: 15px;
          line-height: 1.8;

          text-align: left;
        }

        /* ARTICLE ROWS */

        .farmer-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          padding: 75px 0;

          border-bottom: 1px solid #dedbd3;
        }

        .farmer-card-image {
          overflow: hidden;
        }

        .farmer-card-image img {
          display: block;

          width: 100%;
          height: 390px;

          object-fit: cover;

          transition: transform 0.4s ease;
        }

        .farmer-card:hover .farmer-card-image img {
          transform: scale(1.02);
        }

        .farmer-card-content {
          width: 100%;
          max-width: 500px;

          text-align: left;
        }

        .farmer-card h3 {
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

        .farmer-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .farmer-shop-button {
          display: inline-block;

          padding: 16px 34px;

          background: #1b3022;
          color: #fbf9f4 !important;

          text-decoration: none;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .farmer-shop-button:hover {
          background: #31523d;
        }

        /* FOOTER */

        .farmer-footer {
          padding: 90px 20px 60px;

          border-top: 1px solid #dedbd3;

          background: #f5f3ee;

          text-align: center;
        }

        .farmer-footer h2 {
          margin: 0 0 35px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 3px;
        }

        .farmer-footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 28px;

          margin-bottom: 35px;
        }

        .farmer-footer-links span {
          color: #68726c;

          font-size: 12px;

          text-decoration: underline;
        }

        .farmer-footer p {
          margin: 0;

          color: #939991;

          font-size: 9px;
          letter-spacing: 1.3px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .farmer-container {
            width: calc(100% - 50px);
          }

          .farmer-featured,
          .farmer-card {
            gap: 45px;
          }

          .farmer-featured-image img {
            height: 430px;
          }

          .farmer-featured-content {
            min-height: 430px;
          }

          .farmer-card-image img {
            height: 330px;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .farmer-container {
            width: calc(100% - 34px);
            padding-top: 35px;
          }

          .farmer-back-link {
            margin-bottom: 45px;
          }

          .farmer-header {
            margin-bottom: 55px;
          }

          .farmer-header h1 {
            font-size: 43px;
          }

          .farmer-subtitle {
            font-size: 15px;
          }

          .farmer-featured,
          .farmer-card {
            grid-template-columns: 1fr;

            gap: 30px;

            margin-bottom: 55px;
          }

          .farmer-featured-content {
            min-height: auto;
            padding: 0;
          }

          .farmer-featured-image img,
          .farmer-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .farmer-featured-content {
            order: 2;
          }

          .farmer-featured-image {
            order: 1;
          }

          .farmer-featured-content h2 {
            font-size: 31px;
            line-height: 1.22 !important;
          }

          .farmer-card {
            padding: 50px 0;
          }

          .farmer-card h3 {
            font-size: 28px;
            line-height: 1.25 !important;
          }

          .farmer-shop-wrap {
            padding-top: 60px;
          }

          .farmer-footer {
            padding-top: 70px;
          }

          .farmer-footer h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default FarmerStories;