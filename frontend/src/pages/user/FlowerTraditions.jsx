import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Flower Traditions</h1>
          <p>
            Sacred blooms, timeless rituals, and stories carried through
            flowers.
          </p>
        </header>

        <JournalFilters active="/flower-traditions" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=1200"
            alt="Traditional flowers"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Flower Traditions • 8 min read
            </p>
            <h2>
              Sacred Blooms: The Role of Marigolds in Traditional Rituals.
            </h2>
            <p>
              Explore the deep-rooted significance of marigolds in festive and
              spiritual ceremonies, tracing their vibrant journey from local
              farms to sacred spaces.
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

export default FlowerTraditions;
