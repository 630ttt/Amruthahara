const API_BASE_URL =
  process.env.API_BASE_URL ||
  "https://amruthahara-backend.onrender.com";

const toPublicApiUrl = (url) => {
  if (!url) return "";

  const value = String(url).trim();

  if (!value) return "";

  // Base64 / binary converted to data URL
  if (value.startsWith("data:")) {
    return value;
  }

  // Already HTTPS
  if (value.startsWith("https://")) {
    return value;
  }

  // Convert localhost backend URLs
  if (
    value.startsWith("http://localhost:5000") ||
    value.startsWith("http://127.0.0.1:5000")
  ) {
    return value
      .replace(
        "http://localhost:5000",
        API_BASE_URL
      )
      .replace(
        "http://127.0.0.1:5000",
        API_BASE_URL
      );
  }

  // Convert other localhost URLs
  if (
    value.startsWith("http://localhost") ||
    value.startsWith("http://127.0.0.1")
  ) {
    try {
      const parsed = new URL(value);

      return `${API_BASE_URL}${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return value;
    }
  }

  // Relative API URL
  if (value.startsWith("/api/")) {
    return `${API_BASE_URL}${value}`;
  }

  // Relative uploads URL
  if (value.startsWith("/uploads/")) {
    return `${API_BASE_URL}${value}`;
  }

  return value;
};

module.exports = API_BASE_URL;
module.exports.toPublicApiUrl = toPublicApiUrl;
