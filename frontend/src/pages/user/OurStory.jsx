import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import image1 from "../../user/images/image(1).png";
import image2 from "../../user/images/image(2).jpg";
import image3 from "../../user/images/image(3).jpg";
import image4 from "../../user/images/image(4).jpg";
import image5 from "../../user/images/image(5).jpg";
import JournalFilters from "./JournalFilters";
import "./journalTheme.css";

const articles = [
  {
    image: image2,
    header: "Sacred Blooms: The Role of Marigolds in Traditional Rituals",
    text: "Explore the cultural significance and spiritual resonance of the marigold flower, a staple in our organic floral offerings and seasonal…",
    time: "6 min read",
    tag: "Flower Traditions",
  },
  {
    image: image3,
    header: "Embracing the Autumn Harvest: What to Eat Now",
    text: "As the air turns crisp, the earth offers a new bounty. A guide to selecting, storing, and savoring the best organic produce of the fall…",
    time: "4 min read",
    tag: "Seasonal Produce",
  },
  {
    image: image4,
    header: "Generations in the Soil: An Interview with Master Farmer…",
    text: "We sit down with a third-generation steward of the land to discuss the philosophy of regenerative agriculture and the patience…",
    time: "10 min read",
    tag: "Farmer Stories",
  },
  {
    image: image5,
    header: "Morning Rituals: Grounding Yourself with Nature's Elements",
    text: "Simple, mindful practices incorporating natural herbs and raw honey to start your day with intention and clarity.",
    time: "6 min read",
    tag: "Wellness",
  },
  {
    image: image6,
    header: "Roasted Root Vegetable Salad with Honey Mustard Vinaigrette",
    text: "A simple yet elegant recipe that elevates humble farm-fresh root vegetables with a delicate, tangy, and sweet homemade…",
    time: "3 min read",
    tag: "Recipes",
  },
  {
    image: image7,
    header: "The Science of Soil: Why Dirt Matters More Than You Think",
    text: "An in-depth look at soil microbiomes, crop rotation, and how treating the earth as a living organism leads to superior, nutrient-dense…",
    time: "7 min read",
    tag: "Farming",
  },
];

const OurStory = () => {
  return (
    <div className="ah-journal">
      <Navbar />

      <main className="ah-journal-main">
        <header className="ah-journal-header">
          <p className="ah-journal-eyebrow">The Journal</p>
          <h1>The Amruthahara Journal</h1>
          <p>
            A curated exploration of organic living, sustainable farming, and
            the quiet luxury of nature&apos;s finest offerings.
          </p>
        </header>

        <JournalFilters active="/our-story" />

        <section className="ah-journal-featured">
          <img src={image1} alt="Honey" />
          <div className="ah-journal-featured-copy">
            <span className="ah-journal-meta">Featured • Honey • 8 min read</span>
            <h2>The Liquid Gold of Raw Forest Honey</h2>
            <p>
              Journey into the heart of the ancient forests where our bees
              forage. Discover the flavour, care, and harvesting that make
              this honey a true elixir of nature.
            </p>
            <Link to="/honey">Read the honey stories →</Link>
          </div>
        </section>

        <section className="ah-journal-grid">
          {articles.map((article) => (
            <article className="ah-journal-card" key={article.header}>
              <div className="ah-journal-card-image">
                <img src={article.image} alt={article.header} />
                <span className="ah-journal-tag">{article.tag}</span>
              </div>
              <div className="ah-journal-card-body">
                <p className="ah-journal-meta">{article.time}</p>
                <h3>{article.header}</h3>
                <p>{article.text}</p>
              </div>
            </article>
          ))}
        </section>

       
      </main>

      <AdyaFooter />
    </div>
  );
};

export default OurStory;
