import type { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "techId", headerName: "Tech ID", flex: .5, minWidth: 100 },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1.5,
    minWidth: 100,
  },
];
