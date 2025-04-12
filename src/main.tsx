import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./AuthContext";
import { Landing } from "./landing";
import { RequireAuth, SendHome } from "./require-auth";
import { Home } from "./home";
import LoginForm from "./login-form";
import { Box } from "@mui/material";
import Spreadsheet from "./spreadsheet";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <SendHome>
                  <Landing />
                </SendHome>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/spreadsheet" element={<Spreadsheet />}></Route>
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
