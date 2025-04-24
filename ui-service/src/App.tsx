import { createContext, useMemo, useState } from "react";
import "src/App.css";
import Dashboard from "src/components/Dashboard";

type UserContextType = {
  currentUser?: string;
  setCurrentUser?: (user: string) => void;
};

export const UserContext = createContext<UserContextType>({});

export const App = () => {
  const [currentUser, setCurrentUser] = useState("Bert");
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
