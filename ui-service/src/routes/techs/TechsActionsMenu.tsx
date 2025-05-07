import { useState } from "react";
import type { MouseEvent } from "react";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDeleteTechnicianMutation } from "src/modules/techService/techniciansApiSlice";
import { useTechnicianContext } from "src/modules/techService/useTechnicianContext";
import TechUpdateForm from "src/routes/techs/TechUpdateForm";

export type TechsActionsMenuProps = {
  techId?: string;
};

const TechsActionsMenu = ({ techId }: TechsActionsMenuProps) => {
  const { currentTech } = useTechnicianContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openTechUpdate, setOpenTechUpdate] = useState(false);
  const handleCloseTechUpdate = () => {
    setOpenTechUpdate(false);
    handleClose();
  };

  const [deleteTechnician] = useDeleteTechnicianMutation();

  const handleDelete = async () => {
    if (!techId) {
      console.warn("Missing required data to delete technician.");
      return;
    }
    try {
      const result = await deleteTechnician({
        id: techId,
      }).unwrap();
      console.info("Deletion succeeded:", result);
    } catch (error) {
      console.error("Deletion failed:", error);
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
        <MenuItem onClick={() => setOpenTechUpdate(true)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Update
        </MenuItem>
        <MenuItem
          disabled={currentTech?.id === techId}
          onClick={() => void handleDelete()}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      <Modal open={openTechUpdate} onClose={handleCloseTechUpdate}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid",
            borderColor: "divider",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TechUpdateForm techId={techId} onUpdate={handleCloseTechUpdate} />
        </Box>
      </Modal>
    </>
  );
};

export default TechsActionsMenu;
