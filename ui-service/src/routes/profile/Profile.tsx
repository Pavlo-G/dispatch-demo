import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
} from "@mui/material";
import { getTechnicianResponse } from "src/modules/techService/mocks";

const Profile = () => {
  const currentUser = getTechnicianResponse;
  return (
    <Box
      component="form"
      sx={{
        minWidth: "40dvw",
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="ID"
        variant="outlined"
        value={currentUser.id}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        value={currentUser.firstName}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        value={currentUser.lastName}
      />
      <TextField
        id="outlined-basic"
        label="Phone Number"
        variant="outlined"
        value={currentUser.phoneNumber}
      />
      <FormGroup>
        <FormLabel component="legend">Skills</FormLabel>
        {currentUser.skills.map((skill, index) => (
          <FormControlLabel
            key={`${skill}-${index}`}
            control={
              <Checkbox checked={!!currentUser.skills.includes(skill)} />
            }
            label={skill}
          />
        ))}
      </FormGroup>
      <Button variant="contained">Save Changes</Button>
    </Box>
  );
};

export default Profile;
