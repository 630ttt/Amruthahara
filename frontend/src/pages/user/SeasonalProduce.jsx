import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Seasonal Produce</h1>
          <p>Celebrate nature's changing rhythm through fresh harvests.</p>
        </header>

        <JournalFilters active="/seasonal-produce" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200"
            alt="Basket of seasonal vegetables"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Seasonal Produce • 8 min read
            </p>
            <h2>Eating With the Seasons</h2>
            <p>
              Discover the unparalleled flavour and nutritional benefits of
              produce harvested at its absolute peak. A journey into the heart
              of agricultural rhythms and the natural cycle of every harvest.
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

export default SeasonalProduce;
