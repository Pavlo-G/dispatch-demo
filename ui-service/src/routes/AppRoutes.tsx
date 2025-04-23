import { Routes, Route } from "react-router";
import Techs from "src/routes/techs/Techs";
import Jobs from "src/routes/jobs/Jobs";
import Profile from "src/routes/profile/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Jobs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/techs" element={<Techs />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
