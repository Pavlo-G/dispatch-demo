import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useGetTechniciansQuery } from "src/modules/techService/techniciansApiSlice";
import { getTechniciansResponse } from "src/modules/techService/mocks";
import { useTechnicianContext } from "src/modules/techService/useTechnicianContext";

type UserSwitcherModalType = {
  handleCloseUserSwitcher: () => void;
};

const UserSwitcherModal = ({
  handleCloseUserSwitcher,
}: UserSwitcherModalType) => {
  const { currentTech, setCurrentTech } = useTechnicianContext();
  const { data, isError } = useGetTechniciansQuery();
  const techs = isError ? getTechniciansResponse : (data ?? []);
  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value && setCurrentTech && techs) {
      const selectedTech = techs.find((tech) => tech.id === event.target.value);
      if (selectedTech) {
        setCurrentTech(selectedTech);
      }
      handleCloseUserSwitcher();
    }
  };

  return (
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
      <Typography variant="h6" component="h2">
        Current Tech: {currentTech?.id}
      </Typography>
      <Typography sx={{ mt: 2 }}>Select a tech to switch to</Typography>
      <FormControl fullWidth>
        <Select value={currentTech?.id} onChange={handleChange}>
          {!!techs?.length &&
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
