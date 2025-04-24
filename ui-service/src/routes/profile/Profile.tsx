import { useContext } from "react";
import { UserContext } from "src/App";
import TechUpdateForm from "src/components/TechUpdateForm";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  console.info("currentUser", currentUser);
  return <TechUpdateForm currentUser={currentUser} />;
};

export default Profile;
