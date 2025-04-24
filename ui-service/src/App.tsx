import { createContext, useMemo, useState } from "react";
import "src/App.css";
import Dashboard from "src/components/Dashboard";
import { getTechnicianResponse } from "src/modules/techService/mocks";
import type { Technician } from "src/types/Technician";

type UserContextType = {
  currentUser?: Technician;
  setCurrentUser?: React.Dispatch<React.SetStateAction<Technician>>;
};

export const UserContext = createContext<UserContextType>({});

export const App = () => {
  const [currentUser, setCurrentUser] = useState(getTechnicianResponse);
  const contextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );

  return (
    <UserContext.Provider value={contextValue}>
      <div className="App">
        <Dashboard />
      </div>
    </UserContext.Provider>
  );
};
