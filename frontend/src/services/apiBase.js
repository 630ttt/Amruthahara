const fromEnv =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "";

const isLocalBrowser =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_BASE_URL = isLocalBrowser
  ? "http://localhost:5000"
  : fromEnv || "http://localhost:5000";

export default API_BASE_URL;
export { API_BASE_URL };
