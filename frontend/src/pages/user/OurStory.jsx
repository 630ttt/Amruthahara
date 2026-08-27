import Navbar from "../../components/layout/Navbar";
import image1 from "./images/image1.png";
import { Link } from "react-router-dom";

const articles = [
  { image: "/src/pages/user/images/image2.png", header: "Sacred Blooms: The Role of Marigolds in Traditional Rituals", text: "Explore the cultural significance and spiritual resonance of the marigold flower, a staple in our organic floral offerings and seasonal…", time: "6 min read" },
  { image: "/src/pages/user/images/image3.png", header: "Embracing the Autumn Harvest:What to Eat Now", text: "As the air turns crisp, the earth offers a newbounty. A guide to selecting, storing, andsavoring the best organic produce of the fall…", time: "4 min read" },
  { image: "/src/pages/user/images/image4.png", header: "Generations in the Soil: An Interview with Master Farmer…", text: "We sit down with a third-generation stewardof the land to discuss the philosophy of regenerative agriculture and the patience…", time: "10 min read" },
  { image: "/src/pages/user/images/image5.png", header: "Morning Rituals: Grounding Yourself with Nature's Elements", text: "Simple, mindful practices incorporating natural herbs and raw honey to start your day with intention and clarity.", time: "6 min read" },
  { image: "/src/pages/user/images/image6.png", header: "Roasted Root Vegetable Salad with Honey Mustard Vinaigrette", text: "A simple yet elegant recipe that elevates humble farm-fresh root vegetables with a delicate, tangy, and sweet homemade…", time: "3 min read" },
  { image: "/src/pages/user/images/image7.png", header: "The Science of Soil: Why Dirt Matters More Than You Think", text: "An in-depth look at soil microbiomes, crop rotation, and how treating the earth as a living organism leads to superior, nutrient-dense…", time: "7 min read" },
];

const categories = [
  "All",
  "Organic Living",
  "Honey",
  "Flower Traditions",
  "Farming",
  "Recipes",
  "Farmer Stories",
  "Seasonal Produce",
  "Wellness",
];

const OurStory = () => {
  return (
    <div className="journal-page">
      <Navbar />

      <main className="journal-container">
        <header className="journal-header">
          <h1>The Amruthahara Journal</h1>
          <p>
            A curated exploration of organic living, sustainable farming, and
            the quiet luxury of nature&apos;s finest offerings.
          </p>

          <nav className="journal-filters">
  <Link to="/our-story" className="journal-filter active">
    All
  </Link>

  <Link to="/organic-living" className="journal-filter">
    Organic Living
  </Link>

  <Link to="/honey" className="journal-filter">
    Honey
  </Link>

  <Link to="/flower-traditions" className="journal-filter">
    Flower Traditions
  </Link>

  <Link to="/farming" className="journal-filter">
    Farming
  </Link>

  <Link to="/recipes" className="journal-filter">
    Recipes
  </Link>

  <Link to="/farmer-stories" className="journal-filter">
    Farmer Stories
  </Link>

  <Link to="/seasonal-produce" className="journal-filter">
    Seasonal Produce
  </Link>

  <Link to="/wellness" className="journal-filter">
  Wellness
</Link>
</nav>
        </header>

        <section className="featured-article">
          <div className="featured-image">
            <img src={image1} alt="Honey" />
          </div>
          <div className="featured-content">
            <span className="featured-meta">Featured • 8 min read</span>
            <h2>HONEY</h2>
            <p>The Liquid Gold:Understanding the Nuances of Raw Forest Honey</p>
            <a href="#article-1">Journey with us into the heart of the ancient forests where our bees forage. Discover the complex flavor profiles, medicinal properties, and the sustainable harvesting techniques that make our honey a true elixir of nature. →</a>
          </div>
        </section>

        <section className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article.image}>
              <div className="card-image-wrap">
                <img
                  src={article.image}
                  alt={article.header}
                  className="card-image"
                />
                <span className="article-tag">Category</span>
              </div>

              <p className="article-meta">Date • {article.time}</p>
              <h3>{article.header}</h3>
              <p className="article-description">{article.text}</p>
            </article>
          ))}
        </section>

        <button type="button" className="load-more">
          Load More Articles
        </button>
      </main>

      <style>{`
        .journal-page {
          min-height: 100vh;
          background: #ffffff;
          color: #062217;
          font-family: Arial, Helvetica, sans-serif;
        }

        .journal-page * {
          box-sizing: border-box;
        }

        .journal-container {
          width: min(1160px, calc(100% - 40px));
          margin: 0 auto;
          padding: 58px 0 70px;
        }

        .journal-header {
          max-width: 760px;
          margin: 0 auto 72px;
          text-align: center;
        }

        .journal-header h1 {
          margin: 0 0 16px;
          color: #082b1d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.05;
        }

        .journal-header > p {
          max-width: 660px;
          margin: 0 auto 30px;
          color: #6d736f;
          font-size: 15px;
          line-height: 1.6;
        }

        .journal-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .journal-filter {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 10px 17px;
          border: 1px solid #e2e2dc;
          border-radius: 999px;

          background: #f7f5ee;
          color: #41443f;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;
          text-decoration: none;

          font-family: Arial, Helvetica, sans-serif;
          line-height: normal;
        }

        .journal-filter:hover {
          background: #ece9df;
          color: #41443f;
        }

        .journal-filter.active {
          border-color: #082b1d;
          background: #082b1d;
          color: white;
        }

        .featured-article {
          display: grid;
          grid-template-columns: 58% 42%;
          min-height: 510px;
          margin-bottom: 92px;
          overflow: hidden;
          border: 1px solid #dadbd5;
          border-radius: 13px;
          background: white;
        }

        .image-placeholder {
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #e7e2d3, #c8d5c4);
          color: #082b1d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          font-weight: 700;
        }

        .featured-image {
          min-height: 510px;
        }

        .featured-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(34px, 5vw, 68px);
        }

        .featured-meta {
          margin-bottom: 22px;
          color: #a94e2b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .featured-content h2 {
          margin: 0 0 22px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 3vw, 43px);
          line-height: 1.08;
        }

        .featured-content p {
          margin: 0 0 28px;
          color: #6d736f;
          line-height: 1.58;
        }

        .featured-content a {
          color: #082b1d;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        .article-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 64px 24px;
        }

        .card-image-wrap {
          position: relative;
          margin-bottom: 18px;
          overflow: hidden;
          border: 1px solid #dadbd5;
          border-radius: 12px;
        }

        .card-image {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
        }

        .article-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          color: #445047;
          font-size: 10px;
        }

        .article-meta {
          margin: 0 0 10px;
          color: #6d736f;
          font-size: 11px;
        }

        .article-card h3 {
          margin: 0 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          line-height: 1.18;
        }

        .article-description {
          margin: 0;
          color: #6d736f;
          font-size: 13px;
          line-height: 1.58;
        }

        .load-more {
          display: block;
          margin: 82px auto 0;
          padding: 12px 28px;
          border: 2px solid #a94e2b;
          border-radius: 999px;
          background: transparent;
          color: #a94e2b;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 820px) {
          .featured-article {
            grid-template-columns: 1fr;
          }

          .featured-image {
            min-height: 380px;
          }

          .article-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 540px) {
          .journal-container {
            width: calc(100% - 24px);
            padding-top: 36px;
          }

          .journal-header {
            margin-bottom: 46px;
          }

          .featured-article {
            margin-bottom: 55px;
          }

          .featured-image {
            min-height: 280px;
          }

          .featured-content {
            padding: 30px 24px;
          }

          .article-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .card-image {
            aspect-ratio: 5 / 4;
          }
        }
      `}</style>
    </div>
  );
};

export default OurStory;
