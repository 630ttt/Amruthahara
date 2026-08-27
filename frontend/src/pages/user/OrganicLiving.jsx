import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "ORGANIC LIVING",
    readTime: "4 MIN READ",
    title: "Creating a Naturally Mindful Home",
    description:
      "Small changes for healthier spaces. Discover how integrating natural materials, plants, and thoughtful choices can create a calmer and healthier home.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "ORGANIC LIVING",
    readTime: "5 MIN READ",
    title: "Why Conscious Consumption Matters",
    description:
      "Thoughtful purchasing decisions make a difference. Explore the profound impact of choosing quality, sustainability, and products made with care.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "ORGANIC LIVING",
    readTime: "3 MIN READ",
    title: "Simple Rituals for Slower Mornings",
    description:
      "Habits inspired by nature. Cultivate a sense of peace before the day begins with simple routines designed for slower and more mindful mornings.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=900",
  },
];

const OrganicLiving = () => {
  return (
    <div className="organic-page">
      <Navbar />

      <main className="organic-container">
        <Link to="/our-story" className="organic-back-link">
          ← Back to Journal
        </Link>

        <header className="organic-header">
          <p className="organic-category-label">CATEGORY</p>
          <h1>Organic Living.</h1>
          <p className="organic-subtitle">
            Thoughtful choices, slower rhythms, and a deeper connection with
            nature.
          </p>
        </header>

        <section className="organic-featured">
          <div className="organic-featured-image">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200"
              alt="Organic lifestyle"
            />
          </div>

          <div className="organic-featured-content">
            <p className="organic-meta">
              FEATURED • ORGANIC LIVING • 6 MIN READ
            </p>

            <h2>The Art of Slow and Organic Living.</h2>

            <p className="organic-description">
              Living organically is about more than the food we eat. It is
              about creating mindful routines, choosing natural products and
              embracing a slower way of living that keeps us connected with
              nature.
            </p>
          </div>
        </section>

        <section>
          {articles.map((article, index) => (
            <article
              className={`organic-card ${
                index % 2 !== 0 ? "organic-card-reverse" : ""
              }`}
              key={article.title}
            >
              <div className="organic-card-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="organic-card-content">
                <p className="organic-meta">
                  {article.category} • {article.readTime}
                </p>

                <h3>{article.title}</h3>

                <p className="organic-description">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="organic-shop-wrap">
          <Link to="/products" className="organic-shop-button">
            EXPLORE THE SHOP
          </Link>
        </div>
      </main>

      <footer className="organic-footer">
        <h2>AMRUTHAHARA</h2>
        <div className="organic-footer-links">
          <span>Philosophy</span>
          <span>Heritage</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
        <p>© 2026 AMRUTHAHARA JOURNAL. ALL RIGHTS RESERVED.</p>
      </footer>

      <style>{`
        .organic-page {
          min-height: 100vh;
          background: #fbf9f4;
          color: #30251f;
          font-family: Arial, Helvetica, sans-serif;
        }

        .organic-page * {
          box-sizing: border-box;
        }

        .organic-container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding: 55px 0 110px;
        }

        .organic-back-link {
          display: block;
          width: fit-content;
          margin: 0 auto 65px;
          color: #30251f !important;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .organic-header {
          max-width: 900px;
          margin: 0 auto 85px;
          text-align: center;
        }

        .organic-category-label {
          margin: 0 0 20px;
          color: #806f65 !important;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .organic-header h1 {
          margin: 0 0 22px;
          color: #30251f !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(55px, 6vw, 78px);
          font-weight: 400;
          line-height: 1.08 !important;
        }

        .organic-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #71645d !important;
          font-size: 18px;
          line-height: 1.7;
          text-align: center;
        }

        .organic-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          margin-bottom: 120px;
          padding-bottom: 90px;
          border-bottom: 1px solid #dfdbd3;
        }

        .organic-featured-image img {
          display: block;
          width: 100%;
          height: 500px;
          object-fit: cover;
        }

        .organic-featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 500px;
          padding: 20px 25px;
          text-align: left;
        }

        .organic-meta {
          margin: 0 0 17px;
          color: #806f65 !important;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .organic-featured-content h2 {
          margin: 0 0 25px;
          color: #30251f !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 3.2vw, 50px);
          font-weight: 400;
          line-height: 1.18 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .organic-description {
          margin: 0;
          color: #756a64 !important;
          font-size: 15px;
          line-height: 1.8;
          text-align: left;
        }

        .organic-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
          padding: 75px 0;
          border-bottom: 1px solid #dfdbd3;
        }

        .organic-card-reverse .organic-card-image {
          order: 2;
        }

        .organic-card-reverse .organic-card-content {
          order: 1;
        }

        .organic-card-image img {
          display: block;
          width: 100%;
          height: 390px;
          object-fit: cover;
        }

        .organic-card-content {
          max-width: 500px;
          text-align: left;
        }

        .organic-card h3 {
          margin: 0 0 20px;
          color: #30251f !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 2.7vw, 40px);
          font-weight: 400;
          line-height: 1.22 !important;
          letter-spacing: 0 !important;
          text-align: left;
        }

        .organic-shop-wrap {
          padding-top: 90px;
          text-align: center;
        }

        .organic-shop-button {
          display: inline-block;
          padding: 16px 34px;
          background: #30251f;
          color: #fbf9f4 !important;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .organic-footer {
          padding: 90px 20px 60px;
          background: #f5f2ed;
          text-align: center;
        }

        .organic-footer h2 {
          color: #30251f !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: 3px;
        }

        .organic-footer-links {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin: 35px 0;
        }

        .organic-footer-links span {
          color: #75665e;
          font-size: 12px;
          text-decoration: underline;
        }

        .organic-footer p {
          color: #91877f;
          font-size: 9px;
        }

        @media (max-width: 700px) {
          .organic-container {
            width: calc(100% - 34px);
          }

          .organic-featured,
          .organic-card {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .organic-card-reverse .organic-card-image,
          .organic-card-reverse .organic-card-content {
            order: initial;
          }

          .organic-featured-image img,
          .organic-card-image img {
            height: auto;
            aspect-ratio: 4 / 3;
          }

          .organic-featured-content {
            min-height: auto;
            padding: 0;
          }

          .organic-header h1 {
            font-size: 43px;
          }

          .organic-featured-content h2 {
            font-size: 31px;
          }

          .organic-card h3 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrganicLiving;