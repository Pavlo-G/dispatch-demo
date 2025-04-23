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

const skills = ["Wireless", "Fiber", "Cable", "Hardware", "Software"];

const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formValues = Object.fromEntries(formData);
  alert(`This doesn't do anything yet\n \n${JSON.stringify(formValues)}`);
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
      onSubmit={handleSubmit}
    >
      <TextField
        id="id"
        name="id"
        label="ID"
        variant="outlined"
        defaultValue={currentUser.id}
        disabled
      />
      <TextField
        id="firstName"
        name="firstName"
        label="First Name"
        variant="outlined"
        defaultValue={currentUser.firstName}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        variant="outlined"
        defaultValue={currentUser.lastName}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        defaultValue={currentUser.phoneNumber}
      />
      <FormGroup id="skills">
        <FormLabel>Skills</FormLabel>
        {skills.map((skill, index) => (
          <FormControlLabel
            name={skill}
            key={index}
            control={
              <Checkbox defaultChecked={!!currentUser.skills.includes(skill)} />
            }
            label={skill}
          />
        ))}
      </FormGroup>
      <Button variant="contained" type="submit">
        Save Changes
      </Button>
    </Box>
  );
}
