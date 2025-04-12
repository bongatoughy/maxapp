// src/AuthContext.js or .tsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  tokens: "",
  isAuthenticated: false,
  login: (val: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(
    () => sessionStorage.getItem("auth") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokens);

  useEffect(() => {
    if (tokens && Object.keys(tokens).length !== 0) {
      sessionStorage.setItem("auth", tokens);
      setIsAuthenticated(true);
    } else {
      sessionStorage.removeItem("auth");
      setIsAuthenticated(false);
    }
  }, [tokens]);

  const login = (newToken) => {
    setTokens(newToken);
  };

  const logout = () => {
    setTokens("");
  };

  return (
    <AuthContext.Provider
      value={{
        tokens: tokens || "",
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
