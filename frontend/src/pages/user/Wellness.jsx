import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Wellness</h1>
          <p>
            Natural rituals, wholesome ingredients, and simple practices for a
            calmer and more balanced way of living.
          </p>
        </header>

        <JournalFilters active="/wellness" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
            alt="Returning to nature for everyday wellness"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Wellness • 5 min read</p>
            <h2>Returning to Nature for Everyday Wellness.</h2>
            <p>
              Discover the grounding power of aligning our daily rhythms with
              the natural world. Simple rituals, mindful choices and a closer
              connection with nature can bring a greater sense of balance into
              everyday life.
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

export default Wellness;
