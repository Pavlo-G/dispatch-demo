import { createContext, useState } from "react";
import "src/App.css";
import Dashboard from "src/dashboard/Dashboard";

type UserContextType = {
  currentUser?: string;
  setCurrentUser?: (user: string) => void;
};

export const UserContext = createContext<UserContextType>({});

export const App = () => {
  const [currentUser, setCurrentUser] = useState("Bert");
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <div className="App">
        <Dashboard />
      </div>
    </UserContext.Provider>
  );
};
