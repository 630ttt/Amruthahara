import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "HERITAGE",
   
    title: "Why Jasmine Holds a Special Place in Indian Traditions.",
    description:
      "Fragrant, delicate and deeply symbolic, jasmine has been woven into celebrations, ceremonies and everyday traditions for generations.",
    image:
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Rmxvd2VyfGVufDB8fDB8fHww",
  },
  {
    category: "RITUALS",
    
    title: "Flowers Used in Sacred Rituals and Their Meaning.",
    description:
      "A guide to the blooms chosen for offerings, ceremonies and sacred spaces, exploring the symbolism and spiritual meaning carried by every petal.",
    image:
      "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "AGRICULTURE",
   
    title: "From Farm to Garland: The Journey of Fresh Flowers.",
    description:
      "Follow the careful process of cultivating, harvesting and weaving traditional garlands, celebrating the farmers and artisans behind every bloom.",
    image:
      "https://media.istockphoto.com/id/2198211151/photo/vivid-orange-marigold-field-in-full-bloom-during-sunny-day-in-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=_oJX7Kn4RW1I_gSSFNVpQt7XteZGPUXdWc8_kVjgH6s=",
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
            src="https://images.unsplash.com/photo-1587471577460-bdb4891711ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fEZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Traditional flowers"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Flower Traditions 
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
