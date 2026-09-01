import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Farmer Stories</h1>
          <p>
            Meet the hands behind every harvest and discover rooted values.
          </p>
        </header>

        <JournalFilters active="/farmer-stories" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1595053826286-2e59efd9ff18?auto=format&fit=crop&q=80&w=1200"
            alt="Farmer standing in a field"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Farmer Stories • 8 min read
            </p>
            <h2>Meet the Hands Behind the Harvest</h2>
            <p>
              Behind every harvest is a person, a family and a story shaped by
              the land. Meet the farmers whose patience, knowledge and
              commitment to natural cultivation bring every Amruthahara harvest
              to life.
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

export default FarmerStories;
