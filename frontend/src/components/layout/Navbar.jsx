import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { API_BASE_URL, toPublicApiUrl } from "../../services/apiBase";

const styles = {
  navbar: {
    minHeight: "76px",
    width: "100%",
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    display: "flex",
    alignItems: "center",
    
    justifyContent: "space-between",
    padding: "0 5%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    borderBottom: "1px solid rgba(23,92,56,0.08)",
    boxShadow: "0 8px 30px rgba(20,55,32,0.06)",
    gap: "20px",
    boxSizing: "border-box",
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    flexShrink: 0,
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    marginLeft: "10px",
  },

  link: {
    position: "relative",
    textDecoration: "none",
    color: "#45554B",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    padding: "8px 0",
    transition: "color 0.25s ease",
    whiteSpace: "nowrap",
  },

  searchWrapper: {
    position: "relative",
    flex: 1,
    maxWidth: "280px",
    minWidth: "150px",
  },

  searchBox: {
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid rgba(23,92,56,0.13)",
    borderRadius: "50px",
    padding: "0 14px",
    background: "#F7FAF6",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  suggestions: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    background: "#FFFFFF",
    border: "1px solid #E3EBE4",
    borderRadius: "14px",
    boxShadow: "0 16px 40px rgba(23,92,56,0.12)",
    overflow: "hidden",
    zIndex: 1200,
  },

  suggestionItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    textDecoration: "none",
    color: "#23432E",
    borderBottom: "1px solid #F0F4F0",
    cursor: "pointer",
    background: "transparent",
    width: "100%",
    textAlign: "left",
  },

  suggestionImage: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    objectFit: "cover",
    background: "#F1F5EE",
    flexShrink: 0,
  },

  suggestionName: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#23432E",
  },

  suggestionMeta: {
    fontSize: "11px",
    color: "#7A857D",
    marginTop: "2px",
  },

  suggestionAll: {
    width: "100%",
    border: "none",
    background: "#F7FAF6",
    color: "#175C38",
    fontSize: "12px",
    fontWeight: "800",
    padding: "11px 12px",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "12px",
    color: "#263D2E",
    minWidth: 0,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexShrink: 0,
  },

  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  loginButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    padding: "0 16px",
    borderRadius: "7px",
    border: "1px solid rgba(23,92,56,0.25)",
    background: "#FFFFFF",
    color: "#24563B",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
  },

  registerButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    padding: "0 17px",
    borderRadius: "7px",
    border: "1px solid #245E3C",
    background: "linear-gradient(135deg, #245E3C, #39764B)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
    boxShadow: "0 7px 18px rgba(23,92,56,0.15)",
  },

  accountButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "38px",
    padding: "0 14px",
    borderRadius: "7px",
    background: "#F1F7F2",
    border: "1px solid rgba(23,92,56,0.10)",
    color: "#245E3C",
    textDecoration: "none",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
  },

  icons: {
    display: "flex",
    alignItems: "center",
    gap: "19px",
  },

  iconWrapper: {
    position: "relative",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#285D3E",
    textDecoration: "none",
    fontSize: "16px",
    transition: "all 0.25s ease",
  },

  badge: {
    position: "absolute",
    top: "-9px",
    right: "-10px",
    minWidth: "17px",
    height: "17px",
    padding: "0 4px",
    borderRadius: "50%",
    background: "#B96A63",
    color: "#FFFFFF",
    border: "2px solid #FFFFFF",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "8px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  mobileMenuButton: {
    display: "none",
    width: "38px",
    height: "38px",
    border: "1px solid rgba(23,92,56,0.15)",
    borderRadius: "8px",
    background: "#F1F7F2",
    color: "#245E3C",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
};

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catalog, setCatalog] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const blurTimer = useRef(null);

  const matchesProduct = (product, query) => {
    const haystack = [
      product?.name,
      product?.description,
      product?.category,
      product?.bowlCategory,
      ...(Array.isArray(product?.tags) ? product.tags : []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  };

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();

        if (data.success) {
          setCatalog(data.products || []);
        }
      } catch (error) {
        console.error("Navbar search catalog error:", error);
      }
    };

    loadCatalog();
  }, []);

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return catalog
      .filter((product) => matchesProduct(product, query))
      .slice(0, 6);
  }, [catalog, searchQuery]);

  const goToSearchResults = (query = searchQuery) => {
    const value = String(query || "").trim();

    setShowSuggestions(false);
    closeMobileMenu();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    goToSearchResults();
  };

  const handleSearchFocus = () => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
    }

    setSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    blurTimer.current = setTimeout(() => {
      setShowSuggestions(false);
    }, 180);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap');

          * {
            box-sizing: border-box;
          }

          .amruthahara-navbar {
            position: fixed !important;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100%;
            overflow: visible;
            z-index: 2000;
          }

          .amruthahara-navbar-spacer {
            height: 76px;
            width: 100%;
            flex-shrink: 0;
          }

          .amruthahara-logo-image {
            width: 155px;
            height: 64px;
            object-fit: contain;
            display: block;
            transition: transform 0.25s ease;
          }

          .amruthahara-logo-image:hover {
            transform: scale(1.03);
          }

          .amruthahara-nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 1px;
            width: 100%;
            height: 1px;
            background: #789C5B;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }

          .amruthahara-nav-link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }

          .amruthahara-search:hover {
            border-color: rgba(23,92,56,0.25) !important;
            background: #FFFFFF !important;
          }

          .amruthahara-login:hover {
            background: #F1F7F2 !important;
            transform: translateY(-1px);
          }

          .amruthahara-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(23,92,56,0.22) !important;
          }

          .amruthahara-account:hover {
            background: #EAF4EC !important;
            transform: translateY(-1px);
          }

          .amruthahara-icon:hover {
            transform: translateY(-2px);
          }

          .amruthahara-mobile-menu-button {
            display: none !important;
          }

          .amruthahara-mobile-menu {
            display: none;
          }

          /*
            ==========================================
            LARGE TV - 1920px AND ABOVE
            ==========================================
          */

          @media (min-width: 1920px) {

            .amruthahara-navbar {
              min-height: 88px !important;
              padding-left: 6% !important;
              padding-right: 6% !important;
              gap: 45px !important;
            }

            .amruthahara-logo-image {
              width: 180px !important;
              height: 74px !important;
            }

            .amruthahara-nav-links {
              gap: 42px !important;
              margin-left: 20px !important;
            }

            .amruthahara-nav-link {
              font-size: 14px !important;
            }

            .amruthahara-search {
              max-width: 360px !important;
              height: 46px !important;
            }

            .amruthahara-search input {
              font-size: 13px !important;
            }

            .amruthahara-right {
              gap: 30px !important;
            }

            .amruthahara-icons {
              gap: 25px !important;
            }

            .amruthahara-icon {
              font-size: 19px !important;
            }

            .amruthahara-login,
            .amruthahara-register,
            .amruthahara-account {
              height: 44px !important;
              font-size: 13px !important;
            }
          }

          /*
            ==========================================
            LARGE DESKTOP - 1600px TO 1919px
            ==========================================
          */

          @media (min-width: 1600px) and (max-width: 1919px) {

            .amruthahara-navbar {
              padding-left: 5.5% !important;
              padding-right: 5.5% !important;
              gap: 35px !important;
            }

            .amruthahara-logo-image {
              width: 165px !important;
            }

            .amruthahara-nav-links {
              gap: 34px !important;
            }

            .amruthahara-search {
              max-width: 320px !important;
            }
          }

          /*
            ==========================================
            DESKTOP - 1366px TO 1599px
            ==========================================
          */

          @media (min-width: 1366px) and (max-width: 1599px) {

            .amruthahara-navbar {
              padding-left: 4.5% !important;
              padding-right: 4.5% !important;
              gap: 25px !important;
            }

            .amruthahara-nav-links {
              gap: 27px !important;
            }

            .amruthahara-search {
              max-width: 260px !important;
            }
          }

          /*
            ==========================================
            LAPTOP - 1151px TO 1365px
            ==========================================
          */

          @media (min-width: 1151px) and (max-width: 1365px) {

            .amruthahara-navbar {
              padding-left: 3% !important;
              padding-right: 3% !important;
              gap: 18px !important;
            }

            .amruthahara-logo-image {
              width: 140px !important;
              height: 62px !important;
            }

            .amruthahara-nav-links {
              gap: 18px !important;
              margin-left: 0 !important;
            }

            .amruthahara-nav-link {
              font-size: 11px !important;
            }

            .amruthahara-search {
              max-width: 205px !important;
              min-width: 130px !important;
            }

            .amruthahara-right {
              gap: 14px !important;
            }

            .amruthahara-icons {
              gap: 14px !important;
            }

            .amruthahara-login,
            .amruthahara-register,
            .amruthahara-account {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }
          }

          /*
            ==========================================
            SMALL LAPTOP / TABLET LANDSCAPE
            951px TO 1150px
            ==========================================
          */

          @media (min-width: 951px) and (max-width: 1150px) {

            .amruthahara-navbar {
              padding-left: 2.5% !important;
              padding-right: 2.5% !important;
              gap: 15px !important;
            }

            .amruthahara-logo-image {
              width: 130px !important;
              height: 60px !important;
            }

            .amruthahara-nav-links {
              gap: 14px !important;
              margin-left: 0 !important;
            }

            .amruthahara-nav-link {
              font-size: 10px !important;
            }

            .amruthahara-search {
              max-width: 175px !important;
              min-width: 110px !important;
              height: 36px !important;
            }

            .amruthahara-search input {
              font-size: 10px !important;
            }

            .amruthahara-right {
              gap: 10px !important;
            }

            .amruthahara-auth {
              gap: 5px !important;
            }

            .amruthahara-login,
            .amruthahara-register,
            .amruthahara-account {
              height: 34px !important;
              padding-left: 8px !important;
              padding-right: 8px !important;
              font-size: 9px !important;
            }

            .amruthahara-icons {
              gap: 11px !important;
            }

            .amruthahara-icon {
              font-size: 14px !important;
            }
          }

          /*
            ==========================================
            TABLET - 768px TO 950px
            ==========================================
          */

          @media (min-width: 768px) and (max-width: 950px) {

            .amruthahara-navbar {
              min-height: 72px !important;
              padding: 0 25px !important;
              gap: 15px !important;
            }

            .amruthahara-logo-image {
              width: 135px !important;
              height: 60px !important;
            }

            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              max-width: 280px !important;
              min-width: 180px !important;
              margin-left: auto !important;
            }

            .amruthahara-auth {
              display: flex !important;
            }

            .amruthahara-login,
            .amruthahara-register,
            .amruthahara-account {
              height: 36px !important;
              padding-left: 11px !important;
              padding-right: 11px !important;
              font-size: 10px !important;
            }

            .amruthahara-right {
              gap: 12px !important;
            }

            .amruthahara-icons {
              gap: 14px !important;
            }

            .amruthahara-mobile-menu-button {
              display: flex !important;
            }
          }

          /*
            ==========================================
            MOBILE LARGE - 600px TO 767px
            ==========================================
          */

          @media (min-width: 600px) and (max-width: 767px) {

            .amruthahara-navbar {
              min-height: 70px !important;
              padding: 0 22px !important;
              gap: 12px !important;
            }

            .amruthahara-logo-image {
              width: 125px !important;
              height: 58px !important;
            }

            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              display: flex !important;
              max-width: 190px !important;
              min-width: 120px !important;
              height: 36px !important;
              margin-left: auto !important;
            }

            .amruthahara-search input {
              font-size: 10px !important;
            }

            .amruthahara-auth {
              display: none !important;
            }

            .amruthahara-right {
              gap: 10px !important;
            }

            .amruthahara-icons {
              gap: 13px !important;
            }

            .amruthahara-icon {
              font-size: 15px !important;
            }

            .amruthahara-mobile-menu-button {
              display: flex !important;
            }
          }

          /*
            ==========================================
            MOBILE - 480px TO 599px
            ==========================================
          */

          @media (min-width: 480px) and (max-width: 599px) {

            .amruthahara-navbar {
              min-height: 68px !important;
              padding: 0 18px !important;
              gap: 10px !important;
            }

            .amruthahara-logo-image {
              width: 120px !important;
              height: 56px !important;
            }

            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              display: none !important;
            }

            .amruthahara-auth {
              display: none !important;
            }

            .amruthahara-right {
              gap: 10px !important;
              margin-left: auto !important;
            }

            .amruthahara-icons {
              gap: 13px !important;
            }

            .amruthahara-icon {
              font-size: 15px !important;
            }

            .amruthahara-mobile-menu-button {
              display: flex !important;
              width: 36px !important;
              height: 36px !important;
            }
          }

          /*
            ==========================================
            SMALL PHONE - 360px TO 479px
            ==========================================
          */

          @media (min-width: 360px) and (max-width: 479px) {

            .amruthahara-navbar {
              min-height: 64px !important;
              padding: 0 15px !important;
              gap: 7px !important;
            }

            .amruthahara-logo-image {
              width: 110px !important;
              height: 53px !important;
            }

            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              display: none !important;
            }

            .amruthahara-auth {
              display: none !important;
            }

            .amruthahara-right {
              gap: 7px !important;
              margin-left: -45px;
            }

            .amruthahara-icons {
              gap: 10px !important;
            }

            .amruthahara-icon {
              font-size: 14px !important;
            }

            .amruthahara-mobile-menu-button {
              display: flex !important;
              width: 34px !important;
              height: 34px !important;
            }

            .amruthahara-mobile-menu-button svg {
              font-size: 14px !important;
            }

            .amruthahara-icon-wrapper {
              width: 22px !important;
              height: 22px !important;
            }

            .amruthahara-badge {
              min-width: 15px !important;
              height: 15px !important;
              font-size: 7px !important;
              top: -7px !important;
              right: -8px !important;
            }
          }

          /*
            ==========================================
            VERY SMALL PHONE - BELOW 360px
            ==========================================
          */

          @media (max-width: 359px) {

            .amruthahara-navbar {
              min-height: 60px !important;
              padding: 0 10px !important;
              gap: 5px !important;
            }

            .amruthahara-logo-image {
              width: 95px !important;
              height: 50px !important;
            }

            .amruthahara-nav-links {
              display: none !important;
            }

            .amruthahara-search {
              display: none !important;
            }

            .amruthahara-auth {
              display: none !important;
            }

            .amruthahara-right {
              gap: 5px !important;
              margin-left: auto !important;
            }

            .amruthahara-icons {
              gap: 7px !important;
            }

            .amruthahara-icon {
              font-size: 13px !important;
            }

            .amruthahara-mobile-menu-button {
              display: flex !important;
              width: 32px !important;
              height: 32px !important;
            }

            .amruthahara-icon-wrapper {
              width: 20px !important;
              height: 20px !important;
            }

            .amruthahara-badge {
              min-width: 14px !important;
              height: 14px !important;
              font-size: 6px !important;
              top: -6px !important;
              right: -7px !important;
            }
          }

          /*
            ==========================================
            MOBILE MENU
            ==========================================
          */

          .amruthahara-mobile-menu {
            position: fixed;
            top: 0;
            right: 0;
            width: min(320px, 85vw);
            height: 100vh;
            background: #FFFFFF;
            z-index: 2000;
            padding: 85px 25px 30px;
            box-shadow: -10px 0 40px rgba(20,55,32,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
          }

          .amruthahara-mobile-menu.open {
            display: block;
            transform: translateX(0);
          }

          .amruthahara-mobile-close {
            position: absolute;
            top: 22px;
            right: 20px;
            width: 38px;
            height: 38px;
            border: 1px solid rgba(23,92,56,0.12);
            border-radius: 8px;
            background: #F1F7F2;
            color: #245E3C;
            display: flex;
            align-items: center;
            
            justify-content: center;
            cursor: pointer;
          }

          .amruthahara-mobile-search {
            position: relative;
            width: 100%;
            height: 42px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(23,92,56,0.13);
            border-radius: 50px;
            padding: 0 14px;
            background: #F7FAF6;
            margin-bottom: 25px;
          }

          .amruthahara-mobile-search input {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            font-family: Inter, Arial, sans-serif;
            font-size: 12px;
            color: #263D2E;
          }

          .amruthahara-mobile-links {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .amruthahara-mobile-link {
            width: 100%;
            padding: 16px 5px;
            border-bottom: 1px solid rgba(23,92,56,0.08);
            text-decoration: none;
            color: #45554B;
            font-family: Inter, Arial, sans-serif;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .amruthahara-mobile-link:hover {
            color: #245E3C;
            padding-left: 10px;
          }

          .amruthahara-mobile-auth {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 25px;
          }

          .amruthahara-mobile-login,
          .amruthahara-mobile-register,
          .amruthahara-mobile-account {
            width: 100%;
            min-height: 42px;
            display: flex;
            align-items: center;
            
            justify-content: center;
            border-radius: 7px;
            text-decoration: none;
            font-family: Inter, Arial, sans-serif;
            font-size: 12px;
            font-weight: 700;
          }

          .amruthahara-mobile-login {
            border: 1px solid rgba(23,92,56,0.25);
            background: #FFFFFF;
            color: #24563B;
          }

          .amruthahara-mobile-register {
            border: 1px solid #245E3C;
            background: linear-gradient(135deg, #245E3C, #39764B);
            color: #FFFFFF;
          }

          .amruthahara-mobile-account {
            gap: 8px;
            background: #F1F7F2;
            border: 1px solid rgba(23,92,56,0.10);
            color: #245E3C;
          }

          .amruthahara-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 1500;
          }

          .amruthahara-overlay.open {
            display: block;
          }

          @media (max-width: 950px) {

            .amruthahara-mobile-menu-button {
              display: flex !important;
            }
          }

          @media (min-width: 951px) {

            .amruthahara-mobile-menu,
            .amruthahara-overlay {
              display: none !important;
            }
          }
        `}
      </style>

      <header
        className="amruthahara-navbar"
        style={styles.navbar}
      >

        {/* ================================
            LOGO
        ================================= */}

        <Link
          to="/"
          className="amruthahara-logo"
          style={styles.logoWrapper}
          onClick={closeMobileMenu}
        >
          <img
            src="/images/amruthahara-logo.png"
            alt="Amruthahara"
            className="amruthahara-logo-image"
          />
        </Link>

        {/* ================================
            DESKTOP NAVIGATION
        ================================= */}

        <nav
          className="amruthahara-nav-links"
          style={styles.navLinks}
        >

          <Link
            to="/"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "home"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "products"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("products")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Products
          </Link>

          <Link
            to="/our-story"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "story"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("story")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Our Story
          </Link>

          <Link
            to="/bowl"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "bowl"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("bowl")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Bowl
          </Link>

          <Link
            to="/subscription"
            className="amruthahara-nav-link"
            style={{
              ...styles.link,
              color:
                hoveredLink === "subscription"
                  ? "#245E3C"
                  : "#45554B",
            }}
            onMouseEnter={() => setHoveredLink("subscription")}
            onMouseLeave={() => setHoveredLink("")}
          >
            Subscription
          </Link>

        </nav>

        {/* ================================
            SEARCH
        ================================= */}

        <div
          className="amruthahara-search-wrap"
          style={styles.searchWrapper}
        >
          <form
            className="amruthahara-search"
            onSubmit={handleSearchSubmit}
            style={{
              ...styles.searchBox,
              borderColor: searchFocused
                ? "rgba(23,92,56,0.30)"
                : "rgba(23,92,56,0.13)",
              backgroundColor: searchFocused
                ? "#FFFFFF"
                : "#F7FAF6",
              boxShadow: searchFocused
                ? "0 5px 18px rgba(23,92,56,0.06)"
                : "none",
            }}
          >

            <FaSearch
              size={12}
              color="#52755C"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowSuggestions(true);
              }}
              style={styles.input}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />

          </form>

          {showSuggestions && searchQuery.trim() && (
            <div style={styles.suggestions}>
              {suggestions.length === 0 ? (
                <div style={{ ...styles.suggestionItem, cursor: "default" }}>
                  <div>
                    <div style={styles.suggestionName}>No matching products</div>
                    <div style={styles.suggestionMeta}>
                      Try honey, millet, organic or another keyword
                    </div>
                  </div>
                </div>
              ) : (
                suggestions.map((product) => (
                  <button
                    key={product._id}
                    type="button"
                    style={styles.suggestionItem}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery("");
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    <img
                      src={
                        toPublicApiUrl(
                          product.image ||
                            product.images?.[0] ||
                            "/placeholder.png"
                        )
                      }
                      alt={product.name}
                      style={styles.suggestionImage}
                    />
                    <div>
                      <div style={styles.suggestionName}>{product.name}</div>
                      <div style={styles.suggestionMeta}>
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        {product.category ? ` · ${product.category}` : ""}
                      </div>
                    </div>
                  </button>
                ))
              )}

              <button
                type="button"
                style={styles.suggestionAll}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => goToSearchResults()}
              >
                View all results for “{searchQuery.trim()}”
              </button>
            </div>
          )}
        </div>

        {/* ================================
            RIGHT SECTION
        ================================= */}

        <div
          className="amruthahara-right"
          style={styles.rightSection}
        >

          {/* AUTH */}

          {!isAuthenticated ? (

            <div
              className="amruthahara-auth"
              style={styles.authButtons}
            >

              <Link
                to="/login"
                className="amruthahara-login"
                style={styles.loginButton}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="amruthahara-register"
                style={styles.registerButton}
              >
                Create Account
              </Link>

            </div>

          ) : (

            <Link
              to="/dashboard"
              className="amruthahara-account"
              style={styles.accountButton}
             
            >
              <FaUser size={12} />
              
            </Link>

          )}

          {/* ================================
              WISHLIST + CART
          ================================= */}

          <div
            className="amruthahara-icons"
            style={styles.icons}
          >

            {/* WISHLIST */}

            <div
              className="amruthahara-icon-wrapper"
              style={styles.iconWrapper}
            >

              <Link
                to="/wishlist"
                className="amruthahara-icon"
                style={{
                  ...styles.iconLink,
                  color:
                    hoveredIcon === "wishlist"
                      ? "#B35D61"
                      : "#285D3E",
                }}
                title="Wishlist"
                onMouseEnter={() =>
                  setHoveredIcon("wishlist")
                }
                onMouseLeave={() =>
                  setHoveredIcon("")
                }
              >
                <FaHeart />
              </Link>

              {wishlistCount > 0 && (
                <span
                  className="amruthahara-badge"
                  style={styles.badge}
                >
                  {wishlistCount}
                </span>
              )}

            </div>

            {/* CART */}

            <div
              className="amruthahara-icon-wrapper"
              style={styles.iconWrapper}
            >

              <Link
                to="/cart"
                className="amruthahara-icon"
                style={{
                  ...styles.iconLink,
                  color:
                    hoveredIcon === "cart"
                      ? "#245E3C"
                      : "#285D3E",
                }}
                title="Cart"
                onMouseEnter={() =>
                  setHoveredIcon("cart")
                }
                onMouseLeave={() =>
                  setHoveredIcon("")
                }
              >
                <FaShoppingCart />
              </Link>

              {cartCount > 0 && (
                <span
                  className="amruthahara-badge"
                  style={styles.badge}
                >
                  {cartCount}
                </span>
              )}

            </div>

          </div>

          {/* ================================
              MOBILE MENU BUTTON
          ================================= */}

          <button
            type="button"
            className="amruthahara-mobile-menu-button"
            style={styles.mobileMenuButton}
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            aria-label={
              mobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
          >
            {mobileMenuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

      </header>

      <div
        className="amruthahara-navbar-spacer"
        aria-hidden="true"
      />

      {/* ================================
          MOBILE OVERLAY
      ================================= */}

      <div
        className={`amruthahara-overlay ${
          mobileMenuOpen ? "open" : ""
        }`}
        onClick={closeMobileMenu}
      />

      {/* ================================
          MOBILE MENU
      ================================= */}

      <aside
        className={`amruthahara-mobile-menu ${
          mobileMenuOpen ? "open" : ""
        }`}
      >

        <button
          type="button"
          className="amruthahara-mobile-close"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {/* MOBILE SEARCH */}

        <form
          className="amruthahara-mobile-search"
          onSubmit={handleSearchSubmit}
        >

          <FaSearch
            size={13}
            color="#52755C"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

        </form>

        {/* MOBILE NAVIGATION */}

        <nav className="amruthahara-mobile-links">

          <Link
            to="/"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Products
          </Link>

          <Link
            to="/our-story"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Our Story
          </Link>

          <Link
            to="/bowl"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Bowl
          </Link>

          <Link
            to="/subscription"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Subscription
          </Link>

          <Link
            to="/wishlist"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Wishlist
            {wishlistCount > 0
              ? ` (${wishlistCount})`
              : ""}
          </Link>

          <Link
            to="/cart"
            className="amruthahara-mobile-link"
            onClick={closeMobileMenu}
          >
            Cart
            {cartCount > 0
              ? ` (${cartCount})`
              : ""}
          </Link>

        </nav>

        {/* MOBILE AUTH */}

        {!isAuthenticated ? (

          <div className="amruthahara-mobile-auth">

            <Link
              to="/login"
              className="amruthahara-mobile-login"
              onClick={closeMobileMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="amruthahara-mobile-register"
              onClick={closeMobileMenu}
            >
              Create Account
            </Link>

          </div>

        ) : (

          <div className="amruthahara-mobile-auth">

            <Link
              to="/dashboard"
              className="amruthahara-mobile-account"
              onClick={closeMobileMenu}
            >
              <FaUser size={13} />
              My Account
            </Link>

          </div>

        )}

      </aside>
    </>
  );
}

export default Navbar;
