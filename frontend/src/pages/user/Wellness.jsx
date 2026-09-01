
import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    category: "RITUALS",
    title: "Simple Morning Rituals Inspired by Nature.",
    description:
      "Starting the day with intention and grounded practices to cultivate lasting calm.",
    image:
      "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V2VsbG5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "NUTRITION",
    title: "Natural Ingredients for Everyday Wellbeing.",
    description:
      "Harnessing the potent, healing properties found in unprocessed, earth-derived staples.",
    image:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2VsbG5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "LIFESTYLE",
    title: "Finding Calm Through Slower Living.",
    description:
      "Reclaiming time and reducing noise in a fast-paced modern environment.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fFdlbGxuZXNzfGVufDB8fDB8fHww",
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
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fFdlbGxuZXNzfGVufDB8fDB8fHww"
            alt="Returning to nature for everyday wellness"
          />

          <div className="ah-journal-featured-copy">
            <p className="ah-journal-meta">
              Featured • Wellness
            </p>

            <h2>
              Returning to Nature for Everyday Wellness.
            </h2>

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
            <article
              className="ah-journal-card"
              key={article.title}
            >
              <div className="ah-journal-card-image">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                />

                <span className="ah-journal-tag">
                  {article.category}
                </span>
              </div>

              <div className="ah-journal-card-body">
                {article.readTime && (
                  <p className="ah-journal-meta">
                    {article.readTime}
                  </p>
                )}

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

export default Wellness;

