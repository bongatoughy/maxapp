import React, { useState, forwardRef, memo } from "react";
import { MaterialReactTable } from "material-react-table";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { SlideProps } from "@mui/material/Slide";

// Example data
const data = [
  {
    id: "1",
    task: "Fix bug #42",
    assignees: [
      { name: "Alice Smith", email: "alice@example.com" },
      { name: "Bob Jones", email: "bob@example.com" },
    ],
  },
  {
    id: "2",
    task: "Design homepage",
    assignees: [{ name: "Carol Tan", email: "carol@example.com" }],
  },
];

// Table column definitions
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "task", header: "Task" },
];

// Custom Slide Transition
const Transition = forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AssigneesTable = memo(() => {
  const [open, setOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  const handleRowClick = ({ row }) => {
    setSelectedAssignees(row.original.assignees);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection={false}
        enableColumnActions={false}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick({ row }),
          sx: {
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { backgroundColor: "#f0f0f0" },
          },
        })}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
        <DialogTitle>Assignees</DialogTitle>
        <DialogContent dividers>
          {selectedAssignees.length > 0 ? (
            selectedAssignees.map((a, i) => (
              <Box key={i} mb={2}>
                <Typography fontWeight="bold">{a.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {a.email}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No assignees found.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
});
