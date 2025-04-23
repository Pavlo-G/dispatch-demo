import type { GridColDef } from "@mui/x-data-grid";
import { renderStatus } from "src/routes/jobs/utils/renderStatus";
import type { JobState } from "src/types/JobState";

export const columns: GridColDef[] = [
  { field: "jobId", headerName: "Job ID", flex: 1, minWidth: 100 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value as JobState),
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1.5,
    minWidth: 100,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "techId",
    headerName: "Tech ID",
    headerAlign: "right",
    align: "right",
    flex: 0.5,
    minWidth: 100,
  },
];
