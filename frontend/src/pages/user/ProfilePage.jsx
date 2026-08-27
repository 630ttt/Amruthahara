import React, { useState } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import { useAuth } from "../../context/AuthContext";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7faf7",
    display: "flex",
    width: "100%",
    overflowX: "hidden",
  },

  content: {
    flex: 1,
    padding: "45px 5%",
    minWidth: 0,
    boxSizing: "border-box",
  },

  title: {
    color: "#23432e",
    fontSize: "30px",
    fontWeight: "800",
    margin: "0 0 8px",
    lineHeight: "1.25",
  },

  subtitle: {
    color: "#78847b",
    margin: "0 0 30px",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  card: {
    width: "100%",
    maxWidth: "750px",
    background: "#fff",
    border: "1px solid #e5ede6",
    borderRadius: "16px",
    padding: "30px",
    boxSizing: "border-box",
    boxShadow: "0 8px 28px rgba(23, 92, 56, 0.04)",
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
    width: "100%",
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
    height: "46px",
    boxSizing: "border-box",
    border: "1px solid #dfe7e0",
    borderRadius: "9px",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    color: "#263d2d",
    background: "#fff",
  },

  button: {
    background: "#175c38",
    color: "#fff",
    border: "none",
    borderRadius: "9px",
    minHeight: "46px",
    padding: "12px 22px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  message: {
    marginBottom: "20px",
    padding: "12px",
    background: "#eaf7ed",
    color: "#176338",
    borderRadius: "8px",
    fontSize: "13px",
    border: "1px solid #d7ebdc",
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
    name?.charAt(0)?.toUpperCase() ||
    user?.name?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <>
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
            {/* PROFILE AVATAR */}

            <div style={styles.avatar}>
              {initial}
            </div>

            {/* SUCCESS MESSAGE */}

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}

            {/* PROFILE FORM */}

            <form onSubmit={handleSubmit}>
              {/* NAME */}

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
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* EMAIL */}

              <div style={styles.field}>
                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  style={{
                    ...styles.input,
                    background: "#f4f6f4",
                    color: "#7b857e",
                    cursor: "not-allowed",
                  }}
                  type="email"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              {/* PHONE */}

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

              {/* SAVE BUTTON */}

              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background =
                    "#124a2d";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background =
                    "#175c38";
                }}
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* ================================
          RESPONSIVE DESIGN
      ================================= */}

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

        /* =================================
           TABLET
        ================================= */

        @media (max-width: 900px) {
          .profile-content {
            padding: 35px 30px;
          }
        }

        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {
          .profile-content {
            width: 100%;
            padding: 28px 20px 40px;
          }

          .profile-title {
            font-size: 27px;
          }

          .profile-card {
            max-width: 100%;
            padding: 24px 20px;
          }

          .profile-avatar {
            width: 70px;
            height: 70px;
            font-size: 26px;
            margin-bottom: 22px;
          }

          .profile-button {
            width: 100%;
          }
        }

        /* =================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 480px) {
          .profile-content {
            padding: 24px 15px 35px;
          }

          .profile-title {
            font-size: 24px;
          }

          .profile-subtitle {
            font-size: 13px;
            margin-bottom: 22px;
          }

          .profile-card {
            padding: 22px 16px;
            border-radius: 14px;
          }

          .profile-avatar {
            width: 64px;
            height: 64px;
            font-size: 24px;
          }

          .profile-input {
            height: 45px;
            font-size: 14px;
          }

          .profile-label {
            font-size: 12px;
          }

          .profile-button {
            height: 45px;
            font-size: 13px;
          }
        }

        /* =================================
           VERY SMALL PHONES
        ================================= */

        @media (max-width: 360px) {
          .profile-content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .profile-card {
            padding: 20px 14px;
          }

          .profile-title {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}

export default ProfilePage;