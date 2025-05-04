import "src/App.css";
import Dashboard from "src/components/Dashboard";
import { TechnicianProvider } from "src/modules/techService/TechnicianProvider";

export const App = () => {
  return (
    <TechnicianProvider>
      <div className="App">
        <Dashboard />
      </div>
    </TechnicianProvider>
  );
};
