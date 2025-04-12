import React, { memo } from "react";
import LoginForm from "./login-form";
import { useAuth } from "./AuthContext";
import { Home } from "./home";

export const Root = memo(() => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && <LoginForm />}
      {isAuthenticated && <Home />}
    </>
  );
});
