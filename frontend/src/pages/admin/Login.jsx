import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLeaf,
} from "react-icons/fa";

import { adminLogin } from "../../services/admin";
import { saveToken } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await adminLogin(username, password);

      saveToken(data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Decorative Background */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      <div style={styles.backgroundCircle3}></div>

      <div style={styles.container}>

        {/* LEFT BRANDING SECTION */}
        <div style={styles.brandSection}>

          <div style={styles.logo}>
            <FaLeaf size={30} />
          </div>

          <p style={styles.smallBrand}>
            AMRUTHAHARA
          </p>

          <h1 style={styles.brandTitle}>
            Admin
            <br />
            <span>Control Center</span>
          </h1>

          <div style={styles.goldLine}></div>

          <p style={styles.brandDescription}>
            Manage your organic marketplace with complete control
            over products, orders, customers, content and more.
          </p>

          <div style={styles.brandFeatures}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>✓</span>
              Secure administration
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>✓</span>
              Complete platform management
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>✓</span>
              Premium organic commerce
            </div>
          </div>

        </div>

        {/* LOGIN SECTION */}
        <div style={styles.loginSection}>

          <div style={styles.loginCard}>

            <div style={styles.loginIcon}>
              <FaUserShield size={27} />
            </div>

            <h2 style={styles.loginTitle}>
              Welcome Back
            </h2>

            <p style={styles.loginSubtitle}>
              Sign in to your admin account
            </p>

            {/* ERROR */}
            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* USERNAME */}
              <div style={styles.inputGroup}>

                <label style={styles.label}>
                  Username
                </label>

                <div style={styles.inputWrapper}>

                  <FaUserShield
                    style={styles.inputIcon}
                  />

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    style={styles.input}
                    autoComplete="username"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div style={styles.inputGroup}>

                <label style={styles.label}>
                  Password
                </label>

                <div style={styles.inputWrapper}>

                  <FaLock
                    style={styles.inputIcon}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    style={{
                      ...styles.input,
                      paddingRight: "48px",
                    }}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    style={styles.eyeButton}
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
                  ...styles.loginButton,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <p style={styles.securityText}>
              <FaLock size={10} />
              &nbsp; Authorized administrators only
            </p>

          </div>

        </div>

      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} Amruthahara. Admin Portal.
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #f7f4e9 0%, #eef5e8 50%, #e6f0df 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "30px",
    boxSizing: "border-box",
    fontFamily:
      "'Inter', 'Segoe UI', Arial, sans-serif",
  },

  backgroundCircle1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "rgba(38, 101, 61, 0.07)",
    top: "-250px",
    right: "-150px",
  },

  backgroundCircle2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "rgba(185, 148, 70, 0.07)",
    bottom: "-220px",
    left: "-150px",
  },

  backgroundCircle3: {
    position: "absolute",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background:
      "rgba(38, 101, 61, 0.04)",
    top: "30%",
    left: "42%",
  },

  container: {
    width: "100%",
    maxWidth: "1050px",
    minHeight: "610px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "rgba(255,255,255,0.78)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow:
      "0 30px 80px rgba(30, 70, 40, 0.16)",
    border:
      "1px solid rgba(255,255,255,0.8)",
    position: "relative",
    zIndex: 2,
  },

  brandSection: {
    background:
      "linear-gradient(145deg, #164c31 0%, #205f3a 55%, #2e7047 100%)",
    padding: "65px 55px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  logo: {
    width: "68px",
    height: "68px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.12)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "25px",
    color: "#e1c47b",
  },

  smallBrand: {
    fontSize: "12px",
    letterSpacing: "4px",
    margin: "0 0 15px",
    opacity: 0.75,
    fontWeight: "600",
  },

  brandTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "46px",
    lineHeight: "1.08",
    margin: 0,
    fontWeight: "500",
    letterSpacing: "-1px",
  },

  brandTitleSpan: {
    color: "#e1c47b",
  },

  goldLine: {
    width: "65px",
    height: "3px",
    background: "#d7b56d",
    margin: "28px 0",
    borderRadius: "10px",
  },

  brandDescription: {
    maxWidth: "390px",
    fontSize: "14px",
    lineHeight: "1.8",
    opacity: 0.8,
    margin: 0,
  },

  brandFeatures: {
    marginTop: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  feature: {
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: 0.9,
  },

  featureIcon: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e1c47b",
    fontSize: "11px",
  },

  loginSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    background:
      "rgba(255,255,255,0.86)",
  },

  loginCard: {
    width: "100%",
    maxWidth: "370px",
  },

  loginIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background: "#edf5e9",
    color: "#28633e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "22px",
  },

  loginTitle: {
    fontSize: "30px",
    color: "#193b29",
    margin: 0,
    fontWeight: "700",
  },

  loginSubtitle: {
    fontSize: "14px",
    color: "#7b867e",
    margin:
      "9px 0 30px",
  },

  errorBox: {
    background: "#fff2f1",
    border:
      "1px solid #ffd5d2",
    color: "#c0392b",
    padding: "12px 15px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "20px",
  },

  inputGroup: {
    marginBottom: "21px",
  },

  label: {
    display: "block",
    color: "#34483b",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
  },

  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8a998f",
    fontSize: "14px",
    zIndex: 2,
  },

  input: {
    width: "100%",
    height: "53px",
    borderRadius: "13px",
    border:
      "1px solid #dce5dc",
    background: "#f9fbf8",
    padding:
      "0 16px 0 45px",
    fontSize: "14px",
    color: "#26382d",
    outline: "none",
    boxSizing: "border-box",
    transition:
      "all 0.2s ease",
  },

  eyeButton: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#7c8b81",
    cursor: "pointer",
    fontSize: "15px",
    padding: "5px",
  },

  loginButton: {
    width: "100%",
    height: "54px",
    border: "none",
    borderRadius: "13px",
    background:
      "linear-gradient(135deg, #1c5836, #2d7448)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    marginTop: "8px",
    boxShadow:
      "0 12px 28px rgba(28,88,54,0.23)",
    transition:
      "all 0.25s ease",
  },

  securityText: {
    marginTop: "25px",
    textAlign: "center",
    color: "#9aa49d",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  copyright: {
    position: "absolute",
    bottom: "15px",
    color: "#7e8c82",
    fontSize: "11px",
    zIndex: 3,
  },
};

export default Login;