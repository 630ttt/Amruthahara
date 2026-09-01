import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "HERITAGE",
    
    title: "Generations Rooted in the Same Soil",
    description:
      "A deep dive into the families who have cultivated the same land for centuries, passing down traditional ecological knowledge alongside ancestral seeds.",
    image:
      "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmFybWVyJTIwU3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "SUSTAINABILITY",
    
    title: "Why Small Farmers Choose Organic Methods",
    description:
      "Understanding the shift toward regenerative practices and how individual farmers are leading the way in protecting local biodiversity.",
    image:
      "https://images.unsplash.com/photo-1619314383191-3d75d5e26a7f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "COMMUNITY",
    
    title: "Women Who Keep Farming Traditions Alive",
    description:
      "Celebrating the vital role of women in rural agriculture, from seed preservation to the stewardship of traditional farming rituals.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RmFybWVyJTIwU3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D",
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
            src="https://plus.unsplash.com/premium_photo-1682092660676-c68b30dce510?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fEZhcm1lciUyMFN0b3JpZXN8ZW58MHx8MHx8fDA%3D"
            alt="Farmer standing in a field"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Farmer Stories 
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
