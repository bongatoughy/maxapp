import { JSX } from "react";
import { useLocation, Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const SendHome = ({ children }) => {
  const auth = useAuth();
  if (auth.accessToken) {
    return <Navigate to="/home"></Navigate>;
  }

  return children;
};
