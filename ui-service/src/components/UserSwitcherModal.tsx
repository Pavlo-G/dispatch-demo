import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "src/App";

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

const userList = [
  { id: "Bert", firstName: "Bert", lastName: "Simpson" },
  { id: "Lisa", firstName: "Lisa", lastName: "Simpson" },
  { id: "Bart", firstName: "Bart", lastName: "Simpson" },
  { id: "Marge", firstName: "Marge", lastName: "Simpson" },
  { id: "Homer", firstName: "Homer", lastName: "Simpson" },
];

const UserSwitcherModal = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value && setCurrentUser) {
      setCurrentUser(event.target.value);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Current User: {currentUser}
      </Typography>
      <Typography sx={{ mt: 2 }}>Select a user to switch to</Typography>
      <FormControl fullWidth>
        <Select value={currentUser} onChange={handleChange}>
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
