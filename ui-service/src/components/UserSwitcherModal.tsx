import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "src/App";
import { getTechniciansResponse } from "src/modules/techService/mocks";

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

type UserSwitcherModalType = {
  handleCloseUserSwitcher: () => void;
};

const userList = getTechniciansResponse;

const UserSwitcherModal = ({
  handleCloseUserSwitcher,
}: UserSwitcherModalType) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value && setCurrentUser) {
      const selectedUser = userList.find(
        (user) => user.id === event.target.value,
      );
      if (selectedUser) {
        setCurrentUser(selectedUser);
      }
      handleCloseUserSwitcher();
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Current User: {currentUser?.id}
      </Typography>
      <Typography sx={{ mt: 2 }}>Select a user to switch to</Typography>
      <FormControl fullWidth>
        <Select value={currentUser?.id} onChange={handleChange}>
          {userList &&
            userList.length > 0 &&
            userList.map((user, index) => (
              <MenuItem key={`${user.id}-${index}`} value={user.id}>
                {user.firstName} {user.lastName} ({user.id})
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserSwitcherModal;
