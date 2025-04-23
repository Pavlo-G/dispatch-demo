import Chip from "@mui/material/Chip";
import type { JobState } from "src/types/JobState";

export const renderStatus = (status: JobState) => {
  const colors: Record<JobState, "info" | "success" | "default"> = {
    Open: "info",
    "In Progress": "success",
    Closed: "default",
  };
  return <Chip label={status} color={colors[status]} size="small" />;
};
