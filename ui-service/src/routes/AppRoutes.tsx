import { Routes, Route, Navigate } from "react-router";
import Jobs from "src/routes/jobs/Jobs";
import Profile from "src/routes/profile/Profile";
import Schedule from "src/routes/schedule/Schedule";
import Techs from "src/routes/techs/Techs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jobs" />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/techs" element={<Techs />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
