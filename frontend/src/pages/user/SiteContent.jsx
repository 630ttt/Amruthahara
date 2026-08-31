import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";
import { Link } from "react-router-dom";
import { useState } from "react";

const pages = {
  about: {
    eyebrow: "Connect",
    title: "About Us",
    intro:
      "Amruthahara brings natural, wholesome and quality food products closer to your home. We make it easier to choose healthy living every day.",
    sections: [
      {
        heading: "Who we are",
        body: "Amruthahara is a natural marketplace built around organic produce, millets, honey and everyday healthy essentials. We work with farmers and small producers so families can shop food that is fresh, honest and chemical-conscious.",
      },
      {
        heading: "What we believe",
        body: "Good food should feel simple. We focus on fair pricing, farm-to-doorstep freshness and products that support local growers. From seasonal harvests to pantry staples, every range is chosen for quality and everyday use.",
      },
      {
        heading: "How we serve you",
        body: "Browse organic products, build a custom bowl, subscribe for regular deliveries and track every order from confirmation to your doorstep. Our team is here if you need help with an order, a product or a return.",
      },
    ],
  },
  contact: {
    eyebrow: "Connect",
    title: "Contact Us",
    intro:
      "Questions about an order, a product or organic living? Write to us and we will get back to you.",
    sections: [
      {
        heading: "Reach Amruthahara",
        body: "Email:  hello@amruthahara.com\nPhone:  +91 99999 99999\nHours:  Monday to Saturday, 9:00 AM – 6:00 PM IST",
      },
      {
        heading: "Visit / correspondence",
        body: "Amruthahara Natural Foods\nHyderabad, Telangana, India",
      },
    ],
    contactForm: true,
  },
  faq: {
    eyebrow: "Connect",
    title: "FAQs",
    intro:
      "Quick answers about shopping, bowls, payments, delivery and returns.",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Add products to your cart or build a Custom Bowl, then go to checkout. You can pay with Razorpay, PhonePe or cash on delivery where available.",
      },
      {
        q: "How do I track my order?",
        a: "Open My Orders after login and tap Track Order. You will see live status from Order Placed through Delivered.",
      },
      {
        q: "Can I change quantity before buying?",
        a: "Yes. On product pages, cart and the Build Your Bowl page you can increase or decrease quantity before checkout.",
      },
      {
        q: "What is a Custom Bowl?",
        a: "Build Your Bowl lets you pick ingredients and quantities. Checkout treats that selection as one Custom Bowl, not separate products.",
      },
      {
        q: "How are prices shown?",
        a: "All prices on Amruthahara are in Indian Rupees (₹).",
      },
      {
        q: "What is your return policy?",
        a: "Perishable items are reviewed case by case if they arrive damaged or incorrect. Read Return & Refund Policy for details.",
      },
    ],
  },
  privacy: {
    eyebrow: "Information",
    title: "Privacy Policy",
    intro:
      "This policy explains how Amruthahara collects, uses and protects your information when you shop on our website.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect the details you share at registration and checkout, such as name, email, phone, delivery address and order history. Payment partners such as Razorpay or PhonePe process card and UPI details on their secure pages.",
      },
      {
        heading: "How we use it",
        body: "We use your information to create your account, fulfil orders, show your own orders only, send order updates and improve the shopping experience. We do not sell your personal data.",
      },
      {
        heading: "Account security",
        body: "Keep your login private. Orders are shown only for the logged-in customer. Admin staff can view all orders solely to pack, ship and support deliveries.",
      },
      {
        heading: "Contact",
        body: "For privacy questions, write to us from the Contact Us page.",
      },
    ],
  },
  returns: {
    eyebrow: "Information",
    title: "Return & Refund Policy",
    intro:
      "We want you to receive fresh, correct products. This policy covers returns, replacements and refunds.",
    sections: [
      {
        heading: "Perishable goods",
        body: "Fresh produce, dairy, honey and prepared bowls are perishable. Please report damaged, spoiled or wrong items within 24 hours of delivery with photos of the package and product.",
      },
      {
        heading: "Eligible returns",
        body: "We replace or refund items that arrive damaged, incorrect or missing. Opened pantry items in good condition may not be returnable for hygiene reasons.",
      },
      {
        heading: "Refunds",
        body: "Approved refunds are issued to the original payment method. Cash on delivery refunds are processed to your bank or UPI details after verification. Processing usually takes 5–7 business days.",
      },
      {
        heading: "How to raise a request",
        body: "Go to My Orders, note your Order ID and contact us from the Contact Us page with the issue and images.",
      },
    ],
  },
  shipping: {
    eyebrow: "Information",
    title: "Shipping & Delivery",
    intro:
      "Amruthahara delivers farm-fresh and pantry products to your doorstep with careful packing.",
    sections: [
      {
        heading: "Delivery charges",
        body: "Delivery is calculated at checkout. Orders above ₹500 typically have free delivery. Smaller orders may include a small delivery charge.",
      },
      {
        heading: "Timelines",
        body: "Most city orders are prepared the same day and dispatched on the next available slot. Remote pincodes may take longer. You can follow progress on the Track Order page.",
      },
      {
        heading: "Order tracking",
        body: "Status moves through Order Placed, Order Confirmed, Preparing, Shipped, Out Of Delivery and Delivered. Custom Bowl orders are tracked as one bowl, not as separate ingredients.",
      },
      {
        heading: "Failed delivery",
        body: "Please keep your phone reachable. If a delivery attempt fails, our partner may retry or contact you to reschedule.",
      },
    ],
  },
  terms: {
    eyebrow: "Information",
    title: "Terms & Conditions",
    intro:
      "By using the Amruthahara website you agree to these terms of shopping, accounts and product information.",
    sections: [
      {
        heading: "Using the site",
        body: "You must provide accurate account details and keep your password safe. You are responsible for orders placed from your logged-in account.",
      },
      {
        heading: "Products and pricing",
        body: "Product photos, descriptions and prices are shown in Indian Rupees. Availability can change with harvest and stock. We may refuse or cancel an order if an item cannot be fulfilled.",
      },
      {
        heading: "Orders and payments",
        body: "An order is confirmed after successful payment or accepted cash-on-delivery placement. Bowl checkouts are billed as a Custom Bowl containing the ingredients you selected.",
      },
      {
        heading: "Limitation",
        body: "Amruthahara is not liable for delays caused by weather, courier disruption or incorrect addresses provided at checkout.",
      },
    ],
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F7FAF5 0%, #FFFFFF 55%, #F4F7F2 100%)",
  },
  wrap: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "48px 6% 90px",
  },
  back: {
    color: "#52705C",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    display: "inline-block",
    marginBottom: "22px",
  },
  eyebrow: {
    color: "#C79A45",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    margin: 0,
  },
  title: {
    fontFamily: "Georgia, 'Playfair Display', serif",
    color: "#173F2A",
    fontSize: "42px",
    margin: "10px 0 14px",
    fontWeight: 500,
  },
  intro: {
    color: "#6B756E",
    fontSize: "16px",
    lineHeight: 1.7,
    marginBottom: "32px",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "18px",
    padding: "22px 24px",
    marginBottom: "16px",
    boxShadow: "0 10px 28px rgba(23,63,42,0.04)",
  },
  heading: {
    color: "#175C38",
    fontSize: "18px",
    margin: "0 0 8px",
  },
  body: {
    color: "#5C675F",
    fontSize: "14px",
    lineHeight: 1.7,
    whiteSpace: "pre-line",
    margin: 0,
  },
  form: {
    display: "grid",
    gap: "12px",
    marginTop: "8px",
  },
  input: {
    border: "1px solid #D7E3D8",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  button: {
    border: "none",
    borderRadius: "10px",
    background: "#175C38",
    color: "#FFFFFF",
    fontWeight: 800,
    padding: "13px 18px",
    cursor: "pointer",
  },
  faqBtn: {
    width: "100%",
    border: "none",
    background: "transparent",
    textAlign: "left",
    padding: 0,
    cursor: "pointer",
    color: "#175C38",
    fontSize: "16px",
    fontWeight: 800,
  },
};

export default function SiteContent({ page }) {
  const content = pages[page];
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!content) {
    return null;
  }

  const handleContact = (event) => {
    event.preventDefault();
    alert("Thank you. Amruthahara has received your message.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.wrap}>
        <Link to="/" style={styles.back}>
          ← Back to Home
        </Link>

        <p style={styles.eyebrow}>{content.eyebrow}</p>
        <h1 style={styles.title}>{content.title}</h1>
        <p style={styles.intro}>{content.intro}</p>

        {content.sections?.map((section) => (
          <article key={section.heading} style={styles.card}>
            <h2 style={styles.heading}>{section.heading}</h2>
            <p style={styles.body}>{section.body}</p>
          </article>
        ))}

        {content.faqs?.map((item, index) => (
          <article key={item.q} style={styles.card}>
            <button
              type="button"
              style={styles.faqBtn}
              onClick={() =>
                setOpenFaq(openFaq === index ? -1 : index)
              }
            >
              {item.q}
            </button>
            {openFaq === index && (
              <p style={{ ...styles.body, marginTop: "10px" }}>{item.a}</p>
            )}
          </article>
        ))}

        {content.contactForm && (
          <article style={styles.card}>
            <h2 style={styles.heading}>Send a message</h2>
            <form onSubmit={handleContact} style={styles.form}>
              <input
                style={styles.input}
                placeholder="Your name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
              <input
                type="email"
                style={styles.input}
                placeholder="Email address"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
              <textarea
                style={{ ...styles.input, minHeight: "120px" }}
                placeholder="How can we help?"
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                required
              />
              <button type="submit" style={styles.button}>
                Send Message
              </button>
            </form>
          </article>
        )}
      </main>

      <AdyaFooter />
    </div>
  );
}
