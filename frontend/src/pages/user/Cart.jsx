import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaShieldAlt,
} from "react-icons/fa";

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #F8FAF6 0%, #FFFFFF 45%, #F6F9F4 100%)",
    padding: "50px 0 80px",
  },

  wrapper: {
    width: "92%",
    maxWidth: "1300px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "35px",
  },

  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#52705C",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "18px",
  },

  heading: {
    margin: 0,
    color: "#173F2A",
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  subtitle: {
    margin: "10px 0 0",
    color: "#7A837C",
    fontSize: "15px",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 350px",
    gap: "30px",
    alignItems: "start",
  },

  itemsBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: "18px",
    border: "1px solid #E7ECE5",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(30,70,40,0.05)",
  },

  itemsHeader: {
    padding: "20px 25px",
    borderBottom: "1px solid #EDF0EC",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemsTitle: {
    margin: 0,
    color: "#263D2E",
    fontSize: "18px",
    fontWeight: "750",
  },

  itemCount: {
    color: "#7C877F",
    fontSize: "13px",
  },

  item: {
    display: "grid",
    gridTemplateColumns:
      "100px minmax(150px, 1fr) auto auto auto",
    alignItems: "center",
    gap: "22px",
    padding: "22px 25px",
    borderBottom: "1px solid #EEF1ED",
  },

  imageWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "13px",
    overflow: "hidden",
    backgroundColor: "#F4F6F2",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  details: {
    minWidth: 0,
  },

  category: {
    color: "#7B927F",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "7px",
  },

  name: {
    color: "#263D2E",
    fontSize: "17px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  price: {
    color: "#6D786F",
    fontSize: "13px",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #DDE5DC",
    borderRadius: "9px",
    overflow: "hidden",
    height: "38px",
  },

  quantityButton: {
    width: "36px",
    height: "38px",
    border: "none",
    backgroundColor: "#F7F9F6",
    color: "#275E3D",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  quantity: {
    minWidth: "38px",
    textAlign: "center",
    color: "#263D2E",
    fontSize: "14px",
    fontWeight: "700",
  },

  itemTotal: {
    minWidth: "90px",
    textAlign: "right",
    color: "#175C38",
    fontSize: "17px",
    fontWeight: "800",
  },

  removeButton: {
    width: "36px",
    height: "36px",
    border: "none",
    backgroundColor: "#FFF3F3",
    color: "#C75A5A",
    borderRadius: "9px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  summary: {
    backgroundColor: "#FFFFFF",
    padding: "28px",
    borderRadius: "18px",
    border: "1px solid #E7ECE5",
    boxShadow: "0 8px 30px rgba(30,70,40,0.06)",
    position: "sticky",
    top: "100px",
  },

  summaryTitle: {
    margin: "0 0 25px",
    color: "#263D2E",
    fontSize: "21px",
    fontWeight: "800",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    color: "#69736C",
    fontSize: "14px",
  },

  summaryValue: {
    color: "#35463A",
    fontWeight: "600",
  },

  divider: {
    height: "1px",
    backgroundColor: "#E8ECE7",
    margin: "22px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  totalLabel: {
    color: "#263D2E",
    fontSize: "17px",
    fontWeight: "700",
  },

  total: {
    color: "#175C38",
    fontSize: "25px",
    fontWeight: "800",
  },

  checkoutButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "15px",
    borderRadius: "11px",
    fontSize: "15px",
    fontWeight: "700",
    boxSizing: "border-box",
  },

  continueShopping: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "#326845",
    textDecoration: "none",
    marginTop: "18px",
    fontSize: "13px",
    fontWeight: "600",
  },

  benefits: {
    marginTop: "22px",
    paddingTop: "20px",
    borderTop: "1px solid #E8ECE7",
  },

  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "13px",
    color: "#68736C",
    fontSize: "12px",
  },

  benefitIcon: {
    color: "#4D865E",
    fontSize: "14px",
  },

  emptyContainer: {
    width: "92%",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    paddingTop: "70px",
  },

  emptyIcon: {
    width: "80px",
    height: "80px",
    margin: "0 auto 25px",
    borderRadius: "50%",
    backgroundColor: "#EAF4E5",
    color: "#397A4D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
  },

  emptyTitle: {
    margin: 0,
    color: "#173F2A",
    fontSize: "30px",
    fontWeight: "800",
  },

  emptyText: {
    color: "#788279",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: "12px 0 25px",
  },

  emptyButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#175C38",
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
  },
};

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  /*
   * IMPORTANT:
   * Your products can have either MongoDB _id
   * or normal id.
   *
   * We use the SAME ID logic as CartContext.
   */
  const getProductId = (item) => {
    if (!item) return "";

    return String(
      item._id ||
        item.id ||
        ""
    );
  };

  /* ===============================
     EMPTY CART
  =============================== */

  if (cartItems.length === 0) {
    return (
      <main style={styles.page}>
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>
            <FaShoppingBag />
          </div>

          <h1 style={styles.emptyTitle}>
            Your Cart is Empty
          </h1>

          <p style={styles.emptyText}>
            You haven't added anything to your cart yet.
            Explore our fresh and natural products and
            find something you'll love.
          </p>

          <Link
            to="/products"
            style={styles.emptyButton}
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrapper}>

        {/* HEADER */}

        <div style={styles.header}>
          <Link
            to="/products"
            style={styles.backLink}
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

          <h1 style={styles.heading}>
            Your Cart
          </h1>

          <p style={styles.subtitle}>
            Review your selected products before checkout.
          </p>
        </div>

        {/* CART LAYOUT */}

        <div style={styles.layout}>

          {/* CART ITEMS */}

          <section style={styles.itemsBox}>

            <div style={styles.itemsHeader}>
              <h2 style={styles.itemsTitle}>
                Shopping Bag
              </h2>

              <span style={styles.itemCount}>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            {cartItems.map((item) => {

              /*
               * THIS IS THE IMPORTANT FIX
               */
              const productId =
                getProductId(item);

              return (
                <div
                  key={productId}
                  style={styles.item}
                >

                  {/* IMAGE */}

                  <div style={styles.imageWrapper}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.image}
                    />
                  </div>

                  {/* DETAILS */}

                  <div style={styles.details}>

                    <div style={styles.category}>
                      Farm Fresh
                    </div>

                    <div style={styles.name}>
                      {item.name}
                    </div>

                    <div style={styles.price}>
                      ₹{item.price} each
                    </div>

                  </div>

                  {/* QUANTITY */}

                  <div style={styles.quantityBox}>

                    <button
                      type="button"
                      style={styles.quantityButton}
                      onClick={() => {
                        if (productId) {
                          decreaseQuantity(
                            productId
                          );
                        }
                      }}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={10} />
                    </button>

                    <span style={styles.quantity}>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      style={styles.quantityButton}
                      onClick={() => {
                        if (productId) {
                          increaseQuantity(
                            productId
                          );
                        }
                      }}
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={10} />
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <strong style={styles.itemTotal}>
                    ₹
                    {Number(item.price || 0) *
                      Number(item.quantity || 0)}
                  </strong>

                  {/* REMOVE */}

                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => {
                      if (productId) {
                        removeFromCart(
                          productId
                        );
                      }
                    }}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <FaTrash size={13} />
                  </button>

                </div>
              );
            })}

          </section>

          {/* SUMMARY */}

          <aside style={styles.summary}>

            <h2 style={styles.summaryTitle}>
              Order Summary
            </h2>

            <div style={styles.summaryRow}>

              <span>
                Items
              </span>

              <span style={styles.summaryValue}>
                {cartItems.reduce(
                  (total, item) =>
                    total +
                    Number(item.quantity || 0),
                  0
                )}
              </span>

            </div>

            <div style={styles.summaryRow}>

              <span>
                Subtotal
              </span>

              <span style={styles.summaryValue}>
                ₹{cartTotal}
              </span>

            </div>

            <div style={styles.summaryRow}>

              <span>
                Delivery
              </span>

              <span
                style={{
                  ...styles.summaryValue,
                  color: "#438253",
                }}
              >
                FREE
              </span>

            </div>

            <div style={styles.divider}></div>

            <div style={styles.totalRow}>

              <span style={styles.totalLabel}>
                Total
              </span>

              <span style={styles.total}>
                ₹{cartTotal}
              </span>

            </div>

            <Link
              to="/checkout"
              style={styles.checkoutButton}
            >
              Proceed to Checkout
              <span>→</span>
            </Link>

            <Link
              to="/products"
              style={styles.continueShopping}
            >
              Continue Shopping
            </Link>

            {/* TRUST BENEFITS */}

            <div style={styles.benefits}>

              <div style={styles.benefit}>
                <FaShieldAlt
                  style={styles.benefitIcon}
                />
                Secure checkout
              </div>

              <div style={styles.benefit}>
                🌿
                Fresh & quality products
              </div>

              <div style={styles.benefit}>
                🚚
                Reliable doorstep delivery
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;