import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaQuoteLeft,
  FaPlay,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import ProductSection from "../../components/product/ProductSection";




import AdyaFooter from "../../components/home/AdyaFooter";

import "./Home.css";

const categories = [
  [
    "Flowers",
    "Wholesome staples for everyday meals",
    "https://www.thegardener.co.za/wp-content/uploads/2022/07/20211230_082031-copy.jpg",
  ],
  [
    "Fruits",
    "Slow pressed, full of natural goodness",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/09/27/all-the-fruits-cut-whole.jpg.rend.hgtvcom.1280.960.85.suffix/1632778035320.webp",
  ],
  [
    "Honey",
    "Golden, traditional pantry favourites",
    "https://foodcare.in/cdn/shop/files/honey_5e6a76b4-51e2-4d60-99d1-4fcc988e9370.png?v=1768271233",
  ],
  [
    "Vegetables",
    "Ancient grains for modern kitchens",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNdRl4vDC-0wCrauzr5TLpjPveaIBcb7lcdflKOe4Aa4olVvXjV6mVC28&s=10",
  ],
  [
    "Wellness boxes",
    "Honest flavour, thoughtfully made",
    "https://images.squarespace-cdn.com/content/v1/68a29a1723e21754f867ce91/a26c5af8-1ec0-4bab-8e4a-83b1a50bbdb1/OurRange-FruitBoxes-Block3-Pic1.jpg",
  ],
];

const featured = [
  [
    "A2 Cow Ghee",
    "Ghee",
    "Slow-cooked richness from traditionally raised cows",
    "₹899",
    "₹1,099",
    "18% OFF",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Raw Forest Honey",
    "Honey",
    "Unprocessed sweetness gathered from wild blooms",
    "₹549",
    "₹699",
    "21% OFF",
    "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Cold Pressed Sesame Oil",
    "Oils",
    "Nutty, nourishing oil for everyday cooking",
    "₹399",
    "₹499",
    "20% OFF",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Heritage Millet Flour",
    "Millets",
    "Stone-ground goodness for softer rotis",
    "₹249",
    "₹299",
    "17% OFF",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",
  ],
];

const reviews = [
  [
    "The ghee tastes just like the one my grandmother made. Beautifully packed and genuinely rich.",
    "Meera Shah",
    "Mumbai",
  ],
  [
    "Amruthahara has become our trusted pantry. The oils are fresh, fragrant and wonderfully clean.",
    "Ankit Menon",
    "Bengaluru",
  ],
  [
    "From the first order to delivery, everything feels considered. Real food with a real story.",
    "Kavya Reddy",
    "Hyderabad",
  ],
];

const stories = [
  [
    "Everyday Wellness",
    "5 nourishing breakfast ideas for busy mornings",
  ],
  [
    "Know Your Food",
    "How to choose a genuinely pure cooking oil",
  ],
  [
    "Traditional Wisdom",
    "Why millets belong in every modern kitchen",
  ],
];

const tabs = [
  "All",
  "Ghee",
  "Honey",
  "Oils",
  "Millets",
];

function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [email, setEmail] = useState("");

  const visibleProducts =
    activeTab === "All"
      ? featured
      : featured.filter(
          ([, category]) =>
            category.toLowerCase() === activeTab.toLowerCase()
        );

  const submitNewsletter = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    alert("Thank you for subscribing to Amruthahara!");

    setEmail("");
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {/* =========================================
            HERO
        ========================================== */}

        <Hero />

        {/* =========================================
            HERO BANNER
        ========================================== */}



        {/* =========================================
            CATEGORIES
        ========================================== */}

        <section className="amrutha-section amrutha-category-section">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                THE PANTRY EDIT
              </p>

              <h2>
                Explore our natural
                <br />
                <em>goodness.</em>
              </h2>
            </div>

            <p>
              Everything you need for a healthier,
              more mindful kitchen.
            </p>
          </div>

          <div className="amrutha-category-grid">
            {categories.map(([title, text, image]) => (
              <Link
                to="/products"
                className="amrutha-category-tile"
                key={title}
              >
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                />

                <div>
                  <span>{text}</span>

                  <h3>
                    {title}
                    <FaArrowRight />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================
            PRODUCTS
        ========================================== */}

        <section className="amrutha-products-wrap">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                CURATED FOR YOU
              </p>

              <h2>
                Our <em>bestsellers.</em>
              </h2>
            </div>

            <Link
              className="amrutha-text-button amrutha-dark-link"
              to="/products"
            >
              View all products
              <FaArrowRight />
            </Link>
          </div>

          <ProductSection />
        </section>

        



        {/* =========================================
            OUR STORY
        ========================================== */}

        <section
          className="amrutha-story-section"
          id="amrutha-story"
        >
          <div className="amrutha-story-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqnu3ws6lYfffRk_N9UTYxtW5EJo9jGwA2GI9H3T8nuqmXyPawmWEMPVwA&s=10"
              alt="Organic farm at sunrise"
              loading="lazy"
            />

            <span>
              Grown with
              <br />
              <strong>respect.</strong>
            </span>
          </div>

          <div className="amrutha-story-copy">
            <p className="amrutha-eyebrow">
              WHY AMRUTHAHARA
            </p>

            <h2>
              Good food begins
              <br />
              with <em>good choices.</em>
            </h2>

            <p>
              We believe food should be pure,
              honest and close to nature. That is
              why we work with thoughtful farmers
              and makers who honour every ingredient.
            </p>

            <ul>
              {[
                "Naturally sourced ingredients",
                "Traditional preparation",
                "Carefully selected farmers",
                "Quality you can trust",
              ].map((item) => (
                <li key={item}>
                  <FaCheck />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              className="amrutha-primary-button"
              to="/our-story"
            >
              Meet our farmers
              <FaArrowRight />
            </Link>
          </div>
        </section>

        {/* =========================================
            PROCESS
        ========================================== */}

        <section className="amrutha-process-section">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                THE AMRUTHAHARA PROMISE
              </p>

              <h2>
                From trusted farms
                <br />
                <em>to your home.</em>
              </h2>
            </div>
          </div>

          <div className="amrutha-process-row">
            {[
              ["01", "Carefully sourced"],
              ["02", "Naturally processed"],
              ["03", "Quality checked"],
              ["04", "Packed with care"],
              ["05", "Delivered to you"],
            ].map(([number, text], index) => (
              <div
                className="amrutha-process-step"
                key={number}
              >
                <span>{number}</span>

                <strong>{text}</strong>

                {index < 4 && (
                  <i>
                    <FaArrowRight />
                  </i>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            QUALITY BANNER
        ========================================== */}

        <section className="amrutha-quality-banner">
          <div>
            <p className="amrutha-eyebrow">
              AN HONEST PROMISE
            </p>

            <h2>
              Pure ingredients.
              <br />
              <em>Honest promise.</em>
            </h2>

            <p>
              No unnecessary additives.
              Naturally sourced.
              Traditionally made.
              Quality tested.
            </p>

            <Link
              className="amrutha-light-button"
              to="/products"
            >
              Shop the collection
              <FaArrowRight />
            </Link>
          </div>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKszjhOXfhzJGS8Yezbp-haJBEV1LSGYcC9lc-Gvy15iCd19ifpuHq3bw&s=10"
            alt="Traditional spices and grains"
            loading="lazy"
          />
        </section>

        {/* =========================================
            FEATURED PRODUCTS
        ========================================== */}

        <section className="amrutha-featured-section">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                THE EVERYDAY COLLECTION
              </p>

              <h2>
                Goodness for every
                <br />
                <em>Home.</em>
              </h2>
            </div>
          </div>

          <div className="amrutha-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={
                  activeTab === tab
                    ? "amrutha-tab-active"
                    : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="amrutha-featured-grid">
            {visibleProducts.map(
              ([
                name,
                category,
                description,
                price,
                oldPrice,
                discount,
                image,
              ]) => (
                <article
                  className="amrutha-featured-card"
                  key={name}
                >
                  <div className="amrutha-featured-image">
                    <span>{discount}</span>

                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                    />
                  </div>

                  <p>{category}</p>

                  <h3>{name}</h3>

                  <small>{description}</small>

                  <div>
                    <strong>{price}</strong>

                    <del>{oldPrice}</del>

                    <Link to="/products">
                      View
                      <FaArrowRight />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* =========================================
            OFFER
        ========================================== */}

        <section className="amrutha-offer-banner">
          <div>
            <p className="amrutha-eyebrow">
              A LITTLE MORE GOODNESS
            </p>

            <h2>
              A healthier kitchen
              <br />
              starts <em>today.</em>
            </h2>

            <p>
              Get 15% off your first order with
              code <strong>AMRUTHA15</strong>
            </p>

            <Link
              className="amrutha-light-button"
              to="/products"
            >
              Shop now
              <FaArrowRight />
            </Link>
          </div>

          <div className="amrutha-offer-circle">
            <span>
              15
              <small>% OFF</small>
            </span>

            <FaLeaf />
          </div>
        </section>

        {/* =========================================
            TESTIMONIAL
        ========================================== */}

      

        {/* =========================================
            REVIEWS
        ========================================== */}

        <section className="amrutha-review-section">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                FROM OUR COMMUNITY
              </p>

              <h2>
                Loved by families
                <br />
                <em>across India.</em>
              </h2>
            </div>

            <div className="amrutha-review-controls">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() =>
                  setReviewIndex(
                    (reviewIndex +
                      reviews.length -
                      1) %
                      reviews.length
                  )
                }
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next review"
                onClick={() =>
                  setReviewIndex(
                    (reviewIndex + 1) %
                      reviews.length
                  )
                }
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="amrutha-review-card">
            <FaQuoteLeft />

            <div className="amrutha-stars">
              ★★★★★
            </div>

            <blockquote>
              “{reviews[reviewIndex][0]}”
            </blockquote>

            <strong>
              {reviews[reviewIndex][1]}
            </strong>

            <span>
              Verified customer ·{" "}
              {reviews[reviewIndex][2]}
            </span>
          </div>
        </section>

        {/* =========================================
            JOURNAL
        ========================================== */}

        <section className="amrutha-journal-section">
          <div className="amrutha-section-heading">
            <div>
              <p className="amrutha-eyebrow">
                FROM OUR KITCHEN
              </p>

              <h2>
                Small stories,
                <br />
                <em>better living.</em>
              </h2>
            </div>

            <Link
              className="amrutha-text-button amrutha-dark-link"
              to="/organic-living"
            >
              Explore organic living
              <FaArrowRight />
            </Link>
          </div>

          <div className="amrutha-journal-grid">
            {stories.map(
              ([category, title], index) => (
                <Link
                  to="/organic-living"
                  className="amrutha-journal-card"
                  key={title}
                >
                  <div
                    className={`amrutha-journal-art amrutha-journal-art-${
                      index + 1
                    }`}
                  >
                    <FaPlay />
                  </div>

                  <p>{category}</p>

                  <h3>{title}</h3>

                  <span>
                    Read more
                    <FaArrowRight />
                  </span>
                </Link>
              )
            )}
          </div>
        </section>

        {/* =========================================
            NEWSLETTER
        ========================================== */}

        <section className="amrutha-newsletter">
          <div>
            <p className="amrutha-eyebrow">
              A NOTE FROM OUR PANTRY
            </p>

            <h2>
              Bring more goodness
              <br />
              <em>to your inbox.</em>
            </h2>

            <p>
              Healthy recipes, product stories
              and thoughtful offers from
              Amruthahara.
            </p>
          </div>

          <form onSubmit={submitNewsletter}>
            <label htmlFor="amrutha-email">
              Your email address
            </label>

            <div>
              <input
                id="amrutha-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                required
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                <FaArrowRight />
              </button>
            </div>

            <small>
              By subscribing, you agree to receive
              occasional updates from us.
            </small>
          </form>
        </section>

        {/* =========================================
            EXISTING OUR STORY COMPONENT
        ========================================== */}



        {/* =========================================
            FOOTER
        ========================================== */}

        <AdyaFooter />
      </main>
    </>
  );
}

export default Home;