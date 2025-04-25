import { useContext } from "react";
import { TechContext } from "src/App";
import TechUpdateForm from "src/components/TechUpdateForm";

const Profile = () => {
  const { currentTech } = useContext(TechContext);
  return <TechUpdateForm currentTech={currentTech} />;
};

export default Profile;
