import React, { useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import { useAuth } from "../../context/AuthContext";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    display: "flex",
  },

  content: {
    flex: 1,
    padding: "45px 5%",
  },

  title: {
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#78847b",
    marginBottom: "30px",
  },

  card: {
    maxWidth: "750px",
    background: "#fff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "30px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#175c38",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "25px",
  },

  field: {
    marginBottom: "20px",
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
    border: "1px solid #dfe7e0",
    borderRadius: "9px",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    background: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    padding: "12px 22px",
    cursor: "pointer",
    fontWeight: "700",
  },

  message: {
    marginBottom: "20px",
    padding: "12px",
    background: "#eaf7ed",
    color: "#176338",
    borderRadius: "8px",
    fontSize: "13px",
  },
};

function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser({
      name,
      phone,
    });

    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div style={styles.page}>
      <UserSidebar />

      <main style={styles.content}>
        <h1 style={styles.title}>
          My Profile
        </h1>

        <p style={styles.subtitle}>
          Manage your personal information.
        </p>

        <div style={styles.card}>
          <div style={styles.avatar}>
            {initial}
          </div>

          {message && (
            <div style={styles.message}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>
                Full Name
              </label>

              <input
                style={styles.input}
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Email Address
              </label>

              <input
                style={{
                  ...styles.input,
                  background: "#f4f6f4",
                }}
                type="email"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Phone Number
              </label>

              <input
                style={styles.input}
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter phone number"
              />
            </div>

            <button
              type="submit"
              style={styles.button}
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;