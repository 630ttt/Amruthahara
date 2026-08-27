import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { adminLogin } from "../../services/admin";
import { saveToken } from "../../services/auth";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "45px 24px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at 10% 10%, rgba(112,155,91,0.12), transparent 30%), radial-gradient(circle at 90% 90%, rgba(197,166,92,0.10), transparent 30%), linear-gradient(135deg, #f8f6ed 0%, #f1f6ed 50%, #edf3e9 100%)",
    position: "relative",
    overflow: "hidden",
  },

  glowOne: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(35,92,55,0.06)",
    top: "-220px",
    right: "-120px",
    pointerEvents: "none",
  },

  glowTwo: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(190,157,78,0.07)",
    bottom: "-170px",
    left: "-100px",
    pointerEvents: "none",
  },

  card: {
    width: "100%",
    maxWidth: "980px",
    minHeight: "570px",
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    background: "rgba(255,255,255,0.84)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "30px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.9)",
    boxShadow: "0 30px 80px rgba(25,70,40,0.14)",
    position: "relative",
    zIndex: 2,
  },

  brandSide: {
    background:
      "linear-gradient(145deg, #12482d 0%, #1b5c37 55%, #2d7047 100%)",
    color: "#fff",
    padding: "55px 48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  brandDecoration: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.10)",
    right: "-120px",
    bottom: "-100px",
    pointerEvents: "none",
  },

  brandDecorationTwo: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.07)",
    right: "-50px",
    top: "-45px",
    pointerEvents: "none",
  },

  leafIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#dfc27b",
    marginBottom: "25px",
  },

  brandName: {
    fontFamily: "Georgia, serif",
    fontSize: "39px",
    margin: "0 0 8px",
    fontWeight: "500",
    letterSpacing: "-1px",
  },

  brandTagline: {
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    opacity: 0.7,
    margin: 0,
  },

  goldLine: {
    width: "55px",
    height: "3px",
    background: "#d8b96e",
    borderRadius: "10px",
    margin: "28px 0",
  },

  brandHeading: {
    fontFamily: "Georgia, serif",
    fontSize: "25px",
    fontWeight: "500",
    lineHeight: "1.35",
    maxWidth: "330px",
    margin: 0,
  },

  brandText: {
    fontSize: "13px",
    lineHeight: "1.8",
    opacity: 0.75,
    maxWidth: "340px",
    marginTop: "18px",
  },

  benefitList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "28px",
  },

  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    opacity: 0.85,
  },

  benefitDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#d8b96e",
    flexShrink: 0,
  },

  formSide: {
    padding: "55px 65px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.88)",
    minWidth: 0,
  },

  formContainer: {
    width: "100%",
    maxWidth: "390px",
  },

  welcome: {
    color: "#a28b54",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  title: {
    color: "#203b2a",
    fontFamily: "Georgia, serif",
    fontSize: "37px",
    fontWeight: "500",
    margin: 0,
    letterSpacing: "-0.5px",
    lineHeight: "1.15",
  },

  subtitle: {
    color: "#7c887f",
    fontSize: "13px",
    margin: "10px 0 30px",
    lineHeight: "1.6",
  },

  error: {
    background: "#fff3f2",
    color: "#b6424b",
    border: "1px solid #f0d6d5",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "12px",
    marginBottom: "18px",
    lineHeight: "1.5",
  },

  field: {
    marginBottom: "19px",
  },

  label: {
    display: "block",
    color: "#405147",
    fontSize: "12px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
  },

  inputIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8a998e",
    fontSize: "13px",
    zIndex: 2,
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "51px",
    boxSizing: "border-box",
    padding: "0 45px",
    border: "1px solid #dce5dd",
    borderRadius: "12px",
    background: "#fafcf9",
    color: "#263a2d",
    fontSize: "13px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  eyeButton: {
    position: "absolute",
    right: "13px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#7d8c82",
    cursor: "pointer",
    padding: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #165635, #2c7147)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "5px",
    boxShadow:
      "0 12px 25px rgba(22,86,53,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.2s ease",
  },

  register: {
    textAlign: "center",
    color: "#89948c",
    fontSize: "12px",
    marginTop: "24px",
    lineHeight: "1.6",
  },

  link: {
    color: "#176039",
    fontWeight: "800",
    textDecoration: "none",
    marginLeft: "4px",
  },

  secure: {
    textAlign: "center",
    color: "#a0aaa3",
    fontSize: "10px",
    marginTop: "25px",
    letterSpacing: "0.3px",
    lineHeight: "1.5",
  },
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const loginValue = email.trim();

    if (!loginValue || !password) {
      setError(
        "Please enter your email/username and password."
      );

      setLoading(false);
      return;
    }

    // ==========================================
    // 1. TRY CUSTOMER LOGIN
    // ==========================================

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginValue.toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.success &&
        data.user
      ) {
        login(data.user);

        const destination =
          location.state?.from || "/dashboard";

        navigate(destination, {
          replace: true,
        });

        return;
      }
    } catch (userError) {
      console.log(
        "Customer login failed. Trying admin login..."
      );
    }

    // ==========================================
    // 2. TRY ADMIN LOGIN
    // ==========================================

    try {
      const adminData = await adminLogin(
        loginValue,
        password
      );

      if (
        !adminData ||
        !adminData.token
      ) {
        throw new Error(
          adminData?.message ||
            "Invalid email/username or password."
        );
      }

      saveToken(adminData.token);

      navigate("/admin/dashboard", {
        replace: true,
      });

      return;
    } catch (adminError) {
      console.error(
        "LOGIN ERROR:",
        adminError
      );

      setError(
        adminError.message ||
          "Invalid email/username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.page}>
        <div style={styles.glowOne}></div>
        <div style={styles.glowTwo}></div>

        <div className="login-card" style={styles.card}>

          {/* ======================================
              BRAND SIDE
          ====================================== */}

          <div
            className="login-brand-side"
            style={styles.brandSide}
          >
            <div style={styles.brandDecoration}></div>
            <div style={styles.brandDecorationTwo}></div>

            <div
              className="login-leaf-icon"
              style={styles.leafIcon}
            >
              <FaLeaf size={27} />
            </div>

            <h2 style={styles.brandName}>
              Amruthahara
            </h2>

            <p style={styles.brandTagline}>
              Pure • Natural • Premium
            </p>

            <div style={styles.goldLine}></div>

            <h3 style={styles.brandHeading}>
              Welcome back to a healthier way of living.
            </h3>

            <p style={styles.brandText}>
              Discover carefully selected organic
              products, natural foods and wellness
              essentials brought from trusted sources
              to your home.
            </p>

            <div style={styles.benefitList}>
              <div style={styles.benefit}>
                <span style={styles.benefitDot}></span>
                Authentic organic products
              </div>

              <div style={styles.benefit}>
                <span style={styles.benefitDot}></span>
                Carefully selected for quality
              </div>

              <div style={styles.benefit}>
                <span style={styles.benefitDot}></span>
                Farm-to-home experience
              </div>
            </div>
          </div>

          {/* ======================================
              FORM SIDE
          ====================================== */}

          <div
            className="login-form-side"
            style={styles.formSide}
          >
            <div style={styles.formContainer}>

              <div style={styles.welcome}>
                Account Login
              </div>

              <h1 style={styles.title}>
                Welcome Back
              </h1>

              <p style={styles.subtitle}>
                Sign in to continue your
                Amruthahara journey.
              </p>

              {error && (
                <div style={styles.error}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div style={styles.field}>
                  <label style={styles.label}>
                    Email / Username
                  </label>

                  <div style={styles.inputWrapper}>
                    <FaEnvelope
                      style={styles.inputIcon}
                    />

                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Email or username"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div style={styles.field}>
                  <label style={styles.label}>
                    Password
                  </label>

                  <div style={styles.inputWrapper}>
                    <FaLock
                      style={styles.inputIcon}
                    />

                    <input
                      style={{
                        ...styles.input,
                        paddingRight: "45px",
                      }}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      required
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      style={styles.eyeButton}
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}

                  {!loading && (
                    <FaArrowRight size={12} />
                  )}
                </button>
              </form>

              {/* REGISTER */}

              <div style={styles.register}>
                Don't have an account?

                <Link
                  to="/register"
                  state={{
                    pendingProduct:
                      location.state
                        ?.pendingProduct,
                    from:
                      location.state?.from,
                  }}
                  style={styles.link}
                >
                  Create Account
                </Link>
              </div>

              {/* SECURITY */}

              <div style={styles.secure}>
                Your account information is securely protected
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          RESPONSIVE DESIGN
      ========================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        /* ======================================
           INPUT FOCUS
        ====================================== */

        input:focus {
          border-color: #78a987 !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(54, 116, 74, 0.08);
        }

        input::placeholder {
          color: #a1aaa4;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        /* ======================================
           DESKTOP HOVER
        ====================================== */

        @media (min-width: 769px) {

          .login-card {
            transition:
              transform 0.35s ease,
              box-shadow 0.35s ease;
          }

          .login-card:hover {
            transform: translateY(-3px);
            box-shadow:
              0 35px 90px rgba(25,70,40,0.17);
          }

          .login-form-side button[type="submit"]:hover {
            transform: translateY(-1px);
            box-shadow:
              0 15px 30px rgba(22,86,53,0.27);
          }
        }

        /* ======================================
           TABLET
        ====================================== */

        @media (max-width: 900px) {

          .login-card {
            grid-template-columns: 0.85fr 1.15fr !important;
            max-width: 900px !important;
          }

          .login-brand-side {
            padding: 45px 35px !important;
          }

          .login-form-side {
            padding: 45px 40px !important;
          }

          .login-brand-side h2 {
            font-size: 34px !important;
          }

          .login-brand-side h3 {
            font-size: 22px !important;
          }
        }

        /* ======================================
           MOBILE
        ====================================== */

        @media (max-width: 768px) {

          .login-page {
            align-items: flex-start;
          }

          .login-card {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 520px !important;
            min-height: auto !important;
            border-radius: 24px !important;
            margin: 10px auto !important;
          }

          /* ----------------------------------
             BRAND
          ---------------------------------- */

          .login-brand-side {
            padding: 28px 25px 25px !important;
            min-height: auto !important;
            align-items: center !important;
            text-align: center !important;
          }

          .login-brand-side .login-leaf-icon {
            width: 52px !important;
            height: 52px !important;
            border-radius: 16px !important;
            margin-bottom: 13px !important;
          }

          .login-brand-side h2 {
            font-size: 29px !important;
            letter-spacing: -0.7px !important;
          }

          .login-brand-side p {
            max-width: 100% !important;
          }

          .login-brand-side > p {
            font-size: 9px !important;
            letter-spacing: 2.3px !important;
          }

          .login-brand-side .gold-line {
            margin: 17px auto !important;
            width: 45px !important;
          }

          /* Hide long marketing content on mobile */

          .login-brand-side h3,
          .login-brand-side .brand-description,
          .login-brand-side .benefit-list {
            display: none !important;
          }

          /* ----------------------------------
             FORM
          ---------------------------------- */

          .login-form-side {
            width: 100% !important;
            padding: 32px 25px 30px !important;
            display: block !important;
          }

          .login-form-side > div {
            max-width: 100% !important;
          }

          .login-form-side h1 {
            font-size: 31px !important;
          }

          .login-form-side p {
            font-size: 12px !important;
          }

          .login-form-side input {
            height: 50px !important;
          }

          .login-form-side button[type="submit"] {
            height: 51px !important;
          }

          .login-form-side .register {
            margin-top: 21px !important;
          }

          .login-form-side .secure {
            margin-top: 20px !important;
          }
        }

        /* ======================================
           SMALL MOBILE
        ====================================== */

        @media (max-width: 480px) {

          .login-page {
            padding: 20px 13px !important;
          }

          .login-card {
            border-radius: 21px !important;
            margin: 0 auto !important;
          }

          .login-brand-side {
            padding: 25px 18px 22px !important;
          }

          .login-brand-side .login-leaf-icon {
            width: 48px !important;
            height: 48px !important;
          }

          .login-brand-side h2 {
            font-size: 27px !important;
          }

          .login-form-side {
            padding: 28px 20px 27px !important;
          }

          .login-form-side .welcome {
            font-size: 10px !important;
            letter-spacing: 1.7px !important;
          }

          .login-form-side h1 {
            font-size: 29px !important;
          }

          .login-form-side input {
            height: 49px !important;
            font-size: 13px !important;
          }

          .login-form-side button[type="submit"] {
            height: 50px !important;
            font-size: 13px !important;
          }
        }

        /* ======================================
           VERY SMALL PHONES
        ====================================== */

        @media (max-width: 360px) {

          .login-page {
            padding: 12px 9px !important;
          }

          .login-brand-side {
            padding: 22px 15px 20px !important;
          }

          .login-brand-side h2 {
            font-size: 25px !important;
          }

          .login-form-side {
            padding: 25px 16px !important;
          }

          .login-form-side h1 {
            font-size: 27px !important;
          }

          .login-form-side .subtitle {
            margin-bottom: 23px !important;
          }

          .login-form-side .field {
            margin-bottom: 16px !important;
          }

          .login-form-side input {
            height: 47px !important;
          }

          .login-form-side button[type="submit"] {
            height: 48px !important;
          }

          .login-form-side .register {
            font-size: 11px !important;
          }

          .login-form-side .secure {
            font-size: 9px !important;
          }
        }

      `}</style>
    </>
  );
}

export default Login;