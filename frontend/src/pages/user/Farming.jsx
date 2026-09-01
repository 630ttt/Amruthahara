import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "CULTIVATION",
  
    title: "Growing With Nature, Not Against It",
    description:
      "Understanding the delicate balance of local ecosystems to foster crop resilience and natural vitality without synthetic intervention.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "SOIL SCIENCE",
   
    title: "Why Healthy Soil Creates Better Harvests",
    description:
      "Delve into the microscopic world beneath our feet and learn why soil health is the cornerstone of nutrient-dense organic produce.",
    image:
      "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "HERITAGE",
   
    title: "Traditional Farming Knowledge That Still Matters",
    description:
      "Revisiting ancestral techniques like crop rotation and companion planting that have sustained lands for generations.",
    image:
      "https://images.unsplash.com/photo-1627920769842-6887c6df05ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
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
            src="https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fEZhcm1pbmd8ZW58MHx8MHx8fDA%3D"
            alt="Sustainable farming"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">Featured • Farming </p>
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
