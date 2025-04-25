import { useEffect, useMemo, useState } from "react";
import { useGetTechniciansQuery } from "./techniciansApiSlice";
import type { Technician } from "src/types/Technician";

export type TechContextType = {
  currentTech?: Technician;
  setCurrentTech?: React.Dispatch<React.SetStateAction<Technician | undefined>>;
};

const useTechnicianContext = () => {
  const { data: allTechs, isLoading } = useGetTechniciansQuery();

  const [currentTech, setCurrentTech] = useState<Technician | undefined>(
    undefined,
  );

  const contextValue = useMemo(
    () => ({ currentTech, setCurrentTech, allTechs }),
    [currentTech, setCurrentTech, allTechs],
  );

  useEffect(() => {
    if (!isLoading && !currentTech) {
      setCurrentTech(allTechs?.[0]);
    }
  }, [allTechs, currentTech, isLoading]);

  return contextValue;
};

export default useTechnicianContext;
