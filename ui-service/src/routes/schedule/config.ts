import type { GridColDef } from "@mui/x-data-grid";
import { renderActions } from "src/routes/schedule/utils/renderActions";
import type { ScheduleActionsMenuProps } from "src/routes/schedule/ScheduleActionsMenu";

export const columns: GridColDef[] = [
  { field: "jobId", headerName: "Job ID", flex: 0.5, minWidth: 100 },
  {
    field: "appointmentDateTime",
    headerName: "Appointment Date",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "address",
    headerName: "Address",
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
      renderActions(params.value as ScheduleActionsMenuProps),
  },
];
