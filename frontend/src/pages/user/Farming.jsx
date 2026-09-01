import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "CULTIVATION",
    readTime: "5 MIN READ",
    title: "Growing With Nature, Not Against It",
    description:
      "Understanding the delicate balance of local ecosystems to foster crop resilience and natural vitality without synthetic intervention.",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "SOIL SCIENCE",
    readTime: "8 MIN READ",
    title: "Why Healthy Soil Creates Better Harvests",
    description:
      "Delve into the microscopic world beneath our feet and learn why soil health is the cornerstone of nutrient-dense organic produce.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "HERITAGE",
    readTime: "6 MIN READ",
    title: "Traditional Farming Knowledge That Still Matters",
    description:
      "Revisiting ancestral techniques like crop rotation and companion planting that have sustained lands for generations.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=900",
  },
  {
    category: "PEOPLE",
    readTime: "10 MIN READ",
    title: "A Day in the Life of an Organic Farmer",
    description:
      "Follow the rhythm of the seasons through the daily routines of those who steward the land with patience and purpose.",
    image:
      "https://images.unsplash.com/photo-1595053826286-2e59efd9ff18?auto=format&fit=crop&q=80&w=900",
  },
];

const Farming = () => {
  return (
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Farming</h1>
          <p>
            Stories from the soil, sustainable cultivation, and the people who
            grow with patience and purpose.
          </p>
        </header>

        <JournalFilters active="/farming" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
            alt="Sustainable farming"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Farming • 8 min read</p>
            <h2>From Soil to Soul: The Philosophy of Sustainable Farming</h2>
            <p>
              Discover how ancient agricultural wisdom intersects with modern
              ecological needs. We explore the profound connection between the
              earth we tend and the food that nourishes us.
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

export default Farming;
