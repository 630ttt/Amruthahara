import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "HARVESTING",
    readTime: "5 MIN READ",
    title: "How Raw Honey Travels From Hive to Home.",
    description:
      "The journey of raw honey is one of careful preservation. We trace the steps from remote forest apiaries to your pantry, ensuring every drop retains its natural goodness.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "TASTING",
    readTime: "7 MIN READ",
    title: "Understanding the Flavours of Forest Honey.",
    description:
      "Just like wine, honey reflects its terroir. Learn to identify subtle floral notes, woody undertones and the character of authentic wild forest harvests.",
    image:
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "HERITAGE",
    readTime: "4 MIN READ",
    title: "Traditional Uses of Honey Across Generations.",
    description:
      "Beyond sweetness, honey has served as a treasured part of traditional food and family practices passed down through generations.",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "ENVIRONMENT",
    readTime: "6 MIN READ",
    title: "Why Every Harvest of Honey Tastes Different.",
    description:
      "Changing seasons and flowering cycles mean no two jars of wild honey are exactly the same. Explore what shapes every unique harvest.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=900",
  },
];

const Honey = () => {
  return (
    <div className="honey-page">
      <Navbar />

      <main className="honey-container">
        <Link to="/our-story" className="honey-back-link">
          ← Back to Journal
        </Link>

        <header className="honey-header">
          <p className="honey-category-label">CATEGORY</p>

          <h1>Honey.</h1>

          <p className="honey-subtitle">
            From forest blossoms to the jar, explore raw honey and traditional
            harvesting methods passed down through generations.
          </p>
        </header>

        <section className="honey-featured">
          <div className="honey-featured-image">
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200"
              alt="Raw honey"
            />
          </div>

          <div className="honey-featured-content">
            <p className="honey-meta">
              FEATURED • HONEY • 8 MIN READ
            </p>

            <h2>
              The Liquid Gold: Understanding the Nuances of Raw Forest Honey.
            </h2>

            <p className="honey-description">
              Discover why true raw honey is a living food, complex in flavour
              and rich in history. We journey into wild forests to uncover the
              secrets of bees that forage on untouched blossoms.
            </p>
          </div>
        </section>

        <section className="honey-articles">
          {articles.map((article, index) => (
            <article
              className={`honey-card ${
                index % 2 !== 0 ? "honey-card-reverse" : ""
              }`}
              key={article.title}
            >
              <div className="honey-card-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="honey-card-content">
                <p className="honey-meta">
                  {article.category} • {article.readTime}
                </p>

                <h3>{article.title}</h3>

                <p className="honey-description">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="honey-shop-wrap">
          <Link to="/products" className="honey-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      <footer className="honey-footer">
        <h2>AMRUTHAHARA</h2>

        <div className="honey-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .honey-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #1b3022 !important;
          font-family: Arial, Helvetica, sans-serif;
        }

        .honey-page * {
          box-sizing: border-box;
        }

        .honey-page h1,
        .honey-page h2,
        .honey-page h3,
        .honey-page p,
        .honey-page span,
        .honey-page a {
          opacity: 1 !important;
        }

        .honey-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        .honey-back-link {
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

        .honey-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .honey-category-label {
          margin: 0 0 20px;

          color: #6f786f !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-transform: uppercase;
        }

        .honey-header h1 {
          margin: 0 0 22px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;

          line-height: 1.08 !important;
          letter-spacing: 0 !important;
        }

        .honey-subtitle {
          max-width: 720px;
          margin: 0 auto;

          color: #526058 !important;

          font-size: 18px;
          font-style: italic;
          line-height: 1.7;

          text-align: center;
        }

        .honey-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          margin-bottom: 120px;
          padding-bottom: 90px;

          border-bottom: 1px solid #dedbd3;
        }

        .honey-featured-image {
          overflow: hidden;
        }

        .honey-featured-image img {
          display: block;

          width: 100%;
          height: 500px;

          object-fit: cover;
        }

        .honey-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 500px;

          padding: 20px 25px;

          text-align: left;
        }

        .honey-meta {
          margin: 0 0 17px;

          color: #8b684e !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .honey-featured-content h2 {
          margin: 0 0 25px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 3.2vw, 50px);
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 0 !important;

          text-align: left;
        }

        .honey-description {
          margin: 0;

          color: #526058 !important;

          font-size: 15px;
          line-height: 1.8;

          text-align: left;
        }

        .honey-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;

          gap: 70px;

          padding: 75px 0;

          border-bottom: 1px solid #dedbd3;
        }

        .honey-card-reverse .honey-card-image {
          order: 2;
        }

        .honey-card-reverse .honey-card-content {
          order: 1;
        }

        .honey-card-image {
          overflow: hidden;
        }

        .honey-card-image img {
          display: block;

          width: 100%;
          height: 390px;

          object-fit: cover;
        }

        .honey-card-content {
          width: 100%;
          max-width: 500px;

          text-align: left;
        }

        .honey-card h3 {
          margin: 0 0 20px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 2.7vw, 40px);
          font-weight: 400;

          line-height: 1.25 !important;
          letter-spacing: 0 !important;

          text-align: left;
        }

        .honey-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .honey-shop-button {
          display: inline-block;

          padding: 16px 34px;

          background: #1b3022;
          color: #fbf9f4 !important;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;

          text-decoration: none;
        }

        .honey-footer {
          padding: 90px 20px 60px;

          border-top: 1px solid #dedbd3;

          background: #f5f3ee;

          text-align: center;
        }

        .honey-footer h2 {
          margin: 0 0 35px;

          color: #1b3022 !important;

          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;

          line-height: 1.2 !important;
          letter-spacing: 3px;
        }

        .honey-footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 28px;

          margin-bottom: 35px;
        }

        .honey-footer-links span {
          color: #526058 !important;

          font-size: 12px;

          text-decoration: underline;
        }

        .honey-footer p {
          margin: 0;

          color: #737c76 !important;

          font-size: 9px;
          letter-spacing: 1.3px;
        }

        @media (max-width: 900px) {
          .honey-container {
            width: calc(100% - 50px);
          }

          .honey-featured,
          .honey-card {
            gap: 45px;
          }

          .honey-featured-image img {
            height: 430px;
          }

          .honey-featured-content {
            min-height: 430px;
          }

          .honey-card-image img {
            height: 330px;
          }
        }

        @media (max-width: 700px) {
          .honey-container {
            width: calc(100% - 34px);
            padding-top: 35px;
          }

          .honey-back-link {
            margin-bottom: 45px;
          }

          .honey-header {
            margin-bottom: 55px;
          }

          .honey-header h1 {
            font-size: 43px;
          }

          .honey-subtitle {
            font-size: 15px;
          }

          .honey-featured,
          .honey-card {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .honey-featured {
            margin-bottom: 55px;
            padding-bottom: 55px;
          }

          .honey-featured-image img,
          .honey-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .honey-featured-content {
            min-height: auto;
            padding: 0;
          }

          .honey-featured-content h2 {
            font-size: 31px;
            line-height: 1.22 !important;
          }

          .honey-card-reverse .honey-card-image,
          .honey-card-reverse .honey-card-content {
            order: initial;
          }

          .honey-card {
            padding: 50px 0;
          }

          .honey-card h3 {
            font-size: 28px;
            line-height: 1.25 !important;
          }

          .honey-shop-wrap {
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Honey;