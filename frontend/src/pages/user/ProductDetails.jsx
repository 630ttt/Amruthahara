import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { useCart } from "../../context/CartContext";
import "@google/model-viewer";
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Safely import cart functions from context if available
  const cartContext = useCart ? useCart() : {};
  const { addToCart: contextAddToCart } = cartContext;

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [selectedSize, setSelectedSize] = useState("250g");
  const [subscribe, setSubscribe] = useState(false);
  const [openSection, setOpenSection] = useState("description");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`
      );

      const data = await response.json();

      if (data.success && data.product) {
        setProduct(data.product);
        return;
      }

      // Fallback: load all products if single endpoint fails
      const allResponse = await fetch(
        "http://localhost:5000/api/products"
      );

      const allData = await allResponse.json();

      if (allData.success) {
        const products = allData.products || [];

        setAllProducts(products);

        const foundProduct = products.find(
          (item) => String(item._id || item.id) === String(id)
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found.");
        }
      } else {
        setError(data.message || "Product not found.");
      }
    } catch (err) {
      console.error("PRODUCT DETAILS ERROR:", err);

      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (data.success) {
          const products = data.products || [];

          setAllProducts(products);

          const foundProduct = products.find(
            (item) => String(item._id || item.id) === String(id)
          );

          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError("Product not found.");
          }
        } else {
          setError("Unable to load product details.");
        }
      } catch (fallbackError) {
        console.error("PRODUCT FALLBACK ERROR:", fallbackError);
        setError("Unable to load product details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const images = useMemo(() => {
    if (!product) {
      return ["/placeholder-product.png"];
    }

    const gallery =
      product.images ||
      product.gallery ||
      product.productImages ||
      [];

    let result = Array.isArray(gallery)
      ? gallery
          .map((item) =>
            typeof item === "string"
              ? item
              : item?.url || item?.image || item?.src
          )
          .filter(Boolean)
      : [];

    const mainImage =
      product.image ||
      product.imageUrl ||
      product.productImage ||
      product.thumbnail;

    if (mainImage && !result.includes(mainImage)) {
      result.unshift(mainImage);
    }

    return result.length
      ? result
      : ["/placeholder-product.png"];
  }, [product]);

  // Calculate price based on base product price and selected size variant
  const basePrice = Number(product?.price || 0);

  const price = useMemo(() => {
    if (product?.sizePrices && product.sizePrices[selectedSize]) {
      return Number(product.sizePrices[selectedSize]);
    }
    // Default size multipliers if no explicit sizePrices exist in product model
    switch (selectedSize) {
      case "500g":
        return Math.round(basePrice * 1.8);
      case "1kg":
        return Math.round(basePrice * 3.4);
      case "250g":
      default:
        return basePrice;
    }
  }, [basePrice, selectedSize, product]);

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(
        (item) => String(item._id || item.id) !== String(id)
      )
      .slice(0, 4);
  }, [allProducts, id]);

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const addToCart = () => {
    if (!product) return;

    // Create item payload with unique ID key per selected size variant
    const cartItemId = `${product._id || product.id}_${selectedSize}`;
    
    const cartItem = {
      _id: cartItemId,
      productId: product._id || product.id,
      name: `${product.name} (${selectedSize})`,
      price: price,
      image: images[0] || product.image,
      size: selectedSize,
      quantity: quantity,
      category: product.category || "Farm Fresh"
    };

    // Sync with React Context if available
    if (typeof contextAddToCart === "function") {
      for (let i = 0; i < quantity; i++) {
        contextAddToCart(cartItem);
      }
    }

    // Sync directly to LocalStorage for complete persistence
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingIndex = existingCart.findIndex(
      (item) => String(item._id) === String(cartItemId)
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity =
        (Number(existingCart[existingIndex].quantity) || 0) + quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    // Notify navbar or cart badges across application
    window.dispatchEvent(new Event("cartUpdated"));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const buyNow = () => {
    addToCart();

    setTimeout(() => {
      navigate("/cart");
    }, 100);
  };

  const handleRelatedProductClick = (
    relatedProduct
  ) => {
    if (!relatedProduct?._id && !relatedProduct?.id) return;

    navigate(
      `/products/${relatedProduct._id || relatedProduct.id}`
    );
  };

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? "" : section
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="pd-loading">
          Loading product...
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <div className="pd-error">
          <div className="pd-error-icon">⚠️</div>

          <h2>
            {error || "Product not found"}
          </h2>

          <button
            type="button"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </>
    );
  }

  const productImage =
    images[selectedImage] || images[0];

  return (
    <>
      <Navbar />

      <style>{`
        * {
          box-sizing: border-box;
        }

        .pd-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          color: #151515;
          font-family:
            Roboto,
            Arial,
            sans-serif;
        }

        .pd-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 28px 70px;
        }

        .pd-breadcrumb {
          margin: 5px 0 18px;
          color: #777777;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .pd-breadcrumb span {
          color: #174b31;
        }

        .pd-top {
          display: grid;
          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(390px, 0.85fr);
          gap: 32px;
          align-items: start;
        }

        .pd-gallery {
          min-width: 0;
        }

        .pd-main-image {
          position: relative;
          width: 100%;
          height: 570px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f7f2;
          border-radius: 12px;
        }

        .pd-main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pd-zoom {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          font-size: 17px;
        }

        .pd-view360 {
          position: absolute;
          left: 15px;
          bottom: 15px;
          padding: 8px 15px;
          border: 0;
          border-radius: 18px;
          background: #ffffff;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .pd-thumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        .pd-thumb {
          width: 74px;
          height: 68px;
          padding: 3px;
          border: 1px solid #dddddd;
          border-radius: 7px;
          background: #ffffff;
          cursor: pointer;
        }

        .pd-thumb.active {
          border: 2px solid #174b31;
        }

        .pd-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .pd-video {
          width: 74px;
          height: 68px;
          border: 1px solid #dddddd;
          border-radius: 7px;
          background: #ffffff;
          color: #174b31;
          cursor: pointer;
          font-size: 22px;
        }

        .pd-info {
          padding-top: 2px;
        }

        .pd-rating {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          color: #555555;
          font-size: 11px;
        }

        .pd-stars {
          color: #f5b400;
          font-size: 17px;
          letter-spacing: -2px;
        }

        .pd-title {
          margin: 0 0 14px;
          color: #171717;
          font-family: Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 1.05;
        }

        .pd-price {
          margin-bottom: 8px;
          color: #f2b300;
          font-size: 23px;
          font-weight: 700;
        }

        .pd-tax {
          margin-bottom: 17px;
          color: #777777;
          font-size: 10px;
        }

        .pd-label {
          margin-bottom: 8px;
          color: #555555;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .pd-sizes {
          display: flex;
          gap: 8px;
          margin-bottom: 17px;
        }

        .pd-size {
          min-width: 55px;
          padding: 9px 13px;
          border: 1px solid #333333;
          border-radius: 20px;
          background: #ffffff;
          color: #222222;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pd-size.selected {
          border-color: #174b31;
          background: #d9efd9;
          font-weight: 700;
        }

        .pd-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .pd-qty {
          height: 38px;
          display: flex;
          align-items: center;
          border: 1px solid #dddddd;
          border-radius: 20px;
          background: #ffffff;
        }

        .pd-qty button {
          width: 34px;
          height: 36px;
          border: 0;
          background: #ffffff;
          font-size: 16px;
          cursor: pointer;
        }

        .pd-qty span {
          width: 30px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
        }

        .pd-cart {
          flex: 1;
          height: 38px;
          border: 0;
          border-radius: 20px;
          background: #063d28;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .pd-cart:hover {
          background: #0a5237;
        }

        .pd-buy {
          width: 100%;
          height: 34px;
          margin-bottom: 18px;
          border: 1px solid #f16211;
          border-radius: 8px;
          background: #ffffff;
          color: #f16211;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pd-buy:hover {
          background: #f16211;
          color: #ffffff;
        }

        .pd-subscribe {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 15px;
          padding: 12px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          background: #f9f8f4;
        }

        .pd-subscribe input {
          margin-top: 3px;
        }

        .pd-subscribe strong {
          font-size: 13px;
        }

        .pd-subscribe p {
          margin: 3px 0 0;
          color: #666666;
          font-size: 9px;
        }

        .pd-accordion {
          border-top: 1px solid #dddddd;
        }

        .pd-acc-head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 3px;
          border: 0;
          border-bottom: 1px solid #dddddd;
          background: #ffffff;
          color: #202020;
          font-family: Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .pd-acc-body {
          padding: 12px 3px 16px;
          color: #555555;
          font-size: 12px;
          line-height: 1.65;
        }

        .pd-source {
          margin-top: 48px;
          padding: 70px 50px 45px;
          border: 1px solid #eeeeee;
          border-radius: 15px;
          background: #ffffff;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        .pd-source-title {
          margin: 0 0 8px;
          color: #173d2a;
          text-align: center;
          font-family: Georgia, serif;
          font-size: 32px;
        }

        .pd-source-sub {
          max-width: 570px;
          margin: 0 auto 35px;
          color: #666666;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
        }

        .pd-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          margin-bottom: 32px;
        }

        .pd-timeline::before {
          content: "";
          position: absolute;
          top: 22px;
          right: 10%;
          left: 10%;
          height: 1px;
          background: #e4e4e4;
        }

        .pd-step {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .pd-step-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 9px;
          border-radius: 50%;
          background: #eef4ea;
          font-size: 19px;
        }

        .pd-step:nth-child(even) .pd-step-icon {
          background: #f1eee8;
        }

        .pd-step-title {
          margin-bottom: 5px;
          color: #444444;
          font-size: 9px;
          font-weight: 800;
        }

        .pd-step-text {
          max-width: 120px;
          margin: auto;
          color: #777777;
          font-size: 8px;
          line-height: 1.4;
        }

        .pd-map {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 10px;
          background:
            linear-gradient(
              135deg,
              #d9f0e5,
              #d7eee2,
              #e8f2db
            );
        }

        .pd-map::before {
          content: "";
          position: absolute;
          top: -10%;
          left: 20%;
          width: 60%;
          height: 120%;
          border-right: 3px solid rgba(72, 133, 92, 0.2);
          border-left: 4px solid rgba(72, 133, 92, 0.3);
          transform: rotate(15deg);
        }

        .pd-map-label {
          position: absolute;
          right: 18px;
          bottom: 15px;
          padding: 7px 12px;
          border-radius: 15px;
          background: #ffffff;
          font-size: 9px;
          font-weight: 600;
        }

        .pd-reviews {
          margin-top: 52px;
        }

        .pd-review-heading {
          display: flex;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #dddddd;
        }

        .pd-section-title {
          margin: 0 0 7px;
          color: #173d2a;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        .pd-review-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #555555;
          font-size: 11px;
        }

        .pd-review-summary .pd-stars {
          font-size: 15px;
        }

        .pd-review-btn {
          margin-left: auto;
          padding: 7px 16px;
          border: 1px solid #063d28;
          border-radius: 16px;
          background: #ffffff;
          color: #063d28;
          font-size: 10px;
          cursor: pointer;
        }

        .pd-review-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 22px;
        }

        .pd-review {
          min-height: 150px;
          display: flex;
          gap: 13px;
          padding: 17px;
          border: 1px solid #dddddd;
          border-radius: 8px;
          background: #ffffff;
        }

        .pd-avatar {
          width: 32px;
          height: 32px;
          flex: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #d8edd9;
          font-size: 11px;
        }

        .pd-review:nth-child(2) .pd-avatar {
          background: #eeeae4;
        }

        .pd-review-name {
          font-size: 10px;
          font-weight: 700;
        }

        .pd-verified {
          margin-top: 2px;
          color: #777777;
          font-size: 8px;
        }

        .pd-review-stars {
          margin-left: auto;
          color: #f5b400;
          font-size: 12px;
        }

        .pd-review-text {
          margin-top: 9px;
          color: #555555;
          font-size: 10px;
          line-height: 1.6;
        }

        .pd-review-img {
          width: 62px;
          height: 52px;
          margin-top: 8px;
          border-radius: 4px;
          object-fit: cover;
        }

        .pd-load-more {
          margin-top: 25px;
          color: #f16211;
          text-align: center;
          text-decoration: underline;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .pd-related {
          margin-top: 65px;
        }

        .pd-related-title {
          margin-bottom: 20px;
          color: #173d2a;
          text-align: center;
          font-family: Georgia, serif;
          font-size: 23px;
        }

        .pd-related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .pd-related-card {
          padding: 8px;
          border: 1px solid #dddddd;
          border-radius: 8px;
          background: #ffffff;
          cursor: pointer;
          transition: 0.2s;
        }

        .pd-related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.1);
        }

        .pd-related-img {
          height: 185px;
          overflow: hidden;
          border-radius: 5px;
          background: #f5f2eb;
        }

        .pd-related-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pd-related-name {
          margin: 9px 2px 5px;
          font-size: 10px;
          font-weight: 600;
        }

        .pd-related-price {
          margin: 0 2px 5px;
          color: #f0a900;
          font-size: 11px;
          font-weight: 700;
        }

        .pd-loading,
        .pd-error {
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #333333;
          text-align: center;
        }

        .pd-error-icon {
          margin-bottom: 10px;
          font-size: 40px;
        }

        .pd-error button {
          margin-top: 15px;
          padding: 11px 22px;
          border: 0;
          border-radius: 8px;
          background: #063d28;
          color: #ffffff;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .pd-wrap {
            padding: 18px 18px 50px;
          }

          .pd-top {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .pd-main-image {
            height: min(620px, 80vw);
          }

          .pd-source {
            padding: 45px 20px 30px;
          }

          .pd-timeline {
            grid-template-columns: repeat(5, 1fr);
            overflow-x: auto;
          }

          .pd-step {
            min-width: 120px;
          }

          .pd-timeline::before {
            display: none;
          }

          .pd-review-grid {
            grid-template-columns: 1fr;
          }

          .pd-related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .pd-wrap {
            padding: 14px 12px 40px;
          }

          .pd-breadcrumb {
            font-size: 9px;
          }

          .pd-main-image {
            height: 100vw;
            max-height: 480px;
          }

          .pd-title {
            font-size: 30px;
          }

          .pd-price {
            font-size: 22px;
          }

          .pd-source-title {
            font-size: 25px;
          }

          .pd-source-sub {
            font-size: 11px;
          }

          .pd-timeline {
            display: flex;
            gap: 18px;
            overflow-x: auto;
            padding-bottom: 5px;
          }

          .pd-step {
            min-width: 105px;
          }

          .pd-map {
            height: 180px;
          }

          .pd-review-heading {
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 10px;
          }

          .pd-review-btn {
            margin-left: 0;
          }

          .pd-related-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .pd-related-img {
            height: 145px;
          }

          .pd-related-name {
            font-size: 9px;
          }

          .pd-related-price {
            font-size: 10px;
          }

          .pd-actions {
            gap: 5px;
          }

          .pd-qty button {
            width: 29px;
          }

          .pd-qty span {
            width: 25px;
          }

          .pd-cart {
            font-size: 10px;
          }
        }
      `}</style>

      <div className="pd-page">
        <div className="pd-wrap">
          <div className="pd-breadcrumb">
            HOME / SHOP /{" "}
            <span>
              {product.name || "PRODUCT"}
            </span>
          </div>

          <section className="pd-top">
            <div className="pd-gallery">
              <div className="pd-main-image">
  {show3D && product?.model3d ? (
  <model-viewer
    src={product.model3d}
    alt={product.name || "3D Product"}
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#f7f7f2",
    }}
  />
) : showVideo && product?.video ? (
  <video
    src={product.video}
    controls
    autoPlay
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      backgroundColor: "#000",
    }}
  />
) : (
  <img
    src={productImage}
    alt={product.name || "Product"}
    onError={(event) => {
      event.currentTarget.src =
        "/placeholder-product.png";
    }}
  />
)}

                <button
                  type="button"
                  className="pd-zoom"
                  onClick={() =>
                    window.open(
                      productImage,
                      "_blank"
                    )
                  }
                >
                  ⌕
                </button>

                <button
  type="button"
  className="pd-view360"
  onClick={() => {
    if (product?.model3d) {
      setShow3D(true);
      setShowVideo(false);
    } else {
      alert("No 3D model available");
    }
  }}
>
  ◉ View 360
</button>
              </div>

              <div className="pd-thumbs">
                {images
                  .slice(0, 4)
                  .map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      className={`pd-thumb ${
                        selectedImage === index
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
  setSelectedImage(index);
  setShowVideo(false);
  setShow3D(false);
}}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                      />
                    </button>
                  ))}

                <button
                  type="button"
                  className="pd-video"
                  onClick={() => {
                    if (product?.video) {
                      setShowVideo(true);
                    } else {
                      alert("No video available");
                    }
                   }}
                 >
                   ▷
                 </button>
              </div>
            </div>

            <div className="pd-info">
              <div className="pd-rating">
                <span className="pd-stars">
                  ★★★★★
                </span>

                <span>
                  {product.rating || "4.8"} (
                  {product.reviewCount || "124"}{" "}
                  Reviews)
                </span>
              </div>

              <h1 className="pd-title">
                {product.name}
              </h1>

              <div className="pd-price">
                ₹{price.toLocaleString("en-IN")}
              </div>

              <div className="pd-tax">
                INCL. OF ALL TAXES
              </div>

              <div className="pd-label">
                SIZE
              </div>

              <div className="pd-sizes">
                {["250g", "500g", "1kg"].map(
                  (size) => (
                    <button
                      type="button"
                      key={size}
                      className={`pd-size ${
                        selectedSize === size
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  )
                )}
              </div>

              <div className="pd-actions">
                <div className="pd-qty">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="pd-cart"
                  onClick={addToCart}
                >
                  {added
                    ? "✓ Added to Cart"
                    : "Add to Cart"}
                </button>
              </div>

              <button
                type="button"
                className="pd-buy"
                onClick={buyNow}
              >
                Buy Now
              </button>

              <label className="pd-subscribe">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(event) =>
                    setSubscribe(
                      event.target.checked
                    )
                  }
                />

                <span>
                  <strong>
                    Subscribe & Save 15%
                  </strong>

                  <p>
                    Deliver every 30 days.
                    Cancel anytime.{" "}
                    <u>Details</u>
                  </p>
                </span>
              </label>

              {[
                [
                  "description",
                  "Description",
                  product.description ||
                    "Sourced directly from trusted producers, our product is pure, authentic, and carefully selected. Every batch is handled using sustainable methods while maintaining its natural quality, freshness, and nutritional value.",
                ],
                [
                  "ingredients",
                  "Ingredients",
                  product.ingredients ||
                    "100% natural ingredients. Please check the product packaging for complete ingredient information.",
                ],
                [
                  "benefits",
                  "Benefits",
                  product.benefits ||
                    "Naturally sourced, carefully processed, quality tested and suitable for everyday use.",
                ],
              ].map(
                ([key, title, text]) => (
                  <div
                    className="pd-accordion"
                    key={key}
                  >
                    <button
                      type="button"
                      className="pd-acc-head"
                      onClick={() =>
                        toggleSection(key)
                      }
                    >
                      <span>{title}</span>

                      <span>
                        {openSection === key
                          ? "−"
                          : "+"}
                      </span>
                    </button>

                    {openSection === key && (
                      <div className="pd-acc-body">
                        {text}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </section>

          <section className="pd-source">
            <h2 className="pd-source-title">
              Know Where Your Food Comes From
            </h2>

            <p className="pd-source-sub">
              Radical transparency from the
              forest canopy to your kitchen
              table. Every batch is traceable.
            </p>

            <div className="pd-timeline">
              {[
                [
                  "♟",
                  "THE SOURCE",
                  "Western Ghats Forests, Karnataka",
                ],
                [
                  "♙",
                  "THE HARVESTER",
                  "Soliga Tribal Cooperative",
                ],
                [
                  "❉",
                  "HARVEST",
                  "Cruelty-free smoke extraction, Spring 2024",
                ],
                [
                  "♧",
                  "QUALITY CHECK",
                  "Lab tested for NMR purity & pollen count",
                ],
                [
                  "▣",
                  "PACKAGING",
                  "Packed in zero-plastic glass facility",
                ],
              ].map(
                ([icon, title, text]) => (
                  <div
                    className="pd-step"
                    key={title}
                  >
                    <div className="pd-step-icon">
                      {icon}
                    </div>

                    <div className="pd-step-title">
                      {title}
                    </div>

                    <div className="pd-step-text">
                      {text}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="pd-map">
              <span className="pd-map-label">
                📍 Harvest Region
              </span>
            </div>
          </section>

          <section className="pd-reviews">
            <div className="pd-review-heading">
              <div>
                <h2 className="pd-section-title">
                  Community Reviews
                </h2>

                <div className="pd-review-summary">
                  <span className="pd-stars">
                    ★★★★★
                  </span>

                  <strong>
                    4.8 average
                  </strong>

                  <span>
                    based on{" "}
                    {product.reviewCount || 124}{" "}
                    reviews
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="pd-review-btn"
                onClick={() =>
                  alert(
                    "Review form coming soon"
                  )
                }
              >
                Write a Review
              </button>
            </div>

            <div className="pd-review-grid">
              <article className="pd-review">
                <div className="pd-avatar">
                  A
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div className="pd-review-name">
                        Ananya S.
                      </div>

                      <div className="pd-verified">
                        Verified Buyer • 2 weeks ago
                      </div>
                    </div>

                    <span className="pd-review-stars">
                      ★★★★★
                    </span>
                  </div>

                  <p className="pd-review-text">
                    Absolutely the best honey
                    I’ve tasted. You can feel
                    the rawness and the earthy
                    notes are incredible. Highly
                    recommend it with warm water
                    every morning.
                  </p>

                  {images[1] && (
                    <img
                      className="pd-review-img"
                      src={images[1]}
                      alt="Review"
                    />
                  )}
                </div>
              </article>

              <article className="pd-review">
                <div className="pd-avatar">
                  R
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div className="pd-review-name">
                        Rahul M.
                      </div>

                      <div className="pd-verified">
                        Verified Buyer • 1 month ago
                      </div>
                    </div>

                    <span className="pd-review-stars">
                      ★★★★☆
                    </span>
                  </div>

                  <p className="pd-review-text">
                    Great quality and thick
                    consistency. The packaging
                    is very premium. Only giving
                    4 stars because delivery took
                    a bit longer than expected.
                  </p>
                </div>
              </article>
            </div>

            <div className="pd-load-more">
              Load More Reviews
            </div>
          </section>

          <section className="pd-related">
            <h2 className="pd-related-title">
              Frequently Bought Together
            </h2>

            <div className="pd-related-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((item) => {
                  const image =
                    item.image ||
                    item.imageUrl ||
                    item.productImage ||
                    item.thumbnail;

                  return (
                    <article
                      className="pd-related-card"
                      key={item._id || item.id}
                      onClick={() =>
                        handleRelatedProductClick(
                          item
                        )
                      }
                    >
                      <div className="pd-related-img">
                        {image ? (
                          <img
                            src={image}
                            alt={item.name}
                          />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              color: "#777777",
                            }}
                          >
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="pd-related-name">
                        {item.name}
                      </div>

                      <div className="pd-related-price">
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <>
                  <article className="pd-related-card">
                    <div className="pd-related-img">
                      <img
                        src={images[0]}
                        alt={product.name}
                      />
                    </div>

                    <div className="pd-related-name">
                      {product.name}
                    </div>

                    <div className="pd-related-price">
                      ₹
                      {price.toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </article>

                  <article className="pd-related-card">
                    <div className="pd-related-img">
                      <img
                        src={images[0]}
                        alt={product.name}
                      />
                    </div>

                    <div className="pd-related-name">
                      Organic Natural Product
                    </div>

                    <div className="pd-related-price">
                      ₹450
                    </div>
                  </article>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;