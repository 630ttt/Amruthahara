import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

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
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <Link to="/our-story" className="ah-journal-back">
          ← Back to Journal
        </Link>

        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">Category</p>
          <h1>Honey</h1>
          <p>
            From forest blossoms to the jar, explore raw honey and traditional
            harvesting methods passed down through generations.
          </p>
        </header>

        <JournalFilters active="/honey" />

        <section className="ah-journal-featured">
          <img
            src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200"
            alt="Raw honey"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Honey • 8 min read</p>
            <h2>
              The Liquid Gold: Understanding the Nuances of Raw Forest Honey.
            </h2>
            <p>
              Discover why true raw honey is a living food, complex in flavour
              and rich in history. We journey into wild forests to uncover the
              secrets of bees that forage on untouched blossoms.
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
          <Link to="/products?search=honey" className="ah-journal-btn">
            Explore the Shop
          </Link>
        </div>
      </main>

      <AdyaFooter />
    </div>
  );
};

export default Honey;
