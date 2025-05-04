import { useEffect, useState } from "react";
import { Alert, Collapse } from "@mui/material";
import { useTechnicianContext } from "src/modules/techService/useTechnicianContext";
import TechUpdateForm from "src/routes/techs/TechUpdateForm";

const Profile = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (openSuccess || openError) {
      setTimeout(() => {
        setOpenSuccess(false);
        setOpenError(false);
      }, 3000);
    }
  }, [openError, openSuccess]);

  const { currentTech } = useTechnicianContext();
  return (
    <>
      <TechUpdateForm
        techId={currentTech?.id}
        onSuccess={() => setOpenSuccess(true)}
        onError={() => setOpenError(true)}
      />
      <Collapse in={openSuccess}>
        <Alert severity="success">Job Update Success</Alert>
      </Collapse>
      <Collapse in={openError}>
        <Alert severity="error">Job Update Failed</Alert>
      </Collapse>
    </>
  );
};

export default Profile;
