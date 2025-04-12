import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  accessToken: "",
  login: (val: string) => {},
  logout: () => {},
});

export const SESSION_STORAGE_ACCESS_TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => sessionStorage.getItem(SESSION_STORAGE_ACCESS_TOKEN_KEY) || ""
  );

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem(SESSION_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN_KEY);
    }
  }, [accessToken]);

  const login = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  const logout = () => {
    setAccessToken("");
    sessionStorage.removeItem(SESSION_STORAGE_ACCESS_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        accessToken,
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
