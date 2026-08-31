import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { API_BASE_URL } from "../services/apiBase";

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

  const [token, setToken] = useState(
    () => localStorage.getItem("amruthahara_token") || ""
  );

  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  const persistToken = (authToken) => {
    if (!authToken) {
      return;
    }

    localStorage.setItem("amruthahara_token", authToken);
    setToken(authToken);
  };

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

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      if (!user) {
        if (!cancelled) {
          setToken("");
          setSessionReady(true);
        }
        return;
      }

      const existingToken = localStorage.getItem("amruthahara_token");

      if (existingToken) {
        if (!cancelled) {
          setToken(existingToken);
          setSessionReady(true);
        }
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id || user._id,
            email: user.email,
          }),
        });

        const data = await response.json();

        if (!cancelled && response.ok && data.token) {
          persistToken(data.token);

          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      } finally {
        if (!cancelled) {
          setSessionReady(true);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [user?.id, user?._id, user?.email]);

  const login = (userData, authToken) => {
    setUser(userData);

    localStorage.setItem(
      "amruthahara_user",
      JSON.stringify(userData)
    );

    persistToken(authToken || userData?.token);
    setSessionReady(true);
  };

  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("amruthahara_user");
    localStorage.removeItem("amruthahara_token");

    setSessionReady(true);
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
        token,
        setUser,
        login,
        logout,
        updateUser,
        isAuthenticated,
        loading,
        sessionReady,
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
