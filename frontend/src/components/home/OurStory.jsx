import React from "react";
import { useNavigate } from "react-router-dom";

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .story-section-wrapper {
          width: 100%;
          background: linear-gradient(180deg, #FAF8F5 0%, #F1F6EC 100%);
          padding: 120px 0;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .story-container-grid {
          width: 90%;
          max-width: 1380px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
          align-items: center;
        }

        .story-visual-column {
          position: relative;
        }

        .story-image-frame {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 30px 70px -15px rgba(10, 38, 25, 0.2);
          border: 6px solid #FFFFFF;
        }

        .story-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .story-image-frame:hover .story-main-img {
          transform: scale(1.05);
        }

        .story-badge-glass {
          position: absolute;
          bottom: 30px;
          left: -30px;
          padding: 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(10, 38, 25, 0.12);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 2;
        }

        .badge-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          background: #124029;
          color: #D4A359;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-num-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #0A2619;
          line-height: 1;
        }

        .badge-sub-label {
          font-size: 12px;
          color: #6C7D73;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          font-weight: 600;
        }

        .story-content-column {
          padding-left: 20px;
        }

        .story-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #D4A359;
          margin-bottom: 20px;
        }

        .story-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(38px, 4.5vw, 60px);
          line-height: 1.1;
          font-weight: 700;
          color: #0A2619;
          margin: 0 0 24px 0;
          letter-spacing: -0.5px;
        }

        .story-heading-highlight {
          color: #124029;
          font-style: italic;
        }

        .story-gold-divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #D4A359 0%, rgba(212, 163, 89, 0.2) 100%);
          border-radius: 2px;
          margin-bottom: 32px;
        }

        .story-paragraph {
          font-size: 17px;
          line-height: 1.8;
          color: #405248;
          margin: 0 0 20px 0;
          font-weight: 400;
        }

        .story-paragraph:last-of-type {
          margin-bottom: 40px;
        }

        .story-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          border-radius: 100px;
          background: #124029;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(18, 64, 41, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .story-cta-button:hover {
          background: #0B2B1B;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(18, 64, 41, 0.35);
        }

        .story-cta-button svg {
          transition: transform 0.3s ease;
        }

        .story-cta-button:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .story-container-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .story-content-column {
            padding-left: 0;
            text-align: center;
          }
          .story-gold-divider {
            margin: 0 auto 32px;
          }
          .story-badge-glass {
            left: 20px;
          }
          .story-image-frame {
            height: 480px;
          }
        }

        @media (max-width: 640px) {
          .story-section-wrapper {
            padding: 70px 0;
          }
          .story-image-frame {
            height: 380px;
          }
          .story-cta-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section className="story-section-wrapper">
        <div className="story-container-grid">
          <div className="story-visual-column">
            <div className="story-image-frame">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85"
                alt="Amruthahara sustainable organic farmland"
                className="story-main-img"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85";
                }}
              />
            </div>

            <div className="story-badge-glass">
              <div className="badge-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="badge-num-text">100% Pure</div>
                <div className="badge-sub-label">Ethically Farmed</div>
              </div>
            </div>
          </div>

          <div className="story-content-column">
            <span className="story-eyebrow">
              ✦ Our Heritage & Philosophy
            </span>

            <h2 className="story-heading">
              From the heart of nature, <br />
              <span className="story-heading-highlight">crafted for your home.</span>
            </h2>

            <div className="story-gold-divider"></div>

            <p className="story-paragraph">
              At Amruthahara, our journey originates from a simple conviction — that true vitality is derived only from uncompromised natural purity.
            </p>

            <p className="story-paragraph">
              We directly partner with local organic agrarian communities to source nutrient-rich, pesticide-free harvests that preserve soil health and honor traditional cultivation practices.
            </p>

            <p className="story-paragraph">
              Every curated item reflects our dedication to sustainable living, pristine taste, and whole-family wellness.
            </p>

            <button className="story-cta-button" onClick={() => navigate("/about")}>
              <span>Discover Our Heritage</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}