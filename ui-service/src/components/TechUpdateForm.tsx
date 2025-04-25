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
import {
  useGetTechnicianQuery,
  useUpdateTechnicianMutation,
} from "src/modules/techService/techniciansApiSlice";

import type { Technician } from "src/types/Technician";

const skills = ["Wireless", "Fiber", "Cable", "Hardware", "Software"];

type TechUpdateFormType = {
  techId?: string;
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const TechUpdateForm = ({
  techId,
  onUpdate,
  onSuccess,
  onError,
}: TechUpdateFormType) => {
  const tech = useGetTechnicianQuery({ id: techId ?? "" }).data;

  const [updateTechnician] = useUpdateTechnicianMutation();
  const [formValues, setFormValues] = React.useState<Technician>({
    id: tech?.id ?? "",
    firstName: tech?.firstName ?? "",
    lastName: tech?.lastName ?? "",
    phoneNumber: tech?.phoneNumber ?? "",
    skills: tech?.skills ?? [],
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
    try {
      const technicianResult = updateTechnician({
        id: formValues.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneNumber: formValues.phoneNumber,
        skills: formValues.skills,
      }).unwrap();
      if (onSuccess) onSuccess();
      console.info("Tech update succeeded:", technicianResult);
    } catch (technicianError) {
      if (onError) onError();
      console.error("Tech update failed:", technicianError);
    } finally {
      if (onUpdate) onUpdate();
    }
  };

  useEffect(() => {
    if (!tech) return;
    setFormValues(tech);
  }, [tech]);

  return (
    <Box
      component="form"
      sx={{
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
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
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
