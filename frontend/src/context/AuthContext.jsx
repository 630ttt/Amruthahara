import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("amruthahara_user");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to load user:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "amruthahara_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("amruthahara_user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "amruthahara_user",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("amruthahara_user");

    // Optional: remove authentication-specific data
    // Cart and wishlist are intentionally NOT removed.
  };

  const updateUser = (updatedUser) => {
    setUser((currentUser) => {
      const newUser = {
        ...currentUser,
        ...updatedUser,
      };

      localStorage.setItem(
        "amruthahara_user",
        JSON.stringify(newUser)
      );

      return newUser;
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;