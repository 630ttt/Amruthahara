import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px 25px",
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
  },

  glowTwo: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(190,157,78,0.07)",
    bottom: "-170px",
    left: "-100px",
  },

  card: {
    width: "100%",
    maxWidth: "980px",
    minHeight: "570px",
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    background: "rgba(255,255,255,0.82)",
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
  },

  formSide: {
    padding: "55px 65px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.88)",
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
    padding: "5px",
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
    boxShadow: "0 12px 25px rgba(22,86,53,0.22)",
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

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      login(data.user);

      const destination =
        location.state?.from || "/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      <div style={styles.card}>

        {/* BRAND SIDE */}
        <div style={styles.brandSide}>
          <div style={styles.brandDecoration}></div>

          <div style={styles.leafIcon}>
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
            Discover carefully selected organic products,
            natural foods and wellness essentials brought
            from trusted sources to your home.
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

        {/* FORM SIDE */}
        <div style={styles.formSide}>
          <div style={styles.formContainer}>

            <div style={styles.welcome}>
              Customer Account
            </div>

            <h1 style={styles.title}>
              Welcome Back
            </h1>

            <p style={styles.subtitle}>
              Sign in to continue your Amruthahara journey.
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
                  Email Address
                </label>

                <div style={styles.inputWrapper}>
                  <FaEnvelope
                    style={styles.inputIcon}
                  />

                  <input
                    style={styles.input}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
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
                      setPassword(event.target.value)
                    }
                    required
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    style={styles.eyeButton}
                    onClick={() =>
                      setShowPassword(!showPassword)
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

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
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

            <div style={styles.register}>
              Don't have an account?

              <Link
                to="/register"
                state={{
                  pendingProduct:
                    location.state?.pendingProduct,
                  from: location.state?.from,
                }}
                style={styles.link}
              >
                Create Account
              </Link>
            </div>

            <div style={styles.secure}>
              Your account information is securely protected
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;