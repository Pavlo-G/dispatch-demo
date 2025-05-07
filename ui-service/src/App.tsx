import "src/App.css";
import Dashboard from "src/components/Dashboard";
import { TechnicianProvider } from "src/modules/techService/TechnicianProvider";
import { Toast } from "src/components/Toast";

export const App = () => {
  return (
    <TechnicianProvider>
      <div className="App">
        <Dashboard />
      </div>
      <Toast />
    </TechnicianProvider>
  );
};
