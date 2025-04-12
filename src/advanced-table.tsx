import { memo, useMemo, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//MRT Imports

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MRT_TableInstance,
} from "material-react-table";

//Material UI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
import { data } from "react-router";
import { useAuth } from "./AuthContext";
import React from "react";

//Mock Data
// import { data } from "./makeData";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const LAMBDA_GET_ASSIGNEES_URL = `https://y2sbjsb3mxleav4dlpqhpcsyla0zpovf.lambda-url.us-east-1.on.aws`;
const LAMBDA_CREATE_ASSIGNEE_URL = `https://bwn3rit6uu6ddsybygykwcwtga0cwwbq.lambda-url.us-east-1.on.aws`;

const Example = memo(({ projects, setProjects }) => {
  const [open, setOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { tokens } = useAuth();
  const [assigneeDialogOpen, setAssigneeDialogOpen] = useState(false);
  const [isFetchingAssignees, setIsFetchingAssignees] = useState(false);

  const handleRowClick = async ({ row }) => {
    console.log("HHHHHHHHHH" + "      " + row);
    setSelectedProject(row.original.id);
    setIsFetchingAssignees(true);
    const response = await fetch(LAMBDA_GET_ASSIGNEES_URL, {
      method: "POST",
      body: JSON.stringify({ projectId: row.original.id }),
      headers: {
        authorization: `Bearer ${tokens}`,
      },
    });

    console.log({ isFetchingAssignees });
    const data = await response.json();
    setIsFetchingAssignees(false);
    console.log({ data });
    setSelectedAssignees(data);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setAssigneeDialogOpen(true);
  };

  const handleCloseFirstDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAssigneeDialogOpen(false);
  };

  const createNewAssignee = async ({ email, projectId, userId }) => {
    console.log({ email, projectId, userId });
    const response = await fetch(LAMBDA_CREATE_ASSIGNEE_URL, {
      method: "POST",
      body: JSON.stringify({ email, projectId: selectedProject }),
      headers: {
        authorization: `Bearer ${tokens}`,
      },
    });
    const data = await response.json();
    console.log({ data });
    setSelectedAssignees([...selectedAssignees, data.item]);
  };

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: "project", //id used to define `group` column
        header: "Project",
        columns: [
          {
            accessorFn: (row) => `${row.name}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            size: 250,
            Cell: ({ renderedCellValue, row }) => {
              const onClickRow = (e) => {
                console.log({ row });
                handleRowClick({ row });
              };

              return (
                <Box
                  onClick={onClickRow}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <img
                    alt="avatar"
                    height={30}
                    src={row.original.avatar}
                    loading="lazy"
                    style={{ borderRadius: "50%" }}
                  />
                  {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                  <span>{renderedCellValue}</span>
                </Box>
              );
            },
          },
          {
            Cell: ({ renderedCellValue, row }) => {
              const onClickRow = (e) => {
                console.log({ row });
              };

              return <Box onClick={onClickRow}></Box>;
            },
            accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 300,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: projects, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          left: "30px",
          maxWidth: "1000px",
          position: "sticky",
          width: "100%",
        }}
      >
        <img
          alt="avatar"
          height={200}
          src={row.original.avatar}
          loading="lazy"
          style={{ borderRadius: "50%" }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Signature Catch Phrase:</Typography>
          <Typography variant="h1">
            &quot;{row.original.signatureCatchPhrase}&quot;
          </Typography>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("deactivating " + row.getValue("name"));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("activating " + row.getValue("name"));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("contact " + row.getValue("name"));
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.default,
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  }) as MRT_TableInstance<Employee>;

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              console.log(event, row.id);
            },
            sx: {
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { backgroundColor: "#f0f0f0" },
            },
          })}
          table={table}
        />

        {isFetchingAssignees && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <CircularProgress size={100} />
          </div>
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        keepMounted
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            minWidth: 400,
            padding: 2,
          },
        }}
      >
        {isFetchingAssignees ? (
          <></>
        ) : (
          <>
            <DialogTitle>Assignees</DialogTitle>
            <React.Fragment>
              <Button variant="contained" onClick={handleClickOpen}>
                Add New Assignee
              </Button>
              <Divider sx={{ my: 2 }}></Divider>
              <Dialog
                open={assigneeDialogOpen}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    sx: { width: 1 },
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(
                        (formData as any).entries()
                      );
                      createNewAssignee(formJson);
                      handleClose();
                    },
                  },
                }}
              >
                <DialogTitle>Add a new assignee</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the person's email
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="email"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </>
        )}
        <DialogContent dividers>
          {selectedAssignees && selectedAssignees.length > 0 ? (
            selectedAssignees.map((a, i) => (
              <Box key={i} mb={2}>
                <Typography fontWeight="bold">{a?.email}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {a?.projectId}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No assignees found.</Typography>
          )}
        </DialogContent>

        <Button variant="contained" onClick={handleCloseFirstDialog}>
          Cancel
        </Button>
      </Dialog>
    </>
  );
});

//Date Picker Imports - these should just be in your Context Provider

export const ExampleWithLocalizationProvider = ({ projects, setProjects }) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example projects={projects} setProjects={setProjects} />
  </LocalizationProvider>
);
