import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaLeaf,
  FaArrowRight,
  FaCalendarAlt,
  FaTruck,
  FaPause,
  FaTimes,
  FaSeedling,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import AdyaFooter from "../../components/home/AdyaFooter";

function Subscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("weekly");
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: "daily",
      title: "Daily",
      subtitle: "Freshness, every single day.",
      description:
        "For everyday essentials that deserve to be fresh, natural and close to their source.",
      price: "₹99",
      period: "/ delivery",
      save: "Save up to 10%",
      icon: "01",
      features: [
        "Fresh products delivered daily",
        "Flexible product selection",
        "Priority fresh packing",
        "Pause anytime",
      ],
    },
    {
      id: "weekly",
      title: "Weekly",
      subtitle: "A little goodness, every week.",
      description:
        "Our most-loved plan for families who want a regular supply of wholesome farm-fresh products.",
      price: "₹299",
      period: "/ delivery",
      save: "Save up to 15%",
      popular: true,
      icon: "02",
      features: [
        "Weekly farm-fresh delivery",
        "Choose your favourite products",
        "Priority delivery slots",
        "Pause or skip anytime",
      ],
    },
    {
      id: "monthly",
      title: "Monthly",
      subtitle: "Wellness delivered your way.",
      description:
        "A convenient monthly ritual of carefully selected natural products for your home.",
      price: "₹999",
      period: "/ month",
      save: "Save up to 20%",
      icon: "03",
      features: [
        "Monthly curated delivery",
        "Exclusive subscriber pricing",
        "Free delivery",
        "Cancel anytime",
      ],
    },
  ];

  const benefits = [
    {
      icon: <FaLeaf />,
      title: "Fresh & Natural",
      text: "Products selected with care and delivered at their best.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Your Schedule",
      text: "Choose how often you want your favourite products delivered.",
    },
    {
      icon: <FaPause />,
      title: "Pause Anytime",
      text: "Going away? Simply pause your subscription whenever you need.",
    },
    {
      icon: <FaShieldAlt />,
      title: "No Commitment",
      text: "Stay in control. Skip, change or cancel your plan anytime.",
    },
  ];

  const faqs = [
    {
      question: "Can I choose the products in my subscription?",
      answer:
        "Yes. You can select the products you want and build your subscription around your household needs.",
    },
    {
      question: "Can I pause my subscription?",
      answer:
        "Yes. You can pause your subscription whenever you need and resume it later without losing your benefits.",
    },
    {
      question: "Can I change my delivery frequency?",
      answer:
        "Yes. You can switch between daily, weekly and monthly plans depending on your requirements.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. There is no long-term commitment. You can cancel your subscription whenever you want.",
    },
    {
      question: "Do subscribers get special prices?",
      answer:
        "Subscribers receive exclusive savings and selected benefits depending on their subscription plan.",
    },
  ];

  const handleSubscribe = () => {
    navigate(`/subscription/${selectedPlan}`);
  };

  return (
    <div className="amrutha-subscription-page">
      <Navbar />

      <style>{`
        * {
          box-sizing: border-box;
        }

        .amrutha-subscription-page {
          min-height: 100vh;
          background: #f8f7f1;
          color: #173f2a;
          font-family: "DM Sans", Arial, sans-serif;
          overflow-x: hidden;
        }

        /* ==========================================
           HERO
        ========================================== */

        .amrutha-sub-hero {
          position: relative;
          min-height: 610px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 80% 30%,
              rgba(183, 204, 175, 0.35),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #edf2e8 0%,
              #f8f7f1 52%,
              #ebe8dc 100%
            );
        }

        .amrutha-sub-hero::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -170px;
          top: -190px;
          border: 1px solid rgba(23, 63, 42, 0.08);
          border-radius: 50%;
        }

        .amrutha-sub-hero::after {
          content: "";
          position: absolute;
          width: 360px;
          height: 360px;
          left: -180px;
          bottom: -190px;
          border: 1px solid rgba(178, 138, 69, 0.12);
          border-radius: 50%;
        }

        .amrutha-sub-hero-inner {
          position: relative;
          z-index: 2;
          width: min(1180px, 90%);
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 70px;
          align-items: center;
          padding: 80px 0;
        }

        .amrutha-sub-eyebrow {
          margin: 0 0 18px;
          color: #b28a45;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .amrutha-sub-hero h1 {
          max-width: 700px;
          margin: 0;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(48px, 6vw, 78px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -2px;
        }

        .amrutha-sub-hero h1 em {
          color: #6d8b63;
          font-weight: 400;
        }

        .amrutha-sub-hero-text {
          max-width: 520px;
          margin: 28px 0 0;
          color: #686d64;
          font-size: 14px;
          line-height: 1.8;
        }

        .amrutha-sub-hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .amrutha-sub-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 23px;
          border: 0;
          border-radius: 30px;
          background: #173f2a;
          color: white;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .amrutha-sub-primary-btn:hover {
          background: #0d2d1d;
          transform: translateY(-2px);
        }

        .amrutha-sub-secondary-btn {
          padding: 14px 23px;
          border: 1px solid rgba(23, 63, 42, 0.25);
          border-radius: 30px;
          background: transparent;
          color: #173f2a;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Hero visual */

        .amrutha-sub-hero-visual {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .amrutha-sub-circle {
          position: absolute;
          width: 390px;
          height: 390px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 35% 30%,
              #dcebd6,
              #b9cfaf
            );
          box-shadow:
            0 35px 70px rgba(23, 63, 42, 0.13);
        }

        .amrutha-sub-visual-card {
          position: relative;
          z-index: 2;
          width: 285px;
          min-height: 335px;
          padding: 34px 30px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 150px 150px 25px 25px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          box-shadow:
            0 25px 60px rgba(23, 63, 42, 0.12);
          text-align: center;
        }

        .amrutha-sub-visual-icon {
          width: 70px;
          height: 70px;
          margin: 10px auto 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #173f2a;
          color: #dcebd6;
          font-size: 25px;
        }

        .amrutha-sub-visual-card h3 {
          margin: 0;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 27px;
          font-weight: 600;
        }

        .amrutha-sub-visual-card p {
          margin: 12px 0 0;
          color: #777b73;
          font-size: 11px;
          line-height: 1.7;
        }

        .amrutha-sub-floating {
          position: absolute;
          z-index: 4;
          padding: 10px 15px;
          border: 1px solid rgba(23, 63, 42, 0.08);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 12px 30px rgba(23, 63, 42, 0.1);
          color: #173f2a;
          font-size: 9px;
          font-weight: 700;
        }

        .amrutha-sub-floating-one {
          top: 40px;
          right: 5%;
        }

        .amrutha-sub-floating-two {
          bottom: 50px;
          left: 5%;
        }

        /* ==========================================
           PLANS
        ========================================== */

        .amrutha-sub-plans-section {
          padding: 105px 5%;
          background: #ffffff;
        }

        .amrutha-sub-heading {
          max-width: 650px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .amrutha-sub-heading .eyebrow {
          margin: 0 0 12px;
          color: #b28a45;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .amrutha-sub-heading h2 {
          margin: 0;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
        }

        .amrutha-sub-heading p {
          margin: 16px auto 0;
          color: #74776f;
          font-size: 12px;
          line-height: 1.7;
        }

        .amrutha-sub-plans {
          width: min(1120px, 100%);
          margin: auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .amrutha-sub-plan {
          position: relative;
          padding: 34px 30px;
          border: 1px solid #e6e5dd;
          border-radius: 18px;
          background: #fff;
          transition: 0.35s ease;
        }

        .amrutha-sub-plan:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(23, 63, 42, 0.1);
        }

        .amrutha-sub-plan.selected {
          border-color: #173f2a;
          box-shadow: 0 20px 45px rgba(23, 63, 42, 0.12);
        }

        .amrutha-sub-popular {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 14px;
          border-radius: 20px;
          background: #b28a45;
          color: white;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .amrutha-sub-plan-number {
          color: #b28a45;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 13px;
        }

        .amrutha-sub-plan h3 {
          margin: 15px 0 5px;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 30px;
          font-weight: 600;
        }

        .amrutha-sub-plan-subtitle {
          margin: 0;
          color: #6f746c;
          font-size: 11px;
          font-weight: 600;
        }

        .amrutha-sub-plan-description {
          min-height: 65px;
          margin: 18px 0;
          color: #7a7d75;
          font-size: 10px;
          line-height: 1.7;
        }

        .amrutha-sub-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }

        .amrutha-sub-price strong {
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 32px;
        }

        .amrutha-sub-price span {
          color: #888b84;
          font-size: 9px;
        }

        .amrutha-sub-save {
          display: inline-block;
          margin-bottom: 22px;
          padding: 5px 9px;
          border-radius: 10px;
          background: #eef4e9;
          color: #55744e;
          font-size: 8px;
          font-weight: 800;
        }

        .amrutha-sub-features {
          padding-top: 20px;
          border-top: 1px solid #eeeeea;
        }

        .amrutha-sub-feature {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 12px;
          color: #575c55;
          font-size: 10px;
        }

        .amrutha-sub-feature svg {
          flex: none;
          color: #6d8b63;
          font-size: 9px;
        }

        .amrutha-sub-select {
          width: 100%;
          height: 42px;
          margin-top: 12px;
          border: 1px solid #173f2a;
          border-radius: 22px;
          background: white;
          color: #173f2a;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s;
        }

        .amrutha-sub-select:hover,
        .amrutha-sub-plan.selected .amrutha-sub-select {
          background: #173f2a;
          color: white;
        }

        /* ==========================================
           BENEFITS
        ========================================== */

        .amrutha-sub-benefits {
          padding: 100px 5%;
          background: #f4f3ec;
        }

        .amrutha-sub-benefit-grid {
          width: min(1100px, 100%);
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .amrutha-sub-benefit {
          padding: 30px 22px;
          text-align: center;
          border-right: 1px solid #deded5;
        }

        .amrutha-sub-benefit:last-child {
          border-right: 0;
        }

        .amrutha-sub-benefit-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #ffffff;
          color: #173f2a;
          font-size: 16px;
        }

        .amrutha-sub-benefit h3 {
          margin: 0 0 8px;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
        }

        .amrutha-sub-benefit p {
          margin: 0;
          color: #777a72;
          font-size: 9px;
          line-height: 1.7;
        }

        /* ==========================================
           HOW IT WORKS
        ========================================== */

        .amrutha-sub-how {
          padding: 105px 5%;
          background: #ffffff;
        }

        .amrutha-sub-how-grid {
          width: min(1080px, 100%);
          margin: 60px auto 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .amrutha-sub-how-step {
          position: relative;
          text-align: center;
        }

        .amrutha-sub-how-number {
          width: 58px;
          height: 58px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dfe4da;
          border-radius: 50%;
          background: #f4f6f0;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 15px;
        }

        .amrutha-sub-how-step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 29px;
          left: calc(50% + 40px);
          width: calc(100% - 80px);
          height: 1px;
          background: #dfe3dc;
        }

        .amrutha-sub-how-step h3 {
          margin: 0 0 8px;
          color: #173f2a;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
        }

        .amrutha-sub-how-step p {
          max-width: 170px;
          margin: auto;
          color: #7b7e76;
          font-size: 9px;
          line-height: 1.7;
        }

        /* ==========================================
           CTA
        ========================================== */

        .amrutha-sub-cta {
          position: relative;
          margin: 0 5% 100px;
          padding: 75px 30px;
          overflow: hidden;
          border-radius: 22px;
          background: #173f2a;
          text-align: center;
        }

        .amrutha-sub-cta::before {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          left: -180px;
          top: -180px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
        }

        .amrutha-sub-cta::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          right: -200px;
          bottom: -220px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
        }

        .amrutha-sub-cta-content {
          position: relative;
          z-index: 2;
        }

        .amrutha-sub-cta-icon {
          color: #c8d9bd;
          font-size: 22px;
          margin-bottom: 16px;
        }

        .amrutha-sub-cta h2 {
          margin: 0;
          color: white;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 500;
        }

        .amrutha-sub-cta p {
          max-width: 500px;
          margin: 15px auto 28px;
          color: rgba(255,255,255,0.68);
          font-size: 11px;
          line-height: 1.7;
        }

        .amrutha-sub-cta button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 25px;
          border: 0;
          border-radius: 25px;
          background: white;
          color: #173f2a;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        /* ==========================================
           FAQ
        ========================================== */

        .amrutha-sub-faq {
          width: min(850px, 90%);
          margin: 0 auto 100px;
        }

        .amrutha-sub-faq-list {
          margin-top: 40px;
          border-top: 1px solid #deded7;
        }

        .amrutha-sub-faq-item {
          border-bottom: 1px solid #deded7;
        }

        .amrutha-sub-faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 4px;
          border: 0;
          background: transparent;
          color: #173f2a;
          text-align: left;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 15px;
          cursor: pointer;
        }

        .amrutha-sub-faq-question span:last-child {
          font-family: Arial, sans-serif;
          font-size: 18px;
          font-weight: 300;
        }

        .amrutha-sub-faq-answer {
          padding: 0 30px 20px 4px;
          color: #777a73;
          font-size: 10px;
          line-height: 1.8;
        }

        /* ==========================================
           RESPONSIVE
        ========================================== */

        @media (max-width: 950px) {

          .amrutha-sub-hero-inner {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }

          .amrutha-sub-hero-text {
            margin-left: auto;
            margin-right: auto;
          }

          .amrutha-sub-hero-actions {
            justify-content: center;
          }

          .amrutha-sub-hero-visual {
            min-height: 380px;
          }

          .amrutha-sub-plans {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .amrutha-sub-plan-description {
            min-height: auto;
          }

          .amrutha-sub-benefit-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .amrutha-sub-benefit:nth-child(2) {
            border-right: 0;
          }

          .amrutha-sub-benefit:nth-child(-n+2) {
            border-bottom: 1px solid #deded5;
          }

          .amrutha-sub-how-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 45px;
          }

          .amrutha-sub-how-step::after {
            display: none;
          }
        }

        @media (max-width: 600px) {

          .amrutha-sub-hero {
            min-height: auto;
          }

          .amrutha-sub-hero-inner {
            width: 90%;
            padding: 65px 0 75px;
          }

          .amrutha-sub-hero h1 {
            font-size: 45px;
            letter-spacing: -1.2px;
          }

          .amrutha-sub-hero-text {
            font-size: 12px;
          }

          .amrutha-sub-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .amrutha-sub-primary-btn,
          .amrutha-sub-secondary-btn {
            justify-content: center;
          }

          .amrutha-sub-hero-visual {
            min-height: 330px;
          }

          .amrutha-sub-circle {
            width: 300px;
            height: 300px;
          }

          .amrutha-sub-visual-card {
            width: 225px;
            min-height: 275px;
            padding: 25px 20px;
          }

          .amrutha-sub-visual-icon {
            width: 55px;
            height: 55px;
            font-size: 19px;
          }

          .amrutha-sub-visual-card h3 {
            font-size: 23px;
          }

          .amrutha-sub-floating {
            display: none;
          }

          .amrutha-sub-plans-section,
          .amrutha-sub-benefits,
          .amrutha-sub-how {
            padding: 75px 20px;
          }

          .amrutha-sub-heading {
            margin-bottom: 40px;
          }

          .amrutha-sub-heading h2 {
            font-size: 34px;
          }

          .amrutha-sub-plan {
            padding: 30px 24px;
          }

          .amrutha-sub-benefit-grid {
            grid-template-columns: 1fr;
          }

          .amrutha-sub-benefit {
            border-right: 0 !important;
            border-bottom: 1px solid #deded5;
          }

          .amrutha-sub-benefit:last-child {
            border-bottom: 0;
          }

          .amrutha-sub-how-grid {
            grid-template-columns: 1fr;
          }

          .amrutha-sub-cta {
            margin: 0 15px 70px;
            padding: 60px 20px;
          }

          .amrutha-sub-faq {
            width: calc(100% - 40px);
            margin-bottom: 70px;
          }
        }
      `}</style>

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="amrutha-sub-hero">

        <div className="amrutha-sub-hero-inner">

          <div>

            <p className="amrutha-sub-eyebrow">
              AMRUTHAHARA SUBSCRIPTIONS
            </p>

            <h1>
              Goodness that
              <br />
              <em>keeps coming.</em>
            </h1>

            <p className="amrutha-sub-hero-text">
              Make natural goodness part of your everyday life.
              Choose a delivery rhythm that works for you and
              receive carefully selected products, straight to
              your home.
            </p>

            <div className="amrutha-sub-hero-actions">

              <button
                className="amrutha-sub-primary-btn"
                onClick={() =>
                  document
                    .getElementById("subscription-plans")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Plans
                <FaArrowRight />
              </button>

              <button
                className="amrutha-sub-secondary-btn"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                How it works
              </button>

            </div>

          </div>


          <div className="amrutha-sub-hero-visual">

            <div className="amrutha-sub-circle" />

            <div className="amrutha-sub-floating amrutha-sub-floating-one">
              ✦ Freshly selected
            </div>

            <div className="amrutha-sub-floating amrutha-sub-floating-two">
              ✓ Delivered with care
            </div>

            <div className="amrutha-sub-visual-card">

              <div className="amrutha-sub-visual-icon">
                <FaSeedling />
              </div>

              <h3>
                Nature,
                <br />
                on your schedule.
              </h3>

              <p>
                Daily, weekly or monthly —
                choose what feels right for
                your home.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          PLANS
      ========================================== */}

      <section
        className="amrutha-sub-plans-section"
        id="subscription-plans"
      >

        <div className="amrutha-sub-heading">

          <p className="eyebrow">
            CHOOSE YOUR RHYTHM
          </p>

          <h2>
            A plan that fits your life.
          </h2>

          <p>
            Simple subscriptions designed around
            how often your home needs nature's goodness.
          </p>

        </div>


        <div className="amrutha-sub-plans">

          {plans.map((plan) => (

            <article
              key={plan.id}
              className={`amrutha-sub-plan ${
                selectedPlan === plan.id ? "selected" : ""
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >

              {plan.popular && (
                <div className="amrutha-sub-popular">
                  Most Loved
                </div>
              )}

              <div className="amrutha-sub-plan-number">
                {plan.icon}
              </div>

              <h3>
                {plan.title}
              </h3>

              <p className="amrutha-sub-plan-subtitle">
                {plan.subtitle}
              </p>

              <p className="amrutha-sub-plan-description">
                {plan.description}
              </p>

              <div className="amrutha-sub-price">

                <strong>
                  {plan.price}
                </strong>

                <span>
                  {plan.period}
                </span>

              </div>

              <span className="amrutha-sub-save">
                {plan.save}
              </span>


              <div className="amrutha-sub-features">

                {plan.features.map((feature) => (

                  <div
                    className="amrutha-sub-feature"
                    key={feature}
                  >
                    <FaCheck />
                    <span>{feature}</span>
                  </div>

                ))}

              </div>


              <button
                className="amrutha-sub-select"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPlan(plan.id);
                }}
              >
                {selectedPlan === plan.id
                  ? "Selected"
                  : "Choose Plan"}
              </button>

            </article>

          ))}

        </div>

      </section>


      {/* ==========================================
          BENEFITS
      ========================================== */}

      <section className="amrutha-sub-benefits">

        <div className="amrutha-sub-heading">

          <p className="eyebrow">
            THE AMRUTHAHARA DIFFERENCE
          </p>

          <h2>
            More than a delivery.
          </h2>

          <p>
            Your subscription is designed to make
            choosing natural products effortless.
          </p>

        </div>


        <div className="amrutha-sub-benefit-grid">

          {benefits.map((benefit) => (

            <div
              className="amrutha-sub-benefit"
              key={benefit.title}
            >

              <div className="amrutha-sub-benefit-icon">
                {benefit.icon}
              </div>

              <h3>
                {benefit.title}
              </h3>

              <p>
                {benefit.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ==========================================
          HOW IT WORKS
      ========================================== */}

      <section
        className="amrutha-sub-how"
        id="how-it-works"
      >

        <div className="amrutha-sub-heading">

          <p className="eyebrow">
            SIMPLE BY DESIGN
          </p>

          <h2>
            Your subscription,
            <br />
            made effortless.
          </h2>

        </div>


        <div className="amrutha-sub-how-grid">

          {[
            [
              "01",
              "Choose your plan",
              "Select daily, weekly or monthly delivery.",
            ],
            [
              "02",
              "Pick your products",
              "Choose the products your home loves.",
            ],
            [
              "03",
              "Set your schedule",
              "Tell us when you want your goodness delivered.",
            ],
            [
              "04",
              "Enjoy & repeat",
              "We take care of the rest, every time.",
            ],
          ].map(([number, title, text]) => (

            <div
              className="amrutha-sub-how-step"
              key={number}
            >

              <div className="amrutha-sub-how-number">
                {number}
              </div>

              <h3>
                {title}
              </h3>

              <p>
                {text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="amrutha-sub-cta">

        <div className="amrutha-sub-cta-content">

          <div className="amrutha-sub-cta-icon">
            <FaHeart />
          </div>

          <h2>
            Make goodness a habit.
          </h2>

          <p>
            Choose your rhythm and let Amruthahara
            bring nature's goodness to your doorstep,
            again and again.
          </p>

          <button onClick={handleSubscribe}>
            Start My {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Subscription
            <FaArrowRight />
          </button>

        </div>

      </section>


      {/* ==========================================
          FAQ
      ========================================== */}

      <section className="amrutha-sub-faq">

        <div className="amrutha-sub-heading">

          <p className="eyebrow">
            FREQUENTLY ASKED
          </p>

          <h2>
            Questions, answered.
          </h2>

        </div>


        <div className="amrutha-sub-faq-list">

          {faqs.map((faq, index) => (

            <div
              className="amrutha-sub-faq-item"
              key={faq.question}
            >

              <button
                className="amrutha-sub-faq-question"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index ? null : index
                  )
                }
              >

                <span>
                  {faq.question}
                </span>

                <span>
                  {openFaq === index ? "−" : "+"}
                </span>

              </button>

              {openFaq === index && (
                <div className="amrutha-sub-faq-answer">
                  {faq.answer}
                </div>
              )}

            </div>

          ))}

        </div>

      </section>


      <AdyaFooter />

    </div>
  );
}

export default Subscription;