import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "amruthahara_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // =====================================================
  // SAVE CART
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (product) => {
    if (!product) return "";

    return String(
      product.productId ||
        product._id ||
        product.id ||
        ""
    );
  };

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (product) => {
    if (!product) return "";

    if (
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images[0];
    }

    if (product.image) {
      return product.image;
    }

    return "";
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {
    if (!product) return;

    setCartItems((currentItems) => {
      const productId = getProductId(product);

      const existingItem = currentItems.find(
        (item) =>
          getProductId(item) === productId
      );

      // -------------------------------------------------
      // EXISTING PRODUCT
      // -------------------------------------------------

      if (existingItem) {
        return currentItems.map((item) =>
          getProductId(item) === productId
            ? {
                ...item,

                images:
                  Array.isArray(item.images) &&
                  item.images.length > 0
                    ? item.images
                    : getProductImage(product)
                    ? [getProductImage(product)]
                    : [],

                image:
                  item.image ||
                  getProductImage(product),

                quantity:
                  Number(item.quantity || 0) +
                  Number(product.quantity || 1),
              }
            : item
        );
      }

      // -------------------------------------------------
      // NEW PRODUCT
      // -------------------------------------------------

      const image = getProductImage(product);

      return [
        ...currentItems,
        {
          ...product,

          productId:
            product.productId ||
            product._id ||
            product.id ||
            null,

          images:
            Array.isArray(product.images) &&
            product.images.length > 0
              ? product.images
              : image
              ? [image]
              : [],

          image:
            product.image ||
            image ||
            "",

          quantity: Number(product.quantity || 1),
        },
      ];
    });
  };

  const checkoutBowl = (bowl) => {
    if (!bowl) return;

    setCartItems([
      {
        ...bowl,
        isBowl: true,
        quantity: 1,
        productId: bowl.productId || bowl._id || bowl.id,
      },
    ]);
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        getProductId(item) === id
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getProductId(item) === id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )
    );
  };

  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          getProductId(item) !== id
      )
    );
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {
    setCartItems([]);
  };

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      Number(
        item.quantity ||
          item.qty ||
          0
      ),
    0
  );

  // =====================================================
  // CART TOTAL
  // =====================================================

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(
          item.quantity ||
            item.qty ||
            0
        ),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        // Keep cart alias also so old components
        // using "cart" continue to work.
        cart: cartItems,

        addToCart,
        checkoutBowl,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,

        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
