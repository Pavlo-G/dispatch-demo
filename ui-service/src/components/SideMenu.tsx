import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import { Modal } from "@mui/material";
import UserSwitcherModal from "./UserSwitcherModal";
import { TechContext } from "src/App";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const [openUserSwitcher, setOpenUserSwitcher] = useState(false);
  const handleCloseUserSwitcher = () => setOpenUserSwitcher(false);
  const { currentTech } = useContext(TechContext);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: "calc(var(--template-frame-height, 0px) + 4px)",
            p: 1.5,
          }}
        >
          <Typography>Dispatch Demo - {currentTech?.id}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuContent openUserSwitcher={setOpenUserSwitcher} />
        </Box>
      </Drawer>
      <Modal open={openUserSwitcher} onClose={handleCloseUserSwitcher}>
        <UserSwitcherModal handleCloseUserSwitcher={handleCloseUserSwitcher} />
      </Modal>
    </>
  );
}
