import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7faf7",
    padding: "30px 20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "#fff",
    borderRadius: "20px",
    padding: "38px",
    boxSizing: "border-box",
    boxShadow: "0 15px 45px rgba(25, 70, 40, 0.10)",
    border: "1px solid #e5ede6",
  },

  logo: {
    textAlign: "center",
    color: "#175c38",
    fontSize: "30px",
    fontWeight: "900",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    color: "#78847b",
    fontSize: "14px",
    marginBottom: "30px",
  },

  title: {
    color: "#23432e",
    fontSize: "23px",
    fontWeight: "800",
    marginBottom: "22px",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    color: "#536258",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #dce6de",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "8px",
  },

  error: {
    background: "#fff1f1",
    color: "#b33d45",
    border: "1px solid #f0d5d7",
    borderRadius: "9px",
    padding: "12px",
    fontSize: "13px",
    marginBottom: "18px",
  },

  register: {
    textAlign: "center",
    marginTop: "25px",
    color: "#78847b",
    fontSize: "13px",
  },

  link: {
    color: "#175c38",
    fontWeight: "800",
    textDecoration: "none",
  },
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      // Save logged-in user in AuthContext + localStorage
      login(data.user);

      /*
       * If the user originally tried to access a protected
       * page, return them there.
       *
       * Otherwise go to dashboard.
       */
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
      <div style={styles.card}>
        <div style={styles.logo}>
          Amruthahara
        </div>

        <div style={styles.subtitle}>
          Pure. Natural. Premium.
        </div>

        <h1 style={styles.title}>
          Welcome Back
        </h1>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>
              Email Address
            </label>

            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              Password
            </label>

            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        <div style={styles.register}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={styles.link}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;