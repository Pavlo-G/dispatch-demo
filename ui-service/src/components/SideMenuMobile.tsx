import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import { Modal } from "@mui/material";
import { useState } from "react";
import UserSwitcherModal from "./UserSwitcherModal";

type SideMenuMobileProps = {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
};

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  const [openUserSwitcher, setOpenUserSwitcher] = useState(false);
  const handleCloseUserSwitcher = () => setOpenUserSwitcher(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          [`& .${drawerClasses.paper}`]: {
            backgroundImage: "none",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Stack
          sx={{
            width: "70dvw",
            height: "100%",
          }}
        >
          <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
            <Stack
              direction="row"
              sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
            >
              <Typography component="p" variant="h6">
                Dispatch Demo
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack sx={{ flexGrow: 1 }}>
            <MenuContent openUserSwitcher={setOpenUserSwitcher} />
          </Stack>
        </Stack>
      </Drawer>
      <Modal open={openUserSwitcher} onClose={handleCloseUserSwitcher}>
        <UserSwitcherModal />
      </Modal>
    </>
  );
}
