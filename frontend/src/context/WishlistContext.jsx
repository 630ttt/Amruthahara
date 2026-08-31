
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // ==========================================
  // LOAD WISHLIST FROM LOCAL STORAGE
  // ==========================================
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "amruthahara_wishlist"
      );

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );

      return [];
    }
  });

  // ==========================================
  // SAVE WISHLIST TO LOCAL STORAGE
  // ==========================================
  useEffect(() => {
    localStorage.setItem(
      "amruthahara_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ==========================================
  // GET PRODUCT ID
  // ==========================================
  const getProductId = (product) => {
    if (!product) return "";

    return String(
      product._id ||
        product.id ||
        ""
    );
  };

  // ==========================================
  // CHECK IF PRODUCT IS IN WISHLIST
  // ==========================================
  const isInWishlist = (productId) => {
    if (!productId) return false;

    const id = String(productId);

    return wishlist.some(
      (item) =>
        getProductId(item) === id
    );
  };

  // ==========================================
  // ADD / REMOVE FROM WISHLIST
  // ==========================================
  const toggleWishlist = (product) => {
    if (!product) return;

    const productId = getProductId(product);

    if (!productId) {
      console.error(
        "Cannot add product without ID:",
        product
      );

      return;
    }

    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) =>
          getProductId(item) === productId
      );

      // ==========================================
      // PRODUCT ALREADY EXISTS → REMOVE
      // ==========================================
      if (exists) {
        return currentWishlist.filter(
          (item) =>
            getProductId(item) !== productId
        );
      }

      // ==========================================
      // NORMALIZE PRODUCT IMAGE
      // ==========================================
      const images =
        Array.isArray(product.images)
          ? product.images
          : product.image
            ? [product.image]
            : [];

      // ==========================================
      // ADD COMPLETE PRODUCT
      // ==========================================
      return [
        ...currentWishlist,
        {
          ...product,

          // Keep MongoDB ID
          _id: product._id || productId,

          // Keep compatibility with old code
          id: productId,

          // Always make sure images exists
          images,

          // Also keep image for compatibility
          image: images[0] || product.image || "",
        },
      ];
    });
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================
  const removeFromWishlist = (productId) => {
    if (!productId) return;

    const id = String(productId);

    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) =>
          getProductId(item) !== id
      )
    );
  };

  // ==========================================
  // CLEAR WISHLIST
  // ==========================================
  const clearWishlist = () => {
    setWishlist([]);
  };

  // ==========================================
  // WISHLIST COUNT
  // ==========================================
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOK
// ==========================================
export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}
