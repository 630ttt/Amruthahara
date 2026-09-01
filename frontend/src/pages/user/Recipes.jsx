import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Recipes</h1>
          <p>
            Wholesome recipes inspired by fresh harvests and traditional
            ingredients.
          </p>
        </header>

        <JournalFilters active="/recipes" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
            alt="Rustic kitchen with natural ingredients"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Recipes • 8 min read</p>
            <h2>Golden Honey Recipes for Everyday Wellness</h2>
            <p>
              Discover the versatility of our pure, raw honey. From soothing
              morning elixirs to subtle culinary glazes, these foundational
              recipes bring natural sweetness and deep nourishment to your
              daily rituals.
            </p>
          </div>
        </section>

        <section className="ah-journal-grid">
          {articles.map((article) => (
            <article className="ah-journal-card" key={article.title}>
              <div className="ah-journal-card-image">
                <img src={article.image} alt={article.title} />
                <span className="ah-journal-tag">{article.category}</span>
              </div>
              <div className="ah-journal-card-body">
                <p className="ah-journal-meta">{article.readTime}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </article>
          ))}
        </section>

        <div className="ah-journal-actions">
          <Link to="/products" className="ah-journal-btn">
            Explore the Shop
          </Link>
        </div>
      </main>

      <AdyaFooter />
    </div>
  );
};

export default Recipes;
