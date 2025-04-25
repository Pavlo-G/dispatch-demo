import { createContext } from "react";
import "src/App.css";
import Dashboard from "src/components/Dashboard";
import type { TechContextType } from "src/modules/techService/useTechnicianContext";
import useTechnicianContext from "src/modules/techService/useTechnicianContext";

export const TechContext = createContext<TechContextType>({});

export const App = () => {
  const contextValue = useTechnicianContext();

  return (
    <TechContext.Provider value={contextValue}>
      <div className="App">
        <Dashboard />
      </div>
    </TechContext.Provider>
  );
};
