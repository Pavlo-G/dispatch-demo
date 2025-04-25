import { useState } from "react";
import { Menu, MenuItem, IconButton, Modal, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDeleteTechnicianMutation } from "src/modules/techService/techniciansApiSlice";
import useTechnicianContext from "src/modules/techService/useTechnicianContext";
import TechUpdateForm from "src/components/TechUpdateForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export type TechsActionsMenuProps = {
  techId?: string;
};

const TechsActionsMenu = ({ techId }: TechsActionsMenuProps) => {
  const { currentTech } = useTechnicianContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
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
      const deleteResult = await deleteTechnician({
        id: techId,
      }).unwrap();
      console.info("Deletion succeeded:", deleteResult);
    } catch (deleteError) {
      console.error("Deletion failed:", deleteError);
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
          <CheckIcon fontSize="small" sx={{ mr: 1 }} />
          Update
        </MenuItem>
        <MenuItem
          disabled={currentTech?.id === techId}
          onClick={() => void handleDelete()}
        >
          <CloseIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      <Modal open={openTechUpdate} onClose={handleCloseTechUpdate}>
        <Box sx={style}>
          <TechUpdateForm techId={techId} onUpdate={handleCloseTechUpdate} />
        </Box>
      </Modal>
    </>
  );
};

export default TechsActionsMenu;
