import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.loading}>
          <div style={styles.loadingIcon}>
            🌿
          </div>

          <div>
            Bringing fresh products...
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes productLeafFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-10px) rotate(5deg);
            }
          }

          @keyframes exploreArrow {
            0%, 100% {
              transform: translateX(0);
            }

            50% {
              transform: translateX(5px);
            }
          }

          @keyframes loadingPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }

            50% {
              transform: scale(1.15);
              opacity: 1;
            }
          }

          @media (max-width: 1200px) {
            .amruthahara-products-grid {
              grid-template-columns:
                repeat(4, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 950px) {
            .amruthahara-products-grid {
              grid-template-columns:
                repeat(3, minmax(0, 1fr)) !important;
            }

            .amruthahara-products-container {
              width: 94% !important;
            }

            .amruthahara-products-heading {
              font-size: 34px !important;
            }
          }

          @media (max-width: 700px) {
            .amruthahara-products-header {
              align-items: flex-start !important;
              flex-direction: column !important;
            }

            .amruthahara-products-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;

              column-gap: 9px !important;
              row-gap: 14px !important;
            }

            .amruthahara-products-container {
              width: 92% !important;
            }

            .amruthahara-products-heading {
              font-size: 30px !important;
            }

            .amruthahara-products-subtitle {
              font-size: 13px !important;
            }
          }

          @media (max-width: 470px) {
            .amruthahara-products-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;

              column-gap: 7px !important;
            }
          }
        `}
      </style>

      <section
        className="amruthahara-products-section"
        style={styles.section}
      >

        {/* ==================================
            ORGANIC BACKGROUND DECORATIONS
        ================================== */}

        <div style={styles.bgCircleOne}></div>

        <div style={styles.bgCircleTwo}></div>

        <div
          style={styles.bgLeafOne}
        >
          🌿
        </div>

        <div
          style={styles.bgLeafTwo}
        >
          🍃
        </div>


        {/* ==================================
            MAIN CONTAINER
        ================================== */}

        <div
          className="amruthahara-products-container"
          style={styles.container}
        >

          {/* ==================================
              HEADER
          ================================== */}

          <div
            className="amruthahara-products-header"
            style={styles.header}
          >

            <div style={styles.headerContent}>

              <div style={styles.eyebrow}>
                <span style={styles.eyebrowIcon}>
                  🌿
                </span>

                AMRUTHAHARA COLLECTION
              </div>


              <h2
                className="amruthahara-products-heading"
                style={styles.heading}
              >
                Fresh from the Farm
              </h2>


              <p
                className="amruthahara-products-subtitle"
                style={styles.subtitle}
              >
                Carefully selected organic and natural
                products for your everyday wellness.
              </p>

            </div>


            {/* PRODUCT COUNT */}

            <div style={styles.count}>

              <span style={styles.countLeaf}>
                ✦
              </span>

              {products.length} Products

            </div>

          </div>


          {/* ==================================
              EMPTY STATE
          ================================== */}

          {products.length === 0 ? (

            <div style={styles.empty}>

              <div style={styles.emptyIcon}>
                🌱
              </div>

              <h3 style={styles.emptyTitle}>
                No products available
              </h3>

              <p style={styles.emptyText}>
                Products added by the admin will
                appear here.
              </p>

            </div>

          ) : (

            /* ==================================
               PRODUCT GRID
            ================================== */

            <div
              className="amruthahara-products-grid"
              style={styles.grid}
            >

              {/* FIRST 5 PRODUCTS ONLY */}

              {products
                .slice(0, 5)
                .map((product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                ))}


              {/* ==================================
                  EXPLORE MORE PRODUCTS
              ================================== */}

              {products.length > 5 && (

                <div
                  style={styles.exploreCard}
                  onClick={() =>
                    navigate("/products")
                  }

                  onMouseEnter={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(-6px)";

                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(38,86,48,0.14)";

                    const arrow =
                      e.currentTarget.querySelector(
                        ".explore-arrow"
                      );

                    if (arrow) {
                      arrow.style.transform =
                        "translateX(6px)";
                    }

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(38,86,48,0.06)";

                    const arrow =
                      e.currentTarget.querySelector(
                        ".explore-arrow"
                      );

                    if (arrow) {
                      arrow.style.transform =
                        "translateX(0)";
                    }

                  }}
                >

                  {/* Decorative circle */}

                  <div
                    style={styles.exploreDecor}
                  ></div>


                  {/* ICON */}

                  <div style={styles.exploreIcon}>
                    →
                  </div>


                  {/* TITLE */}

                  <div style={styles.exploreTitle}>
                    Explore More
                  </div>


                  <div style={styles.exploreSubtitle}>
                    Discover our complete
                    collection
                  </div>


                  {/* ARROW */}

                  <div
                    className="explore-arrow"
                    style={styles.exploreArrow}
                  >
                    View Products
                    <span
                      style={{
                        fontSize: "17px",
                        marginLeft: "5px",
                      }}
                    >
                      →
                    </span>
                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </section>
    </>
  );
}


/* =====================================================
   STYLES
===================================================== */

const styles = {

  /* ==================================
     SECTION
  ================================== */

  section: {
    position: "relative",

    width: "100%",

    overflow: "hidden",

    padding: "48px 0 60px",

    boxSizing: "border-box",

    background:
      "radial-gradient(circle at 5% 15%, rgba(150,190,120,0.15), transparent 22%)," +
      "radial-gradient(circle at 96% 75%, rgba(170,205,145,0.13), transparent 25%)," +
      "linear-gradient(135deg, #FBFDF9 0%, #F5F9F2 48%, #FFFFFF 100%)",
  },


  /* ==================================
     CONTAINER
  ================================== */

  container: {
    position: "relative",

    zIndex: 2,

    width: "96%",

    maxWidth: "1540px",

    margin: "0 auto",

    boxSizing: "border-box",
  },


  /* ==================================
     HEADER
  ================================== */

  header: {
    width: "100%",

    display: "flex",

    alignItems: "flex-end",

    justifyContent: "space-between",

    gap: "20px",

    marginBottom: "28px",

    boxSizing: "border-box",
  },


  headerContent: {
    minWidth: 0,
  },


  eyebrow: {
    display: "flex",

    alignItems: "center",

    gap: "7px",

    marginBottom: "8px",

    color: "#668568",

    fontSize: "10px",

    fontWeight: "800",

    letterSpacing: "2.5px",

    lineHeight: "1",
  },


  eyebrowIcon: {
    fontSize: "12px",
  },


  heading: {
    margin: 0,

    color: "#173F2A",

    fontSize: "38px",

    lineHeight: "1.08",

    fontWeight: "850",

    letterSpacing: "-1.5px",
  },


  subtitle: {
    margin: "9px 0 0",

    maxWidth: "620px",

    color: "#707B73",

    fontSize: "14px",

    lineHeight: "1.55",
  },


  /* ==================================
     PRODUCT COUNT
  ================================== */

  count: {
    display: "inline-flex",

    alignItems: "center",

    gap: "7px",

    flexShrink: 0,

    padding: "10px 17px",

    borderRadius: "30px",

    background:
      "linear-gradient(135deg, #F3FAEF, #EAF5E6)",

    border:
      "1px solid #DCEBD6",

    color: "#39764B",

    fontSize: "12px",

    fontWeight: "800",

    boxShadow:
      "0 6px 20px rgba(60,110,65,0.06)",
  },


  countLeaf: {
    fontSize: "11px",
  },


  /* ==================================
     GRID
  ================================== */

  grid: {
    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",

    columnGap: "11px",

    rowGap: "18px",

    alignItems: "stretch",

    boxSizing: "border-box",
  },


  /* ==================================
     EXPLORE CARD
  ================================== */

  exploreCard: {
    position: "relative",

    width: "100%",

    minWidth: 0,

    minHeight: "100%",

    borderRadius: "18px",

    border:
      "1px solid #D8E8D5",

    background:
      "linear-gradient(145deg, #F8FCF5 0%, #EDF6E9 100%)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    textAlign: "center",

    padding: "25px 15px",

    boxSizing: "border-box",

    cursor: "pointer",

    overflow: "hidden",

    boxShadow:
      "0 8px 25px rgba(38,86,48,0.06)",

    transition:
      "transform 0.28s ease, box-shadow 0.28s ease",
  },


  exploreDecor: {
    position: "absolute",

    width: "130px",

    height: "130px",

    borderRadius: "50%",

    right: "-60px",

    top: "-55px",

    background:
      "rgba(132,174,103,0.12)",
  },


  exploreIcon: {
    position: "relative",

    width: "48px",

    height: "48px",

    borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    background:
      "linear-gradient(135deg, #175C38, #3F7D4F)",

    color: "#FFFFFF",

    fontSize: "22px",

    marginBottom: "14px",

    boxShadow:
      "0 9px 22px rgba(23,92,56,0.20)",
  },


  exploreTitle: {
    position: "relative",

    color: "#173F2A",

    fontSize: "17px",

    fontWeight: "850",

    marginBottom: "5px",
  },


  exploreSubtitle: {
    position: "relative",

    maxWidth: "150px",

    color: "#7B877E",

    fontSize: "11px",

    lineHeight: "1.5",

    marginBottom: "15px",
  },


  exploreArrow: {
    position: "relative",

    display: "flex",

    alignItems: "center",

    color: "#39764B",

    fontSize: "11px",

    fontWeight: "800",

    transition: "transform 0.25s ease",
  },


  /* ==================================
     LOADING
  ================================== */

  loading: {
    minHeight: "300px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    color: "#39764B",

    fontSize: "14px",

    fontWeight: "600",
  },


  loadingIcon: {
    fontSize: "30px",

    marginBottom: "12px",

    animation:
      "loadingPulse 1.8s ease-in-out infinite",
  },


  /* ==================================
     EMPTY
  ================================== */

  empty: {
    width: "100%",

    maxWidth: "550px",

    margin: "45px auto",

    padding: "50px 25px",

    textAlign: "center",

    background:
      "rgba(255,255,255,0.82)",

    border:
      "1px solid #E1EADF",

    borderRadius: "20px",

    boxShadow:
      "0 15px 40px rgba(40,80,45,0.06)",

    boxSizing: "border-box",
  },


  emptyIcon: {
    fontSize: "35px",

    marginBottom: "10px",
  },


  emptyTitle: {
    margin: "0 0 8px",

    color: "#173F2A",

    fontSize: "20px",

    fontWeight: "800",
  },


  emptyText: {
    margin: 0,

    color: "#78837B",

    fontSize: "13px",
  },


  /* ==================================
     BACKGROUND DECORATION
  ================================== */

  bgCircleOne: {
    position: "absolute",

    width: "300px",

    height: "300px",

    borderRadius: "50%",

    left: "-160px",

    top: "-100px",

    background:
      "rgba(150,190,120,0.09)",

    filter: "blur(2px)",
  },


  bgCircleTwo: {
    position: "absolute",

    width: "360px",

    height: "360px",

    borderRadius: "50%",

    right: "-190px",

    bottom: "-140px",

    background:
      "rgba(160,195,130,0.08)",

    filter: "blur(3px)",
  },


  bgLeafOne: {
    position: "absolute",

    left: "1.5%",

    top: "42%",

    fontSize: "25px",

    opacity: 0.10,

    animation:
      "productLeafFloat 6s ease-in-out infinite",

    zIndex: 1,
  },


  bgLeafTwo: {
    position: "absolute",

    right: "2%",

    top: "20%",

    fontSize: "30px",

    opacity: 0.09,

    animation:
      "productLeafFloat 7s ease-in-out infinite",

    zIndex: 1,
  },
};


export default ProductSection;