import { useState } from "react";
import type { MouseEvent } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDeleteDispatchMutation } from "src/modules/dispatchService/dispatchesApiSlice";
import { useUpdateJobMutation } from "src/modules/jobService/jobsApiSlice";
import { JobState } from "src/types/JobState";

export type ScheduleActionsMenuProps = {
  jobId?: string;
  dispatchId?: string;
};

const ScheduleActionsMenu = ({
  jobId,
  dispatchId,
}: ScheduleActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const [deleteDispatch] = useDeleteDispatchMutation();
  const [updateJob] = useUpdateJobMutation();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleComplete = async () => {
    if (!jobId || !dispatchId) {
      console.warn("Missing required data to complete job.");
      return;
    }
    try {
      const dispatchResult = await deleteDispatch({
        id: dispatchId,
      }).unwrap();
      console.info("Completion succeeded:", dispatchResult);
      try {
        const jobResult = await updateJob({
          id: jobId,
          state: JobState.Closed,
        }).unwrap();
        console.info("Job update succeeded:", jobResult);
      } catch (jobError) {
        console.error("Job update failed:", jobError);
      }
    } catch (dispatchError) {
      console.error("Completion failed:", dispatchError);
    } finally {
      handleClose();
    }
  };

  const handleCancel = async () => {
    if (!jobId || !dispatchId) {
      console.warn("Missing required data to cancel job.");
      return;
    }
    try {
      const dispatchResult = await deleteDispatch({
        id: dispatchId,
      }).unwrap();
      console.info("Cancellation succeeded:", dispatchResult);
      try {
        const jobResult = await updateJob({
          id: jobId,
          state: JobState.Open,
          technicianId: "",
        }).unwrap();
        console.info("Job update succeeded:", jobResult);
      } catch (jobError) {
        console.error("Job update failed:", jobError);
      }
    } catch (dispatchError) {
      console.error("Cancellation failed:", dispatchError);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{
          border: "none",
          borderRadius: "50%",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={() => void handleComplete()}>
          <CheckIcon fontSize="small" sx={{ mr: 1 }} />
          Complete
        </MenuItem>
        <MenuItem onClick={() => void handleCancel()}>
          <CloseIcon fontSize="small" sx={{ mr: 1 }} />
          Cancel
        </MenuItem>
      </Menu>
    </>
  );
};

export default ScheduleActionsMenu;
