require("dotenv").config();

const stripSlash = (url) => String(url || "").replace(/\/+$/, "");

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const isLocalHost = (value) =>
  /localhost|127\.0\.0\.1/i.test(String(value || ""));

const envApiBase = stripSlash(
  process.env.API_BASE_URL ||
    process.env.BASE_URL ||
    process.env.BACKEND_URL ||
    ""
);

const API_BASE_URL = envApiBase || `http://localhost:${PORT}`;

const getPublicApiBase = (req) => {
  if (req) {
    const host = String(
      req.get("x-forwarded-host") || req.get("host") || ""
    )
      .split(",")[0]
      .trim();

    if (host && !isLocalHost(host)) {
      const proto = String(
        req.get("x-forwarded-proto") || req.protocol || "https"
      )
        .split(",")[0]
        .trim();

      return stripSlash(`${proto}://${host}`);
    }
  }

  if (envApiBase && !isLocalHost(envApiBase)) {
    return envApiBase;
  }

  return API_BASE_URL;
};

const FRONTEND_URL = stripSlash(
  process.env.FRONTEND_URL ||
    (isProduction ? API_BASE_URL : "http://localhost:5173")
);

module.exports = {
  API_BASE_URL,
  BASE_URL: API_BASE_URL,
  FRONTEND_URL,
  getPublicApiBase,
};
