import React, { useState } from "react";
import { API_BASE_URL } from "../services/apiBase";
const stripSlash = (url) => String(url || "").replace(/\/+$/, "");

const envUrl = stripSlash(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    ""
);

const LOCAL_API = "http://localhost:5000";
const PRODUCTION_API = "https://amruthahara-backend.onrender.com";

const isLocalHostName = (hostname) =>
  hostname === "localhost" || hostname === "127.0.0.1";

const isLocalUrl = (url) => /localhost|127\.0\.0\.1/i.test(String(url || ""));

const resolveApiBase = () => {
  if (
    typeof window !== "undefined" &&
    isLocalHostName(window.location.hostname)
  ) {
    return LOCAL_API;
  }

  if (envUrl && !isLocalUrl(envUrl)) {
    return envUrl;
  }

  return PRODUCTION_API;
};

const API_BASE_URL = resolveApiBase();

const toPublicApiUrl = (url) => {
  if (!url || typeof url !== "string") {
    return url;
  }

  if (
    typeof window !== "undefined" &&
    isLocalHostName(window.location.hostname)
  ) {
    return url;
  }

  return url.replace(
    /^https?:\/\/(localhost|127\.0\.0\.1):\d+/i,
    API_BASE_URL
  );
};

export default API_BASE_URL;
export { API_BASE_URL, toPublicApiUrl };
