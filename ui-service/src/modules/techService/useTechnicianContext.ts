import { useContext } from "react";
import { TechnicianContext } from "src/modules/techService/TechnicianProvider";

export const useTechnicianContext = () => {
  const context = useContext(TechnicianContext);
  return context;
};
