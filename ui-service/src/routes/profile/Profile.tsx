import { Alert, Collapse } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TechContext } from "src/App";
import TechUpdateForm from "src/components/TechUpdateForm";

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

  const { currentTech } = useContext(TechContext);
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
