import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const styles = {
  page: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at 8% 10%, rgba(112,155,91,0.12), transparent 28%), radial-gradient(circle at 92% 90%, rgba(197,166,92,0.10), transparent 28%), linear-gradient(135deg, #f8f6ed 0%, #f2f6ef 50%, #edf3e9 100%)",
    position: "relative",
    overflow: "hidden",
  },

  glowOne: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: "rgba(35,92,55,0.055)",
    top: "-250px",
    right: "-150px",
    pointerEvents: "none",
  },

  glowTwo: {
    position: "absolute",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(190,157,78,0.065)",
    bottom: "-200px",
    left: "-130px",
    pointerEvents: "none",
  },

  card: {
    width: "100%",
    maxWidth: "1060px",
    minHeight: "650px",
    display: "grid",
    gridTemplateColumns: "0.86fr 1.14fr",
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "30px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow:
      "0 35px 90px rgba(25,70,40,0.15)",
    position: "relative",
    zIndex: 2,
  },

  brandSide: {
    background:
      "linear-gradient(145deg, #103f27 0%, #175734 48%, #2b7047 100%)",
    color: "#fff",
    padding: "55px 48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  decorationOne: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.09)",
    right: "-180px",
    bottom: "-150px",
  },

  decorationTwo: {
    position: "absolute",
    width: "210px",
    height: "210px",
    borderRadius: "50%",
    border: "1px solid rgba(216,185,110,0.12)",
    right: "-105px",
    bottom: "-65px",
  },

  leaf: {
    width: "64px",
    height: "64px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.11)",
    border: "1px solid rgba(255,255,255,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#dfc27b",
    marginBottom: "25px",
    boxShadow:
      "0 12px 30px rgba(0,0,0,0.08)",
  },

  logo: {
    fontFamily: "Georgia, serif",
    fontSize: "40px",
    fontWeight: "500",
    margin: "0 0 8px",
    letterSpacing: "-1px",
    position: "relative",
    zIndex: 2,
  },

  tagline: {
    fontSize: "10px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    opacity: 0.7,
    position: "relative",
    zIndex: 2,
  },

  line: {
    width: "55px",
    height: "3px",
    background: "#d8b96e",
    borderRadius: "10px",
    margin: "28px 0",
  },

  heading: {
    fontFamily: "Georgia, serif",
    fontSize: "26px",
    lineHeight: "1.4",
    fontWeight: "500",
    margin: 0,
    maxWidth: "350px",
    position: "relative",
    zIndex: 2,
  },

  description: {
    fontSize: "13px",
    lineHeight: "1.85",
    opacity: 0.74,
    maxWidth: "350px",
    marginTop: "18px",
    marginBottom: 0,
    position: "relative",
    zIndex: 2,
  },

  points: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    marginTop: "28px",
    position: "relative",
    zIndex: 2,
  },

  point: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    fontSize: "12px",
    opacity: 0.86,
  },

  pointDot: {
    width: "7px",
    height: "7px",
    minWidth: "7px",
    borderRadius: "50%",
    background: "#d8b96e",
    boxShadow: "0 0 0 4px rgba(216,185,110,0.08)",
  },

  formSide: {
    padding: "48px 68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.91)",
  },

  formContainer: {
    width: "100%",
    maxWidth: "470px",
  },

  eyebrow: {
    color: "#a28b54",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2.2px",
    textTransform: "uppercase",
    marginBottom: "9px",
  },

  title: {
    color: "#203b2a",
    fontFamily: "Georgia, serif",
    fontSize: "38px",
    fontWeight: "500",
    margin: 0,
    letterSpacing: "-0.7px",
    lineHeight: "1.15",
  },

  subtitle: {
    color: "#7c887f",
    fontSize: "13px",
    lineHeight: "1.65",
    margin: "10px 0 27px",
    maxWidth: "420px",
  },

  error: {
    background: "#fff4f3",
    color: "#b6424b",
    border: "1px solid #efd8d6",
    borderRadius: "11px",
    padding: "12px 14px",
    fontSize: "12px",
    marginBottom: "18px",
    lineHeight: "1.5",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  field: {
    marginBottom: "17px",
  },

  label: {
    display: "block",
    color: "#405147",
    fontSize: "11px",
    fontWeight: "800",
    marginBottom: "8px",
    letterSpacing: "0.1px",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
  },

  icon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8a998e",
    fontSize: "12px",
    zIndex: 2,
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "49px",
    boxSizing: "border-box",
    padding: "0 40px",
    border: "1px solid #dce5dd",
    borderRadius: "12px",
    background: "#fafcf9",
    color: "#263a2d",
    fontSize: "12px",
    outline: "none",
    transition:
      "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  },

  eyeButton: {
    position: "absolute",
    right: "11px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#7d8c82",
    cursor: "pointer",
    padding: "6px",
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
      "linear-gradient(135deg, #165635 0%, #2c7147 100%)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "3px",
    boxShadow:
      "0 13px 28px rgba(22,86,53,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease",
  },

  login: {
    textAlign: "center",
    marginTop: "22px",
    color: "#89948c",
    fontSize: "12px",
  },

  link: {
    color: "#176039",
    fontWeight: "800",
    textDecoration: "none",
    marginLeft: "5px",
  },

  secure: {
    textAlign: "center",
    color: "#a0aaa3",
    fontSize: "10px",
    marginTop: "19px",
    letterSpacing: "0.25px",
  },
};

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useCart();

  const pendingProduct =
    location.state?.pendingProduct || null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Registration failed"
        );
      }

      localStorage.setItem(
        "amruthahara_user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "amruthahara_logged_in",
        "true"
      );

      if (pendingProduct) {
        addToCart(pendingProduct);
      }

      navigate("/cart", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      setError(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        input::placeholder {
          color: #a0aaa3;
          opacity: 1;
        }

        input:focus {
          border-color: #6d9979 !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(45,112,71,0.08);
        }

        button:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(22,86,53,0.27);
        }

        a:hover {
          color: #0f4c2c !important;
        }

        @media (max-width: 900px) {
          .register-card {
            grid-template-columns: 1fr !important;
            max-width: 620px !important;
          }

          .register-brand {
            display: none !important;
          }

          .register-form-side {
            padding: 50px 45px !important;
          }
        }

        @media (max-width: 600px) {
          .register-page {
            min-height: 100vh !important;
            padding: 25px 14px !important;
            align-items: flex-start !important;
          }

          .register-card {
            margin-top: 10px;
            border-radius: 22px !important;
            min-height: auto !important;
          }

          .register-form-side {
            padding: 36px 23px !important;
          }

          .register-form-container {
            max-width: 100% !important;
          }

          .register-title {
            font-size: 32px !important;
          }

          .register-subtitle {
            font-size: 12px !important;
            margin-bottom: 23px !important;
          }

          .register-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          .register-field {
            margin-bottom: 15px !important;
          }

          .register-input {
            height: 50px !important;
          }

          .register-button {
            height: 52px !important;
          }

          .register-glow-one {
            width: 260px !important;
            height: 260px !important;
          }

          .register-glow-two {
            width: 220px !important;
            height: 220px !important;
          }
        }

        @media (max-width: 380px) {
          .register-form-side {
            padding: 30px 18px !important;
          }

          .register-title {
            font-size: 29px !important;
          }

          .register-eyebrow {
            font-size: 9px !important;
          }

          .register-login {
            font-size: 11px !important;
          }
        }
      `}</style>

      <div
        style={styles.page}
        className="register-page"
      >
        <div
          style={styles.glowOne}
          className="register-glow-one"
        />

        <div
          style={styles.glowTwo}
          className="register-glow-two"
        />

        <div
          style={styles.card}
          className="register-card"
        >
          {/* =========================================
              PREMIUM BRAND SECTION
          ========================================= */}
          <div
            style={styles.brandSide}
            className="register-brand"
          >
            <div
              style={styles.decorationOne}
            />

            <div
              style={styles.decorationTwo}
            />

            <div style={styles.leaf}>
              <FaLeaf size={27} />
            </div>

            <h2 style={styles.logo}>
              Amruthahara
            </h2>

            <div style={styles.tagline}>
              Pure • Natural • Premium
            </div>

            <div style={styles.line} />

            <h3 style={styles.heading}>
              Begin your journey towards
              better, more natural living.
            </h3>

            <p style={styles.description}>
              Create your Amruthahara account
              and discover thoughtfully sourced
              organic products, natural foods
              and wellness essentials.
            </p>

            <div style={styles.points}>
              <div style={styles.point}>
                <span
                  style={styles.pointDot}
                />
                Shop authentic organic products
              </div>

              <div style={styles.point}>
                <span
                  style={styles.pointDot}
                />
                Save your favourite products
              </div>

              <div style={styles.point}>
                <span
                  style={styles.pointDot}
                />
                Enjoy a personalised experience
              </div>
            </div>
          </div>

          {/* =========================================
              FORM SECTION
          ========================================= */}
          <div
            style={styles.formSide}
            className="register-form-side"
          >
            <div
              style={styles.formContainer}
              className="register-form-container"
            >
              <div
                style={styles.eyebrow}
                className="register-eyebrow"
              >
                Join Amruthahara
              </div>

              <h1
                style={styles.title}
                className="register-title"
              >
                Create Account
              </h1>

              <p
                style={styles.subtitle}
                className="register-subtitle"
              >
                Create your account and discover
                a more natural shopping experience.
              </p>

              {error && (
                <div style={styles.error}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* NAME + PHONE */}
                <div
                  style={styles.row}
                  className="register-row"
                >
                  <div
                    style={styles.field}
                    className="register-field"
                  >
                    <label style={styles.label}>
                      Full Name *
                    </label>

                    <div
                      style={styles.inputWrapper}
                    >
                      <FaUser
                        style={styles.icon}
                      />

                      <input
                        className="register-input"
                        style={styles.input}
                        type="text"
                        value={name}
                        placeholder="Your name"
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div
                    style={styles.field}
                    className="register-field"
                  >
                    <label style={styles.label}>
                      Phone
                    </label>

                    <div
                      style={styles.inputWrapper}
                    >
                      <FaPhone
                        style={styles.icon}
                      />

                      <input
                        className="register-input"
                        style={styles.input}
                        type="tel"
                        value={phone}
                        placeholder="Phone number"
                        onChange={(e) =>
                          setPhone(
                            e.target.value
                          )
                        }
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* EMAIL */}
                <div
                  style={styles.field}
                  className="register-field"
                >
                  <label style={styles.label}>
                    Email Address *
                  </label>

                  <div
                    style={styles.inputWrapper}
                  >
                    <FaEnvelope
                      style={styles.icon}
                    />

                    <input
                      className="register-input"
                      style={styles.input}
                      type="email"
                      value={email}
                      placeholder="you@example.com"
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* PASSWORD + CONFIRM */}
                <div
                  style={styles.row}
                  className="register-row"
                >
                  <div
                    style={styles.field}
                    className="register-field"
                  >
                    <label style={styles.label}>
                      Password *
                    </label>

                    <div
                      style={styles.inputWrapper}
                    >
                      <FaLock
                        style={styles.icon}
                      />

                      <input
                        className="register-input"
                        style={{
                          ...styles.input,
                          paddingRight: "42px",
                        }}
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        placeholder="Create password"
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        required
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        style={
                          styles.eyeButton
                        }
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

                  <div
                    style={styles.field}
                    className="register-field"
                  >
                    <label style={styles.label}>
                      Confirm Password *
                    </label>

                    <div
                      style={styles.inputWrapper}
                    >
                      <FaLock
                        style={styles.icon}
                      />

                      <input
                        className="register-input"
                        style={{
                          ...styles.input,
                          paddingRight: "42px",
                        }}
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={
                          confirmPassword
                        }
                        placeholder="Confirm password"
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        required
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        style={
                          styles.eyeButton
                        }
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CREATE ACCOUNT */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    opacity: loading
                      ? 0.7
                      : 1,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                  className="register-button"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <FaArrowRight size={11} />
                  )}
                </button>
              </form>

              {/* LOGIN */}
              <div
                style={styles.login}
                className="register-login"
              >
                Already have an account?

                <Link
                  to="/login"
                  state={{
                    pendingProduct,
                  }}
                  style={styles.link}
                >
                  Login
                </Link>
              </div>

              {/* SECURITY */}
              <div style={styles.secure}>
                Your information is securely protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;