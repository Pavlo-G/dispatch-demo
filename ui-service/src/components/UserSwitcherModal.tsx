import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { TechContext } from "src/App";
import { useGetTechniciansQuery } from "src/modules/techService/techniciansApiSlice";

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

const UserSwitcherModal = ({
  handleCloseUserSwitcher,
}: UserSwitcherModalType) => {
  const { currentTech, setCurrentTech } = useContext(TechContext);
  const techs = useGetTechniciansQuery().data;
  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value && setCurrentTech && techs) {
      const selectedTech = techs.find(
        (tech) => tech.id === event.target.value,
      );
      if (selectedTech) {
        setCurrentTech(selectedTech);
      }
      handleCloseUserSwitcher();
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        Current Tech: {currentTech?.id}
      </Typography>
      <Typography sx={{ mt: 2 }}>Select a tech to switch to</Typography>
      <FormControl fullWidth>
        <Select value={currentTech?.id} onChange={handleChange}>
          {techs &&
            techs.length > 0 &&
            techs.map((tech, index) => (
              <MenuItem key={`${tech.id}-${index}`} value={tech.id}>
                {tech.firstName} {tech.lastName} ({tech.id})
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserSwitcherModal;
