import React from "react";
import { UserContext } from "src/App";
import TechUpdateForm from "src/components/TechUpdateForm";

const Profile = () => {
  const { currentUser } = React.useContext(UserContext);
  console.log("currentUser", currentUser);
  return (
    <>
      <TechUpdateForm currentUser={currentUser} />
    </>
  );
};

export default Profile;
