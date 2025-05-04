import type { GridColDef } from "@mui/x-data-grid";
import { renderActions } from "src/routes/techs/utils/renderActions";
import type { TechsActionsMenuProps } from "src/routes/techs/TechsActionsMenu";

export const columns: GridColDef[] = [
  { field: "techId", headerName: "Tech ID", flex: 0.5, minWidth: 100 },
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
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "right",
    align: "right",
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      renderActions(params.value as TechsActionsMenuProps),
  },
];
