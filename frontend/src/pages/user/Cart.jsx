import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaShieldAlt,
  FaLeaf,
  FaTruck,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  /*
   * KEEPING YOUR EXISTING CART MECHANISM
   */
  const getProductId = (item) => {
    if (!item) return "";

    return String(item._id || item.id || "");
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  /*
   * EMPTY CART
   */
  if (cartItems.length === 0) {
    return (
      <>
        <style>{cartStyles}</style>

        <main className="premium-cart-page premium-cart-empty-page">
          <div className="premium-cart-empty">

            <div className="premium-empty-orbit">
              <div className="premium-empty-icon">
                <FaShoppingBag />
              </div>
            </div>

            <span className="premium-empty-eyebrow">
              YOUR AMRUTHAHARA BAG
            </span>

            <h1>
              Your cart is
              <em> waiting for you.</em>
            </h1>

            <p>
              Discover thoughtfully sourced organic products,
              natural goodness and farm-fresh essentials curated
              especially for your home.
            </p>

            <Link
              to="/products"
              className="premium-primary-button"
            >
              <FaLeaf />
              Explore Our Collection
              <FaChevronRight />
            </Link>

            <div className="premium-empty-trust">
              <span>
                <FaShieldAlt />
                Secure Shopping
              </span>

              <span>
                <FaLeaf />
                Natural Products
              </span>

              <span>
                <FaTruck />
                Fresh Delivery
              </span>
            </div>

          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{cartStyles}</style>

      <main className="premium-cart-page">

        <div className="premium-cart-container">

          {/* =========================================
              HEADER
          ========================================= */}

          <header className="premium-cart-header">

            <Link
              to="/products"
              className="premium-back-link"
            >
              <span className="premium-back-circle">
                <FaArrowLeft />
              </span>

              Continue Shopping
            </Link>

            <div className="premium-cart-heading">

              <div>
                <span className="premium-cart-eyebrow">
                  AMRUTHAHARA COLLECTION
                </span>

                <h1>
                  Your <em>Cart</em>
                </h1>

                <p>
                  A little goodness, carefully selected for your home.
                </p>
              </div>

              <div className="premium-cart-count">
                <span>{totalItems}</span>
                <small>
                  {totalItems === 1 ? "ITEM" : "ITEMS"}
                </small>
              </div>

            </div>

          </header>


          {/* =========================================
              MAIN LAYOUT
          ========================================= */}

          <div className="premium-cart-layout">

            {/* =====================================
                CART ITEMS
            ===================================== */}

            <section className="premium-items-section">

              <div className="premium-items-top">

                <div>
                  <span className="premium-section-label">
                    YOUR SELECTION
                  </span>

                  <h2>
                    Shopping Bag
                  </h2>
                </div>

                <span className="premium-item-number">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "product" : "products"}
                </span>

              </div>


              <div className="premium-items-list">

                {cartItems.map((item) => {

                  const productId = getProductId(item);

                  const itemTotal =
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

                  return (
                    <article
                      key={productId}
                      className="premium-cart-item"
                    >

                      {/* IMAGE */}

                      <div className="premium-product-image">

                        <img
                          src={
                            item.image ||
                            "/placeholder-product.png"
                          }
                          alt={item.name}
                          onError={(event) => {
                            event.currentTarget.src =
                              "/placeholder-product.png";
                          }}
                        />

                        <span className="premium-image-badge">
                          <FaLeaf />
                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="premium-product-details">

                        <span className="premium-product-category">
                          {item.category || "FARM FRESH"}
                        </span>

                        <h3>
                          {item.name}
                        </h3>

                        {item.size && (
                          <span className="premium-product-size">
                            Size: <strong>{item.size}</strong>
                          </span>
                        )}

                        <span className="premium-product-unit">
                          ₹
                          {Number(item.price || 0).toLocaleString(
                            "en-IN"
                          )}{" "}
                          per item
                        </span>

                      </div>


                      {/* QUANTITY */}

                      <div className="premium-quantity-wrapper">

                        <span className="premium-small-label">
                          QUANTITY
                        </span>

                        <div className="premium-quantity">

                          <button
                            type="button"
                            onClick={() => {
                              if (productId) {
                                decreaseQuantity(productId);
                              }
                            }}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (productId) {
                                increaseQuantity(productId);
                              }
                            }}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>

                        </div>

                      </div>


                      {/* PRICE */}

                      <div className="premium-item-price">

                        <span className="premium-small-label">
                          TOTAL
                        </span>

                        <strong>
                          ₹
                          {itemTotal.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        className="premium-remove"
                        onClick={() => {
                          if (productId) {
                            removeFromCart(productId);
                          }
                        }}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>

                    </article>
                  );
                })}

              </div>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/products"
                className="premium-continue-link"
              >
                <span>
                  <FaArrowLeft />
                </span>

                Continue exploring products

                <FaChevronRight />
              </Link>


              {/* QUALITY MESSAGE */}

              <div className="premium-cart-note">

                <div className="premium-note-icon">
                  <FaLeaf />
                </div>

                <div>
                  <strong>
                    Good choices start with good ingredients.
                  </strong>

                  <p>
                    Every product in your bag is selected with
                    quality, authenticity and natural goodness in mind.
                  </p>
                </div>

              </div>

            </section>


            {/* =====================================
                ORDER SUMMARY
            ===================================== */}

            <aside className="premium-summary">

              <div className="premium-summary-card">

                <span className="premium-summary-eyebrow">
                  YOUR ORDER
                </span>

                <h2>
                  Order Summary
                </h2>


                {/* SUMMARY ROWS */}

                <div className="premium-summary-rows">

                  <div>
                    <span>
                      Products
                    </span>

                    <strong>
                      {totalItems}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      ₹
                      {Number(cartTotal || 0).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Delivery
                    </span>

                    <strong className="premium-free">
                      FREE
                    </strong>
                  </div>

                </div>


                {/* PROMO */}

                <div className="premium-promo">

                  <div className="premium-promo-icon">
                    ✦
                  </div>

                  <div>
                    <strong>
                      Free delivery included
                    </strong>

                    <span>
                      Your order qualifies for complimentary
                      doorstep delivery.
                    </span>
                  </div>

                </div>


                <div className="premium-summary-divider" />


                {/* TOTAL */}

                <div className="premium-grand-total">

                  <div>
                    <span>
                      Total Amount
                    </span>

                    <small>
                      Inclusive of applicable taxes
                    </small>
                  </div>

                  <strong>
                    ₹
                    {Number(cartTotal || 0).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                {/* CHECKOUT */}

                <Link
                  to="/checkout"
                  className="premium-checkout-button"
                >
                  <span>
                    Proceed to Checkout
                  </span>

                  <span className="premium-checkout-arrow">
                    <FaChevronRight />
                  </span>
                </Link>


                {/* SECURITY */}

                <div className="premium-secure-checkout">

                  <FaLock />

                  <span>
                    Secure & encrypted checkout
                  </span>

                </div>

              </div>


              {/* BENEFITS */}

              <div className="premium-benefits">

                <div className="premium-benefit">

                  <div>
                    <FaShieldAlt />
                  </div>

                  <span>
                    <strong>
                      Trusted Quality
                    </strong>

                    <small>
                      Carefully selected products
                    </small>
                  </span>

                </div>


                <div className="premium-benefit">

                  <div>
                    <FaLeaf />
                  </div>

                  <span>
                    <strong>
                      Naturally Selected
                    </strong>

                    <small>
                      Goodness from trusted sources
                    </small>
                  </span>

                </div>


                <div className="premium-benefit">

                  <div>
                    <FaTruck />
                  </div>

                  <span>
                    <strong>
                      Doorstep Delivery
                    </strong>

                    <small>
                      Packed carefully for your home
                    </small>
                  </span>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>
    </>
  );
}


/* =====================================================
   PREMIUM CART STYLES
===================================================== */

const cartStyles = `

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');


* {
  box-sizing: border-box;
}


.premium-cart-page {
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(
      circle at 15% 0%,
      rgba(214, 231, 211, 0.35),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      #f7f8f3 0%,
      #ffffff 38%,
      #f8faf6 100%
    );

  color: #173f2a;

  font-family:
    "DM Sans",
    Arial,
    sans-serif;

  padding:
    45px 0 90px;
}


/* =====================================================
   CONTAINER
===================================================== */

.premium-cart-container {
  width: 92%;
  max-width: 1320px;
  margin: 0 auto;
}


/* =====================================================
   HEADER
===================================================== */

.premium-cart-header {
  margin-bottom: 42px;
}


.premium-back-link {
  display: inline-flex;
  align-items: center;
  gap: 11px;

  color: #52705d;

  text-decoration: none;

  font-size: 12px;
  font-weight: 700;

  margin-bottom: 25px;

  transition: 0.25s ease;
}


.premium-back-link:hover {
  color: #173f2a;
  transform: translateX(-3px);
}


.premium-back-circle {
  width: 31px;
  height: 31px;

  border-radius: 50%;

  border: 1px solid #dce5db;

  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;

  box-shadow:
    0 5px 18px rgba(35, 69, 44, 0.06);
}


.premium-cart-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;
}


.premium-cart-eyebrow,
.premium-summary-eyebrow,
.premium-section-label {
  display: block;

  color: #78907e;

  font-size: 9px;
  font-weight: 800;

  letter-spacing: 2.2px;
  text-transform: uppercase;
}


.premium-cart-heading h1 {
  margin: 8px 0 7px;

  color: #173f2a;

  font-size:
    clamp(40px, 5vw, 62px);

  line-height: 0.95;

  letter-spacing: -2px;

  font-weight: 700;
}


.premium-cart-heading h1 em {
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-weight: 500;

  color: #4d7559;
}


.premium-cart-heading p {
  margin: 0;

  color: #7d887f;

  font-size: 13px;
}


.premium-cart-count {
  min-width: 75px;

  height: 75px;

  border-radius: 50%;

  background:
    linear-gradient(
      145deg,
      #edf5e9,
      #dcebd9
    );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #d5e2d2;

  box-shadow:
    0 10px 30px rgba(42, 83, 51, 0.08);
}


.premium-cart-count span {
  color: #173f2a;

  font-size: 23px;
  line-height: 1;

  font-weight: 800;
}


.premium-cart-count small {
  margin-top: 4px;

  color: #6e8473;

  font-size: 7px;
  font-weight: 800;

  letter-spacing: 1.5px;
}


/* =====================================================
   MAIN GRID
===================================================== */

.premium-cart-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    375px;

  gap: 32px;

  align-items: start;
}


/* =====================================================
   ITEMS SECTION
===================================================== */

.premium-items-section {
  min-width: 0;
}


.premium-items-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding:
    0 3px 17px;

  border-bottom:
    1px solid #e2e9df;
}


.premium-items-top h2 {
  margin: 7px 0 0;

  color: #213c2a;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 25px;

  font-weight: 600;
}


.premium-item-number {
  color: #89948b;

  font-size: 11px;
  font-weight: 600;
}


/* =====================================================
   ITEMS LIST
===================================================== */

.premium-items-list {
  background: rgba(255,255,255,0.75);

  border:
    1px solid #e5ebe2;

  border-radius: 17px;

  overflow: hidden;

  margin-top: 14px;

  box-shadow:
    0 12px 45px rgba(31, 69, 40, 0.045);
}


.premium-cart-item {
  min-height: 145px;

  display: grid;

  grid-template-columns:
    115px
    minmax(150px, 1fr)
    auto
    auto
    35px;

  gap: 22px;

  align-items: center;

  padding:
    20px 22px;

  border-bottom:
    1px solid #edf1eb;

  transition:
    background 0.25s ease;
}


.premium-cart-item:last-child {
  border-bottom: none;
}


.premium-cart-item:hover {
  background: #fbfcfa;
}


/* =====================================================
   PRODUCT IMAGE
===================================================== */

.premium-product-image {
  position: relative;

  width: 115px;
  height: 115px;

  overflow: hidden;

  border-radius: 13px;

  background: #f2f5ef;

  border: 1px solid #e2e9df;
}


.premium-product-image img {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition:
    transform 0.4s ease;
}


.premium-cart-item:hover
.premium-product-image img {
  transform: scale(1.045);
}


.premium-image-badge {
  position: absolute;

  left: 8px;
  bottom: 8px;

  width: 24px;
  height: 24px;

  border-radius: 50%;

  background: rgba(255,255,255,0.94);

  color: #3f7950;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 9px;

  box-shadow:
    0 4px 12px rgba(0,0,0,0.08);
}


/* =====================================================
   PRODUCT DETAILS
===================================================== */

.premium-product-details {
  min-width: 0;
}


.premium-product-category {
  display: block;

  color: #78917d;

  font-size: 8px;
  font-weight: 800;

  letter-spacing: 1.7px;

  text-transform: uppercase;

  margin-bottom: 8px;
}


.premium-product-details h3 {
  margin: 0 0 8px;

  color: #203d2b;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 20px;

  font-weight: 600;

  line-height: 1.15;
}


.premium-product-size {
  display: block;

  color: #7a847c;

  font-size: 10px;

  margin-bottom: 7px;
}


.premium-product-size strong {
  color: #3d5545;
}


.premium-product-unit {
  color: #89928b;

  font-size: 10px;
}


/* =====================================================
   QUANTITY
===================================================== */

.premium-quantity-wrapper {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 7px;
}


.premium-small-label {
  color: #9aa39c;

  font-size: 7px;
  font-weight: 800;

  letter-spacing: 1.3px;
}


.premium-quantity {
  height: 36px;

  display: flex;
  align-items: center;

  border:
    1px solid #dce5da;

  border-radius: 20px;

  overflow: hidden;

  background: #ffffff;
}


.premium-quantity button {
  width: 31px;
  height: 35px;

  border: none;

  background: transparent;

  color: #3b6849;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition:
    background 0.2s ease;
}


.premium-quantity button:hover {
  background: #eef5eb;
}


.premium-quantity button svg {
  font-size: 8px;
}


.premium-quantity span {
  width: 30px;

  text-align: center;

  color: #254632;

  font-size: 12px;
  font-weight: 800;
}


/* =====================================================
   ITEM PRICE
===================================================== */

.premium-item-price {
  min-width: 95px;

  display: flex;
  flex-direction: column;

  align-items: flex-end;

  gap: 7px;
}


.premium-item-price strong {
  color: #175c38;

  font-size: 17px;
  font-weight: 800;
}


/* =====================================================
   REMOVE
===================================================== */

.premium-remove {
  width: 31px;
  height: 31px;

  border: 1px solid #eee1df;

  border-radius: 50%;

  background: #fffafa;

  color: #b27670;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition:
    all 0.2s ease;
}


.premium-remove:hover {
  background: #fdf0ef;

  color: #a34e47;

  transform: scale(1.05);
}


.premium-remove svg {
  font-size: 9px;
}


/* =====================================================
   CONTINUE LINK
===================================================== */

.premium-continue-link {
  display: inline-flex;

  align-items: center;

  gap: 9px;

  margin-top: 20px;

  color: #3d6e4d;

  text-decoration: none;

  font-size: 11px;
  font-weight: 700;

  transition: 0.2s ease;
}


.premium-continue-link:hover {
  color: #173f2a;
}


.premium-continue-link span {
  width: 25px;
  height: 25px;

  border-radius: 50%;

  border: 1px solid #dce6da;

  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
}


.premium-continue-link span svg {
  font-size: 8px;
}


.premium-continue-link > svg {
  font-size: 8px;
  margin-left: -3px;
}


/* =====================================================
   CART NOTE
===================================================== */

.premium-cart-note {
  display: flex;

  align-items: center;

  gap: 14px;

  margin-top: 30px;

  padding: 18px 20px;

  border:
    1px solid #e2eadf;

  border-radius: 13px;

  background:
    linear-gradient(
      135deg,
      #f5f9f2,
      #fbfcfa
    );
}


.premium-note-icon {
  flex: none;

  width: 39px;
  height: 39px;

  border-radius: 50%;

  background: #e4f0df;

  color: #467650;

  display: flex;
  align-items: center;
  justify-content: center;
}


.premium-note-icon svg {
  font-size: 14px;
}


.premium-cart-note strong {
  display: block;

  color: #31533c;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 13px;
}


.premium-cart-note p {
  margin: 3px 0 0;

  color: #7d887f;

  font-size: 9px;

  line-height: 1.5;
}


/* =====================================================
   SUMMARY
===================================================== */

.premium-summary {
  position: sticky;

  top: 95px;
}


.premium-summary-card {
  padding: 29px 27px 23px;

  border:
    1px solid #dfe7dc;

  border-radius: 19px;

  background:
    linear-gradient(
      150deg,
      #ffffff 0%,
      #f8faf6 100%
    );

  box-shadow:
    0 15px 45px rgba(31, 69, 40, 0.075);
}


.premium-summary-card h2 {
  margin: 7px 0 25px;

  color: #1f3b29;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 25px;

  font-weight: 600;
}


/* =====================================================
   SUMMARY ROWS
===================================================== */

.premium-summary-rows {
  display: flex;
  flex-direction: column;

  gap: 15px;
}


.premium-summary-rows > div {
  display: flex;

  align-items: center;
  justify-content: space-between;
}


.premium-summary-rows span {
  color: #7b857d;

  font-size: 11px;
}


.premium-summary-rows strong {
  color: #354b3b;

  font-size: 12px;
}


.premium-summary-rows .premium-free {
  color: #438053;

  font-size: 9px;

  letter-spacing: 1px;
}


/* =====================================================
   PROMO
===================================================== */

.premium-promo {
  display: flex;

  gap: 10px;

  margin-top: 23px;

  padding: 13px;

  border:
    1px solid #dfeadc;

  border-radius: 10px;

  background: #f2f8ef;
}


.premium-promo-icon {
  flex: none;

  width: 25px;
  height: 25px;

  border-radius: 50%;

  background: #dcebd7;

  color: #4b7a54;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
}


.premium-promo strong {
  display: block;

  color: #41624a;

  font-size: 10px;
}


.premium-promo span {
  display: block;

  margin-top: 3px;

  color: #7a877d;

  font-size: 8px;

  line-height: 1.4;
}


/* =====================================================
   DIVIDER
===================================================== */

.premium-summary-divider {
  height: 1px;

  background: #e2e8df;

  margin: 23px 0;
}


/* =====================================================
   GRAND TOTAL
===================================================== */

.premium-grand-total {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-bottom: 22px;
}


.premium-grand-total span {
  display: block;

  color: #294532;

  font-size: 13px;
  font-weight: 700;
}


.premium-grand-total small {
  display: block;

  margin-top: 4px;

  color: #929a94;

  font-size: 7px;
}


.premium-grand-total > strong {
  color: #155b37;

  font-size: 25px;
  font-weight: 800;

  white-space: nowrap;
}


/* =====================================================
   CHECKOUT BUTTON
===================================================== */

.premium-checkout-button {
  width: 100%;

  min-height: 53px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 6px 7px 6px 19px;

  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #174b30,
      #0e3b25
    );

  color: #ffffff;

  text-decoration: none;

  font-size: 12px;
  font-weight: 700;

  box-shadow:
    0 10px 25px rgba(20, 71, 43, 0.18);

  transition:
    all 0.25s ease;
}


.premium-checkout-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 14px 30px rgba(20, 71, 43, 0.24);
}


.premium-checkout-arrow {
  width: 39px;
  height: 39px;

  border-radius: 8px;

  background: rgba(255,255,255,0.12);

  display: flex;
  align-items: center;
  justify-content: center;
}


.premium-checkout-arrow svg {
  font-size: 10px;
}


/* =====================================================
   SECURE CHECKOUT
===================================================== */

.premium-secure-checkout {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 6px;

  margin-top: 13px;

  color: #89948c;

  font-size: 8px;
}


.premium-secure-checkout svg {
  color: #5c8566;

  font-size: 9px;
}


/* =====================================================
   BENEFITS
===================================================== */

.premium-benefits {
  margin-top: 15px;

  padding:
    7px 3px;
}


.premium-benefit {
  display: flex;

  align-items: center;

  gap: 11px;

  padding: 11px 5px;

  border-bottom:
    1px solid #e8eee5;
}


.premium-benefit:last-child {
  border-bottom: none;
}


.premium-benefit > div {
  width: 30px;
  height: 30px;

  flex: none;

  border-radius: 50%;

  background: #edf4e9;

  color: #4c7b57;

  display: flex;
  align-items: center;
  justify-content: center;
}


.premium-benefit > div svg {
  font-size: 10px;
}


.premium-benefit span {
  display: flex;
  flex-direction: column;

  gap: 2px;
}


.premium-benefit strong {
  color: #4a5f50;

  font-size: 9px;
}


.premium-benefit small {
  color: #929b94;

  font-size: 7px;
}


/* =====================================================
   EMPTY CART
===================================================== */

.premium-cart-empty-page {
  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    80px 20px;
}


.premium-cart-empty {
  width: 100%;
  max-width: 620px;

  text-align: center;
}


.premium-empty-orbit {
  width: 115px;
  height: 115px;

  margin: 0 auto 28px;

  padding: 8px;

  border-radius: 50%;

  border:
    1px dashed #c8d8c5;

  display: flex;
  align-items: center;
  justify-content: center;
}


.premium-empty-icon {
  width: 92px;
  height: 92px;

  border-radius: 50%;

  background:
    linear-gradient(
      145deg,
      #eaf4e5,
      #dcebd7
    );

  color: #39704a;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 27px;

  box-shadow:
    0 15px 35px rgba(50, 93, 56, 0.09);
}


.premium-empty-eyebrow {
  color: #78907e;

  font-size: 9px;
  font-weight: 800;

  letter-spacing: 2px;
}


.premium-cart-empty h1 {
  margin: 12px 0 12px;

  color: #173f2a;

  font-size:
    clamp(35px, 5vw, 50px);

  letter-spacing: -1.5px;

  line-height: 1;
}


.premium-cart-empty h1 em {
  color: #4c7658;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-weight: 500;
}


.premium-cart-empty > p {
  max-width: 520px;

  margin: 0 auto 27px;

  color: #7b877e;

  font-size: 13px;

  line-height: 1.75;
}


.premium-primary-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 14px 21px;

  border-radius: 10px;

  background:
    linear-gradient(
      135deg,
      #174b30,
      #0e3b25
    );

  color: #ffffff;

  text-decoration: none;

  font-size: 11px;
  font-weight: 700;

  box-shadow:
    0 10px 25px rgba(23, 75, 48, 0.17);

  transition:
    all 0.25s ease;
}


.premium-primary-button:hover {
  transform: translateY(-2px);
}


.premium-primary-button svg {
  font-size: 9px;
}


.premium-primary-button svg:last-child {
  margin-left: 4px;
}


.premium-empty-trust {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 27px;

  margin-top: 38px;

  padding-top: 22px;

  border-top:
    1px solid #e3eae0;
}


.premium-empty-trust span {
  display: flex;

  align-items: center;

  gap: 6px;

  color: #829087;

  font-size: 8px;
  font-weight: 700;
}


.premium-empty-trust svg {
  color: #53805e;

  font-size: 10px;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1050px) {

  .premium-cart-layout {
    grid-template-columns:
      minmax(0, 1fr)
      330px;

    gap: 22px;
  }


  .premium-cart-item {
    grid-template-columns:
      95px
      minmax(130px, 1fr)
      auto
      80px
      30px;

    gap: 15px;
  }


  .premium-product-image {
    width: 95px;
    height: 95px;
  }


  .premium-product-details h3 {
    font-size: 17px;
  }


  .premium-item-price {
    min-width: 75px;
  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 780px) {

  .premium-cart-page {
    padding:
      28px 0 55px;
  }


  .premium-cart-container {
    width: 94%;
  }


  .premium-cart-header {
    margin-bottom: 30px;
  }


  .premium-cart-heading {
    align-items: center;
  }


  .premium-cart-heading h1 {
    font-size: 43px;
  }


  .premium-cart-count {
    width: 60px;
    min-width: 60px;
    height: 60px;
  }


  .premium-cart-count span {
    font-size: 19px;
  }


  .premium-cart-layout {
    grid-template-columns: 1fr;
  }


  .premium-summary {
    position: static;
  }


  .premium-summary-card {
    padding: 24px 20px;
  }


  .premium-items-list {
    border-radius: 14px;
  }


  .premium-cart-item {
    grid-template-columns:
      82px
      minmax(0, 1fr);

    gap: 14px;

    padding: 17px;
  }


  .premium-product-image {
    width: 82px;
    height: 82px;

    grid-row: span 2;
  }


  .premium-product-details {
    align-self: center;
  }


  .premium-product-details h3 {
    font-size: 16px;
  }


  .premium-quantity-wrapper {
    align-items: flex-start;

    grid-column: 2;
  }


  .premium-item-price {
    position: absolute;

    right: 55px;

    margin-top: -70px;

    min-width: auto;
  }


  .premium-item-price strong {
    font-size: 14px;
  }


  .premium-remove {
    position: absolute;

    right: 15px;

    margin-top: -70px;
  }


  .premium-cart-item {
    position: relative;
  }


  .premium-cart-note {
    margin-top: 22px;
  }


  .premium-benefits {
    padding-bottom: 0;
  }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 480px) {

  .premium-cart-page {
    padding-top: 22px;
  }


  .premium-back-link {
    font-size: 10px;

    margin-bottom: 20px;
  }


  .premium-back-circle {
    width: 27px;
    height: 27px;
  }


  .premium-cart-heading {
    align-items: flex-start;
  }


  .premium-cart-heading h1 {
    font-size: 37px;

    letter-spacing: -1px;
  }


  .premium-cart-heading p {
    max-width: 240px;

    font-size: 10px;

    line-height: 1.5;
  }


  .premium-cart-count {
    width: 53px;
    min-width: 53px;
    height: 53px;
  }


  .premium-cart-count span {
    font-size: 17px;
  }


  .premium-cart-count small {
    font-size: 6px;
  }


  .premium-items-top h2 {
    font-size: 21px;
  }


  .premium-item-number {
    font-size: 9px;
  }


  .premium-cart-item {
    grid-template-columns:
      70px
      minmax(0, 1fr);

    padding: 14px;
  }


  .premium-product-image {
    width: 70px;
    height: 70px;
  }


  .premium-product-details h3 {
    font-size: 14px;

    padding-right: 35px;
  }


  .premium-product-category {
    font-size: 7px;
  }


  .premium-product-unit,
  .premium-product-size {
    font-size: 8px;
  }


  .premium-quantity-wrapper {
    gap: 5px;
  }


  .premium-quantity {
    height: 32px;
  }


  .premium-quantity button {
    width: 27px;
    height: 31px;
  }


  .premium-quantity span {
    width: 27px;
  }


  .premium-item-price {
    right: 50px;

    margin-top: -60px;
  }


  .premium-item-price .premium-small-label {
    display: none;
  }


  .premium-item-price strong {
    font-size: 12px;
  }


  .premium-remove {
    right: 12px;

    margin-top: -60px;

    width: 27px;
    height: 27px;
  }


  .premium-remove svg {
    font-size: 8px;
  }


  .premium-cart-note {
    align-items: flex-start;

    padding: 14px;
  }


  .premium-cart-note strong {
    font-size: 11px;
  }


  .premium-cart-note p {
    font-size: 8px;
  }


  .premium-summary-card h2 {
    font-size: 22px;
  }


  .premium-grand-total > strong {
    font-size: 22px;
  }


  .premium-empty-trust {
    flex-direction: column;

    gap: 12px;
  }


  .premium-cart-empty h1 {
    font-size: 35px;
  }


  .premium-cart-empty > p {
    font-size: 11px;
  }

}

`;

export default Cart;