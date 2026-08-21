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

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ===============================
  // GET PRODUCT ID
  // ===============================
  const getProductId = (product) => {
    return String(product._id || product.id);
  };

  // ===============================
  // ADD TO CART
  // ===============================
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const productId = getProductId(product);

      const existingItem = currentItems.find(
        (item) =>
          getProductId(item) === productId
      );

      // Product already exists
      // Increase quantity
      if (existingItem) {
        return currentItems.map((item) =>
          getProductId(item) === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // New product
      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ===============================
  // INCREASE QUANTITY
  // ===============================
  const increaseQuantity = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        getProductId(item) === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ===============================
  // DECREASE QUANTITY
  // ===============================
  const decreaseQuantity = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getProductId(item) === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ===============================
  // REMOVE FROM CART
  // ===============================
  const removeFromCart = (productId) => {
    const id = String(productId);

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => getProductId(item) !== id
      )
    );
  };

  // ===============================
  // CLEAR CART
  // ===============================
  const clearCart = () => {
    setCartItems([]);
  };

  // ===============================
  // CART COUNT
  // ===============================
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ===============================
  // CART TOTAL
  // ===============================
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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