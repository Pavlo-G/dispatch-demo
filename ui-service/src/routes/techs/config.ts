import type { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "TechId", headerName: "Tech ID", flex: 1, minWidth: 100 },
  {
    field: "firstName",
    headerName: "FirstName",
    flex: 1.5,
    minWidth: 100,
  },
  {
    field: "lastName",
    headerName: "LastName",
    flex: 1.5,
    minWidth: 50,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1.5,
    minWidth: 50,
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1.5,
    minWidth: 100,
  },
];
