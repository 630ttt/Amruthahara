
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
    boxSizing: "border-box",
  },

  content: {
    flex: 1,
    width: "calc(100% - 250px)",
    minWidth: 0,
    padding: "45px 5%",
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
      <div className="profile-page" style={styles.page}>
        <UserSidebar />

        <main className="profile-content" style={styles.content}>
          <h1 className="profile-title" style={styles.title}>
            My Profile
          </h1>

          <p className="profile-subtitle" style={styles.subtitle}>
            Manage your personal information.
          </p>

          <div className="profile-card" style={styles.card}>
            {/* PROFILE AVATAR */}

            <div className="profile-avatar" style={styles.avatar}>
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
                <label
                  className="profile-label"
                  style={styles.label}
                >
                  Full Name
                </label>

                <input
                  className="profile-input"
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
                <label
                  className="profile-label"
                  style={styles.label}
                >
                  Email Address
                </label>

                <input
                  className="profile-input"
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
                <label
                  className="profile-label"
                  style={styles.label}
                >
                  Phone Number
                </label>

                <input
                  className="profile-input"
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
                className="profile-button"
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

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 950px) {
          .profile-content {
            width: calc(100% - 215px) !important;
            padding: 35px 30px !important;
          }

          .profile-card {
            max-width: 100% !important;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 768px) {
          .profile-page {
            display: block !important;
            width: 100% !important;
            min-height: 100vh !important;
          }

          .profile-content {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 28px 20px 40px !important;
            margin: 0 !important;
          }

          .profile-title {
            font-size: 27px !important;
          }

          .profile-subtitle {
            font-size: 13px !important;
            margin-bottom: 24px !important;
          }

          .profile-card {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 24px 20px !important;
            border-radius: 14px !important;
            margin: 0 !important;
          }

          .profile-avatar {
            width: 70px !important;
            height: 70px !important;
            font-size: 26px !important;
            margin-bottom: 22px !important;
          }

          .profile-input {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 45px !important;
            font-size: 14px !important;
          }

          .profile-label {
            font-size: 12px !important;
          }

          .profile-button {
            display: block !important;
            width: 100% !important;
            min-height: 45px !important;
            font-size: 13px !important;
          }
        }

        /* ================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 480px) {
          .profile-content {
            padding: 24px 15px 35px !important;
          }

          .profile-title {
            font-size: 24px !important;
          }

          .profile-subtitle {
            font-size: 13px !important;
            margin-bottom: 22px !important;
          }

          .profile-card {
            padding: 22px 16px !important;
            border-radius: 14px !important;
          }

          .profile-avatar {
            width: 64px !important;
            height: 64px !important;
            font-size: 24px !important;
            margin-bottom: 20px !important;
          }

          .profile-input {
            height: 45px !important;
            font-size: 14px !important;
          }

          .profile-label {
            font-size: 12px !important;
          }

          .profile-button {
            width: 100% !important;
            height: 45px !important;
            font-size: 13px !important;
          }
        }

        /* ================================
           VERY SMALL PHONES
        ================================= */

        @media (max-width: 360px) {
          .profile-content {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .profile-card {
            padding: 20px 14px !important;
          }

          .profile-title {
            font-size: 22px !important;
          }

          .profile-subtitle {
            font-size: 12px !important;
          }

          .profile-input {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}

export default ProfilePage;

