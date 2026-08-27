import React, { useState } from 'react';

const AdyaFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      {/* Trust Badges */}
      <div style={styles.trustBadgesBar}>
        <div style={styles.badgeCard}>
          <div style={styles.badgeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div style={styles.badgeTitle}>100% Organic</div>
            <div style={styles.badgeDesc}>Certified Chemical Free</div>
          </div>
        </div>

        <div style={styles.badgeCard}>
          <div style={styles.badgeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <div style={styles.badgeTitle}>Farm to Doorstep</div>
            <div style={styles.badgeDesc}>Direct Express Shipping</div>
          </div>
        </div>

        <div style={styles.badgeCard}>
          <div style={styles.badgeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <div style={styles.badgeTitle}>Fair Pricing</div>
            <div style={styles.badgeDesc}>Supporting Local Farmers</div>
          </div>
        </div>

        <div style={styles.badgeCard}>
          <div style={styles.badgeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div>
            <div style={styles.badgeTitle}>Fresh Daily</div>
            <div style={styles.badgeDesc}>No Preservatives Added</div>
          </div>
        </div>
      </div>

      {/* Main Grid Columns */}
      <div style={styles.footerMainGrid}>
        {/* Brand Column */}
        <div>
          <h2 style={styles.brandTitle}>AMRUTHAHARA</h2>
          <div style={styles.brandTagline}>Pure Goodness From Nature</div>
          <p style={styles.brandText}>
            Amruthahara brings natural, wholesome and quality food products closer to your home. We make it easier to choose healthy living every day.
          </p>
          <div style={styles.addressBox}>
            <strong style={{ color: '#ffffff', display: 'block', marginBottom: '3px' }}>About Amruthahara:</strong>
            Your trusted destination for natural products, organic living and better everyday choices.
          </div>
        </div>

        {/* Connect Links */}
        <div>
          <h4 style={styles.colHeader}>Connect</h4>
          <ul style={styles.footerLinks}>
            <li><a href="/" style={styles.link}>About Us</a></li>
            <li><a href="/our-story" style={styles.link}>Our Story</a></li>
            <li><a href="/contact" style={styles.link}>Contact Us</a></li>
            <li><a href="/orders" style={styles.link}>Track Orders</a></li>
            <li><a href="/faq" style={styles.link}>FAQs</a></li>
          </ul>
        </div>

        {/* Shop Range */}
        <div>
          <h4 style={styles.colHeader}>Shop Range</h4>
          <ul style={styles.footerLinks}>
            <li><a href="/products" style={styles.link}>Organic Products</a></li>
            <li><a href="/categories" style={styles.link}>Natural Foods</a></li>
            <li><a href="/products" style={styles.link}>Healthy Essentials</a></li>
            <li><a href="/products" style={styles.link}>Fresh Produce</a></li>
            <li><a href="/products" style={styles.link}>Millet Range</a></li>
            <li><a href="/products" style={styles.link}>Natural Honey</a></li>
          </ul>
        </div>

        {/* Information Links */}
        <div>
          <h4 style={styles.colHeader}>Information</h4>
          <ul style={styles.footerLinks}>
            <li><a href="/blog" style={styles.link}>Organic Living</a></li>
            <li><a href="/privacy-policy" style={styles.link}>Privacy Policy</a></li>
            <li><a href="/returns" style={styles.link}>Return & Refund Policy</a></li>
            <li><a href="/shipping" style={styles.link}>Shipping & Delivery</a></li>
            <li><a href="/terms" style={styles.link}>Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 style={styles.colHeader}>Stay Updated</h4>
          <div style={styles.newsletterCard}>
            <p style={styles.newsletterText}>
              Subscribe to get seasonal harvest alerts, exclusive discounts & updates!
            </p>
            <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.newsletterInput}
                required
              />
              <button type="submit" style={styles.newsletterBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Certifications Row */}
      <div style={styles.certRow}>
        <div style={styles.certTitle}>Certifications:</div>
        <div style={styles.certBadges}>
          <span style={styles.certPill}>Natural Products</span>
          <span style={styles.certPill}>Quality Checked</span>
          <span style={styles.certPill}>Freshly Packed</span>
          <span style={styles.certPill}>Healthy Living</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomContent}>
          <div style={styles.copyright}>
            Copyright © 2026 Amruthahara. All Rights Reserved.
          </div>
          <div style={styles.socialLinks}>
            <a href="https://instagram.com" style={styles.socialBtn} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://facebook.com" style={styles.socialBtn} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://youtube.com" style={styles.socialBtn} aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Inline Styles */
const styles = {
  footer: {
    position: 'relative',
    width: '100%',
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(217, 119, 6, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 45%),
      linear-gradient(rgba(13, 18, 10, 0.92), rgba(13, 18, 10, 0.95)),
      url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 200 C300 100, 500 300, 700 150 C900 0, 1100 200, 1200 100 V600 H0 V300 Z' fill='%23151f12' fill-opacity='0.25'/%3E%3Cpath d='M0 400 C200 300, 400 500, 700 380 C1000 260, 1100 450, 1200 350 V600 H0 Z' fill='%230f170d' fill-opacity='0.4'/%3E%3C/svg%3E")
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '60px',
    borderTop: '2px solid rgba(217, 119, 6, 0.35)',
    fontFamily: 'sans-serif',
    color: '#e2e8f0',
  },
  trustBadgesBar: {
    maxWidth: '1280px',
    margin: '0 auto 50px auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  badgeCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  badgeIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(217, 119, 6, 0.15)',
    color: '#d97706',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ffffff',
  },
  badgeDesc: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.55)',
    marginTop: '2px',
  },
  footerMainGrid: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px 60px 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '36px',
  },
  brandTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#f59e0b',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  brandTagline: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '2.5px',
    color: 'rgba(255, 255, 255, 0.45)',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  brandText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.65)',
    marginBottom: '20px',
  },
  addressBox: {
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.65)',
  },
  colHeader: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    position: 'relative',
    borderBottom: '2px solid #d97706',
    display: 'inline-block',
    paddingBottom: '4px',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    color: 'rgba(255, 255, 255, 0.65)',
    textDecoration: 'none',
    fontSize: '13px',
  },
  newsletterCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '20px',
  },
  newsletterText: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.65)',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  newsletterInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '30px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none',
  },
  newsletterBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '30px',
    background: '#d97706',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
  },
  certRow: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  certTitle: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: 'rgba(255, 255, 255, 0.45)',
    textTransform: 'uppercase',
  },
  certBadges: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  certPill: {
    padding: '6px 14px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    fontSize: '11px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bottomBar: {
    background: '#070a06',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '18px 24px',
  },
  bottomContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyright: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.45)',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
};

export default AdyaFooter;