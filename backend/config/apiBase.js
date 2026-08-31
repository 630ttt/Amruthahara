require("dotenv").config();

const stripSlash = (url) => String(url || "").replace(/\/+$/, "");

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const API_BASE_URL = stripSlash(
  process.env.API_BASE_URL ||
    process.env.BASE_URL ||
    process.env.BACKEND_URL ||
    `http://localhost:${PORT}`
);

const FRONTEND_URL = stripSlash(
  process.env.FRONTEND_URL ||
    (isProduction ? API_BASE_URL : "http://localhost:5173")
);

module.exports = {
  API_BASE_URL,
  BASE_URL: API_BASE_URL,
  FRONTEND_URL,
};
