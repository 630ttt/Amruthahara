import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  FaCog,
  FaLeaf,
  FaStore,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const SETTINGS_KEY = "amruthahara_admin_settings";

const defaultSettings = {
  storeName: "Amruthahara",
  tagline: "Pure Goodness From Nature",
  supportEmail: "hello@amruthahara.com",
  supportPhone: "+91 99999 99999",
  city: "Hyderabad",
  freeDeliveryMin: "500",
  deliveryCharge: "40",
  currency: "INR",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to load admin settings:", error);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div style={styles.page}>
        <div style={styles.hero}>
          <div style={styles.heroCircle} />
          <FaLeaf style={styles.heroLeaf} />
          <p style={styles.eyebrow}>Admin Control</p>
          <h1 style={styles.heroTitle}>Settings</h1>
          <p style={styles.heroText}>
            Manage store identity, support details and delivery defaults for
            Amruthahara.
          </p>
        </div>

        <form onSubmit={handleSave} style={styles.grid}>
          <section style={styles.card}>
            <div style={styles.cardHead}>
              <FaStore color="#175C38" />
              <h2 style={styles.cardTitle}>Store profile</h2>
            </div>

            <label style={styles.label}>Store name</label>
            <input
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Tagline</label>
            <input
              name="tagline"
              value={settings.tagline}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>City</label>
            <input
              name="city"
              value={settings.city}
              onChange={handleChange}
              style={styles.input}
            />
          </section>

          <section style={styles.card}>
            <div style={styles.cardHead}>
              <FaShieldAlt color="#175C38" />
              <h2 style={styles.cardTitle}>Support</h2>
            </div>

            <label style={styles.label}>Support email</label>
            <input
              type="email"
              name="supportEmail"
              value={settings.supportEmail}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Support phone</label>
            <input
              name="supportPhone"
              value={settings.supportPhone}
              onChange={handleChange}
              style={styles.input}
            />
          </section>

          <section style={styles.card}>
            <div style={styles.cardHead}>
              <FaTruck color="#175C38" />
              <h2 style={styles.cardTitle}>Delivery</h2>
            </div>

            <label style={styles.label}>Currency</label>
            <input
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Free delivery above (₹)</label>
            <input
              type="number"
              name="freeDeliveryMin"
              value={settings.freeDeliveryMin}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Standard delivery charge (₹)</label>
            <input
              type="number"
              name="deliveryCharge"
              value={settings.deliveryCharge}
              onChange={handleChange}
              style={styles.input}
            />
          </section>

          <div style={styles.actions}>
            <button type="submit" style={styles.button}>
              <FaCog />
              Save settings
            </button>
            {saved && (
              <span style={styles.saved}>Settings saved</span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    color: "#20382a",
    marginLeft: "-215px",
  },
  hero: {
    background:
      "linear-gradient(135deg, #123d27 0%, #1d5a38 55%, #2f7048 100%)",
    borderRadius: "24px",
    padding: "36px 40px",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    marginBottom: "28px",
    boxShadow: "0 18px 45px rgba(24, 74, 45, 0.16)",
  },
  heroCircle: {
    position: "absolute",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    right: "-80px",
    top: "-90px",
  },
  heroLeaf: {
    position: "absolute",
    right: "36px",
    bottom: "28px",
    fontSize: "64px",
    color: "rgba(255,255,255,0.08)",
  },
  eyebrow: {
    margin: 0,
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    fontSize: "11px",
    color: "#dfc27b",
    fontWeight: 800,
  },
  heroTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "38px",
    margin: "10px 0 8px",
    fontWeight: 500,
  },
  heroText: {
    margin: 0,
    maxWidth: "520px",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gap: "18px",
    width: "100%",
  },
  card: {
    background: "#fff",
    border: "1px solid #E3EBE4",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#173F2A",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 800,
    color: "#52705C",
    margin: "12px 0 6px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: "12px",
    border: "1px solid #D7E3D8",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    background: "#F7FAF6",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  button: {
    border: "none",
    background: "#175C38",
    color: "#fff",
    borderRadius: "12px",
    padding: "13px 20px",
    fontWeight: 800,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  saved: {
    color: "#175C38",
    fontWeight: 700,
    fontSize: "13px",
  },
};
