import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SESSION_STORAGE_ACCESS_TOKEN_KEY, useAuth } from "./AuthContext";
import Box from "@mui/material/Box";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

const LAMBDA_CREATE_PROJECT_URL =
  "https://hlgfcq5tqeuvbo54vu2sssdboi0qxzlb.lambda-url.us-east-1.on.aws/";

export const FormDialog = React.memo(({ projects, setProjects }) => {
  const [open, setOpen] = React.useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClickSpreadsheet = () => {
    navigate("/spreadsheet");
  };

  const createNewProject = async (formJson) => {
    // const accessToken =
    //   sessionStorage.getItem(SESSION_STORAGE_ACCESS_TOKEN_KEY) || "";

    console.log({ accessToken, formJson });

    const response = await fetch(LAMBDA_CREATE_PROJECT_URL, {
      method: "POST",
      body: JSON.stringify(formJson),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Project creation failed");
    }

    const { item } = data;
    setProjects([...projects, item]);

    return data;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        sx={{ my: 2 }}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        Add New Project
      </Button>
      <Button
        sx={{ my: 2 }}
        variant="contained"
        color="primary"
        onClick={handleOnClickSpreadsheet}
      >
        Spreadsheet Example
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { width: 1 },
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              createNewProject(formJson);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Add a new project</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the project name</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});
