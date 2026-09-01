import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../services/apiBase";

const PLAN_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const statusLabel = (status) => {
  if (status === "approved") return "Approved";
  if (status === "declined") return "Declined";
  if (status === "pending") return "Pending";
  return "";
};

const statusColors = (status) => {
  if (status === "approved") {
    return { background: "#EAF4E5", color: "#2F6B3F" };
  }
  if (status === "declined") {
    return { background: "#FDECEC", color: "#B42318" };
  }
  return { background: "#F6EEDC", color: "#8A6A2F" };
};

const planLabel = (plan) =>
  PLAN_OPTIONS.find((item) => item.value === plan)?.label || plan;

function SubscriptionRequestSection() {
  const { user, token, isAuthenticated, sessionReady } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("");
  const [days, setDays] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [trackError, setTrackError] = useState("");
  const [showTrack, setShowTrack] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setName((currentName) => currentName || user.name || "");
    setEmail(user.email || "");
    setPhone((currentPhone) => currentPhone || user.phone || "");
  }, [user]);

  const loadMine = async () => {
    if (!token) {
      setCurrent(null);
      return;
    }

    try {
      setLoadingTrack(true);
      setTrackError("");

      const response = await fetch(`${API_BASE_URL}/api/subscriptions/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load your subscription"
        );
      }

      setCurrent(data.subscription || null);
    } catch (error) {
      setTrackError(
        error.message || "Unable to load your subscription"
      );
      setCurrent(null);
    } finally {
      setLoadingTrack(false);
    }
  };

  useEffect(() => {
    if (!sessionReady || !isAuthenticated || !token) {
      setCurrent(null);
      return;
    }

    loadMine();
  }, [sessionReady, isAuthenticated, token]);

  const validate = () => {
    const next = {};

    if (!String(name).trim()) {
      next.name = "Full name is required";
    }

    if (!String(email).trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address";
    }

    const digits = String(phone).replace(/\D/g, "");
    if (!String(phone).trim()) {
      next.phone = "Phone number is required";
    } else if (digits.length < 10 || digits.length > 15) {
      next.phone = "Enter a valid phone number";
    }

    if (!plan) {
      next.plan = "Please select a subscription plan";
    }

    const daysNumber = Number(days);
    if (days === "" || days === null) {
      next.days = "Number of days is required";
    } else if (!Number.isInteger(daysNumber) || daysNumber < 1) {
      next.days = "Enter a whole number of at least 1";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!isAuthenticated || !token) {
      setFormError("Please log in to send a subscription request.");
      return;
    }

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          plan,
          days: Number(days),
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit subscription request"
        );
      }

      setCurrent(data.subscription || null);
      setSuccess(true);
      setShowTrack(true);
      setPlan("");
      setDays("");
      setNotes("");
      setErrors({});
    } catch (error) {
      setFormError(
        error.message || "Unable to submit subscription request"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="amrutha-sub-request">
      <style>{`
        .amrutha-sub-request {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .amrutha-sub-request .amrutha-sub-heading {
          text-align: center;
          margin-bottom: 32px;
        }
        .amrutha-sub-request .eyebrow {
          letter-spacing: 1.8px;
          font-size: 11px;
          font-weight: 800;
          color: #a68b4f;
        }
        .amrutha-sub-request h2 {
          margin: 10px 0 0;
          font-family: Georgia, serif;
          font-size: clamp(28px, 4vw, 42px);
          color: #173f2a;
        }
        .amrutha-sub-request-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: 24px;
          align-items: start;
        }
        .amrutha-sub-form,
        .amrutha-sub-track-card {
          background: #fff;
          border: 1px solid #e6e5dd;
          border-radius: 18px;
          padding: 28px 26px;
          box-sizing: border-box;
          min-width: 0;
        }
        .amrutha-sub-label {
          display: block;
          margin-bottom: 16px;
          font-size: 12px;
          font-weight: 700;
          color: #173f2a;
        }
        .amrutha-sub-input {
          width: 100%;
          margin-top: 8px;
          padding: 12px 14px;
          border: 1px solid #deded5;
          border-radius: 12px;
          background: #fbfbf8;
          font-size: 14px;
          color: #173f2a;
          font-family: inherit;
          box-sizing: border-box;
        }
        .amrutha-sub-textarea {
          resize: vertical;
          min-height: 110px;
        }
        .amrutha-sub-field-error {
          display: block;
          margin-top: 6px;
          color: #b42318;
          font-size: 12px;
          font-weight: 500;
        }
        .amrutha-sub-alert {
          margin: 8px 0 16px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #f6eedc;
          color: #6d5424;
          font-size: 13px;
        }
        .amrutha-sub-alert-error {
          background: #fdecec;
          color: #b42318;
        }
        .amrutha-sub-inline-link {
          color: #175c38;
          font-weight: 700;
        }
        .amrutha-sub-submit,
        .amrutha-sub-track-btn {
          width: 100%;
          border: none;
          border-radius: 999px;
          padding: 13px 18px;
          background: #173f2a;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .amrutha-sub-submit:disabled,
        .amrutha-sub-track-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .amrutha-sub-track-eyebrow {
          margin: 0 0 8px;
          letter-spacing: 1.6px;
          font-size: 11px;
          font-weight: 800;
          color: #a68b4f;
        }
        .amrutha-sub-track-card h3 {
          margin: 0 0 8px;
          font-family: Georgia, serif;
          font-size: 28px;
          color: #173f2a;
        }
        .amrutha-sub-track-copy {
          color: #74776f;
          font-size: 13px;
          line-height: 1.7;
          margin-bottom: 18px;
        }
        .amrutha-sub-track-panel,
        .amrutha-sub-success {
          margin-top: 18px;
          padding: 16px;
          border-radius: 14px;
          background: #f7f6f0;
          color: #435047;
          font-size: 14px;
          line-height: 1.7;
        }
        .amrutha-sub-track-title {
          font-weight: 800;
          color: #173f2a;
        }
        .amrutha-sub-status-pill {
          display: inline-block;
          margin-top: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }
        .amrutha-sub-success strong {
          display: block;
          margin-bottom: 8px;
          color: #173f2a;
        }
        @media (max-width: 900px) {
          .amrutha-sub-request-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="amrutha-sub-heading">
        <p className="eyebrow">SUBSCRIPTION REQUEST</p>
        <h2>A plan that fits your life.</h2>
        <p>
          Tell us how you would like to receive Amruthahara, and our
          team will review your request.
        </p>
      </div>

      <div className="amrutha-sub-request-grid">
        <form className="amrutha-sub-form" onSubmit={handleSubmit} noValidate>
          <label className="amrutha-sub-label">
            Full Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              className="amrutha-sub-input"
            />
            {errors.name ? (
              <span className="amrutha-sub-field-error">{errors.name}</span>
            ) : null}
          </label>

          <label className="amrutha-sub-label">
            Email
            <input
              type="email"
              value={email}
              readOnly={Boolean(user?.email)}
              onChange={(event) => {
                if (!user?.email) {
                  setEmail(event.target.value);
                }
              }}
              placeholder="Enter your email"
              className="amrutha-sub-input"
            />
            {errors.email ? (
              <span className="amrutha-sub-field-error">{errors.email}</span>
            ) : null}
          </label>

          <label className="amrutha-sub-label">
            Phone Number
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
              className="amrutha-sub-input"
            />
            {errors.phone ? (
              <span className="amrutha-sub-field-error">{errors.phone}</span>
            ) : null}
          </label>

          <label className="amrutha-sub-label">
            Subscription Plan
            <select
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
              className="amrutha-sub-input"
            >
              <option value="">Select subscription plan</option>
              {PLAN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.plan ? (
              <span className="amrutha-sub-field-error">{errors.plan}</span>
            ) : null}
          </label>

          <label className="amrutha-sub-label">
            How Many Days?
            <input
              type="number"
              min="1"
              step="1"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              placeholder="Enter the number of days"
              className="amrutha-sub-input"
            />
            {errors.days ? (
              <span className="amrutha-sub-field-error">{errors.days}</span>
            ) : null}
          </label>

          <label className="amrutha-sub-label">
            Additional Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any additional requirements or preferences"
              className="amrutha-sub-input amrutha-sub-textarea"
              rows={4}
            />
          </label>

          {formError ? (
            <div className="amrutha-sub-alert amrutha-sub-alert-error">
              {formError}
            </div>
          ) : null}

          {!isAuthenticated ? (
            <div className="amrutha-sub-alert">
              Please{" "}
              <Link to="/login" className="amrutha-sub-inline-link">
                log in
              </Link>{" "}
              to send a subscription request.
            </div>
          ) : null}

          <button
            type="submit"
            className="amrutha-sub-submit"
            disabled={submitting || !isAuthenticated}
          >
            {submitting ? "Sending..." : "Send Subscription Request"}
          </button>
        </form>

        <aside className="amrutha-sub-track-card">
          <p className="amrutha-sub-track-eyebrow">YOUR REQUEST</p>
          <h3>Track Subscription</h3>
          <p className="amrutha-sub-track-copy">
            Follow the status of your latest subscription request after
            our team reviews it.
          </p>

          <button
            type="button"
            className="amrutha-sub-track-btn"
            onClick={() => {
              setShowTrack(true);
              loadMine();
            }}
            disabled={!isAuthenticated}
          >
            Track Subscription
          </button>

          {showTrack ? (
            <div className="amrutha-sub-track-panel">
              {loadingTrack ? (
                <p>Loading your subscription...</p>
              ) : trackError ? (
                <p className="amrutha-sub-field-error">{trackError}</p>
              ) : !current ? (
                <p>You don't have any subscription requests yet.</p>
              ) : (
                <div>
                  <p className="amrutha-sub-track-title">Your Subscription</p>
                  <p>
                    Plan: <strong>{planLabel(current.plan)}</strong>
                  </p>
                  <p>
                    Duration: <strong>{current.days} Days</strong>
                  </p>
                  <p>Status:</p>
                  <span
                    className="amrutha-sub-status-pill"
                    style={statusColors(current.status)}
                  >
                    {statusLabel(current.status)}
                  </span>
                </div>
              )}
            </div>
          ) : null}

          {success && current ? (
            <div className="amrutha-sub-success">
              <strong>Subscription Request Sent</strong>
              <p>
                Your subscription request has been successfully submitted.
                Our team will review your request and update the status
                shortly.
              </p>
              <p>
                Current Status:{" "}
                <strong>{statusLabel(current.status)}</strong>
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

export default SubscriptionRequestSection;
export { statusLabel, statusColors, planLabel };
