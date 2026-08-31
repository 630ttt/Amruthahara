import React, { useState } from 'react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Nidhi Jain",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "I’ve been a loyal Adya Organics customer since day one, and I can confidently say — their products are pure goodness in every sense. From A2 ghee and milk to jaggery and honey, everything tastes fresh and real. You can truly feel the difference when something is made with honesty and care. Kudos to the team for bringing such genuine, farm-fresh food to our homes!"
  },
  {
    id: 2,
    name: "Seema Aggarwal",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "I started using Adya Organics years ago when I was searching for clean, natural food for my family. What began with a jar of A2 ghee soon turned into a full pantry of Adya products! Their jaggery, oils, honey, and cookies have now become household staples. It feels good knowing that what we consume is ethical, natural, and made with so much love."
  },
  {
    id: 3,
    name: "Nupur Sinha",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "I have been using Adya Organics products ever since its inception and I must say the brand delivers more than it says. All the products are 100% genuine and sourced ethically. I have used almost all the products and everything is just the best. The A2 ghee, A2 milk, cold- pressed oils, honey, multigrain biscuits, sattu, jaggery… each and every product is authentic and true to its taste. I must congratulate team Adya Organics for creating this amazing brand and please keep on adding more and more products for us."
  },
  {
    id: 4,
    name: "Dr. Seema Anand",
    role: "Healthcare Professional",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "I was introduced to desi ghee by the founder of Adya Organics way before the company was formed. For a non dairy person (not a fan of ghee or milk) I was hooked from the first taste. From then to now the only ghee that comes into my house is from them. Not just my house but I even carry it to the US for my son and cousins. Besides being delicious it has helped control a lot of health issues as well. Warning - it is addictive. Once you taste it you will be hooked for life."
  },
  {
    id: 5,
    name: "Ananya Sharma",
    role: "Wellness Enthusiast",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Absolutely love the products from Adya Organics. The cold-pressed oils and natural sweeteners are of premium quality. I feel healthier and more energetic after switching to their organic range. Customer service is also top-notch!"
  },
  {
    id: 6,
    name: "Pooja Verma",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Switching to Adya Organics A2 Milk and Mustard Oil was the best decision for my family's health. The purity and rich aroma remind me of organic farm produce from my childhood days."
  },
  {
    id: 7,
    name: "Ritu Malhotra",
    role: "Nutritionist",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "As a nutritionist, I frequently recommend Adya Organics to my clients. Their unrefined Date Palm Jaggery and Raw Forest Honey are unadulterated and full of natural nutrients."
  },
  {
    id: 8,
    name: "Kavita Reddy",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The delivery is always prompt, packaging is eco-friendly, and the quality of their cold-pressed sesame oil is unmatched. You can smell the authentic seeds right away."
  },
  {
    id: 9,
    name: "Meenakshi Joshi",
    role: "Home Chef",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "My traditional recipes taste infinitely better when cooked with Adya A2 Gir Cow Ghee. It adds an authentic aroma and richness that store-bought ghee simply lacks."
  },
  {
    id: 10,
    name: "Sunita Deshmukh",
    role: "Verified Customer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Their multigrain cookies and sattu are regular items in my monthly order. It is so reassuring to find a brand that prioritizes organic integrity and consumer health above all else."
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Advance by 1 card
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  // Go back by 1 card
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  return (
    <section style={styles.container}>
      {/* Header Block */}
      <div style={styles.headerBox}>
        <span style={styles.subTitle}>COMMUNITY & REVIEWS</span>
        <h2 style={styles.mainTitle}>Our Happy Customers</h2>
        <div style={styles.titleDivider} />
      </div>

      {/* Carousel Wrapper */}
      <div style={styles.carouselWrapper}>
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          style={styles.navButtonLeft}
          aria-label="Previous Testimonials"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Overflow Viewport */}
        <div style={styles.viewport}>
          {/* Animated Track */}
          <div
            style={{
              ...styles.track,
              transform: `translateX(-${currentIndex * 380}px)`,
            }}
          >
            {REVIEWS_DATA.map((item) => (
              <div key={item.id} style={styles.card}>
                {/* Quote Icon */}
                <div style={styles.quoteIcon}>“</div>

                {/* Rating Stars */}
                <div style={styles.starsRow}>
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} style={styles.star}>★</span>
                  ))}
                </div>

                {/* Review Paragraph */}
                <p style={styles.reviewText}>{item.text}</p>

                {/* User Info Block */}
                <div style={styles.userInfo}>
                  <img src={item.avatar} alt={item.name} style={styles.avatar} />
                  <div>
                    <h4 style={styles.userName}>{item.name}</h4>
                    <span style={styles.userRole}>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          style={styles.navButtonRight}
          aria-label="Next Testimonials"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div style={styles.dotsRow}>
        {REVIEWS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === idx ? '#D97706' : 'rgba(217, 119, 6, 0.25)',
              width: currentIndex === idx ? '28px' : '8px',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

/* Styles Object */
const styles = {
  container: {
    width: '100%',
    padding: '80px 20px',
    backgroundColor: '#0F140D',
    color: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  headerBox: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2.5px',
    color: '#D97706',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  },
  mainTitle: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: '0 0 16px 0',
  },
  titleDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#D97706',
    margin: '0 auto',
    borderRadius: '2px',
  },
  carouselWrapper: {
    position: 'relative',
    maxWidth: '1240px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  viewport: {
    width: '100%',
    overflow: 'hidden',
    padding: '20px 0',
  },
  track: {
    display: 'flex',
    gap: '30px',
    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  card: {
    minWidth: '350px',
    maxWidth: '350px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)',
  },
  quoteIcon: {
    position: 'absolute',
    top: '15px',
    right: '25px',
    fontSize: '60px',
    color: 'rgba(217, 119, 6, 0.15)',
    fontFamily: 'serif',
    lineHeight: 1,
    pointerEvents: 'none',
  },
  starsRow: {
    display: 'flex',
    gap: '4px',
    marginBottom: '16px',
  },
  star: {
    color: '#F59E0B',
    fontSize: '18px',
  },
  reviewText: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '24px',
    flexGrow: 1,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '18px',
  },
  avatar: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #D97706',
  },
  userName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: 0,
  },
  userRole: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.45)',
  },
  navButtonLeft: {
    position: 'absolute',
    left: '-20px',
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#D97706',
    border: 'none',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
  },
  navButtonRight: {
    position: 'absolute',
    right: '-20px',
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#D97706',
    border: 'none',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
  },
  dotsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '36px',
  },
  dot: {
    height: '8px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default TestimonialSection;