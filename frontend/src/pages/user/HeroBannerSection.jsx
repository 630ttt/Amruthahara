import React, { useState, useEffect } from "react";

const BANNERS_DATA = [
  {
    id: 1,
    tagline: "MAKE THE SWITCH TO",
    heading: "mineral-rich sweetness",
    accentColor: "#A6521B",
    bgColor: "#FAF4EE",
    productName: "DATE PALM JAGGERY",
    brandName: "BY ADYA ORGANICS",
    netWeight: "Net Wt - 14.1 OZ (400 g)",
    badgeText: "Vegan | Chemical Free | No Added Sugar",
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        ),
        text: "Supports immunity & digestion",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        ),
        text: "Rich in antioxidants",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          </svg>
        ),
        text: "Unbleached & chemical-free",
      },
    ],
    bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
    productImg: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    tagline: "FRESH FROM THE ORCHARD",
    heading: "sun-ripened organic fruits",
    accentColor: "#D9531E",
    bgColor: "#FFF6EF",
    productName: "HARVEST FRUIT BASKET",
    brandName: "BY GREEN GROVE",
    netWeight: "Net Wt - 5.0 KG Assorted",
    badgeText: "100% Organic | Non-GMO | Tree Ripened",
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        text: "Packed with vital minerals & nutrients",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          </svg>
        ),
        text: "Pesticide & wax-free assurance",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        text: "Farm picked at full flavor",
      },
    ],
    bgImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1920&q=80",
    productImg: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    tagline: "100% PURE & RAW NECTAR",
    heading: "wild forest honey elixir",
    accentColor: "#D48806",
    bgColor: "#FFFBE6",
    productName: "RAW MULTIFLORA HONEY",
    brandName: "BY WILD WOODS",
    netWeight: "Net Wt - 17.6 OZ (500 g)",
    badgeText: "Unpasteurized | Filtered Naturally | Pure",
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        text: "Natural antibacterial & soothing power",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        ),
        text: "Preserves natural live pollen & enzymes",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
          </svg>
        ),
        text: "Zero sugar syrup or additives",
      },
    ],
    bgImage: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1920&q=80",
    productImg: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    tagline: "FARM TO TABLE NOURISHMENT",
    heading: "fresh A2 Gir cow milk",
    accentColor: "#1D39C4",
    bgColor: "#F0F5FF",
    productName: "ORGANIC A2 WHOLE MILK",
    brandName: "BY PURE PASTURES",
    netWeight: "Net Vol - 33.8 FL OZ (1 Litre)",
    badgeText: "Grass-Fed | Antibiotic-Free | Unprocessed",
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        text: "Easy to digest natural A2 protein",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        ),
        text: "Free from added growth hormones",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        ),
        text: "Chilled and delivered fresh daily",
      },
    ],
    bgImage: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1920&q=80",
    productImg: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    tagline: "HAND-PICKED BOTANICALS",
    heading: "edible organic flowers",
    accentColor: "#389E0D",
    bgColor: "#F6FFED",
    productName: "SUN-DRIED ROSE PETALS",
    brandName: "BY FLORAL ESSENCE",
    netWeight: "Net Wt - 7.0 OZ (200 g)",
    badgeText: "Culinary Grade | Handpicked | Sun Dried",
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        text: "100% Natural without artificial colors",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        ),
        text: "Perfect for teas, baking & garnishes",
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        text: "Sustainably harvested from organic gardens",
      },
    ],
    bgImage: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1920&q=80",
    productImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  }
];

export default function HeroBannerSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNERS_DATA.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = BANNERS_DATA[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* EXACT FULL SCREEN WIDTH & HEIGHT */
        .hero-banner-viewport {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 650px;
          overflow: hidden;
          background-color: ${currentBanner.bgColor};
          transition: background-color 0.8s ease-in-out;
        }

        /* Natural background photo layer with subtle zoom animation */
        .bg-natural-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.18;
          filter: saturate(1.2);
          animation: slowPulse 12s ease-in-out infinite alternate;
        }

        @keyframes slowPulse {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }

        /* Organic Curved Background Graphic Layer */
        .curve-overlay-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        /* Grid Layout across full screen height */
        .banner-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          padding: 0 8vw;
          box-sizing: border-box;
        }

        /* Text Animations */
        .fade-in-content {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .banner-tagline {
          font-size: clamp(14px, 1.2vw, 20px);
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #555555;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .banner-heading {
          font-size: clamp(38px, 4.5vw, 68px);
          font-weight: 800;
          color: ${currentBanner.accentColor};
          line-height: 1.05;
          margin: 0 0 32px 0;
          transition: color 0.5s ease;
        }

        .features-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 35px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .feature-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid ${currentBanner.accentColor};
          color: ${currentBanner.accentColor};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          flex-shrink: 0;
          transition: border-color 0.5s ease, color 0.5s ease;
        }

        .feature-text {
          font-size: clamp(16px, 1.4vw, 22px);
          font-weight: 600;
          color: #2D2D2D;
        }

        /* Floating Product Jar Glass Container */
        .product-media-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: floatAnimation 4s ease-in-out infinite alternate;
        }

        @keyframes floatAnimation {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }

        .product-glass-card {
          width: clamp(280px, 24vw, 380px);
          height: clamp(380px, 32vw, 500px);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(14px);
          border: 4px solid #FFFFFF;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          box-sizing: border-box;
          transition: transform 0.3s ease;
        }

        .product-glass-card:hover {
          transform: scale(1.02);
        }

        .product-image {
          width: 100%;
          height: 68%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .product-label-box {
          width: 100%;
          background: #FFFFFF;
          padding: 14px 12px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .label-brand {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #888888;
        }

        .label-title {
          font-size: 17px;
          font-weight: 800;
          color: ${currentBanner.accentColor};
          margin: 4px 0;
          transition: color 0.5s ease;
        }

        .label-badge {
          font-size: 11px;
          font-weight: 700;
          color: #555555;
          margin-bottom: 2px;
        }

        .label-weight {
          font-size: 11px;
          color: #999999;
          font-weight: 600;
        }

        /* Carousel Navigation Buttons & Indicators */
        .navigation-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0,0,0,0.08);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
        }

        .navigation-arrow:hover {
          background: #FFFFFF;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .nav-prev { left: 2vw; }
        .nav-next { right: 2vw; }

        .carousel-dots {
          position: absolute;
          bottom: 4vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 12px;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dot.active {
          width: 38px;
          border-radius: 20px;
          background: ${currentBanner.accentColor};
        }

        @media (max-width: 900px) {
          .banner-grid {
            grid-template-columns: 1fr;
            padding: 40px 6vw;
            gap: 20px;
            text-align: center;
          }
          .banner-heading {
            margin-bottom: 20px;
          }
          .features-container {
            align-items: center;
          }
          .feature-item {
            justify-content: center;
          }
          .product-media-wrapper {
            order: -1;
          }
          .product-glass-card {
            width: 230px;
            height: 290px;
          }
        }
      `}</style>

      <div className="hero-banner-viewport">
        {/* Natural Background Image Layer */}
        <img
          key={`bg-${currentBanner.id}`}
          src={currentBanner.bgImage}
          alt="Natural organic background"
          className="bg-natural-photo"
        />

        {/* Dynamic Curved Vector SVG Overlay */}
        <svg className="curve-overlay-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            d="M -100,200 C 400,700 900,-200 1600,400 L 1600,0 L -100,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.45"
          />
        </svg>

        {/* Hero Content Grid */}
        <div className="banner-grid">
          {/* Left Text & Features */}
          <div key={`text-${currentBanner.id}`} className="fade-in-content">
            <div className="banner-tagline">{currentBanner.tagline}</div>
            <h1 className="banner-heading">{currentBanner.heading}</h1>

            <div className="features-container">
              {currentBanner.features.map((item, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon-wrapper">{item.icon}</div>
                  <span className="feature-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Card */}
          <div className="product-media-wrapper">
            <div key={`card-${currentBanner.id}`} className="product-glass-card fade-in-content">
              <img
                src={currentBanner.productImg}
                alt={currentBanner.productName}
                className="product-image"
              />
              <div className="product-label-box">
                <div className="label-brand">{currentBanner.brandName}</div>
                <div className="label-title">{currentBanner.productName}</div>
                <div className="label-badge">{currentBanner.badgeText}</div>
                <div className="label-weight">{currentBanner.netWeight}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Arrow Controls */}
        <button
          className="navigation-arrow nav-prev"
          onClick={() => setActiveIndex((prev) => (prev === 0 ? BANNERS_DATA.length - 1 : prev - 1))}
          aria-label="Previous Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button
          className="navigation-arrow nav-next"
          onClick={() => setActiveIndex((prev) => (prev + 1) % BANNERS_DATA.length)}
          aria-label="Next Slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Carousel Bottom Dot Navigation */}
        <div className="carousel-dots">
          {BANNERS_DATA.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}