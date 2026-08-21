import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../../context/CartContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const styles = {
  page: {
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px 20px",
    backgroundColor: "#f8faf7",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "#fff",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(30,70,40,0.10)",
    border: "1px solid #e8eee6",
  },

  title: {
    textAlign: "center",
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    color: "#7a867d",
    fontSize: "14px",
    marginBottom: "28px",
  },

  label: {
    display: "block",
    color: "#23432e",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #dce5dc",
    borderRadius: "9px",
    outline: "none",
    fontSize: "14px",
    marginBottom: "16px",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#175c38",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
  },

  error: {
    backgroundColor: "#fff0f0",
    color: "#c44b55",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "15px",
  },

  login: {
    textAlign: "center",
    marginTop: "22px",
    color: "#7a867d",
    fontSize: "14px",
  },

  link: {
    color: "#175c38",
    fontWeight: "700",
    textDecoration: "none",
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
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
            name,
            email,
            phone,
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

      // Automatically log the user in
      localStorage.setItem(
        "amruthahara_user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "amruthahara_logged_in",
        "true"
      );

      // Add pending product
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
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Create Account
        </h1>

        <p style={styles.subtitle}>
          Join Amruthahara and start shopping
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            Full Name *
          </label>

          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Email *
          </label>

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Phone
          </label>

          <input
            type="tel"
            value={phone}
            placeholder="Enter your phone number"
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Password *
          </label>

          <input
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Confirm Password *
          </label>

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div style={styles.login}>
          Already have an account?{" "}

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
      </div>
    </div>
  );
}

export default Register;