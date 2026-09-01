import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "ORGANIC LIVING",
    readTime: "4 MIN READ",
    title: "Creating a Naturally Mindful Home",
    description:
      "Small changes for healthier spaces. Discover how integrating natural materials, plants, and thoughtful choices can create a calmer and healthier home.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_NGhcPPeFKANrQ_8j_dw97qshM27KeBCKcuVX3HznFdorAcRI15WHEA&s=10",
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
      "https://www.snexplores.org/wp-content/uploads/sites/3/2019/11/860-header-organic-ag-iStock_000017236342_Double.jpg",
  },
];

const OrganicLiving = () => {
  return (
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Organic Living</h1>
          <p>
            Thoughtful choices, slower rhythms, and a deeper connection with
            nature.
          </p>
        </header>

        <JournalFilters active="/organic-living" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200"
            alt="Organic lifestyle"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Organic Living • 6 min read
            </p>
            <h2>The Art of Slow and Organic Living</h2>
            <p>
              Living organically is about more than the food we eat. It is
              about creating mindful routines, choosing natural products and
              embracing a slower way of living that keeps us connected with
              nature.
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

export default OrganicLiving;
