import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CottageIcon from "@mui/icons-material/Cottage";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import LoginForm from "./login-form";

export const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const onClickSignUp = (e) => {
    setIsLoginOpen(true);
  };

  const onClickSignIn = () => {
    setIsLoginOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          flexDirection: "column",
          mb: 20,
        }}
      >
        <Box
          sx={{
            width: 1,
            height: "80px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "33%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ height: 1 }}>
              <img style={{ height: "100%" }} src="/logo.png" />
            </Box>
            <Typography>GUCCI PRISON</Typography>
          </Box>
          <Box sx={{ width: "33%" }}></Box>
          <Box
            sx={{
              width: "33%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              sx={{ fontFamily: "arial", fontSize: "14px", bgcolor: "purple" }}
              onClick={onClickSignIn}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: 1, height: "400px", bgcolor: "blue" }}>
          <img src="/img.png" style={{ width: "100%" }} />
        </Box>
        <Box
          sx={{
            width: 1,
            height: "200px",
            // bgcolor: "lightblue",
            display: "flex",
            flexDirection: "column",
            my: 15,
            alignItems: "center",
            ijustifyContent: "center",
          }}
        >
          <Typography>Features</Typography>
          <Typography fontSize={20} fontWeight={300}>
            Everything You Need To See This Crimson Red Shit I'm Wearin'
          </Typography>
          <Box
            sx={{
              width: 1,
              height: "350px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              my: 5,
            }}
          >
            <Box
              sx={{
                width: "33%",
                padding: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <AutoFixHighIcon sx={{ fontSize: 66, color: "purple" }} />
              <Typography sx={{ py: 2 }}>Looking Out Over The City</Typography>
              <Typography>
                Slangin code and drinking fourties like it wasn't nothing.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "33%",
                padding: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <CottageIcon sx={{ fontSize: 66, color: "purple" }} />
              <Typography sx={{ py: 2 }}>Going to the Home Depot</Typography>
              <Typography>
                If you have a happy tappin pattern, anything can happen tappin
                slappin pattern.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "33%",
                padding: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <DepartureBoardIcon sx={{ fontSize: 66, color: "purple" }} />
              <Typography sx={{ py: 2 }}>Sure To Get a Bus</Typography>
              <Typography>
                Until such time I will be trapped in the desert, don't know what
                I'm doing here.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ my: 2 }}>
            <Button
              sx={{ bgcolor: "purple", fontSize: "18px", fontFamily: "arial" }}
              variant="contained"
              onClick={onClickSignUp}
            >
              Sign Up Today
            </Button>
          </Box>
        </Box>
        <Dialog open={isLoginOpen}>
          <LoginForm
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
        </Dialog>
      </Box>
    </>
  );
};
