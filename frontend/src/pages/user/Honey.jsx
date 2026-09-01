import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "HARVESTING",
   
    title: "How Raw Honey Travels From Hive to Home.",
    description:
      "The journey of raw honey is one of careful preservation. We trace the steps from remote forest apiaries to your pantry, ensuring every drop retains its natural goodness.",
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9uZXl8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "TASTING",
  
    title: "Understanding the Flavours of Forest Honey.",
    description:
      "Just like wine, honey reflects its terroir. Learn to identify subtle floral notes, woody undertones and the character of authentic wild forest harvests.",
    image:
      "https://images.unsplash.com/photo-1623018697148-8350cf18e64e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SG9uZXl8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "HERITAGE",
 
    title: "Traditional Uses of Honey Across Generations.",
    description:
      "Beyond sweetness, honey has served as a treasured part of traditional food and family practices passed down through generations.",
    image:
      "https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SG9uZXl8ZW58MHx8MHx8fDA%3D",
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
            src="https://plus.unsplash.com/premium_photo-1664299207508-2dd2b19d8bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEhvbmV5fGVufDB8fDB8fHww"
            alt="Raw honey"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Honey</p>
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
