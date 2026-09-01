import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "FARM UPDATES",
   
    title: "What Is Fresh on the Farm This Month",
    description:
      "An inside look at the vibrant crops currently coming into season across our partner farms, and how to make the most of them.",
    image:
      "https://images.unsplash.com/photo-1675112462373-e88f23730937?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNlYXNvbmFsJTIwUHJvZHVjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "NUTRITION",
   
    title: "Why Seasonal Produce Tastes Better",
    description:
      "Exploring the science and sensory experience behind eating foods exactly when nature intended them to be enjoyed.",
    image:
      "https://images.unsplash.com/photo-1624428208367-991295ceb69c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fFNlYXNvbmFsJTIwUHJvZHVjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "EDUCATION",
   
    title: "Understanding Nature's Harvest Calendar",
    description:
      "A comprehensive guide to anticipating the natural cycles of growth and harvest throughout the shifting seasons.",
    image:
      "https://images.unsplash.com/photo-1663411760528-c2e0d2a35fed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fFNlYXNvbmFsJTIwUHJvZHVjZXxlbnwwfHwwfHx8MA%3D%3D",
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
            src="https://plus.unsplash.com/premium_photo-1664527307650-7de397f25c79?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Basket of seasonal vegetables"
          />
          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Seasonal Produce 
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

       
      </main>

      <AdyaFooter />
    </div>
  );
};

export default SeasonalProduce;
