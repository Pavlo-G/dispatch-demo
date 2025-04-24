import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
} from "@mui/material";

const mockData = {
  firstName: "John",
  lastName: "Doe",
  id: "TECH1243",
  skills: ["Wireless", "Fiber"],
  phoneNumber: "123-456-7890",
};

export default function Profile() {
  const currentUser = mockData;
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
            key={index}
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
}
