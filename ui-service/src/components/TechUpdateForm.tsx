import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import type { Technician } from "src/types/Technician";

const skills = ["Wireless", "Fiber", "Cable", "Hardware", "Software"];

type TechUpdateFormType = {
  currentTech?: Technician;
};

const TechUpdateForm = ({ currentTech }: TechUpdateFormType) => {
  const [formValues, setFormValues] = React.useState<Technician>({
    id: currentTech?.id ?? "",
    firstName: currentTech?.firstName ?? "",
    lastName: currentTech?.lastName ?? "",
    phoneNumber: currentTech?.phoneNumber ?? "",
    skills: currentTech?.skills ?? [],
  });
  const handleFormValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const checked = event.target.checked;
      if (checked) {
        setFormValues((prevValues) => ({
          ...prevValues,
          skills: [...prevValues.skills, name],
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          skills: prevValues.skills.filter((skill) => skill !== name),
        }));
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("This doesn't do anything yet");
  };

  useEffect(() => {
    if (!currentTech) return;
    setFormValues(currentTech);
  }, [currentTech]);

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
        value={formValues.id}
        disabled
        onChange={handleFormValueChange}
      />
      <TextField
        id="firstName"
        name="firstName"
        label="First Name"
        variant="outlined"
        value={formValues.firstName}
        onChange={handleFormValueChange}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        variant="outlined"
        value={formValues.lastName}
        onChange={handleFormValueChange}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        value={formValues.phoneNumber}
        onChange={handleFormValueChange}
      />
      <FormGroup id="skills">
        <FormLabel>Skills</FormLabel>
        {skills.map((skill, index) => (
          <FormControlLabel
            key={`${skill}-${index}`}
            control={
              <Checkbox
                name={skill}
                checked={!!formValues.skills.includes(skill)}
                onChange={handleFormValueChange}
              />
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
};

export default TechUpdateForm;
