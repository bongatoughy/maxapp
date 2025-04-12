// src/Auth.js
import React, { memo, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { signIn, signUp, confirmUser } from "./auth-service"; // Make sure confirmUser is available
import { useAuth } from "./AuthContext";

const Auth = memo(() => {
  const [tab, setTab] = useState(0); // 0 = SignUp, 1 = SignIn
  const [stage, setStage] = useState("signup"); // Manage the stage of the process
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [status, setStatus] = useState({ error: "", success: "" });
  const { login } = useAuth();

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
    setStage("signup"); // Reset to signup stage when switching tabs
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    try {
      await signUp({ email, password });
      setStatus({
        success: "Sign up successful. Please confirm your email.",
        error: "",
      });
      setStage("confirm"); // Move to confirm stage after successful sign up
    } catch (err) {
      setStatus({ error: err.message, success: "" });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    try {
      const tokens = await signIn({ email, password });
      login(tokens.tokens.accessToken);

      setStatus({ success: "Sign in successful!", error: "" });
    } catch (err) {
      setStatus({ error: err.message, success: "" });
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    try {
      await confirmUser({ email, code: confirmationCode });
      setStatus({ success: "Account confirmed!", error: "" });
      setStage("signup"); // Reset to signup after confirmation
    } catch (err) {
      setStatus({ error: err.message, success: "" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>

        <Typography variant="h5" mb={3}>
          {tab === 0
            ? stage === "signup"
              ? "Sign Up"
              : "Confirm Your Email"
            : "Sign In"}
        </Typography>

        {status.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {status.error}
          </Alert>
        )}
        {status.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {status.success}
          </Alert>
        )}

        {tab === 0 ? (
          // Sign Up Form
          stage === "signup" ? (
            <form onSubmit={handleSignUp}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<CheckCircle />}
              >
                Sign Up
              </Button>
            </form>
          ) : (
            // Confirmation Code Form after successful Sign Up
            <form onSubmit={handleConfirm}>
              <Typography mb={2}>
                A confirmation code was sent to <strong>{email}</strong>. Enter
                it below.
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Confirmation Code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<CheckCircle />}
              >
                Confirm
              </Button>
            </form>
          )
        ) : (
          // Sign In Form
          <form onSubmit={handleSignIn}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<CheckCircle />}
            >
              Sign In
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
});

export default Auth;
